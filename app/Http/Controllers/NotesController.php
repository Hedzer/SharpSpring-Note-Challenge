<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\AuthorizationController as Authorization;
use App\Models\Note as Notes;
use App\Models\Type as Types;

class NotesController extends Controller {
	public function __construct() {

	}
	public function all(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		if ($id == false){
			return $authorization->denied();
		}
		//had some issues with generating foreign key relationships, just going to normalize on front end
		$data = [
			"types" => Types::get(['id', 'name']), //there are issues with this, and normalizing front end
			"notes" => Notes::where("ownerId", "=", $id)
								->orderBy('created_at', 'desc')
								->get()
		];
		return $authorization->package($data);
	}
	public function create(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		$package = $authorization->package();
		if ($id == false){
			return $authorization->denied();
		}
		//Missing DB calls
	}
	public function update(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		$package = $authorization->package();
		if ($id == false){
			return $authorization->denied();
		}
		//Missing DB calls
	}
	public function delete(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		$package = $authorization->package();
		if ($id == false){
			return $authorization->denied();
		}
		//Missing DB calls
	}
}