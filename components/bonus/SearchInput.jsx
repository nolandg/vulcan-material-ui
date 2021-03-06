import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';
import withStyles from 'material-ui/styles/withStyles';
import SearchIcon from 'material-ui-icons/Search';
import CancelIcon from 'material-ui-icons/Cancel';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import { FormControl } from 'material-ui/Form';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    textAlign: 'center',
  },
  dense: {
    '& $search': {
      padding: '2px',
      width: '180px',
    },
  },
  search: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '200px',
    backgroundColor: theme.palette.common.faintBlack,
    borderRadius: '18px',
    padding: '4px;',
    '&:focus': {
      backgroundColor: theme.palette.common.darkBlack,
    }
  },
  icon: {
    color: theme.palette.common.lightBlack,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  input: {
    lineHeight: 1,
    padding: 0,
  },
  cancel: {
    opacity: '0.65',
    width: '28px',
    height: '28px',
    '& svg': {
      width: '16px'
    },
  }
});


class SearchInput extends PureComponent {
  
  constructor () {
    super();
    
    this.state = {
      value: '',
    };
    
    this.focusInput = this.focusInput.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateQuery = _.debounce(this.updateQuery, 500);
  }
  
  focusInput () {
    this.input.focus();
  }
  
  clearSearch () {
    this.setState({
      value: '',
    });
    this.updateQuery('');
  }
  
  updateSearch (event) {
    //event.preventDefault();
    
    const value = event.target.value;
    this.setState({
      value: value
    });
    this.updateQuery(value);
  }
  
  updateQuery (value) {
    this.props.updateQuery(value);
  }
  
  render () {
    const {
      classes,
      className,
      dense
    } = this.props;
    
    return (
      <div className={classNames(classes.root, className, dense && classes.dense)}>
        <FormControl className={classes.search}>
          
          <SearchIcon className={classes.icon} onClick={this.focusInput}/>
          
          <Input className={classes.input}
                 id="search-input"
                 inputRef={(input) => this.input = input}
                 value={this.state.value}
                 type="search"
                 onChange={this.updateSearch}
                 disableUnderline={true}
          />
          
          <IconButton className={classes.cancel}
                      onClick={this.clearSearch}
                      disabled={!this.state.value}
          >
            <CancelIcon/>
          </IconButton>
        
        </FormControl>
      </div>
    );
  }
  
}


SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  updateQuery: PropTypes.func.isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool,
};


SearchInput.displayName = 'SearchInput';


registerComponent('SearchInput', SearchInput, [withStyles, styles]);
