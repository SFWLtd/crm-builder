import * as React from "react";

export class MainContent extends React.Component<undefined, undefined> {
    render() {
        return <div>{this.props.children}</div>;
    }
}