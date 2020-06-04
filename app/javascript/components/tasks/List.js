import React from 'react';
import * as Routes from "../../utils/Routes"

const List = ({ tasks }) => {
  const displayTaskList = () => {
    console.log('tasks', tasks)
    return (
      <div>
        <h1>Tasks List</h1>
        <div className="p-1">
          {tasks && tasks.length ? (
            <ul className="list-group list-unstyled">
              {tasks.map((task, index) => {
                return (
                  <li key={index}>
                    Task id : {task.id}
                    <a href={Routes.task_path_show(task.id)}>Show Task</a>
                    <br />
                    Task description: {task.desc}
                    
                  </li>
                );
              })}
            </ul>
          ) : (
            <h3>No task has been created yet</h3>
          )}
        </div>
      </div>
    )
  }

  const displayAddNewTaskButton = () => {
    return (
      <a className="btn btn-primary" href={Routes.new_task_path()}>
        Add New Task
      </a>
    )
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          {displayTaskList()}
        </div>
        <div className="col-md-2">
          {displayAddNewTaskButton()}
        </div>
      </div>
    </div>
  );
}

export default List;