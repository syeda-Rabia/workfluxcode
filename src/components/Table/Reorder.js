import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePositionReorder } from "./use-position-reorder";
import { useMeasurePosition } from "./use-measure-position";
import { Table } from "react-bootstrap";

/**
 * This is an example of drag-to-reorder in Framer Motion 2.
 *
 * By applying both drag and layout props to a component, if it changes place
 * in the DOM it'll either animate to its new position (if not dragging) or
 * stay stuck to the user's cursor (if dragging).
 */

export default function Reorder() {
  const [order, setOrder, updatePosition, updateOrder] = usePositionReorder(
    items
  );

  return (
    <div className="customTable">
      <Table responsive borderless hover>
        <thead>
          <tr className="tableHeading">
            <th scope="col">User Name </th>
            <th scope="col">Email Address</th>
            <th scope="col">User Permissions </th>
            <th scope="col">Company</th>
            <th scope="col">Title </th>
            <th scope="col">Status </th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {order.map((height, i) => (
            <TableRow
              key={height}
              height={height}
              i={i}
              updatePosition={updatePosition}
              updateOrder={updateOrder}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function TableRow({ i, height, updatePosition, updateOrder }) {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  console.log(ref);

  return (
    <motion.tr
      style={{
        padding: 0,
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        zIndex: isDragging ? 3 : 1,
      }}
      ref={ref}
      layout
      initial={false}
      drag="y"
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onViewportBoxUpdate={(_viewportBox, delta) => {
        isDragging && updateOrder(i, delta.y.translate);
      }}
    >
      <td>{i}</td>
      <td>{height}</td>
      <td>{"---"}</td>
      <td>{"---"}</td>
      <td>{"---"}</td>
      <td>{"---"}</td>
      <td>{"---"}</td>
    </motion.tr>
  );
}

const items = [60, 80, 120, 40];
