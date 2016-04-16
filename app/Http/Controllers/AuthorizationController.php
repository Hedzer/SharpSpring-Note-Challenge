<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \Firebase\JWT\JWT;
class AuthorizationController extends Controller {
	public function __construct() {

	}
	public function getUserId(Request $request){
		try {
			$token = $request->input('token');
			if (!$token){
				return false;
			}
			$key = env('JWT_KEY');
			$ip = $request->ip();
			$userAgent = $request->header('User-Agent');
			$payload = JWT::decode($token, $key, array('HS256'));
			$id = $payload->userId;
			$payloadIP = $payload->ip;
			$payloadUserAgent = $payload->userAgent;
			$iat = $payload->iat;
			$nbf = $payload->nbf;
			$exp = $payload->exp;
			if ($payloadIP != $ip){
				return false;
			}
			if ($payloadUserAgent != $userAgent){
				return false;
			}
			$now = time();
			if ($now < $nbf) {
				return false;
			}
			if ($now > $exp){
				return false;
			}
			if ($iat < $nbf || $iat > $exp){
				return false;
			}
			return $id;			
		} catch (Exception $e) {
			return false;
		}
	}
	public function package($data){
		return [
			"auth" => false,
			"expired" => false,
			"denied" => false,
			"data" => $data
		];
	}
	public function denied($data = null){
		$package = $this->package($data);
		$package["denied"] = true;
		return $package;
	}
	public function expired($data = null){
		$package = $this->package($data);
		$package["expired"] = true;
		return $package;
	}
	public function approved($data){
		$package = $this->package($data);
		$package["auth"] = true;
		return $package;
	}
}