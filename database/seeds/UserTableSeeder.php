<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserTableSeeder extends Seeder
{
    public function run() {
        DB::table('users')->delete();
    	$salt = str_random(64);
    	$password = password_hash('$sh4rpspr1nG$'.$salt, PASSWORD_DEFAULT, ['cost' => 12]);
        DB::table('users')->insert([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => $password,
            'salt' => $salt
        ]);
    }
}
