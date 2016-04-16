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
			return $authorization->denied(false);
		}
		//had some issues with generating foreign key relationships, just going to normalize on front end
		$data = [
			"types" => Types::get(['id', 'name']), //there are issues with this, and normalizing front end
			"notes" => Notes::where("ownerId", $id)
								->orderBy('created_at', 'desc')
								->get()
		];
		return $authorization->package($data);
	}
	public function create(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		if ($id == false){
			return $authorization->denied(false);
		}
		try {
			$plaintext = Types::where("name", "plaintext")->get(["id"])[0]["id"]; //this call sucks, but it is now needed thanks to FK issues + should be in the model
			$note = Notes::create([
				'title' => 'New Note',
				'body' => '',
				'ownerId' => $id,
				'typeId' => $plaintext
			]);			
		} catch (Exception $e) {
			return $authorization->error(false);
		}
		return $authorization->package($note);

		//Missing DB calls
	}
	public function update(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		if ($id == false){
			return $authorization->denied(false);
		}
		$note = false;
		try {
			$note = json_decode($request->input('data'));
		} catch (Exception $e) {
			return $authorization->error(false);
		}
		if ($note && isset($note->id)){
			$fields = [];
			if (isset($note->title)){
				$fields["title"] = $note->title;
			}
			if (isset($note->body)){
				$fields["body"] = $note->body;
			}
			Notes::where('ownerId', $id)
				->where('id', $note->id)
				->update($fields);
			return  $authorization->package(true);
		}
		//Missing DB calls
		return  $authorization->package(false);
	}
	public function delete(Request $request){
		$authorization = new Authorization;
		$id = $authorization->getUserId($request);
		if ($id == false){
			return $authorization->denied(false);
		}
		try {
			$noteId = json_decode($request->input('data'));
		} catch (Exception $e) {
			return $authorization->error(false);
		}
		try {
			if (!is_null($noteId)){
				Notes::destroy($noteId);
				return $authorization->package(true);
			}
		} catch (Exception $e) {
			return $authorization->error(false);
		}
		//Missing DB calls
	}
}