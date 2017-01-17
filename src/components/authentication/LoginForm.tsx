import * as React from "react";

import { DropdownOptions } from "../shared/DropdownOptions";
import { DropdownOptionItem } from "../shared/DropdownOptions";

export class LoginForm extends React.Component<undefined, LoginFormState> {

    private options : Array<DropdownOptionItem>;

    constructor() {
        super();

        this.options = new Array<DropdownOptionItem>();
        this.options.push(new DropdownOptionItem(LoginType.Dynamics365.displayName, LoginType.Dynamics365.value));
        this.options.push(new DropdownOptionItem(LoginType.Ifd.displayName, LoginType.Ifd.value));
        this.options.push(new DropdownOptionItem(LoginType.OnPremise.displayName, LoginType.OnPremise.value));

        this.state = { loginType : this.options[0] };
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
                    <input id="crmurl" type="text" className="validate"/>
                    <label>CRM URL</label>
                    </div>
                </div>

                {this.state.loginType.value !== LoginType.Dynamics365.value &&

                    <div>
                        <div className="row">
                            <div className="input-field">
                            <input id="domain" type="text" className="validate"/>
                            <label>Domain</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field">
                                <input id="username" type="text" className="validate"/>
                                <label>User name</label>
                            </div>
                        </div>
                    </div>
                } 
                {this.state.loginType.value === LoginType.Dynamics365.value &&

                    <div className="row">
                        <div className="input-field">
                            <input id="email" type="email" className="validate"/>
                            <label>Email Address</label>
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="input-field">
                    <input id="password" type="password" className="validate"/>
                    <label>Password</label>
                    </div>
                </div>
            </form>
    }

    handleLoginTypeSelection = (selection: DropdownOptionItem ) => {
        this.setState({ loginType : selection });
    }
}

export interface LoginFormState {
    loginType : DropdownOptionItem;
}

export class LoginType {

    displayName : string;
    value : string;

    private constructor(value : string, displayName : string) {
        this.displayName = displayName;
        this.value = value
    }

    static Dynamics365 = new LoginType("dynamics365", "Dynamics 365");
    static OnPremise = new LoginType ("onPremise", "On Premise");
    static Ifd = new LoginType("internetFacing", "Internet facing (IFD)");
}