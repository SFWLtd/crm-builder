"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var NavBarItem = (function (_super) {
    __extends(NavBarItem, _super);
    function NavBarItem(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOnClick = function () {
            _this.props.onNavBarItemSelect(_this);
            _this.props.setMainContent(React.createElement("div", null, _this.props.children));
        };
        _this.id = props.id;
        return _this;
    }
    NavBarItem.prototype.render = function () {
        return this.props.imageRef != ""
            ? React.createElement("li", { className: this.props.activeNavBarItemId === this.id ? "active" : null },
                React.createElement("a", { href: "#", className: 'nav-img-link', onClick: this.handleOnClick },
                    React.createElement("img", { height: "40em", width: "40em", className: "nav-bar-icon", src: this.props.imageRef }),
                    this.props.name))
            : React.createElement("li", { className: this.props.activeNavBarItemId === this.id ? "active" : null },
                React.createElement("a", { href: "#", onClick: this.handleOnClick }, this.props.name));
    };
    return NavBarItem;
}(React.Component));
exports.NavBarItem = NavBarItem;
