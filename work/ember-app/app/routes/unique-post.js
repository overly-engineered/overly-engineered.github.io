import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'post-view',
  model: function(params) {
    return this.store.find('posts', params.blog_ID);
  }

});
