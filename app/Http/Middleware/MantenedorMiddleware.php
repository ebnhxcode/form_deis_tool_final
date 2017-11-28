<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class MantenedorMiddleware {
    private $auth;
    public function handle($request, Closure $next) {
        $this->auth = Auth::user();
        switch ($this->auth->role->role) {
            case 'admin':
            case 'mantenedor':
                return $next($request);
                break;
        }
        return redirect()->to('/formulario/transmision_vertical');
    }
}
