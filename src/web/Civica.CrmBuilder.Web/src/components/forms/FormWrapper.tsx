import * as React from 'react';

export class FormWrapper extends React.Component<IFormProps, IFormState> {

    onSubmit = () => {
        let validationMessages = this.props.validationHandler();
        this.setState({ validationMessages: validationMessages });

        if (validationMessages.length === 0) {
            this.props.submitHandler();
        }
    };

    constructor(props: IFormProps) {
        super(props);

        this.state = { validationMessages: new Array<string>() };
    };

    render() {
        let renderedValidation = new Array<JSX.Element>();

        this.state.validationMessages.forEach(v => {
            renderedValidation.push(<h6 className='red-text'>{v}</h6>);
        });

        return <form className='col s12'>
            {this.props.children}
            <div id='validationMessages' className='row'>
                <div className='col s12'>
                    <blockquote>
                        {renderedValidation}
                    </blockquote>
                </div>
            </div>
            <div className='row'>
                <div className='col s12'>
                    <a onClick={this.onSubmit} className='waves-effect waves-light btn'>{this.props.submissionLabel}</a>
                </div>
            </div>
        </form>;
    }
}

export interface IFormState {
    validationMessages: Array<string>;
}

export interface IFormProps {
    submissionLabel: string;
    submitHandler: () => void;
    validationHandler: () => Array<string>;
}
