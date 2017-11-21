var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');



elixir(mix => {
    mix.browserSync({
        proxy: 'local.deisformtool',
        open: false
    });
});


elixir(function (mix) {


    mix.browserify('app/api/controllers/FormularioController.js', 'public/js/app/api/controllers/FormularioController.js');
    //mix.browserify('app/api/controllers/InputController.js', 'public/js/app/api/controllers/InputController.js');
    mix.browserify('app/api/controllers/UsuarioCreateController.js', 'public/js/app/api/controllers/UsuarioCreateController.js');
    mix.browserify('app/api/controllers/AdminController.js', 'public/js/app/api/controllers/AdminController.js');
});
