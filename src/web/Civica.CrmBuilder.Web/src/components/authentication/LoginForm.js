"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DropdownOptions_1 = require("../shared/DropdownOptions");
var ApiClient = require("../../../../../api/ApiClient");
var LoginForm = (function (_super) {
    __extends(LoginForm, _super);
    function LoginForm(props) {
        var _this = _super.call(this, props) || this;
        _this.login = function () {
            try {
                var client = new ApiClient.AuthenticationClient("http://localhost:8001");
                var request = new ApiClient.AuthenticateRequest();
                request.url = _this.state.url;
                request.authenticationType = _this.state.authenticationType.value;
                request.domain = _this.state.domain;
                request.emailAddress = _this.state.email;
                request.userName = _this.state.username;
                request.password = _this.state.password;
                var response = void 0;
                response = client.authenticate(request, "");
                response.then(function (response) {
                    var test = "dsahjdshjkl";
                });
            }
            catch (e) {
            }
        };
        _this.handleLoginTypeSelection = function (selection) {
            _this.setState({ authenticationType: selection,
                url: _this.state.url,
                domain: _this.state.domain,
                username: _this.state.username,
                email: _this.state.email,
                password: _this.state.password, });
        };
        _this.options = new Array();
        _this.options.push(new Dynamics365DropdownOption());
        _this.options.push(new IfdDropdownOption());
        _this.options.push(new OnPremiseOption());
        _this.state = { authenticationType: _this.options[0], domain: null, email: null, password: null, url: null, username: null };
        return _this;
    }
    LoginForm.prototype.render = function () {
        return React.createElement("form", { className: "col s12" },
            React.createElement("div", { className: "row" },
                React.createElement("label", null, "Connection type:"),
                React.createElement(DropdownOptions_1.DropdownOptions, { options: this.options, onSelection: this.handleLoginTypeSelection })),
            React.createElement("br", null),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "input-field" },
                    React.createElement("input", { id: "crmurl", type: "text", className: "validate", value: this.state.url }),
                    React.createElement("label", null, "CRM URL"))),
            this.state.authenticationType.value !== ApiClient.AuthenticationType.Dynamics365 &&
                React.createElement("div", null,
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "input-field" },
                            React.createElement("input", { id: "domain", type: "text", className: "validate", value: this.state.domain }),
                            React.createElement("label", null, "Domain"))),
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "input-field" },
                            React.createElement("input", { id: "username", type: "text", className: "validate", value: this.state.username }),
                            React.createElement("label", null, "User name")))),
            this.state.authenticationType.value === ApiClient.AuthenticationType.Dynamics365 &&
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "input-field" },
                        React.createElement("input", { id: "email", type: "email", className: "validate", value: this.state.email }),
                        React.createElement("label", null, "Email Address"))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "input-field" },
                    React.createElement("input", { id: "password", type: "password", className: "validate", value: this.state.password }),
                    React.createElement("label", null, "Password"))),
            React.createElement("br", null),
            React.createElement("div", { className: "row" },
                React.createElement("a", { onClick: this.login, className: "waves-effect waves-light btn" }, "Log in")));
    };
    return LoginForm;
}(React.Component));
exports.LoginForm = LoginForm;
var Dynamics365DropdownOption = (function () {
    function Dynamics365DropdownOption() {
        this.displayName = "Dynamics 365";
        this.value = ApiClient.AuthenticationType.Dynamics365;
    }
    return Dynamics365DropdownOption;
}());
var IfdDropdownOption = (function () {
    function IfdDropdownOption() {
        this.displayName = "Internet facing deployment (IFD)";
        this.value = ApiClient.AuthenticationType.Ifd;
    }
    return IfdDropdownOption;
}());
var OnPremiseOption = (function () {
    function OnPremiseOption() {
        this.displayName = "On premise";
        this.value = ApiClient.AuthenticationType.OnPremise;
    }
    return OnPremiseOption;
}());
