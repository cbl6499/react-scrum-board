import { observable, action } from 'mobx';

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

    @action.bound moveInList(start, source, destination, draggableId) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        this.columns = {
            ...this.columns,
            [newColumn.id]: newColumn,
        };
    }

    // Remove from old id list (start) and add to new list (finish)
    @action.bound moveToList(start, finish, source, destination, draggableId) {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
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
