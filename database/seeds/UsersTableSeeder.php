<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::create([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('secret'),
            'type' => 0,
            'remember_token' => Str::random(10),
        ]);

        \App\SuperAgent::create([
            'user_id' => $user->id,
        ]);
    }
}
