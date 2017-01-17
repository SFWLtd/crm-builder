import * as React from "react";

export class NavBarItem extends React.Component<NavBarItemProps, NavBarItemState> {

    id : string;

    constructor(props : NavBarItemProps) {
        super(props);

        this.id = props.id;
    }

    render() {

        return this.props.imageRef != ""
            ?  <li className={this.props.activeNavBarItemId === this.id ? "active": null}><a href="#" className='nav-img-link' onClick={this.handleOnClick}><img height="40em" width="40em" className="nav-bar-icon" src={this.props.imageRef}/>{this.props.name}</a></li>
            :  <li className={this.props.activeNavBarItemId === this.id ? "active": null}><a href="#" onClick={this.handleOnClick}>{this.props.name}</a></li>
        
    }

    handleOnClick = () => {
        this.props.onNavBarItemSelect(this);
        this.props.setMainContent(<div>{this.props.children}</div>)
    }
}

export interface NavBarItemState {
    isActive : boolean;
}

export interface NavBarItemProps {
    id : string;
    name : string;
    imageRef : string;
    activeNavBarItemId : string;
    setMainContent : (content : JSX.Element) => void;
    onNavBarItemSelect : (navBarItem : NavBarItem) => void;
}