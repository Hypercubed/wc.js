/* global describe, it */

var wc = require('../').wcStream;

var path = require('path');
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

var assert = require('assert');

var bashPath = './test/';
var dosPath = path.join(__dirname, '/');

describe('wc-lazy', function () {
  var files = [ 'lorem.txt', 'big.txt', 'strange.txt' ];  // Todo: generate and test large file

  files.forEach(function (filename) {
    var gz = (filename.split('.').pop() === 'gz');

    describe(filename, function () {
      var shellCount;

      it('line count from shell', function (done) {
        this.timeout(0);

        var cmd = (gz)
          ? 'bash -c "gunzip -c ' + bashPath + filename + ' | wc "'
          : 'bash -c "cat ' + bashPath + filename + ' | wc "';

        // console.log(cmd);

        exec(cmd, function (error, stdout, stderr) {
          if (error) { throw error; }

          shellCount = stdout
            .trim()
            .split(/\s+/g)
            .map(function (d) {
              return +d;
            });

          if (stderr) {
            sys.print('stderr: ' + stderr);
          }

          done();
        });
      });

      var reader;

      it('should create a stream without errors', function () {
        var filepath = path.join(dosPath, filename);
        reader = fs.createReadStream(filepath, {'encoding': 'utf-8', 'flags': 'r', 'fd': null});
      });

      var lazyCount;

      it('wc should run without errors', function (done) {
        this.timeout(0);

        lazyCount;

        wc(reader, function (err, count) {
          if (err) { throw err; }
          lazyCount = count;
          done();
        });
      });

      it('line counts should match', function () {
        assert.equal(shellCount[0], lazyCount[0]);
      });

      it('word counts should match', function () {
        assert.equal(shellCount[1], lazyCount[1]);
      });

      it('char counts should match', function () {
        assert.equal(shellCount[2], lazyCount[2]);
      });
    });
  });
});
