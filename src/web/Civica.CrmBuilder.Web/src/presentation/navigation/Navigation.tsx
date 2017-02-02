import * as React from 'react';
import { NavigationIds } from '../../constants/NavigationIds';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react';

export class Navigation extends React.Component<INavigationProps, undefined> {
    constructor(props: INavigationProps) {
        super(props);
    }

    render() {
        return <Menu pointing secondary>
            <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Home} onClick={e => this.props.onSelectNavigationId(NavigationIds.Home)}>
                <Icon name='home' size='big' />
            </Menu.Item>
            {
                this.props.isLoggedIn &&
                <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Builds} onClick={e => this.props.onSelectNavigationId(NavigationIds.Builds)}>
                    <Icon name='wrench' size='big' />
                </Menu.Item>
            }
            {
                this.props.isLoggedIn &&
                <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Settings} onClick={e => this.props.onSelectNavigationId(NavigationIds.Settings)}>
                    <Icon name='settings' size='big' />
                </Menu.Item>
            }
        </Menu>;
    }
}

export interface INavigationProps {
    isLoggedIn?: boolean;
    selectedNavigationId?: string
    onSelectNavigationId?: (selectedNavigationId: string) => void;
}