#!/usr/bin/env node

/**
 * Module dependencies.
 */
var debug = false;

// NPM Modules
var program = require('commander');
var fs = require('fs');
var path = require('path');

// Lib
var wc = require('../').wcStream;

var cwd = process.cwd();

program._name = 'wc.js';

program
  .version('0.1.1')
  .usage('[options] [files]')
  .option('-c, --bytes', 'print the byte counts', false)
  .option('-w, --words', 'print the newline counts', false)
  .option('-l, --lines', 'print the word counts', false)
  .option('-L, --max-line-length', 'print the length of the longest line', false)    // Todo
  .parse(process.argv);

var files = program.args;

var results = [];
if (!files.length) files.push('');

files.forEach(countFile);

function getStream (filename) {
  if (filename === '-' || filename === '') {
    debug && console.log('stdin');

    var reader = process.stdin;

    // reader.pause();

    process.stdin.setEncoding('utf8');
  } else {
    var filepath = path.join(cwd, filename);
    reader = fs.createReadStream(filepath, {'encoding': 'utf-8', 'flags': 'r', 'fd': null});
  }

  return reader;
}

function print (counts, filename) {
  var output = counts
    .map(function (d) {
      return pad(7, String(d));
    })
    .join('\t');

  console.log(output + ' ' + filename);
}

function showTotal () {
  var total = [];

  results.forEach(function (data) {
    data.forEach(function (d, i) {
      total[i] = (total[i] || 0) + d;
    });
  });

  print(total, 'total');
}

function countFile (filename) {
  debug && console.log('countFile');

  wc(getStream(filename), program, function (err, data) {
    if (err) { throw err; }
    results.push(data);
    print(data, filename);
    if (results.length === files.length && files.length > 1) {
      showTotal();
    }

    if (results.length === files.length) {
      process.exit;
    }
  });
}

function pad (string, size, char) {
  var pad = '';
  var _size;

  if (char == null) {
    char = ' ';
  }
  if (typeof string === 'number') {
    _size = size;
    size = string;
    string = _size;
  }
  string = string.toString();
  pad = '';
  size = size - string.length;
  for (var _i = 0; size >= 0 ? size > _i : size < _i; size >= 0 ? ++_i : --_i) {
    pad += char;
  }
  if (_size) {
    return pad + string;
  } else {
    return string + pad;
  }
}
