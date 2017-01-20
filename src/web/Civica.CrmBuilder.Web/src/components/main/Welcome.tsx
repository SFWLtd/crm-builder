import * as React from "react";

import { LoginForm } from "../authentication/LoginForm";

export class Welcome extends React.Component<undefined, undefined> {
    render() {
        return <div>  
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                <span className="card-title">Welcome to CRM Builder</span>
                <p>Continuous integration for CRM solutions.</p>
                <br/>
                </div>
            </div>
        <br/>
        <br/>
        <LoginForm loggedInStateHandler={this.loggedInStateHandler}/>
    </div>
    }

    loggedInStateHandler = () => {
        
    }
}