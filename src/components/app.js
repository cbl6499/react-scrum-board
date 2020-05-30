import React from 'react';
import { observer } from 'mobx-react';
import '@atlaskit/css-reset'; // css reset.
import '../scss/main.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import progressStore from '../store/progress';
import Column from './column';

@observer
class App extends React.Component {
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
        // Remove from old id list (start) and add to new list (finish)
        progressStore.moveToList(start, finish, source, destination, draggableId);
    };

    // DragDropContext requires onDragEnd.
    // DragDropContext needs to return a function as child.
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={{ display: 'flex' }}>
                    {progressStore.columnOrder.map((columnId) => {
                        const column = progressStore.columns[columnId];
                        const tasks = column.taskIds.map((taskId) => progressStore.tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasks} />;
                    })}
                </div>
            </DragDropContext>
        );
    }
}

export default App;
