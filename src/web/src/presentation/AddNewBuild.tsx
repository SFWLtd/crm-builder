import * as React from 'react';
import * as ApiClient from '../../../api/ApiClient';
import { Button, Dimmer, Form, Header, Icon, Loader, Modal } from 'semantic-ui-react';

export class AddNewBuild extends React.Component<IAddNewBuildProps, undefined> {
    constructor(props: IAddNewBuildProps) {
        super(props);
    }

    render() {
        return <div>
        <Modal open={this.props.shouldDisplay} onClose={(e: any) => this.props.onFormCancel()}>
            <Header as='h2' icon textAlign='center'>
                <Icon name='wrench' circular size='tiny' />
                <Header.Content>
                    Add new build
                </Header.Content>
            </Header>
            <Modal.Content>
               <Form size='large'>
                    <Form.Field error={this.props.nameIsValid}>
                        <label>Build name</label>
                        <input value={this.props.name} placeholder='My build 1' onChange={e => { this.props.nameOnChange((e as any).target.value) } } onBlur={this.props.nameOnBlur} />
                    </Form.Field>
                    <Form.Field>
                        <div className="ui form large">
                            <div className='field'>
                                <label>Versioning method</label>
                                <select className="ui dropdown" value={this.props.buildVersioningType} onChange={e => { this.props.buildVersioningTypeOnChange((e as any).target.value) } }>
                                    <option value={ApiClient.BuildVersioningType.JulianDate}>Julian date</option>
                                </select>
                            </div>
                        </div>
                    </Form.Field>
                    <br/>
                </Form>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={(e: any) => this.props.onFormCancel()}>Cancel</Button>
            <Button primary labelPosition='right' icon='write' content='Submit' onClick={(e: any) => this.props.onFormSubmit(this.props)} />
          </Modal.Actions>
        </Modal>
        <Dimmer active={this.props.isSubmitting} page>
            <Loader>
                <p>Creating...</p>
            </Loader>
        </Dimmer>
        </div>
    }
}

export interface IAddNewBuildProps {
    shouldDisplay?: boolean,
    name?: string,
    nameIsValid?: boolean,
    nameOnBlur?: () => void,
    nameOnChange?: (name: string) => void,
    buildVersioningType?: ApiClient.BuildVersioningType,
    buildVersioningTypeOnChange?: (buildVersioningType: ApiClient.BuildVersioningType) => void,
    onFormCancel?: () => void,
    onFormSubmit?: (props: IAddNewBuildProps) => void,
    isSubmitting?: boolean
}