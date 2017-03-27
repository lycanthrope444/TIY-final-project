var $ = require('jquery');
var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

var SearchRequest = ProxyModel.extend({
  urlMod:'',
  urlRoot:function(){
    console.log(proxy.PROXY_API_URL + this.get('urlMod'));
    return proxy.PROXY_API_URL + this.get('urlMod');
  },
  sendSearch: function(callback){
    console.log('sending');
    this.fetch().done(function(){
      callback();
    });
  },
  modifyUrl:function(searchType, searchTerm, searchMod, offset){
    var currOffset=null;
    if(!offset){
      currOffset=0;
    } else {
      currOffset=offset;
    }
    console.log(this);
    this.set('urlMod', '');
    var search;
    var mod;
    if (!searchTerm){
      search = '';
      mod = '';
    } else {
      search=searchTerm;
      mod = searchMod;
    }
    console.log(searchType+'?'+mod+search+'&offset='+currOffset+'&');
    var url = searchType+'?'+mod+search+'&offset='+currOffset+'&';
    this.set('urlMod', url);
  },
  singleUrl:function(searchType, searchId, focus){
    var focusUrl ='';
    if(focus){
      focusUrl = '/'+focus;
    }
    this.set('urlMod', '');
    var url = searchType+'/'+searchId+focusUrl+'?';
    this.set('urlMod', url);
  }
});



module.exports={
  ProxyModel : ProxyModel,
  ProxyCollection : ProxyCollection,
  SearchRequest: SearchRequest
};
