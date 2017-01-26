import * as React from 'react';

export class PageLoader extends React.Component<IPageLoaderProps, undefined> {

    constructor(props: IPageLoaderProps) {
        super(props);
    }

    render() {
        return <div id='loader'>
            <div className='center-align'>
                <h5>{this.props.message}</h5>
            </div>
            <div className='progress'>
                <div className='indeterminate'>
                </div>
            </div>
        </div>;
    };
}

export interface IPageLoaderProps {
    message: string;
}
