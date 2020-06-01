import { observable, action, toJS } from 'mobx';

class progress {
    // TODO: Load data from API and then use these objects.
    @observable tasks = {
        'task-1': { id: 'task-1', content: 'Take ou the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
        'task-5': { id: 'task-5', content: 'Code a scrum board in react' },
        'task-6': { id: 'task-6', content: 'Go to bed' },
    };

    @observable columns = {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    };

    @observable columnOrder = ['column-1', 'column-2', 'column-3'];

    @observable row1 = {
        id: 'row-1',
        tasks: [
            { id: 'task-1', content: 'Take ou the garbage' },
            { id: 'task-2', content: 'Watch my favorite show' },
            { id: 'task-3', content: 'Charge my phone' },
            { id: 'task-4', content: 'Cook dinner' },
            { id: 'task-5', content: 'Code a scrum board in react' },
            { id: 'task-6', content: 'Go to bed' },
        ],
        columns: [
            {
                id: 'column-11',
                title: 'To do',
                taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6'],
            },
            {
                id: 'column-21',
                title: 'In progress',
                taskIds: [],
            },
            {
                id: 'column-31',
                title: 'Done',
                taskIds: [],
            },
        ],
        columnOrder: ['column-11', 'column-21', 'column-31'],
    };

    @observable row2 = {
        id: 'row-2',
        tasks: [
            { id: 'task-11', content: 'Take ou the garbage' },
            { id: 'task-21', content: 'Watch my favorite show' },
            { id: 'task-31', content: 'Charge my phone' },
            { id: 'task-41', content: 'Cook dinner' },
            { id: 'task-51', content: 'Code a scrum board in react' },
            { id: 'task-61', content: 'Go to bed' },
        ],
        columns: [
            {
                id: 'column-11',
                title: 'To do',
                taskIds: ['task-11', 'task-21', 'task-31', 'task-41', 'task-51', 'task-61'],
            },
            {
                id: 'column-21',
                title: 'In progress',
                taskIds: [],
            },
            {
                id: 'column-31',
                title: 'Done',
                taskIds: [],
            },
        ],
        columnOrder: ['column-11', 'column-21', 'column-31'],
    };

    @observable rows = [this.row1, this.row2];

    @action.bound moveInList(start, source, destination, draggableId, currentRowIndex) {
        console.log(start[0].taskIds);
        const newTaskIds = Array.from(start[0].taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        // TODO: Add new switching.
        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        this.rows[currentRowIndex].columns = {
            ...this.rows[currentRowIndex].columns,
            [newColumn.id]: newColumn,
        };

        console.log(toJS(this.rows[currentRowIndex].columns));
    }

    // Remove from old id list (start) and add to new list (finish)
    @action.bound moveToList(start, finish, source, destination, draggableId, currentRowIndex) {
        console.log(toJS(start[0].taskIds));
        const startTaskIds = Array.from(start[0].taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish[0].taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        this.columns = {
            ...this.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        };
    }
}

const progressStore = new progress();
export default progressStore;
