Router.configure({
	layoutTemplate: 'form_layout'
});

Router.map(function(){
	// Login home
	this.router('login', {
		path: '/',
		template: 'login'
	});
});