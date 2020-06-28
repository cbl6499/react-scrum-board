import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import ProgressStore from '../store/progress';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Row from './row';
import progressStore from '../store/progress';
import { observable } from 'mobx';

const Container = styled.div`
    background-image: url('https://picsum.photos/3072/1585');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: fixed;
    overflow: scroll;
`;

const AddRowButton = styled(Button)`
    margin: 8px;
    width: 170px;
    background-color: darkcyan;
`;

@observer
class App extends React.Component {
    @observable taskName = '';
    render() {
        return (
            <Container>
                {ProgressStore.rowOrder.map((rowOrder, index) => {
                    const row = ProgressStore.rows[rowOrder];

                    return <Row key={row.id} row={row} index={index} />;
                })}
                <AddRowButton variant="contained" endIcon={<AddIcon />} onClick={() => progressStore.addNewRow()}>
                    Neue Story
                </AddRowButton>

                <Dialog open={progressStore.showAddTaskModal} onClose={() => (progressStore.showAddTaskModal = false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Neuer Task erstellen</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="title" label="Name" fullWidth required onChange={(event) => (this.taskName = event.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => (progressStore.showAddTaskModal = false)} color="primary">
                            Abbrechen
                        </Button>
                        <Button onClick={() => progressStore.addNewTask(this.taskName)} color="primary">
                            Erstellen
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

export default App;
