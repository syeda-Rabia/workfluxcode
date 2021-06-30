/* eslint-disable no-constant-condition */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import TimelapseOutlinedIcon from "@material-ui/icons/TimelapseOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import SyncAltOutlinedIcon from "@material-ui/icons/SyncAltOutlined";
import FolderSpecialOutlinedIcon from "@material-ui/icons/FolderSpecialOutlined";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import PeopleIcon from "@material-ui/icons/People";
import PaymentIcon from "@material-ui/icons/Payment";
import EventNoteOutlinedIcon from "@material-ui/icons/EventNoteOutlined";
// core components/views for Admin layout
// core components/views for RTL layout
import Projects from "views/Project/Projects";
import Clients from "views/Clients/Clients";
import Overview from "views/Overview/Overview";
import Calender from "views/Calender/Calender";
import Users from "views/Users/Users";

import Invoices from "views/Invoices/Invoices";
import Financials from "views/Financials/Financials";
import Transactions from "views/Transactions/Transactions";
import Documents from "views/Documents/Documents";
import Activitys from "views/Activitys/Activitys";
import MyTasks from "views/MyTasks/MyTasks";
import TimeTracking from "views/TimeTracking/TimeTracking";
import InviteNewPeople from "components/UsersComponents/InviteNewPeople";
import Project from "views/Project/Project";
import ClientProfile from "components/ClientComponents/ClientProfile";
import Setting from "views/Settting/Setting";
import Template from "components/DocumentComponents/Template";
import CreateNewContract from "components/DocumentComponents/CreateNewContract";
import Purposal from "components/DocumentComponents/Purposal";

// import Login from "views/Login/Login";
import Login from "views/Authentication/Login";
import Register from "views/Authentication/Register";
import WelcomeScreen from "views/WelcomeScreen/WelcomeScreen";
import ForgotPassword from "views/Authentication/ForgetPassword";
import ResetPassword from "views/Authentication/ResetPassword";
import ProfileActivation from "views/Authentication/ProfileActivation";

import ClientManagement from "suViews/ClientManagement/ClientManagement";
import InvoiceManagement from "suViews/InvoiceManagement/InvoiceManagement";
import PackageManagement from "suViews/PackageManagement/PackageManagement";
import WebContent from "suViews/WebContent/WebContent";
import Trash from "views/Trash/Trash";
import { RiDeleteBin5Line } from "react-icons/ri";
import Labels from "views/Labels/Labels";

const dashboardRoutes = (role = "owner") => [
  // {
  //   path: "/overview",
  //   name: "Overview",
  //   icon: Dashboard,
  //   component: Overview,
  //   layout: "/app",
  //   visible: true,
  //   sidebarVisible: true,
  // },
  {
    path: "/projects",
    name: "Projects",
    icon: FolderSpecialOutlinedIcon,
    component: Projects,
    layout: "/app",
    visible: true,
    sidebarVisible: true,
  },
  {
    path: "/mytasks",
    name: "My Tasks",
    icon: ListOutlinedIcon,
    component: MyTasks,
    layout: "/app",
    visible:
      role === "owner" || role === "collaborator" || role === "member"
        ? true
        : false,
    sidebarVisible: true,
  },
  {
    path: "/activity",
    name: "Activity",
    icon: GraphicEqIcon,
    component: Activitys,
    layout: "/app",
    visible: true,
    sidebarVisible: true,
  },
  {
    path: "/Calendar",
    name: "Calendar",
    icon: CalendarTodayIcon,
    component: Calender,
    layout: "/app",
    visible: true,
    sidebarVisible: true,
  },
  {
    path: "/clients",
    name: "Clients",
    icon: SupervisedUserCircleOutlinedIcon,
    component: Clients,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
    sidebarVisible: true,
  },
  {
    path: "/users",
    name: "Users",
    icon: PeopleAltOutlinedIcon,
    component: Users,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
    sidebarVisible: true,
  },
  {
    path: "/trash",
    name: "Trash",
    icon: RiDeleteBin5Line,
    component: Trash,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
    sidebarVisible: true,
  },
  //Sidebar Invisible routes
  {
    path: "/invite",
    sidebarVisible: false,
    component: InviteNewPeople,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
  },
  {
    path: "/global-labels",
    sidebarVisible: false,
    component: Labels,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
  },
  {
    path: "/client/:username",
    sidebarVisible: false,
    component: ClientProfile,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
  },
  {
    path: "/setting",
    sidebarVisible: false,
    component: Setting,
    layout: "/app",
    visible: true,
  },
  {
    path: "/template",
    sidebarVisible: false,
    component: Template,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
  },
  {
    path: "/create-contract",
    sidebarVisible: false,
    component: CreateNewContract,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
  },
  {
    path: "/purposal",
    sidebarVisible: false,
    component: Purposal,
    layout: "/app",
    visible: role === "owner" || role === "collaborator" ? true : false,
  },

  // {
  //   path: "/test",
  //   // name: "Users",
  //   // icon: PeopleAltOutlinedIcon,
  //   component: Users,
  //   layout: "/app",
  // },
  // {
  //   path: "/timetracking",
  //   name: "Time Tracking",
  //   icon: TimelapseOutlinedIcon,
  //   component: TimeTracking,
  //   layout: "/app",
  //   visible: role==="owner"? true: false,
  // },
  // {
  //   path: "/documents",
  //   name: "Proposals",
  //   icon: NoteOutlinedIcon,
  //   component: Documents,
  //   layout: "/app",
  //   visible: role==="owner"? true: false,
  // },
  // {
  //   path: "/Invoices",
  //   name: "Invoices",
  //   icon: InsertDriveFileOutlinedIcon,
  //   component: Invoices,
  //   layout: "/app",
  //   visible: role==="owner"? true: false,
  // },
  // {
  //   path: "/Financials",
  //   name: "Financials",
  //   icon: LocalAtmOutlinedIcon,
  //   component: Financials,
  //   layout: "/app",
  // },
  // {
  //   path: "/Transactions",
  //   name: "Transactions",
  //   icon: SyncAltOutlinedIcon,
  //   component: Transactions,
  //   layout: "/app",
  // },
];
export default dashboardRoutes;

export const welcomeScreenRoutes = [
  {
    path: "/login",
    component: Login,
    layout: "/user",
    visible: true,
  },
  {
    path: "/register",
    component: Register,
    layout: "/user",
    visible: true,
  },
  {
    path: "/welcome",
    component: WelcomeScreen,
    layout: "/user",
    visible: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    layout: "/user",
    visible: true,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    exact: true,
    layout: "/user",
    visible: true,
  },
  {
    path: "/user/profile-activation/:userId/:projectId?/:userType?/:ownerId",
    component: ProfileActivation,
    layout: "/user",
    visible: true,
  },
];

export const superAdminScreenRoutes = [
  {
    path: "/clients-management",
    name: "Client Management",
    icon: PeopleIcon,
    component: ClientManagement,
    layout: "/su",
    visible: true,
  },
  {
    path: "/invoice-management",
    name: "Invoice Management",
    icon: PaymentIcon,
    component: InvoiceManagement,
    layout: "/su",
    visible: true,
  },
  {
    path: "/package-management",
    name: "Package Management",
    icon: EventNoteOutlinedIcon,
    component: PackageManagement,
    layout: "/su",
    visible: true,
  },

  {
    path: "/webcontent-management",
    name: "Web Content",
    icon: Dashboard,
    component: WebContent,
    layout: "/su",
    visible: true,
  },
];
