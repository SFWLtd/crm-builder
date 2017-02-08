import { ValidateString } from './ValidateString';
import { ValidateNumber } from './ValidateNumber';

export class Validate {
    static thisString = function (val: string) {
        return new ValidateString(val);
    }

    static thisNumber = function(val: number) {
        return new ValidateNumber(val);
    }
}
