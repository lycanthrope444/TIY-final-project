var $ = require('jquery');
var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

var SearchRequest = ProxyModel.extend({
  // searchTerm: '',
  // searchType:'',
  // currOffset:0,
  changeSearch: function(){

  },
  sendSearch: function(callback){
    console.log('sending');
    this.fetch().done(function(){
      callback();
    });
  },
  // urlRoot: function(){
  //   var search;
  //   if (!this.searchTerm){
  //     search = '';
  //   } else {
  //     search=searchTerm;
  //   }
  //   console.log(proxy.PROXY_API_URL+this.searchType+'?'+search+'&offset='+this.currOffset+'&');
  //   return proxy.PROXY_API_URL+this.searchType+'?'+search+'&offset='+this.currOffset+'&';
  // }
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
