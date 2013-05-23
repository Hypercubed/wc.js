// Input: A stream and a done call back
// Output: Nothing
(function() {
	var debug = false;

	Lazy = require('lazy');

	function wcStream(reader, cb) {
		var lineCount = 0, wordCount = 0, letterCount = 0;
		
		var lazy = new Lazy(reader);
		
		debug && console.log('lazy start');
		
		lazy
			.forEach(function(data) {
				debug && console.log('lazy data');
				if (!data) return;
				letterCount += data.length;	// Unix word count counts individula bytes
				var m = data.match(/\n/g);  // Unix word count counts '\n'
				if (m)
					lineCount += m.length;
			})
		;
		
		lazy
			.lines
				.forEach(function(line) {
					line = String(line).trim();
					debug && console.log('lazy.line forEach: ', line);
					
					if (line.length > 0)
						//wordCount += (m = line.match(/\s+/g)) ? m.length : 0;
						wordCount += line.split(/\s+/).length;
				})
				;
		
		reader.on('end', function(_) {
				debug && console.log('reader end');
				if (cb) 
					cb([lineCount, wordCount, letterCount]);
			})
			.resume();
		
	}

	// Export public API
	module.exports.wcStream = wcStream

}());