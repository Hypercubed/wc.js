## Installation

```
git clone https://github.com/Hypercubed/wc-lazy.git
cd wc-lazy
npm install
```

## Usage from the command line

`./wc.js filename`

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
