import { observable, action, toJS } from 'mobx';

class progress {
    @observable rows = {
        'row-1': {
            id: 'row-1',
            title: 'Supports',
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
        'row-3': {
            id: 'row-3',
            title: '#822 Edit emergency',
            tasks: {
                'task-1000': { id: 'task-1000', content: 'Take ou the garbage 2' },
                'task-2000': { id: 'task-2000', content: 'Watch my favorite show 2' },
                'task-3000': { id: 'task-3000', content: 'Charge my phone 2' },
                'task-4000': { id: 'task-4000', content: 'Cook dinner 2' },
                'task-5000': { id: 'task-5000', content: 'Code a scrum board in react 2' },
                'task-6000': { id: 'task-6000', content: 'Go to bed 2' },
            },
            columns: {
                'column-1000': {
                    id: 'column-1000',
                    title: 'To do',
                    taskIds: ['task-1000', 'task-2000', 'task-3000', 'task-4000', 'task-5000', 'task-6000'],
                },
                'column-2000': {
                    id: 'column-2000',
                    title: 'In progress',
                    taskIds: [],
                },
                'column-3000': {
                    id: 'column-3000',
                    title: 'Done',
                    taskIds: [],
                },
            },
            columnOrder: ['column-1000', 'column-2000', 'column-3000'],
        },
    };

    @observable rowOrder = ['row-1', 'row-2', 'row-3'];

    @observable showAddTaskModal = false;
    @observable showAddStoryModal = false;

    @observable activeRowId;
    @observable activeColumnId;
    // Needs to be broken down in multiple const because mobx will not direclty the update in the nested object is too far down.
    @action.bound moveInList(start, source, destination, draggableId, rowId) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        this.rows[rowId] = {
            ...this.rows[rowId],
            columns: {
                ...this.rows[rowId].columns,
                [newColumn.id]: newColumn,
            },
        };
    }

    // Remove from old id list (start) and add to new list (finish)
    @action.bound moveToList(start, finish, source, destination, draggableId, rowId) {
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

        this.rows[rowId] = {
            ...this.rows[rowId],
            columns: {
                ...this.rows[rowId].columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
    }

    @action.bound addNewTask(taskName) {
        const newTaskId = 'task-' + Math.floor(Math.random() * 10000 + 1);

        this.rows[this.activeRowId].tasks = {
            ...this.rows[this.activeRowId].tasks,
            [newTaskId]: { id: newTaskId, content: taskName },
        };

        const column = this.rows[this.activeRowId].columns[this.activeColumnId];
        column.taskIds.push(newTaskId);

        const newTask = {
            ...this.rows[this.activeRowId].columns[this.activeColumnId],
            taskIds: column.taskIds,
        };

        this.rows[this.activeRowId] = {
            ...this.rows[this.activeRowId],
            columns: {
                ...this.rows[this.activeRowId].columns,
                [this.activeColumnIdumnId]: newTask,
            },
        };

        this.showAddTaskModal = false;
    }

    @action.bound addNewStory(storyName) {
        let newRowId = 'row-' + Math.floor(Math.random() * 10000 + 1);
        let newColumnId = 'column-' + Math.floor(Math.random() * 10000 + 1);
        this.rows = {
            ...this.rows,
            [newRowId]: {
                id: newRowId,
                title: storyName,
                tasks: {},
                columns: {
                    [newColumnId]: {
                        id: newColumnId,
                        title: 'To do',
                        taskIds: [],
                    },
                    [newColumnId + 1]: {
                        id: newColumnId + 1,
                        title: 'In progress',
                        taskIds: [],
                    },
                    [newColumnId + 2]: {
                        id: newColumnId + 2,
                        title: 'Done',
                        taskIds: [],
                    },
                },
                columnOrder: [newColumnId, newColumnId + 1, newColumnId + 2],
            },
        };

        this.rowOrder.push(newRowId);
        this.showAddStoryModal = false;
    }

    @action.bound moveRow(from, to) {
        let tempArray = toJS(this.rowOrder);
        let temp = tempArray[from];

        tempArray.splice(from, 1);
        tempArray.splice(to, 0, temp);

        this.rowOrder = tempArray;
    }
}

const progressStore = new progress();
export default progressStore;
