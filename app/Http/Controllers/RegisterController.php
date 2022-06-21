<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class RegisterController extends Controller
{
   public function register(Request $request)
   {

      $validator=Validator::make($request->all(),[
        'name'=>'required',
        'email'=>'required|unique:users',
        'password'=>'required',  
      ]);
      
      if($validator->fails())
      {
          
        return response()->json(['validation_error'=>$validator->messages()]);
      }
      else
      {
        try{
               $user=User::create([
                  'name'=>$request->name,
                  'email'=>$request->email,
                  'password'=>Hash::make($request->password),
               ]);     
               $token = $user->createToken($user->email.'_Token')->plainTextToken;

               return response()->json([
                  'status'=>200,
                  'username'=>$user->email,
                  'token'=>$token,
                  'message'=>"Register Successfully"

               ]);
         }
         catch(\Exception $e){   //use Exception
            \Log::error($e->getMessage()); // use Log
            return response()->json([
               'message'=>'Something goes wrong while creating a Record!!'
            ],500);
          }
         
      } 
      
      
      




      
   }
}
