requirejs.config({    
    baseUrl: 'js',    
});

require(['jquery'], function(){
  require( ['bootstrap', 'scripts'], function( foo ) {});  
});

