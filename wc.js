#!/usr/bin/env node

/**
 * Module dependencies.
 */
 
var wc = require('./wc-lazy.js');
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

var total = [0,0,0];

files.forEach(function(filename) {
	var filepath = path.join(__dirname, filename);

	var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});

	wc.wcStream(reader, function(count) {
		total = count.map(function(d,i) {
			total[i] += d;
		});
		console.log(count.join(' ')+' '+filename);
	});
});

//if (files.length > 1) {
	//console.log(total.join(' ')+' total');
//}
