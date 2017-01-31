import * as React from 'react';
import { NavigationIds } from '../../constants/NavigationIds';

export class Navigation extends React.Component<INavigationProps, undefined> {
    constructor(props: INavigationProps) {
        super(props);
    }

    render() {
        return <nav className='primary-color'>
            <div className='wrap'>
                <ul id='nav-mobile' className='left'>
                    <li className={this.props.selectedNavigationId === NavigationIds.Home ? 'active' : null}>
                        <a href='#' className='nav-img-link' onClick={e => this.props.onSelectNavigationId(NavigationIds.Home)}>
                            <img height='40em' width='40em' className='nav-bar-icon' src='assets/sfw-civica-logo.png' />
                        </a>
                    </li>
                    <li className={this.props.selectedNavigationId === NavigationIds.Builds ? 'active' : null}>
                        <a href='#' className='nav-img-link' onClick={e => this.props.onSelectNavigationId(NavigationIds.Builds)}>
                            Builds
                        </a>
                    </li>
                    <li className={this.props.selectedNavigationId === NavigationIds.Settings ? 'active' : null}>
                        <a href='#' className='nav-img-link' onClick={e => this.props.onSelectNavigationId(NavigationIds.Settings)}>
                            Settings
                        </a>
                    </li>
                </ul>
            </div>
        </nav>;
    }
}

export interface INavigationProps {
    selectedNavigationId?: string
    onSelectNavigationId?: (selectedNavigationId: string) => void;
}