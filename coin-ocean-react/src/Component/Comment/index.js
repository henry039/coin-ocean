import * as React from 'react';
import CommentAdd from './comment-add'
import CommentsShow from './comment-show'

export default class extends React.Component{
    render() {
        const {coin} = this.props
        return (
            <React.Fragment>
                <CommentAdd coin={coin}/>
                <CommentsShow coin={coin}/>
            </React.Fragment>
        )
    }
}