/**
 * This file desribes the question form component and different handled events on it
 * @module client-side/src/components/QuestionForm-js
 */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Questions.css';
import Location from 'react';

/**
 * default class which desribes the members of a questionForm
 * @class 
 */
export default class QuestionForm extends React.Component {
/**
 * @property {{question:string,id_user:int}} state -attributes of the class
 */
  state ={
    question : '',
    //id_user : '',
  };
 
  /**
   * @property {function} handleChangeInputQuestion -displays the input of the user in the textarea
   */
  handleChangeInputQuestion = event => {
      this.setState({question : event.target.value})
  }
 /**
  * @property {function} handleSubmit -makes a post request for the api in order to insert the question, then it refreshes the browser
  */
  handleSubmit = event => {
      event.preventDefault();
      const question = {
          question : this.state.question,
      }
      axios.post(`http://localhost:3000/forumesiquestions`,{question})
      .then(res => {
          console.log(res);
          console.log(res.data);
          Location.reload();
      });
      setTimeout(function(){window.location.reload();},10);
  }

  /**
   * @property {function} render -renders the questionForm component described bellow
   */
  render (){
    return (
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit} class=" col-sm-12 my-auto">
             <div class=" input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">Question</span>
            </div>
            <textarea class="form-control" aria-label="With textarea"name="question" onChange={this.handleChangeInputQuestion} ></textarea>
            </div>
            
            <button type="submit" className="btn btn-success" name="poster">Poster</button>
        </form>
            </div>
        </div>
        
  );
  }
}