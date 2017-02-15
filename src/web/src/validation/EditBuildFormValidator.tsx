import * as ApiClient from "../../../api/ApiClient";
import { IEditBuildProps } from "../presentation/EditBuild";
import { AuthenticationFormValidator } from "./AuthenticationFormValidator";
import { Validate } from "./Validate";

export class EditBuildFormValidator extends AuthenticationFormValidator {

    public isValid(props: IEditBuildProps) {
        return this.validateName(props.name)
            && this.validateVersionMajor(props.versionMajor)
            && this.validateVersionMinor(props.versionMinor)
            && this.validateSolutionId(props.selectedSolutionId)
            && super.isValid(props);
    }

    public validateName(name: string): boolean {
        return Validate.thisString(name).length(1, 100);
    }

    public validateVersionMajor(value: number): boolean {
        return Validate.thisNumber(value).range(0, 999);
    }

    public validateVersionMinor(value: number): boolean {
        return Validate.thisNumber(value).range(0, 999);
    }

    public validateSolutionId(solutionId: string): boolean {
        return Validate.thisString(solutionId).length(36, 36);
    }
}
