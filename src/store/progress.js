import { observable, action } from 'mobx';

class progress {
    @observable rows = {
        'row-1': {
            id: 'row-1',
            title: '#824 Detail page',
            tasks: {
                'task-1': { id: 'task-1', content: 'Take ou the garbage' },
                'task-2': { id: 'task-2', content: 'Watch my favorite show' },
                'task-3': { id: 'task-3', content: 'Charge my phone' },
                'task-4': { id: 'task-4', content: 'Cook dinner' },
                'task-5': { id: 'task-5', content: 'Code a scrum board in react' },
                'task-6': { id: 'task-6', content: 'Go to bed' },
            },
            columns: {
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
            },
            columnOrder: ['column-1', 'column-2', 'column-3'],
        },
        'row-2': {
            id: 'row-2',
            title: '#821 Add new emergency',
            tasks: {
                'task-100': { id: 'task-100', content: 'Take ou the garbage 2' },
                'task-200': { id: 'task-200', content: 'Watch my favorite show 2' },
                'task-300': { id: 'task-300', content: 'Charge my phone 2' },
                'task-400': { id: 'task-400', content: 'Cook dinner 2' },
                'task-500': { id: 'task-500', content: 'Code a scrum board in react 2' },
                'task-600': { id: 'task-600', content: 'Go to bed 2' },
            },
            columns: {
                'column-100': {
                    id: 'column-100',
                    title: 'To do',
                    taskIds: ['task-100', 'task-200', 'task-300', 'task-400', 'task-500', 'task-600'],
                },
                'column-200': {
                    id: 'column-200',
                    title: 'In progress',
                    taskIds: [],
                },
                'column-300': {
                    id: 'column-300',
                    title: 'Done',
                    taskIds: [],
                },
            },
            columnOrder: ['column-100', 'column-200', 'column-300'],
        },
    };

    @observable rowOrder = ['row-1', 'row-2'];

    @observable activeRowId = '';
    @observable activbeColumnId = '';
    @observable activeTaskId = '';

    // Needs to be broken down in multiple const because mobx will not direclty the update in the nested object is too far down.
    @action.bound moveInList(start, source, destination, draggableId) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        this.rows[this.activeRowId] = {
            ...this.rows[this.activeRowId],
            columns: {
                ...this.rows[this.activeRowId].columns,
                [newColumn.id]: newColumn,
            },
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

        this.rows[this.activeRowId] = {
            ...this.rows[this.activeRowId],
            columns: {
                ...this.rows[this.activeRowId].columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
    }

    @action.bound moveRow(source, destination, draggableId) {
        const startRowIds = Array.from(this.rowOrder);
        startRowIds.splice(source.index, 1);
        startRowIds.splice(destination.index, 0, draggableId);

        this.rowOrder = startRowIds;
    }
}

const progressStore = new progress();
export default progressStore;
