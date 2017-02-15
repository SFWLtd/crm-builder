import * as React from "react";
import { Button, Card, Dimmer, Header, Icon, Loader, Message } from "semantic-ui-react";

export class Installation extends React.Component<IInstallationProps, undefined> {

    constructor(props: IInstallationProps) {
        super(props);
    }

    public componentDidMount() {
        if (!this.props.hasLoaded) {
            this.props.load();
        }
    }

    public componentDidUpdate() {
        if (this.props.hasCompletedInstallation) {
            this.props.load(); // Reload to check latest installation status
        }
    }

    public render() {
        return <div>
                <br />
                {
                    !this.props.hasLoaded &&
                    <Dimmer active={this.props.hasLoaded} page>
                        <Loader>
                            <p>Checking installation status...</p>
                        </Loader>
                    </Dimmer>
                }
                {
                    this.props.hasLoaded && this.props.requiresInstallation &&
                    <div>
                        <Header as="h2" icon textAlign="center">
                            <Icon name="info" circular />
                        </Header>
                        <Header as="h3" textAlign="center">{this.props.installationIsUpdate ? "Update required" : "Installation required"}</Header>
                        <Card centered>
                            <Card.Content>
                                <h4>
                                    {
                                        this.props.installationIsUpdate
                                            ? "This version of CRM builder needs to apply some updates to your CRM instance"
                                            : "It looks like this is the first time you've used CRM builder with this CRM instance. Click install to continue"
                                    }</h4>

                                <Button primary fluid type="submit" onClick={(e: any) => { e.preventDefault(); this.props.install(); } }>{this.props.installationIsUpdate ? "Update" : "Install"}</Button>
                            </Card.Content>
                        </Card>
                    </div>
                }
                {
                    this.props.isInstalling &&
                    <Dimmer active={this.props.isInstalling} page>
                        <Loader>
                            <p>Installing...</p>
                        </Loader>
                    </Dimmer>
                }
        </div>;
    }
}

export interface IInstallationProps {
    load?: () => void;
    install?: () => void;
    isInstalling?: boolean;
    hasCompletedInstallation?: boolean;
    installationErrorMessage?: string;
    hasLoaded?: boolean;
    requiresInstallation?: boolean;
    installationIsUpdate?: boolean;
    onInstallationComplete?: () => void;
}
