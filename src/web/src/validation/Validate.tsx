import { ValidateNumber } from "./ValidateNumber";
import { ValidateString } from "./ValidateString";

export class Validate {
    public static thisString(val: string) {
        return new ValidateString(val);
    };

    public static thisNumber(val: number) {
        return new ValidateNumber(val);
    };
}
