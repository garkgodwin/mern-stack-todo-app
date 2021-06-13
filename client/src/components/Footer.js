import React from 'react';
import { withRouter } from 'react-router';

import {
	RiFacebookFill,
	RiLinkedinFill,
	RiGoogleFill,
	RiGithubFill,
} from 'react-icons/ri';

const Footer = () => {
	return (
		<footer className="page-footer font-small special-color-dark pt-4 bg-light w-100 vh-10  opacity-3 opacity-3h5">
			<div className="container-fluid">
				<ul className="list-unstyled list-inline text-center text-dark ">
					<li className="list-inline-item">
						<a
							className="btn-floating btn-fb mx-1"
							href="https://www.facebook.com/grakgdowin/">
							<RiFacebookFill />
						</a>
					</li>
					<li className="list-inline-item">
						<a
							className="btn-floating btn-tw mx-1"
							href="https://github.com/garkgodwin">
							<RiGithubFill />
						</a>
					</li>
					<li className="list-inline-item">
						<a
							className="btn-floating btn-gplus mx-1"
							href="https://google.com">
							<RiGoogleFill />
						</a>
					</li>
					<li className="list-inline-item">
						<a
							className="btn-floating btn-li mx-1"
							href="https://www.linkedin.com/in/die-326b551bb/">
							<RiLinkedinFill />
						</a>
					</li>
				</ul>
			</div>

			<div className="footer-copyright text-center py-3 d-flex flex-column-reverse">
				© 2021 Copyright
			</div>
		</footer>
	);
};

export default withRouter(Footer);
