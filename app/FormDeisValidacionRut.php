<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDeisValidacionRut extends Model {
   protected $primaryKey = 'id';
   protected $table = 'form_deis_validacion_rut';
   protected $fillable = [
      'id_form_deis',
      'run_madre_inicial',
      'run_madre_procesado',
      'digito_verificador',
      'estado_proceso_validacion',
      'created_at',
      'updated_at',
   ];
}
