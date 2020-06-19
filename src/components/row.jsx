import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import progressStore from '../store/progress';
import Column from './column';

export default class Row extends React.Component {
    // Handle Drag and Drop.
    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.draggableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = this.props.row.columns[source.droppableId];
        const finish = this.props.row.columns[destination.droppableId];

        if (start === finish) {
            progressStore.moveInList(start, source, destination, draggableId, this.props.row.id);
            return;
        }

        // Moving from one list to another.
        progressStore.moveToList(start, finish, source, destination, draggableId, this.props.row.id);
    };

    render() {
        return (
            <Draggable draggableId={this.props.row.id} index={this.props.index}>
                {(provided) => (
                    // <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className={'row-container'} {...provided.draggableProps} ref={provided.innerRef}>
                        <h1 className={'row-title'} {...provided.dragHandleProps}>
                            {this.props.row.title}
                        </h1>
                        {this.props.row.columnOrder.map((columnId) => {
                            const column = this.props.row.columns[columnId];
                            const tasks = column.taskIds.map((taskId) => this.props.row.tasks[taskId]);

                            return <Column key={column.id} column={column} tasks={tasks} rowId={this.props.row.id} />;
                        })}
                    </div>
                    // </DragDropContext>
                )}
            </Draggable>
        );
    }
}
