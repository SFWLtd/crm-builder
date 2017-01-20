import * as React from "react";

import { BuildsOverview } from "../main/BuildsOverview"
import { NavBarItem } from "./NavBarItem"
import { MainContent } from "../main/MainContent"
import { Welcome } from "../main/Welcome"

export class NavBar extends React.Component<NavBarProps, NavBarState> {

    constructor() {
        super()

        this.state = { activeNavItemId: "homenavbaritem" };
    }

    render() {
     
        return <nav className='primary-color'>
                    <div className='wrap'>
                        <ul id="nav-mobile" className="left">
                            <NavBarItem id="homenavbaritem"
                                name=""
                                imageRef = "assets/sfw-civica-logo.png"
                                onNavBarItemSelect={this.onNavBarItemSelect} 
                                activeNavBarItemId={this.state.activeNavItemId}
                                setMainContent={this.props.setMainContent}> 
                                <Welcome/>
                            </NavBarItem>
                            <NavBarItem id="buildsnavbaritem" 
                                imageRef = ""
                                name="Builds" 
                                onNavBarItemSelect={this.onNavBarItemSelect} 
                                activeNavBarItemId={this.state.activeNavItemId} 
                                setMainContent={this.props.setMainContent}>
                                <BuildsOverview/>
                            </NavBarItem>
                            <NavBarItem id="settingsnavbaritem" 
                                imageRef = ""
                                name="Settings" 
                                onNavBarItemSelect={this.onNavBarItemSelect} 
                                activeNavBarItemId={this.state.activeNavItemId} 
                                setMainContent={this.props.setMainContent}/>
                        </ul>
                    </div>
                </nav>
    }

    onNavBarItemSelect = (navBarItem : NavBarItem) => {
        this.setState({ activeNavItemId : navBarItem.id });
    }
}

export interface NavBarProps {
    setMainContent : (content: JSX.Element) => void;
}

export interface NavBarState {
    activeNavItemId : string
}