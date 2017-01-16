import * as React from "react";

export class Builds extends React.Component<BuildsProps, BuildsState> {

    constructor(props : BuildsProps) {
        super(props);
        this.state = { builds : new Array<Build>() };
    }

    render() {
        let builds = this.getBuilds();
        var buildElements = new Array<JSX.Element>();

        this.state.builds.forEach(b => {
            buildElements.push(<a id={b.id} href="#!" className="collection-item"><span className="left-nav-sub-item">{b.name}</span></a>);
        })

        return <div className="collection">
                <a href="#!" onClick={this.onBuildsClick} className="collection-item"><i className="material-icons">list</i><span className='left-nav-header'>Builds</span></a>
                    {buildElements}
                </div>;
    }

    onBuildsClick = () => {
        this.setState({ builds: this.getBuilds() });
    }

    getBuilds() {
        // TODO:
        return [
            new Build("1", "Test Build 1"),
            new Build("2", "Test Build 2")
        ]
    }
}

export class Build {

    constructor(id : string, name: string) {
        this.id = id;
        this.name = name;
    }

    id : string;
    name : string;
}

export interface BuildsState {
    builds : Array<Build>;
}

export interface BuildsProps {

}