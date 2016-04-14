<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

$app->get('/', function () use ($app) {
    return $app->version();
});
$app->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function () use ($app) {
	$app->get('/', function ()    {

	});
});
//Authenticated routes
$app->group(['prefix' => 'app'], function () use ($app) {
	$app->get('/{name}', function ($name) use ($app) {
		//check if user has access to the app
		if (view()->exists($name)){
			return view($name);
		}
	});
});
$app->post('auth/login', 'AuthenticationController@login');
