import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"; 
import Etudiants from './components/etudiants/etudiants';
import home from './components/etudiants/home';




class App extends React.Component {
  render() {
  return (
    <Router>
   <div className="App">     

   <Switch>
   <Route path="/affichage" component={Etudiants}/> 

   <Route path ="/" component={home} /></Switch> 
    </div>
    </Router>
  );
}
}
export default App;
