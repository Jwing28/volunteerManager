import React from 'react';

const NewEvent = () =>
  <div>
    <div className={"title"}>Create A New Event</div>
    <form className={"newEventContainer"}>
      <div><label>Name <input type="text" name="Name"/></label></div>
      <div><label>Date <input type="date" name="Date"/></label></div>
      <div><label>Maximum # of Volunteers <input type="text" name="Max Volunteers"/></label></div>
      <input type="submit" value="Create" />
    </form>
  </div>;

export default NewEvent;
