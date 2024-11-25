<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table) {
            // Drop old foreign keys and columns if needed
            $table->dropForeign(['user_id']);
            $table->dropForeign(['gym_id']);
            $table->dropColumn(['user_id', 'gym_id']);
            
            // Add the new columns
            $table->unsignedBigInteger('gym_id')->after('id');
            $table->unsignedBigInteger('created_by')->after('gym_id');
            $table->string('name')->after('created_by');
            $table->string('email')->unique()->after('name');
            $table->string('phone')->nullable()->after('email');

            // Add new foreign keys
            $table->foreign('gym_id')->references('id')->on('gyms')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
        
            $table->dropForeign(['gym_id']);
            $table->dropForeign(['created_by']);
            $table->dropColumn(['gym_id', 'created_by', 'name', 'email', 'phone']);
            
            
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('gym_id')->constrained()->onDelete('cascade');
        });
    }
};
