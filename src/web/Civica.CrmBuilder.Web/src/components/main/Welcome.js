"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var LoginForm_1 = require("../authentication/LoginForm");
var Welcome = (function (_super) {
    __extends(Welcome, _super);
    function Welcome() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loggedInStateHandler = function () {
        };
        return _this;
    }
    Welcome.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("div", { className: "card blue-grey darken-1" },
                React.createElement("div", { className: "card-content white-text" },
                    React.createElement("span", { className: "card-title" }, "Welcome to CRM Builder"),
                    React.createElement("p", null, "Continuous integration for CRM solutions."),
                    React.createElement("br", null))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(LoginForm_1.LoginForm, { loggedInStateHandler: this.loggedInStateHandler }));
    };
    return Welcome;
}(React.Component));
exports.Welcome = Welcome;
