import * as React from "react";

import { NavBar } from "./navigation/NavBar"
import { MainContent } from "./main/MainContent"
import { Welcome } from "./main/Welcome"

export class App extends React.Component<undefined, AppState> {

    constructor() {
        super();

        this.state = { mainContent: <Welcome/> }
    }

    render() {
        return <div>
            <NavBar setMainContent={this.setMainContent}/>
            <br/>
            <div className='wrap'><MainContent>{this.state.mainContent}</MainContent></div>
        </div>;
    }

    setMainContent = (content : JSX.Element) => {
        this.setState({ mainContent : content});
    }
}

export interface AppState {
    mainContent : JSX.Element;
}