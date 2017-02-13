import { IEditBuildProps } from '../presentation/EditBuild';
import * as ApiClient from '../../../api/ApiClient';
import { AuthenticationFormValidator } from './AuthenticationFormValidator';
import { Validate } from './Validate';

export class EditBuildFormValidator extends AuthenticationFormValidator {

    isValid(props: IEditBuildProps) {
        
        return this.validateName(props.name)
            && this.validateVersionMajor(props.versionMajor)
            && this.validateVersionMinor(props.versionMinor)
            && super.isValid(props);
    }

    validateName(name: string): boolean {
        return Validate.thisString(name).length(1, 100);
    }

    validateVersionMajor(value: number): boolean {
        return Validate.thisNumber(value).range(0, 999);
    }

    validateVersionMinor(value: number): boolean {
        return Validate.thisNumber(value).range(0, 999);
    }
}
