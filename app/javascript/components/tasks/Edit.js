import React from "react";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      desc:null
    }
  }
  handleChange=(e)=>{
    this.setState({
      desc: e.target.value
    })
  }

  displayEditTaskForm = (task) => {
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
              placeholder={task.desc}
            />
          </div>
        </div>
        <br />
        <button className="btn btn-md btn-primary" type="submit">
          Update task
        </button>
      </div>
    );
  };

  render() {
    console.log("props", this.props)
    const { task } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <h3 className="py-3">Enter updated task details</h3>
          {this.displayEditTaskForm(task)}
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;
