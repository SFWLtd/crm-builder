import * as React from 'react';

export class Submit extends React.Component<ISubmitProps, undefined> {

    constructor(props: ISubmitProps) {
        super(props)
    }

    render() {
        let spacerStyling = { display: 'inline-block', width: '20px', height: '20px' };

        return <div>
            <a onClick={this.props.onSubmit} className='waves-effect waves-light btn'>{this.props.label}</a>
            <div style={spacerStyling}></div>
            {
                this.props.showLoader &&
                <div className='preloader-wrapper small active'>
                    <div className='spinner-layer'>
                        <div className='circle-clipper left'>
                            <div className='circle'></div>
                        </div><div className='gap-patch'>
                            <div className='circle'></div>
                        </div><div className='circle-clipper right'>
                            <div className='circle'></div>
                        </div>
                    </div>
                </div>
            }
        </div>;
    }
}

export interface ISubmitProps {
    showLoader: boolean;
    onSubmit: () => void;
    label: string
}
