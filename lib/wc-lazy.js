// Input: A stream and a done call back
// Output: Nothing

module.exports.wcStream = function (reader, opts, done) {
  done = (arguments.length < 3) ? opts : done;
  opts = (arguments.length === 3) ? opts : { };

  if (!opts.words && !opts.lines && !opts.bytes && !opts.maxLineLength) {
    opts.words = opts.lines = opts.bytes = true;
    opts.maxLineLength = false;
  } else {
    opts.words = opts.words || false;
    opts.lines = opts.lines || false;
    opts.bytes = opts.bytes || false;
    opts.maxLineLength = opts.maxLineLength || false;
  }

  var l = 0;  // lines, words, and chars count;
  var w = 0;  // words, and chars count;
  var c = 0;  // and chars count;
  var wl = 0; // word
  var ll = 0; // word and line length
  var L = 0;  // longest line

  var _count = function (data) {
    if (!data) return;

    var n = data.length;
    c += n;

    for (var i = 0; i < n; i++) {
      var ch = data[i];

      switch (ch) {
        case '\n':
          ll = wl = 0;
          l += 1;
          break;
        case ' ':
        case '\t':
        case '\r':
        case '\v':
        case '\f':
          ll += 1;
          wl = 0;
          break;
        default:
          if (!wl) w += 1;
          wl += 1;
          ll += 1;
      }

      if (ll > L) L = ll;
    }
  };

  var _end = function (_) {
    var r = [];

    if (opts.lines) r.push(l);
    if (opts.words) r.push(w);
    if (opts.bytes) r.push(c);
    if (opts.maxLineLength) r.push(L);

    if (done) done(null, r);
  };

  reader
    .on('data', _count)
    .on('end', _end);

  reader.resume();
};
