import * as React from 'react';

export class DropdownOptions extends React.Component<IDropdownOptionsProps, IDropdownOptionsState> {

    handleDropdownSelection = (e: any) => {
        this.setState({ selectedOption: e.target.value });
        this.props.onSelection(e.target.value);
    };

    constructor(props: IDropdownOptionsProps) {
        super(props);

        this.state = {
            selectedOption: this.props.options.length > 0
                ? this.props.options[0]
                : null
        };
    }

    render() {
        if (this.props.options.length > 0) {
            let optionsElements = new Array<JSX.Element>();

            let keyIndex: number = 0;
            this.props.options.forEach(o => {
                optionsElements.push(<option key={keyIndex++} value={o.value}>{o.displayName}</option>);
            });

            return <div>
                <br/>
                <select className='browser-default' value={this.state.selectedOption} onChange={this.handleDropdownSelection}>
                    {optionsElements}
                </select>
                </div>;
        }

        throw 'Cannot initialize dropdown options element with no options to select';
    }
}

export interface IDropdownOptionsProps {
    options: Array<IDropdownOptionItem>;
    onSelection: (selectedOption: any) => void;
}

export interface IDropdownOptionsState {
    selectedOption: any;
}

export interface IDropdownOptionItem {
    displayName: string;
    value: any;
}
