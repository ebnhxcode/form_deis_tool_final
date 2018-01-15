<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

#Route::get('/', function () {return view('welcome');});
/*
Route::get('/demoemail', function () {
   $returnData['llave'] = 'abcdefgh' ;
   $returnData['nombre'] = 'Usuario Prueba';
   $returnData['email'] = 'email@dominio.cl';
   $returnData['rut'] = '123456789';
   return view ('email.envio_clave_electronica', $returnData) ;
});
*/
/*
Route::get('/demo', function () {
   #return view('demo.demo');
   return redirect()->to('/login');
});
*/

Route::get('/admin/procesar_rut_resagados', 'AdminController@procesar_rut_resagados');
Route::get('/admin/procesar_rut', 'AdminController@procesar_rut');

Route::post('/formulario/prueba_session', 'UserController@prueba_session');

Route::get('/registro', 'UserController@registro');
Route::get('/solicitud_clave', 'UserController@registro');
Route::get('/clave_electronica', 'UserController@registro');
Route::get('/crea_clave', 'UserController@registro');

#Route::get('/enviar_llaves_secretas', 'UserController@enviar_llaves_secretas');
Route::get('/procesar_llaves_secretas', 'UserController@procesar_llaves_secretas');


Route::post('/procesar_solicitud_clave', 'UserController@procesar_solicitud_clave');
Route::post('/crear_clave', 'UserController@crear_clave');
#Route::get('/register', function () { return redirect()->to('/login'); });


Route::auth();

/*
Route::get('/testapi', function () {

   #https://api.minsal.cl
   $url = 'http://api.minsal.cl/oauth/token';
   $data = array('grant_type' => 'client_credentials');

   #$client_id = "<<Client ID entregado>>";
   #$client_secret = "<<Secret entregado>>";
   #$str_base64 = base64_encode($client_id.':'.$client_secret);
   $str_base64 = 'OVRTZzMwMDBVaVBvVkE4NVZqQ3N0MjFuam5EUFExNFM6UkpZRm1ITzB4SUNKNVQ2Zg==';

   $options = array(
      'http' => array(
         'header'  => "Content-type: application/x-www-form-urlencoded\r\n".
         "Authorization: Basic ".$str_base64,
         'method'  => 'POST',
         'content' => http_build_query($data)
      ),
      #'SSL' => array(
         #'verify_peer' => false,
         #'verify_peer_name' => false,
         #'allow_self_signed' => true,
         #'cafile' => 'C:/wamp/certificates/cacert.pem'
      #)
   );

   $context  = stream_context_create($options);
   $result = file_get_contents($url, false, $context);
   if ($result === FALSE) {
      # error
   }
   $authObj = json_decode($result);
   $accessToken = $authObj->accessToken;
   // echo "TOKEN ".$accessToken;
   return $accessToken;
});
*/

#Route::get('/formulario/testapi', 'FormDeisController@testapi');
#Route::get('/formulario/traspasar_dv_tabla_errores', 'FormDeisController@traspasar_dv_tabla_errores');
#Route::get('/formulario/api_registro_civil', 'FormDeisController@api_registro_civil');

Route::post ('/formulario/buscar_por_run' , 'FormDeisController@buscar_por_run') ;
Route::post ('/formulario/buscar_por_pasaporte' , 'FormDeisController@buscar_por_pasaporte') ;
Route::post ('/formulario/buscar_run_existente' , 'FormDeisController@buscar_run_existente') ;
Route::post ('/formulario/buscar_por_correlativo' , 'FormDeisController@buscar_por_correlativo') ;
Route::post ('/formulario/confirmar_confidencialidad_mujer_vih' , 'FormDeisController@confirmar_confidencialidad_mujer_vih') ;
Route::post ('/formulario/confirmar_confidencialidad_usuario' , 'FormDeisController@confirmar_confidencialidad_usuario') ;
Route::post ('/formulario/confirmar_mensaje_informativo' , 'FormDeisController@confirmar_mensaje_informativo') ;

#Ruta para tomar el registro
Route::post ('/formulario/marcar_registro_form_deis' , 'FormDeisController@marcar_registro_form_deis');
Route::post ('/formulario/desmarcar_registro_form_deis' , 'FormDeisController@desmarcar_registro_form_deis');
Route::post ('/formulario/mis_formularios' , 'FormDeisController@mis_formularios');
#Route::get ('/formulario/mis_formularios' , 'FormDeisController@mis_formularios');

Route::post ('/formulario/marcar_error_revisado' , 'FormDeisController@marcar_error_revisado');


Route::get ('/formulario/datos_formulario' , 'FormDeisController@datos_formulario') ;
Route::get ('/formulario/inputs_formulario' , 'FormDeisController@inputs_formulario') ;


Route::get ('/formulario/transmision_vertical' , 'FormDeisController@create') ;
Route::get ('/formulario/create' , 'FormDeisController@create') ;
Route::get ('/formulario/new' , 'FormDeisController@create') ;
Route::get ('/formulario/' , 'FormDeisController@create') ;
Route::get ('/plataforma/' , 'FormDeisController@create') ;
Route::get ('/plataforma' , 'FormDeisController@create') ;
Route::get ('/deis' , 'FormDeisController@create') ;
Route::get ('/home' , 'FormDeisController@create') ;
Route::get('/', function () {
   if (Auth::check()) {
      return view ('usuarios.dashboard');
   }else{
      return redirect()->to('/login');
   }

});

Route::get('/dashboard', function () {
   if (Auth::check()) {
      return view ('usuarios.dashboard');
   }else{
      return redirect()->to('/login');
   }
});

Route::resource ('/formulario' , 'FormDeisController') ;

Route::post ('/input/add/label' , 'InputController@addLabelToInput') ;
Route::resource ('/input' , 'InputController') ;

Route::get ('/home', 'HomeController@index') ;

Route::get('/admin/mant_usuarios', 'AdminController@mant_usuarios');
Route::get('/admin/mant_usuarios_data', 'AdminController@mant_usuarios_data');
Route::post('/admin/guardar_usuario', 'AdminController@guardar_usuario');
Route::post('/admin/guardar_nuevo_usuario', 'AdminController@guardar_nuevo_usuario');

Route::post('/admin/correo_resagado', 'AdminController@correo_resagado');
Route::post('/admin/buscar_rut', 'AdminController@buscar_rut');