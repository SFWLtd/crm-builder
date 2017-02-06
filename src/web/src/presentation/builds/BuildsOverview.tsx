import * as React from 'react';
import { Button, Container, Grid, Header, Icon, Image, Item, Menu, Rail, Segment } from 'semantic-ui-react';

export class BuildsOverview extends React.Component<IBuildsOverviewProps, undefined> {
    render() {
        if (!this.props.navigationIsActive) {
            return <div></div>;
        }

        return <div>
                <Menu text>
                    <Menu.Item onClick={(e:any) => this.props.newBuild()}><Icon name='write'/>Add new build...</Menu.Item>
                </Menu>
                <Header as='h2' attached='top'>
                    Your builds
                </Header>
                <Segment attached>
                    <Item>
                        <Item.Image size='tiny' src='http://semantic-ui.com/images/wireframe/image.png' />
                        <Item.Content>
                            <Item.Header as='a'>Header</Item.Header>
                            <Item.Meta>Description</Item.Meta>
                            <Item.Description>
                            <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </Item.Description>
                            <Item.Extra>Additional Details</Item.Extra>
                        </Item.Content>
                    </Item>
                </Segment>
                <Segment attached>
                    <Item>
                        <Item.Image size='tiny' src='http://semantic-ui.com/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>Header</Item.Header>
                            <Item.Meta>Description</Item.Meta>
                            <Item.Description>
                            <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </Item.Description>
                            <Item.Extra>Additional Details</Item.Extra>
                        </Item.Content>
                    </Item>
                </Segment>
        </div>;
    }
}

export interface IBuildsOverviewProps {
    navigationIsActive?: boolean;
    newBuild?: () => void;
}