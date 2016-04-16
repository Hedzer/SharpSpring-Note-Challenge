<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrateNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('ownerId')->unsigned();
            $table->integer('typeId')->unsigned();
            $table->string('title', 255);
            $table->string('body');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            //causes errors during migration, not sure why. Docs have it writtne this way
            //$table->foreign('ownerId')->references('id')->on('users')->onDelete('cascade');
            //$table->foreign('typeId')->references('id')->on('types');
            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('notes');
    }
}
