import * as ApiClient from "../../../api/ApiClient";
import { IAuthenticationFormProps } from "../presentation/AuthenticationForm";
import { Validate } from "./Validate";

export class AuthenticationFormValidator {

    public isValid(props: IAuthenticationFormProps) {
        let dynamics365SubmissionIsValid = props.authenticationTypeSelectedValue === ApiClient.AuthenticationType.Dynamics365 as number
            && this.validateCrmUrl(props.crmUrl)
            && this.validateEmailAddress(props.emailAddress)
            && this.validatePassword(props.password);

        let otherSubmissionIsValid = (props.authenticationTypeSelectedValue === ApiClient.AuthenticationType.Ifd as number || props.authenticationTypeSelectedValue === ApiClient.AuthenticationType.OnPremise as number)
            && this.validateCrmUrl(props.crmUrl)
            && this.validateDomain(props.domain)
            && this.validateUsername(props.username)
            && this.validatePassword(props.password);

        return dynamics365SubmissionIsValid || otherSubmissionIsValid;
    }

    public validateCrmUrl(crmUrl: string): boolean {
        return Validate.thisString(crmUrl).url();
    }

    public validateEmailAddress(emailAddress: string): boolean {
        return Validate.thisString(emailAddress).email();
    }

    public validateUsername(username: string): boolean {
        return Validate.thisString(username).length(1, 100);
    }

    public validateDomain(domain: string): boolean {
        return Validate.thisString(domain).length(1, 100);
    }

    public validatePassword(password: string): boolean {
        return Validate.thisString(password).length(1, 100);
    }
}
