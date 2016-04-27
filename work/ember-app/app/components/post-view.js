import Ember from 'ember';

export default Ember.Component.extend({
  commentName: '',
  commentMessage: '',
  commentIsValid: function() {
    var isValid = true;
    ['commentName', 'commentMessage'].forEach(function(field) {
      if (this.get(field) === '') {
        isValid = false;
      }
    }, this);
    return isValid;
  },
  actions: {
    postComment: function() {
      if(!this.commentIsValid()){
        this.set('postError', true);
        return;
      }
      this.set('postError', false);
      var store = this.get('unique-post.store');
      var postID = this.get('unique-post.id');
      var comment = store.createRecord('comment', {
        message: this.get('commentMessage'),
        name: this.get('commentName'),
        date: new Date(),
        post_id: postID
      });
      this.sendAction('onPostComment', this.get('unique-post'), comment);

      this.setProperties({
        commentName: '',
        commentMessage: ''
      });
    }
  },
});
