import * as React from 'react';
import { Button, Card, Dimmer, Header, Icon, Loader, Message } from 'semantic-ui-react';

export class Installation extends React.Component<IInstallationProps, undefined> {

    constructor(props: IInstallationProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.hasLoaded) {
            this.props.load();
        }
    }

    componentDidUpdate() {
        if (this.props.hasCompletedInstallation) {
            this.props.load(); // Reload to check latest installation status
        }
    }

    render() {
        return <div>
                <Dimmer active={!this.props.hasLoaded} page>
                    <Loader>Checking installation status...</Loader>
                </Dimmer>
                <br />
                {
                    this.props.hasLoaded && this.props.requiresInstallation &&
                    <div>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='info' circular />
                        </Header>
                        <Header as='h3' textAlign='center'>{this.props.installationIsUpdate ? 'Update required' : 'Installation required'}</Header>
                        <Card centered>
                            <Card.Content>
                                <h4>
                                    {
                                        this.props.installationIsUpdate
                                            ? 'This version of CRM builder needs to apply some updates to your CRM instance'
                                            : 'It looks like this is the first time you\'ve used CRM builder with this CRM instance. Click install to continue'
                                    }</h4>

                                <Button primary fluid type='submit' onClick={e => { e.preventDefault(); this.props.install() } }>{this.props.installationIsUpdate ? 'Update' : 'Install'}</Button>
                            </Card.Content>
                        </Card>
                        <Dimmer active={this.props.isInstalling} page>
                            <Loader>
                                <p>{this.props.installationIsUpdate ? 'Applying updates...' : 'Installing...'}</p>
                                <p>{this.props.latestInstallationMessage}</p>
                            </Loader>
                        </Dimmer>
                    </div>
                }
        </div>;
    }
}

export interface IInstallationProps {
    load?: () => void;
    install?: () => void;
    isInstalling?: boolean;
    hasCompletedInstallation?: boolean;
    latestInstallationMessage?: string;
    installationErrorMessage?: string;
    hasLoaded?: boolean;
    requiresInstallation?: boolean;
    installationIsUpdate?: boolean;
    onInstallationComplete?: () => void;
}