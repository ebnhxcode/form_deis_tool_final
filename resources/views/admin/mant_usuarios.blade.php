@extends('layouts.app')
@include('layouts.styles')

@section('content')
   <div class="{{--container--}}" id="AdminUsuarios">
      <div class="row">
         <div class="col-md-10 col-md-offset-1">
            <div class="{{--panel panel-default--}}">
               <div class="panel-heading"></div><!-- .panel-heading -->

               <div class="{{--panel-body--}}">
                  <div class="row">
                     <div class="col-md-12">

                        {{ csrf_field() }} {{-- <keep-alive> </keep-alive>--}}
                        <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

                        <div class="well well-sm">


                           <h3 class="text-center">
                              Mantenedor de Usuarios
                              <img class="pull-right" width="90" src="{{url('img/logo.png')}}" alt="" style="border-radius: 3px;box-shadow: 2px 1px 2px 1px #dbdbdb;">
                           </h3> <!-- .text-center --> <br>

                           {{-- @click.prevent="crear_nuevo_usuario" --}}
                           <button class="btn btn-sm btn-success small"
                                   style="box-shadow: 2px 1px 2px 1px #dbdbdb;margin-left: 10px;" @click.prevent="mostrar_modal_nuevo_usuario = true">
                              Crear nuevo Usuario&nbsp;
                              <i class="fa fa-plus"></i>
                           </button><!-- .btn .btn-success -->

                           <!-- Componente para crear compromiso en modal -->
                           <modal-nuevousuario v-show="mostrar_modal_nuevo_usuario == true" @close="mostrar_modal_nuevo_usuario = false">
                              <h3 slot="header">
                                 Crear nuevo usuario
                                 <button class="btn btn-sm btn-default pull-right"
                                 @click="mostrar_modal_nuevo_usuario = false">
                                 Cerrar
                                 </button>
                                 <span class="pull-right">&nbsp;&nbsp;</span>
                              </h3>
                           </modal-nuevousuario>

                        </div><!-- .well .well-sm -->


                        <!-- Filtro por termino, otros filtros y funcionalidades-->
                        <div class="col-md-6">
                           <!-- Text animacion al termino de busqueda -->
                           <transition name="fade" mode="out-in">
                              <h5 style="position: relative;" v-if="filterTerm">Filtrando por el criterio '<b>@{{ filterTerm }}</b>'</h5>
                              <h5 style="position: relative;" v-else>Filtrar por criterio...</h5>
                           </transition>

                           <!-- Input filterTerm -->
                           <div class="form-group">
                              <div class="input-group input-group-md">
                                 <div class="input-group-addon">
                                    <i class="fa fa-font"></i>
                                 </div>
                                 <!-- Input para escribir el termino a buscar -->
                                 <input type="text" class="form-control" placeholder="Ingresar criterio de busqueda" v-model="filterTerm" id="filterTerm">
                                 <!-- Boton para limpiar contenido del filtro por criterio -->
                              <span class="input-group-btn">
                                 <button @click.prevent="filterTerm=''" type="button" class="btn btn-default">
                                    Limpiar
                                 </button>
                                 <button @click.prevent="filterTerm=''&&fetchAdminUsuarios" type="button" class="btn btn-default">
                                    Recargar Grilla
                                 </button>
                              </span><!-- .input-group-btn -->
                              </div><!-- /.input-group -->
                           </div><!-- /.form-group -->

                           <mini-spinner v-if="mini_spinner_table_inputs == true"></mini-spinner>
                           <div class="btn-group" data-toggle="buttons" v-for="v,f,i in user_table_fields" v-else>

                              <label :class="v==true?'btn btn-primary active':'btn btn-primary'" @click.prevent="changeVisibility(f)">
                                 <input type="checkbox" autocomplete="off"> @{{ user_table_labels[f] }}
                              </label>

                           </div>


                        </div><!-- .col-* -->


                        <!-- Estadísticas -->
                        <div class="col-md-6">



                        </div><!-- .col-* -->


                        <div class="col-md-12" v-if="spinner_table_inputs == true">
                           <spinner></spinner>
                        </div>
                        <div class="table-responsive col-md-12" v-else>
                           <table class="table table-striped">

                              <thead>
                              <tr>
                                 <th>Accion</th>
                                 <th v-show="user_table_fields.correo_resagado == true">Estado envio correo</th>
                                 <th v-show="user_table_fields.id == true">Id</th>
                                 <th v-show="user_table_fields.name == true">Nombre</th>
                                 <th v-show="user_table_fields.email == true">Email</th>
                                 <th v-show="user_table_fields.rut == true">Rut</th>
                                 <th v-show="user_table_fields.clave_electronica == true">Llave Secreta</th>
                                 <th v-show="user_table_fields.acepta_terminos == true">Acepta Terminos</th>
                                 <th v-show="user_table_fields.position == true">Cargo</th>
                                 <th v-show="user_table_fields.establecimiento == true">Establecimiento</th>
                                 <th v-show="user_table_fields.telefono == true">Telefono</th>
                                 <th v-show="user_table_fields.id_role == true">Role</th>
                                 <th v-show="user_table_fields.confirmado_llave_secreta == true">Se envió llave</th>
                              </tr>
                              </thead>

                              <tbody>
                              <input type="hidden" id="_token" name="_token" value="{{csrf_token()}}">
                              <tr v-for="(user,index) in filterBy(users, filterTerm)" :key="user.id">

                                 <td>
                                    <button class="btn btn-sm btn-primary" @click.prevent="editUser(user.id)"
                                            v-if="userEditId!=user.id">
                                       <i class="fa fa-pencil"></i>
                                    </button>
                                    <button class="btn btn-sm btn-success" @click.prevent="saveUser(user)"
                                            v-else>
                                       <i class="fa fa-check"></i>
                                    </button>


                                    <!-- v-if="user.establecimiento == 'minsal'" -->
                                    <a class="btn btn-sm btn-default"
                                            data-toggle="popover" data-trigger="hover" data-placement="bottom"
                                            title="¡IMPORTANTE!" data-content="Desde esta opción puedes enviar un email al usuario para que pueda crear su clave a traves de un enlace enviado a su email."
                                            tabindex="0"
                                            @click.prevent="sendEmailPasswordReset(user)">
                                       <i class="fa fa-envelope"></i>
                                    </a>
                                 </td>
                                 <td v-show="user_table_fields.correo_resagado == true">
                                    @{{ user.correo_resagado || 'No Aplica' }}
                                 </td>
                                 <td v-show="user_table_fields.id == true">
                                    @{{ user.id }}
                                 </td>
                                 <td v-show="user_table_fields.name == true">
                                    <span v-if="userEditId!=user.id">@{{ user.name }}</span>
                                    <input type="text" v-model="user.name" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.email == true">
                                    <span v-if="userEditId!=user.id">@{{ user.email }}</span>
                                    <input type="text" v-model="user.email" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.rut == true">
                                    <span v-if="userEditId!=user.id">@{{ user.rut }}</span>
                                    <input type="text" v-model="user.rut" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.clave_electronica == true">
                                    <span v-if="userEditId!=user.id">@{{ user.clave_electronica }}</span>
                                    <input type="text" v-model="user.clave_electronica" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.acepta_terminos == true">
                                    <span v-if="userEditId!=user.id">@{{ user.acepta_terminos }}</span>
                                    <input type="text" v-model="user.acepta_terminos" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.position == true">
                                    <span v-if="userEditId!=user.id">@{{ user.position }}</span>
                                    <input type="text" v-model="user.position" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.establecimiento == true">
                                    <span v-if="userEditId!=user.id">@{{ user.establecimiento }}</span>
                                    <input type="text" v-model="user.establecimiento" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.telefono == true">
                                    <span v-if="userEditId!=user.id">@{{ user.telefono }}</span>
                                    <input type="text" v-model="user.telefono" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.id_role == true">
                                    <span v-if="userEditId!=user.id">@{{ user.id_role }}</span>
                                    <input type="text" v-model="user.id_role" class="form-control" v-else>
                                 </td>
                                 <td v-show="user_table_fields.confirmado_llave_secreta == true">
                                    <span v-if="userEditId!=user.id">@{{ user.confirmado_llave_secreta }}</span>
                                    <input type="text" v-model="user.confirmado_llave_secreta" class="form-control" v-else>
                                 </td>
                              </tr>
                              </tbody>

                           </table>

                           <paginators :pagination="pagination" @navigate="navigate"></paginators>

                           <div class="pull-right">
                              Ver mas resultados
                              <select style="width: 5rem !important;" v-model="pagination.per_page" @change="navigateCustom">
                              <option selected disabled>@{{ pagination.per_page }}</option>
                              <option :value="5">5</option>
                              <option :value="10">10</option>
                              <option :value="15">15</option>
                              <option :value="20">20</option>
                              <option :value="25">25</option>
                              <option :value="30">30</option>
                              <option :value="35">35</option>
                              <option :value="40">40</option>
                              <option :value="45">45</option>
                              <option :value="50">50</option>
                              <option :value="100">100</option>
                              <option :value="500">500</option>
                              <option :value="1000">1000</option>
                              </select>
                           </div>

                        </div>

                     </div><!-- .col-md-* -->


                  </div><!-- .row -->
               </div><!-- .panel-body -->

            </div><!-- .panel .panel-default -->
         </div><!-- col-md-* -->
      </div><!-- .row -->
   </div><!-- .container -->

   <script>
      $(document).ready( function () {
         $('[data-toggle="popover"]').popover();
      });
   </script>
@endsection



@section('VueControllers')
   {!!Html::script('js/app/api/controllers/AdminController.js')!!}
@endsection