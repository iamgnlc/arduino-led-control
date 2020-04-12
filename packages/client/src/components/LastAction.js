import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";

const LastAction = (props) => {
  const { color, status } = props;

  return (
    <Table className="my-4" bordered>
      <thead>
        <tr>
          <th colSpan="2" className="text-muted">
            Last Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Color</th>
          <td>
            <code>{color || "-"}</code>
          </td>
        </tr>
        <tr>
          <th scope="row">Status</th>
          <td>
            <code>{status || "-"}</code>
          </td>
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
