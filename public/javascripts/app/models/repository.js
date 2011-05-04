sc_require('helpers/urls')

Travis.Repository = SC.Record.extend(Travis.Helpers.Urls, {
  primaryKey:         'id',

  slug:                SC.Record.attr(String),
  lastBuildNumber:     SC.Record.attr(Number, { key: 'last_build_number' }),
  lastBuildStatus:     SC.Record.attr(String, { key: 'last_build_status' }),
  lastBuildStartedAt:  SC.Record.attr(String, { key: 'last_build_started_at' }),  // Date
  lastBuildFinishedAt: SC.Record.attr(String, { key: 'last_build_finished_at' }), // Date

  lastBuildDuration: function() {
    return Utils.duration(this.get('lastBuildStartedAt'), this.get('lastBuildFinishedAt'));
  }.property('lastBuildStartedAt', 'lastBuildFinishedAt').cacheable(),
});

Travis.Repository.mixin({
  latest: function() {
    return Travis.store.find(SC.Query.local(Travis.Repository));
  },
  bySlug: function(slug) {
    return Travis.store.find(SC.Query.local(Travis.Repository, { conditions: 'slug = "{slug}"', parameters: { slug: slug } }));
  },
})

