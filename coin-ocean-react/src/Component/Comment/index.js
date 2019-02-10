import * as React from 'react';
import CommentAdd from './comment-add'
import CommentsShow from './comment-show'
// import {RecipeReviewCard, CommentInput } from './comment'

export default class extends React.Component{
    render() {
        const {coin} = this.props
        return (
            <React.Fragment>
                <CommentAdd coin={coin}/>
                <CommentsShow coin={coin}/> 
                {/* <RecipeReviewCard/>
                <CommentInput/> */}
            </React.Fragment>
        )
    }
}