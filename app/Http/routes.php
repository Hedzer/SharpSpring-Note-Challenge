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

$app->get('/', function () use ($app) {
    return $app->version();
});
$app->get('/install', function () use ($app) {
	//check if already installed
	return view('install');
});
$app->get('/app/{name}', function ($name) use ($app) {
	//check if user has access to the app
	if (view()->exists($name)){
		return view($name);
	}
});