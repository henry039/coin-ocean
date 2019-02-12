import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loading extends React.Component {
    render(){
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '100vh'}}>
                <CircularProgress className={this.props.classes.progress} />
            </div>
        )
    }
}

export default withStyles(styles)(Loading)