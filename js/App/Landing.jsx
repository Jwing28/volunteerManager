import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () =>
  <div>
    <div>
      Volunteer Management Services
      <hr />
    </div>
    <div>
      <button>
        <Link to="/admin">
          Administrators
        </Link>
      </button>
      <button>
        <Link to="/volunteer">
          Volunteers
        </Link>
      </button>
    </div>
  </div>;

export default Landing;
