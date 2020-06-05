import React, { Component } from 'react';

import { fetchApi } from '../../utils/API';
import * as Routes from '../../utils/Routes';
import Errors from '../shared/Errors';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.task.desc,
      errors: [],
    };
    
  }

  handleError=(response) =>{
    console.log("handle error in edit", response)
    this.setState({
      errors: {
        errors: response.messages,
        type: response.type,
      },
    });
  }

  handleChange = e => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("update button clicked")
    console.log("state", this.state)
    fetchApi({
      url: Routes.task_path(this.props.task.id),
      method: 'PATCH',
      body: { desc: this.state.description },
      onError: this.handleError,
      onSuccess: response => {
        console.log(response,"response");
      },
      successCallBack: () => {
        window.location.replace(Routes.tasks_path());
      },
    });
  };

  // displayErrors() {
  //   const { errors } = this.state;

  //   return (
  //     <div className="row">
  //       {errors && (
  //         <div className="mt-4">
  //           <Errors errors={errors.errors} message={errors.type} />
  //         </div>
  //       )}
  //     </div>
  //   )
  // } Not 

  displayErrors() {
    const { errors } = this.state;

    return (
      
      <div>
      {errors.length != 0 ? (
        <div>
          <Errors errors={errors.errors} message="danger" />
        </div>
      ) : null}
    </div>
    )
  }

  displayNewTaskForm() {
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Description : </label>
          </div>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.handleChange}
              // placeholder={this.state.description}
            />
          </div>
        </div>
        <br />
        <button
          className="btn btn-md btn-primary"
          type="submit"
          onClick={this.handleSubmit}
        >
          Update task
        </button>
      </div>
    )
  }
  // handleSubmit=(e)=>{
  //   e.preventDefault()
  //   API.updateTask({id:this.props.task.id, taskPayload:{task:{desc: this.state.desc}}})
  //   .then((res)=>{
  //     this.setState({
  //       message: res.notice
  //     })
  //   })
  //   .catch((err)=>{
  //     console.log("err in submit function", err);
  //     err.json().then(({errors})=>{
  //       this.setState({
  //         errors
  //       })
  //     })
  //   })
  // }


  render() {
    console.log({"state":this.state,"props":this.props})
    return (
      <React.Fragment>
        <div className="container">
          <h3 className="py-3">Enter new task details</h3>
          {this.displayErrors()}
          {this.displayNewTaskForm()}
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;
