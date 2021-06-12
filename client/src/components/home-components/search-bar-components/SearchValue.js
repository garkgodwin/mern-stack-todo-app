import React from 'react';
import { BsArrowRepeat } from 'react-icons/bs';

const SearchValue = ({ searchValue, changeDisplay, setChangeDisplay }) => {
	const handleChangeClick = (e) => {
		e.preventDefault();
		setChangeDisplay(!changeDisplay);
	};
	return (
		<div className="bg-transparent d-lg-flex flex-lg-row justify-content-between align-items-center w-100 p-0">
			<button
				className="btn btn-dark w-20 h-50"
				onClick={handleChangeClick}>
				Change Todo Display <BsArrowRepeat />
			</button>
			<div className="card bg-dark d-flex flex-row w-50 mw-50 mm-50 h-100">
				<div className="card-body text-light d-flex flex-column align-items-center justify-content-center w-auto ">
					<small className="card-subtitle text-center bg-dark text-muted">
						Sorted by:
					</small>
					<p className="card-subtitle text-center mx-2 text-white">
						{searchValue.sortValue}
					</p>
				</div>
				<div className="card-body text-light d-flex flex-column align-items-center justify-content-center w-auto">
					<small className="card-subtitle text-center bg-dark text-muted">
						Filtered by:
					</small>
					<p className="card-subtitle text-center mx-2 text-white">
						{searchValue.filterValue}
					</p>
				</div>
			</div>
		</div>
	);
};

export default SearchValue;
