import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ProgressStore from '../store/progress';
import Row from './row';

const Container = styled.div`
    background-image: url('https://picsum.photos/3072/1585');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
`;

@observer
class App extends React.Component {
    // Handle Drag and Drop.
    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (destination.draggableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'Row') {
            ProgressStore.moveRow(source, destination, draggableId);
        }

        // We need to use forceUpdate because of nesting problems, which hinder a rerender.
        if (type === ProgressStore.activeRowId) {
            const start = ProgressStore.rows[ProgressStore.activeRowId].columns[source.droppableId];
            const finish = ProgressStore.rows[ProgressStore.activeRowId].columns[destination.droppableId];

            if (start === finish) {
                ProgressStore.moveInList(start, source, destination, draggableId);
                this.forceUpdate();
                return;
            }

            // Moving from one list to another.
            ProgressStore.moveToList(start, finish, source, destination, draggableId);
            this.forceUpdate();
        }
    };

    // DragDropContext requires onDragEnd.
    // DragDropContext needs to return a function as child.
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                    <Droppable droppableId="row-dropzone" type={'Row'}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {ProgressStore.rowOrder.map((rowOrder, index) => {
                                    const row = ProgressStore.rows[rowOrder];

                                    return <Row key={row.id} row={row} index={index} />;
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </Container>
            </DragDropContext>
        );
    }
}

export default App;
