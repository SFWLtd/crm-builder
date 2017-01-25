import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';

export class FormWrapper extends React.Component<IFormProps, IFormState> {

    onSubmit = () => {

        this.setState({ processingSubmit: true, validationMessages: this.state.validationMessages });

        let validationMessages = this.props.validationHandler();

        if (validationMessages.length === 0) {
            let promise = this.props.submit();
            promise.then((response: any) => {

                if (response.statusCode === ApiClient.HttpStatusCode.OK
                    || response.statusCode === ApiClient.HttpStatusCode.Accepted
                    || response.statusCode === ApiClient.HttpStatusCode.Created
                    || response.statusCode === ApiClient.HttpStatusCode.NonAuthoritativeInformation
                    || response.statusCode === ApiClient.HttpStatusCode.NoContent
                    || response.statusCode === ApiClient.HttpStatusCode.ResetContent
                    || response.statusCode === ApiClient.HttpStatusCode.PartialContent) {

                    this.props.onSubmitSuccess(response.result);
                } else {

                    let validationMessagesByStatusCode: { [statusCode: string]: string; } = {};

                    // process default error messages, then overwrite if custom error messages provided
                    if (response.statusCode === ApiClient.HttpStatusCode.BadRequest) {
                        validationMessagesByStatusCode[ApiClient.HttpStatusCode.BadRequest] = 'Bad request';
                    } else if (response.statusCode === ApiClient.HttpStatusCode.Unauthorized) {
                        validationMessagesByStatusCode[ApiClient.HttpStatusCode.Unauthorized] = 'Unauthorized';
                    } else {
                        validationMessagesByStatusCode[ApiClient.HttpStatusCode.InternalServerError] = 'Internal server error';
                    }

                    if (this.props.customStatusCodeMessages) {
                        this.props.customStatusCodeMessages.forEach(h => {
                            if (h.httpStatusCode === response.statusCode) {
                                validationMessagesByStatusCode[h.httpStatusCode] = h.errorMessage;
                            }
                        });
                    }

                    for (let key in validationMessagesByStatusCode) {
                        if (validationMessagesByStatusCode.hasOwnProperty(key)) {
                            validationMessages.push(validationMessagesByStatusCode[key]);
                        }
                    }
                }

                this.setState({ validationMessages: validationMessages, processingSubmit: false });
            });
        } else {
            this.setState({ processingSubmit: false, validationMessages: validationMessages });
        }
    };

    constructor(props: IFormProps) {
        super(props);

        this.state = { validationMessages: new Array<string>(), processingSubmit: false };
    };

    render() {
        let renderedValidation = new Array<JSX.Element>();
        let spacerStyling = { display: 'inline-block', width: '20px', height: '20px' };

        this.state.validationMessages.forEach(v => {
            renderedValidation.push(<h6 className='red-text'>{v}</h6>);
        });

        return <form className='col s12'>
            {this.props.children}
            {
                this.props.submissionAttempted &&
                <div id='validationMessages' className='row'>
                    <div className='col s12'>
                        <blockquote>
                            {renderedValidation}
                        </blockquote>
                    </div>
                </div>
            }
            <div className='row'>
                <div className='col s12'>
                    <a onClick={this.onSubmit} className='waves-effect waves-light btn'>{this.props.submissionLabel}</a>
                    <div style={spacerStyling}></div>
                    {
                        this.state.processingSubmit &&
                        <div className='preloader-wrapper small active'>
                            <div className='spinner-layer'>
                                <div className='circle-clipper left'>
                                    <div className='circle'></div>
                                </div><div className='gap-patch'>
                                    <div className='circle'></div>
                                </div><div className='circle-clipper right'>
                                    <div className='circle'></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </form>;
    }
}

export interface IFormState {
    validationMessages: Array<string>;
    processingSubmit?: boolean;
}

export interface IFormProps {
    submissionAttempted: boolean;
    submissionLabel: string;
    submit: () => Promise<any>;
    onSubmitSuccess: (result: any) => void;
    validationHandler: () => Array<string>;
    customStatusCodeMessages?: Array<CustomHttpStatusCodeHandler>;
}

export class CustomHttpStatusCodeHandler {

    httpStatusCode: ApiClient.HttpStatusCode;
    errorMessage: string;

    constructor(httpStatusCode: ApiClient.HttpStatusCode, errorMessage: string) {
        this.httpStatusCode = httpStatusCode;
        this.errorMessage = errorMessage;
    }
}
