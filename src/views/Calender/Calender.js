import React, { useState, useEffect, useRef } from "react";
import events from "./events";
import {
  Calendar as BigCalendar,
  Views,
  momentLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";

import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calender.scss";
import { Button, makeStyles } from "@material-ui/core";
import { Select, message } from "antd";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import genericStyles from "assets/jss/material-dashboard-react/views/genericStyles";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { GET, AXIOS_POST } from "utils/Functions";
import ApiUrls from "utils/ApiUrls";

import "./calender.scss";
import NewTaskDialog from "components/Create/NewTaskDialog";
import { connect } from "react-redux";
import ViewTaskDetails from "components/TaskComponents/ViewTaskDetails";
import BackdropLoading from "components/Loading/BackdropLoading";
const useStyles = makeStyles(genericStyles);

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const { Option } = Select;

function Dnd(props) {
  const [state, setState] = useState({
    events: [],
    displayDragItemInCell: true,
  });
  const [openNewTaskDialogBox, setOpenNewTaskDialogBox] = useState(false);
  const drawerRef = useRef();
  const [projectFilter, setProjectFilter] = useState("");
  const [data, setData] = useState({
    allProjects: [],
  });
  const [refresh, setRefresh] = useState(false);

  const [selectedID, setSelectedID] = useState(null);
  const [openTaskDrawer, setOpenTaskDrawer] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const isFirstRun = useRef(true);

  useEffect(() => {
    getCalendarTasks();
  }, [refresh]);
  useEffect(() => {
    getAllData();
  }, []);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    filterTasks();
  }, [projectFilter]);

  const getCalendarTasks = async () => {
    let res = await GET(ApiUrls.GET_CALENDAR_TASKS);
    console.log(res);
    setLoading(false);
    if (res.status == "200") {
      setState({
        events: res.tasks,
      });
    }
  };
  const filterTasks = async () => {
    setLoading(true);
    let res = await GET(ApiUrls.GET_CALENDAR_TASKS + `${projectFilter}`);

    console.log(res, "resp status filter");
    if (res.status == "200") {
      setState({
        events: res.tasks,
      });
      setLoading(false);
    }
  };
  const getAllData = async () => {
    let resProject = await GET(ApiUrls.GET_ALL_PROJECTS + `status=active`);
    console.log(resProject);

    if (resProject.status == "200") {
      setData({
        ...data,
        allProjects: resProject.projects,
      });
    }
  };
  const handleDrawer = () => {
    setOpenTaskDrawer(!openTaskDrawer);
  };
  const CustomToolbar = (toolbar) => {
    const classes = useStyles();

    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate("prev");
    };

    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate("next");
    };

    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate("current");
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span>
          <b>{date.format("MMMM")}</b>
          <span> {date.format("YYYY")}</span>
        </span>
      );
    };
    const date = moment(toolbar.date);
    return (
      <div className="mb-3">
        {/* <label>{label()}</label> */}

        <div>
          <Select
            allowClear={true}
            placeholder="All Projects"
            className="filterButton"
            bordered={false}
            listItemHeight={10}
            listHeight={250}
            value={projectFilter}
            defaultValue={"All Projects"}
            onChange={(value) => {
              console.log(value);
              if (value !== undefined) setProjectFilter(value);
              else setProjectFilter("");
            }}
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <Option
              className="antSelect"
              style={{ textTransform: "capitalize" }}
              value={""}
            >
              {"All Projects"}
            </Option>
            {data.allProjects.map((item, index) => (
              <Option
                className="antSelect"
                style={{ textTransform: "capitalize" }}
                key={index}
                value={item._id}
              >
                {item.projectName}
              </Option>
            ))}
          </Select>
          <Button onClick={goToBack}>
            <BiChevronLeft />
          </Button>
          {/* <Button onClick={goToBack}>&#8249;</Button> */}

          <Button onClick={goToNext}>
            <BiChevronRight />
          </Button>
          {/* <Button onClick={goToNext}>&#8250;</Button> */}
          <div id="rightToolBar--buttons" className="float-right">
            <Button
              startIcon={<CalendarTodayOutlinedIcon />}
              classes={{
                label: classes.labelColor,
              }}
              variant="outlined"
              className="mr-2"
            >
              {date.format("MMMM")}
            </Button>
            <Button
              classes={{
                label: classes.labelColor,
              }}
              variant="outlined"
              className="mr-2"
            >
              WeekEnd <b style={{ color: "#42cc92" }}>&nbsp; ON</b>
            </Button>
            <Button
              classes={{
                label: classes.labelColor,
              }}
              variant="outlined"
              onClick={goToCurrent}
            >
              today
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const handleDragStart = (event) => {
    setState({ draggedEvent: event });
  };

  const dragFromOutsideItem = () => {
    return state.draggedEvent;
  };

  const onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = state;

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    };

    setState({ draggedEvent: null });
    moveEvent({ event, start, end });
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = state;

    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setState({
      events: nextEvents,
    });

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`);
  };

  const resizeEvent = ({ event, start, end }) => {
    const { events } = state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setState({
      events: nextEvents,
    });

    // alert(`${event.title} was resized to ${start}-${end}`);
  };

  //   newEvent(event) {

  // let idList = state.events.map((a) => a.id);
  // let newId = Math.max(...idList) + 1;
  // let hour = {
  //   id: newId,
  //   title: "New Event",
  //   allDay: event.slots.length == 1,
  //   start: event.start,
  //   end: event.end,
  // };
  // setState({
  //   events: state.events.concat([hour]),
  // });
  //   }

  const newEvent = ({ start, end }) => {
    console.log(start, end);
    const title = window.prompt("New Event name");
    if (title)
      setState({
        events: [
          ...state.events,
          {
            start_date: start,
            due_date: end,
            title,
          },
        ],
      });
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log(event);
    let backgroundColor =
      event.status === "complete" && !event.isArchive
        ? "#30C788"
        : event.status === "active" && !event.isArchive
        ? "#2B7AE4"
        : "#FFB340";
    let style = {
      backgroundColor: backgroundColor,
    };
    return {
      style: style,
    };
  };

  return (
    <>
      <div id="calender" style={{ height: "150vh" }}>
        <BackdropLoading loading={loading} />

        <h1
          className="my-4"
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "25px",
            lineHeight: "31px",

            color: "#2B7AE4",
          }}
        >
          Calender
        </h1>
        <BigCalendar
          selectable
          localizer={localizer}
          events={state.events}
          onSelectEvent={(e) => {
            console.log(e);
            setSelectedID(e);
            handleDrawer();
          }}
          eventPropGetter={eventStyleGetter}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          startAccessor={"start_date"}
          endAccessor={"due_date"}
          popup={true}
          components={{
            toolbar: CustomToolbar,
          }}
          // onEventDrop={moveEvent}
          // resizable
          // onEventResize={resizeEvent}
          // onSelectSlot={newEvent}
          // onDragStart={console.log}
          // dragFromOutsideItem={
          //   state.displayDragItemInCell ? dragFromOutsideItem : null
          // }
          // onDropFromOutside={onDropFromOutside}
          // handleDragStart={handleDragStart}
        />
      </div>
      {loading === false && state.events?.length >= 0 && selectedID !== null ? (
        <ViewTaskDetails
          selectedIdNUll={() => {
            setSelectedID(null);
          }}
          data={selectedID}
          open={openTaskDrawer}
          loggedUser={props.loginUserInfo}
          picture={props.picture}
          userType={props.userType}
          onClose={() => {
            handleDrawer();
            setSelectedID(null);
          }}
          allProjects={data.allProjects}
          refreshTasks={() => {
            setRefresh(!refresh);
          }}
        />
      ) : null}
    </>
  );
}
const mapStatetoProps = (state) => {
  console.log(state);
  return {
    loginUserInfo: state.Login.user_info,
    userType: state.Login.user_info?.role?.title,
    picture: state.Login.picture,
  };
};
export default connect(mapStatetoProps)(Dnd);
