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

                     <div class="col-lg-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-green">
                           <div class="inner">
                              <h3>Title</h3>
                              <small>Compromisos vencidos</small>
                              <p>Hasta 30 días</p>
                           </div>
                           <div class="icon">
                              <i class="ion ion-stats-bars"></i>
                           </div>
                           <a href="#" data-toggle="modal" data-tipo="verde" data-target="#myModal"
                              class="alerta-semaforo small-box-footer">Más información <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                     </div>
                     <!-- ./col -->
                     <div class="col-lg-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-yellow">
                           <div class="inner">
                              <h3>Title</h3>
                              <small>Compromisos vencidos</small>
                              <p>De 31 a 60 días</p>
                           </div>
                           <div class="icon">
                              <i class="ion ion-stats-bars"></i>
                           </div>
                           <a href="#" data-toggle="modal" data-tipo="amarillo" data-target="#myModal"
                              class="alerta-semaforo small-box-footer">Más información <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                     </div>
                     <!-- ./col -->
                     <div class="col-lg-4 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-red">
                           <div class="inner">
                              <h3>Title</h3>
                              <small>Compromisos vencidos</small>
                              <p>De 61 a más días</p>
                           </div>
                           <div class="icon">
                              <i class="ion ion-stats-bars"></i>
                           </div>
                           <a href="#" data-toggle="modal" data-tipo="rojo" data-target="#myModal"
                              class="alerta-semaforo small-box-footer">Más información <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                     </div>

                  </div><!-- .row -->


               </div><!-- .pan .panel-default -->
            </div>
         </div>
      </div>
   </div>
@endsection

