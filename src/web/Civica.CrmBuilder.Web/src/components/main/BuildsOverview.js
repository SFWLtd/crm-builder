"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var BuildsOverview = (function (_super) {
    __extends(BuildsOverview, _super);
    function BuildsOverview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuildsOverview.prototype.render = function () {
        var buildElements = new Array();
        try {
            var builds = this.getBuilds();
            builds.forEach(function (b) {
                buildElements.push(React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col s12 m6" },
                        React.createElement("div", { className: "card blue-grey darken-1" },
                            React.createElement("div", { className: "card-content white-text" },
                                React.createElement("span", { className: "card-title" }, "Card Title"),
                                React.createElement("p", null, "I am a very simple card. I am good at containing small bits of information." + " " + "I am convenient because I require little markup to use effectively.")),
                            React.createElement("div", { className: "card-action" },
                                React.createElement("a", { href: "#" }, "This is a link"),
                                React.createElement("a", { href: "#" }, "This is a link"))))));
            });
        }
        catch (Exception) {
            buildElements.push(React.createElement("a", { href: "#!", className: "collection-item" },
                React.createElement("i", { className: "material-icons" }, "error"),
                React.createElement("span", { className: "left-nav-error" }, "Error")));
        }
        return React.createElement("div", { id: "main" }, buildElements);
    };
    BuildsOverview.prototype.getBuilds = function () {
        return [
            new BuildOverview("1", "Test Build 1"),
            new BuildOverview("2", "Test Build 2")
        ];
    };
    return BuildsOverview;
}(React.Component));
exports.BuildsOverview = BuildsOverview;
var BuildOverview = (function () {
    function BuildOverview(id, name) {
        this.id = id;
        this.name = name;
    }
    return BuildOverview;
}());
exports.BuildOverview = BuildOverview;
