import React from 'react';
import * as Routes from '../../utils/Routes';

class Navbarin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary ">
          <a
            className="navbar-brand">
            Granite
          </a>
          <div className="group">
          <a
            className="navbar-brand"
            href={Routes.login_new_path()}>
            Login
          </a>
          <a
            className="navbar-brand"
            href={Routes.users_new_path()}>
            Sign up
          </a>
          </div>
        </nav>
      </div >
    );
  }
}

export default Navbarin;

