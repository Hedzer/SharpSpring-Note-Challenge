<?php
use App\Models;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
require 'UserTableSeeder.php';
require 'NotesTableSeeder.php';
require 'TypesTableSeeder.php';
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Model::unguard();
        $this->call(UserTableSeeder::class);
        $this->call(TypesTableSeeder::class);
        $this->call(NotesTableSeeder::class);
        Model::reguard();
    }
}
