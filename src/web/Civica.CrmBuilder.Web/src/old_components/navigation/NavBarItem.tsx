import * as React from 'react';

export class NavBarItem extends React.Component<NavBarItemProps, undefined> {

    id: string;

    handleOnClick = () => {
        this.props.onClick(this);
    };

    constructor(props: NavBarItemProps) {
        super(props);

        this.id = props.id;
    }

    render() {
        return this.props.imageRef !== ''
            ? <li className={this.props.isActive ? 'active' : null}><a href='#' className='nav-img-link' onClick={this.handleOnClick}><img height='40em' width='40em' className='nav-bar-icon' src={this.props.imageRef} />{this.props.name}</a></li>
            : <li className={this.props.isActive ? 'active' : null}><a href='#' onClick={this.handleOnClick}>{this.props.name}</a></li>;
    }
}

export interface NavBarItemProps {
    isEnabled: boolean;
    isActive: boolean;
    id: string;
    name: string;
    imageRef: string;
    onClick: (navBarItem: NavBarItem) => void;
}

