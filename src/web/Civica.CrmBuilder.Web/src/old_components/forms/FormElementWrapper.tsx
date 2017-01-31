import * as React from 'react';

export class FormElementWrapper extends React.Component<IFormElementProps, undefined> {

    render() {
        return <div className='row'>
            <div className='input-field col s6'>
                {this.props.children}
                <label>{this.props.label}</label>
            </div>
        </div>;
    }
}

export interface IFormElementProps {
    label: string;
}
