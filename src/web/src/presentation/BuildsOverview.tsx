import * as React from 'react';
import * as ApiClient from '../../../api/ApiClient';
import AddNewBuild from '../containers/AddNewBuild';
import ConfirmDeleteBuild from '../containers/ConfirmDeleteBuild';
import { Button, Container, Dimmer, Grid, Header, Icon, Image, Item, Loader, Menu, Rail, Segment } from 'semantic-ui-react';

export class BuildsOverview extends React.Component<IBuildsOverviewProps, undefined> {

    constructor(props: IBuildsOverviewProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBuilds();
    }

    render() {
        if (!this.props.navigationIsActive) {
            return <div></div>;
        }

        let builds = this.props.builds.map((build: ApiClient.BuildProperties): JSX.Element => {
            return <Segment key={build.id} attached>
                <Item>
                    <Item.Content>
                        <Item.Header><h3>{build.name}</h3></Item.Header>
                    </Item.Content>
                    <br/>
                    <Item.Content>
                        <Button.Group basic size='small'>
                            <Button icon='archive' onClick={(e:any) => this.props.deleteBuild(build.id)}/>
                        </Button.Group>
                    </Item.Content>
                </Item>
            </Segment>
        });

        return <div>
                <Menu text>
                    <Menu.Item onClick={(e:any) => this.props.newBuild()}><Icon name='write'/>Add new build...</Menu.Item>
                </Menu>
                <Header as='h2' attached='top'>
                    Your builds
                </Header>
                {builds}
                <AddNewBuild/>
                <ConfirmDeleteBuild/>
                <Dimmer active={this.props.isFetchingBuilds} page>
                    <Loader>
                        <p>Fetching builds...</p>
                    </Loader>
                </Dimmer>
        </div>;
    }
}

export interface IBuildsOverviewProps {
    isFetchingBuilds?: boolean;
    fetchBuilds?: () => void;
    builds?: Array<ApiClient.BuildProperties>;
    navigationIsActive?: boolean;
    newBuild?: () => void;
    deleteBuild?: (id: string) => void;
}