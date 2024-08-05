<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\v1\Auth\LoginRequest;
use App\Http\Requests\API\v1\Auth\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
            $user = User::where('email', $request->email)->first();

            if( !$user || ! Hash::check($request->password, $user->password)){
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect']
                ]);
            }

            $token =  $user->createToken('user_token')->plainTextToken;

            return response()->json([
                'token' => $token
            ], 201);
        } catch(Exception $e){
            // return $e->getMessage();
            return response()->json([
                'errors' => $e->getMessage()
            ], 401);
        }
    }

    public function checkAuthStatus(){
        try{
            $auth = Auth::check() ? true : false;
            return response()->json([
                'authentication' => $auth
            ], 200);
        } catch(Exception $e){
            return response()->json([
                'message' => 'Result not found'
            ], 404);
        }
    }
}
