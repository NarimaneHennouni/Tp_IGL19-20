import React from 'react';
import ReactDOM from 'react-dom';
import Affichage from './affichage' ;
import './etudiants.css';
function home()
{
    return(
        <body class="bodyh">
<div class="homme">



<div class="header" id="myHeader">
     
    	<div class="containerh">
            <h1 class="h"> Welcome to</h1>
          <h1 class="h">ESI <span>SCHOOL</span></h1>			
        </div>
		<Affichage />

	</div>
    </div>

    </body>
    );

}

export default home;