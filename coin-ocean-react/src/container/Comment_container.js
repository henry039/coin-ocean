import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCoinComments_DB, getUserComments_DB, addComments_DB } from '../redux/actions'
import {RecipeReviewCard, CommentInput} from '../Component/Comment/comment'

class Comment_container extends Comment {
    render(){
        const { getCoinComments_DB, getUserComments_DB, addComments_DB } = this.props
        return(
            <div></div>
        )
    }
}

export default connect((state)=> ({comments : state.comments}), {getCoinComments_DB, getUserComments_DB, addComments_DB})(Comment_container)