requirejs.config({    
    baseUrl: 'js',    
});

require(['jquery/jquery'], function(){
  require( ['bootstrap', 'scripts'], function( foo ) {});  
});

