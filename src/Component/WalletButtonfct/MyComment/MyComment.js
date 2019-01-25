import React,{Component} from 'react';

class MyComment extends Component{
    constructor(props) {
        super(props);
        this.state = {
            commentlist: ["Saab", "Volvo", "BMW"],
            commentcontext: false
        };
      }

    render() {
        if (!this.state.commentcontext){
        return(
        <div className="noliststate">
            <div className="nolist">
            <h3>You have not any comment yet!</h3>
            </div>
        </div>
        )
        }else{
        return(
        <div className="yeslist">
            <p>shit</p>
        </div>
        )
        }
    }
}

export default MyComment;