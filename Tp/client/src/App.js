import React,{Component} from 'react';
import './App.css';

import Etudiants from './components/etudiants/etudiants';




class App extends Component{
  render() {
    return(
    
      <div className="App">
          <Etudiants />
      </div>
    );

  }
}


export default App;
