/**
 * Created by Cam on 14-1-4.
 */
var chance = new (require('chance'))(),
	syBookshelf = require('./base'),
	GroupMembership, GroupMembershipSet;

GroupMembership = module.exports = syBookshelf.Model.extend({
	tableName: 'group_membership',
	fields: [
		'id', 'groupid', 'userid', 'isowner', 'isadmin', 'remark', 'restrict'
	],
	defaults: function () {
		return {
			isowner: 0,
			isadmin: 0
		};
	},
	omitInJSON: ['id', 'groupid'],
	user: function () {
		return this.belongsTo(require('./user'), 'userid');
	}
}, {

});

GroupMembershipSet = GroupMembership.Set = syBookshelf.Collection.extend({
	model: GroupMembership
});
