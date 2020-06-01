import React from 'react';
import { toJS } from 'mobx';
import { DragDropContext } from 'react-beautiful-dnd';
import progressStore from '../store/progress';
import Column from './column';

export default class Row extends React.Component {
    // Handle Drag and Drop.
    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        const columns = toJS(this.props.row.columns);
        const currentRowIndex = toJS(this.props.rowIndex);

        if (!destination) {
            return;
        }

        if (destination.draggableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = columns.filter((column) => column.id === source.droppableId);

        const finish = columns.filter((column) => column.id === destination.droppableId);

        if (JSON.stringify(start) === JSON.stringify(finish)) {
            progressStore.moveInList(start, source, destination, draggableId, currentRowIndex);
            return;
        }

        // Moving from one list to another.
        progressStore.moveToList(start, finish, source, destination, draggableId, currentRowIndex);
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={{ display: 'flex' }}>
                    {this.props.row.columnOrder.map((columnId, index) => {
                        const column = this.props.row.columns[index];
                        const tasks = column.taskIds.map((taskId, index) => this.props.row.tasks[index]);
                        return <Column key={column.id} column={column} tasks={tasks} />;
                    })}
                </div>
            </DragDropContext>
        );
    }
}
