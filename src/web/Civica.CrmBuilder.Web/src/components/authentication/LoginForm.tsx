import * as React from 'react';
import { Promise } from 'es6-promise';

import { FormWrapper } from '../forms/FormWrapper';
import { Input } from '../forms/Input';
import { FormElementWrapper } from '../forms/FormElementWrapper';
import * as Dropdown from '../forms/DropdownOptions';
import * as ApiClient from '../../../../../api/ApiClient';
import { Validate } from '../validation/Validate';

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    handleLoginTypeSelection = (selection: Dropdown.IDropdownOptionItem) => {
        this.setState({ authenticationType: selection });
    };

    onEmailChange = (event: any) => {
        this.setState({ email: event.target.value })
    };

    validateEmail = () => {
        return Validate.thisString(this.state.email).email();
    };

    onDomainChange = (event: any) => {
        this.setState({ domain: event.target.value });
    };

    validateDomain = () => {
        return Validate.thisString(this.state.domain).length(1, 100);
    };

    validateUsername = () => {
        return Validate.thisString(this.state.username).length(1, 100);
    };

    onUsernameChange = (event: any) => {
        this.setState({ username: event.target.value })
    };

    onUrlChange = (event: any) => {
        this.setState({ url: event.target.value });
    };

    validateUrl = () => {
        return Validate.thisString(this.state.url).url();
    };

    onPasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    };

    validatePassword = () => {
        return Validate.thisString(this.state.password).length(1, 100);
    }

    validateForm = function () {
        let validationMessages = new Array<string>();

        // to do
        if (!this.validatePassword) {
            validationMessages.push('Password is invalid');
        }
        if (!this.validateUrl) {
            validationMessages.push('URL is invalid');
        }

        return validationMessages;
    };

    login = () => {
        try {
            let client = new ApiClient.AuthenticationClient('http://localhost:8001');

            let request = new ApiClient.AuthenticateRequest();
            request.url = this.state.url;
            request.authenticationType = this.state.authenticationType.value;
            request.domain = this.state.domain;
            request.emailAddress = this.state.email;
            request.userName = this.state.username;
            request.password = this.state.password;

            let response: Promise<ApiClient.GlobalJsonResultOfAuthenticateResult>;
            response = client.authenticate(request, '');
            response.then((response: ApiClient.GlobalJsonResultOfAuthenticateResult) => {
                let test = 'dsahjdshjkl';
            });
        } catch (e) {

        }
    };

    private options: Array<Dropdown.IDropdownOptionItem>;

    constructor(props: LoginFormProps) {
        super(props);

        this.options = new Array<Dropdown.IDropdownOptionItem>();
        this.options.push(new Dynamics365DropdownOption());
        this.options.push(new IfdDropdownOption());
        this.options.push(new OnPremiseOption());

        this.state = { authenticationType: this.options[0], domain : null, email : null, password : null, url : null, username : null };
    }

    render() {

        return <FormWrapper submitHandler={this.login} submissionLabel='Log in' validationHandler={this.validateForm}>
                    <FormElementWrapper label='Connection type:'>
                        <Dropdown.DropdownOptions options={this.options} onSelection={this.handleLoginTypeSelection} />
                    </FormElementWrapper>

                    <FormElementWrapper label='CRM URL'>
                        <Input id='crmurl' type='text' value={this.state.url} validate={this.validateUrl} onChange={this.onUrlChange} />
                    </FormElementWrapper>
                    {
                        this.state.authenticationType.value !== ApiClient.AuthenticationType.Dynamics365 &&
                        <div>
                        <FormElementWrapper label='Domain'>
                            <Input id="domain" type="text" value={this.state.domain} validate={this.validateDomain} onChange={this.onDomainChange} />
                        </FormElementWrapper>
                        <FormElementWrapper label='Username'>
                            <Input id="username" type="text" value={this.state.username} validate={this.validateUsername} onChange={this.onUsernameChange} />
                        </FormElementWrapper>
                        </div>
                    }
                    {
                        this.state.authenticationType.value === ApiClient.AuthenticationType.Dynamics365 &&
                        <FormElementWrapper label='Email'>
                            <Input id='email' type='text' value={this.state.email} validate={this.validateEmail} onChange={this.onEmailChange} />
                        </FormElementWrapper>
                    }

                    <FormElementWrapper label='Password'>
                        <Input id='password' type='password' value={this.state.password} validate={this.validatePassword} onChange={this.onPasswordChange} />
                    </FormElementWrapper>
        </FormWrapper>;
    }
}

class Dynamics365DropdownOption implements Dropdown.IDropdownOptionItem {
    displayName: string;
    value: any;

    constructor() {
        this.displayName = 'Dynamics 365';
        this.value = ApiClient.AuthenticationType.Dynamics365;
    }
}

class IfdDropdownOption implements Dropdown.IDropdownOptionItem {
    displayName: string;
    value: any;

    constructor() {
        this.displayName = 'Internet facing deployment (IFD)';
        this.value = ApiClient.AuthenticationType.Ifd;
    }
}

class OnPremiseOption implements Dropdown.IDropdownOptionItem {
    displayName: string;
    value: any;

    constructor() {
        this.displayName = 'On premise';
        this.value = ApiClient.AuthenticationType.OnPremise;
    }
}

export interface LoginFormState {
    authenticationType?: Dropdown.IDropdownOptionItem;
    url?: string;
    domain?: string;
    username?: string;
    email?: string;
    password?: string;
}

export interface LoginFormProps {
    loggedInStateHandler: (loggedIn: boolean) => void;
}
