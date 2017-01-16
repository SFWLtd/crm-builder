import * as React from "react";

export class CollapsibleMenuBuilds extends React.Component<undefined, undefined> {

    render() {

        var buildElements = new Array<JSX.Element>();

        try
        {
            let builds = this.getBuilds();
            builds.forEach(b => {
                buildElements.push(<a id={b.id} href="#!" className="collection-item">{b.name}</a>);
            });   
        }
        catch (Exception)
        {
            buildElements.push(<a href="#!" className="collection-item"><i className="material-icons">error</i><span className="left-nav-error">Error</span></a>)
        }

        return <div>{buildElements}</div>; 
    }

    getBuilds() : Array<Build> {      

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