import React, { useState } from 'react';

const SortDropDown = ({ searchValue, setSearchValue }) => {
	const [isSortOpen, setIsSortOpen] = useState(false);
	const menuSortClass = `dropdown-menu${isSortOpen ? ' show' : ''}`;
	const toggleSortOpen = () => setIsSortOpen(!isSortOpen);

	const handleCreatedClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			sortValue: 'Created',
		});
	};
	const handleTitleClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			sortValue: 'Title',
		});
	};
	const handleDueClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			sortValue: 'Due',
		});
	};
	const handlePriorityClick = (e) => {
		e.preventDefault();
		setSearchValue({
			...searchValue,
			sortValue: 'Priority',
		});
	};

	return (
		<div className="input-group-btn search-panel bg-white w-100 d-flex align-items-center">
			<div
				className="dropdown shadow-none w-100"
				onClick={toggleSortOpen}>
				<button
					className="btn btn-light dropdown-toggle shadow-none w-100"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true">
					Sort By
				</button>
				<div
					className={menuSortClass}
					aria-labelledby="dropdownMenuButton">
					<button
						className="dropdown-item"
						onClick={handleCreatedClick}>
						Created Date and Time
					</button>
					<button
						className="dropdown-item"
						onClick={handleTitleClick}>
						Tile
					</button>
					<button className="dropdown-item" onClick={handleDueClick}>
						Due Date and Time
					</button>
					<button
						className="dropdown-item"
						onClick={handlePriorityClick}>
						Priority Level
					</button>
				</div>
			</div>
		</div>
	);
};

export default SortDropDown;
