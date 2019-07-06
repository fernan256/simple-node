'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let mimes = {
	'.html': 'text/html',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.gif': 'image/gif',
	'.jpg': 'image/jpeg',
	'.png': 'image/png'
}

function webserver(req, res) {
	let baseURI = url.parse(req.url);
	let filepath = __dirname + (baseURI.pathname === '/' ? '/index.html' : baseURI.pathname);

	// Check if request file is accesible or not
	fs.access(filepath, fs.F_OK, error => {
		if(!error) {
			// Read and serve the file over response
			fs.readFile(filepath, (error, content) => {
				if(!error) {
					// Resolve the content type
					let contenType = mimes[path.extname(filepath)];
					//Serve the file from the buffer
					res.writeHead(200, {'Content-type': contenType});
					res.end(content, 'utf-8');
				} else {
					// Serve a 500
					res.writeHead(500);
					res.end('The server could not read the file requested');
				}
			})
		} else {
			// Serve a 404
			res.writeHead(404);
			res.end('Content not file');
		}
	});
}

http.createServer(webserver).listen(3000, () => {
	console.log('Server running on port 3000');
});