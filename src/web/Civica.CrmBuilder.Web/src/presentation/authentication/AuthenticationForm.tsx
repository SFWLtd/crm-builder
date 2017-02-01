import * as React from 'react';

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
                <div className='input-field col s6'>
                    <input type='text' value={this.props.crmUrl}
                        className={this.props.crmUrlHasBeenTouched && !this.props.crmUrlIsValid ? 'invalid' : ''}
                        onChange={e => { this.props.crmUrlOnChange((e as any).target.value) }}
                        onBlur={e => { this.props.crmUrlOnBlur((e as any).target.value) }}/>
                    <label>CRM URL</label>
                </div>
                <div className='input-field col s6'>
                    <input type='text' value={this.props.emailAddress}
                        className={this.props.emailAddressHasBeenTouched && !this.props.emailAddressIsValid ? 'invalid' : ''}
                        onChange={e => { this.props.emailAddressOnChange((e as any).target.value) }}
                        onBlur={e => { this.props.emailAddressOnBlur((e as any).target.value) }}/>
                    <label>Email</label>
                </div>
            </form>
        </div>;
    }
}

export interface IAuthenticationFormProps {
    crmUrlOnChange?: (value: string) => void;
    crmUrl?: string;
    crmUrlIsValid?: boolean;
    crmUrlOnBlur?: (value: string) => void;
    crmUrlHasBeenTouched?: boolean;
    emailAddressOnChange?: (value: string) => void;
    emailAddress?: string;
    emailAddressIsValid?: boolean;
    emailAddressOnBlur?: (value: string) => void;
    emailAddressHasBeenTouched?: boolean;
}