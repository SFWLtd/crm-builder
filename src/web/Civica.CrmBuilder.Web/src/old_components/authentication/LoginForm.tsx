import * as React from 'react';
import { Promise } from 'es6-promise';

import { ConnectionTypeDropdown } from './ConnectionTypeDropdown';
import { FormWrapper } from '../forms/FormWrapper';
import { CustomHttpStatusCodeHandler } from '../forms/FormWrapper';
import { Input } from '../forms/Input';
import { FormElementWrapper } from '../forms/FormElementWrapper';
import * as Dropdown from '../forms/DropdownOptions';
import * as ApiClient from '../../../../../api/ApiClient';
import { Validate } from '../validation/Validate';

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    handleLoginTypeSelection = (selection: ApiClient.AuthenticationType) => {
        this.setState({ authenticationType: selection, formIsNotNew: false  });
    };

    onEmailChange = (event: any) => {
        this.setState({ email: event.target.value });
    };

    validateEmail = () => {
        if (this.state.authenticationType == ApiClient.AuthenticationType.Dynamics365) {
            return Validate.thisString(this.state.email).email();
        }

        return true;
    };

    onDomainChange = (event: any) => {
        this.setState({ domain: event.target.value });
    };

    validateDomain = () => {
        if (this.state.authenticationType != ApiClient.AuthenticationType.Dynamics365) {
            return Validate.thisString(this.state.domain).length(1, 100);
        }

        return true;
    };

    validateUsername = () => {
        if (this.state.authenticationType != ApiClient.AuthenticationType.Dynamics365) {
            return Validate.thisString(this.state.username).length(1, 100);
        }

        return true;
    };

    onUsernameChange = (event: any) => {
        this.setState({ username: event.target.value });
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
    };

    validateForm = () => {

        this.setState({ formIsNotNew: true });

        let validationMessages = new Array<string>();

        if (!this.validateUrl()) {
            validationMessages.push('URL is invalid');
        }

        if (!this.validateEmail()) {
            validationMessages.push('Email is invalid');
        }

        if (!this.validateDomain()) {
            validationMessages.push('Domain is invalid');
        }

        if (!this.validateUsername()) {
            validationMessages.push('Username is invalid');
        }

        if (!this.validatePassword()) {
            validationMessages.push('Password is invalid');
        }

        return validationMessages;
    };

    login = () => {
        let client = new ApiClient.SessionClient('http://localhost:8001');

        let request = new ApiClient.NewSessionRequest();
        request.url = this.state.url;
        request.authenticationType = this.state.authenticationType;
        request.domain = this.state.domain;
        request.emailAddress = this.state.email;
        request.userName = this.state.username;
        request.password = this.state.password;

        let response: Promise<ApiClient.GlobalJsonResultOfSessionTokenResult>;
        return response = client.newSession(request, '');
    };

    private options: Array<Dropdown.IDropdownOptionItem>;
    private customErrors: Array<CustomHttpStatusCodeHandler>;

    constructor(props: LoginFormProps) {
        super(props);

        this.options = ConnectionTypeDropdown.Options();

        this.customErrors = new Array<CustomHttpStatusCodeHandler>();
        this.customErrors.push(new CustomHttpStatusCodeHandler(ApiClient.HttpStatusCode.Unauthorized, 'Invalid credentials. Please try again'));

        this.state = { authenticationType: this.options[0].value, domain : null, email : null, password : null, url : null, username : null };
    }

    render() {

        return <FormWrapper submit={this.login} submissionLabel='Log in' validationHandler={this.validateForm} onSubmitSuccess={this.props.loggedInStateHandler} customStatusCodeMessages={this.customErrors} submissionAttempted={this.state.formIsNotNew}>
                    <FormElementWrapper label='Connection type:'>
                        <Dropdown.DropdownOptions options={this.options} onSelection={this.handleLoginTypeSelection} />
                    </FormElementWrapper>

                    <FormElementWrapper label='CRM URL'>
                        <Input id='crmurl' type='text' value={this.state.url} validate={this.validateUrl} onChange={this.onUrlChange} submissionAttempted={this.state.formIsNotNew} />
                    </FormElementWrapper>
                    {
                        this.state.authenticationType != ApiClient.AuthenticationType.Dynamics365 &&
                        <div>
                        <FormElementWrapper label='Domain'>
                            <Input id='domain' type='text' value={this.state.domain} validate={this.validateDomain} onChange={this.onDomainChange} submissionAttempted={this.state.formIsNotNew} />
                        </FormElementWrapper>
                        <FormElementWrapper label='Username'>
                            <Input id='username' type='text' value={this.state.username} validate={this.validateUsername} onChange={this.onUsernameChange} submissionAttempted={this.state.formIsNotNew} />
                        </FormElementWrapper>
                        </div>
                    }
                    {
                        this.state.authenticationType == ApiClient.AuthenticationType.Dynamics365 &&
                        <FormElementWrapper label='Email'>
                            <Input id='email' type='text' value={this.state.email} validate={this.validateEmail} onChange={this.onEmailChange} submissionAttempted={this.state.formIsNotNew} />
                        </FormElementWrapper>
                    }

                    <FormElementWrapper label='Password'>
                        <Input id='password' type='password' value={this.state.password} validate={this.validatePassword} onChange={this.onPasswordChange} submissionAttempted={this.state.formIsNotNew} />
                    </FormElementWrapper>
        </FormWrapper>;
    }
}

export interface LoginFormState {
    authenticationType?: ApiClient.AuthenticationType;
    url?: string;
    domain?: string;
    username?: string;
    email?: string;
    password?: string;
    formIsNotNew?: boolean;
}

export interface LoginFormProps {
    loggedInStateHandler: (result: ApiClient.SessionTokenResult) => void;
}
