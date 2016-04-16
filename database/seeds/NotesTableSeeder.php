<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class NotesTableSeeder extends Seeder
{
    public function run() {
    	DB::table('notes')->delete();
        DB::table('notes')->insert([
            'title' => 'Test Note',
            'body' => 'This is a test note, created by the seeder.',
            'typeId' => App\Models\Type::where('name', '=', 'plaintext')->select('id')->first()->id,
            'ownerId' => App\User::where('email', '=', 'test@test.com')->select('id')->first()->id
        ]);
        DB::table('notes')->insert([
            'title' => 'A Second Test Note, With A Longer Title',
            'body' => 'There is no cow level. Black sheep wall. All the codes.',
            'typeId' => App\Models\Type::where('name', '=', 'plaintext')->select('id')->first()->id,
            'ownerId' => App\User::where('email', '=', 'test@test.com')->select('id')->first()->id
        ]);
    }
}
