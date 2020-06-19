import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    min-width: 200px;

    /* flex is needed when using multiple columns to be able to drag a draggable to another column. */
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
    padding: 8px;
`;

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${(props) => (props.isDragging ? 'skyblue' : 'white')};
    min-height: 50px;
    display: flex;
`;

class InnerList extends React.Component {
    // Performance boost to only render when a change is happening.
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render() {
        return this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} columnId={this.props.columnId} rowId={this.props.rowId} />);
    }
}

// Droppable requires droppableId.
// Droppable needs to return a function as child.
// ref and ...provided.droppableProps are needed to make it a dropable component.
// provided.placeholder generates a placeholder where a task can than be dropped at.
// snapshot contains two properties: isDraggingOver (ture a draggable is dragging over a droppable)
// and draggingOverWith (returns the id of the draggable component that is currently dragging over the droppable. Returns null if the droppable is not being dragged over).
// Set direaction on Droppable component with direction={'horizontal'}.
// Type is set to the row id so that it is not possible to move tasks between rows.
export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} direction={'horizontal'} type={this.props.rowId}>
                    {(provided, snapshot) => (
                        <TaskList ref={provided.innerRef} {...provided.droppableProps} isDragging={snapshot.isDraggingOver}>
                            <InnerList tasks={this.props.tasks} columnId={this.props.column.id} rowId={this.props.rowId} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}
