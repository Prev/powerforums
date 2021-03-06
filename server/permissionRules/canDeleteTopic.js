/**
 * Check permission for canDeleteTopic
 * @param req: include method(GET, POST, PUT, PATCH or DELETE) and node
 * @returns {boolean} True if allowed, false otherwise
 */

module.exports = (req) => {
	switch(req.method) {
		case 'DELETE':
			return req.node.type === 'Topic';
	}
	return false;
}