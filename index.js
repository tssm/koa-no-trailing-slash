'use strict';

module.exports = function noTrailingSlash() {
	return function noTrailingSlash({ request, response }, next) {
		const { origin, path, querystring } = request;

		if (!querystring && path !== '/' && /\/$/.test(path)) {
			const location = origin + path;

			response.status = 301;
			response.redirect(location.replace(/\/$/, ''));
			return;
		}

		return next();
	};
};
