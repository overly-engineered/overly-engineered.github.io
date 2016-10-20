import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    console.log('beforeLoading');
  },

  model: function() {
    return this.store.query('posts', { orderBy: 'blogSequence'});
  },

  actions: {
    loading: function() {
      console.log('loading');
    }
  }
});
