import * as React from 'react';

export class AuthenticationForm extends React.Component<IAuthenticationFormProps, undefined> {
    constructor(props: IAuthenticationFormProps) {
        super(props);
    }

    render() {
        return <form className='col s12'>
            <div className='col s12'>
                <input type='text' value={this.props.crmUrl} className={this.props.crmUrlIsValid ? '' : 'invalid'} onChange={e => { this.props.crmUrlOnChange((e as any).target.value) }}/>
                <label>CRM URL</label>
            </div>
            <div className='col s12'>
                <input type='text' value={this.props.emailAddress} className={this.props.emailAddressIsValid ? '' : 'invalid'} onChange={e => { this.props.emailAddressOnChange((e as any).target.value) }} />
                <label>CRM URL</label>
            </div>
        </form>;
    }
}

export interface IAuthenticationFormProps {
    crmUrlOnChange?: (value: string) => void;
    crmUrl?: string;
    crmUrlIsValid?: boolean;
    emailAddressOnChange?: (value: string) => void;
    emailAddress?: string;
    emailAddressIsValid?: boolean;
}