//when we start up, create a user and login
var user = Alloy.createModel('user');

user.login("tigram_admin", "tigram_admin",
function(_respone){
	if (_response.success){
		$.index.open();
	} else {
		alert ("Error Starting Application " + _response.error);
		Ti.API.error('error logging in ' + _response.error);
	}
})
