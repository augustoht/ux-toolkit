requirejs.config({    
    baseUrl: 'js',    
});

require(['jquery/jquery'], function(){
  require( ['bootstrap'], function(){
    require( ['scripts'], function (){});
  });  
});

