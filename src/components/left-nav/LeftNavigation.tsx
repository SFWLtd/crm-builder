import * as React from "react";

import { CollapsibleMenuBuilds } from "./CollapsibleMenuBuilds"
import { CollapsibleMenu } from "./CollapsibleMenu"

export class LeftNavigation extends React.Component<undefined, undefined> {
    render() {
        return <div className='left-nav'>
            <CollapsibleMenu name="Builds">
                <CollapsibleMenuBuilds />
            </CollapsibleMenu>   
        </div>;
    }
}