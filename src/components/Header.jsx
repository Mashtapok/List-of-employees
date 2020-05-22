import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import {AddModal} from "./AddModal";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@material-ui/icons/Delete';
import {EditModal} from "./EditModal";
import * as Yup from "yup";
import Tooltip from "@material-ui/core/Tooltip";

const DefaultSchema = Yup.object().shape({
    name: Yup.string().max(30, 'Это слишком длинно').required('Укажите имя'),
    surname: Yup.string().max(30, 'Это слишком длинно').required('Укажите фамилию'),
    birthday: Yup.date().required('Укажите дату рождения'),
    position: Yup.string().required('Укажите должность'),
    city: Yup.string().max(30, 'Это слишком длинно').required('Укажите город'),
    street: Yup.string().max(30, 'Это слишком длинно').required('Укажите улицу'),
    house: Yup.string().max(30, 'Это слишком длинно').required('Укажите номер дома'),
    flat: Yup.string().max(30, 'Это слишком длинно')
});

const useStylesModal = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "auto",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: "nones"
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export const Header = ({remove, addNewWorker, editWorker, editableWorker,updateWorkerInform, ...props}) => {
    return (
        <Box>
            <AddModal addNewWorker={addNewWorker} DefaultSchema={DefaultSchema}
                      useStylesModal={useStylesModal}/>

                <Tooltip title={!props.isSelected ? "Сначала выберите сотрудника" : ""} placement="top">
                <span>
                    <EditModal updateWorkerInform={updateWorkerInform} isSelected={props.isSelected}
                               editableWorker={editableWorker}
                               editWorker={editWorker} DefaultSchema={DefaultSchema}
                               useStylesModal={useStylesModal}/>
                </span>
                </Tooltip>

                <Tooltip title={!props.isSelected ? "Для удаления необходимо выбрать сотрудника" : ""} placement="top">
                <span>
                    <Button disabled={!props.isSelected} onClick={remove} variant="contained" startIcon={<DeleteIcon/>}
                            color="secondary">
                        Удалить
                    </Button>
                 </span>
                </Tooltip>

        </Box>
    );
};