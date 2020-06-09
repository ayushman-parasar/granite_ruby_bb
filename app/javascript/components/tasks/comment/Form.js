import React, { Component, Fragment } from 'react';
import { fetchApi } from '../../../utils/API';
import * as Routes from '../../../utils/Routes';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      errors: null
    };
  }
   handleError(response) {
    this.setState({
      errors: {
        errors: response.messages,
        type: response.type
      }
    });
  }

  handleChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleSubmit = e => {

    e.preventDefault();
    const { task } = this.props;
    fetchApi({
      url: Routes.task_comments_path(task.id),
      method: 'POST',
      body: {
        comment: { content: this.state.comment, task_id: task.id }
      },
      onError: this.handleError,
      onSuccess: response => {
        console.log(response);
      },
      successCallBack: () => {
        window.location.href = Routes.task_path(task.id);
      }
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <Fragment>
       <div className="row">
            {errors && (
              <div className="mt-4">
                <Errors errors={errors.errors} message={errors.type} />
              </div>
            )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row mt-3">
            <div className="form-group col-8">
              <textarea
                value={this.state.comment}
                onChange={this.handleChange}
                cols={40}
                rows={10}
              />
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default Form;


