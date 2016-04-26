import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  blogHeading: DS.attr('string'),
  blogDate: DS.attr('string'),
  blogExcerpt: DS.attr('string'),
  blogText: DS.attr('string'),
  blogImage: DS.attr('string'),
  blogSequence: DS.attr('number'),
  comments: DS.hasMany('comment', {async: true})
});
