import * as ApiClient from "../../../api/ApiClient";

export class SolutionClient {

    private client: ApiClient.ISolutionsClient;

    constructor(client: ApiClient.ISolutionsClient) {
        this.client = client;
    }

    public getAll(): Promise<ApiClient.GlobalJsonResultOfIEnumerableOfSolution> {
        return this.client.getAll("");
    }
}
