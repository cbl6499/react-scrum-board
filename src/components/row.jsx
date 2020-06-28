import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import progressStore from '../store/progress';
import Column from './column';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    display: flex;
`;

const Title = styled.h1`
    justify-content: center;
    align-self: center;
    margin-left: 20px;
    margin-right: 20px;
    width: 170px;
`;

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

    // DragDropContext requires onDragEnd.
    // DragDropContext needs to return a function as child.
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                    <Title>{this.props.row.title}</Title>
                    {this.props.row.columnOrder.map((columnId) => {
                        const column = this.props.row.columns[columnId];
                        const tasks = column.taskIds.map((taskId) => this.props.row.tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasks} rowId={this.props.row.id} />;
                    })}
                </Container>
            </DragDropContext>
        );
    }
}
