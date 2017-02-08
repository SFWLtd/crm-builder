import * as ApiClient from '../../../api/ApiClient';
import { IEditBuildProps } from '../presentation/EditBuild';

export class BuildClient {

    private client: ApiClient.IBuildsClient;

    constructor(client: ApiClient.IBuildsClient) {
        this.client = client;
    }

    addNew(props: IEditBuildProps): Promise<ApiClient.GlobalJsonResultOfBuildDto> {
        let request = new ApiClient.BuildDto();
        request.buildVersioningType = props.buildVersioningType;
        request.name = props.name;
        request.versionMajor = props.versionMajor;
        request.versionMinor = props.versionMinor;

        return this.client.newBuild(request, '');
    }

    fetch(buildId: string): Promise<ApiClient.GlobalJsonResultOfBuildDto> {
        return this.client.getBuild(null, buildId);
    }

    fetchAll(): Promise<ApiClient.GlobalJsonResultOfIEnumerableOfBuildDto> {
        return this.client.getBuilds('');
    }

    edit(props: IEditBuildProps): Promise<ApiClient.GlobalJsonResultOfBuildDto> {
        let request = new ApiClient.BuildDto();
        request.buildVersioningType = props.buildVersioningType;
        request.name = props.name;
        request.versionMajor = props.versionMajor;
        request.versionMinor = props.versionMinor;
        request.id = props.editBuildId;

        return this.client.updateBuild(request, '');
    }

    delete(id: string): Promise<ApiClient.GlobalJsonResultOfEmptyResult> {
        let request = new ApiClient.DeleteBuildRequest();
        request.id = id;

        return this.client.deleteBuild(request, '');
    }
}
