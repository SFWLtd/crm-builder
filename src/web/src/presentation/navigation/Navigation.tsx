import * as React from 'react';
import { NavigationIds } from '../../constants/NavigationIds';
import { Container, Dropdown, Icon, Image, Menu, Segment } from 'semantic-ui-react';

export class Navigation extends React.Component<INavigationProps, undefined> {
    constructor(props: INavigationProps) {
        super(props);
    }

    render() {
        let navContainerStyling = {
            'height': '200px'
        };

        return <div style={navContainerStyling}>
        <br/>
        <Container textAlign='center'>
            <Image src='assets/sfw-civica-logo.png'/>
        </Container>
        <br/>
        <Menu tabular>
            <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Dashboard} onClick={(e:any) => this.props.onSelectNavigationId(NavigationIds.Dashboard)}>
                Dashboard
            </Menu.Item>
            {
                this.props.isLoggedIn &&
                <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Builds} onClick={(e:any) => this.props.onSelectNavigationId(NavigationIds.Builds)}>
                    Builds
                </Menu.Item>
            }
            {
                this.props.isLoggedIn &&
                <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Settings} onClick={(e:any) => this.props.onSelectNavigationId(NavigationIds.Settings)}>
                    Settings
                </Menu.Item>
            }
        </Menu>
        </div>;
    }
}

export interface INavigationProps {
    isLoggedIn?: boolean;
    selectedNavigationId?: string
    onSelectNavigationId?: (selectedNavigationId: string) => void;
}