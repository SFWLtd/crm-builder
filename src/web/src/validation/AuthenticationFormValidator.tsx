import { IAuthenticationFormProps } from '../presentation/AuthenticationForm';
import * as ApiClient from '../../../api/ApiClient';
import { Validate } from './Validate';

export class AuthenticationFormValidator {

    constructor() {
    }

    isValid(props: IAuthenticationFormProps) {
        let dynamics365SubmissionIsValid = props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.Dynamics365
            && this.validateCrmUrl(props.crmUrl)
            && this.validateEmailAddress(props.emailAddress)
            && this.validatePassword(props.password);

        let otherSubmissionIsValid = (props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.Ifd || props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.OnPremise)
            && this.validateCrmUrl(props.crmUrl)
            && this.validateDomain(props.domain)
            && this.validateUsername(props.username)
            && this.validatePassword(props.password);

        return dynamics365SubmissionIsValid || otherSubmissionIsValid;
    }

    validateCrmUrl(crmUrl: string): boolean {
        return Validate.thisString(crmUrl).url();
    }

    validateEmailAddress(emailAddress: string): boolean {
        return Validate.thisString(emailAddress).email();
    }

    validateUsername(username: string): boolean {
        return Validate.thisString(username).length(1, 100);
    }

    validateDomain(domain: string): boolean {
        return Validate.thisString(domain).length(1, 100);
    }

    validatePassword(password: string): boolean {
        return Validate.thisString(password).length(1, 100);
    }
}
