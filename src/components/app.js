import React from 'react';
import { observer } from 'mobx-react';
import '@atlaskit/css-reset'; // css reset.
import '../scss/main.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import progressStore from '../store/progress';
import Row from './row';
import { toJS } from 'mobx';

@observer
class App extends React.Component {
    // Handle Drag and Drop.
    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.draggableId === source.droppableId && destination.index === source.index) {
            return;
        }

        progressStore.moveRow(source, destination, draggableId);
    };

    // DragDropContext requires onDragEnd.
    // DragDropContext needs to return a function as child.
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="row-dropzone">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {progressStore.rowOrder.map((rowOrder, index) => {
                                const row = progressStore.rows[rowOrder];

                                return <Row key={row.id} row={row} index={index} />;
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default App;
