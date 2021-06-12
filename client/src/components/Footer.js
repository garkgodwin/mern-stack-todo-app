import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

import {
	RiFacebookFill,
	RiLinkedinFill,
	RiGoogleFill,
	RiTwitterFill,
} from 'react-icons/ri';

const Footer = () => {
	return (
		<footer className="page-footer font-small special-color-dark pt-4 bg-light w-100 vh-10  opacity-3 opacity-3h5">
			<div className="container-fluid">
				<ul className="list-unstyled list-inline text-center text-dark">
					<li className="list-inline-item">
						<a className="btn-floating btn-fb mx-1">
							<RiFacebookFill />
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-tw mx-1">
							<RiTwitterFill />
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-gplus mx-1">
							<RiGoogleFill />
						</a>
					</li>
					<li className="list-inline-item">
						<a className="btn-floating btn-li mx-1">
							<RiLinkedinFill />
						</a>
					</li>
				</ul>
			</div>

			<div className="footer-copyright text-center py-3">
				© 2021 Copyright
				<a href="https://github.com/garkgodwin"></a>
			</div>
		</footer>
	);
};

export default withRouter(Footer);
