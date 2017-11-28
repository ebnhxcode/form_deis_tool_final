<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class AdminMiddleware {
    private $auth;
    public function handle($request, Closure $next) {
        $this->auth = Auth::user();
        switch ($this->auth->role->role) {
            case 'admin':
                return $next($request);
                break;
        }
        return redirect()->to('/');
    }
}
