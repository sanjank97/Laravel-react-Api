<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function userlogin(Request $request)
    {

        $request->validate([
           
            'email'=>'required',
            'password'=>'required',
            
        ]);
      try{

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                 'status'=>'failed',
                ]);
            }
            else
            {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'username'=>$user->email,
                    'token'=>$token,
                    'message'=>" Logged in Successfully"
  
                 ]);
            }
            

       
      }catch(\Exception $e){
        \Log::error($e->getMessage());
        return response()->json([
            'message'=>'Something goes wrong while creating a Record!!'
        ],500);
    } 
     
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Logout Successfully',
        ]);
         
    } 

}
