<?php

namespace App\Http\Controllers;

use App\FormDeis;
use Illuminate\Http\Request;
use App\User;
use App\Http\Requests;

class AdminController extends Controller {


    public function __construct() {
        $this->middleware('auth');
        $this->middleware('mantenedor');
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
                $this->per_page = 500;
            } else {
                $this->per_page = $request->per_page;
            }

            #$returnData['users'] = User::with('role')->get();
            $returnData['users'] = User::with('role')->paginate((int)$this->per_page);
            $returnData['users_full'] = User::with('role')->get();

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

    public function procesar_rut () {
        /* Configuracion inicial:
         * Sin limite de procesamiento de memoria
         * */
        ini_set('memory_limit', '-1');
        /* Seleccion de datos a procesar:
         * Todos los datos a los que el digito verificador sea nulo
         * */
        #$forms = FormDeis::whereRaw('digito_verificador is null')->get();
        $forms = FormDeis::select('id','digito_verificador', 'run_madre')
           ->whereRaw('digito_verificador is null and run_madre is not null')->orderBy('id', 'desc')->get();
        /* Condicion:
         * Si no hay nada, lo saca
         * */
        #dd(count($forms));
        if (count($forms)==0) { return "Finalizado, nada que procesar"; }

        foreach ($forms as $key => $form) {

            $rut = $form->run_madre;
            if ($this->valida_rut($rut) == true && !in_array($form->run_madre, ["","0",null,0])
               && in_array($form->digito_verificador, ["",null])) {
                $form->digito_verificador = substr($rut,-1);
                $form->run_madre = substr($form->run_madre,0,-1);
                $form->save();
            }
            else{
                if (in_array(strlen($form->run_madre), [7,8])) {
                    $dv = $this->obtener_digito($rut);
                    if ($this->valida_rut($rut.$dv) == true) {
                        $form->digito_verificador = $dv;
                        $form->save();
                    }
                }else {
                    #Rut no pasa validación
                    $form->digito_verificador = 'E';
                    $form->save();
                }
            }
        }

        return "Finalizado.";

    }

    public function procesar_rut_resagados () {

        ini_set('memory_limit', '-1');
        $forms = FormDeis::select('id', 'digito_verificador', 'run_madre')
           ->whereRaw('LENGTH(run_madre) > ?', [8])->orderBy('id', 'desc')->get();

        #dd(count($forms));

        if (count($forms)==0) { return "Finalizado, nada que procesar"; }

        $casos_rut_correcto=0;
        $casos_rut_nomatch=0;
        $casos_rut_invalido=0;

        $arr_casos_rut_correcto=[];
        $arr_casos_rut_nomatch=[];
        $arr_casos_rut_invalido=[];

        foreach ($forms as $key => $form) {

            $dv = '';
            $rut = $form->run_madre;

            if ($this->valida_rut($rut) == true && !in_array($rut, ["","0",null,0])) {
                $dv = substr($rut,-1);
                if ($form->digito_verificador == $dv) {
                    #$form->run_madre = substr($rut,0,-1);
                    #$form->save();
                    ++$casos_rut_correcto;
                    array_push($arr_casos_rut_correcto, [
                        'id'=>$form->id,
                        'run_madre'=>$form->run_madre,
                        'digito_verificador'=>$form->digito_verificador,
                    ]);
                }else{

                    ++$casos_rut_nomatch;
                    array_push($arr_casos_rut_nomatch, [
                       'id'=>$form->id,
                       'run_madre'=>$form->run_madre,
                       'digito_verificador'=>$form->digito_verificador,
                    ]);
                }

            }
            else{
                ++$casos_rut_invalido;
                array_push($arr_casos_rut_invalido, [
                   'id'=>$form->id,
                   'run_madre'=>$form->run_madre,
                   'digito_verificador'=>$form->digito_verificador,
                ]);
                /*
                if (in_array(strlen($form->run_madre), [7,8])) {
                    $dv = $this->obtener_digito($rut);
                    if ($this->valida_rut($rut.$dv) == true) {
                        $form->digito_verificador = $dv;
                        $form->save();
                    }
                }else {
                    #Rut no pasa validación
                    $form->digito_verificador = 'E';
                    $form->save();
                }
                */
            }
        }

        dd([
            'casos_rut_correcto'=>[
                'cantidad'=>$casos_rut_correcto,
                'detalle'=>$arr_casos_rut_correcto,
            ],
            'casos_rut_nomatch'=>[
               'cantidad'=>$casos_rut_nomatch,
               'detalle'=>$arr_casos_rut_nomatch,
            ],
            'casos_rut_invalido'=>[
               'cantidad'=>$casos_rut_invalido,
               'detalle'=>$arr_casos_rut_invalido,
            ],
        ]);

        return "Finalizado.";

    }

    public function obtener_digito ($rut) {
        $x=2;
        $sumatorio=0;
        for ($i=strlen($rut)-1;$i>=0;$i--){
            if ($x>7){$x=2;}
            $sumatorio=$sumatorio+($rut[$i]*$x);
            $x++;
        }
        $digito=bcmod($sumatorio,11);
        $digito=11-$digito;
        switch ($digito) {
            case 10:
                $digito="k";;
            break;
            case 11:
                $digito="0";;
            break;
        }
        return $digito;
    }

    public function valida_rut ($rut) {
        $rut = preg_replace('/[^k0-9]/i', '', $rut);
        $dv  = substr($rut, -1);
        $numero = substr($rut, 0, strlen($rut)-1);
        $i = 2;
        $suma = 0;
        foreach(array_reverse(str_split($numero)) as $v) {
            if($i==8) { $i = 2; }
            $suma += $v * $i;
            ++$i;
        }
        $dvr = 11 - ($suma % 11);
        if($dvr == 11) { $dvr = 0; }
        if($dvr == 10) { $dvr = 'K'; }
        if($dvr == strtoupper($dv)) { return true; }
        else { return false; }
    }


    /*
    public function procesar_rut () {
        ini_set('memory_limit', '-1');
        #$forms = FormDeis::where('run_madre', '<>','null')
        #->whereRaw('LENGTH(run_madre) > ?', [8])
        #->limit(10000)
        #->orderBy('run_madre', 'asc')
        #dd($forms);
        $forms = FormDeis::whereRaw('digito_verificador is null')->limit(1000)->get();
        foreach ($forms as $key => $form) {
            #if ($this->valida_rut($form->run_madre) != false && $form->run_madre != "0" && 9 == strlen($form->run_madre) ) {
            if ($this->valida_rut($form->run_madre) == true &&
               $form->run_madre != "0" &&
               $form->run_madre != null &&
               7 < strlen($form->run_madre) ) {
                $rut = $form->run_madre;
                dd( $this->valida_rut($form->run_madre) );
                    #dd($this->obtener_digito($form->run_madre));
                    #dd($form->run_madre);
                    #dd( substr($form->run_madre,-1) );
                    #dd( substr($form->run_madre,0,-1) );
                    #dd( $this->obtener_digito(substr($rut,0,-1)) );
                dd( $this->obtener_digito($form->run_madre) );
                dd($form->run_madre);
            }
        }
        dd(1);
    }
    */


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
