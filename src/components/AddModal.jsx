import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import defaultPhoto from "../assets/defaultPhoto.png";
import {Field, Form, Formik, useField} from "formik";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

const MyField = ({label,...props}) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return(
        <Field {...field} as={TextField} error={!!errorText}
               label={label} helpertext={errorText}
               />
    );
};

export function AddModal({addNewWorker, DefaultSchema, useStylesModal}) {
    const classes = useStylesModal();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    const modalBody = (
            <div className={classes.paper}>
                <Formik
                    initialValues={
                        {
                            name: "", surname: "",
                            birthday: "", position: "",
                            remoteWork: false, city: "",
                            street: "", house: "", flat: ""
                        }
                    }
                    onSubmit={(data) => {
                        addNewWorker(data);
                        handleClose();
                    }}
                    validationSchema={DefaultSchema}
                >
                    {({values, errors, touched}) => (
                        <Form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={3} alignItems="center">
                                <Grid item style={{display:"flex", justifyContent: "center"}} lg={3} xl={2} >
                                    <img style={{width: "150px"}}
                                         src={defaultPhoto}/>
                                </Grid>
                                <Grid item lg={4} xl={5}>
                                    <MyField name={"name"} label={"Имя"} />
                                    <MyField name={"surname"} label={"Фамилия"} />
                                    <Field
                                        error={!!(touched.birthday && errors.birthday)}
                                        helperText={touched.birthday && errors.birthday}
                                        name="birthday"
                                        label="День рождения"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        as={TextField}
                                    />

                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="position">Должность</InputLabel>
                                        <Field
                                            error={!!(touched.position && errors.position)}
                                            helpertext={errors && errors.position}
                                            labelId="position"
                                            name="position"
                                            as={Select}
                                        >
                                            <MenuItem value={"Intern"}>Intern</MenuItem>
                                            <MenuItem value={"Junior"}>Junior</MenuItem>
                                            <MenuItem value={"Middle"}>Middle</MenuItem>
                                            <MenuItem value={"Senior"}>Senior</MenuItem>
                                            <MenuItem value={"TeamLead"}>TeamLead</MenuItem>
                                        </Field>
                                    </FormControl>

                                    <FormControlLabel error={!!(touched && errors.remoteWork)}
                                                      helpertext={errors && errors.remoteWork}
                                                      className={classes.formControl}
                                                      control={<Field as={Checkbox}
                                                                      name="remoteWork"/>}
                                                      label="Удалённая работа"
                                    />
                                </Grid>
                                <Grid item lg={4} xl={5}>
                                    <MyField name={"city"} label={"Город"} />
                                    <MyField name={"street"} label={"Улица"} />
                                    <MyField name={"house"} label={"Дом"} />
                                    <MyField name={"flat"} label={"Квартира"} />
                                    <Button className={classes.button}
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<SaveIcon/>}
                                    >
                                        Сохранить
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>

        )
    ;

    return (
        <>
            <Button onClick={handleOpen} startIcon={<AddIcon />} variant="contained" color="primary">
                Добавить
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody}
            </Modal>
        </>
    );
}
