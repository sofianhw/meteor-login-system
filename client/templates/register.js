Template.register.events({
	"submit .form-signup": function(event){
		var first_name = trimInput(event.target.first_name.value);
		var last_name = trimInput(event.target.last_name.value);
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var password2 = trimInput(event.target.password2.value);
		if( isNotEmpty(email) &&
				isNotEmpty(password) &&
				isNotEmpty(first_name) &&
				isNotEmpty(last_name) &&
				isEmail(email) &&
				isValidPassword(password, password2)){
			Account.createUser({
				profile: {
					first_name: first_name,
					last_name: last_name
				},
				email: email,
				password: password
			}, function(err){
				if(err){
					FlashMessages.sendError('There was an error with registration');
				}else{
					FlashMessages.sendSuccess('Account Created! You are now logged in')
					Router.go('/dashboard');
				}
			});
		}	
		// Prevent Submiting
		return false;
	}
});

// Validation Rules

// Trim Helper
var trimInput = function(value){
	return value.replace(/^\s*|\s*$/g, "");
};

// Check For Empty Fields
isNotEmpty = function(value){
	if(value && value !== ''){
		return true;
	}
	FlashMessages.sendError('Please fill in all fields');
	return false;
};

// Validate Email
isEmail = function(value){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)){
		return true;
	}
	FlashMessages.sendError("Please use valid email address");
	return false;
};

// Check Password 
isValidPassword = function(password, confirm){
	if(password.length < 6){
		FlashMessages.sendError('Password must be at least 6 characters');
		return false;
	}
	if(password !== confirm){
		FlashMessages.sendError('Password do not match')
	}
	return true;
}

