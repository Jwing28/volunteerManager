import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () =>
  <div>
    <div>
      Volunteer Management
      <hr />
    </div>
    <div>
      <Link to="/admin">
        Administrators
      </Link>
      <button>
        Volunteers
      </button>
    </div>
  </div>;

export default Landing;
