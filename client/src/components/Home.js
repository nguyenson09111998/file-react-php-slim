import React, { Component } from 'react';
import './../home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-page" >
                <div className="container">
                    <div className="row">
                        <div className="text-center mrg-100 intro-text col-md-12">
                            <h3>Welcome to online test</h3>
                            <h2>IT'S NICE TO MEET YOU</h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;