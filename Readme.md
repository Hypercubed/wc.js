## Description

Gets newline, word, and byte counts from a stream.  Designed to match output from Unix/Linux wc.  Can be used as a library or from the command line.

## Installation from git

```
git clone https://github.com/Hypercubed/wc.js.git
cd wc.js
npm install
npm link
```

## Installation from NPM for command line

```
npm install -g wc.js
```

## Usage from the command line

Prints newline, word, and byte counts from a file, and a total line if more than one file is specified. With no filename, or when filename is -, read standard input.

`wc.js [options] [filename]`

Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --bytes            print the byte counts
    -w, --words            print the newline counts
    -l, --lines            print the word counts
    -L, --max-line-length  print the length of the longest line

## Should work on Linux (fails on Cygwin due to piping issue)

```
cat filename | wc.js
gunzip -c filename | wc.js
```

## Installation from NPM as a library

```
npm install wc.js
```

## Usage through API

```
var wc = require('wc.js');
var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
wc.wcStream(reader, callback);
```

An optional options object is also accepted.

```
var options = { lines: true, maxLineLength: true }
wc(reader, options, callback);
```

Options:

```
{
	lines: true/false;
	bytes: true/false;
	words: true/false;
	maxLineLength: true/false;
}
```

## Running tests

```
npm test
```

or one of these:

```
mocha -R list -g lorem
mocha -R list -g big
mocha -R list -g strange
```

## License

(The MIT License)

Copyright (c) 2013 J Harshbarger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
