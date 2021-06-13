import React from 'react';
import '../../src/static/css/Loading.css';

const Loading = () => {
	/*
	
		<div className="d-flex align-items-center sticky-top loader-container fixed-top position-absolute">
		</div>
		*/
	return (
		<div className="loader-container position-absolute">
			<span className="loader "></span>
		</div>
	);
};

export default Loading;
