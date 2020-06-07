import React from "react"
import * as Routes from "../../utils/Routes"
import { fetchApi } from "../../utils/API"
import Errors from "../shared/Errors"


class New extends React.Component {
  constructor(){
    super()
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        errors: null,
        message: null
      }
    }
  }

  handleError=(response)=>{
    this.setState({
      errors: {
        errors: response.messages,
        type: response.type
      }
    })
  }

  handleChange=({target:{name, value}})=>{
    this.setState({
      user: {
        ...this.state.user,
        [name]:value
      }
    })
  }

  handleSubmit =(e)=>{
    e.preventDefault()
    fetchApi({
      url: Routes.users_path(),
      method: "GET",
      onError: this.handleError,
      onSuccess:(response)=>{
        this.setState({
          message: response.messages
        })
      } 
    })
  }

  render () {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}

export default New
