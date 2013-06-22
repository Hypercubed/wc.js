// Input: A stream and a done call back
// Output: Nothing
(function() {
	var debug = false;

	function wcStream(reader, opts, done) {

	
		done = (arguments.length < 3) ? opts : done;
		opts = (arguments.length == 3) ? opts : { };
		
		if (!opts.words && !opts.lines && !opts.bytes && !opts.maxLineLength) {
			opts.words = opts.lines = opts.bytes = true;
			opts.maxLineLength = false;
		} else {
			opts.words = opts.words || false;
			opts.lines = opts.lines || false;
			opts.bytes = opts.bytes || false;
			opts.maxLineLength = opts.maxLineLength || false;
		}

		var l = 0, w= 0, c = 0, L = 0;  // lines, words, and chars count;
		var wl = 0, ll = 0;				// word and line length		
		var L = 0;						// longest line
		
		var LL = ''

		var _count = function(data) {
				debug &&
					console.log('reader data');
				
				if (!data) return;
				
				var n = data.length;
				if (opts.bytes) c += n;
				//if (opts.lines) l += (data.match(/\n/g) || '').length;
				//if (opts.words) w += (data.match(/[\n\s\t]+/g) || '').length;

				for(var i = 0; i < n ; i++) { 
					var ch = data[i];

					if (/[\n\s\t]/.test(ch)) {
						if (ch === '\n') {
							ll = 0;
							l++;
						} else {
							ll++;
						}
						wl = 0;
					} else {
						if (!wl) w++;
						wl++;
						ll++;
					}
					
					if (opts.maxLineLength) L = Math.max(ll, L);				
				}
				
			}
			
		var _end = function(_) {
				debug && console.log('reader end');
				
				var r = [];
				
				if (opts.lines) r.push(l);
				if (opts.words) r.push(w);
				if (opts.bytes) r.push(c);
				if (opts.maxLineLength) r.push(L);
				
				if (done) 
					done(null, r);
			}
		
		debug && console.log('reader start');
		
		reader
			.on('data', _count)
			.on('end', _end)
			;

		reader.resume();
		
	}

	// Export public API
	module.exports.wcStream = wcStream

}());