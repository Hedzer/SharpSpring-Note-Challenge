<?php
$app->group(['prefix' => 'api', 'middleware' => 'jwt.auth'], function($app) {
	$app->post('/{name}', 'App\Http\Controllers\APIController@post');
	$app->get('/{name}', 'App\Http\Controllers\APIController@get');
});