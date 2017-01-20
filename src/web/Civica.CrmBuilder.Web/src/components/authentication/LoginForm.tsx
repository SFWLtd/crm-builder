import * as React from "react";
import { Promise } from "es6-promise";

import { DropdownOptions } from "../shared/DropdownOptions";
import { IDropdownOptionItem } from "../shared/DropdownOptions";
import * as ApiClient from "../../../../../api/ApiClient"

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    private options : Array<IDropdownOptionItem>;

    constructor(props : LoginFormProps) {
        super(props);

        this.options = new Array<IDropdownOptionItem>();
        this.options.push(new Dynamics365DropdownOption());
        this.options.push(new IfdDropdownOption());
        this.options.push(new OnPremiseOption());

        this.state = { authenticationType : this.options[0], domain : null, email : null, password : null, url : null, username : null };
    }

    render() {

        return <form className="col s12">
                <div className="row">
                    <label>Connection type:</label>
                    <DropdownOptions options={this.options} onSelection={this.handleLoginTypeSelection}/>
                </div>
                <br/>

                <div className="row">
                    <div className="input-field">
                    <input id="crmurl" type="text" className="validate" value={this.state.url}/>
                    <label>CRM URL</label>
                    </div>
                </div>

                {this.state.authenticationType.value !== ApiClient.AuthenticationType.Dynamics365 &&

                    <div>
                        <div className="row">
                            <div className="input-field">
                            <input id="domain" type="text" className="validate" value={this.state.domain}/>
                            <label>Domain</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field">
                                <input id="username" type="text" className="validate" value={this.state.username}/>
                                <label>User name</label>
                            </div>
                        </div>
                    </div>
                } 
                {this.state.authenticationType.value === ApiClient.AuthenticationType.Dynamics365 &&

                    <div className="row">
                        <div className="input-field">
                            <input id="email" type="email" className="validate" value={this.state.email}/>
                            <label>Email Address</label>
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="input-field">
                    <input id="password" type="password" className="validate" value={this.state.password}/>
                    <label>Password</label>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <a onClick={this.login} className="waves-effect waves-light btn">Log in</a>
                </div>
            </form>
    }

    login = () => {
        try {
            var client = new ApiClient.AuthenticationClient("http://localhost:8001");
            
            var request = new ApiClient.AuthenticateRequest();
            request.url = this.state.url;
            request.authenticationType = this.state.authenticationType.value;
            request.domain = this.state.domain;
            request.emailAddress = this.state.email;
            request.userName = this.state.username;
            request.password = this.state.password;

            let response : Promise<ApiClient.GlobalJsonResultOfAuthenticateResult>;
            response = client.authenticate(request, "");
            response.then((response : ApiClient.GlobalJsonResultOfAuthenticateResult) => {
                var test = "dsahjdshjkl";
            })
        }
        catch (e) {

        }
    }

    handleLoginTypeSelection = (selection: IDropdownOptionItem ) => {
        this.setState({ authenticationType : selection,
            url : this.state.url,
            domain : this.state.domain,
            username : this.state.username,
            email : this.state.email,
            password : this.state.password, })
    }
}

class Dynamics365DropdownOption implements IDropdownOptionItem {
    displayName : string;
    value: any;

    constructor() {
        this.displayName = "Dynamics 365";
        this.value = ApiClient.AuthenticationType.Dynamics365;
    }
}

class IfdDropdownOption implements IDropdownOptionItem {
    displayName : string;
    value: any;

    constructor() {
        this.displayName = "Internet facing deployment (IFD)";
        this.value = ApiClient.AuthenticationType.Ifd;
    }
}

class OnPremiseOption implements IDropdownOptionItem {
    displayName : string;
    value: any;

    constructor() {
        this.displayName = "On premise";
        this.value = ApiClient.AuthenticationType.OnPremise;
    }
}


export interface LoginFormState {
    authenticationType : IDropdownOptionItem;
    url : string;
    domain : string
    username : string;
    email : string;
    password : string;
}

export interface LoginFormProps {
    loggedInStateHandler : (loggedIn : boolean) => void;
}