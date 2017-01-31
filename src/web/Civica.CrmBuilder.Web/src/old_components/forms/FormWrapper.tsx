import * as React from 'react';
import * as ApiClient from '../../../../../api/ApiClient';
import { Submit } from './Submit';

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

        this.state.validationMessages.forEach(v => {
            renderedValidation.push(<h6 className='red-text'>{v}</h6>);
        });

        return <form className='col s12'>
            {this.props.children}
            {
                this.props.submissionAttempted && !this.state.processingSubmit &&
                <div id='validationMessages' className='row'>
                    <div className='col s12'>
                        <blockquote>
                            {renderedValidation}
                        </blockquote>
                    </div>
                </div>
            }

            <div className='col s12'>
                <Submit label={this.props.submissionLabel} onSubmit={this.onSubmit} showLoader={this.state.processingSubmit} />
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
