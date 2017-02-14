import * as ApiClient from '../../../api/ApiClient';

export class SolutionClient {

    private client: ApiClient.ISolutionsClient;

    constructor(client: ApiClient.ISolutionsClient) {
        this.client = client;
    }

    getAll(): Promise<ApiClient.GlobalJsonResultOfIEnumerableOfSolutionDto> {
        return this.client.getAll('');
    }
}