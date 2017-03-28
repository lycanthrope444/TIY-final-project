var mocha = require('mocha');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var $ = require('jquery');

var ComicCollection = require('./models/comics.js').ComicCollection;

/*******************
Parse Model Tests
********************/

// var assert = require('assert');
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal(-1, [1,2,3].indexOf(4));
//     });
//   });
// });

describe('ComicCollection', function(){

  describe('fetch', function(){
    it('should return a promise', function(){
      var promise = Post.fetch();
      expect(promise).to.respondTo('then');
    });

    it('should resolve with an array of comics', function(done){
      Post.fetch().then(function(data){
        var post = data[0];

        expect(post).to.have.property('title');
        expect(post).to.have.property('id');
        expect(post).to.have.property('objectId');

        done();
      });
    });
  });

});
