'use strict';

const hostname = 'http://localhost';
const port = 8000;

const app = new (require('koa'));
const assert = require('assert');
const curl = require('curlrequest');
const randomString = require('randomstring');

app.use(require('./')());

app.use(async (ctx, next) => {
	ctx.response.body = 'Here is where the response body goes.\n\n';
});

app.listen(port);

const getStatusCode = (response) => {
	response = response.split('\n');
	return response[0].split(' ')[1];
};

const getLocation = (response) => {
	response = response.split('\n');
	return response[1].split(' ')[1].trim();
};

const displayTest = (response) => {
	console.log(`${options.url}\n${'-'.repeat(options.url.length)}`);
	console.log(response);
};

const options = {
	url: `${hostname}:${port}`,
	include: true,
	redirects: 0
};

curl.request(options, (error, response) => {
	displayTest(response);
	assert.equal(
		getStatusCode(response),
		200,
		'Request without trailing slash failed.'
	);

	options.url += '/';
	curl.request(options, (error, response) => {
		displayTest(response);
		assert.equal(
			getStatusCode(response),
			200,
			'Request with trailing slash failed'
		);
		console.log(response);

		const resource = randomString.generate();
		options.url += `${resource}`;
		curl.request(options, (error, response) => {
			displayTest(response);
			assert.equal(
				getStatusCode(response),
				200,
				'Request without trailing slash failed'
			);

			options.url += `/`;
			curl.request(options, (error, response) => {
				displayTest(response);
				assert.equal(
					getStatusCode(response),
					301,
					'Request with trailing slash is not redirected.'
				);

				const key = randomString.generate(10);
				const value = randomString.generate();
				options.url += `?${key}=${value}`;
				curl.request(options, (error, response) => {
					displayTest(response);
					assert.equal(
						getStatusCode(response),
						200,
						'Request with query string failed.'
					);

					options.url += `/`;
					curl.request(options, (error, response) => {
						displayTest(response);
						assert.equal(
							getStatusCode(response),
							200,
							'Request with query string failed.'
						);

						console.log('Everything went ok!');
						process.exit();
					});
				});
			});
		});
	});
});
