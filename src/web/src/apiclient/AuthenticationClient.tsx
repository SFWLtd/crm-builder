import * as ApiClient from "../../../api/ApiClient";
import { IAuthenticationFormProps } from "../presentation/AuthenticationForm";

export class AuthenticationClient {

    private client: ApiClient.ISessionClient;

    constructor(client: ApiClient.ISessionClient) {
        this.client = client;
    }

    public newSession(props: IAuthenticationFormProps): Promise<ApiClient.GlobalJsonResultOfBoolean> {

        let request = new ApiClient.NewSessionRequest();
        request.authenticationType = props.authenticationTypeSelectedValue;
        request.domain = props.domain;
        request.url = props.crmUrl;
        request.emailAddress = props.emailAddress;
        request.userName = props.username;
        request.password = props.password;

        return this.client.newSession(request, "");
    }

    public checkSessionExists(): Promise<ApiClient.GlobalJsonResultOfBoolean> {
        return this.client.checkSessionExists("");
    }

    public endSession(): Promise<ApiClient.GlobalJsonResultOfEmptyResult> {
        return this.client.endSession("");
    }
}
