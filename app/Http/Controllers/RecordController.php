<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Record::get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'image'=>'required|image',
        ]);
        try{
            $imageName = time().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('record/image', $request->image,$imageName);
            Record::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'phone'=>$request->phone,
                'image'=> $imageName,
            ]);

            return response()->json([
                'message'=>'Record Added Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a Record!!'
            ],500);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function show(Record $record)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function edit(Record $record)
    {
        
        return json_encode($record);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Record $record)
    {

        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'phone'=>'required',
        ]);
    
        try{
            $record->name=$request->name;
            $record->email=$request->email;  
            $record->phone=$request->phone;
            $record->save();

            if($request->hasFile('image')){
               
                // remove old image
                if($record->image){
                    $exists = Storage::disk('public')->exists("record/image/".$record->image);
                    if($exists){
                        Storage::disk('public')->delete("record/image/".$record->image);
                    }
                }

                $imageName = time().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('record/image', $request->image,$imageName);
                $record->image = $imageName;
                $record->save();
            }

            return response()->json([
                'message'=>'Record Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a record!!'
            ],500);
        }

       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Record  $record
     * @return \Illuminate\Http\Response
     */
    public function destroy(Record $record)
    {


        try{

            // remove old image
            if($record->image){
                $exists = Storage::disk('public')->exists("record/image/".$record->image);
                if($exists){
                    Storage::disk('public')->delete("record/image/".$record->image);
                }
            }
            $record->delete();
            return response()->json([
                'message'=>'Record Deleted Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a record!!'
            ],500);
        }



        
    }
}
