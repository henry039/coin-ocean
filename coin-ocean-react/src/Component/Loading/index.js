import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loading extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <CircularProgress className={this.props.classes.progress} color="black"/>
        )
    }
}

export default withStyles(styles)(Loading)