'use strict';

const http = require('http');
const url = require('url');
const qs = require('querystring');

let routes = {
	'GET': {
		'/': (req, res) => {
			res.writeHead(200, 'Content-type': 'text/html');
			res.end('<h1>Hello</h1>');
		},
		'/about': (req, res) => {
			res.writeHead(200, 'Content-type': 'text/html');
			res.end('<h1>about</h1>');
		},
		'/api/getinfo': (req, res) => {
			// fetch data from db and respong a JSON
			res.writeHead(200, 'Content-type': 'application/json');
			res.end(JSON.stringify(req.queryParams));
		}
	},
	'POST': {
		'/api/login': (req, res) => {
			let body = '';
			req.on('data', data => {
				body += data;
				if(body.length > 2097152) {
					res.writeHead(413, {'Content-type': 'text/html'});
					res.end('<h3> Error: File to large </h3>',
						() => req.connection.destroy());

				}
			});

			req.on('end', () => {
				let params = qs.parse(body);
				// Query to db to see if the user exist
				// If so, send a JSON response to the SPA
				res.end();
			});
		}
	},
	'NA': (req, res) => {
		res.writeHead(404);
		res.end('Content not found');
	}
}

function router(req, res) {
	let baseURI = url.parse(req.url, true);
	let resolveRoute = routes[req.method][baseURI.pathname];
	if(resolveRoute != undefined) {
		req.queryParams = baseURI.query;
		resolveRoute(req, res);
	} else {
		routes['NA'](req, res);
	}
}

http.createServer(router).listen(3000, () => {
	console.log('Server listen on port 3000');
});