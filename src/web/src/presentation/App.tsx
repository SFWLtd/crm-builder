import * as React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
import AuthenticationForm from "../containers/AuthenticationForm";
import BuildsOverview from "../containers/BuildsOverview";
import Installation from "../containers/Installation";
import Navigation from "../containers/Navigation";

export class App extends React.Component<IAppProps, undefined> {

    public componentDidMount() {
        this.props.load();
    }

    public render() {

        return <div>
            <Container textAlign="center">
                <Dimmer active={this.props.isLoading} page>
                    <Loader>
                        <p>Checking log in status...</p>
                    </Loader>
                </Dimmer>
                <Dimmer active={this.props.isCheckingInstallationState} page>
                    <Loader>
                        <p>Checking installation status...</p>
                    </Loader>
                </Dimmer>
                {
                    !this.props.isLoading && !this.props.isLoggedIn &&
                    <AuthenticationForm />
                }
                {
                    !this.props.isLoading && this.props.isLoggedIn && !this.props.isUpToDate &&
                    <Installation />
                }
                {
                    !this.props.isLoading && this.props.isLoggedIn && this.props.isUpToDate &&
                    <div>
                        <Navigation />
                        <br/>
                        <Container textAlign="left">
                            <BuildsOverview/>
                        </Container>
                    </div>
                }

            </Container>
        </div>;
    }
}

export interface IAppProps {
    isLoading?: boolean;
    load?: () => void;
    isLoggedIn?: boolean;
    isCheckingInstallationState?: boolean;
    isUpToDate?: boolean;
}
