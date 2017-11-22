Estimado/a:
Junto con saludar se informa que se ha establecido una nueva forma de creacion de claves (password) para el ingreso del Sistema de Transmision Vertical VIH y SIFILIS.

<br><br>
Para crear su clave debera hacer click en el enlace de a continacion, donde se le dirigirá a una nueva pantalla para que usted pueda crear su password e ingresar inmediatamente al sistema.

<br><br>

Haga click aquí para crear su password:
<a href="{{ $link = url('password/reset', $token).'?email='.urlencode($user->getEmailForPasswordReset()) }}"> {{ $link }} </a>
