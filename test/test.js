#!/usr/bin/env node

var wc = require('../wc-lazy.js').wcStream;

var path = require('path'), 
	fs = require('fs'),
	//Lazy = require('lazy'),
	//Lazy2 = require('./lazy.js').Lazy,
	zlib = require('zlib'),
	sys = require('sys'),
	exec = require('child_process').exec
	;

var assert = require("assert");

bashPath = './test/';
dosPath = path.join(__dirname,'/');

describe('wc-lazy',function() {

	var files = [ 'lorem.txt' ];  // Todo: generate and test large file
	
	files.forEach(function(filename) {
		var gz = (filename.split('.').pop() == 'gz');
		
		describe(filename,function() {
				
			var shellCount;
			
			it('line count from shell', function(done) {
				this.timeout(0);
				
				var cmd  = (gz) 
					? "bash -c \"gunzip -c "+bashPath+filename+" | wc \""
					: "bash -c \"cat "+bashPath+filename+" | wc \""
					
				//console.log(cmd);
				
				var child = exec(cmd, function(error, stdout, stderr) {
					shellCount = stdout
						.trim()
						.split(/\s+/g)
						.map(function(d) {
							return +d;
						});
						
					console.log(shellCount);
					if (stderr)
						sys.print('stderr: ' + stderr);
					done();
				});
			});
			
			var reader;
			
			it('should create a stream without errors', function() {
				var filepath = path.join(dosPath, filename);
				//if (gz) {
				//	reader = fs.createReadStream(filepath).pipe(zlib.createGunzip(), {"encoding": 'utf-8', "flags": 'r', "fd": null});
				//} else {
					reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
				//}
			});
			
			var lazyCount, lazyGrep;
			
			it('node-lazy should run without errors', function(done) {
				this.timeout(0);
				
				lazyCount;
				
				wc(reader, function(err, count) {
					console.log(count);
					lazyCount = count;
					done();
				})

			});
			
			it('line counts should match', function() {
				assert.equal(shellCount[0], lazyCount[0]);
			});
			
			it('word counts should match', function() {
				assert.equal(shellCount[1], lazyCount[1]);
			});
			
			it('char counts should match', function() {
				assert.equal(shellCount[2], lazyCount[2]);
			});
			
			//it('grep line counts should match', function() {
			//	assert.equal(shellGrep, lazyGrep);
			//});
			
		});
	});
});