import React from "react";

import * as Routes from "./../../utils/Routes";
import { fetchApi } from "../../utils/API";
import Errors from "../shared/Errors";
import Form from "../tasks/comment/Form"

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      errors:null,
    }
    this.handleError = this.handleError.bind(this)
  }

  handleError(response){
    this.setState({
      errors:{
        errors: response.messages,
        type: response.type
      }
    })
  }
  handleDelete=(id)=>{
    const taskDelete = confirm('Do you really want to delete the task')
    if (taskDelete){
      fetchApi({
        url:Routes.task_path(id),
        method:"DELETE",
        onError:this.handleError,
        onSuccess:(response)=>{
          console.log(response)
        },
        successCallBack:()=>{
          window.location.replace(Routes.tasks_path());
        }
      })
    }
  }

  displayErrors=()=>{
    const { errors } = this.state
    return(
      <div>
        {
          errors && (
            <div>
              <Errors errors={errors.errors} message={errors.type}/>
            </div>
          )
        }
      </div>
    )
  }

  render() {
    const { task, comments } = this.props;
    return (
      <>
        <div className="container">
          <h2 className="py-3">Task Details</h2>
          <div className="row">
            <div className="col-md-10">
              {task.id}.{task.desc}
              <a className="ml-2 btn btn-sm btn-warning"
                href={Routes.edit_task_path(task.id)}>
                Edit
              </a>
              <a className="ml-2 btn btn-sm btn-danger"
                href={Routes.delete_task_path(task.id)}
                onClick={()=>this.handleDelete(task.id)}>
                Delete
              </a>
            </div>
            <div className="mt-4 pt-4 border-top">
            <h3 className="mb-3">Comments</h3>
            {comments && comments.map((comment,index) => {
              return (
                <div key= {index} className="pl-2">
                  <p  className="font-weight-bold">{comment.content}</p>
                </div>
              );
            })}
            <Form  task={task} />
          </div>
          </div>
        </div>
        {/* <div className="row"> */}
          
        {/* </div> */}
      </>
    );
  }
}

export default Show;
