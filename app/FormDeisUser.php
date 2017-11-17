<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDeisUser extends Model
{
#protected $dateFormat = 'Y-m-d H:i:s+';
   protected $primaryKey = 'id';
   protected $table = 'form_deis_users';
   protected $fillable = [
      'usuario_modifica_form_deis',
      'created_at',
      'updated_at',
   ];
}
