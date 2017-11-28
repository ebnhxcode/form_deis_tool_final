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

               </div><!-- .pan .panel-default -->
            </div>
         </div>
      </div>
   </div>
@endsection

