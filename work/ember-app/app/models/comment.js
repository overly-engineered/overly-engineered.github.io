import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr('string'),
  date: DS.attr('string'),
  name: DS.attr('string'),
  post_id: DS.attr('string')
});
