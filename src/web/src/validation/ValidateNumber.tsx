export class ValidateNumber {

    private val: number;

    constructor(val: number) {
        this.val = val;
    }

    public range(minValue: number, maxValue: number): boolean {
        if (this.val <= maxValue && this.val >= minValue) {
            return true;
        }

        return false;
    }
}
