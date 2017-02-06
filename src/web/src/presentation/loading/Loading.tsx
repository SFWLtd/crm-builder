import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export class Loading extends React.Component<ILoadingProps, undefined> {
    constructor(props: ILoadingProps) {
        super(props);
    }

    render() {
        return <Dimmer active={this.props.isLoading} page>
                    <Loader>
                        <p>{this.props.title}</p>
                        <p>{this.props.description}</p>
                    </Loader>
                </Dimmer>
    }
}

export interface ILoadingProps {
    isLoading?: boolean;
    title?: string;
    description?: string;
}