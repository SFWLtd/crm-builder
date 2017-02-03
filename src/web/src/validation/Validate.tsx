import { ValidateString } from './ValidateString'

export class Validate {
    static thisString = function (val: string) {
        return new ValidateString(val);
    }
}
