import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Header} from "./components/Header";
import {WorkersTable} from "./components/WorkersTable";
import {Search} from "./components/Search";
import {connect} from "react-redux";
import {
    addWorkerThunk,
    editWorker,
    removeWorker,
    requestWorkersThunk, setWorkersSuccess,
    updateWorker
} from "./redux/reducers/tableReducer";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {getTable, getWorkersIsLoading} from "./redux/reducers/tableSelectors";

function App(props) {
    const [darkMode, setDarkMode] = useState(false);
    const [selected, setSelected] = React.useState({id: null, isSelected: false});
    const [keyword, setKeyword] = React.useState(null);

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light'
        },
    });

    const handleClick = (id) => {
        setSelected({id: id, isSelected: !selected.isSelected})
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
        props.addWorkerThunk(data);
    };

    const updateWorkerInform = (data) => {
        let formData = Object.assign({}, props.table.editableWorker, data);
        props.updateWorker(formData);
    };

    const searchedWorkers = props.table.workers.filter(worker => {
            if (keyword == null) {
                return true;
            } else if (worker.name.toLowerCase().includes(keyword) || worker.surname.toLowerCase().includes(keyword)) {
                return true
            }
        }
    );

    const keywordChange = (event) => {
        if (event.target.value) {
            setKeyword(event.target.value.toLowerCase());
        } else setKeyword(null)
    };
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <CssBaseline/>
                <Box my={4}>
                    <Search keywordChange={keywordChange}/>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}
                            isSelected={selected.isSelected}
                            editableWorker={props.table.editableWorker}
                            remove={remove} addNewWorker={addNewWorker}
                            editWorker={editWorker}
                            updateWorkerInform={updateWorkerInform}/>

                    <WorkersTable workersIsLoading={props.workersIsLoading} searchedWorkers={searchedWorkers}
                                  selected={selected}
                                  handleClick={handleClick}
                                  requestWorkersThunk={props.requestWorkersThunk}/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    table: getTable(state),
    workersIsLoading: getWorkersIsLoading(state),
});

export default connect(mapStateToProps, {
    removeWorker,
    requestWorkersThunk,
    addWorkerThunk,
    editWorker,
    updateWorker,
    setWorkersSuccess
})(App);
