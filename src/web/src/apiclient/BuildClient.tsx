import * as ApiClient from "../../../api/ApiClient";
import { IEditBuildProps } from "../presentation/EditBuild";

export class BuildClient {

    private client: ApiClient.IBuildsClient;

    constructor(client: ApiClient.IBuildsClient) {
        this.client = client;
    }

    public addNew(props: IEditBuildProps): Promise<ApiClient.GlobalJsonResultOfBuild> {
        let request = new ApiClient.NewBuildRequest();
        request.buildVersioningType = props.buildVersioningType;
        request.name = props.name;
        request.versionMajor = props.versionMajor;
        request.versionMinor = props.versionMinor;
        request.solutionId = props.selectedSolutionId;
        request.authenticationType = props.authenticationTypeSelectedValue;
        request.url = props.crmUrl;
        request.emailAddress = props.emailAddress;
        request.userName = props.username;
        request.domain = props.domain;
        request.password = props.password;

        return this.client.newBuild(request, "");
    }

    public fetch(buildId: string): Promise<ApiClient.GlobalJsonResultOfBuild> {
        return this.client.getBuild(buildId);
    }

    public fetchAll(): Promise<ApiClient.GlobalJsonResultOfIEnumerableOfBuild> {
        return this.client.getBuilds("");
    }

    public edit(props: IEditBuildProps): Promise<ApiClient.GlobalJsonResultOfBuild> {
        let request = new ApiClient.UpdateBuildRequest();
        request.buildVersioningType = props.buildVersioningType;
        request.name = props.name;
        request.versionMajor = props.versionMajor;
        request.versionMinor = props.versionMinor;
        request.solutionId = props.selectedSolutionId;
        request.authenticationType = props.authenticationTypeSelectedValue;
        request.url = props.crmUrl;
        request.emailAddress = props.emailAddress;
        request.userName = props.username;
        request.domain = props.domain;
        request.password = props.password;
        request.id = props.editBuildId;

        return this.client.updateBuild(request, "");
    }

    public delete(id: string): Promise<ApiClient.GlobalJsonResultOfEmptyResult> {
        let request = new ApiClient.DeleteBuildRequest();
        request.id = id;

        return this.client.deleteBuild(request, "");
    }
}
