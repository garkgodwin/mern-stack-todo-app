export const handleSearchChange = (searchValue, todos) => {
	//return new todo
	let modifiedTodos = [];
	if (todos === undefined || todos === null || todos.length === 0) {
		return null;
	} else {
		modifiedTodos = todos;
		modifiedTodos = textHandler(searchValue, modifiedTodos);
		modifiedTodos = sortHandler(searchValue, modifiedTodos);
		modifiedTodos = filterHandler(searchValue, modifiedTodos);
		return modifiedTodos;
	}
};

export const sortHandler = (searchValue, newTodos) => {
	const sortValue = searchValue.sortValue;
	if (newTodos === undefined || newTodos.length === 0 || newTodos === null) {
		return null;
	} else {
		if (sortValue === 'Created') {
			//sort default the normal sort
			return newTodos;
		} else if (sortValue === 'Title') {
			//sort by alphabet
			return newTodos.sort((todo1, todo2) => {
				let title1 = todo1.title.toLowerCase(),
					title2 = todo2.title.toLowerCase();
				if (title1 < title2) {
					//sort string ascending
					return -1;
				} else {
					if (title1 > title2) return 1;
				}
				return 0; //default return value (no sorting)
			});
		} else if (sortValue === 'Due') {
			//sort by Due Date and Time
			return newTodos.sort((todo1, todo2) => {
				const dueDate1 = new Date(todo1.dueDate);
				const dueDate2 = new Date(todo2.dueDate);
				return dueDate1 - dueDate2;
			});
		} else if (sortValue === 'Priority') {
			//sort by Priority
			return newTodos.sort((todo1, todo2) => {
				const level1 = todo1.priority;
				const level2 = todo2.priority;
				return level1 - level2;
			});
		}
	}
};
export const filterHandler = (searchValue, newTodos) => {
	const filterValue = searchValue.filterValue;
	if (newTodos === undefined || newTodos === null || newTodos.length === 0) {
		return null;
	} else {
		if (filterValue === 'All') {
			return newTodos;
		} else if (filterValue === 'Finished') {
			return newTodos.filter((todo) => todo.isDone === true);
		} else if (filterValue === 'Unfinished') {
			return newTodos.filter((todo) => todo.isDone === false);
		} else if (filterValue === 'Due') {
			return newTodos.filter((todo) => {
				const now = new Date();
				const dueDate = new Date(todo.dueDate);
				return dueDate <= now;
			});
		}
	}
};

export const textHandler = (searchValue, newTodos) => {
	const searchText = searchValue.searchText;
	if (newTodos === undefined || newTodos === null || newTodos.length === 0) {
		return null;
	} else {
		return newTodos.filter((todo) => {
			const withValue1 = todo.title.toUpperCase().includes(searchText);
			const withValue2 = todo.title.toLowerCase().includes(searchText);
			return withValue1 || withValue2;
		});
	}
};
