"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var MainContent = (function (_super) {
    __extends(MainContent, _super);
    function MainContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainContent.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return MainContent;
}(React.Component));
exports.MainContent = MainContent;
