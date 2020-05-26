import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export function Search({keywordChange, ...props}) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField placeholder="Имя или фамилия"
                       id="standard-search" label="Поиск"
                       type="search"
                       onChange={(event) => keywordChange(event)}/>
        </form>
    );
}