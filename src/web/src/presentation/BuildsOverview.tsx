import * as React from 'react';
import * as ApiClient from '../../../api/ApiClient';
import AddNewBuild from '../containers/EditBuild';
import ConfirmDeleteBuild from '../containers/ConfirmDeleteBuild';
import { Button, Container, Dimmer, Grid, Header, Icon, Image, Item, Label, Loader, Menu, Rail, Segment } from 'semantic-ui-react';

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

        let builds = this.props.builds.map((build: ApiClient.BuildDto): JSX.Element => {
            return <Segment key={build.id} attached>
                        <Item>
                            <Item.Content>
                                <Item.Header><h3>{build.name}</h3></Item.Header>
                                <Item.Meta>Version: {build.versionMajor + '.' + build.versionMinor}</Item.Meta>
                            </Item.Content>
                            <br/>
                            <Item.Content>
                                <Button.Group basic size='small'>
                                    <Button animated='fade' onClick={(e:any) => this.props.editBuild(build.id)}>
                                        <Button.Content visible><Icon name='edit'/></Button.Content>
                                        <Button.Content hidden>Edit</Button.Content>
                                    </Button>
                                    <Button animated='fade' onClick={(e:any) => this.props.deleteBuild(build.id)}>
                                        <Button.Content visible><Icon name='delete'/></Button.Content>
                                        <Button.Content hidden>Delete</Button.Content>
                                    </Button>
                                </Button.Group>
                            </Item.Content>                         
                        </Item>
                        <Rail internal position='right'>
                            <Segment textAlign='right' basic>
                                <Label as='a' color='green' tag>Ready to run</Label>   
                            </Segment>
                        </Rail>
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
                <Dimmer active={this.props.isFetchingBuildForEdit} page>
                    <Loader>
                        <p>Loading...</p>
                    </Loader>
                </Dimmer>
        </div>;
    }
}

export interface IBuildsOverviewProps {
    isFetchingBuilds?: boolean;
    fetchBuilds?: () => void;
    builds?: Array<ApiClient.BuildDto>;
    navigationIsActive?: boolean;
    newBuild?: () => void;
    editBuild?: (buildId: string) => void;
    isFetchingBuildForEdit?: boolean;
    deleteBuild?: (id: string) => void;
}