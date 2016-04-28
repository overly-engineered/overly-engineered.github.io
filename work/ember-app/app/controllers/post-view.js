import Ember from 'ember';

var Promise = Ember.RSVP.Promise;

export default Ember.Controller.extend({
  actions: {
    postComment: function(post, comment) {
      comment.save().then(function(){
        Ember.RSVP.Promise.cast(post.get('comments')).then(function(comments) {
          comments.addObject(comment);
          post.save();
        });
      });
    }
  }
});
