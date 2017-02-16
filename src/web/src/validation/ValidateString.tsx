export class ValidateString {

    private val?: string;

    constructor(val?: string) {
        this.val = val;
    }

    public length(minLength: number, maxLength: number) {

        if (this.val) {
            return this.val.length >= minLength && this.val.length <= maxLength;
        }

        return false;
    };

    public email() {

        if (this.val) {
            let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regEx.test(this.val)) {
                return true;
            }
        }

        return false;
    };

    public url() {
        if (this.val) {
            return this.val.startsWith("http://") || this.val.startsWith("https://");
        }
    }
}
