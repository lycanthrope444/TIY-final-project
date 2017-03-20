var $ = require('jquery');
var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

var SearchRequest = ProxyModel.extend({
  // urlRoot:function(root){
  //   if (root){
  //     return root;
  //   }
  //   else {
  //     return proxy.PROXY_API_URL+'comics';
  //   }
  // },
  sendSearch: function(category, searchTerm){
    Backbone.history.navigate('results', {trigger:true});
    var searchString = proxy.PROXY_API_URL + category;
    console.log(searchString);

    //Clean out any previously saved searches in local storage
    var self = this;
    console.log(this);
    this.fetch().done(function(){
      console.log(self.get('data'));
    });

    //Keep track of what was searched in local storage, so that it can be referred to LayoutContainer

    //Send the info to the proxy server
  }
});

// var SearchRequestColl = ProxyCollection.extend({
//   model: SearchRequest,
//   // url: function (){
//   //   return proxy.PROXY_API_URL+'comics';
//   // }
// });

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
