import React from 'react';
import { fetchApi } from '../../utils/API';
import * as Routes from '../../utils/Routes';

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetchApi({
      url: Routes.login_path(),
      method: 'POST',
      body: {
        login: this.state.user
      },
      onError: response => {
        console.error(response);
      },
      onSuccess: response => {
        console.log(response);
      },
      successCallBack: () => {
        window.location.href = Routes.tasks_path();
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h3 className="py-3">Sign In</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default New;