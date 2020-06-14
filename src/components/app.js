import React from 'react';
import { observer } from 'mobx-react';
import '@atlaskit/css-reset'; // css reset.
import '../scss/main.scss';
import { DragDropContext } from 'react-beautiful-dnd';
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

        const start = progressStore.columns[source.droppableId];
        const finish = progressStore.columns[destination.droppableId];

        if (start === finish) {
            progressStore.moveInList(start, source, destination, draggableId);
            return;
        }

        // Moving from one list to another.
        progressStore.moveToList(start, finish, source, destination, draggableId);
    };

    // DragDropContext requires onDragEnd.
    // DragDropContext needs to return a function as child.
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    {progressStore.rowOrder.map((rowOrder) => {
                        const row = progressStore.rows[rowOrder];

                        return <Row key={row.id} row={row} />;
                    })}
                </div>
            </DragDropContext>
        );
    }
}

export default App;
