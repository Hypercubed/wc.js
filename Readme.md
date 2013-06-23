## Description

Gets newline, word, and byte counts from a stream.  Designed to match output fron Unix/Linux wc.  Can be used as a library or from the command line.

## Installation from git

```
git clone https://github.com/Hypercubed/wc-lazy.git
cd wc-lazy
npm install
```

## Installation from NPM for command line

```
npm install -g wc.js
```

## Usage from the command line

Prints newline, word, and byte counts froma file, and a total line if more than one file is specified. With no FILE, or when FILE is -, read standard input.

`./bin/wc.js [options] [filename]`

Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --bytes            print the byte counts
    -w, --words            print the newline counts
    -l, --lines            print the word counts
    -L, --max-line-length  print the length of the longest line

## Should work on linux (fails on cygwin due to piping issue)

```
cat filename | ./bin/wc.js
gunzip -c filename | ./bin/wc.js
```

## Installation from NPM as a library

```
npm install wc.js
```

## Usage through API

```
var wc = require('wc.js').wcStream;
var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
wc(reader, options, callback);
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

MIT
