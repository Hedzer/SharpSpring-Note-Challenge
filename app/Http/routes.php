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
	return redirect('/app/sharpnotes');
});

//login route
$app->post('auth/login', 'AuthenticationController@login');

//Authorized routes - needs to be moved into a separate file
$app->group(['prefix' => 'api/notes'], function () use ($app) {
	$app->post('/list', 'App\Http\Controllers\NotesController@all');
	$app->post('/create', 'App\Http\Controllers\NotesController@create');
	$app->post('/update', 'App\Http\Controllers\NotesController@update');
	$app->post('/delete', 'App\Http\Controllers\NotesController@delete');
});
//App Routes
$app->group(['prefix' => 'app'], function () use ($app) {
	$app->get('/{name}', function ($name) use ($app) {
		//check if user has access to the app
		if (view()->exists($name)){
			return view($name);
		}
	});
});
