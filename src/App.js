import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Header} from "./components/Header";
import {WorkersTable} from "./components/WorkersTable";
import {Search} from "./components/Search";
import {connect} from "react-redux";
import {addWorker, editWorker, removeWorker, toggleCheckbox, updateWorker} from "./redux/reducers/tableReducer";

function App(props) {
    const [selected, setSelected] = React.useState({id: null, isSelected: false});
    const [keyword, setKeyword] = React.useState(null);

    const handleClick = (id) => {
        setSelected({id: id, isSelected: !selected.isSelected})
    };

    const handleToggle = (event, id) => {
        event.stopPropagation();
        props.toggleCheckbox(id);
    };

    const remove = () => {
        if (selected.isSelected) {
            props.removeWorker(selected.id);
            setSelected({id: null, isSelected: false})
        }
    };

    const editWorker = () => {
        if (selected.isSelected) {
            props.editWorker(selected.id);

        }
    };

    const addNewWorker = (data) => {
        props.addWorker(data);
    };

    const updateWorkerInform = (data) => {
        let formData = Object.assign({}, props.table.editableWorker, data);
        props.updateWorker(formData);
    };

    const searchingWorkers = props.table.workers.filter(worker => {
            if (keyword == null)
                return worker;
            else if (worker.name.toLowerCase().includes(keyword) || worker.surname.toLowerCase().includes(keyword)) {
                return worker
            }
        }
    );

    const keywordChange = (event) => {
        if (event.target.value) {
            setKeyword(event.target.value.toLowerCase())
            console.log("change");
        } else setKeyword(null)
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Search keywordChange={keywordChange}/>
                <Header isSelected={selected.isSelected}
                        editableWorker={props.table.editableWorker}
                        remove={remove} addNewWorker={addNewWorker}
                        editWorker={editWorker}
                        updateWorkerInform={updateWorkerInform}/>
                <WorkersTable searchingWorkers={searchingWorkers} selected={selected} handleClick={handleClick}
                              handleToggle={handleToggle}/>
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    table: state.table
});

export default connect(mapStateToProps, {removeWorker, addWorker, toggleCheckbox, editWorker, updateWorker})(App);
