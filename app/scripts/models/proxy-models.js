var $ = require('jquery');
var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

var SearchRequest = ProxyModel.extend({
  sendSearch: function(callback){
    console.log('sending');
    this.fetch().done(function(){
      callback();
    });
  },
});


var Results = ProxyModel.extend({
  displayResults: function(){
    Backbone.history.navigate('results', {trigger: true});
  }
});

module.exports={
  ProxyModel : ProxyModel,
  ProxyCollection : ProxyCollection,
  SearchRequest: SearchRequest,
  Results:Results
};
