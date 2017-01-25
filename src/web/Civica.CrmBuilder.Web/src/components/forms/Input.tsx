import * as React from 'react';

export class Input extends React.Component<IInputProps, undefined> {

    getValidationState = function () {
        if (!this.props.value && !this.props.submissionAttempted) {
            return '';
        }

        return this.props.validate(this.props.value) ? '' : 'invalid';
    };

    constructor(props: IInputProps) {
        super(props);
    }

    render() {
        return <input id={this.props.id} type={this.props.type} value={this.props.value ? this.props.value : ''} className={this.getValidationState()} onChange={this.props.onChange} />;
    }
}

export interface IInputProps {
    id: string;
    type: string;
    value: any;
    validate: () => boolean;
    onChange: (val: any) => void;
    submissionAttempted?: boolean;
}
