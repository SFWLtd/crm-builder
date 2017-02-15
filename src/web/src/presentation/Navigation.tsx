import * as React from "react";
import { Container, Dimmer, Dropdown, Icon, Image, Loader, Menu } from "semantic-ui-react";
import { NavigationIds } from "../constants/NavigationIds";

export class Navigation extends React.Component<INavigationProps, undefined> {
    constructor(props: INavigationProps) {
        super(props);
    }

    public render() {
        let navContainerStyling = {
            height: "200px",
        };

        return <div style={navContainerStyling}>
        <br/>
        <Container textAlign="center">
            <Image src="assets/sfw-civica-logo.png"/>
        </Container>
        <br/>
        <Menu tabular>
            <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Dashboard} onClick={(e: any) => this.props.onSelectNavigationId(NavigationIds.Dashboard)}>
                Dashboard
            </Menu.Item>
            <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Builds} onClick={(e: any) => this.props.onSelectNavigationId(NavigationIds.Builds)}>
                Builds
            </Menu.Item>
            <Menu.Item active={this.props.selectedNavigationId === NavigationIds.Settings} onClick={(e: any) => this.props.onSelectNavigationId(NavigationIds.Settings)}>
                Settings
            </Menu.Item>
            <Menu.Item position="right" onClick={(e: any) => this.props.onLogout()}>
                Log out
            </Menu.Item>
        </Menu>
        <Dimmer active={this.props.isLoggingOut} page>
            <Loader>
                <p>Logging out...</p>
            </Loader>
        </Dimmer>
        </div>;
    }
}

export interface INavigationProps {
    selectedNavigationId?: string;
    onSelectNavigationId?: (selectedNavigationId: string) => void;
    onLogout?: () => void;
    isLoggingOut?: boolean;
}
