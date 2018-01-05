<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDeisError extends Model
{
   protected $primaryKey = 'id';
   protected $table = 'form_deis_errores';
   protected $fillable = [
      'id_form_deis',
      'run_madre',
      'usuario_modifica_form_deis',
      'establecimiento',
      'glosa_error',
      'estado',
      'created_at',
      'updated_at',
   ];

   public function user () {
      return $this->belongsTo('App\User','usuario_modifica_form_deis');
   }

   public function form_deis () {
      return $this->belongsTo('App\FormDeis','id_form_deis');
   }
}
