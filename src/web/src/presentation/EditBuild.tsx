import * as React from 'react';
import * as ApiClient from '../../../api/ApiClient';
import { Button, Dimmer, Form, Header, Icon, Loader, Modal } from 'semantic-ui-react';

export class EditBuild extends React.Component<IEditBuildProps, undefined> {
    constructor(props: IEditBuildProps) {
        super(props);
    }

    render() {
        return <div>
        <Modal open={this.props.shouldDisplay} onClose={(e: any) => this.props.onFormCancel()}>
            <Header as='h2' icon textAlign='center'>
                <Icon name={this.props.isEdit? 'edit': 'write'} circular size='tiny' />
                <Header.Content>
                    {this.props.isEdit? 'Edit build': 'Add new build'}
                </Header.Content>
            </Header>
            <Modal.Content>
               <Form size='large'>
                    <Form.Field error={this.props.nameIsValid}>
                        <label>Build name</label>
                        <input value={this.props.name} placeholder='My build 1' onChange={e => { this.props.nameOnChange((e as any).target.value) } } onBlur={this.props.nameOnBlur} />
                    </Form.Field>
                    <Form.Field error={this.props.versionMajorIsValid}>
                        <label>Major version</label>
                        <input type='number' value={this.props.versionMajor} placeholder='(Enter a value 0-999)' onChange={e => { this.props.versionMajorOnChange((e as any).target.value) } } onBlur={this.props.versionMajorOnBlur} />
                    </Form.Field>
                    <Form.Field error={this.props.versionMinorIsValid}>
                        <label>Minor version</label>
                        <input type='number' value={this.props.versionMinor} placeholder='(Enter a value 0-999)' onChange={e => { this.props.versionMinorOnChange((e as any).target.value) } } onBlur={this.props.versionMinorOnBlur} />
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
            <Button primary labelPosition='right' 
                icon={this.props.isEdit ? 'edit': 'write'} 
                content={this.props.isEdit ? 'Update': 'Create'} 
                onClick={(e: any) => this.props.onFormSubmit(this.props)} />
          </Modal.Actions>
        </Modal>
        <Dimmer active={this.props.isSubmitting} page>
            <Loader>
                <p>{this.props.isEdit ? 'Updating...': 'Creating...'}</p>
            </Loader>
        </Dimmer>
        </div>
    }
}

export interface IEditBuildProps {
    isEdit?: boolean,
    editBuildId?: string,
    shouldDisplay?: boolean,
    name?: string,
    nameIsValid?: boolean,
    nameOnBlur?: () => void,
    nameOnChange?: (name: string) => void,
    versionMajor?: number,
    versionMajorOnBlur?: () => void,
    versionMajorIsValid?: boolean,
    versionMajorOnChange?: (value: number) => void,
    versionMinor?: number,
    versionMinorOnBlur?: () => void,
    versionMinorIsValid?: boolean,
    versionMinorOnChange?: (value: number) => void,
    buildVersioningType?: ApiClient.BuildVersioningType,
    buildVersioningTypeOnChange?: (buildVersioningType: ApiClient.BuildVersioningType) => void,
    onFormCancel?: () => void,
    onFormSubmit?: (props: IEditBuildProps) => void,
    isSubmitting?: boolean
}