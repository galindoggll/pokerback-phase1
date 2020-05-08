<?php

namespace App\Http\Controllers\Api\Auth;

use App\Agent;
use App\Http\Controllers\Controller;
use App\Player;
use App\SuperAgent;
use App\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        ], [
            'password.confirmed' => 'The password does not match.'
        ]);

        try {
            event(new Registered($this->create($request->all())));

            $http = new Client;

            $response = $http->post(env('APP_URL') . '/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => env('PASSWORD_CLIENT_ID'),
                    'client_secret' => env('PASSWORD_CLIENT_SECRET'),
                    'username' => $request->get('email'),
                    'password' => $request->get('password'),
                    'remember' => false,
                    'scope' => '',
                ],
            ]);

            return json_decode((string)$response->getBody(), true);
        } catch (\Exception $e) {
            dd($e->getMessage(), $e->getCode(), $e->getTrace());
            return response()->json([
                "error" => "invalid_credentials",
                "message" => "The user credentials were incorrect."
            ], 401);
        }
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array $data
     * @return User
     */
    protected function create(array $data)
    {
        $user = User::create([
            'name' => $data['name'],
            'username' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'type' => $data['type'],
            'password' => bcrypt($data['password']),
        ]);

        if ($data['type'] == 0) {
            SuperAgent::create([
                'user_id' => $user->id,
            ]);
        }
        if ($data['type'] == 1) {
            Agent::create([
                'user_id' => $user->id,
            ]);
        }
        if ($data['type'] == 2) {

            $playerId = $this->generatePlayerId();
            Player::create([
                'user_id' => $user->id,
                'agent_id' => 0,
                'playing_id' => $playerId,
            ]);
        }

        return $user;
    }

    public function generatePlayerId() {
        $playerId = mt_rand(100000, 999999);

        // call the same function if the barcode exists already
        if ($this->playerIdExists($playerId)) {
            return $this->generatePlayerId();
        }

        // otherwise, it's valid and can be used
        return $playerId;
    }

    public function playerIdExists($playerId) {
        // query the database and return a boolean
        // for instance, it might look like this in Laravel
        return Player::wherePlayingId($playerId)->exists();
    }
}
