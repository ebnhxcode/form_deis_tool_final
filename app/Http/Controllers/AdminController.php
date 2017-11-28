<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Requests;

class AdminController extends Controller {


    public function __construct() {
        $this->middleware('auth');
    }

    public function buscar_rut (Request $request) {
        if ($request->wantsJson()) {
            $rut = isset($request->rut)?$request->rut:null;
            if ($rut) {
                $user = User::where('rut', 'ilike', $rut.'%')->first();
                if ($user) {#if (count($user)>0 && $user) {
                    return response()->json(['rd' => 'Existe']);
                }
            }
            return response()->json(['error'=>['rd' => 'No existe']]);
        }
    }

    public function mant_usuarios (Request $request) {


        return view ('admin.mant_usuarios');
    }

    public function mant_usuarios_data (Request $request) {
        if ($request->wantsJson()) {

            if (!$request->per_page) {
                $this->per_page = 10;
            } else {
                $this->per_page = $request->per_page;
            }

            #$returnData['users'] = User::with('role')->get();
            $returnData['users'] = User::with('role')->paginate((int)$this->per_page);

            return response()->json($returnData);
        }
    }

    public function correo_resagado (Request $request) {
        if ($request->wantsJson()) {
            $user_id = $request->id;
            $user = User::find($user_id);
            $user->correo_resagado = 'enviado';
            $user->save();
            return response()->json(['rd'=>'Usuario Actualizado']);
        }
    }

    public function guardar_nuevo_usuario (Request $request) {

        $user = $request->all();
        if ($user['password']){
            $user['password'] = bcrypt($user['password']);
        }
        $user['rut'] = strtolower($user['rut']);
        $user = User::create($user);
        return response()->json(['rc' => '0', 'rd' => 'Success.', 'user' => $user]);

    }

    public function guardar_usuario (Request $request) {

        $user_parameters = $request->all();
        $user = User::find($user_parameters['id']);
        $user->update($user_parameters);
        return response()->json(['rc' => '0', 'rd' => 'Success.']);

    }



    public function index()
    {
        //
    }

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
