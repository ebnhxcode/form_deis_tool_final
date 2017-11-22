Estimado/a:
Junto con saludar se informa que se ha establecido una nueva forma de creaci&oacute;n de claves (password) para el ingreso del Sistema de Transmisi&oacute;n Vertical VIH y SIFILIS.

<br><br>
Para crear su clave deber&aacute; hacer clic en el enlace de a continuaci&oacute;n, donde se le redireccionar&aacute; a una nueva pantalla para que usted pueda crear su password e ingresar inmediatamente al sistema.

<br><br>

Haga click aqu&iacute; para crear su password:
<a href="{{ $link = url('password/reset', $token).'?email='.urlencode($user->getEmailForPasswordReset()) }}"> {{ $link }} </a>