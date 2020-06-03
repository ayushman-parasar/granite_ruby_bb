import React from 'react';

const List = ({ tasks }) => {
  const displayTaskList = () => {
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
                    <br />
                    Task description: {task.description}
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
      <a className="btn btn-primary" href="tasks/new">
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