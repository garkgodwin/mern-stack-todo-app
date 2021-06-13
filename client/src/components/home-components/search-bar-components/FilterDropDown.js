import React, { useState } from 'react';

const FilterDropDown = ({ searchValue, setSearchValue }) => {
	//?START OF TOGGLER
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const menuFilterClass = `dropdown-menu${isFilterOpen ? ' show' : ''}`;
	const toggleFilterOpen = () => setIsFilterOpen(!isFilterOpen);
	//?END OF TOGGLER

	const handleAllClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			filterValue: 'All',
		});
	};
	const handleFinishedClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			filterValue: 'Finished',
		});
	};
	const handleUnfinishedClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			filterValue: 'Unfinished',
		});
	};
	const handlePastDueClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			filterValue: 'Due',
		});
	};

	return (
		<div className="input-group-btn search-panel bg-white w-100 d-flex align-items-center">
			<div
				className="dropdown shadow-none w-100"
				onClick={toggleFilterOpen}>
				<button
					className="btn btn-light dropdown-toggle shadow-none w-100"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true">
					Filter by
				</button>
				<div
					className={menuFilterClass}
					aria-labelledby="dropdownMenuButton">
					<button className="dropdown-item" onClick={handleAllClick}>
						All Todos
					</button>
					<button
						className="dropdown-item"
						onClick={handleFinishedClick}>
						Finished Todos
					</button>
					<button
						className="dropdown-item"
						onClick={handleUnfinishedClick}>
						Unfinished Todos
					</button>
					<button
						className="dropdown-item"
						onClick={handlePastDueClick}>
						Past Due Todos
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterDropDown;
