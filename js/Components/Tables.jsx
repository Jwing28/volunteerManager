import React from 'react';
import { ListVolunteers } from './RenderLists';
import { Table } from 'react-bootstrap';

export const JoinTable = (props) => (
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

export const RemoveTable = (props) => {
  if(props.tableType === 'Event') {
    return (
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
  } else {
    return (
      <Table striped bordered condensed hover responsive>
        <tHead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Events Attended</th>  
          <th>{props.data.action}</th> 
        </tr>          
        </tHead>
          <ListVolunteers data={props.data.tableData} handleRemoveVolunteer={props.handleRemoveVolunteer} />
      </Table> 
    );   
  }  
};