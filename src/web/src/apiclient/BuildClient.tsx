import * as ApiClient from '../../../api/ApiClient';
import { IAddNewBuildProps } from '../presentation/AddNewBuild';

export class BuildClient {

    private client: ApiClient.IBuildsClient;

    constructor(client: ApiClient.IBuildsClient) {
        this.client = client;
    }

    addNew(props: IAddNewBuildProps): Promise<ApiClient.GlobalJsonResultOfNewBuildResult> {
        let request = new ApiClient.NewBuildRequest();
        request.buildVersioningType = props.buildVersioningType;
        request.name = props.name;
        request.versionMajor = props.versionMajor;
        request.versionMinor = props.versionMinor;

        return this.client.newBuild(request, '');
    }

    fetchAll(): Promise<ApiClient.GlobalJsonResultOfIEnumerableOfBuildProperties> {
        return this.client.getBuilds('');
    }

    delete(id: string): Promise<ApiClient.GlobalJsonResultOfEmptyResult> {
        let request = new ApiClient.DeleteBuildRequest();
        request.id = id;

        return this.client.deleteBuild(request, '');
    }
}
