// Input: A stream and a done call back
// Output: Nothing
(function() {
	var debug = false;

	//Lazy = require('lazy');

	function wcStream(reader, cb) {
		var l = 0, w= 0, c = 0;
		
		debug && console.log('reader start');
		reader
			.on('data', function(data) {
				debug && console.log('npmreader data', data.length);
				if (!data) return;
				c += data.length;
				l += (data.match(/\n+/g) || '').length;
				w += (data.match(/[\s\n]+/g) || '').length;
			})
			.on('end', function(_) {
				debug && console.log('reader end');
				if (cb) 
					cb(null, [l, w, c]);
			})
			.resume();
		
	}

	// Export public API
	module.exports.wcStream = wcStream

}());