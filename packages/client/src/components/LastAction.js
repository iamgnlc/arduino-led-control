import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";

const LastAction = (props) => {
  const { color, status } = props;

  return (
    <Table className="my-4" bordered>
      <thead>
        <tr>
          <th colSpan="2">Last Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" className="text-muted">
            Color
          </th>
          <td>{color || "-"}</td>
        </tr>
        <tr>
          <th scope="row" className="text-muted">
            Status
          </th>
          <td>{status || "-"}</td>
        </tr>
      </tbody>
    </Table>
  );
};

LastAction.propTypes = {
  color: PropTypes.string,
  status: PropTypes.string,
};

export default React.memo(LastAction);
