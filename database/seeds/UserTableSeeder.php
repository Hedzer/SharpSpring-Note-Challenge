<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserTableSeeder extends Seeder
{
    public function run() {
        DB::table('users')->insert([
            'name' => str_random(10),
            'email' => str_random(10).'@gmail.com',
            'password' => Hash::make('secret'),
        ]);
    }
}
