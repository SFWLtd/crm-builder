import { IAddNewBuildProps } from '../presentation/AddNewBuild';
import * as ApiClient from '../../../api/ApiClient';
import { Validate } from './Validate';

export class AddNewBuildFormValidator {

    constructor() {
    }

    isValid(props: IAddNewBuildProps) {
        
        return this.validateName(props.name);
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
