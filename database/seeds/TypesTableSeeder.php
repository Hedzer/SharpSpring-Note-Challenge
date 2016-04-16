<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class TypesTableSeeder extends Seeder
{
    public function run() {
    	DB::table('types')->delete();
        DB::table('types')->insert([
            'name' => 'plaintext',
        ]);
    }
}
