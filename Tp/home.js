import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
    render() {
        return (
            <div>
                <p>Please choose a repository from the list below.</p>
                <ul>
                    <li><Link to="/server.js">React</Link></li>
                </ul>
            </div>
        );
    }
}

export default Home;