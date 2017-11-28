<?php

namespace App\Http\Middleware;

use Closure;
use App\Auth;

class MantenedorMiddleware {
    private $auth;
    public function handle($request, Closure $next) {
        $this->auth = Auth::user();
        foreach ($this->auth->role as $key => $role) {



        }
        return $next($request);
    }
}
