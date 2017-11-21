<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDeisLogSeguimientoVih extends Model
{
   #protected $dateFormat = 'Y-m-d H:i:s+';
   protected $primaryKey = 'id';
   protected $table = 'form_deis_log_seguimiento_vih';
   protected $fillable = [

      'abortos_previos_embarazo',
      'acepta_rechaza_toma_examen_vih',
      'adicciones',
      'ano_sifilis_previa_embarazo',
      'anos_estudio',
      'carga_viral_numero_copia_ingreso_control_prenatal',
      'carga_viral_numero_copia_semana_34',
      'codigo_establecimiento',
      'codigo_establecimiento_control_prenatal_embarazo',
      'codigo_recien_nacido',
      'created_at',
      'derivacion_recien_nacido_a_seguimiento',
      'derivada_a_especialidades_embarazo',
      'diagnostico_final_sifilis_recien_nacido',
      'diagnostico_final_vih_isp_recien_nacido',
      'diagnostico_sifilis_embarazo',
      'digito_verificador',
      'digito_verificador_recien_nacido',
      'dosis_2_farmaco_1_vih',
      'dosis_farmaco_1_vih',
      'dosis_farmaco_1_vih_recien_nacido',
      'dosis_farmaco_2_vih',
      'dosis_farmaco_2_vih_recien_nacido',
      'edad',
      'edad_gestacional_ingreso_control_embarazo',
      'eg_1_examen_vih',
      'eg_1_vdrl_embarazo',
      'eg_2_vdrl_embarazo',
      'eg_2_examen_vih',
      'eg_3_vdrl_embarazo',
      'eg_pediatrica',
      'embarazo_con_control_parental',
      'entrega_sustituto_leche_materna_al_alta',
      'escolaridad',
      'estado_civil',
      'estado_form_deis',
      'estado_clinico_recien_nacido',
      'estado_recien_nacido',
      'estado_seguimiento_12_meses',
      'estado_seguimiento_18_meses',
      'estado_seguimiento_3_meses',
      'estado_seguimiento_6_meses',
      'estado_seguimiento_mes',
      'fecha_1_examen_pcr_recien_nacido',
      'fecha_1_examen_vih_embarazo',
      'fecha_1_vdrl_embarazo',
      'fecha_2_examen_pcr_recien_nacido',
      'fecha_2_examen_vih_embarazo',
      'fecha_2_inicio_farmaco_1_vih',
      'fecha_2_vdrl_embarazo',
      'fecha_3_examen_pcr_recien_nacido',
      'fecha_3_vdrl_embarazo',
      'fecha_administracion_1_dosis_penicilina_gestante',
      'fecha_administracion_farmaco_suspencion_lactancia',
      'fecha_administracion_ult_dosis_penicilina_gestante',
      'fecha_confirmacion_isp_vih_responde_si',
      'fecha_examen_carga_viral_control_prenatal',
      'fecha_examen_carga_viral_semana_34',
      'fecha_examen_linfocitos_cd4_ingreso_control_prenatal',
      'fecha_examen_treponemico',
      'fecha_examen_treponemico_recien_nacido',
      'fecha_examen_vdrl_liq_cefalo_recien_nacido',
      'fecha_examen_vdrl_periferico_recien_nacido',
      'fecha_ingreso_control_centro_atencion_vih',
      'fecha_ingreso_control_otras_especialidades',
      'fecha_ingreso_control_otras_especialidades_otro',
      'fecha_ingreso_control_prenatal_embarazo',
      'fecha_ingreso_control_recien_nacido_post_nacimiento',
      'fecha_ingreso_control_unidad_alto_riesgo',
      'fecha_ingreso_unacess',
      'fecha_inicio_farmaco_1_vih',
      'fecha_inicio_farmaco_1_vih_recien_nacido',
      'fecha_inicio_farmaco_2_vih',
      'fecha_inicio_farmaco_2_vih_recien_nacido',
      'fecha_inicio_sustituto_leche_materna',
      'fecha_inicio_tar_farmaco_1',
      'fecha_inicio_tar_farmaco_2',
      'fecha_inicio_tar_farmaco_3',
      'fecha_nacimiento_madre',
      'fecha_nacimiento_recien_nacido',
      'fecha_parto',
      'fecha_resultado_final_isp_examen_vih',
      'fecha_resultado_final_isp_examen_vih_recien_nacido',
      'fecha_test_elisa_18_meses',
      'fecha_ultima_regla_gestacional',
      'fecha_ultima_regla_operacional',
      'hora_2_inicio_farmaco_1_vih',
      'hora_inicio_farmaco_1_vih',
      'hora_inicio_farmaco_1_vih_recien_nacido',
      'hora_inicio_farmaco_2_vih',
      'hora_inicio_farmaco_2_vih_recien_nacido',
      'hora_inicio_sustituto_leche_materna',
      'hora_nacimiento_recien_nacido',
      'hora_parto',
      'id',
      'id_region',
      'id_servicio_salud',
      'lugar_atencion_parto',
      'lugar_control_prenatal',
      'lugar_control_prenatal_otro',
      'lugar_derivacion_recien_nacido_a_seguimiento',
      'mujer_continua_tratamiento_antiretroviral',
      'mujer_es_vih_positivo',
      'n_correlativo_interno',
      'nacidos_muertos_previos_embarazo',
      'nacidos_vivos_previos_embarazo',
      'nacionalidad',
      'nombre_establecimiento_sin_codigo',
      'nombre_farmaco_1_vih',
      'nombre_farmaco_1_vih_recien_nacido',
      'nombre_farmaco_2_vih',
      'nombre_farmaco_2_vih_recien_nacido',
      'nombre_farmaco_suspencion_lactancia',
      'nombres_madre',
      'numero_carga_viral_control_prenatal',
      'numero_cd4_ingreso_control_prenatal',
      'numero_contactos_sexuales_declarados',
      'numero_contactos_sexuales_estudiados',
      'numero_contactos_sexuales_tratados',
      'otra_its_previa_embarazo',
      'pasaporte_provisorio',
      'pais_origen',
      'pareja_vih_positivo',
      'peso_mujer_parto',
      'peso_recien_nacido',
      'prevision_madre',
      'primer_apellido_madre',
      'pueblos_indigenas',
      'residencia_gestante',
      'resultado_1_examen_pcr_recien_nacido',
      'resultado_1_examen_vih_embarazo',
      'resultado_1_vdrl_embarazo',
      'resultado_2_examen_pcr_recien_nacido',
      'resultado_2_examen_vih_embarazo',
      'resultado_2_vdrl_embarazo',
      'resultado_3_examen_pcr_recien_nacido',
      'resultado_3_vdrl_embarazo',
      'resultado_citoquimico_liq_cefalo_raquideo',
      'resultado_dilucion_1_vdrl_embarazo',
      'resultado_dilucion_2_vdrl_embarazo',
      'resultado_dilucion_3_vdrl_embarazo',
      'resultado_dilucion_vdrl_parto',
      'resultado_estudio_placentario',
      'resultado_examen_treponemico_parto',
      'resultado_examen_treponemico_parto_madre',
      'resultado_examen_vih_parto',
      'resultado_final_isp_examen_vih',
      'resultado_final_isp_examen_vih_recien_nacido',
      'resultado_radiografia_huesos_largos',
      'resultado_test_elisa_18_meses',
      'resultado_treponemico',
      'resultado_vdrl_liq_cefalo_recien_nacido',
      'resultado_vdrl_parto',
      'resultado_vdrl_periferico_recien_nacido',
      'run_madre',
      'run_recien_nacido',
      'segundo_apellido_madre',
      'sexo_recien_nacido',
      'sifilis_previa_embarazo',
      'sustituto_leche_materna',
      'terapia_antiretroviral_farmaco_1',
      'terapia_antiretroviral_tar_farmaco_2',
      'terapia_antiretroviral_tar_farmaco_3',
      'terapia_antiretroviral_tar_farmaco_3_otro',
      'tipo_de_convivencia',
      'tipo_establecimiento',
      'tipo_establecimiento_control_prenatal_embarazo',
      'tipo_parto',
      'titulacion_vdrl_liq_cefalo_recien_nacido',
      'titulacion_vdrl_periferico_recien_nacido',
      'tratamiento_recien_nacido_dosis',
      'tratamiento_recien_nacido_farmaco',
      'tratamiento_recien_nacido_frecuencia',
      'tratamiento_retroviral_parto',
      'tratamiento_sifilis_dosis',
      'tratamiento_sifilis_farmaco',
      'tratamiento_sifilis_frecuencia',
      'tratamiento_sifilis_parto',
      'updated_at',
      'usuario_modifica_form_deis',
      'via_parto',
      'vih_conocido_previa_embarazo'

      /*
      'abortos_previos_embarazo',
      'acepta_rechaza_toma_examen_vih',
      'adicciones',
      'ano_sifilis_previa_embarazo',
      'anos_estudio',
      'carga_viral_numero_copia_ingreso_control_prenatal',
      'carga_viral_numero_copia_semana_34',
      'codigo_establecimiento',
      'codigo_establecimiento_control_prenatal_embarazo',
      'codigo_recien_nacido',
      'created_at',
      'derivacion_recien_nacido_a_seguimiento',
      'derivada_a_especialidades_embarazo',
      'diagnostico_final_sifilis_recien_nacido',
      'diagnostico_final_vih_isp_recien_nacido',
      'diagnostico_sifilis_embarazo',
      'digito_verificador',
      'digito_verificador_recien_nacido',
      'dosis_2_farmaco_1_vih',
      'dosis_farmaco_1_vih',
      'dosis_farmaco_1_vih_recien_nacido',
      'dosis_farmaco_2_vih',
      'dosis_farmaco_2_vih_recien_nacido',
      'edad',
      'edad_gestacional_ingreso_control_embarazo',
      'eg_1_examen_vih',
      'eg_1_vdrl_embarazo',
      'eg_2_vdrl_embarazo',
      'eg_2_examen_vih',
      'eg_3_vdrl_embarazo',
      'eg_pediatrica',
      'embarazo_con_control_parental',
      'entrega_sustituto_leche_materna_al_alta',
      'escolaridad',
      'estado_civil',
      'estado_form_deis',
      'estado_clinico_recien_nacido',
      'estado_recien_nacido',
      'estado_seguimiento_12_meses',
      'estado_seguimiento_18_meses',
      'estado_seguimiento_3_meses',
      'estado_seguimiento_6_meses',
      'estado_seguimiento_mes',
      'fecha_1_examen_pcr_recien_nacido',
      'fecha_1_examen_vih_embarazo',
      'fecha_1_vdrl_embarazo',
      'fecha_2_examen_pcr_recien_nacido',
      'fecha_2_examen_vih_embarazo',
      'fecha_2_inicio_farmaco_1_vih',
      'fecha_2_vdrl_embarazo',
      'fecha_3_examen_pcr_recien_nacido',
      'fecha_3_vdrl_embarazo',
      'fecha_administracion_1_dosis_penicilina_gestante',
      'fecha_administracion_farmaco_suspencion_lactancia',
      'fecha_administracion_ult_dosis_penicilina_gestante',
      'fecha_confirmacion_isp_vih_responde_si',
      'fecha_examen_carga_viral_control_prenatal',
      'fecha_examen_carga_viral_semana_34',
      'fecha_examen_linfocitos_cd4_ingreso_control_prenatal',
      'fecha_examen_treponemico',
      'fecha_examen_treponemico_recien_nacido',
      'fecha_examen_vdrl_liq_cefalo_recien_nacido',
      'fecha_examen_vdrl_periferico_recien_nacido',
      'fecha_ingreso_control_centro_atencion_vih',
      'fecha_ingreso_control_otras_especialidades',
      'fecha_ingreso_control_otras_especialidades_otro',
      'fecha_ingreso_control_prenatal_embarazo',
      'fecha_ingreso_control_recien_nacido_post_nacimiento',
      'fecha_ingreso_control_unidad_alto_riesgo',
      'fecha_ingreso_unacess',
      'fecha_inicio_farmaco_1_vih',
      'fecha_inicio_farmaco_1_vih_recien_nacido',
      'fecha_inicio_farmaco_2_vih',
      'fecha_inicio_farmaco_2_vih_recien_nacido',
      'fecha_inicio_sustituto_leche_materna',
      'fecha_inicio_tar_farmaco_1',
      'fecha_inicio_tar_farmaco_2',
      'fecha_inicio_tar_farmaco_3',
      'fecha_nacimiento_madre',
      'fecha_nacimiento_recien_nacido',
      'fecha_parto',
      'fecha_resultado_final_isp_examen_vih',
      'fecha_resultado_final_isp_examen_vih_recien_nacido',
      'fecha_test_elisa_18_meses',
      'fecha_ultima_regla_gestacional',
      'fecha_ultima_regla_operacional',
      'hora_2_inicio_farmaco_1_vih',
      'hora_inicio_farmaco_1_vih',
      'hora_inicio_farmaco_1_vih_recien_nacido',
      'hora_inicio_farmaco_2_vih',
      'hora_inicio_farmaco_2_vih_recien_nacido',
      'hora_inicio_sustituto_leche_materna',
      'hora_nacimiento_recien_nacido',
      'hora_parto',
      'id',
      'id_region',
      'id_servicio_salud',
      'lugar_atencion_parto',
      'lugar_control_prenatal',
      'lugar_control_prenatal_otro',
      'lugar_derivacion_recien_nacido_a_seguimiento',
      'mujer_continua_tratamiento_antiretroviral',
      'mujer_es_vih_positivo',
      'n_correlativo_interno',
      'nacidos_muertos_previos_embarazo',
      'nacidos_vivos_previos_embarazo',
      'nacionalidad',
      'nombre_establecimiento_sin_codigo',
      'nombre_farmaco_1_vih',
      'nombre_farmaco_1_vih_recien_nacido',
      'nombre_farmaco_2_vih',
      'nombre_farmaco_2_vih_recien_nacido',
      'nombre_farmaco_suspencion_lactancia',
      'nombres_madre',
      'numero_carga_viral_control_prenatal',
      'numero_cd4_ingreso_control_prenatal',
      'numero_contactos_sexuales_declarados',
      'numero_contactos_sexuales_estudiados',
      'numero_contactos_sexuales_tratados',
      'otra_its_previa_embarazo',
      'pais_origen',
      'pareja_vih_positivo',
      'peso_mujer_parto',
      'peso_recien_nacido',
      'prevision_madre',
      'primer_apellido_madre',
      'pueblos_indigenas',
      'residencia_gestante',
      'resultado_1_examen_pcr_recien_nacido',
      'resultado_1_examen_vih_embarazo',
      'resultado_1_vdrl_embarazo',
      'resultado_2_examen_pcr_recien_nacido',
      'resultado_2_examen_vih_embarazo',
      'resultado_2_vdrl_embarazo',
      'resultado_3_examen_pcr_recien_nacido',
      'resultado_3_vdrl_embarazo',
      'resultado_citoquimico_liq_cefalo_raquideo',
      'resultado_dilucion_1_vdrl_embarazo',
      'resultado_dilucion_2_vdrl_embarazo',
      'resultado_dilucion_3_vdrl_embarazo',
      'resultado_dilucion_vdrl_parto',
      'resultado_estudio_placentario',
      'resultado_examen_treponemico_parto',
      'resultado_examen_vih_parto',
      'resultado_final_isp_examen_vih',
      'resultado_final_isp_examen_vih_recien_nacido',
      'resultado_radiografia_huesos_largos',
      'resultado_test_elisa_18_meses',
      'resultado_treponemico',
      'resultado_vdrl_liq_cefalo_recien_nacido',
      'resultado_vdrl_parto',
      'resultado_vdrl_periferico_recien_nacido',
      'run_madre',
      'run_recien_nacido',
      'segundo_apellido_madre',
      'sexo_recien_nacido',
      'sifilis_previa_embarazo',
      'sustituto_leche_materna',
      'terapia_antiretroviral_farmaco_1',
      'terapia_antiretroviral_tar_farmaco_2',
      'terapia_antiretroviral_tar_farmaco_3',
      'tipo_de_convivencia',
      'tipo_establecimiento_control_prenatal_embarazo',
      'tipo_parto',
      'titulacion_vdrl_liq_cefalo_recien_nacido',
      'titulacion_vdrl_periferico_recien_nacido',
      'tratamiento_recien_nacido_dosis',
      'tratamiento_recien_nacido_farmaco',
      'tratamiento_recien_nacido_frecuencia',
      'tratamiento_retroviral_parto',
      'tratamiento_sifilis_dosis',
      'tratamiento_sifilis_farmaco',
      'tratamiento_sifilis_frecuencia',
      'tratamiento_sifilis_parto',
      'updated_at',
      'usuario_modifica_form_deis',
      'via_parto',
      'vih_conocido_previa_embarazo',
      */
   ];
}
