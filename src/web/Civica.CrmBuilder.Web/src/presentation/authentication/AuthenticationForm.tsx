import * as React from 'react';
import * as $ from 'jquery';
import * as Materialize from 'materialize-css'
import * as ApiClient from '../../../../../api/ApiClient';

export class AuthenticationForm extends React.Component<IAuthenticationFormProps, undefined> {

    constructor(props: IAuthenticationFormProps) {
        super(props);
    }

    render() {
        return <div className='wrap'>
            <div className='card blue-grey darken-1'>
                <div className='card-content white-text'>
                    <span className='card-title'>Welcome to CRM Builder</span>
                    <p>Continuous integration for CRM solutions.</p>
                    <br />
                </div>
            </div>
            <br />
            <br />
            <form className='col s12'>
                <label>CRM Authentication Type</label>
                <select className='browser-default' value={this.props.authenticationTypeSelectedValue}
                    onChange={e => { this.props.authenticationTypeOnChange((e as any).target.value) }}>
                    <option value={ApiClient.AuthenticationType.Dynamics365}>Dynamics365</option>
                    <option value={ApiClient.AuthenticationType.Ifd}>IFD (internet facing deployment)</option>
                    <option value={ApiClient.AuthenticationType.OnPremise}>OnPremise</option>
                </select>
                <br />

                <div className='input-field col s6'>
                    <input type='text' value={this.props.crmUrl}
                        className={(this.props.crmUrlHasBeenTouched || this.props.shouldValidateForm) && !this.props.crmUrlIsValid ? 'invalid' : ''}
                        onChange={e => { this.props.crmUrlOnChange((e as any).target.value) }}
                        onBlur={this.props.crmUrlOnBlur}/>
                    <label>CRM URL</label>
                </div>
                {
                    this.props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.Dynamics365 &&
                    <div className='input-field col s6'>
                        <input type='text' value={this.props.emailAddress}
                            className={(this.props.emailAddressHasBeenTouched || this.props.shouldValidateForm) && !this.props.emailAddressIsValid ? 'invalid' : ''}
                            onChange={e => { this.props.emailAddressOnChange((e as any).target.value) }}
                            onBlur={this.props.emailAddressOnBlur}/>
                        <label>Email</label>
                    </div>
                } 
                {
                    this.props.authenticationTypeSelectedValue != ApiClient.AuthenticationType.Dynamics365 &&
                    <div>
                        <div className='input-field col s6'>
                            <input type='text' value={this.props.domain}
                                className={(this.props.domainHasBeenTouched || this.props.shouldValidateForm) && !this.props.domainIsValid ? 'invalid' : ''}
                                onChange={e => { this.props.domainOnChange((e as any).target.value) }}
                                onBlur={this.props.domainOnBlur}/>
                            <label>Domain</label>
                        </div>
                        <div className='input-field col s6'>
                            <input type='text' value={this.props.username}
                                className={(this.props.usernameHasBeenTouched || this.props.shouldValidateForm) && !this.props.usernameIsValid ? 'invalid' : ''}
                                onChange={e => { this.props.usernameOnChange((e as any).target.value) }}
                                onBlur={this.props.usernameOnBlur}/>
                            <label>Domain</label>
                        </div>
                    </div>
                }
                <div className='input-field col s6'>
                    <input type='password' value={this.props.password}
                        className={(this.props.passwordHasBeenTouched || this.props.shouldValidateForm) && !this.props.passwordIsValid ? 'invalid' : ''}
                        onChange={e => { this.props.passwordOnChange((e as any).target.value) }}
                        onBlur={this.props.passwordOnBlur} />
                    <label>Password</label>
                </div>

                <div className='input-field col s6'>
                    <a className='waves-effect waves-light btn' onClick={() => this.props.onSubmit(this.props)}>Log in</a>
                </div>

                <div>
                    <p>{this.props.currentSubmissionMessage}</p>
                    <p>{this.props.submissionError}</p>
                </div>
            </form>
        </div>;
    }
}

export interface IAuthenticationFormProps {
    authenticationTypeSelectedValue?: number
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
    currentSubmissionMessage?: string;
    submissionError?: string;
}