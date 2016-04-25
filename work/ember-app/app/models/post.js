import Model from 'ember-data/model';

export default Model.extend({
  blogHeading: DS.attr('string'),
  blogDate: DS.attr('string'),
  blogExcerpt: DS.attr('string'),
  blogText: DS.attr('string'),
  blogImage: DS.attr('string')
});
