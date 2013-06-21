#!/usr/bin/env node

/**
 * Module dependencies.
 */
var debug = false;

var wc = require('./wc-lazy.js').wcStream;
var program = require('commander');

program
  .version('0.0.1')
  .option('-c, --bytes', 'print the byte counts', false)			// Todo: need to respect these
  .option('-w, --words', 'print the newline counts', false)
  .option('-l, --lines', 'print the word counts', false)
  .option('-L, --max-line-length', 'print the length of the longest line', false)		// Todo
  .parse(process.argv);
  
//console.log(program);
//process.exit();

var path = require('path'), 
	fs = require('fs');

var files = program.args;
if (files.length == 0) files = [ '-' ];

var total = [];
var i = files.length;

var getStream = function(filename) {
	if (filename == "-") {
		debug && console.log('stdin');
		
		var reader = process.stdin;
		process.stdin.setEncoding('utf8');

	} else {
		var filepath = path.join(__dirname, filename);
		var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
	}
	
	return reader;
}

var print = function(counts, filename) {
	var output = counts.join(' ')+' '+filename;
	console.log(output);
}

var countFile = function(filename) {
	debug && 
		console.log('countFile');
		
	
	
	var reader = getStream(filename);
	wc(reader, program, function(err, data) {
		data.forEach(function(d,i) {
			total[i] = (total[i] || 0) + d;
		});
		
		print(data, filename != '-' ? filename : '');
		
		if (!--i && files.length > 1)
			print(total, 'total');

	});

}

files.forEach(countFile);
