import * as ApiClient from '../../../../../api/ApiClient';
import { IAuthenticationFormProps } from '../../presentation/authentication/AuthenticationForm';

export class AuthenticationClient {

    private props: IAuthenticationFormProps;
    private client: ApiClient.ISessionClient;

    constructor(props: IAuthenticationFormProps, client: ApiClient.ISessionClient) {
        this.client = client;
        this.props = props;
    }

    newSession(): Promise<ApiClient.GlobalJsonResultOfSessionTokenResult> {

        let request = new ApiClient.NewSessionRequest();
        request.authenticationType = this.props.authenticationTypeSelectedValue;
        request.domain = this.props.domain;
        request.url = this.props.crmUrl;
        request.emailAddress = this.props.emailAddress;
        request.userName = this.props.username;
        request.password = this.props.password;

        return this.client.newSession(request, '');
    }
}
