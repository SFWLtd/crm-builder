import * as React from 'react';
import * as ApiClient from '../../../api/ApiClient';
import { Button, Dimmer, Form, Header, Icon, Loader, Modal } from 'semantic-ui-react';

export class ConfirmDeleteBuild extends React.Component<IConfirmDeleteBuildProps, undefined> {
    constructor(props: IConfirmDeleteBuildProps) {
        super(props);
    }

    render() {
        return <div>
        <Modal open={this.props.shouldDisplay} onClose={(e: any) => this.props.onFormCancel()}>
            <Header as='h2' icon textAlign='center'>
                <Icon name='delete' circular size='tiny' />
                <Header.Content>
                    Delete build
                </Header.Content>
            </Header>
            <Modal.Content>
               <p>Are you sure you want to delete this build?</p>
            </Modal.Content>
            <Modal.Actions>
            <Button primary onClick={(e: any) => this.props.onFormCancel()}>Cancel</Button>
            <Button negative labelPosition='right' icon='delete' content='Delete' onClick={(e: any) => this.props.onFormSubmit(this.props.buildId)} />
          </Modal.Actions>
        </Modal>
        <Dimmer active={this.props.isSubmitting} page>
            <Loader>
                <p>Deleting...</p>
            </Loader>
        </Dimmer>
        </div>
    }
}

export interface IConfirmDeleteBuildProps {
    buildId?: string;
    shouldDisplay?: boolean;
    onFormCancel?: () => void;
    onFormSubmit?: (buildId: string) => void;
    isSubmitting?: boolean;
}