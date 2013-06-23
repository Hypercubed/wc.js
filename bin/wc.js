#!/usr/bin/env node

/**
 * Module dependencies.
 */
var debug = false;

// NPM Modules
var program = require('commander');
var fs = require('fs');
var path = require('path');
var util = require('util');

// Lib
var wc = require('../').wcStream;

//
var cwd = process.cwd()

program
  .version('0.0.2')
  .usage('[options] [files]')
  .option('-c, --bytes', 'print the byte counts', false)
  .option('-w, --words', 'print the newline counts', false)
  .option('-l, --lines', 'print the word counts', false)
  .option('-L, --max-line-length', 'print the length of the longest line', false)		// Todo
  .parse(process.argv);
  
program.name = 'wc.js';

var files = program.args;
if (!files.length) files.push('');

var results = [];

var getStream = function(filename) {
	if (filename == "-" || filename == "") {
		debug && console.log('stdin');

		var reader = process.stdin
		
		//reader.pause();
		
		process.stdin.setEncoding('utf8');

	} else {
		var filepath = path.join(cwd, filename);
		var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
	}

	return reader;
}

var print = function(counts, filename) {

	var output = counts
		.map(function(d) {
			return pad(7, String(d));
		})
		.join('\t');
	
	console.log(output+' '+filename);
}

var showTotal = function() {
	var total = [];
	
	results.forEach(function(data) {
		data.forEach(function(d,i) {
			total[i] = (total[i] || 0) + d;
		});
	});
	
	print(total, 'total');
}

var countFile = function(filename) {
	debug && 
		console.log('countFile');

	wc(getStream(filename), program, function(err, data) {
		results.push(data);
		print(data, filename);
		if (results.length == files.length && files.length > 1)
			showTotal();
			
		if (results.length == files.length)
			process.exit;	
		
	});

}

files.forEach(countFile);
