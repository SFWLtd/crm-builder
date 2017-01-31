import * as React from 'react';

export class Card extends React.Component<ICardProps, undefined> {
    render() {
        return <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
                <span className='card-title'>{this.props.title}</span>
                {this.props.children}
            </div>
        </div>;
    }
}

export interface ICardProps {
    title: string;
}
