<?php

namespace App\Http\Middleware;
use \Firebase\JWT\JWT;
use Closure;
class Authorize {
    public function handle($request, Closure $next) {
        if (!$request->input('token')){
            return [

            ];
        }
        return false;
        return $next($request);
    }
}
