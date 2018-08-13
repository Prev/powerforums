/**
 * Check permission for canDeleteForum
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

const has = require('underscore').has;

module.exports = (req) => {
	switch(req.method) {
		case 'DELETE':
			return req.node.type === 'Forum';
	}
	return false;
}