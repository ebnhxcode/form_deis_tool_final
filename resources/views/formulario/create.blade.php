@extends('layouts.app')
@include('layouts.styles')
@section('content')
   <div class="container" id="FormularioController">
      {{ csrf_field() }}
      <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">
      <spinner v-if="spinner_form_deis == true"></spinner>
      <div v-else>
         <div class="row" >
            <div class="col-md-12">
               <div class="{{--panel panel-default--}}">
                  <div class="{{--panel-heading--}}"></div><!-- .panel-heading -->

                  <div class="{{--panel-body--}}">
                     <div class="row">

                        <div class="col-md-12">


                           <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">

                           <div class="well well-sm">
                              <h3 class="text-center">
                                 Levantamiento información TV minsal
                                 {{--Plataforma Informática Seguimiento de la Prevención de la Transmisión Vertical de VIH y Sífilis--}}
                                 <img class="pull-right" width="90" src="{{url('img/logo.png')}}" alt="" style="border-radius: 3px;box-shadow: 2px 1px 2px 1px #dbdbdb;">
                              </h3> <!-- .text-center --> <br>

                              <button class="btn btn-success" type="button" data-toggle="collapse"
                                      style="box-shadow: 2px 1px 2px 1px #dbdbdb;"
                                      data-target="#instructions" aria-expanded="false" aria-controls="instructions">
                                 <small>Leer instrucciones</small>
                              </button><!-- .btn .btn-success -->

                              <a class="btn btn-link" href="{{url('/Manual_de_Usuario_Completo.pdf')}}" target="_blank">
                                 Descargar Manual
                              </a>
                              
                              {{--
                              <button class="btn btn-sm btn-success pull-right small" @click.prevent="guardar_formulario_completo"
                                      style="box-shadow: 2px 1px 2px 1px #dbdbdb;">
                                 Guadar todo&nbsp;
                                 <i class="fa fa-search"></i>
                              </button></button><!-- .btn .btn-info -->
                              --}}

                              <button class="btn btn-sm btn-warning pull-right small" @click.prevent="visualizar_errores"
                                      style="box-shadow: 2px 1px 2px 1px #dbdbdb;margin-left: 10px;">
                                 Ver lista de Errores&nbsp;
                                 <i class="fa fa-exclamation"></i>
                                 <small v-if="auth['form_deis_errores']">
                                    <b>@{{ auth['form_deis_errores'].length }}</b>
                                 </small>
                              </button><!-- .btn .btn-success -->

                              <button class="btn btn-sm btn-success pull-right small" @click.prevent="crear_nuevo_formulario"
                                      style="box-shadow: 2px 1px 2px 1px #dbdbdb;margin-left: 10px;">
                                 Crear nueva ficha&nbsp;
                                 <i class="fa fa-plus"></i>
                              </button><!-- .btn .btn-success -->

                              <button class="btn btn-sm btn-info pull-right small" @click.prevent="buscar_formulario"
                                      style="box-shadow: 2px 1px 2px 1px #dbdbdb;">
                                 Buscar ficha&nbsp;
                                 <i class="fa fa-search"></i>
                              </button><!-- .btn .btn-info -->

                              <!-- Seccion de Modals -->

                              <modal_buscar_formulario
                                 :auth="auth"
                                 v-show="show_modal_buscar_formulario == true">
                                 <h3 slot="header">
                                    Búsqueda DEIS
                                    <button class="btn btn-sm btn-default pull-right" @click.prevent="show_modal_buscar_formulario = false">
                                       Cerrar
                                    </button>
                                    <!--<button @click.prevent="" class="btn btn-sm btn-success pull-right">Guardar</button>-->
                                 </h3>
                              </modal_buscar_formulario>

                              <modal_formularios_encontrados
                                 :formularios_encontrados="formularios_encontrados"
                                 v-show="show_modal_formularios_encontrados == true">
                                 <h3 slot="header">
                                    Formularios encontrados

                                    {{--
                                    <button class="btn btn-sm btn-success pull-right"
                                            @click.prevent="crear_nuevo_formulario"
                                            style="margin-left: 10px;">
                                       Ó Crear nuevo&nbsp;
                                       <i class="fa fa-plus"></i>
                                    </button><!-- .btn .btn-success -->
                                    --}}

                                    <button class="btn btn-sm btn-default pull-right" @click.prevent="show_modal_formularios_encontrados= false">
                                       Ó Seguir creando
                                    </button>
                                    <!--<button @click.prevent="" class="btn btn-sm btn-success pull-right">Guardar</button>-->
                                 </h3>
                              </modal_formularios_encontrados>

                              <modal_errores_formulario
                                 :auth="auth"
                                 v-show="show_modal_errores_formulario == true">
                                 <h3 slot="header">
                                    Glosa historica de errores
                                    <button class="btn btn-sm btn-default pull-right" @click.prevent="show_modal_errores_formulario = false">
                                       Cerrar
                                    </button>
                                    <!--<button @click.prevent="" class="btn btn-sm btn-success pull-right">Guardar</button>-->
                                 </h3>
                              </modal_errores_formulario>



                              <div class="collapse" id="instructions">
                                 <h4>Instrucciones:</h4> <br>
                                 <ul>
                                    <li v-for="i in instructions">
                                       <h4>@{{i}}</h4>
                                    </li>
                                 </ul>
                              </div><!-- .collapse #instructions -->

                           </div><!-- .well .well-sm -->

                           <div class="well well-sm" v-if="fdc && fdc.estado_form_deis=='ocupado'
                           && fdc.usuario_modifica_form_deis != auth.id">
                              <div class="row">
                                 {{--<div class="col-md-11"></div>--}}
                                 <div class="col-md-1">
                                 <span class="label label-warning">
                                    @{{ fdc.estado_form_deis }}, el registro está siendo modificado por otro usuario
                                 </span>
                                 </div><!-- col-off-md .label  -->
                              </div><!-- .row -->
                           </div><!-- .well .well-sm -->

                           <!-- style="pointer-events:none;" -->
                           <div v-if="fdc && fdc.estado_form_deis!='ocupado' || fdc.usuario_modifica_form_deis == auth.id">
                              <div id="" :class=" (fdc.mujer_es_vih_positivo=='Si') ?'panel with-nav-tabs panel-danger':'panel with-nav-tabs panel-primary'"
                                   v-if="formularioNuevoActivo == true || formularioEditActivo == true">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">
                                       <li role="presentation" :class="tab.class" v-for="tab in nav_tab_form_deis">
                                          <a :href="'#'+tab.name" :aria-controls="tab.name" role="tab" data-toggle="tab">
                                             {{--:style="validar_campos_completados(tab.name)==true?'pointer-events:none;':''"--}}
                                             @{{ tab.description }}
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" :class="'tab-pane fade in '+tab.class" :id="tab.name" v-for="tab in nav_tab_form_deis">

                                          <dl class="dl-vertical">
                                             <input type="hidden" name="_token" id="_token" value="{{csrf_token()}}">
                                             <div v-for="i,index in inputs" v-if="i.seccion == tab.name">

                                                <!-- Prop para permitir insertar una cabecera de titulo -->
                                                <div v-if="i.tag" class="col-md-12">
                                                   <h3><b>@{{ i.tag ? i.tag : '' }}</b></h3><br>
                                                </div>
                                                <!-- Prop para permitir insertar una cabecera de subtitulo -->
                                                <div v-if="i.subtag" class="col-md-12"
                                                     style="padding-bottom: 10px;">
                                                   <h4><b>@{{ i.subtag ? i.subtag : '' }}</b></h4>
                                                </div>

                                                <div :class="i.class_custom ? i.class_custom : 'col-xs-6 col-sm-6 col-md-6'">
                                                   <!-- Etiquetas de los campos -->
                                                   <dt class="small">
                                                      <!-- Prop para permitir insertar numero de orden de completado -->
                                                      <span v-if="i.order" style="zoom:1.4;">@{{ i.order ? i.order : '' }}-</span>
                                                      <span>@{{ i.label ? i.label : 'Sin Etiqueta' }}</span>
                                                   </dt>

                                                   <!-- Input basicos como text,number,time,date,etc -->
                                                   {{--v-if="tab.name != 'patologias_sifilis' && tab.name != 'patologias_vih'"--}}
                                                   <dd v-if="check_input(i,index) == true || auth.id_role == 3">
                                                      <!-- || permiso_temporal_edicion == true -->


                                                      <input :name="i.name"
                                                             :id="i.id"
                                                             :disabled="i.disabled!=''?i.disabled:''"
                                                             :class="i.class!=''?i.class:'form-control'"
                                                             :type="i.type!=''?i.type:''"
                                                             :maxlength="i.max_length!=''?i.max_length:''"
                                                             :required="i.required!=''?i.required:''"
                                                             :readonly="i.readonly!=''?i.readonly:''"
                                                             :style="i.style!=''?i.style:''"
                                                             :placeholder="i.placeholder!=''?i.placeholder:''"
                                                             :readonly="i.readonly!=''?i.readonly:''"
                                                             :min="i.min!=''?i.min:''"
                                                             :max="i.max!=''?i.max:''"
                                                             :pattern="i.pattern!=''?i.pattern:''"
                                                             :format="i.format!=''?i.format:''"
                                                             @change.prevent="verifica_validacion_change(i)"
                                                             @keyup.prevent="verifica_validacion_keyup(i)"
                                                             @blur.prevent="verifica_validacion_blur(i)"
                                                             v-model="fdc[i.name]"
                                                             v-if="inputInArray(i,inputTypes.basics)">

                                                      <select :name="i.name"
                                                              :id="i.id"
                                                              :disabled="i.disabled!=''?i.disabled:''"
                                                              :class="i.class!=''?i.class:'form-control'"
                                                              :required="i.required!=''?i.required:''"
                                                              :readonly="i.readonly!=''?i.readonly:''"
                                                              :style="i.style!=''?i.style:''"
                                                              :placeholder="i.placeholder!=''?i.placeholder:''"
                                                              :readonly="i.readonly!=''?i.readonly:''"
                                                              :value="fdc[i.name]"
                                                              v-model="fdc[i.name]"
                                                              @change.prevent="verifica_validacion_change(i)"
                                                              @click.prevent="verifica_validacion_click(i)"
                                                              @blur.prevent="verifica_validacion_blur(i)"
                                                              v-else-if="inputInArray(i,inputTypes.select)">

                                                         {{--<option value="">Seleccione</option>--}}

                                                         <option v-for="o,i in deis_form_table_options[i.name]" :value="i"
                                                                 :style="i=='No Realizado'?'font-weight:1000;':''">
                                                            @{{ o }}
                                                         </option>

                                                      </select><!-- .form-control -->

                                                   <textarea :name="i.name"
                                                             :id="i.id"
                                                             :disabled="i.disabled!=''?i.disabled:''"
                                                             class="form-control"
                                                             v-model="fdc[i.name]"
                                                             v-else-if="inputInArray(i,inputTypes.textarea)">
                                                   </textarea>

                                                   </dd>

                                                   <dd v-else class="text-center">
                                                      <input class="form-control text-success" type="text" readonly="true" value="Dato ya ingresado">
                                                   </dd>
                                                   <br>
                                                </div><!-- .col-md-* -->

                                                <div v-if="i.empty_column"
                                                     :class="i.empty_column">
                                                </div>
                                             </div>

                                             <div class="col-xs-12 col-sm-12 col-md-12">
                                                <dt>
                                                </dt>
                                                <dd>
                                                   <input id="" name="" @click.prevent="guardar_formulario(tab.name)"
                                                          class="btn btn-success" type="button" value="Guardar"
                                                          style="box-shadow: 2px 1px 2px 1px #dbdbdb;">

                                                   <input id="" name="" @click.prevent="guardar_formulario_completo"
                                                          class="btn btn-danger pull-right" type="button" value="Cerrar Ficha"
                                                          style="box-shadow: 2px 1px 2px 1px #dbdbdb;">
                                                   <transition v-if="mini_loader == true" name="slide-fade">
                                                      <div class="pull-right">
                                                         <div class="circle-loader">
                                                            <div class="checkmark draw"></div>
                                                         </div>
                                                      </div>
                                                   </transition>
                                                </dd>
                                             </div><!-- .col-md-* -->

                                          </dl><!-- .dl-vertical -->

                                       </div><!-- .tab-pane -->

                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->
                           </div>
                        </div><!-- .col-md-* -->


                     </div><!-- .row -->
                  </div><!-- .panel-body -->

               </div><!-- .panel .panel-default -->
            </div><!-- col-md-* -->
         </div><!-- .row -->
      </div>

   </div><!-- .container -->

   <script>

      var self = $;
      setInterval(function () {
         if (!self('#lugar_control_prenatal').data('select2')) {
            self('#lugar_control_prenatal').select2();
         }
         if (!self('#lugar_atencion_parto').data('select2')) {
            self('#lugar_atencion_parto').select2();
         }
         if (!self('#lugar_control_embarazo').data('select2')) {
            self('#lugar_control_embarazo').select2();
         }
         if (!self('#establecimiento_control_sifilis').data('select2')) {
            self('#establecimiento_control_sifilis').select2();
         }
         if (!self('#establecimiento_control_vih').data('select2')) {
            self('#establecimiento_control_vih').select2();
         }
         if (!self('#atencion_parto').data('select2')) {
            self('#atencion_parto').select2();
         }
      },1000);

   </script>
@endsection


@section('VueControllers')
   {!!Html::script('js/app/api/controllers/FormularioController.js')!!}
@endsection