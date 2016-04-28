import Ember from 'ember';

export default Ember.Helper.helper(function(params) {
  let content = params[0];
  var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var timeOptions = { hour: "numeric", minute: "numeric" };
  if (content) {
    var date = new Date(content).toLocaleDateString('en-GB', dateOptions);
    var time = new Date(content).toLocaleTimeString('en-GB', timeOptions);
    var dateString = time + ' ' + date;
    return dateString;
  }
});
