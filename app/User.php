<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'last_name',
        'full_name',
        'position',
        'establecimiento',
        'rut',
        'email',
        'password',
        'created_at',
        'updated_at',
        'confirmado_llave_secreta',
        'clave_electronica',
        'telefono',
        'id_role',
        'acepta_terminos',
        'mensajes_informativos',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        #'password', 'remember_token',
    ];

    public function role () {
        return $this->belongsTo('App\Role', 'id_role');
    }

    public function form_deis () {
        return $this->hasMany('App\FormDeisUser', 'id');
    }

    public function form_deis_errores () {
        return $this->hasMany('App\FormDeisError', 'usuario_modifica_form_deis'); //el id con el que hace la referencia
    }

}