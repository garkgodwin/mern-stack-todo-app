import React, { useState } from 'react';
import { css } from '@emotion/react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const AlternativeDisplay = ({}) => {
	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
		z-index: 1000;
		height: 50%;
		width: 50%;
		margin-top: 20%;
		margin-bottom: 100%;
	`;

	return (
		<div className="d-flex w-100 h-100 flex-column">
			<div className="d-flex align-items-center w-100 h-50">
				<ClimbingBoxLoader
					color={'#ffffff'}
					loading={true}
					css={override}
					size={50}
					speedMultiplier={1}
				/>
			</div>
		</div>
	);
};

export default AlternativeDisplay;
