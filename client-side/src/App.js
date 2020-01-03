/**
 * This file runs the react app
 * @module client-side/src/App-js
 */
import React, {Component} from 'react';
import './App.css';
import Questions from './components/Questions';
import QuestionForm from './components/QuestionForm';

/**
 * @description is a Component which renders the app's views (inner components).
 * @member
 * @class App
 */
class App extends Component {
  render(){
    return (
      <div className="App">
        <QuestionForm/>
        <Questions/>
      </div>
    );
  }
}
export default App;
