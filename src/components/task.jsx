import React from 'react';
import classnames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import ProgressStore from '../store/progress';

// Dragable requires draggableId and index.
// Dragable needs to return a function as child.
// ...provided.draggableProps needs to be applied to the component that we want to be able to drag around.
// ...provided.dragHandleProps needs to be applied to the part of the component that we want to move around. In this case the whole Task.
// The component also need to have a ref.
// snapshot contains: isDragging (ture when it is currently being dragged)
// and draggingOVer (returns the id of the droppable component that is currently being dragged over. Returns null if not over a droppable).
export default class Task extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <div
                        className={classnames('task-container', snapshot.isDragging ? 'task-container__dragging' : null)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onMouseDown={() => this.setActiveIds()}
                    >
                        {this.props.task.content}
                    </div>
                )}
            </Draggable>
        );
    }

    // Neede because of dnd nesting problems.
    // Otherwise we would not know which task has been moved.
    setActiveIds() {
        ProgressStore.activeRowId = this.props.rowId;
        ProgressStore.activbeColumnId = this.props.columnId;
        ProgressStore.activeTaskId = this.props.task.id;
    }
}
