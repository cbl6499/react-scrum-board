import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ProgressStore from '../store/progress';
import Row from './row';

const Container = styled.div`
    background-image: url('https://picsum.photos/3072/1585');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
`;

@observer
class App extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    {ProgressStore.rowOrder.map((rowOrder, index) => {
                        const row = ProgressStore.rows[rowOrder];

                        return <Row key={row.id} row={row} index={index} />;
                    })}
                </div>
            </Container>
        );
    }
}

export default App;
