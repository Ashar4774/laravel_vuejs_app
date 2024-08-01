<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\v1\Auth\LoginRequest;
use App\Http\Requests\API\v1\Auth\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(RegisterRequest $request){
        try{
            User::create($request->all());

            return response()->json([
                'message' => 'User created successfully'
            ], 201);
        } catch(Exception $e){
            return response()->json([
                'errors' => 'User is unable to create, please try again'
            ], 401);
        }

    }

    public function login(LoginRequest $request){
        try {
            $user = User::where('email', $request->email);
        } catch(Exception $e){

        }
    }
}
