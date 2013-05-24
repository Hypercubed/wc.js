#!/usr/bin/env node

/**
 * Module dependencies.
 */
var debug = false;

var wc = require('./wc-lazy.js').wcStream;
var program = require('commander');

program
  .version('0.0.1')
  .option('-c, --bytes', 'print the byte counts')
  .option('-w, --words', 'print the newline counts')
  .option('-l, --lines', 'print the word counts')
  .parse(process.argv);

var path = require('path'), 
	fs = require('fs');

var files = program.args;
if (files.length == 0) files = [ '-' ];

var total = [0,0,0];

files.forEach(function(filename) {
	if (filename == "-") {
		debug && console.log('stdin');
		
		reader = process.stdin;
		process.stdin.setEncoding('utf8');

		/* process.stdin.on('data', function (chunk) {
			process.stdout.write('data: ' + chunk);
		});
		process.stdin.on('end', function () {
			process.stdout.write('end');
		});
		return; */
		
	} else {
		var filepath = path.join(__dirname, filename);
		var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
	}

	wc(reader, function(err, data) {
		total = data.map(function(d,i) {
			total[i] += d;
		});
		console.log(data.join(' ')+' '+filename);
	});
});

//if (files.length > 1) {
	//console.log(total.join(' ')+' total');
//
