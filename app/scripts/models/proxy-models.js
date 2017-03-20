var $ = require('jquery');
var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

var SearchRequest = ProxyModel.extend({
  urlRoot:function(){
    return proxy.PROXY_API_URL+'comics';
  },
  sendSearch: function(category, searchTerm){
    var searchString = proxy.PROXY_API_URL + 'comics';
    console.log(searchString);
    //Clean out any previously saved searches in local storage
    console.log(this);
    this.fetch().done(function(){
      console.log(this);
    });

    //Keep track of what was searched in local storage, so that it can be referred to LayoutContainer

    //Send the info to the proxy server
  }
});

var SearchRequestColl = ProxyCollection.extend({
  model: SearchRequest,
  url: function (){
    return proxy.PROXY_API_URL+'comics';
  }
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
