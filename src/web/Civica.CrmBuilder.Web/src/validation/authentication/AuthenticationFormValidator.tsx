import { IAuthenticationFormProps } from '../../presentation/authentication/AuthenticationForm';
import * as ApiClient from '../../../../../api/ApiClient';
import { Validate } from '../Validate';

export class AuthenticationFormValidator {

    constructor() {
    }

    IsValid(props: IAuthenticationFormProps) {
        let dynamics365SubmissionIsValid = props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.Dynamics365
            && this.ValidateCrmUrl(props.crmUrl)
            && this.ValidateEmailAddress(props.emailAddress)
            && this.ValidatePassword(props.password);

        let otherSubmissionIsValid = (props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.Ifd || props.authenticationTypeSelectedValue == ApiClient.AuthenticationType.OnPremise)
            && this.ValidateCrmUrl(props.crmUrl)
            && this.ValidateDomain(props.domain)
            && this.ValidateUsername(props.username)
            && this.ValidatePassword(props.password);

        return dynamics365SubmissionIsValid || otherSubmissionIsValid;
    }

    ValidateCrmUrl(crmUrl: string): boolean {
        return Validate.thisString(crmUrl).url();
    }

    ValidateEmailAddress(emailAddress: string): boolean {
        return Validate.thisString(emailAddress).email();
    }

    ValidateUsername(username: string): boolean {
        return Validate.thisString(username).length(1, 100);
    }

    ValidateDomain(domain: string): boolean {
        return Validate.thisString(domain).length(1, 100);
    }

    ValidatePassword(password: string): boolean {
        return Validate.thisString(password).length(1, 100);
    }
}
