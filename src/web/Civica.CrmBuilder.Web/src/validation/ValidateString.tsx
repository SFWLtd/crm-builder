export class ValidateString {

    length = function (minLength: number, maxLength: number) {

        if (this.val) {
            return this.val.length >= minLength && this.val.length <= maxLength;
        }

        return false;
    };

    email = function () {

        if (this.val) {
            let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regEx.test(this.val)) {
                return true;
            }
        }

        return false;
    };

    url = function () {
        if (this.val) {
            return this.val.startsWith('http://') || this.val.startsWith('https://');
        }
    }

    private val?: string;

    constructor(val?: string) {
        this.val = val;
    }
}
