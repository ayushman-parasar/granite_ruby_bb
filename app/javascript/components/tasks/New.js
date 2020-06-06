import React, { Component } from "react";
import API from "./../../utils/API";
import * as Routes from "./../../utils/Routes";
import Errors from "./../shared/Errors";
import { fetchApi } from "../../utils/API"

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task:{
        desc: "",
        user_id: null,
        errors: null,
        message:null
      }
    };
  }
  // handleChange = (e) => {
  //   const {name, value}  = e.target
  //   this.setState({
  //     [name]:value
  //   });
  // };
// different appraoch of destructuring handleChange
  handleChange=({target :{ name, value }})=>{
    this.setState({
      task:{
        ...this.state.task,
        [name]: value
      }
    })
  }


  handleError=(res)=>{
    this.setState({
      errors:{
        errors:res.messages,
        type:res.type
      }
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    // API.postNewTask({ task: { desc: this.state.description } })
    //   .then((response) => {
    //     this.setState({
    //       message: response.notice,
    //     });
    //     setTimeout(() => {
    //       window.location.href = Routes.task_path_show(response.id);
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     console.log("error in submit function", err);
    //     err.json().then(({ errors }) => {
    //       this.setState({
    //         errors,
    //       });
    //     });
    //     if (err.text) {
    //       err.text().then((err) => {
    //         console.log(err);
    //       });
    //     }
    //   });
    fetchApi({
      url: Routes.tasks_path(),
      method: 'POST',
      body: {
        task: this.state.task
      },
      onError: this.handleError,
      onSuccess: response => {
        this.setState({ message: response.messages[0] });
      },
      successCallBack: response => {
        setTimeout(function () {
          window.location.replace(Routes.task_path(response.id));
        }, 1000);
      },
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
      <div className="row">
        {errors && (
          <div className="mt-4">
            <Errors errors={errors.errors} message={errors.type} />
          </div>
        )}
      </div>
    );
  }
  render() {
    const {users} = this.props
    const { errors, message } = this.state
    return (
      <div className="container">
        <div className="col-md-10 mx-auto pt-2">
          <div className="row">
            <h3 className="pb-3">Add Task</h3>
          </div>
          {this.displayErrors()}
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : (
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
                  name="desc"
                  value={this.state.desc}
                />
              </div>
            </div>
            <div className="form-group row pt-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                <h5 className="text-secondary ">Assigned to: </h5>
              </label>
              <div className="col-sm-10">
                <select
                  className="custom-select"
                  name="user_id"
                  id="users"
                  onChange={this.handleChange}
                >
                  {users &&
                    users.map(user => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group row pt float-right pr-3">
              <button className="btn btn-md btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    );
  }
}

export default New;
