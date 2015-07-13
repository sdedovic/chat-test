/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send: function(req, res){
		var	message = req.param('message');
		var sender  = req.param('sender');

		sails.sockets.blast({msg: message, sdr: sender});
 	}
};

