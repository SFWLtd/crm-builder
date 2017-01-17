import * as React from "react";

import { Guid } from "./Guid";

export class DropdownOptions extends React.Component<DropdownOptionsProps, DropdownOptionsState> {

    private selectorId : string

    constructor(props : DropdownOptionProps) {
        super(props);

        this.selectorId = Guid.newGuid();

        this.state = { selectedOption : this.props.options.length > 0 
            ? this.props.options[0]
            : null }
    }

    render() {
        if (this.props.options.length > 0)
        {
            var optionsElements = new Array<JSX.Element>();

            this.props.options.forEach(o => {
                optionsElements.push(<DropdownOption option={o} onSelect={this.handleDropdownSelection} />);
            })

            return <div>
                <a className='dropdown-button btn' href='#' data-activates={'selector-' + this.selectorId}>{this.state.selectedOption.displayName}</a>
                <ul id={'selector-' + this.selectorId} className='dropdown-content'>
                    {optionsElements}
                </ul>
            </div>
        }

        throw "Cannot initialize dropdown options element with no options to select"
    }

    handleDropdownSelection = (option : DropdownOptionItem) => {
        this.setState({ selectedOption : option});
        this.props.onSelection(option);
    }
}

export interface DropdownOptionsProps {
    options: Array<DropdownOptionItem>;
    onSelection : (selectedOption : DropdownOptionItem) => void;
}

export interface DropdownOptionsState {
    selectedOption : DropdownOptionItem;
}

export class DropdownOptionItem {

    displayName : string;
    value: string;

    constructor(displayName : string, value : string) {
        this.displayName = displayName;
        this.value = value;
    }
}

class DropdownOption extends React.Component<DropdownOptionProps, undefined> {

    constructor(props : DropdownOptionProps) {
        super(props);
        
    }

    render() {
        return <li><a href="#!" onClick={this.handleSelection}>{this.props.option.displayName}</a></li>
    }
    
    handleSelection = () => {
        this.props.onSelect(this.props.option);
    }
}

export interface DropdownOptionProps {
    option : DropdownOptionItem;
    onSelect : (option : DropdownOptionItem) => void;
}