import * as React from 'react';
import { NavBarItem } from './NavBarItem';
import * as ApiClient from '../../../../../api/ApiClient';

export class NavBar extends React.Component<INavBarProps, INavBarState> {

    onNavBarItemClick = (navBarItem: NavBarItem) => {
        this.setState({ activeNavItemId: navBarItem.id });
    };

    constructor(props: INavBarProps) {
        super(props);

        this.state = { activeNavItemId: 'homenavbaritem' };
    }

    render() {
        return <nav className='primary-color'>
            <div className='wrap'>
                <ul id='nav-mobile' className='left'>
                    <NavBarItem id='homenavbaritem'
                        isEnabled={this.props.loggedIn}
                        name=''
                        imageRef='assets/sfw-civica-logo.png'
                        onClick={this.onNavBarItemClick}
                        isActive={this.state.activeNavItemId === 'homenavbaritem'}>
                    </NavBarItem>
                    <NavBarItem id='buildsnavbaritem'
                        isEnabled={this.props.loggedIn}
                        imageRef=''
                        name='Builds'
                        onClick={this.onNavBarItemClick}
                        isActive={this.state.activeNavItemId === 'buildsnavbaritem'}>
                    </NavBarItem>
                    <NavBarItem id='settingsnavbaritem'
                        isEnabled={this.props.loggedIn}
                        imageRef=''
                        name='Settings'
                        onClick={this.onNavBarItemClick}
                        isActive={this.state.activeNavItemId === 'settingsnavbaritem'}/>
                </ul>
            </div>
        </nav>;
    }
}

export interface INavBarProps {
    onClick: (navBarItem: NavBarItem) => void;
    loggedIn: boolean;
    loggedInHandler: (result: ApiClient.SessionTokenResult) => void;
}

export interface INavBarState {
    activeNavItemId: string;
}
