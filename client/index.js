//** DATABASE **//
var config = {
  apiKey: "AIzaSyCb8bO-RCQ8T6ecVXdg9hXpeqgbkNwxRm0",
  authDomain: "scrum-70ac3.firebaseapp.com",
  databaseURL: "https://scrum-70ac3.firebaseio.com",
  projectId: "scrum-70ac3",
  storageBucket: "scrum-70ac3.appspot.com",
  messagingSenderId: "414195879946"
};
firebase.initializeApp(config);

var database = firebase.database();

var event_bus = _.extend({}, Backbone.Events);

var Node = Backbone.Model.extend({
		defaults : {
      id : null,
      text : "",
      top : 0,
      left : 0
    }
});

var NodeList = Backbone.Firebase.Collection.extend({
  	url: '/nodes',
		model: Node
});

var NodeView = Backbone.View.extend({
    tagName : 'div',
    className : 'node',

    initialize : function () {
        this.render();
    },

    render : function () {
        var view = this.template( this.model.toJSON() );
        this.$el.html(view);
    },
    template : function (data) {
        var src = $('#node-tpl').html(),
        nodeTpl = Handlebars.compile(src);
        return nodeTpl(data);
    }
});

var HomeView = Backbone.View.extend({
    el : '#container',

    initialize : function (options) {
        this.collection = new NodeList();
        this.collection.fetch();
        this.render();
    },
    render : function () {
        _.each(this.collection.models, function (node, i) {
        		console.log(node);
            var nodeView = new NodeView({ model : node });
            $(this.el).append(NodeView.el);
        });
    }
});

new HomeView();
