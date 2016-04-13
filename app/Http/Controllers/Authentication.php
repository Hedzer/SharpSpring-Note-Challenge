<?php
namespace App\Http\Controllers;

use Illuminate\Http\Exception\HttpResponseException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response as IlluminateResponse;

class Authentication extends Controller {
	public function login(Request $request){
		try {
			$this->validate($request, ['email' => 'required|email|max:255', 'password' => 'required']);
		} catch(HttpResponseException $e) {
			return response()->json(
				[
					'auth' => false,
					'error' => 
						[
							'message' => 'Invalid Request',
							'status' => IlluminateResponse::HTTP_BAD_REQUEST
						]
				],
				IlluminateResponse::HTTP_BAD_REQUEST,
				$headers = []
			);
		}
		$credentials = $this->credentials($request);
		try {
			if (!$token = JWTAuth::attempt($credentials)) {
				return response()->json(
					[
						'auth' => false,
						'error' => 
							[
								'message' => 'Invalid Credentials'
							]
					],
					401
				);
			}
		} catch(JWTException $e) {
			return response()->json(
				[
					'auth' => false,
					'error' => 
						[
							'message' => 'Token Creation Failed'
						]
				],
				500
			);
		}
		return response()->json(compact('token'));
	}
	protected function credentials(Request $request){
		return $request->only('email', 'password');
	}
}
