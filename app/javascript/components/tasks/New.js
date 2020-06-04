import React, { Component } from "react";
import API from "./../../utils/API";
import * as Routes from "./../../utils/Routes";
import Errors from "./../shared/Errors";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      message: null,
      errors: [],
    };
  }
  handleChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    API.postNewTask({ task: { desc: this.state.description } })
      .then((response) => {
        this.setState({
          message: response.notice,
        });
        setTimeout(() => {
          window.location.href = Routes.task_path_show(response.id);
        }, 1000);
      })
      .catch((err) => {
        console.log("error in submit function", err);
        err.json().then(({ errors }) => {
          this.setState({
            errors,
          });
        });
        if (err.text) {
          err.text().then((err) => {
            console.log(err);
          });
        }
      });
  };
  displayAddTaskForm = () => {
    return (
      <div>
        <div className="row">
          <h3 className="pb-3">Add Task Form</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row pt-3">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              <h5 className="text-secondary ">Description: </h5>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </div>
          </div>
          <div className="form-group row pt float-right pr-3">
            <button className="btn btn-md btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  displayErrors() {
    const { errors } = this.state;
    return (
      <div>
        {errors.length != 0 ? (
          <div>
            <Errors errors={errors} message="danger" />
          </div>
        ) : null}
      </div>
    );
  }
  render() {
    return (
      <div className="container">
        {this.displayErrors()}
        {this.state.message ? (
          <div className="alert alert-success">{this.state.message}</div>
        ) : (
          <div className="col-md-10 mx-auto pt-2">
            {this.displayAddTaskForm()}
          </div>
        )}
      </div>
    );
  }
}

export default New;
