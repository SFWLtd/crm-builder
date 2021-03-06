﻿import * as React from "react";
import { Button, Card , Dimmer, Form, Header, Icon, Loader, Message } from "semantic-ui-react";
import * as ApiClient from "../../../api/ApiClient";

export class AuthenticationForm extends React.Component<IAuthenticationFormProps, undefined> {

    constructor(props: IAuthenticationFormProps) {
        super(props);
    }

    public render() {
        return <div>
            <br />
            <Header as="h2" icon textAlign="center">
                <Icon name="sign in" circular />
            </Header>
            <Header as="h3" textAlign="center">Sign in to CRM</Header>
            <br />
            <Card centered>
                <Card.Content>
                    <Form size="large">
                        <Form.Field>
                            <div className="ui form large">
                                <div className="field">
                                    <label>Authentication type</label>
                                    <select className="ui dropdown" value={this.props.authenticationTypeSelectedValue} onChange={(e) => { this.props.authenticationTypeOnChange((e as any).target.value); } }>
                                        <option value={ApiClient.AuthenticationType.Dynamics365}>Dynamics 365</option>
                                        <option value={ApiClient.AuthenticationType.Ifd}>IFD (Internet Facing deployment)</option>
                                        <option value={ApiClient.AuthenticationType.OnPremise}>On premise</option>
                                    </select>
                                </div>
                            </div>
                        </Form.Field>
                        <Form.Field error={(this.props.crmUrlHasBeenTouched || this.props.shouldValidateForm) && !this.props.crmUrlIsValid }>
                            <label>CRM Url</label>
                            <input autoComplete="true" placeholder="https://myorg.dynamics.com" onChange={(e) => { this.props.crmUrlOnChange((e as any).target.value); }} onBlur={this.props.crmUrlOnBlur}/>
                        </Form.Field>
                        {
                            this.props.authenticationTypeSelectedValue === ApiClient.AuthenticationType.Dynamics365 as number &&
                            <Form.Field error={(this.props.emailAddressHasBeenTouched || this.props.shouldValidateForm) && !this.props.emailAddressIsValid}>
                                <label>Email address</label>
                                <input autoComplete="true" placeholder="myemail@dynamics.com" onChange={(e) => { this.props.emailAddressOnChange((e as any).target.value); } } onBlur={this.props.emailAddressOnBlur} />
                            </Form.Field>
                        }
                        {
                            this.props.authenticationTypeSelectedValue !== ApiClient.AuthenticationType.Dynamics365 as number &&
                            <Form.Field error={(this.props.domainHasBeenTouched || this.props.shouldValidateForm) && !this.props.domainIsValid}>
                                <label>Domain</label>
                                <input autoComplete="true" placeholder="mydomain" onChange={(e) => { this.props.domainOnChange((e as any).target.value); } } onBlur={this.props.domainOnBlur} />
                            </Form.Field>
                        }
                        {
                            this.props.authenticationTypeSelectedValue !== ApiClient.AuthenticationType.Dynamics365 as number &&
                            <Form.Field error={(this.props.usernameHasBeenTouched || this.props.shouldValidateForm) && !this.props.usernameIsValid}>
                                <label>Username</label>
                                <input autoComplete="true" placeholder="myusername" onChange={(e) => { this.props.usernameOnChange((e as any).target.value); } } onBlur={this.props.usernameOnBlur} />
                            </Form.Field>
                        }
                        <Form.Field error={(this.props.passwordHasBeenTouched || this.props.shouldValidateForm) && !this.props.passwordIsValid}>
                            <label>Password</label>
                            <input autoComplete="true" type="password" onChange={(e) => { this.props.passwordOnChange((e as any).target.value); } } onBlur={this.props.passwordOnBlur} />
                        </Form.Field>
                        <br/>
                        <Button primary onClick={(e: any) => { e.preventDefault(); this.props.onSubmit(this.props); } }>Log in</Button>
                        {
                            this.props.submissionError && this.props.submissionError !== "" &&
                            <Message negative>
                                <p>{this.props.submissionError}</p>
                            </Message>
                        }
                        
                    </Form>
                </Card.Content>
            </Card>
            <Dimmer active={this.props.hasStartedSubmit} page>
                <Loader>
                    <p>Logging in...</p>
                </Loader>
            </Dimmer>
        </div>;
    }
}

export interface IAuthenticationFormProps {
    authenticationTypeSelectedValue?: number;
    authenticationTypeOnChange?: (value: number) => void;
    crmUrlOnChange?: (value: string) => void;
    crmUrl?: string;
    crmUrlIsValid?: boolean;
    crmUrlOnBlur?: () => void;
    crmUrlHasBeenTouched?: boolean;
    emailAddressOnChange?: (value: string) => void;
    emailAddress?: string;
    emailAddressIsValid?: boolean;
    emailAddressOnBlur?: () => void;
    emailAddressHasBeenTouched?: boolean;
    domainOnChange?: (value: string) => void;
    domain?: string;
    domainIsValid?: boolean;
    domainOnBlur?: () => void;
    domainHasBeenTouched?: boolean;
    usernameOnChange?: (value: string) => void;
    username?: string;
    usernameIsValid?: boolean;
    usernameOnBlur?: () => void;
    usernameHasBeenTouched?: boolean;
    passwordOnChange?: (value: string) => void;
    password?: string;
    passwordIsValid?: boolean;
    passwordOnBlur?: () => void;
    passwordHasBeenTouched?: boolean;
    shouldValidateForm?: boolean;
    onSubmit?: (form: IAuthenticationFormProps) => void;
    hasStartedSubmit?: boolean;
    submissionError?: string;
}
