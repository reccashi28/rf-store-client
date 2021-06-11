import { createStyles, InputBase, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { searchProduct } from '../../redux/actions';

const useStyles = makeStyles((theme) => 
    // input: {
    //     width: 200,
    // }
    createStyles({
    inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    })
);

function Searchbar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
    return (
        <div>
            {/* <input type="text" name="searchbar" id="" placeholder="search" /> */}
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => dispatch(searchProduct(e.target.value, history))}
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

export default Searchbar;
