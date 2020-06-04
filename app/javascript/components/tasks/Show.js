import React from "react"

import * as Routes from "./../../utils/Routes"


class Show extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { task } = this.props 
    return(
      <>
        <div className="container">
          <h2 className="py-3">
            Task Details
          </h2>
          <div className="row">
            <div className="col-md-10">
              {task.id}.
              {task.desc}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Show;
