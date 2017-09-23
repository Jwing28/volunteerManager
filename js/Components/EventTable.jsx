import React from 'react';
import { Table } from 'react-bootstrap';

const EventTable = (props) => (
  <Table striped bordered hover responsive>
    <tHead>
    <tr>
      <th>#</th>
      <th>Event Name</th>
      <th>Date</th> 
      <th>Activity Level</th>
      <th>{props.data.action}</th>       
    </tr>           
    </tHead>
    <tbody>
      {props.data.tableData}
    </tbody>
  </Table>
);

export default EventTable;