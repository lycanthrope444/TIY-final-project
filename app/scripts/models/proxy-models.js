var Backbone = require('backbone');

var proxy = require('../proxy');

//These Models are for dealing with data retreived from the proxy server

var ProxyModel = Backbone.Model.extend({

});

var ProxyCollection = Backbone.Collection.extend({

});

module.exports={
  ProxyModel : ProxyModel,
  ProxyCollection : ProxyCollection
};
