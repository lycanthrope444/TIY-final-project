var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

var SearchRequest = ProxyModel.extend({
  urlRoot:function(){
    return proxy.PROXY_API_URL;
  },
  sendSearch: function(category, searchTerm){
    console.log(category, searchTerm);
    //Clean out any previously saved searches in local storage

    //Keep track of what was searched in local storage, so that it can be referred to LayoutContainer

    //Send the info to the proxy server
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
