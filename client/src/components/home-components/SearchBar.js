import React from 'react';

import { RiSearch2Line } from 'react-icons/ri';

import SortDropDown from './search-bar-components/SortDropDown';
import FilterDropDown from './search-bar-components/FilterDropDown';
import SearchValue from './search-bar-components/SearchValue';

const SearchBar = ({
	searchValue,
	setSearchValue,
	changeDisplay,
	setChangeDisplay,
}) => {
	//?HANDLE EVENTS
	const handleTextChange = (e) => {
		setSearchValue({
			...searchValue,
			searchText: e.target.value,
		});
	};

	return (
		<div className="container bg-transparent w-100 p-0">
			<div className="d-lg-flex flex-lg-column p-0">
				<div className="d-lg-flex flex-lg-column w-100 justify-content-center align-items-center">
					<div className="d-lg-flex flex-lg-row w-100 justify-content-center align-items-center">
						<div className="d-flex flex-row justify-content-start align-items-center w-25">
							<SortDropDown
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
							<FilterDropDown
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
						</div>

						<div className="d-lg-flex flex-row w-75 bg-white">
							<input
								type="text"
								className="form-control border"
								name="x"
								placeholder="Search term..."
								onChange={handleTextChange}
								value={searchValue.searchText}
							/>

							<span className="input-group-btn bg-light d-flex justify-content-center align-items-center">
								<button
									className="btn btn-default h-100"
									type="button">
									<RiSearch2Line className="text-dark" />
								</button>
							</span>
						</div>
					</div>
					<SearchValue
						searchValue={searchValue}
						changeDisplay={changeDisplay}
						setChangeDisplay={setChangeDisplay}
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
