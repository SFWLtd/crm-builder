"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var BuildsOverview_1 = require("../main/BuildsOverview");
var NavBarItem_1 = require("./NavBarItem");
var Welcome_1 = require("../main/Welcome");
var NavBar = (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        var _this = _super.call(this) || this;
        _this.onNavBarItemSelect = function (navBarItem) {
            _this.setState({ activeNavItemId: navBarItem.id });
        };
        _this.state = { activeNavItemId: "homenavbaritem" };
        return _this;
    }
    NavBar.prototype.render = function () {
        return React.createElement("nav", { className: 'primary-color' },
            React.createElement("div", { className: 'wrap' },
                React.createElement("ul", { id: "nav-mobile", className: "left" },
                    React.createElement(NavBarItem_1.NavBarItem, { id: "homenavbaritem", name: "", imageRef: "assets/sfw-civica-logo.png", onNavBarItemSelect: this.onNavBarItemSelect, activeNavBarItemId: this.state.activeNavItemId, setMainContent: this.props.setMainContent },
                        React.createElement(Welcome_1.Welcome, null)),
                    React.createElement(NavBarItem_1.NavBarItem, { id: "buildsnavbaritem", imageRef: "", name: "Builds", onNavBarItemSelect: this.onNavBarItemSelect, activeNavBarItemId: this.state.activeNavItemId, setMainContent: this.props.setMainContent },
                        React.createElement(BuildsOverview_1.BuildsOverview, null)),
                    React.createElement(NavBarItem_1.NavBarItem, { id: "settingsnavbaritem", imageRef: "", name: "Settings", onNavBarItemSelect: this.onNavBarItemSelect, activeNavBarItemId: this.state.activeNavItemId, setMainContent: this.props.setMainContent }))));
    };
    return NavBar;
}(React.Component));
exports.NavBar = NavBar;
