import * as React from 'react';

export class PageLoader extends React.Component<IPageLoaderProps, undefined> {

    constructor(props: IPageLoaderProps) {
        super(props);
    }

    render() {
        return <div id='loader'>
            <div className='center-align'>
                <p>{this.props.message}</p>
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
