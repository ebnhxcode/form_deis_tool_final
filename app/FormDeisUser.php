<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDeisUser extends Model
{
#protected $dateFormat = 'Y-m-d H:i:s+';
   protected $primaryKey = 'id';
   protected $table = 'form_deis_users';
   protected $fillable = [
      'id_form_deis',
      'usuario_modifica_form_deis',
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
