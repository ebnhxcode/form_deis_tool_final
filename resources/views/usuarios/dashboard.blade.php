@extends('layouts.app')
@include('layouts.styles')

@section('content')
   <div class="container" id="UsuarioCreateController">
      <div class="row">
         <div class="col-md-12">
            <div class="{{--panel panel-default--}}">
               {{--<div class="panel-heading"></div>--}}
               <div class="{{--panel-body--}}">
                  <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

                  <div class="well small">
                     <h3 class="text-center">
                        Dashboard
                        {{--Plataforma Informática Seguimiento de la Prevención de la Transmisión Vertical de VIH y Sífilis--}}
                        <img class="pull-right" width="90" src="{{url('img/logo.png')}}" alt="" style="border-radius: 3px;box-shadow: 2px 1px 2px 1px #dbdbdb;">
                     </h3> <!-- .text-center --> <br>
                  </div><!-- .well .small -->

                  <div class="row">

                     @if(isset (Auth::user()->role) && in_array(Auth::user()->role->role, ['admin','mantenedor']))
                        <div class="col-lg-4 col-xs-6">
                           <!-- small box -->
                           <div class="small-box bg-green">
                              <div class="inner">
                                 <h4>Mantenedor de Usuarios</h4>
                                 <hr>
                                 <small>
                                    · Descargas de usuarios de sistema <br>
                                    · Creación de usuarios <br>
                                    · Mantenedor de usuarios <br>
                                 </small>
                              </div>
                              <div class="icon">
                                 <i class="ion ion-stats-bars"></i>
                              </div>
                              <a href="{{url('/admin/mant_usuarios')}}"data-tipo="verde"
                                 class="alerta-semaforo small-box-footer">Acceder <i class="fa fa-arrow-circle-right"></i></a>
                           </div>
                        </div>
                        <!-- ./col -->
                     @endif

                     @if(isset (Auth::user()->role) && in_array(Auth::user()->role->role, ['admin','mantenedor','digitador','observador']))
                        <div class="col-lg-4 col-xs-6">
                           <!-- small box -->
                           <div class="small-box bg-red">
                              <div class="inner">
                                 <h4>Formulario · DEIS</h4>
                                 <hr>
                                 <small>
                                    · Formulario de ingreso de pacientes <br>
                                    · Búsqueda de formularios <br>
                                    · Creación de formularios <br>
                                 </small>
                              </div>
                              <div class="icon">
                                 <i class="ion ion-stats-bars"></i>
                              </div>
                              <a href="{{url('/formulario/transmision_vertical')}}" data-tipo="rojo"
                                 class="alerta-semaforo small-box-footer">Acceder <i class="fa fa-arrow-circle-right"></i></a>
                           </div>
                        </div>
                        <!-- ./col -->
                     @endif

                     @if(isset (Auth::user()->role) && in_array(Auth::user()->role->role, ['admin']))
                        <div class="col-lg-4 col-xs-6">
                           <!-- small box -->
                           <div class="small-box bg-yellow">
                              <div class="inner">
                                 <h4>Mantenedor de Campos</h4>
                                 <hr>
                                 <small>
                                    · Modificación de labels <br>
                                    · Modificación de campos <br>
                                    · Búsqueda de campos <br>
                                 </small>
                              </div>
                              <div class="icon">
                                 <i class="ion ion-stats-bars"></i>
                              </div>
                              <a href="{{url('/input')}}" data-tipo="amarillo"
                                 class="alerta-semaforo small-box-footer">Acceder <i class="fa fa-arrow-circle-right"></i></a>
                           </div>
                        </div>
                        <!-- ./col -->
                     @endif

                  </div><!-- .row -->


               </div><!-- .pan .panel-default -->
            </div>
         </div>
      </div>
   </div>
@endsection

