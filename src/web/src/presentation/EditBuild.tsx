import * as React from "react";
import { Button, Dimmer, Form, Header, Icon, Loader, Modal } from "semantic-ui-react";
import * as ApiClient from "../../../api/ApiClient";

export class EditBuild extends React.Component<IEditBuildProps, undefined> {
    constructor(props: IEditBuildProps) {
        super(props);
    }

    public render() {
        return <div>
        <Modal open={this.props.shouldDisplay} onClose={(e: any) => this.props.onFormCancel()}>
            <Header as="h2" icon textAlign="center">
                <Header.Content>
                    {this.props.isEdit ? "Edit build" : "Add new build"}
                </Header.Content>
            </Header>
            <Modal.Content>
               <Form size="large">
                    <Header size="medium">Build properties</Header>
                    <Form.Group widths="equal">
                        <Form.Field error={!this.props.nameIsValid}>
                            <label>Build name</label>
                            <input value={this.props.name} placeholder="My build 1" onChange={(e) => { this.props.nameOnChange((e as any).target.value); } } onBlur={this.props.nameOnBlur} />
                        </Form.Field>
                        <Form.Field>
                        <div className="ui form large">
                            <div className="field">
                                <label>Versioning method</label>
                                <select className="ui dropdown" value={this.props.buildVersioningType} onChange={(e) => { this.props.buildVersioningTypeOnChange((e as any).target.value); } }>
                                    <option value={ApiClient.BuildVersioningType.JulianDate}>Julian date</option>
                                </select>
                            </div>
                        </div>
                    </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field error={!this.props.versionMajorIsValid}>
                            <label>Major version</label>
                            <input type="number" value={this.props.versionMajor} placeholder="(Enter a value 0-999)" onChange={(e) => { this.props.versionMajorOnChange((e as any).target.value); } } onBlur={this.props.versionMajorOnBlur} />
                        </Form.Field>
                        <Form.Field error={!this.props.versionMinorIsValid}>
                            <label>Minor version</label>
                            <input type="number" value={this.props.versionMinor} placeholder="(Enter a value 0-999)" onChange={(e) => { this.props.versionMinorOnChange((e as any).target.value); } } onBlur={this.props.versionMinorOnBlur} />
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Header size="medium">Solution target</Header>
                    <Form.Field error={!this.props.selectedSolutionIdIsValid}>
                        <div className="ui form large">
                            <div className="field">
                                <label>Solution</label>
                                <select className="ui dropdown" value={!this.props.selectedSolutionId ? "empty" : this.props.selectedSolutionId} onChange={(e) => { this.props.selectedSolutionIdOnChange((e as any).target.value); ; } }>
                                    <option value="empty">Please select a solution</option>
                                    {
                                        this.props.availableSolutions.map((sol: ApiClient.SolutionDto) => {
                                            return <option key={sol.id} value={sol.id}>{sol.displayName}</option>;
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </Form.Field>
                    <Header size="medium">Target environment</Header>
                    <Form.Field>
                        <div className="ui form large">
                            <div className="field">
                                <label>Authentication type</label>
                                <select className="ui dropdown" value={this.props.authenticationTypeSelectedValue} onChange={(e) => { this.props.authenticationTypeOnChange((e as any).target.value); ; } }>
                                    <option value={ApiClient.AuthenticationType.Dynamics365}>Dynamics 365</option>
                                    <option value={ApiClient.AuthenticationType.Ifd}>IFD (Internet Facing deployment)</option>
                                    <option value={ApiClient.AuthenticationType.OnPremise}>On premise</option>
                                </select>
                            </div>
                        </div>
                    </Form.Field>
                    <Form.Field error={!this.props.crmUrlIsValid}>
                        <label>CRM Url</label>
                        <input placeholder="https://myorg.dynamics.com" value={this.props.crmUrl} onChange={(e) => { this.props.crmUrlOnChange((e as any).target.value); ; }} onBlur={this.props.crmUrlOnBlur}/>
                    </Form.Field>
                    {
                        this.props.authenticationTypeSelectedValue === ApiClient.AuthenticationType.Dynamics365 as number &&
                        <Form.Field error={!this.props.emailAddressIsValid}>
                            <label>Email address</label>
                            <input placeholder="myemail@dynamics.com" value={this.props.emailAddress}  onChange={(e) => { this.props.emailAddressOnChange((e as any).target.value); ; } } onBlur={this.props.emailAddressOnBlur} />
                        </Form.Field>
                    }
                    {
                        this.props.authenticationTypeSelectedValue !== ApiClient.AuthenticationType.Dynamics365 as number &&
                        <Form.Group widths="equal">
                            <Form.Field error={!this.props.domainIsValid}>
                                <label>Domain</label>
                                <input placeholder="mydomain" value={this.props.domain}  onChange={(e) => { this.props.domainOnChange((e as any).target.value); ; } } onBlur={this.props.domainOnBlur} />
                            </Form.Field>
                            <Form.Field error={!this.props.usernameIsValid}>
                                <label>Username</label>
                                <input placeholder="myusername" value={this.props.username}  onChange={(e) => { this.props.usernameOnChange((e as any).target.value); ; } } onBlur={this.props.usernameOnBlur} />
                            </Form.Field>
                        </Form.Group>
                    }
                    <Form.Field error={!this.props.passwordIsValid}>
                        <label>Password</label>
                        <input type="password" value={this.props.password}  onChange={(e) => { this.props.passwordOnChange((e as any).target.value); ; } } onBlur={this.props.passwordOnBlur} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={(e: any) => this.props.onFormCancel()}>Cancel</Button>
            <Button primary labelPosition="right"
                icon={this.props.isEdit ? "edit" : "write"}
                content={this.props.isEdit ? "Update" : "Create"}
                onClick={(e: any) => this.props.onFormSubmit(this.props)} />
          </Modal.Actions>
        </Modal>
        <Dimmer active={this.props.isSubmitting} page>
            <Loader>
                <p>{this.props.isEdit ? "Updating..." : "Creating..."}</p>
            </Loader>
        </Dimmer>
        </div>;
    }
}

export interface IEditBuildProps {
    isEdit?: boolean;
    editBuildId?: string;
    shouldDisplay?: boolean;
    name?: string;
    nameIsValid?: boolean;
    nameOnBlur?: () => void;
    nameOnChange?: (name: string) => void;
    versionMajor?: number;
    versionMajorOnBlur?: () => void;
    versionMajorIsValid?: boolean;
    versionMajorOnChange?: (value: number) => void;
    versionMinor?: number;
    versionMinorOnBlur?: () => void;
    versionMinorIsValid?: boolean;
    versionMinorOnChange?: (value: number) => void;
    buildVersioningType?: ApiClient.BuildVersioningType;
    buildVersioningTypeOnChange?: (buildVersioningType: ApiClient.BuildVersioningType) => void;
    selectedSolutionId?: string;
    selectedSolutionIdIsValid?: boolean;
    selectedSolutionIdOnBlur?: () => void;
    selectedSolutionIdOnChange?: (solutionId: string) => void;
    availableSolutions?: ApiClient.SolutionDto[];
    authenticationTypeSelectedValue?: number;
    authenticationTypeOnChange?: (value: number) => void;
    crmUrlOnChange?: (value: string) => void;
    crmUrl?: string;
    crmUrlIsValid?: boolean;
    crmUrlOnBlur?: () => void;
    emailAddressOnChange?: (value: string) => void;
    emailAddress?: string;
    emailAddressIsValid?: boolean;
    emailAddressOnBlur?: () => void;
    domainOnChange?: (value: string) => void;
    domain?: string;
    domainIsValid?: boolean;
    domainOnBlur?: () => void;
    usernameOnChange?: (value: string) => void;
    username?: string;
    usernameIsValid?: boolean;
    usernameOnBlur?: () => void;
    passwordOnChange?: (value: string) => void;
    password?: string;
    passwordIsValid?: boolean;
    passwordOnBlur?: () => void;
    onFormCancel?: () => void;
    onFormSubmit?: (props: IEditBuildProps) => void;
    isSubmitting?: boolean;
}
