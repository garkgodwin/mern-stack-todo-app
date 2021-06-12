import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import '../../src/static/page-404-styles/Page404.css';

const Page404 = ({ fromTodoSearch, setSearchValue }) => {
	let displayText = (
		<div className="msg text-light pt-5">
			Maybe this page moved? Got deleted? Is hiding out in quarantine?
			Never existed in the first place?
			<p>
				Let's go <a href="/">home</a> and try from there.
			</p>
		</div>
	);
	if (fromTodoSearch) {
		const handleOnClick = () => {
			setSearchValue({
				searchText: '',
				sortValue: 'Created',
				filterValue: 'All',
			});
		};
		displayText = (
			<div className="msg text-light pt-5">
				Are you lost? Or your todo thingy is? Is it deleted? Or hiding
				out in quarantine? Never existed in the first place?
				<p>
					Let's{' '}
					<a onClick={handleOnClick} className="btn btn-primary">
						refresh
					</a>{' '}
					the search values and try again.
				</p>
			</div>
		);
	}
	return (
		<div className="container-fluid vh-100 vw-auto pt-5 px-0 mx-0 d-flex justify-content-center align-items-center">
			<div className="container d-flex flex-column align-items-center justify-content-center">
				<div
					className="my-404 d-flex flex-row w-100 align-items-center justify-content-center"
					id="my-404">
					<div className="err">4</div>
					<i className="far fa-question-circle fa-spin"></i>
					<div className="err2">4</div>
				</div>
				{displayText}
			</div>
		</div>
	);
};

export default Page404;
