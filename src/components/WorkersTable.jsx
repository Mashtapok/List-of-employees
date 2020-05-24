import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    row: {
        cursor: "pointer"
    }
});

export function WorkersTable({searchingWorkers, ...props}) {
    const classes = useStyles();

    useEffect(()=> {
        props.requestWorkersThunk();
    }, [searchingWorkers]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Превью</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Фамилия</TableCell>
                        <TableCell>Дата рождения</TableCell>
                        <TableCell>Возраст</TableCell>
                        <TableCell>Должность</TableCell>
                        <TableCell>Удалённая работа</TableCell>
                        <TableCell>Адрес проживания</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchingWorkers.map((row) => {
                        let flatString = row.flat ? `, кв.${row.flat}` : "";
                            return (
                                <TableRow className={classes.row} key={row.id} hover
                                          selected={row.id === props.selected.id ? props.selected.isSelected : false}
                                          onClick={() => props.handleClick(row.id)}>
                                    <TableCell><img style={{maxWidth: "100px"}} src={row.photo}/></TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.surname}</TableCell>
                                    <TableCell>{row.birthday}</TableCell>
                                    <TableCell>{row.age}</TableCell>
                                    <TableCell>{row.position}</TableCell>
                                    <TableCell><Checkbox checked={row.remoteWork}/></TableCell>
                                    <TableCell>{`г.${row.city}, ул.${row.street}, д.${row.house} ${flatString}`}</TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};