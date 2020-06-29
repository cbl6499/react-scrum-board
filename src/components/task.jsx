import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from '@material-ui/core';

// Custom props for material ui components can not be of type boolean.
const TaskCard = styled(Card)`
    background-color: ${(props) => (props.dragging === 'true' ? 'springgreen' : 'white')};
    margin: 8px;
    min-width: 200px;
    padding: 0px;
`;

const TaskContent = styled(CardContent)`
    padding: 4px 0px 0px 4px;
    color: #172b4d;
    display: block;
`;

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
                    <TaskCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        // onMouseDown={() => this.setActiveIds()}
                        variant={'outlined'}
                        dragging={snapshot.isDragging.toString()}
                    >
                        <TaskContent>{this.props.task.content}</TaskContent>
                    </TaskCard>
                )}
            </Draggable>
        );
    }
}
