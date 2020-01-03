/**
 * This file desribes the list of questions posted by users on the forum
 * @module client-side/src/components/Question-js
 */
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Questions.css';
import conf from './confused.png';
import ExampleComponent from "react-rounded-image";

/**
 * default class which desribes members of questions' container
 * @class 
 */
export default class Questions extends React.Component {
  constructor(){
    super()
    /**
     * @property {{question:array,show:boolean}} state -members of the class : questions contain the response, and show is a boolean that shows or not questions
     */
    this.state= {
      questions : [],
      show: false
    }
  }
  /**
   * @property {function} operation -shows or hides questions
   */      
  operation (){
    this.setState({
      show : !this.state.show
    })
  }
  /**
   * @property {function} componentDidMount -gets questions from the api
   */  
  componentDidMount() {
  axios.get(`http://localhost:3000/forumesiquestions`).then(res => {
    this.setState({ questions : res.data});
  });
  }
 /**
   * @property {function} render -renders the Questions component described bellow
   */
  render (){
    return (
      /**
       * @name questions.map 
       * @desription  for each question : display its id and its content into an accordion 
       */
      this.state.questions.map(question =>
        
        <div class="container ">
          <div class="row ">
            <div class="col-sm-12 my-auto">
            <div class="accordion " id="accordionExample" >
      <div class="card" >
        {/**
         * @name image 
         * @description ExampleComponent that creates a rounded image
         */}

        <div class="card-header" id="headingOne" >
          <h2 class="mb-0" >
            <ExampleComponent 
          image={conf}
          roundedSize="0"
          imageWidth="50"
          imageHeight="50"
        />
          
            <button class="btn btn-link"  name="questionbtn"
            data-toggle="collapse" data-target={question.id_qst} onClick={()=>this.operation()}//aria-expanded="false" aria-controls="collapseOne"
            >
             Question {question.id_qst} :
            </button>
          </h2>
        </div>
        { this.state.show ? <div id={question.id_qst} class="collapse show" //aria-labelledby="headingOne" data-parent="#accordionExample"
        >
          <div class="card-body">
            {question.question}
          </div>
        </div> : null}   
        
      </div>
    </div>
            </div>
          </div>
        </div>
        

        ))
  }
}