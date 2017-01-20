"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var NavBar_1 = require("./navigation/NavBar");
var MainContent_1 = require("./main/MainContent");
var Welcome_1 = require("./main/Welcome");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.setMainContent = function (content) {
            _this.setState({ mainContent: content });
        };
        _this.state = { mainContent: React.createElement(Welcome_1.Welcome, null) };
        return _this;
    }
    App.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(NavBar_1.NavBar, { setMainContent: this.setMainContent }),
            React.createElement("br", null),
            React.createElement("div", { className: 'wrap' },
                React.createElement(MainContent_1.MainContent, null, this.state.mainContent)));
    };
    return App;
}(React.Component));
exports.App = App;
