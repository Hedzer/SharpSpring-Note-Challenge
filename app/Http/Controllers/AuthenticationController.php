<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User as User;
use \Firebase\JWT\JWT;

class AuthenticationController extends Controller {
	public function __construct() {

	}
	private function checkCredentials($email, $password){
		$passed = false;
		$credentials = User::where('email', '=', $email)->get(['id', 'password', 'salt']);
		if (isset($credentials[0])){
			$credentials = $credentials[0];
			$salt = $credentials['salt'];
			$checksum = $credentials['password'];
			$passed = password_verify($password.$salt, $checksum);
			if ($passed){
				return $credentials['id'];
			}			
		}
		return false;
	}
	private function newToken($id, $ip, $userAgent){
		$key = env('JWT_KEY');
		$TTL = env('JWT_TTL', 3600);
		$now = time();
		$token = array(
		    "iss" => "localhost", 			//issuer
		    "aud" => "localhost", 			//audience
		    "iat" => $now, 					//issued at
		    "nbf" => $now-1, 				//not to be accepted before
		    "exp" => $now+intval($TTL), 	//expiration
		    "userId" => $id, 				//user id payload
		    "ip" => $ip, 					//IP Address
		    "userAgent" => $userAgent, 		//User Agent
		);
		$token = JWT::encode($token, $key);
		return $token;
	}
	public function login(Request $request){
		$loggedIn = false;
		$ip = $request->ip();
		$userAgent = $request->header('User-Agent');
		//Validate
		$this->validate($request, [
			'email' => 'required|email|max:255',
			'password' => 'required|max:255',
		]);
		$email = $request->input('email');
		$password = $request->input('password');
		$id = $this->checkCredentials($email, $password);
		if ($id){
			$token = $this->newToken($id, $ip, $userAgent);
			$package = [
				"auth" => true,
				"expired" => false,
				"denied" => false,
				"token" => $token
			];
			return $package;
		}
	}
	public function logout($token){

	}
}
