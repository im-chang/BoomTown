import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';



const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },

});

function Icons(props) {
  const { classes } = props;

  return (
    <Link to="/share" style={{textTransform: 'uppercase', color: 'black', fontFamily: 'Roboto', fontSize: '0.8rem'}}>
    <div className={classes.root}>
    <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddIcon />
      </Button>
     Share Something
    </div>
    </Link>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Icons);
