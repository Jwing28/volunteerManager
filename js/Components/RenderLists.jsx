import React from 'react';
import { Table, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';

const tooltipBootStrap = (
  <Tooltip id="tooltip">Are you sure?</Tooltip>
);  

export const ListEvents = (props,handleEvent) => (
  props
    .sort((currentEvent,nextEvent) =>
      currentEvent.name.split("")[0] > nextEvent.name.split("")[0]
    )
    .map((event, index) =>
      <tr key={event._id}>
        <td>{index + 1}</td>        
        <td>{event.name}</td>
        <td>{event.date}</td>
        <td>{event.currentVolunteers.length + ' / ' + event.maxVolunteers}</td>
        <td>
        <OverlayTrigger placement="right" overlay={tooltipBootStrap}>
          <Button bsStyle="danger" onClick={() => handleEvent(event._id)}>Delete</Button>
        </OverlayTrigger>
        </td>
      </tr>  
));

export const ListVolunteers = (props) => {
  const volunteerList = props.data
      .map((volunteer, index) =>
        <tr key={event._id}>
          <td>{index + 1}</td>        
          <td>{volunteer.name}</td>
          <td>{volunteer.email}</td>
          <td>{volunteer.age}</td>
          <td>{volunteer.eventsJoined}</td>
          <td>
            <OverlayTrigger placement="right" overlay={tooltipBootStrap}>
              <Button bsStyle="danger" onClick={() => props.handleRemoveVolunteer(volunteer._id)}>Delete</Button>
            </OverlayTrigger>          
          </td>
        </tr>     
      )

  return (
    <tbody>{volunteerList}</tbody>
  );
};

