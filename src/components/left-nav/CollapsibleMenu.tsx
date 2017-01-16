import * as React from "react";

export class CollapsibleMenu extends React.Component<CollapsibleMenuProps, CollapsibleMenuState> {

    constructor(props : CollapsibleMenuProps) {
        super(props);
        this.state = { isCollapsed: true };        
    }

    render() {
            return <div className="collection">
                        <a href="#!" onClick={this.onCollapsibleSubmenuClick} className="collection-item">
                            <i className="material-icons">list</i>
                            <span className='left-nav-header'>{this.props.name}</span>
                        </a>
                        {!this.state.isCollapsed && this.props.children }
                    </div>;
    }

    onCollapsibleSubmenuClick = () => {
        this.setState({ isCollapsed : !this.state.isCollapsed})
    }
}

export interface CollapsibleMenuProps {
    name : string
}

export interface CollapsibleMenuState {
    isCollapsed : boolean;
}