import * as React from "react";

import { Builds } from "./Builds"

export class LeftNavigation extends React.Component<undefined, undefined> {
    render() {
        return <div className='left-nav'>
            <Builds />
        </div>;
    }
}