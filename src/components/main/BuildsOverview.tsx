import * as React from "react";

export class BuildsOverview extends React.Component<undefined, undefined> {

    render() {
        var buildElements = new Array<JSX.Element>();

        try
        {
            let builds = this.getBuilds();
            builds.forEach(b => {
                buildElements.push(<div className="row">
                    <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                        <span className="card-title">Card Title</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                        </div>
                    </div>
                    </div>
                </div>);
            });   
        }
        catch (Exception)
        {
            buildElements.push(<a href="#!" className="collection-item"><i className="material-icons">error</i><span className="left-nav-error">Error</span></a>)
        }

        return <div id="main">{buildElements}</div>; 
    }

    getBuilds() : Array<BuildOverview> {      

        return [
            new BuildOverview("1", "Test Build 1"),
            new BuildOverview("2", "Test Build 2")
        ]
    }
}

export class BuildOverview {

    constructor(id : string, name: string) {
        this.id = id;
        this.name = name;
    }

    id : string;
    name : string;
}