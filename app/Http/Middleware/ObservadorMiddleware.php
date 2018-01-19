<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class ObservadorMiddleware{
    private $auth;
    public function handle($request, Closure $next){
        $this->auth = Auth::user();
        switch ($this->auth->role->role) {
            case 'admin':
            case 'observador':
            case 'mantenedor':
                return $next($request);
                break;
        }
        return redirect()->to('/dashboard');
    }
}
