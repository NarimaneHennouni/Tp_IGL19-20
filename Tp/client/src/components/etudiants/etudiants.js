import React,{Component} from 'react';
import './etudiants.css';
var i=0;

class Etudiants extends Component{
constructor(){
    super();
    this.state={
        etudiants: []
    }
}

componentDidMount(){
    fetch('/api')
   .then(res => res.json())
    .then(etudiants => this.setState({etudiants},()=> console.log('fetched',etudiants)));
}

  render() {
    return(
      <div >
      
        <section>
      <h1>Classement Etudiants</h1>
      <div class="tbl-header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Moy_RES</th>
              <th>Moy_THP</th>
              <th>Moy_ANUM</th>
              <th>Moy_IGL</th>
              <th >Classement</th>
            </tr>
          </thead>
          <tbody>
          {this.state.etudiants.map(etudiant=>
           <tr key={etudiant.id_etud}>
           <th>{etudiant.id_etud}</th>
           <th>{etudiant.Moy_RES}</th>
           <th>{etudiant.Moy_THP}</th>
           <th>{etudiant.Moy_ANUM}</th>
           <th>{etudiant.Moy_IGL}</th>
           <th class="classement"></th>
         </tr>
         )}
              
          </tbody>
        </table>
      </div>
    </section>
      </div>
    );

  }
}

export default Etudiants;
