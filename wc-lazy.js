// Input: A stream and a done call back
// Output: Nothing
(function() {
	var debug = false;

	Lazy = require('lazy');

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

		var l = 0, w= 0, c = 0, L = 0;
		var wb = true;
		
		var _count = function(data) {
				debug &&
					console.log('reader data');
				
				if (!data) return;
				
				var i = data.length;
				
				if (opts.bytes) c += i;
				if (opts.maxLineLength) L = Math.max(i, L);
				if (opts.lines) l += (data.match(/[\n]+/g) || '').length;
				if (opts.words) w += (data.match(/[\s\n]+/g) || '').length;
				
				/* while (i--) {
					var ch = data[i];
					if (ch === '\n') l++;
					
					if (/[\s\n]/.test(ch)) {
						wb = true;
					} else {
						if (wb) w++;
						wb = false;
					}
				} */
				
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
			//.on('data', _count)
			.on('end', _end)
			;
			
		new Lazy(reader)
			.filter(function(data) { return !!data; })
			.forEach(function(data) { if (opts.bytes) c += data.length; })
			//.map(function(chunk) {  // Bug in lazy: http://stackoverflow.com/questions/16755192/node-js-lazy-how-to-prevent-an-empty-line-being-read-as-0
				// replace Unix-style (LF) line ending with DOS-style (CRLF)
			//	return chunk.replace(/(?!\r)\n/g, '\r\n');
			//})
			.lines
				.forEach(function(line) { if (opts.lines) l++; })
				.filter(function(line) { return !(line == "0"); })  // bug
				.map(String)
				//.forEach(function(line) { console.log(line) })
				.forEach(function(line) { if (opts.words) w += (line.match(/[^\s\n]+/g) || '').length; })
				.forEach(function(line) { if (opts.maxLineLength) L = Math.max(L,line.length); })
				;
			
		reader.resume();
		
	}

	// Export public API
	module.exports.wcStream = wcStream

}());