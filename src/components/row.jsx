import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import progressStore from '../store/progress';
import Column from './column';
import { IconButton } from '@material-ui/core';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: rgba(207, 215, 216, 0.88);
    border-radius: 5px;
    display: flex;
    position: relative;
    width: fit-content;
    min-height: 156px;
`;

const TitleContainer = styled.div`
    width: 250px;
    min-width: 250px;
    display: flex;
`;

const Title = styled.h3`
    justify-content: center;
    align-self: center;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 0px;
`;

const ArrowUpButton = styled(IconButton)`
    color: black;
    position: absolute;
    top: 2px;
    left: 2px;
`;

const ArrowDownButton = styled(IconButton)`
    color: black;
    position: absolute;
    bottom: 2px;
    left: 2px;
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
                    <TitleContainer>
                        {this.props.index > 1 && (
                            <ArrowUpButton aria-label="delete" onClick={() => progressStore.moveRow(this.props.index, this.props.index - 1)}>
                                <ArrowUpIcon />
                            </ArrowUpButton>
                        )}

                        <Title>{this.props.row.title}</Title>

                        {this.props.index > 0 && this.props.index < progressStore.rowOrder.length - 1 && (
                            <ArrowDownButton aria-label="delete" onClick={() => progressStore.moveRow(this.props.index, this.props.index + 1)}>
                                <ArrowDownIcon />
                            </ArrowDownButton>
                        )}
                    </TitleContainer>
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
