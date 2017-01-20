"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Guid_1 = require("./Guid");
var DropdownOptions = (function (_super) {
    __extends(DropdownOptions, _super);
    function DropdownOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDropdownSelection = function (option) {
            _this.setState({ selectedOption: option });
            _this.props.onSelection(option);
        };
        _this.selectorId = Guid_1.Guid.newGuid();
        _this.state = { selectedOption: _this.props.options.length > 0
                ? _this.props.options[0]
                : null };
        return _this;
    }
    DropdownOptions.prototype.render = function () {
        var _this = this;
        if (this.props.options.length > 0) {
            var optionsElements = new Array();
            this.props.options.forEach(function (o) {
                optionsElements.push(React.createElement(DropdownOption, { option: o, onSelect: _this.handleDropdownSelection }));
            });
            return React.createElement("div", null,
                React.createElement("a", { className: 'dropdown-button btn', href: '#', "data-activates": 'selector-' + this.selectorId }, this.state.selectedOption.displayName),
                React.createElement("ul", { id: 'selector-' + this.selectorId, className: 'dropdown-content' }, optionsElements));
        }
        throw "Cannot initialize dropdown options element with no options to select";
    };
    return DropdownOptions;
}(React.Component));
exports.DropdownOptions = DropdownOptions;
var DropdownOption = (function (_super) {
    __extends(DropdownOption, _super);
    function DropdownOption(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelection = function () {
            _this.props.onSelect(_this.props.option);
        };
        return _this;
    }
    DropdownOption.prototype.render = function () {
        return React.createElement("li", null,
            React.createElement("a", { href: "#!", onClick: this.handleSelection }, this.props.option.displayName));
    };
    return DropdownOption;
}(React.Component));
