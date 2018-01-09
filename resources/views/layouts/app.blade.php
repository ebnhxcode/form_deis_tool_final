<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">

   <title>DEIS · Formulario</title>

   <!-- Fonts -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"
         integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">
   <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700">

   <!-- Styles -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css"
         integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
   {{-- <link href="{{ elixir('css/app.css') }}" rel="stylesheet"> --}}

      <!-- jQuery 2.2.1 -->
   {{--<script src="{{ asset('/plugins/jQuery/jQuery-2.1.4.min.js') }}"></script>--}}
   <script src="{{ asset('/js/jquery-3.2.1.min.js') }}"></script>

   <!-- jQuery UI 1.12.1 -->
   {{--
   <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
   <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
   --}}

      <!-- Select2 2.1.4 -->
   <script src="{{ asset('/js/select2.min.js') }}"></script>
   <link rel="stylesheet" type="text/css" href="{{ asset('/css/select2.min.css') }}">

   <!-- Select2 4.0.4 -->
   {{--
   <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/css/select2.min.css" rel="stylesheet" />
   <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/js/select2.min.js"></script>
   --}}

      <!-- Sweet Alert JS -->
   <script src="{{asset('/js/sweetalert.min.js')}}" type="text/javascript"></script>

   <!-- Sweet Alert CSS -->
   <link rel="stylesheet" href="{{asset('/css/sweetalert.min.css')}}">

   <!-- Admin LTE -->
   <link href="{{ asset('/css/AdminLTE.css') }}" rel="stylesheet" type="text/css"/>

   <style>
      body {
         font-family: 'Lato';
      }

      .fa-btn {
         margin-right: 6px;
      }

   </style>
</head>
<body id="app-layout">
<nav class="navbar navbar-default navbar-static-top">
   <div class="container">
      <div class="navbar-header">

         <!-- Collapsed Hamburger -->
         <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                 data-target="#app-navbar-collapse">
            <span class="sr-only">Toggle Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
         </button>

         <!-- Branding Image -->
         <a class="navbar-brand" href="{{ url('/') }}">
            {{--DEIS · Formulario--}}
            <img width="120" src="{{url('img/logo.png')}}" alt="" style="border-radius: 3px;box-shadow: 2px 1px 2px 1px #dbdbdb;">

         </a>
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">
         <!-- Left Side Of Navbar -->
         <ul class="nav navbar-nav">
            <!-- ELEMENTOS AL LADO DEL TITULO EN BARRA DE NAVEGACION -->
            {{--<li><a href="{{ url('/home') }}">Home</a></li>--}}
         </ul>

         <!-- Right Side Of Navbar -->
         <ul class="nav navbar-nav navbar-right">
            <!-- Authentication Links -->
            @if (Auth::guest())
               <li><a href="{{ url('/login') }}">Login</a></li>
               <li>
                  <a role="button" data-toggle="popover" data-trigger="hover" data-placement="bottom"
                     title="¡IMPORTANTE!" data-content="Desde esta opción DEBE ingresar su LLAVE SECRETA enviada por correo electrónico, solo así podrá crear la CLAVE de acceso al sistema, recuerde, la LLAVE no es la CLAVE."
                     tabindex="0" href="{{ url('/crea_clave') }}" style="font-size: 20px;">
                     Activar Llave
                     &nbsp;
                     <span class="label label-warning small pull-right">Nuevo</span>
                  </a>
               </li>
               {{--<li><a href="{{ url('/register') }}">Register</a></li>--}}
            @else
               <li>
                  <a role="button" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true"
                     title="Estimado usuario/a" data-content="Le informamos que hemos incluido nuevas funciones a la plataforma, lo cual  amablemente solicitamos que pueda actualizar la página presionando la siguiente combinación en su teclado: Tecla Control (Ctrl) + Tecla F5, una vez que lea este mensaje o si presenta problemas, de antemano muchas gracias.<br><img class='img-responsive' src='{{url('/img/ctrl+f5.png')}}'>"
                     tabindex="0" href="#!" style="font-size: 20px;">
                     <span class="label label-info small pull-right">
                        <i class="fa fa-exclamation-triangle"></i>
                        &nbsp;
                        Información Importante
                     </span>
                  </a>
               </li>
               <li><a href="{{ url('/dashboard') }}">Menu</a></li>
               <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                     {{ Auth::user()->name }} <span class="caret"></span>
                  </a>

                  <!--
                  <ul class="dropdown-menu" role="menu">
                     <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                  </ul>
                  -->
               </li>
               <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
            @endif
         </ul>
      </div>
   </div>
</nav>

@yield('content')
@yield('VueControllers')

<script>
   $(function () {
      $('[data-toggle="popover"]').popover();
   })
</script>

<!-- JavaScripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"
        integrity="sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js"
        integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS"
        crossorigin="anonymous"></script>

{{--
@if( Auth::check() && isset(Auth::user()->role) && in_array(Auth::user()->id_role, [3,4]) )
   <a href="javascript:var%20s%20=%20document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='{{url('/js/kickass.js')}}';void(0);">
      Destruir Página <small>(Solo visible admin)</small>
   </a>
@endif
--}}

{{-- <script src="{{ elixir('js/app.js') }}"></script> --}}








   <!-- Recaptcha V2 Google -->
<script src='https://www.google.com/recaptcha/api.js'></script>
<meta name="google-site-verification" content="4otf3wwxl-5T_OWjpgvsuzwLFqHarlrXlKwFIiF6Xd0" />
</body>
</html>