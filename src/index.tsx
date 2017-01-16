import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

ReactDOM.render(
    <div>
        <div class="top-banner">
            <div class="top-banner-content-container">
                <img src="sfw-civica.png" id="sfw-logo" class="top-banner-content"/>
                <p id="title" class="top-banner-content">{{title}}</p>
            </div>
        </div>

        <div class="main">
            <div class="ui vertical menu">
                <div class="ui dropdown item">
                    Builds
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <a class="item">My first build</a>
                        <a class="item">My second build</a>
                        <a class="item"><i>Add new...</i><</a>
                    </div>
                </div>
                <a class="item">
                    Settings
                </a>
            </div>

            <div class="divider-container">
                <div class="ui vertical divider"></div>
            </div>
        </div>
    </div>,
    document.getElementById("root")
);