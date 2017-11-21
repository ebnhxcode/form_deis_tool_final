import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { _ , range } from 'lodash';
import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';

//const { validate, clean, format } = require('rut.js')
import { validate, clean, format } from 'rut.js';

// Add locale helper.
Validator.addLocale(es);

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
   locale: 'es'
});

const AdminUsuarios = new Vue({
   el: '#AdminUsuarios',
   data(){
      return {
         'users':[],
         'filterTerm':'',
         'userEditId':'',

         'mostrar_input_password':false,
         'mini_loader_visible':false,
         'btn_procesar_clave':true,
         'btn_generar_clave':false,
         'btn_finalizar':false,

         'mostrar_modal_nuevo_usuario': false,
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
      'loader': {
         props: [''],
         'name': 'loader',
         'template':`<div class="loader">Loading...</div>`,
         data () {
            return {
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
                   :max-length="max_length!=''?max_length:25"
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
      'modal_procesar_json':{
         props: ['json'],
         template:`
            <!-- <script type="text/x-template"> -->
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

                                 <div class="table-responsive" style="overflow-y: scroll;max-height: 400px;">
                                    <table class="table table-striped small">
                                       <thead>
                                       <tr>
                                          <th>Acción</th>
                                          <th>type</th>
                                          <th>id</th>
                                          <th>name</th>
                                          <th>value</th>
                                          <th>max_length</th>
                                          <th>placeholder</th>
                                          <th>required</th>
                                          <th>class</th>
                                          <th>style</th>
                                          <th>bloque</th>
                                          <th>seccion</th>
                                          <th>class_custom</th>
                                          <th>label</th>
                                          <th>tag</th>
                                          <th>subtag</th>
                                          <th>empty_column</th>
                                          <th>order</th>
                                       </tr>
                                       </thead>
                                       <tbody>

                                       <tr v-for="input in json">
                                          <td>
                                             <button v-if="editBy!=input.id" class="btn btn-sm btn-primary" @click.prevent="edit(input.id)">
                                                <i class="fa fa-pencil"></i>
                                             </button>
                                             <button v-else class="btn btn-sm btn-success" @click.prevent="save(input)">
                                                <i class="fa fa-check"></i>
                                             </button>
                                          </td>
                                          <td>
                                             {{input.type}}
                                             <span></span>
                                             <span></span>
                                          </td>
                                          <td>
                                             {{input.id}}
                                          </td>
                                          <td>
                                             {{input.name}}
                                          </td>
                                          <td>
                                             {{input.value}}
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.max_length}}</span>
                                             <input v-else type="number" class="form-control" v-model="input.max_length">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.placeholder}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.placeholder">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.required}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.required">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.class}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.class">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.style}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.style">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.bloque}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.bloque">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.seccion}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.seccion">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.class_custom}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.class_custom">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.label}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.label">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.tag}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.tag">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.subtag}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.subtag">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.empty_column}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.empty_column">
                                          </td>
                                          <td>
                                             <span v-if="editBy != input.id">{{input.order}}</span>
                                             <input v-else type="text" class="form-control" v-model="input.order">
                                          </td>
                                       </tr>



                                       </tbody>
                                    </table>
                                 </div>

                                 <!--
                                  <dl class="dl-vertical">
                                    <div class="row">
                                       <div style="overflow-y: scroll;max-height: 400px;">

                                          <div class="col-md-6">
                                             <dt></dt>
                                             <dd class="well well-sm"></dd>
                                          </div>
                                          <div class="col-md-6">
                                             <dt></dt>
                                             <dd class="well well-sm"></dd>
                                          </div>

                                       </div>
                                    </div>
                                 </dl>
                                 -->
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
            <!-- </script> -->
         `,
         name: 'modal_procesar_json',
         data () {
            return {
               'editBy':'',
            }
         },
         ready () {
         },
         created () {
         },
         methods: {
            edit: function (input_id_directive) {
               this.editBy = input_id_directive;
            },
            save: function (input) {
               Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
               this.$http.put('/input/'+input.id_input, input).then(response => { // success callback
                  //console.log(response);
                  this.editBy = '';
                  return response.body.input;
               }, response => { // error callback
                  console.log(response);
               });
            },
         },
         watch: {
         },
      },
      'modal-nuevousuario':{
         props: [''],
         template: `
			   <!-- template for the modal component -->
			   <transition name="modal">
				   <div class="modal-mask">
					   <div class="modal-wrapper">
					      <div class="modal-container">

						      <div class="modal-header">
							      <slot name="header"></slot>
						      </div><!-- .modal-header -->

						      <div class="modal-body">
							      <slot name="body">

                              <!-- ################################################# -->
                              <!-- Modal con el inicio del panel con tabs - nav-tabs -->
                              <!-- ################################################# -->

                              <div id="" class="panel with-nav-tabs panel-primary">

                                 <div class="panel-heading" style="border-bottom:0px;">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs" role="tablist">
                                       <li role="presentation" class="active">
                                          <a href="#nuevoUsuario" aria-controls="nuevoUsuario" role="tab" data-toggle="tab">
                                             Nuevo Usuario
                                          </a>
                                       </li>
                                    </ul>
                                 </div><!-- .panel-heading -->

                                 <!-- ########## -->
                                 <!-- Tabs Panes -->
                                 <!-- ########## -->

                                 <div class="panel-body">
                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                       <div role="tabpanel" class="tab-pane fade in active" id="nuevoUsuario">

                                          <!-- dl : structure -->
                                          <dl class="dl-vertical" style="margin: 20px;">
                                             <div class="row">
                                                <div style="overflow-y: scroll;max-height: 400px;">
                                                   <div class="col-md-12">



                                                      <dt>Observaciones de CGR (Nombre del Hallazgo) (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <input name="name" rows="3"
                                                                      v-model="user.name"
                                                                      :class="{'input': true, 'text-danger': errors.has('nombre_hallazgo_contraloria'),
                                                                      'scroll_textarea_original':true}"
                                                                      v-validate="'required'" data-vv-delay="500">
                                                               @{{ user.name}}
                                                            </textarea>
                                                            <transition name="bounce">
                                                            <i v-show="errors.has('nombre_hallazgo_contraloria')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('nombre_hallazgo_contraloria')" class="text-danger">
                                                               {{ errors.first('nombre_hallazgo_contraloria') | replaceNombreHallazgoContraloria }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>
                                                   </div><!-- .col-md-12 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : criticidad -->

                                                      <dt>Seleccione el nivel de criticidad (*):</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="criticidad"
                                                                     v-model="nuevo_hallazgo.criticidad"
                                                                     v-validate="'required'" data-vv-delay="500"
                                                                     :class="{'input': true, 'text-danger': errors.has('criticidad'), 'form-control':true}">
                                                               <option v-for="c in criticidad" :value="c">{{c}}</option>
                                                            </select>

                                                            <transition name="bounce">
                                                            <i v-show="errors.has('criticidad')" class="fa fa-warning"></i>
                                                            </transition>
                                                            <transition name="bounce">
                                                            <span v-show="errors.has('criticidad')" class="text-danger">
                                                               {{ errors.first('criticidad') }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>
                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : id_clasificacion_materia -->

                                                      <dt>Clasificacion Materia: (*)</dt>
                                                      <dd>
                                                         <p class="control has-icon has-icon-right">
                                                            <select name="id_clasificacion_materia" id="id_clasificacion_materia"
                                                                    v-model="nuevo_hallazgo.id_clasificacion_materia"
                                                                    v-validate="'required'" data-vv-delay="500"
                                                                    :class="{'input': true, 'text-danger': errors.has('id_clasificacion_materia'), 'form-control':true}">
                                                               <option v-for="(cm,i) in clasificacion_materia" :value="cm.id_clasificacion_materia">
                                                                  {{ cm.clasificacion_materia }}
                                                               </option>
                                                            </select>

                                                            <transition name="bounce">
                                                               <i v-show="errors.has('id_clasificacion_materia')" class="fa fa-warning"></i>
                                                            </transition>

                                                            <transition name="bounce">
                                                            <span v-show="errors.has('id_clasificacion_materia')" class="text-danger">
                                                               {{ errors.first('id_clasificacion_materia') | replaceClasificacionMateria }}
                                                            </span>
                                                            </transition>
                                                         </p>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : materia_observacion -->

                                                      <dt>Materia de Observacion:</dt>
                                                      <dd>
                                                            <textarea name="materia_observacion" rows="2"
                                                                      v-model="nuevo_hallazgo.materia_observacion"
                                                                      class="scroll_textarea_original">
                                                               @{{ nuevo_hallazgo.materia_observacion }}
                                                            </textarea>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-6">

                                                      <!-- Field : recomendacion -->

                                                      <dt>Redacte recomendacion:</dt>
                                                      <dd>
                                                         <textarea name="recomendacion" rows="2"
                                                                   v-model="nuevo_hallazgo.recomendacion"
                                                                   class="scroll_textarea_original">
                                                            @{{ nuevo_hallazgo.recomendacion }}
                                                         </textarea>
                                                      </dd>

                                                   </div><!-- .col-md-6 -->
                                                   <div class="col-md-12">
                                                      <br />
                                                      <button @click.prevent="guardar_nuevo_hallazgo" class="btn btn-sm btn-success pull-left"
                                                         v-if="button_guardar_hallazgo == true">
                                                         Guardar hallazgo
                                                      </button>
                                                   </div><!-- .col-md-12 -->

                                                </div><!-- styled -->
                                             </div><!-- .row -->
                                          </dl><!-- .dl-vertical styled margin:20 -->
                                       </div><!-- .tab-pane .fade .in .active #datosGenerales -->


                                 </div><!-- .panel-body -->
                              </div><!-- panel -->

							      </slot>
						      </div>

						      <div class="modal-footer">
							      <slot name="footer">
                              <!--
                              <button class="btn btn-sm btn-success" @click="$emit('close')">
                                 Aceptar
                              </button>
                              -->
                              Los campos con <b>*</b> son obligatorios
                           </slot>
                        </div>
					      </div>
					   </div>
				   </div>
			   </transition>
			`,
         name: 'modal-nuevohallazgo',
         data () {
            return {
               'instruyeProcedimientoDisciplinario':false,
               'permite_guardar_nuevo_hallazgo': true,
               'permite_guardar_nuevo_procedimiento_disciplinario': true,
               'button_guardar_hallazgo': true,
               'form_hpd':0,
               'permiteGuardarHpd':true,
            }
         },
         ready () {
         },
         created () {
         },
         filters: {
            replaceNombreHallazgoContraloria(nombre_hallazgo_contraloria) {
               if (nombre_hallazgo_contraloria != null) {nombre_hallazgo_contraloria =
                  nombre_hallazgo_contraloria.replace('nombre_hallazgo_contraloria', 'para el nombre del hallazgo');}
               return nombre_hallazgo_contraloria;
            },
            replaceMateriaObservacion(materia_observacion) {
               if (materia_observacion != null) {materia_observacion =
                  materia_observacion.replace('materia_observacion', 'materia observacion');}
               return materia_observacion;
            },
            replaceProcedimientoDisciplinario: function (procedimiento_disciplinario) {
               if (procedimiento_disciplinario != null) {procedimiento_disciplinario =
                  procedimiento_disciplinario.replace('procedimiento_disciplinario', 'procedimiento disciplinario');}
               return procedimiento_disciplinario;
            },
            replaceTipoProcesoDisciplinario: function (id_tipo_proceso_disciplinario) {
               if (id_tipo_proceso_disciplinario != null) {id_tipo_proceso_disciplinario =
                  id_tipo_proceso_disciplinario.replace('id_tipo_proceso_disciplinario', 'tipo proceso disciplinario');}
               return id_tipo_proceso_disciplinario;
            },
            replaceEstadoProcesoDisciplinario: function (id_estado_proceso_disciplinario) {
               if (id_estado_proceso_disciplinario != null) {id_estado_proceso_disciplinario =
                  id_estado_proceso_disciplinario.replace('id_estado_proceso_disciplinario', 'estado proceso disciplinario');}
               return id_estado_proceso_disciplinario;
            },
            replaceResponsableProcesoDisciplinario: function (id_responsable_proceso_disciplinario) {
               if (id_responsable_proceso_disciplinario != null) {id_responsable_proceso_disciplinario =
                  id_responsable_proceso_disciplinario.replace('id_responsable_proceso_disciplinario', 'responsable proceso disciplinario');}
               return id_responsable_proceso_disciplinario;
            },
            replaceClasificacionMateria: function (id_clasificacion_materia) {
               if (id_clasificacion_materia != null) {id_clasificacion_materia =
                  id_clasificacion_materia.replace('id_clasificacion_materia', 'clasificacion materia');}
               return id_clasificacion_materia;
            },
         },
         methods: {
            cambiar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario){
               //this.form_hallazgo_editable = (this.form_hallazgo_editable == false ? true : false);
               return this.form_hpd = id_hallazgo_contraloria_procedimiento_disciplinario;
            },
            changeProcedimientoDisciplinario: function () {

               if (this.nuevo_hallazgo.nombre_hallazgo_contraloria == '' ||
                  this.nuevo_hallazgo.criticidad == '' ||
                  this.nuevo_hallazgo.id_clasificacion_materia == '') {
                  alert('No se puede asignar un procedimiento hasta que complete los campos requeridos.');
                  $('#procedimiento_disciplinario').prop('checked', false);
                  return ;
               }else{
                  //this.$parent.$options.methods.guardar_nuevo_hallazgo();
                  if (this.permite_guardar_nuevo_hallazgo == true) {
                     this.button_guardar_hallazgo = false;
                     this.guardar_nuevo_hallazgo();
                  }
                  return ;
               }
            },
            findHallazgoProcedimientoDisciplinarioById: function (items, id) {
               //hpd.id_hallazgo_contraloria_procedimiento_disciplinario
               for (var i in items) {
                  if (items[i].id_hallazgo_contraloria_procedimiento_disciplinario==id) {
                     return items[i];
                  }
               }
               return null;
            },
            guardar_form_hpd: function(id_hallazgo_contraloria_procedimiento_disciplinario,index){
               //return this.form_hpd = 0;
               if(this.form_hpd != 0 && id_hallazgo_contraloria_procedimiento_disciplinario != 0){
                  this.$validator.validateAll().then(result => {});
                  if (this.permiteGuardarHpd == true){
                     this.permiteGuardarHpd = false;
                     var hpd =
                        this.findHallazgoProcedimientoDisciplinarioById(
                           this.hallazgo_procedimientos_disciplinarios,
                           id_hallazgo_contraloria_procedimiento_disciplinario
                        );

                     if (hpd.id_tipo_proceso_disciplinario != '' &&
                        hpd.id_estado_proceso_disciplinario != '' &&
                        hpd.id_responsable_proceso_disciplinario != '' &&
                        hpd.observaciones != '' ){

                        //Lo guarda, verifica si los datos del objeto que son necesarios son iguales, sino que no lo guarde
                        Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                        this.$http.put('/hallazgo_contraloria/update/procedimiento_disciplinario', hpd).then(response => {
                           //console.log(response.body);
                           this.form_hpd = 0;
                           //this.showModalEditarHallazgo = false;
                           //this.permiteGuardarHallazgo = true;
                           var self = this;
                           setTimeout(() => {
                              self.$parent.fetchHallazgos();
                              self.permiteGuardarHpd = true;
                           }, 500);

                        }, response => {
                           // error callback
                        });


                     }else{
                        this.permiteGuardarHpd = true;
                     }
                  }else{
                     alert('Se esta procesando la solicitud');
                  }
               }

               /*else if (this.form_hallazgo_editable != 0 && id_hallazgo_contraloria != 0 && index == 0) {
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                this.hallazgo = gcf.findHallazgoById(this.hallazgos, id_hallazgo_contraloria);
                this.$http.put('/hallazgo_contraloria/'+id_hallazgo_contraloria, this.hallazgo).then(response => {
                //console.log(response.body);
                this.form_hallazgo_editable = 0;
                var self = this;
                setTimeout(() => {
                self.fetchHallazgos();
                }, 1000);

                }, response => {
                // error callback
                });

                }*/
            },
            guardar_nuevo_hallazgo: function (){
               //this.$validator.validateAll().then(result => {});
               if (this.permite_guardar_nuevo_hallazgo == true){
                  this.permite_guardar_nuevo_hallazgo = false;
                  if (this.nuevo_hallazgo.nombre_hallazgo_contraloria != '' &&
                     this.nuevo_hallazgo.criticidad != '' &&
                     this.nuevo_hallazgo.id_clasificacion_materia != ''
                  ) {

                     if (this.nuevo_hallazgo.procedimiento_disciplinario == false) {
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'No';
                        this.nuevo_hallazgo.id_tipo_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_estado_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_responsable_proceso_disciplinario = 0;
                     }else{
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'Si';
                     }

                     //console.log(this.nuevo_hallazgo);
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     this.$http.post('/hallazgo_contraloria', this.nuevo_hallazgo).then(response => {
                        //agregar al final
                        //this.permite_guardar_nuevo_procedimiento_disciplinario = true;

                        this.form_hallazgo_editable = 0;
                        this.hallazgos.push(response.body);
                        this.nuevo_hallazgo.id_hallazgo_contraloria = response.body.id_hallazgo_contraloria;

                        var self = this;
                        setTimeout(function() {
                           //self.$parent.$options.methods.fetchHallazgos();
                           //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                           self.$parent.fetchHallazgos();
                           if (self.button_guardar_hallazgo == true) {
                              //this.navigate(1);
                              self.nuevo_hallazgo = {};
                              self.$parent.limpiarNuevoHallazgo();
                              self.$parent.showModalNuevoHallazgo = false;
                           }else{
                              //Cuando guarda hallazgo y asocia o quiere asociar un procedimiento disciplinario

                              self.nuevo_hallazgo.procedimiento_disciplinario =
                                 self.instruyeProcedimientoDisciplinario =
                                    (self.instruyeProcedimientoDisciplinario == false) ? true : false;

                              self.button_guardar_hallazgo = false;
                           }
                        }, 500);
                     }, response => {/*·*/});
                  }else{
                     this.permite_guardar_nuevo_hallazgo = true;
                  }
               }else{
                  //alert('Se esta procesando la solicitud');
               }
            },
            guardar_nuevo_procedimiento_disciplinario: function () {
               this.$validator.validateAll().then(result => {});
               if (this.permite_guardar_nuevo_procedimiento_disciplinario == true){
                  this.permite_guardar_nuevo_procedimiento_disciplinario = false;
                  if (
                     this.nuevo_hallazgo.procedimiento_disciplinario == true &&
                     this.nuevo_hallazgo.id_tipo_proceso_disciplinario != '' &&
                     this.nuevo_hallazgo.id_estado_proceso_disciplinario != '' &&
                     this.nuevo_hallazgo.id_responsable_proceso_disciplinario != '' &&
                     this.nuevo_hallazgo.id_hallazgo_contraloria != '' &&
                     this.nuevo_hallazgo.id_contraloria != '' &&
                     this.nuevo_hallazgo.observaciones != '' && this.nuevo_hallazgo.observaciones != null
                  ) {

                     if (this.nuevo_hallazgo.procedimiento_disciplinario == false) {
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'No';
                        this.nuevo_hallazgo.id_tipo_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_estado_proceso_disciplinario = 0;
                        this.nuevo_hallazgo.id_responsable_proceso_disciplinario = 0;
                     }else{
                        this.nuevo_hallazgo.procedimiento_disciplinario = 'Si';
                     }

                     //console.log(this.nuevo_hallazgo);
                     Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
                     this.$http.post('/hallazgo_contraloria/store/procedimiento_disciplinario', this.nuevo_hallazgo).then(response => {

                        this.form_hallazgo_editable = 0;
                        this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                        this.hallazgo_procedimientos_disciplinarios.push(response.body);
                        this.hallazgo_historico_procedimientos_disciplinarios.push(response.body);
                        var self = this;
                        setTimeout(function() {
                           //self.$parent.$options.methods.fetchHallazgos();
                           //Cuando guarda hallazgo sin asociar procedimiento disciplinario
                           self.$parent.fetchHallazgos();
                           self.nuevo_hallazgo.procedimiento_disciplinario = true;
                           self.nuevo_hallazgo.id_tipo_proceso_disciplinario = '';
                           self.nuevo_hallazgo.id_estado_proceso_disciplinario = '';
                           self.nuevo_hallazgo.id_responsable_proceso_disciplinario = '';
                           self.nuevo_hallazgo.observaciones = '';

                        }, 500);

                     }, response => {});
                  }else{
                     this.permite_guardar_nuevo_procedimiento_disciplinario = true;
                  }
               }else{
                  //alert('Se esta procesando la solicitud');
               }
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
      this.fetchAdminUsuarios();

      /*
       $(document).ready( function () {
       $('#toggle').click(function() {
       $('.circle-loader').toggleClass('load-complete');
       $('.checkmark').toggle();
       });
       });
       */
   },
   ready: {},
   filters: {
   },
   methods: {
      sendEmailPasswordReset: function (email) {
         var formData = new FormData();
         formData.append('email', email);
         formData.append('_token', $('#_token').val());
         formData.append('token', $('#_token').val());
         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.post('/password/email', formData).then(response => { // success callback
            console.log(response);

            if (response.status == 200) {
               swal("Enviado", `Se ha enviado el correo de creacion de claves al siguiente usuario: ${email}`, "success");
            }


         }, response => { // error callback
            console.log('Error saveUser: ' + response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }
         });
      },

      editUser: function (id) {
         this.userEditId = id;
      },
      saveUser: function (user) {
         this.userEditId=null;
         var formData = new FormData();
         formData.append('id', user.id);//formData.append('_token', $('#_token').val());
         formData.append('name', user.name);//formData.append('_token', $('#_token').val());
         formData.append('email', user.email);
         formData.append('position', user.position);
         formData.append('establecimiento', user.establecimiento);
         formData.append('rut', user.rut);
         formData.append('telefono', user.telefono);
         formData.append('clave_electronica', user.clave_electronica);
         //formData.append('id_role', user.id_role);
         formData.append('confirmado_llave_secreta', user.confirmado_llave_secreta);
         formData.append('acepta_terminos', user.acepta_terminos);


         Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();

         this.$http.post('/admin/guardar_usuario', formData).then(response => { // success callback
            console.log(response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }

         }, response => { // error callback
            console.log('Error saveUser: ' + response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }
         });

      },
      //camelCase() => for specific functions
      fetchAdminUsuarios: function () {
         this.$http.get('/admin/mant_usuarios_data').then(response => { // success callback
            console.log(response);
            this.users = response.body.users;
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "success",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }

         }, response => { // error callback
            console.log('Error fetchAdminUsuarios: ' + response);
            if (response.status == 500) {
               swal({
                  title: "Atencion",
                  text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
                  type: "warning",
                  confirmButtonClass: "btn-danger",
                  closeOnConfirm: false
               });
               window.location.href = '/login';
            }
         });

         return;
      },
   }
});