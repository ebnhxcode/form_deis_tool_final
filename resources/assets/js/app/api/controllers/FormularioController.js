import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';

import { validate, clean, format } from 'rut.js';

import moment from 'moment-es6';

// Add locale helper.
Validator.addLocale(es);

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
   locale: 'es'
});

const FormularioController = new Vue({
   el: '#FormularioController ',
   data(){
      return {
         'instructions':[],
         'inputs':[],
         //'labels':[],
         'nav_tab_form_deis':[],
         'deis_form_table_options':[],
         'pais_origen':[],
         'fdc':[],
         'fdc_temp':[],
         'auth':[],

         'formularios_encontrados':{},
         'formulario_guardandose':false,

         'spinner_form_deis':true,

         'inputTypes':{
            'basics':['text', 'number', 'email', 'password', 'date', 'time'],
            'select':['select'],
            'textarea':['textarea'],
         },
         'tags': [
            'h1','h2','h3','h4','h5','h6'
         ],

         'show_modal_buscar_formulario':false,
         'show_modal_formularios_encontrados':false,

         'spinner_iniciar':true,
         'spinner_finalizar':false,
         'mini_loader':false,

         'formularioNuevoActivo':false,
         'formularioEditActivo':false,

         'formularioActivoObj':[],

         'hayGuardadoActivo':false,
         'idFormularioActivo':'',

      }
   },
   computed: {},
   watch: {
   },
   components: {
      'mini-spinner': {
         props: [''],
         'name': 'mini-spinner',
         'template': `
	         <div class="loader-mini text-center">Cargando tabla, espere por favor...</div>
	      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'spinner': {
         props: [''],
         'name': 'spinner',
         'template': `
         <div class="loader text-center">Cargando tabla, espere por favor...</div>
      `,
         data () {
            return {
               visible: false,
            }
         },
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'mini-loader': {
         props: [''],
         'name': 'mini-loader',
         'template':`<div class="mini-loader">Loading...</div>`,
         data () {
            return {
            }
         },
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'inputs':{
         props: ['name','id','type', 'max_length', 'required', 'readonly', 'class_custom', 'style_custom', 'placeholder'],
         'name': 'inputs',
         'template': `
            <input :name="name!=''?name:id"
                   :id="id!=''?id:name"
                   :type="type!=''?type:text"
                   :max-lenght="max_lenght!=''?max_lenght:25"
                   :required="required!=''?required:false"
                   :readonly="readonly!=''?readonly:false"
                   :style="style_custom!=''?style_custom:''"
                   :class="class_custom!=''?class_custom:'form-control'"
                   :placeholder="placeholder!=''?placeholder:''" />
         `,
         data () {},
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'selects':{
         props: ['name','id'],
         'name': 'selects',
         'template': `
            <select name="name"
                    id="id"
                   :required="required"
                   :readonly="readonly"
                   :class="'form-control '+class" />
            </select>
         `,
         data () {},
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'textareas':{
         props: ['name','id'],
         'name': 'textareas',
         'template': `
            <textarea name="name"
                    id="id"
                   :required="required"
                   :readonly="readonly"
                   :class="'form-control '+class" />
            </textarea>
         `,
         data () {},
         ready () {},
         created(){},
         filters: {},
         methods: {},
      },
      'modal_buscar_formulario':{
         props: [],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_personas_run" aria-controls="lista_personas_run" role="tab" data-toggle="tab">
                                             Búsqueda de Personas - <b>Run Madre</b>
                                          </a>
                                       </li>

                                       <li role="presentation">
                                          <a href="#lista_personas_pasaporte" aria-controls="lista_personas_pasaporte"
                                             role="tab" data-toggle="tab">
                                             Búsqueda de Personas - <b>Pasaporte</b>
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_personas_run">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Run Madre
                                                   </dt>
                                                   <dd>

                                                      <!-- Busqueda por RUN -->
                                                      <div class="form-group">
                                                         <div class="input-group input-group-sm">
                                                            <div class="input-group-addon">
                                                               <i class="fa fa-user"></i>
                                                            </div>

                                                            <input class="form-control"
                                                             type="text"
                                                             style="padding-bottom: 5px;"
                                                             name="run_madre"
                                                             placeholder="Ej: 123456789 Sin puntos ni guión"
                                                             id="run_madre"
                                                             maxlength="12"
                                                             v-model="run_madre"
                                                             @keyup.prevent="formatear_rut"
                                                             @change="buscar_por_run">

                                                            <span class="input-group-btn">
                                                               <button class="btn btn-sm btn-info"
                                                                  @click.prevent="buscar_por_run">
                                                                  Buscar&nbsp;<i class="fa fa-search"></i>
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                         </div><!-- /.input-group -->
                                                      </div><!-- /.form-group -->


                                                      <div class="table-responsive" v-if="formulario_vacio == false">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_run -->


                                       <div role="tabpanel" class="tab-pane fade" id="lista_personas_pasaporte">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Pasaporte
                                                   </dt>
                                                   <dd>

                                                      <!-- Busqueda por PASAPORTE -->
                                                      <div class="form-group">
                                                         <div class="input-group input-group-sm">
                                                            <div class="input-group-addon">
                                                               <i class="fa fa-user"></i>
                                                            </div>

                                                            <input class="form-control"
                                                             type="text"
                                                             style="padding-bottom: 5px;"
                                                             name="pasaporte_provisorio"
                                                             placeholder="Ej: 123456789 Sin puntos ni guión"
                                                             id="pasaporte_provisorio"
                                                             maxlength="12"
                                                             v-model="pasaporte_provisorio"
                                                             @change="buscar_por_pasaporte">

                                                            <span class="input-group-btn">
                                                               <button class="btn btn-sm btn-info"
                                                                  @click.prevent="buscar_por_pasaporte">
                                                                  Buscar&nbsp;<i class="fa fa-search"></i>
                                                               </button>
                                                            </span><!-- .input-group-btn -->
                                                         </div><!-- /.input-group -->
                                                      </div><!-- /.form-group -->


                                                      <div class="table-responsive" v-if="formulario_vacio == false">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_pasaporte -->




                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


							      </slot>
						      </div>

						      <!--
						      <div class="modal-footer">
							      <slot name="footer">
							         <button class="btn btn-sm btn-success" @click="$emit('close')">
								         Aceptar
							         </button>
                           </slot>
						      </div>
						      -->
					      </div>
                  </div>
				   </div>
			   </transition>
			`,
         name: 'modal_buscar_formulario',
         data () {
            return {
               'run_madre':'',
               'pasaporte_provisorio':'',
               'n_correlativo_interno':'',
               'formularios':[],
               'formularios_correlativo':[],
               'formulario_vacio':true,
               'formulario_vacio_correlativo':true,
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            formatear_rut: function () {
               var run = this.run_madre;
               this.run_madre = format(run);
            },
            validar_rut: function (run) {
               if (validate(run) == false) {
                  swal({
                     title: "Advertencia",
                     text: "El formato del rut es incorrecto.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return this.run = null;
               }else{
                  return format(run);
               }
            },
            buscar_por_pasaporte: function () {
               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('pasaporte_provisorio', this.pasaporte_provisorio);

               this.$http.post('/formulario/buscar_por_pasaporte', formData).then(response => { // success callback
                  //console.log(response);
                  this.formularios = response.body.formularios;
                  this.formulario_vacio = $.isEmptyObject(this.formularios)==true?true:false;
                  this.pasaporte_provisorio = null;

                  if (this.formulario_vacio == true) {
                     swal({
                        title: "Atención",
                        text: "El pasaporte ingresado no se encuentra registrado.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
            },
            buscar_por_run: function () {
               if (!this.run_madre || validate(this.run_madre) == false){
                  swal({
                     title: "Advertencia",
                     text: "Debe ingresar un rut valido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  return;
               }

               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

               var run_limpio = clean(this.run_madre);
               run_limpio = run_limpio.substr(0, run_limpio.length-1);
               //alert (run_limpio) ;
               //return;

               //formData.append('run_madre', this.run_madre);
               formData.append('run_madre', run_limpio);

               this.$http.post('/formulario/buscar_por_run', formData).then(response => { // success callback
                  //console.log(response);
                  this.formularios = response.body.formularios;
                  this.formulario_vacio = $.isEmptyObject(this.formularios)==true?true:false;
                  this.run_madre = null;
                  if (this.formulario_vacio == true) {
                     swal({
                        title: "Atención",
                        text: "El rut ingresado no se encuentra registrado.",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
            },
            buscar_por_correlativo: function () {
               if (!this.n_correlativo_interno) return;
               var formData = new FormData();

               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', this.n_correlativo_interno);

               this.$http.post('/formulario/buscar_por_correlativo', formData).then(response => { // success callback
                  //console.log(response);

                  this.formularios_correlativo = response.body.formularios;
                  this.formulario_vacio_correlativo = $.isEmptyObject(this.formularios_correlativo)==true?true:false;
                  this.n_correlativo_interno = null;

               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
            },
            modificar_usuario_seleccionado: function (formulario) {
               /*
                for (let f in formulario) {

                if (f.indexOf('fecha')>-1 && formulario[f]) {
                let fecha_x = formulario[f].split('-');
                formulario[f] = fecha_x[2]+'-'+fecha_x[1]+'-'+fecha_x[0];
                }

                }
                */
               this.$parent.renderizar_solo_inputs();
               this.$parent.fdc = formulario;
               this.$parent.fdc_temp = formulario;
               this.$parent.formularioActivoObj = formulario;
               this.$parent.show_modal_buscar_formulario = false;
               this.$parent.formularioEditActivo = true;
               this.$parent.formularioNuevoActivo = false;

               //Generamos limpieza de los campos con el plugin
               $('#select2-establecimiento_control_sifilis-container').val(null).empty();
               $('#select2-establecimiento_control_vih-container').val(null).empty();
               $('#select2-lugar_control_prenatal-container').val(null).empty();
               $('#select2-lugar_control_embarazo-container').val(null).empty();
               $('#select2-lugar_atencion_parto-container').val(null).empty();

               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', formulario.n_correlativo_interno);

               this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                  this.$parent.fdc = response.body.fdc;

                  //console.log(response);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });
               this.formularios = [];

            },
         },
         watch: {
         },
      },
      'modal_formularios_encontrados':{
         props: ['formularios_encontrados'],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div>

						      <div class="modal-body">
							      <slot name="body">

                              <div id="" class="panel with-nav-tabs panel-primary">
                                 <!-- Items elementos de cabecera -->
                                 <div class="panel-heading">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs small" role="tablist">

                                       <li role="presentation" class="active">
                                          <a href="#lista_personas_run" aria-controls="lista_personas_run" role="tab" data-toggle="tab">
                                             Lista de personas encontradas
                                          </a>
                                       </li>

                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">

                                       <div role="tabpanel" class="tab-pane fade in active" id="lista_personas_run">


                                          <dl class="dl-vertical">
                                             <div class="row">
                                                <div class="col-md-12" style="overflow-y: scroll;max-height: 400px;">

                                                   <dt>
                                                      Formularios encontrados
                                                   </dt>
                                                   <dd>
                                                      <div class="table-responsive">
                                                         <small class="text-info">Resultados encontrados</small>
                                                         <br>
                                                         <table class="table table-striped small">
                                                            <thead>
                                                               <tr>
                                                                  <th>Accion</th>
                                                                  <th>Correlativo</th>
                                                                  <th>Run Madre</th>
                                                                  <th>Nombres</th>
                                                                  <th>Disponibilidad Registro</th>
                                                                  <th>Estado Registro</th>
                                                                  <th>Fecha Parto</th>
                                                                  <th>Hora Parto</th>
                                                               </tr>
                                                            </thead>
                                                            <tbody>
                                                               <tr v-for="f in formularios_encontrados">
                                                                  <td>
                                                                     <button class="btn btn-sm btn-primary"
                                                                        @click.prevent="modificar_usuario_seleccionado(f)">
                                                                        <i class="fa fa-pencil"></i>
                                                                     </button>
                                                                  </td>
                                                                  <td>{{f.n_correlativo_interno}}</td>
                                                                  <td>{{f.run_madre}}</td>
                                                                  <td>{{f.nombres_madre}}</td>
                                                                  <td>{{f.estado_form_deis || 'disponible'}}</td>
                                                                  <td>{{f.estado_formulario_completo_form_deis || 'Incompleto'}}</td>
                                                                  <td>{{f.fecha_parto || 'No Ingresado'}}</td>
                                                                  <td>{{f.hora_parto || 'No Ingresado'}}</td>
                                                               </tr>
                                                            </tbody>
                                                         </table>
                                                      </div><!-- .table-responsive -->
                                                   </dd>

                                                </div><!-- .col-md-12 -->
                                             </div>
                                          </dl><!-- dl-horizontal -->


                                       </div><!-- .tab-pane .fade #lista_personas_run -->
                                    </div><!-- .panel-heading -->
                                 </div><!-- .panel-heading -->
                              </div><!-- .panel-heading -->


							      </slot>
						      </div>

						      <!--
						      <div class="modal-footer">
							      <slot name="footer">
							         <button class="btn btn-sm btn-success" @click="$emit('close')">
								         Aceptar
							         </button>
                           </slot>
						      </div>
						      -->
					      </div>
                  </div>
				   </div>
			   </transition>
			`,
         name: 'modal_formularios_encontrados',
         data () {
            return {
               'run_madre':'',
               'formularios':[],
               'formularios_correlativo':[],
               'formulario_vacio':true,
               'formulario_vacio_correlativo':true,
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            modificar_usuario_seleccionado: function (formulario) {
               this.$parent.renderizar_solo_inputs();
               this.$parent.fdc = formulario;
               this.$parent.fdc_temp = formulario;
               this.$parent.formularioActivoObj = formulario;
               this.$parent.show_modal_formularios_encontrados = false;
               this.$parent.formularioEditActivo = true;
               this.$parent.formularioNuevoActivo = false;

               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', formulario.n_correlativo_interno);

               this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                  this.$parent.fdc = response.body.fdc;
                  //console.log(response);
               }, response => { // error callback
                  //console.log(response);
                  this.$parent.check_status_code(response.status);
               });

            },
         },
         watch: {
         },
      },
      /*
       '':{
       props: [''],
       template: `
       `,
       name: '',
       data () {
       return {
       }
       },
       ready () {
       },
       created () {
       },
       methods: {
       },
       watch: {
       },
       }
       */
   },
   created(){
      //Instancia parametros iniciales
      this.fetch_formulario();
      //Variable de contexto
      var self = this;

      //Funcion de auto guardado cada 5 minutos
      /*
      setInterval(function () {
         self.guardar_formulario_completo();
      },300000);
      */
      $(document).ready(function () {
         //Handle al recargar pagina
         window.onbeforeunload = function(e){
            return "Estás seguro que deseas cerrar la ventana?";
            /*
            return function () {
               var cookies = document.cookie.split(";");

               for (var i = 0; i < cookies.length; i++) {
                  var cookie = cookies[i];
                  var eqPos = cookie.indexOf("=");
                  var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
               }
            */
            /*
            var self = this;
            return function () {
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               self.$http.post('/formulario/prueba_session').then(response => { // success callback
               }, response => { // error callback
                  console.log(response);
               });
            }
            */
            //return window.open('/formulario/prueba_session');
         };
         window.onunload = function(e){
            return "Cierre de la ventana";
         };

      });

      setTimeout(function () {
         self.spinner_form_deis = false;
      }, 1500);

   },
   ready: {},
   filters: {
   },
   methods: {

      check_status_code: function (status_code) {
         switch (status_code) {
            case 401:
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });

               break;
            case 500:
               swal({
                  title: "Atencion",
                  text: "Ocurrio un error al guardar, por favor actualice la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true,
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });
               break;
            default :
               swal({
                  title: "Atencion",
                  text: "Ocurrio un error al procesar el formulario, por favor actualice la página.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: true
               }, function (isConfirm) {
                  if (isConfirm) {
                     window.location.href = '/login';
                  }
               });
               break;
         }
      },

      check_input: function (input,index) {
         if (input.bloque == 'campo_limitado') {
            //por que se requiere completar
            if ( this.fdc_temp[this.inputs[index].id] != null &&
               this.fdc_temp[this.inputs[index].id] != ''
               && this.formularioNuevoActivo == false
            ) {

               this.inputs[index].edicion_temporal = false;

            }else{
               //caso contrario, no es necesario completar
               this.inputs[index].edicion_temporal = true;
            }
            return this.inputs[index].edicion_temporal;
         }
         return true;

      },

      validar_campos_completados: function (tabName) {
         var validation = true;
         for (let i in this.inputs){
            //console.log(tabName);
            //console.log(this.inputs[i].seccion == tabName);
            if (this.inputs[i].seccion == tabName && this.fdc[this.inputs[i].name] == null
               && this.inputs[i].disabled == null ) {
               validation = false;
            }
         }
         return validation;
      },

      verifica_validacion_keyup: function (input) {
         /*
         switch (input.id) {
            case 'run_madre':
               this.fdc[input.name] = format(this.fdc[input.name]);
               break;
            case 'run_recien_nacido':
               this.fdc[input.name] = format(this.fdc[input.name]);
               break;
         }
         */

      },

      verifica_validacion_change: function (input) {

         /*
         for (let i in this.inputs){
            //this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóúscript;:\#\,\.\;\:ÑÍÉÓÁÚ@_]/g, '');
            this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.ÑÍÉÓÁÚ@_]/g, '');
         }
         */


         switch (input.id) {

            case 'run_madre':

               if (!this.fdc[input.name] ||
                  this.fdc[input.name] == '' ||
                  this.fdc[input.name] == null ||
                  validate(this.fdc[input.name]+this.fdc['digito_verificador'])){
                  return;
               }

               if (validate(this.fdc[input.name]) == false) {
                  alert('Debe ingresar un rut completo valido, sin puntos ni guión.');
                  this.fdc[input.name] = null;
                  this.fdc['digito_verificador'] = dv;
                  return;
               }

               if (this.fdc[input.name] != null && this.fdc[input.name]) {

                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'pasaporte_provisorio') {
                        this.inputs[i].disabled = true;
                     }
                  }

               }

               var run_limpio = clean(this.fdc[input.name]);
               var dv = run_limpio.substr(run_limpio.length-1, run_limpio.length);
               run_limpio = run_limpio.substr(0, run_limpio.length-1);
               this.fdc['run_madre'] = run_limpio;
               this.fdc['digito_verificador'] = dv;

               input.disabled = 'disabled';

               if (this.formularioNuevoActivo == true && this.fdc[input.name] != null) {
                  var formData = new FormData();
                  Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                  //formData.append('run_madre', this.fdc[input.name]);
                  formData.append('run_madre', run_limpio);
                  this.$http.post('/formulario/buscar_run_existente', formData).then(response => { // success callback
                     //console.log(response);
                     if (response.status == 200) {
                        var rd = response.body.rd;
                        this.formularios_encontrados = response.body.formularios;
                        if (rd == 'Existe') {
                           //this.fdc[input.name] = null;
                           var self = this;
                           swal({
                              title: "Atencion",
                              text: "El rut ingresado ya existe para una madre registrada, por favor seleccione el registro a modificar.",
                              type: "success",
                              confirmButtonClass: "btn-success",
                              closeOnConfirm: true
                           }, function(isConfirm){
                              if (isConfirm) {
                                 self.show_modal_formularios_encontrados = true;
                              }
                           });
                        }
                     }else{
                        swal({
                           title: "Advertencia",
                           text: "Ocurrio un error al procesar la solicitud.",
                           type: "error",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                     }
                  }, response => { // error callback
                     //console.log(response);
                  });
               }

               break;
            /*
            case 'run_recien_nacido':
               if (validate(this.fdc[input.name]) == false) {
                  this.fdc[input.name] = null;
                  alert('Debe ingresar un rut valido');
               }
               break;
            */

            case 'mujer_es_vih_positivo':
               if (this.fdc[input.name] == 'Si') {
                  var self = this;
                  swal({
                     title: "Advertencia!",
                     text: `
                     Acuerdo de confidencialidad

                     Al seleccionar si, acuerdo mantener el proceso de ingreso de información de forma confidencial y anónima.

                     Para confirmar ingrese su clave de acceso
                     `,
                     type: "input",
                     inputType: "password",
                     showCancelButton: true,
                     closeOnConfirm: false,
                     inputPlaceholder: "Ingrese su clave de acceso",
                  }, function (inputValue) {
                     if (inputValue === false) {
                        self.fdc[input.name] = null;
                        return false;
                     }

                     if (inputValue === "") {
                        swal.showInputError("Necesitas ingresar tu clave de acceso!");
                        //this.fdc[input.name] = null;
                        return false;
                     }

                     var formData = new FormData();
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     formData.append('rut_usuario', self.auth.rut);
                     formData.append('clave_usuario', inputValue);

                     self.$http.post('/formulario/confirmar_confidencialidad_mujer_vih', formData).then(response => { // success callback
                        //console.log(response);
                        var rd = response.body.rd;
                        if (rd == true) {
                           swal("Gracias!", "Te recordamos que al ser información sensible solicitamos tomar con seriedad el ingreso de la información.");
                        }else{
                           self.fdc[input.name] = null;
                           swal({
                              title: "Advertencia",
                              text: "La clave ingresada es incorrecta.",
                              type: "warning",
                              confirmButtonClass: "btn-danger",
                              closeOnConfirm: false
                           });
                        }

                     }, response => { // error callback
                        //console.log(response);
                     });
                     return false;
                  });


                  /*
                  swal({
                     title: "",
                     text: "El rut ingresado ya existe.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  */
               }

               break;

            case 'edad_gestacional_ingreso_control_embarazo':
               if (parseInt(this.fdc[input.name])<0) {
                  this.fdc[input.name] = 0;
               }
               break;
            case 'embarazo_con_control_parental':
               if (this.fdc[input.name] == 'No' || this.fdc[input.name] == 'Desconocido') {
                  for (let i in this.inputs){
                     //Aqui agregar la validacion del bloque para que no se lo pase de largo
                     if (input.seccion == this.inputs[i].seccion && input.name != this.inputs[i].name) {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (input.seccion == this.inputs[i].seccion && input.name != this.inputs[i].name)

                     /*
                     &&
                        (
                           (this.inputs[i].name != 'resultado_dilucion_1_vdrl_embarazo' && this.inputs[i].name != 'fecha_1_vdrl_embarazo'
                           && this.inputs[i].name == 'eg_1_vdrl_embarazo' ||
                           this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ) &&
                           (this.inputs[i].name != 'resultado_dilucion_2_vdrl_embarazo' && this.inputs[i].name != 'fecha_2_vdrl_embarazo'
                           && this.inputs[i].name == 'eg_2_vdrl_embarazo' ||
                           this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ) &&
                           (this.inputs[i].name != 'resultado_dilucion_3_vdrl_embarazo' && this.inputs[i].name != 'fecha_3_vdrl_embarazo'
                           && this.inputs[i].name == 'eg_3_vdrl_embarazo' ||
                           this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo')

                        )
                     )*/
                     {
                        if (this.fdc['acepta_rechaza_toma_examen_vih'] == 'Acepta' ||
                        this.fdc['acepta_rechaza_toma_examen_vih'] == 'Rechaza' ||
                        this.fdc['acepta_rechaza_toma_examen_vih'] == null ||
                           (this.inputs[i].bloque == input.bloque /*&& this.fdc['acepta_rechaza_toma_examen_vih'] == 'Rechaza'*/) ) {
                           this.inputs[i].disabled = null;
                        }
                     }
                  }
               }

               break;
            case 'resultado_1_vdrl_embarazo':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){

                     if (this.fdc[input.name] == 'No Realizado') {
                        if (this.inputs[i].name == 'resultado_dilucion_1_vdrl_embarazo' ||
                           this.inputs[i].name == 'fecha_1_vdrl_embarazo' ||
                           this.inputs[i].name == 'eg_1_vdrl_embarazo') {
                           this.inputs[i].disabled = true;

                           if (this.fdc['fecha_1_vdrl_embarazo'] || this.fdc['eg_1_vdrl_embarazo']) {
                              swal({
                                 title: "Advertencia",
                                 text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                                 type: "warning",
                                 confirmButtonClass: "btn-danger",
                                 closeOnConfirm: false
                              });
                              this.fdc['fecha_1_vdrl_embarazo'] = null;
                              this.fdc['eg_1_vdrl_embarazo'] = null;
                           }

                        }
                     }else if (this.fdc[input.name] == 'No Reactivo') {
                        if (this.inputs[i].name == 'fecha_1_vdrl_embarazo' ||
                           this.inputs[i].name == 'eg_1_vdrl_embarazo') {
                           this.inputs[i].disabled = null;

                        }else {
                           if (this.inputs[i].name == 'resultado_dilucion_1_vdrl_embarazo') {
                              this.inputs[i].disabled = true;
                           }

                        }
                     }

                     this.fdc['resultado_dilucion_1_vdrl_embarazo'] = 'true';

                  }
               }
               else if (this.fdc[input.name] == 'Reactivo') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_1_vdrl_embarazo'
                        || this.inputs[i].name == 'fecha_1_vdrl_embarazo'
                        || this.inputs[i].name == 'eg_1_vdrl_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
               } else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_1_vdrl_embarazo'
                        || this.inputs[i].name == 'fecha_1_vdrl_embarazo'
                        || this.inputs[i].name == 'eg_1_vdrl_embarazo') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['acepta_rechaza_toma_examen_vih'] != 'Rechaza' &&
                  this.fdc['acepta_rechaza_toma_examen_vih'] != 'No Corresponde') {

                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante') {
                        this.fdc['derivada_a_especialidades_embarazo']=' ';
                        this.inputs[i].disabled = true;
                     }
                  }

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante' ) {
                        this.inputs[i].disabled = null;
                     }
                  }
                  swal({
                     title: "Advertencia",
                     text: "Marcó un resultado reactivo, señale si realizó derivación a especialidades",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }

               break;
            case 'resultado_2_vdrl_embarazo':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {



                  for (let i in this.inputs){

                     if (this.fdc[input.name] == 'No Realizado') {
                        if (this.inputs[i].name == 'resultado_dilucion_2_vdrl_embarazo' ||
                           this.inputs[i].name == 'fecha_2_vdrl_embarazo' ||
                           this.inputs[i].name == 'eg_2_vdrl_embarazo') {
                           this.inputs[i].disabled = true;

                           if (this.fdc['fecha_2_vdrl_embarazo'] || this.fdc['eg_2_vdrl_embarazo']) {
                              swal({
                                 title: "Advertencia",
                                 text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                                 type: "warning",
                                 confirmButtonClass: "btn-danger",
                                 closeOnConfirm: false
                              });
                              this.fdc['fecha_2_vdrl_embarazo'] = null;
                              this.fdc['eg_2_vdrl_embarazo'] = null;
                           }

                        }
                     }else if (this.fdc[input.name] == 'No Reactivo') {
                        if (this.inputs[i].name == 'fecha_2_vdrl_embarazo'||
                           this.inputs[i].name == 'eg_2_vdrl_embarazo') {
                           this.inputs[i].disabled = null;

                        }else {
                           if (this.inputs[i].name == 'resultado_dilucion_2_vdrl_embarazo') {
                              this.inputs[i].disabled = true;
                           }
                        }


                     }
                     this.fdc['resultado_dilucion_2_vdrl_embarazo'] = 'true';
                  }
               }
               else if (this.fdc[input.name] == 'Reactivo') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_2_vdrl_embarazo' ||
                        this.inputs[i].name == 'fecha_2_vdrl_embarazo'
                        || this.inputs[i].name == 'eg_2_vdrl_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_2_vdrl_embarazo' ||
                        this.inputs[i].name == 'fecha_2_vdrl_embarazo'
                        || this.inputs[i].name == 'eg_2_vdrl_embarazo') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['acepta_rechaza_toma_examen_vih'] != 'Rechaza' &&
                  this.fdc['acepta_rechaza_toma_examen_vih'] != 'No Corresponde') {

                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante') {
                        this.fdc['derivada_a_especialidades_embarazo']=' ';
                        this.inputs[i].disabled = true;
                     }
                  }

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante' ) {
                        this.inputs[i].disabled = null;
                     }
                  }
                  swal({
                     title: "Advertencia",
                     text: "Marcó un resultado reactivo, señale si realizó derivación a especialidades",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }

               break;
            case 'resultado_3_vdrl_embarazo':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){

                     if (this.fdc[input.name] == 'No Realizado') {
                        if (this.inputs[i].name == 'resultado_dilucion_3_vdrl_embarazo' ||
                           this.inputs[i].name == 'fecha_3_vdrl_embarazo' ||
                           this.inputs[i].name == 'eg_3_vdrl_embarazo') {
                           this.inputs[i].disabled = true;
                        }

                        if (this.fdc['fecha_3_vdrl_embarazo'] || this.fdc['eg_3_vdrl_embarazo']) {
                           swal({
                              title: "Advertencia",
                              text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                              type: "warning",
                              confirmButtonClass: "btn-danger",
                              closeOnConfirm: false
                           });
                           this.fdc['fecha_3_vdrl_embarazo'] = null;
                           this.fdc['eg_3_vdrl_embarazo'] = null;
                        }

                     }else if (this.fdc[input.name] == 'No Reactivo') {
                        if (this.inputs[i].name == 'fecha_3_vdrl_embarazo' ||
                           this.inputs[i].name == 'eg_3_vdrl_embarazo') {
                           this.inputs[i].disabled = null;

                        }else {
                           if (this.inputs[i].name == 'resultado_dilucion_3_vdrl_embarazo') {
                              this.inputs[i].disabled = true;
                           }
                        }

                     }
                     this.fdc['resultado_dilucion_3_vdrl_embarazo'] = 'true';
                  }
               }
               else if (this.fdc[input.name] == 'Reactivo') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_3_vdrl_embarazo' ||
                        this.inputs[i].name == 'fecha_3_vdrl_embarazo'
                        || this.inputs[i].name == 'eg_3_vdrl_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
               } else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_3_vdrl_embarazo' ||
                        this.inputs[i].name == 'fecha_3_vdrl_embarazo'
                        || this.inputs[i].name == 'eg_3_vdrl_embarazo') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['acepta_rechaza_toma_examen_vih'] != 'Rechaza' &&
                  this.fdc['acepta_rechaza_toma_examen_vih'] != 'No Corresponde') {

                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante') {
                        this.fdc['derivada_a_especialidades_embarazo']=' ';
                        this.inputs[i].disabled = true;
                     }
                  }

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante' ) {
                        this.inputs[i].disabled = null;
                     }
                  }
                  swal({
                     title: "Advertencia",
                     text: "Marcó un resultado reactivo, señale si realizó derivación a especialidades",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }

               break;
            case 'resultado_vdrl_periferico_recien_nacido':

               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){

                     if (this.fdc[input.name] == 'No Realizado') {
                        if (this.inputs[i].name == 'fecha_examen_vdrl_periferico_recien_nacido' ||
                           this.inputs[i].name == 'titulacion_vdrl_periferico_recien_nacido' /*||
                           this.inputs[i].name == 'resultado_citoquimico_liq_cefalo_raquideo' ||
                           this.inputs[i].name == 'resultado_radiografia_huesos_largos' ||
                           this.inputs[i].name == 'resultado_vdrl_liq_cefalo_recien_nacido'*/) {
                           this.inputs[i].disabled = true;
                        }
                     }else if (this.fdc[input.name] == 'No Reactivo') {
                        if (this.inputs[i].name == 'fecha_examen_vdrl_periferico_recien_nacido') {
                           this.inputs[i].disabled

                              = null;

                        }else {
                           if (this.inputs[i].name == 'titulacion_vdrl_periferico_recien_nacido' //||
                              //this.inputs[i].name == 'resultado_vdrl_periferico_recien_nacido' | |
                              //this.inputs[i].name == 'resultado_citoquimico_liq_cefalo_raquideo' ||
                              //this.inputs[i].name == 'resultado_radiografia_huesos_largos' ||
                              //this.inputs[i].name == 'resultado_vdrl_liq_cefalo_recien_nacido'
                           ) {
                              this.inputs[i].disabled = true;
                           }
                        }

                     }
                     this.fdc['titulacion_vdrl_periferico_recien_nacido'] = 'true';
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_examen_vdrl_periferico_recien_nacido' ||
                        this.inputs[i].name == 'titulacion_vdrl_periferico_recien_nacido' /*||
                        //this.inputs[i].name == 'resultado_vdrl_periferico_recien_nacido' ||
                        this.inputs[i].name == 'resultado_citoquimico_liq_cefalo_raquideo' ||
                        this.inputs[i].name == 'resultado_radiografia_huesos_largos' ||
                        this.inputs[i].name == 'resultado_vdrl_liq_cefalo_recien_nacido'*/) {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;

            case 'resultado_vdrl_liq_cefalo_recien_nacido':

               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado' || this.fdc[input.name] == 'Puncion Frustrada') {
                  for (let i in this.inputs){

                     if (this.fdc[input.name] == 'No Realizado' || this.fdc[input.name] == 'Puncion Frustrada') {
                        if (this.inputs[i].name == 'titulacion_vdrl_liq_cefalo_recien_nacido' /*||
                           this.inputs[i].name == 'fecha_examen_vdrl_liq_cefalo_recien_nacido' */) {
                           this.inputs[i].disabled = true;
                        }
                     }else if (this.fdc[input.name] == 'No Reactivo') {

                        if (this.inputs[i].name == 'fecha_examen_vdrl_liq_cefalo_recien_nacido') {
                           this.inputs[i].disabled = null;

                        }
                        else {
                           if (this.inputs[i].name == 'titulacion_vdrl_liq_cefalo_recien_nacido') {
                              this.inputs[i].disabled = true;
                           }
                        }

                     }
                     this.fdc['titulacion_vdrl_liq_cefalo_recien_nacido'] = 'true';
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_examen_vdrl_liq_cefalo_recien_nacido' ||
                        this.inputs[i].name == 'titulacion_vdrl_liq_cefalo_recien_nacido'
                        || this.inputs[i].name == 'resultado_vdrl_liq_cefalo_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;

            case 'acepta_rechaza_toma_examen_vih':

               if (this.fdc[input.name] == 'Rechaza' || this.fdc[input.name] == 'No Corresponde') {
                  for (let i in this.inputs){
                     //Aqui agregar la validacion del bloque para que no se lo pase de largo
                     /*if (input.bloque == this.inputs[i].bloque && input.name != this.inputs[i].name) {
                        this.inputs[i].disabled = true;
                     }*/
                     switch (this.inputs[i].id) {
                        case 'resultado_1_examen_vih_embarazo':
                        case 'fecha_1_examen_vih_embarazo':
                        case 'eg_1_examen_vih':
                        case 'resultado_2_examen_vih_embarazo':
                        case 'fecha_2_examen_vih_embarazo':
                        case 'eg_2_examen_vih':
                           this.inputs[i].disabled = true;
                           break;
                        case 'derivada_a_especialidades_embarazo':
                           this.inputs[i].disabled = null;
                           break;
                     }



                  }

               }
               else{
                  for (let i in this.inputs){
                     //Aqui agregar la validacion del bloque para que no se lo pase de largo
                     /*if (input.bloque == this.inputs[i].bloque && input.name != this.inputs[i].name) {
                        this.inputs[i].disabled = null;
                     }*/
                     switch (this.inputs[i].id) {
                        case 'resultado_1_examen_vih_embarazo':
                        case 'fecha_1_examen_vih_embarazo':
                        case 'eg_1_examen_vih':
                        case 'resultado_2_examen_vih_embarazo':
                        case 'fecha_2_examen_vih_embarazo':
                        case 'eg_2_examen_vih':
                           this.inputs[i].disabled = null;
                           break;
                        case 'derivada_a_especialidades_embarazo':
                           if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                              this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo') {
                              this.inputs[i].disabled = null;
                           }
                           break;
                     }


                  }

               }



               break;
            case 'resultado_1_examen_vih_embarazo':
               if (this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_1_examen_vih_embarazo' || this.inputs[i].name == 'eg_1_examen_vih') {
                        this.inputs[i].disabled = true;
                     }

                     if (this.fdc['fecha_1_examen_vih_embarazo'] || this.fdc['eg_1_examen_vih']) {
                        swal({
                           title: "Advertencia",
                           text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.fdc['eg_1_examen_vih'] = null;
                     }

                  }
               }
               else if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'Reactivo') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_1_examen_vih_embarazo' || this.inputs[i].name == 'eg_1_examen_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_1_examen_vih_embarazo' || this.inputs[i].name == 'eg_1_examen_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo') {

                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo') {
                        this.fdc['derivada_a_especialidades_embarazo']=' ';
                        this.inputs[i].disabled = true;
                     }
                  }

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
                  swal({
                     title: "Advertencia",
                     text: "Marcó un resultado reactivo, señale si realizó derivación a especialidades",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }

               break;
            case 'resultado_2_examen_vih_embarazo':
               if (this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_2_examen_vih_embarazo' || this.inputs[i].name == 'eg_2_examen_vih') {
                        this.inputs[i].disabled = true;
                     }

                     if (this.fdc['fecha_2_examen_vih_embarazo'] || this.fdc['eg_2_examen_vih']) {
                        swal({
                           title: "Advertencia",
                           text: "Si el resultado del examen es No Realizado, NO debe ir la Fecha ni Edad Gestacional ya que solo aplica para los resultados Reactivo y No Reactivo.",
                           type: "warning",
                           confirmButtonClass: "btn-danger",
                           closeOnConfirm: false
                        });
                        this.fdc['eg_2_examen_vih'] = null;
                     }
                  }
               }
               else if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'Reactivo') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_2_examen_vih_embarazo' || this.inputs[i].name == 'eg_2_examen_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               } else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_2_examen_vih_embarazo' || this.inputs[i].name == 'eg_2_examen_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['resultado_1_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_examen_vih_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_1_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_2_vdrl_embarazo'] != 'Reactivo' &&
                  this.fdc['resultado_3_vdrl_embarazo'] != 'Reactivo') {

                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo') {
                        this.fdc['derivada_a_especialidades_embarazo']=' ';
                        this.inputs[i].disabled = true;
                     }
                  }

               }else if (this.fdc['resultado_1_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_examen_vih_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_1_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_2_vdrl_embarazo'] == 'Reactivo' ||
                  this.fdc['resultado_3_vdrl_embarazo'] == 'Reactivo'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'derivada_a_especialidades_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
                  swal({
                     title: "Advertencia",
                     text: "Marcó un resultado reactivo, señale si realizó derivación a especialidades",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }

               break;


            //case 'anos_estudio':
            case 'escolaridad':
               $('.anos_estudio1').find('option').remove().end();
               $('.anos_estudio2').find('option').remove().end();
               switch (this.fdc[input.id]) {
                  case 'Ed. Basica':
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Ed. Media':
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Tecnico':
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Superior':
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  /*
                  default:
                     var i = -1;
                     do {
                        i++;
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                        $('.anos_estudio2').append($(o).html(i));
                     }while(false);
                     break;
                  */
               }

               $('.anos_estudio1').val(this.fdc['anos_estudio']);
               $('.anos_estudio2').val(this.fdc['anos_estudio']);
               break;
            /*
            case 'anos_estudio':
               $('.anos_estudio').val(this.fdc['anos_estudio']);
                break;
            */

            case 'nacidos_vivos_previos_embarazo':
            case 'nacidos_muertos_previos_embarazo':
            case 'abortos_previos_embarazo':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               if (parseInt(this.fdc[input.name]) > 10 || parseInt(this.fdc[input.name]) < 0) {
                  this.fdc[input.name] = 0;
               }
               break;


            case 'codigo_establecimiento':
               if (parseInt(this.fdc[input.name]) < 0) {
                  this.fdc[input.name] = 0;
               }
               break;

            case 'sifilis_previa_embarazo':
               if (this.fdc[input.name] == 'No') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'ano_sifilis_previa_embarazo') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'ano_sifilis_previa_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
                  if (this.fdc[input.name] == 'Si') {
                     swal({
                        title: "Advertencia",
                        text: `
                        Ahora, debe completar el año cuando se diagnosticó esta patología en "Año sífilis previo a este embarazo".
                     `,
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        closeOnConfirm: false
                     });
                  }
               }


               break;
            case 'ano_sifilis_previa_embarazo':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               var d = new Date();
               var y = d.getFullYear();
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > y || parseInt(this.fdc[input.name]) < 1920) {
                  this.fdc[input.name] = 0;
               }
               break;
            case 'numero_cd4_ingreso_control_prenatal':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > 9999) {
                  this.fdc[input.name] = null;
               }

               if (this.fdc['fecha_examen_linfocitos_cd4_ingreso_control_prenatal'] != null) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_cd4_ingreso_control_prenatal') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_cd4_ingreso_control_prenatal') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;
            case 'numero_carga_viral_control_prenatal':
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > 9999) {
                  this.fdc[input.name] = null;
               }else{
                  if (parseInt(this.fdc[input.name]) > 0) {
                     this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
                  }
               }

               if (this.fdc['fecha_examen_carga_viral_control_prenatal'] != null) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_carga_viral_control_prenatal') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_carga_viral_control_prenatal') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               break;

            case 'carga_viral_numero_copia_semana_34':
               if (parseInt(this.fdc[input.name]) < 0 || parseInt(this.fdc[input.name]) > 9999999) {
                  this.fdc[input.name] = 0;
               }else{
                  this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               }

               if (this.fdc['fecha_examen_carga_viral_semana_34'] != null) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'carga_viral_numero_copia_semana_34') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'carga_viral_numero_copia_semana_34') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;

            case 'resultado_vdrl_parto':
               if (this.fdc[input.name] == 'No Reactivo' || this.fdc[input.name] == 'No Realizado'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_vdrl_parto' /* ||
                        this.inputs[i].name == 'resultado_examen_treponemico_parto' ||
                        /*this.inputs[i].name == 'tratamiento_sifilis_parto'*/ ) {
                        this.inputs[i].disabled = true;
                     }
                  }
                  this.fdc['resultado_dilucion_vdrl_parto'] = 'true';
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'resultado_dilucion_vdrl_parto' /*||
                        this.inputs[i].name == 'resultado_examen_treponemico_parto' ||
                        this.inputs[i].name == 'tratamiento_sifilis_parto'*/ ) {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               break;
            case 'peso_mujer_parto':
               if (parseInt(this.fdc[input.name])>0) {
                  //this.fdc[input.name] = this.fdc[input.name].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  if (parseInt(this.fdc[input.name]) > 999) {
                     this.fdc[input.name] = 0;
                  }
                  /*
                  this.fdc[input.name] =
                     parseInt(this.fdc[input.name]) > 999 ?
                     (  parseInt(this.fdc[input.name])/1000).toFixed(1) + 'g' :
                        parseInt(this.fdc[input.name]).toFixed(1) + 'mg';
                  */
               }
               /*
               if(this.fdc['nombre_farmaco_1_vih'] != null && this.fdc['nombre_farmaco_1_vih'] != '' &&
                  this.fdc['peso_mujer_parto'] != null && this.fdc['peso_mujer_parto'] != '' &&
                  this.fdc['dosis_farmaco_1_vih'] != null && this.fdc['dosis_farmaco_1_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_1_vih'] != null && this.fdc['fecha_inicio_farmaco_1_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_1_vih'] != null && this.fdc['hora_inicio_farmaco_1_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               */
               break;
            case 'peso_recien_nacido':
               if (parseInt(this.fdc[input.name])>0) {
                  if (parseInt(this.fdc[input.name]) > 9999) {
                     this.fdc[input.name] = 0;
                  }
                  /*
                  else{
                     this.fdc[input.name] = this.fdc[input.name].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  }
                  */

               }else{
                  this.fdc[input.name] = 0;
               }
               break;
            case 'resultado_treponemico':
               if (this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_examen_treponemico' ||
                        this.inputs[i].name == 'diagnostico_sifilis_embarazo') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_examen_treponemico' ||
                        this.inputs[i].name == 'diagnostico_sifilis_embarazo') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               break;

            case 'diagnostico_sifilis_embarazo':
               if (this.fdc[input.name] == 'Sifilis Primaria' ||
                  this.fdc[input.name] == 'Sifilis Secundaria' ||
                  this.fdc[input.name] == 'Sifilis Latente Precoz' ||
                  this.fdc[input.name] == 'Sifilis Latente Tardia' ||
                  this.fdc[input.name] == 'Sifilis Sin Especificar' ) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'tratamiento_sifilis_farmaco' ||
                        this.inputs[i].name == 'tratamiento_sifilis_dosis' ||
                        this.inputs[i].name == 'tratamiento_sifilis_frecuencia' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante' ||
                        this.inputs[i].name == 'fecha_administracion_ult_dosis_penicilina_gestante') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'tratamiento_sifilis_farmaco' ||
                        this.inputs[i].name == 'tratamiento_sifilis_dosis' ||
                        this.inputs[i].name == 'tratamiento_sifilis_frecuencia' ||
                        this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante' ||
                        this.inputs[i].name == 'fecha_administracion_ult_dosis_penicilina_gestante') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;



            case 'numero_contactos_sexuales_declarados':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               if (parseInt(this.fdc[input.name])>=1){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_contactos_sexuales_estudiados' ||
                        this.inputs[i].name == 'numero_contactos_sexuales_tratados') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_contactos_sexuales_estudiados' ||
                        this.inputs[i].name == 'numero_contactos_sexuales_tratados') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (parseInt(this.fdc[input.name])<1) {
                  this.fdc[input.name] = null;
               }

               break;

            case 'numero_contactos_sexuales_estudiados':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               if (parseInt(this.fdc[input.name])<1) {
                  this.fdc[input.name] = null;
               }
               break;
            case 'numero_contactos_sexuales_tratados':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               if (parseInt(this.fdc[input.name])<1) {
                  this.fdc[input.name] = null;
               }
               break;

            case 'sustituto_leche_materna':

               if (this.fdc[input.name] == 'No') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_sustituto_leche_materna' ||
                        this.inputs[i].name == 'hora_inicio_sustituto_leche_materna' ||
                        this.inputs[i].name == 'entrega_sustituto_leche_materna_al_alta') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_sustituto_leche_materna' ||
                        this.inputs[i].name == 'hora_inicio_sustituto_leche_materna' ||
                        this.inputs[i].name == 'entrega_sustituto_leche_materna_al_alta') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }



               break;
            case 'nombre_farmaco_1_vih_recien_nacido':

               if (this.fdc[input.name] != null && this.fdc[input.name] != '') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_farmaco_1_vih_recien_nacido' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_1_vih_recien_nacido' ||
                        this.inputs[i].name == 'dosis_farmaco_1_vih_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_farmaco_1_vih_recien_nacido' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_1_vih_recien_nacido' ||
                        this.inputs[i].name == 'dosis_farmaco_1_vih_recien_nacido') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;

            case 'nombre_farmaco_2_vih_recien_nacido':

               if (this.fdc[input.name] != null && this.fdc[input.name] != '') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_farmaco_2_vih_recien_nacido' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_2_vih_recien_nacido' ||
                        this.inputs[i].name == 'dosis_farmaco_2_vih_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_farmaco_2_vih_recien_nacido' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_2_vih_recien_nacido' ||
                        this.inputs[i].name == 'dosis_farmaco_2_vih_recien_nacido') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;

            case 'tratamiento_recien_nacido_frecuencia':
               //this.fdc[input.name] = Math.round(parseInt(this.fdc[input.name]));
               if (parseInt(this.fdc[input.name]) > 99 || parseInt(this.fdc[input.name]) < 0) {
                  this.fdc[input.name] = 0;
               }
               break;

            case 'nombre_farmaco_1_vih':
               if (this.fdc[input.name]) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'peso_mujer_parto' ||
                        this.inputs[i].name == 'dosis_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'peso_mujer_parto' ||
                        this.inputs[i].name == 'dosis_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               /*
               if(this.fdc['nombre_farmaco_1_vih'] != null && this.fdc['nombre_farmaco_1_vih'] != '' &&
                  this.fdc['peso_mujer_parto'] != null && this.fdc['peso_mujer_parto'] != '' &&
                  this.fdc['dosis_farmaco_1_vih'] != null && this.fdc['dosis_farmaco_1_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_1_vih'] != null && this.fdc['fecha_inicio_farmaco_1_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_1_vih'] != null && this.fdc['hora_inicio_farmaco_1_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               */
               break;
            case 'dosis_farmaco_1_vih':/*

               if(this.fdc['nombre_farmaco_1_vih'] != null && this.fdc['nombre_farmaco_1_vih'] != '' &&
                  this.fdc['peso_mujer_parto'] != null && this.fdc['peso_mujer_parto'] != '' &&
                  this.fdc['dosis_farmaco_1_vih'] != null && this.fdc['dosis_farmaco_1_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_1_vih'] != null && this.fdc['fecha_inicio_farmaco_1_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_1_vih'] != null && this.fdc['hora_inicio_farmaco_1_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               */
               break;

            case 'fecha_inicio_farmaco_1_vih':
               /*
               if(this.fdc['nombre_farmaco_1_vih'] != null && this.fdc['nombre_farmaco_1_vih'] != '' &&
                  this.fdc['peso_mujer_parto'] != null && this.fdc['peso_mujer_parto'] != '' &&
                  this.fdc['dosis_farmaco_1_vih'] != null && this.fdc['dosis_farmaco_1_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_1_vih'] != null && this.fdc['fecha_inicio_farmaco_1_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_1_vih'] != null && this.fdc['hora_inicio_farmaco_1_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               */
               break;

            case 'hora_inicio_farmaco_1_vih':
               /*
               if(this.fdc['nombre_farmaco_1_vih'] != null && this.fdc['nombre_farmaco_1_vih'] != '' &&
                  this.fdc['peso_mujer_parto'] != null && this.fdc['peso_mujer_parto'] != '' &&
                  this.fdc['dosis_farmaco_1_vih'] != null && this.fdc['dosis_farmaco_1_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_1_vih'] != null && this.fdc['fecha_inicio_farmaco_1_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_1_vih'] != null && this.fdc['hora_inicio_farmaco_1_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_2_farmaco_1_vih' ||
                        this.inputs[i].name == 'fecha_2_inicio_farmaco_1_vih' ||
                        this.inputs[i].name == 'hora_2_inicio_farmaco_1_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               */
               break;


            case 'nombre_farmaco_2_vih':
               if (this.fdc[input.name]) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_farmaco_2_vih' ||
                        this.inputs[i].name == 'fecha_inicio_farmaco_2_vih' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_2_vih') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'dosis_farmaco_2_vih' ||
                        this.inputs[i].name == 'fecha_inicio_farmaco_2_vih' ||
                        this.inputs[i].name == 'hora_inicio_farmaco_2_vih') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               /*
               if(this.fdc['nombre_farmaco_2_vih'] != null && this.fdc['nombre_farmaco_2_vih'] != '' &&
                  this.fdc['dosis_farmaco_2_vih'] != null && this.fdc['dosis_farmaco_2_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_2_vih'] != null && this.fdc['fecha_inicio_farmaco_2_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_2_vih'] != null && this.fdc['hora_inicio_farmaco_2_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                        this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                        this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }*/
               break;

            case 'dosis_farmaco_2_vih':
               /*
               if(this.fdc['nombre_farmaco_2_vih'] != null && this.fdc['nombre_farmaco_2_vih'] != '' &&
                  this.fdc['dosis_farmaco_2_vih'] != null && this.fdc['dosis_farmaco_2_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_2_vih'] != null && this.fdc['fecha_inicio_farmaco_2_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_2_vih'] != null && this.fdc['hora_inicio_farmaco_2_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                        this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                        this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }*/
               break;

            case 'hora_inicio_farmaco_2_vih':
               /*
               if(this.fdc['nombre_farmaco_2_vi    h'] != null && this.fdc['nombre_farmaco_2_vih'] != '' &&
                  this.fdc['dosis_farmaco_2_vih'] != null && this.fdc['dosis_farmaco_2_vih'] != '' &&
                  this.fdc['fecha_inicio_farmaco_2_vih'] != null && this.fdc['fecha_inicio_farmaco_2_vih'] != '' &&
                  this.fdc['hora_inicio_farmaco_2_vih'] != null && this.fdc['hora_inicio_farmaco_2_vih'] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                        this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                        this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }*/
               break;

            case 'resultado_test_elisa_18_meses':
               if(this.fdc[input.name] == 'No Realizado'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_test_elisa_18_meses') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_test_elisa_18_meses') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               break;

            case 'resultado_final_isp_examen_vih_recien_nacido':
               if(this.fdc[input.name] == 'No Realizado'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_resultado_final_isp_examen_vih_recien_nacido') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_resultado_final_isp_examen_vih_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }
               break;
            case 'derivacion_recien_nacido_a_seguimiento':

               if(this.fdc[input.name] == 'No'){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'lugar_derivacion_recien_nacido_a_seguimiento' ||
                        this.inputs[i].name == 'fecha_ingreso_control_recien_nacido_post_nacimiento') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'lugar_derivacion_recien_nacido_a_seguimiento' ||
                        this.inputs[i].name == 'fecha_ingreso_control_recien_nacido_post_nacimiento') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;

            case 'tratamiento_recien_nacido_farmaco':

               if(this.fdc[input.name] != null && this.fdc[input.name] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'tratamiento_recien_nacido_dosis' ||
                        this.inputs[i].name == 'tratamiento_recien_nacido_frecuencia') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'tratamiento_recien_nacido_dosis' ||
                        this.inputs[i].name == 'tratamiento_recien_nacido_frecuencia') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;



            case 'estado_recien_nacido':
               if (this.fdc[input.name] == 'Muerto') {
                  for (let i in this.inputs) {
                     if (this.inputs[i].bloque == input.bloque && this.inputs[i].name != input.name) {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else {
                  for (let i in this.inputs) {
                     if (
                        this.inputs[i].bloque == input.bloque && this.inputs[i].name != input.name
                     ) {
                        /*
                         (
                         this.inputs[i].name != 'fecha_inicio_sustituto_leche_materna' &&
                         this.inputs[i].name != 'hora_inicio_sustituto_leche_materna' &&
                         this.inputs[i].name != 'fecha_1_examen_pcr_recien_nacido' &&
                         this.inputs[i].name != 'fecha_2_examen_pcr_recien_nacido' &&
                         this.inputs[i].name != 'fecha_3_examen_pcr_recien_nacido' &&
                         (
                         this.fdc['resultado_1_examen_pcr_recien_nacido'] == 'No Realizado' ||
                         this.fdc['resultado_2_examen_pcr_recien_nacido'] == 'No Realizado' ||
                         this.fdc['resultado_3_examen_pcr_recien_nacido'] == 'No Realizado'
                         )

                         )
                        */
                        this.inputs[i].disabled = null;

                     }
                  }
               }
               break;


            case 'nombre_farmaco_suspencion_lactancia':

               if(this.fdc[input.name] != null && this.fdc[input.name] != ''){
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               break;
            case 'resultado_1_examen_pcr_recien_nacido':
               if (this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_1_examen_pcr_recien_nacido') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_1_examen_pcr_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;


            case 'resultado_2_examen_pcr_recien_nacido':
               if (this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_2_examen_pcr_recien_nacido') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_2_examen_pcr_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;


            case 'resultado_3_examen_pcr_recien_nacido':
               if (this.fdc[input.name] == 'No Realizado') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_3_examen_pcr_recien_nacido') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_3_examen_pcr_recien_nacido') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;
            case 'resultado_examen_vih_parto':
               if (this.fdc[input.name] == 'No Realizado' || this.fdc[input.name] == 'No Reactivo'
                  || this.fdc[input.name] == 'No Corresponde') {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'tratamiento_retroviral_parto') {
                        this.inputs[i].disabled = true;
                     }
                  }
                  this.fdc['tratamiento_retroviral_parto'] = 'true';
               }
               else {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'tratamiento_retroviral_parto') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }

               break;


            case 'terapia_antiretroviral_farmaco_1':
               if (this.fdc[input.name]) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_1') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_1') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               break;

            case 'terapia_antiretroviral_tar_farmaco_2':
               if (this.fdc[input.name]) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_2') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_2') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               break;

            case 'terapia_antiretroviral_tar_farmaco_3':
               if (this.fdc[input.name]) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_3') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_3') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }
               break;


            default:




               break;
         }



         //Validaciones latentes
         /*
         if (
            (this.fdc['resultado_1_vdrl_embarazo'] == 'No Reactivo' || this.fdc['resultado_1_vdrl_embarazo'] == 'No Realizado') &&
            (this.fdc['resultado_2_vdrl_embarazo'] == 'No Reactivo' || this.fdc['resultado_2_vdrl_embarazo'] == 'No Realizado') &&
            (this.fdc['resultado_3_vdrl_embarazo'] == 'No Reactivo' || this.fdc['resultado_3_vdrl_embarazo'] == 'No Realizado')
         ) {
            for (let i in this.inputs){
               if (this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante') {
                  this.inputs[i].disabled = true;
               }
            }
         }
         else{
            for (let i in this.inputs){
               if (this.inputs[i].name == 'fecha_administracion_1_dosis_penicilina_gestante') {
                  this.inputs[i].disabled = null;
               }
            }
         }
         */

         if (
            (this.fdc['resultado_1_vdrl_embarazo'] == 'No Reactivo' || this.fdc['resultado_1_vdrl_embarazo'] == 'No Realizado') &&
            (this.fdc['resultado_2_vdrl_embarazo'] == 'No Reactivo' || this.fdc['resultado_2_vdrl_embarazo'] == 'No Realizado') &&
            (this.fdc['resultado_3_vdrl_embarazo'] == 'No Reactivo' || this.fdc['resultado_3_vdrl_embarazo'] == 'No Realizado') &&
            (this.fdc['resultado_1_examen_vih_embarazo'] == 'No Reactivo' || this.fdc['resultado_1_examen_vih_embarazo'] == 'No Realizado') &&
            (this.fdc['resultado_2_examen_vih_embarazo'] == 'No Reactivo' || this.fdc['resultado_2_examen_vih_embarazo'] == 'No Realizado')
         ){
            /*
            for (let i in this.inputs){
               if (this.inputs[i].name == 'derivada_a_especialidades_embarazo') {
                  this.inputs[i].disabled = true;
               }
            }
            */
         }
         else{
            /*
            for (let i in this.inputs){
               if (this.inputs[i].name == 'derivada_a_especialidades_embarazo') {
                  this.inputs[i].disabled = null;
               }
            }
            */
         }


      },

      verifica_validacion_click: function (input) {
         switch (input.id) {

            case 'pais_origen':
               break;

            //case 'anos_estudio':
            case 'escolaridad':
               $('.anos_estudio1').find('option').remove().end();
               $('.anos_estudio2').find('option').remove().end();
               switch (this.fdc[input.id]) {
                  case 'Ed. Basica':
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=8;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Ed. Media':
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=4;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Tecnico':
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=3;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  case 'Superior':
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                     }
                     for (var i = 1;i<=7;i++) {
                        var o = new Option(i,i);
                        $('.anos_estudio2').append($(o).html(i));
                     }
                     break;
                  default:
                     var i = -1;
                     do {
                        i++;
                        var o = new Option(i,i);
                        $('.anos_estudio1').append($(o).html(i));
                        $('.anos_estudio2').append($(o).html(i));
                     }while(false);
                     break;
               }
               $('.anos_estudio1').val(this.fdc['anos_estudio']);
               $('.anos_estudio2').val(this.fdc['anos_estudio']);
               break;

         }
      },

      verifica_validacion_blur: function (input) {

         for (let i in this.inputs){
            //this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóúscript;:\#\,\.\;\:ÑÍÉÓÁÚ@_]/g, '');
            this.fdc[input.name] = this.fdc[input.name].replace(/[^a-zA-Z0-9\s\-ñíéáóú\#\,\.\:ÑÍÉÓÁÚ@_]/g, '');
         }

         switch (input.id) {

            case 'fecha_nacimiento_madre':
               var date = this.fdc[input.name].split('-');
               var ano_tope = new Date();
               ano_tope = ano_tope.getFullYear();
               var ano = date[0];
               var mes = date[1];
               var dia = date[2];
               if (parseInt(ano)<1930) {
                  ano = 1930;
                  this.fdc[input.name] = `${ano}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }else if(parseInt(ano)>ano_tope) {
                  this.fdc[input.name] = `${ano_tope}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
               }
               break;

            case 'fecha_parto':
               var date = this.fdc[input.name].split('-');
               var ano_tope = new Date();
               ano_tope = ano_tope.getFullYear();
               var ano = date[0];
               var mes = date[1];
               var dia = date[2];
               if (parseInt(ano)<2016) {
                  ano = 2016;
                  this.fdc[input.name] = `${ano}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido (Desde 01 de enero del 2016).",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }else if(parseInt(ano)>ano_tope) {
                  this.fdc[input.name] = `${ano_tope}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }

               if (date=="") {
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese una fecha válida.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }
               break;

            case 'fecha_ingreso_control_prenatal_embarazo':
            case 'fecha_ultima_regla_gestacional':
            case 'fecha_ultima_regla_operacional':
            case 'fecha_1_vdrl_embarazo':
            case 'fecha_2_vdrl_embarazo':
            case 'fecha_3_vdrl_embarazo':
            case 'fecha_administracion_1_dosis_penicilina_gestante':
            case 'fecha_1_examen_vih_embarazo':
            case 'fecha_2_examen_vih_embarazo':
            case 'fecha_ingreso_control_unidad_alto_riesgo':
            case 'fecha_ingreso_unacess':
            case 'fecha_ingreso_control_otras_especialidades':
            case 'fecha_examen_treponemico':
            case 'fecha_administracion_ult_dosis_penicilina_gestante':
            case 'fecha_ingreso_control_centro_atencion_vih':
            case 'fecha_examen_linfocitos_cd4_ingreso_control_prenatal':
            case 'fecha_examen_carga_viral_control_prenatal':
            case 'fecha_examen_carga_viral_semana_34':
            case 'fecha_inicio_tar_farmaco_1':
            case 'fecha_inicio_tar_farmaco_2':
            case 'fecha_inicio_tar_farmaco_3':
            case 'fecha_2_inicio_farmaco_1_vih':
            case 'fecha_administracion_farmaco_suspencion_lactancia':
            case 'fecha_nacimiento_recien_nacido':
            case 'fecha_examen_vdrl_periferico_recien_nacido':
            case 'fecha_examen_vdrl_liq_cefalo_recien_nacido':
            case 'fecha_examen_treponemico_recien_nacido':
            case 'fecha_inicio_sustituto_leche_materna':
            case 'fecha_1_examen_pcr_recien_nacido':
            case 'fecha_2_examen_pcr_recien_nacido':
            case 'fecha_3_examen_pcr_recien_nacido':
            case 'fecha_test_elisa_18_meses':
            case 'fecha_resultado_final_isp_examen_vih':
            case 'fecha_resultado_final_isp_examen_vih_recien_nacido':
            case 'fecha_inicio_farmaco_1_vih_recien_nacido':
            case 'fecha_inicio_farmaco_2_vih_recien_nacido':
            case 'fecha_inicio_farmaco_2_vih':
            case 'fecha_ingreso_control_recien_nacido_post_nacimiento':
               var date = this.fdc[input.name].split('-');
               var ano_tope = new Date();
               ano_tope = ano_tope.getFullYear();
               var ano = date[0];
               var mes = date[1];
               var dia = date[2];
               if (parseInt(ano)<2000) {
                  ano = 2000;
                  this.fdc[input.name] = `${ano}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }else if(parseInt(ano)>ano_tope) {
                  this.fdc[input.name] = `${ano_tope}-${mes}-${dia}`;
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese un año válido.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }

               if (date=="") {
                  swal({
                     title: "Advertencia",
                     text: "Por favor ingrese una fecha válida.",
                     type: "warning",
                     confirmButtonClass: "btn-danger",
                     closeOnConfirm: false
                  });
                  this.fdc[input.name] = null;
               }

               for (let i in this.inputs){
                  switch (this.inputs[i].name) {
                     case 'fecha_1_vdrl_embarazo':
                     case 'fecha_2_vdrl_embarazo':
                     case 'fecha_3_vdrl_embarazo':
                     case 'fecha_1_examen_vih_embarazo':
                     case 'fecha_2_examen_vih_embarazo':
                        var fecha_vdrl = moment(this.fdc[this.inputs[i].name]);
                        var fecha_parto = moment(this.fdc['fecha_parto']);
                        //console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
                        //console.log(fecha_parto.diff(fecha_vdrl, 'days'));
                        if (fecha_parto.diff(fecha_vdrl, 'days') != NaN) {
                           if (fecha_parto.diff(fecha_vdrl, 'days') > 300) {
                              swal({
                                 title: "Advertencia",
                                 text: "La diferencia de dias excede los 300 dias antes del parto.",
                                 type: "warning",
                                 confirmButtonClass: "btn-danger",
                                 closeOnConfirm: false
                              });
                              this.fdc[this.inputs[i].name] = null
                           }else if (fecha_parto.diff(fecha_vdrl, 'days') < 0){
                              swal({
                                 title: "Advertencia",
                                 text: "La fecha no puede ser mayor a la fecha de parto.",
                                 type: "warning",
                                 confirmButtonClass: "btn-danger",
                                 closeOnConfirm: false
                              });
                              this.fdc[this.inputs[i].name] = null
                           }
                        }
                        break;
                  }
               }

               if (this.fdc['fecha_examen_linfocitos_cd4_ingreso_control_prenatal'] != null) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_cd4_ingreso_control_prenatal') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_cd4_ingreso_control_prenatal') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['fecha_examen_carga_viral_control_prenatal'] != null) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_carga_viral_control_prenatal') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'numero_carga_viral_control_prenatal') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['fecha_examen_carga_viral_semana_34'] != null) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'carga_viral_numero_copia_semana_34') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'carga_viral_numero_copia_semana_34') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }



               if (this.fdc['terapia_antiretroviral_farmaco_1']) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_1') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_1') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['terapia_antiretroviral_tar_farmaco_2']) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_2') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_2') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }

               if (this.fdc['terapia_antiretroviral_tar_farmaco_3']) {
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_3') {
                        this.inputs[i].disabled = null;
                     }
                  }
               }else{
                  for (let i in this.inputs){
                     if (this.inputs[i].name == 'fecha_inicio_tar_farmaco_3') {
                        this.inputs[i].disabled = true;
                     }
                  }
               }


               if (this.fdc['fecha_inicio_farmaco_2_vih']) {
                  /*
                  if(this.fdc['nombre_farmaco_2_vih'] != null && this.fdc['nombre_farmaco_2_vih'] != '' &&
                     this.fdc['dosis_farmaco_2_vih'] != null && this.fdc['dosis_farmaco_2_vih'] != '' &&
                     this.fdc['fecha_inicio_farmaco_2_vih'] != null && this.fdc['fecha_inicio_farmaco_2_vih'] != '' &&
                     this.fdc['hora_inicio_farmaco_2_vih'] != null && this.fdc['hora_inicio_farmaco_2_vih'] != ''){
                     for (let i in this.inputs){
                        if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                           this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                           this.inputs[i].disabled = null;
                        }
                     }
                  }
                  else{
                     for (let i in this.inputs){
                        if (this.inputs[i].name == 'nombre_farmaco_suspencion_lactancia' ||
                           this.inputs[i].name == 'fecha_administracion_farmaco_suspencion_lactancia') {
                           this.inputs[i].disabled = true;
                        }
                     }
                  }*/
               }



               break;



         }
      },

      buscar_formulario: function () {
         this.show_modal_buscar_formulario = true;
      },

      crear_nuevo_formulario: function () {
         this.renderizar_formulario();
         this.formularioNuevoActivo = true;
         this.show_modal_formularios_encontrados = false;

         var self = this;
         setTimeout(function () {
            swal({
               title: "Atencion",
               text: `
               Se está creando un nuevo formulario sin problemas

               El número correlativo es el: ${self.fdc.n_correlativo_interno}
            `,
               type: "success",
               confirmButtonClass: "btn-success",
               closeOnConfirm: false
            });
         }, 1500);

         /*
         if (this.formularioNuevoActivo == false) {
            this.renderizar_formulario();
            this.formularioNuevoActivo = true;
         }else{
            this.fdc = this.formularioActivoObj;
            swal({
               title: "Advertencia",
               text: "Ya se está creando un nuevo formulario.",
               type: "warning",
               confirmButtonClass: "btn-danger",
               closeOnConfirm: false
            });
         }
         */
      },

      fetch_formulario: function () {
         this.$http.get('/formulario/create').then(response => { // success callback
            this.instructions = response.body.instructions;
            this.auth = response.body.auth;

            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            this.$http.post('/formulario/desmarcar_registro_form_deis').then(response => { // success callback
               //console.log(response);
            }, response => { // error callback
               //console.log(response);
            });

            /*
            if (this.auth && this.auth.mensajes_informativos != 'true') {
               var self = this;
               swal({
                  title: "Información sobre Mantenimiento del Sitio",
                  text: `
                     Estimado usuario, le informamos que la plataforma se encontrará en mantención los dias Martes y Jueves entre 18:00 y 18:30 horas, al aceptar este mensaje, queda en conformidad de que el usuario no deberá ingresar en ese horario a la plataforma de transmisión vertical.
                     `,
                  closeOnConfirm: true,
                  confirmButtonText: 'Si, acepto',
               }, function (isConfirm) {

                  //alert(isConfirm);
                  if (isConfirm == true) {
                     swal.close();

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     self.$http.post('/formulario/confirmar_mensaje_informativo').then(response => { // success callback
                        //console.log(response);

                     }, response => { // error callback
                        //console.log(response);
                     });
                  }else{
                     return ;
                  }
               });
            }
            */

            if (this.auth && this.auth.acepta_terminos != 'true') {
               var self = this;
               swal({
                  title: "Términos y condiciones de uso",
                  text: `
                     Al ingresar y o realizar cualquier operación de tratamiento de datos en esta base de datos declaro que tengo conocimiento que el artículo 7 de la ley 19628 dispone que  “Las personas que trabajan en el tratamiento de datos personales, tanto en organismos públicos como privados, están obligadas a guardar secreto sobre los mismos, cuando provengan o hayan sido recolectados de fuentes no accesibles al público, como asimismo sobre los demás datos y antecedentes relacionados con el banco de datos, obligación que no cesa por haber terminado sus actividades en ese campo”. Asimismo, declaro que tengo conocimiento de que los datos que se tratan en este sistema son “datos sensibles” y por tanto los datos de este sistema sólo podrán ser tratados dentro de las finalidades que se declaran.

                     Adicionalmente, si de acuerdo a mis funciones no me corresponde tener acceso a esta información, me hago responsable de notificar inmediatamente al administrador (cperedo@minsal.cl o gberrios@minsal.cl), sin perjuicio de cancelar los datos que se me hayan comunicado por error.
                     `,
                  closeOnConfirm: true,
                  confirmButtonText: 'Si, acepto',
               }, function (isConfirm) {

                  //alert(isConfirm);
                  if (isConfirm == true) {
                     swal.close();

                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

                     self.$http.post('/formulario/confirmar_confidencialidad_usuario').then(response => { // success callback
                        //console.log(response);
                        var rd = response.body.rd;
                        if (rd == true) {
                           swal("Gracias!", "Te recordamos que al ser información sensible solicitamos tomar con seriedad el ingreso de la información.");
                        }

                     }, response => { // error callback
                        //console.log(response);
                     });
                  }else{
                     return ;
                  }
               });
            }

         }, response => { // error callback
            //console.log('Error fetch_formulario: '+response);
         });

         return;
      },

      guardar_formulario: function (tabName) {
         //Condicionales previas, preventivas al guardado.
         if (this.formulario_guardandose == false) {
            this.formulario_guardandose = true;


            if (tabName == 'patologias_sifilis' &&
               !this.fdc['diagnostico_sifilis_embarazo'] &&
               this.fdc['diagnostico_sifilis_embarazo'] == null) {
               swal({
                  title: "Advertencia",
                  text: `
                  El formulario no se podrá guardar hasta que el dato "Diagnostico de sífilis al embarazo" no esté ingresado, por favor ingrese la información y guarde el formulario.
               `,
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               this.formulario_guardandose = false;
               return;
            }



            this.mini_loader = true;
            //this.spinner_finalizar = true;
            var formData = new FormData();
            //var formData = [];
            var permiteGuardar = false;
            //console.log(tabName);
            for (let i in this.inputs) {
               if (this.inputs[i].seccion == tabName) {

                  if (this.inputs[i].name == 'lugar_control_prenatal' ||
                     this.inputs[i].name == 'lugar_atencion_parto' ||
                     this.inputs[i].name == 'lugar_control_embarazo' ||
                     this.inputs[i].name == 'establecimiento_control_sifilis' ||
                     this.inputs[i].name == 'establecimiento_control_vih' ||
                     this.inputs[i].name == 'atencion_parto'
                  ) {
                     this.fdc[this.inputs[i].name] = $(`#${this.inputs[i].name}`).val();
                  }

                  if (this.fdc[this.inputs[i].name] != null ) {
                     //Le pasa el valor en v-model

                     if (this.inputs[i].name == 'run_madre' || this.inputs[i].name == 'run_recien_nacido') {
                        this.fdc[this.inputs[i].name] = clean(this.fdc[this.inputs[i].name]);
                     }

                     formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name]);
                  }
               }
            }

            if (!this.fdc.id || this.fdc.id == null || this.fdc.id == undefined) {
               this.formulario_guardandose = false;
               return false;
            }

            Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
            formData.append('_id_formulario', this.fdc.id);

            this.$http.post('/formulario', formData).then(response => { // success callback
               //console.log(response.status);

               //alert('Guardado');

               //Si guardar salio bien
               this.hayGuardadoActivo = true;
               this.idFormularioActivo = this.fdc.id;
               $('.circle-loader').toggleClass('load-complete');
               $('.checkmark').toggle();
               this.mini_loader = false;
               swal("Guardado", "El registro se guardó correctamente!", "success");
               this.formulario_guardandose = false;
            }, response => { // error callback
               //console.log(response);
               this.check_status_code(response.status);
               this.formulario_guardandose = false;
            });

         }else{
            alert(`
               Espere por favor, el formulario se encuentra ocupado guardando otra ficha.
               Vuelva a intentar en 10 segundos.
            `);
         }


         return;
      },

      guardar_formulario_completo: function () {
         //Carga el loader
         this.mini_loader = true;
         //this.spinner_finalizar = true;
         //Crea objeto de parametros
         var formData = new FormData();
         //Variable de control de flujo
         var permiteGuardar = false;

         //Ciclo para validar los campos que requieren filtrado previo
         //Guardado especial por plugin select2
         for (let i in this.inputs) {
            if (this.inputs[i].name == 'lugar_control_prenatal' ||
               this.inputs[i].name == 'lugar_atencion_parto' ||
               this.inputs[i].name == 'lugar_control_embarazo' ||
               this.inputs[i].name == 'establecimiento_control_sifilis' ||
               this.inputs[i].name == 'establecimiento_control_vih' ||
               this.inputs[i].name == 'atencion_parto'
            ) {
               this.fdc[this.inputs[i].name] = $(`#${this.inputs[i].name}`).val();
            }

            if (this.fdc[this.inputs[i].name] != null ) {
               //Le pasa el valor en v-model
               if (this.inputs[i].name == 'run_madre' || this.inputs[i].name == 'run_recien_nacido') {
                  this.fdc[this.inputs[i].name] = clean(this.fdc[this.inputs[i].name]);
               }
               formData.append(this.inputs[i].name, this.fdc[this.inputs[i].name]);
            }
         }

         if (!this.fdc.id || this.fdc.id == null || this.fdc.id == undefined) {
            return false;
         }

         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
         formData.append('_id_formulario', this.fdc.id);

         this.$http.post('/formulario', formData).then(response => { // success callback
            //console.log(response.status);

            //alert('Guardado');
            this.buscar_formulario();
            //Si guardar salio bien
            this.hayGuardadoActivo = true;
            this.idFormularioActivo = this.fdc.id;
            $('.circle-loader').toggleClass('load-complete');
            $('.checkmark').toggle();
            this.mini_loader = false;
            /*
            swal("Guardado", `
               El registro se ha guardado automáticamente con éxito.

               Recuerda que el registro se guarda cada 5 minutos.
            `, "success");
            */

         }, response => { // error callback
            //console.log(response);
            this.check_status_code(response.status);
         });



         return;
      },

      inputInArray: function (input, array) {

         return ($.inArray(input.type, array) == -1) ? false : true;
      },

      renderizar_solo_inputs: function () {
         this.$http.get('/formulario/inputs_formulario').then(response => { // success callback
            this.inputs = response.body.inputs;
            this.nav_tab_form_deis = response.body.nav_tab_form_deis;
            this.deis_form_table_options = response.body.deis_form_table_options;
            this.pais_origen = response.body.pais_origen;
            this.auth = response.body.auth;
            this.validar_validaciones_previas();

            //Generamos limpieza de los campos con el plugin
            $('#select2-establecimiento_control_sifilis-container').val(null).empty();
            $('#select2-establecimiento_control_vih-container').val(null).empty();
            $('#select2-lugar_control_prenatal-container').val(null).empty();
            $('#select2-lugar_control_embarazo-container').val(null).empty();
            $('#select2-lugar_atencion_parto-container').val(null).empty();

            //Validacion para mostrar los datos en los campos select
            for (let i in this.inputs) {

               switch (this.inputs[i].name) {


                  case 'lugar_control_prenatal':
                     $('#select2-lugar_control_prenatal-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'lugar_atencion_parto':
                     $('#select2-lugar_atencion_parto-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'lugar_control_embarazo':
                     $('#select2-lugar_control_embarazo-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'establecimiento_control_sifilis':
                     $('#select2-establecimiento_control_sifilis-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;
                  case 'establecimiento_control_vih':
                     $('#select2-establecimiento_control_vih-container').text(
                        this.deis_form_table_options[this.inputs[i].name][this.fdc[this.inputs[i].name]]
                     );
                     break;

               }
               /*
                if (this.inputs[i].name == 'lugar_control_prenatal' ||
                this.inputs[i].name == 'lugar_atencion_parto' ||
                this.inputs[i].name == 'lugar_control_embarazo' ||
                this.inputs[i].name == 'establecimiento_control_sifilis' ||
                this.inputs[i].name == 'establecimiento_control_vih' ||
                this.inputs[i].name == 'atencion_parto'
                ) {
                if (this.fdc[this.inputs[i].name]) {
                $(`#${this.inputs[i].name}`).val(this.fdc[this.inputs[i].name]);
                }
                }
                */
            }

         }, response => { // error callback
            //console.log('Error datos_formulario: '+response);
         });
      },

      renderizar_formulario: function () {
         this.$http.get('/formulario/datos_formulario').then(response => { // success callback
            this.inputs = response.body.inputs;

            //Generamos limpieza de los campos con el plugin
            $('#select2-establecimiento_control_sifilis-container').val(null).empty();
            $('#select2-establecimiento_control_vih-container').val(null).empty();
            $('#select2-lugar_control_prenatal-container').val(null).empty();
            $('#select2-lugar_control_embarazo-container').val(null).empty();
            $('#select2-lugar_atencion_parto-container').val(null).empty();


            this.nav_tab_form_deis = response.body.nav_tab_form_deis;
            this.deis_form_table_options = response.body.deis_form_table_options;
            this.pais_origen = response.body.pais_origen;
            this.fdc = response.body.fdc;
            this.fdc_temp = response.body.fdc;

            this.formularioActivoObj = response.body.fdc;
            this.auth = response.body.auth;
            this.validar_validaciones_previas();


            /*
            //NO es necesario al crear un nuevo formulario, ya que solo se debe manejar el control sobre el edit
            if (this.fdc != null) {
               var formData = new FormData();
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               formData.append('n_correlativo_interno', this.fdc.n_correlativo_interno);

               this.$http.post('/formulario/marcar_registro_form_deis', formData).then(response => { // success callback
                  this.fdc = response.body.fdc;
                  //console.log(response);
               }, response => { // error callback
                  //console.log(response);
               });
            }
            */


         }, response => { // error callback
            //console.log('Error datos_formulario: '+response);
         });




      },

      validar_validaciones_previas: function () {
         for (let i in this.inputs) {
            this.verifica_validacion_change(this.inputs[i]);
         }
      },

   },
});

const ListaController = new Vue({



});
