import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"; 
import '../../App.css';
import Etudiants from './etudiants.js';

class Affichage extends React.Component
{
  render() {
    return(

       
  <div class="nava">
    <Link to="/affichage"> <button class="boutonf"><span>Calculer les moyennes et afficher le classement</span>
    </button> </Link>
  </div>  


    );

}
}
export default Affichage;