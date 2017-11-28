<?php

namespace App\Http\Middleware;

use Closure;
use App\Auth;

class AdminMiddleware
{
    private $auth;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->auth = Auth::user();
        foreach ($this->auth->role as $key => $role) {



        }
        return $next($request);
    }
}
