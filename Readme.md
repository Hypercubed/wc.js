## Description

Gets newline, word, and byte counts from a stream.  Designed to match output fron Unix/Linux wc.  Can be used as a library or from the command line.

## Installation

```
git clone https://github.com/Hypercubed/wc-lazy.git
cd wc-lazy
npm install
```

## Usage from the command line

Prints newline, word, and byte counts froma file, and a total line if more than one file is specified. With no FILE, or when FILE is -, read standard input.

`./wc.js [options] [filename]`

Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --bytes            print the byte counts
    -w, --words            print the newline counts
    -l, --lines            print the word counts
    -L, --max-line-length  print the length of the longest line

## Should work on linux (fails on cygwin due to piping issue)

```
cat filename | ./wc.js
gunzip -c filename | ./wc.js
```

## Usage through API

```
var reader = fs.createReadStream(filepath, {"encoding": 'utf-8', "flags": 'r', "fd": null});
wc(reader, options, callback);
```

## License

MIT
