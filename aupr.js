/*!
 * AUPR -> auth-user-password-rights
 * https://github.com/petoem/aupr
 */

var basicAuth = require('basic-auth');

var aupr = function aupr(){
    var _self = this;
    var _authdata;

    _self.parseAuthData = function(authdata){
    	var tmp;
    	switch (Object.prototype.toString.call(authdata)){
    		case "[object Array]":
    			if (authdata == 0) {
    				return new Error("# aupr.js parseAuthData: authdata [object Array] empty");
    			}else{
    				_self._authdata = authdata;
    			};
    			break;
    		case "[object String]":
    			tmp = new Array();
    			var users = authdata.split(',');
    			users.forEach(function (user){
    				var usertmp = user.split(':');
    				var rightstmp = (typeof usertmp[2] === 'undefined') ? "r" : usertmp[2];
    				var readtmp = (rightstmp.indexOf('r') == -1) ? false : true ;
    				var writetmp = (rightstmp.indexOf('w') == -1) ? false : true ;
    				tmp.push({name: usertmp[0], pass: usertmp[1], permission: {data: rightstmp, read: readtmp, write: writetmp }});
    			});
    			//console.log(tmp);
    			_self._authdata = tmp;
    			break;
    		default:
    			return new Error("# aupr.js parseAuthData: unkown type of data");
    	}
    };

    _self.auth = function(req, res, next){
    	var user = basicAuth(req);
    	if (!user || !user.name || !user.pass) {
    		res.set('WWW-Authenticate', 'Basic realm=Authorization Required!');
    		res.status(401);
    		//console.log("# auth: No data");
    		next();
    	}else{
	    	_self._authdata.forEach(function (oneuser){
	    		if(oneuser.name == user.name && user.pass == oneuser.pass)
	    		{
	    			req.authenticatedUser = oneuser;
	    		}
	    	});
	    	if (req.hasOwnProperty('authenticatedUser')) {
	    			//console.log("# auth: success");
	    			next();
	    	}else{
			    //console.log("# auth: fail" + JSON.stringify(user));
		    	res.set('WWW-Authenticate', 'Basic realm=Authorization Required!');
		    	res.status(401);
		    	next();
	    	}
		}
    };
};

module.exports = new aupr();