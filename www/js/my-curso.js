// Global
var glob_curso_id;
var glob_rol_id;

// click en el boton de cursos
// carga los cursos actuales

$$(document).on('click','#btn-curso',function(){
	var datos = {opcion:"curso_listado",usuario:Gusuario_id}; 
	script(datos);

});


$$(document).on('click','.popover .curso-busqueda',function(){
	 modulo_curso_busqueda();
});

// Desglozar la información del curso seleccionado
$$(document).on('click','.cursos .curso > table',function(){
	glob_curso_id=$$(this).attr('id_curs');
	glob_rol_id=$$(this).parents('.curso').attr('rol');
	$$('.cursos').find('.curso').removeClass('activo');
	$$(this).parents('.curso').addClass('activo');
	$$('.cursos .curso .temporal').remove();
	$$(this).parents('.curso').find('.icono').append('<div class="temporal" style="font-size:20px;position:absolute;margin-top:-55px;margin-left:55px;color:white">'+
										$$(this).parents('.curso').find('.titulo').html()+
										'</div>');

	$$(this).parents('.curso').append(	'<div class="temporal animated fadeIn" style="background-color:#424242;padding:10px;margin-top:40px; margin-left:-10px;width:100%;color:white">'+
								'<span class="icon-user" style="color:white;margin-right:20px"></span> '+
								$$(this).parents('.curso').find('.cat').html()+
							'</div>');
	$$(this).parents('.curso').append('<div class="temporal cur_contenido"></div>');

	// cargando datos
	vconsole(glob_curso_id);
	var curso_descripcion=curso_informacion(glob_curso_id).curso_descripcion;
	var conteo_tema=curso_informacion(glob_curso_id).conteo_tema;
	var conteo_tarea=curso_informacion(glob_curso_id).conteo_tarea;
	var conteo_adjuntos=curso_informacion(glob_curso_id).conteo_adjunto;


$$.get('include/curso-informacion.html', function (data){
  var compiledTemplate = Template7.compile(data);
	var context = {
	    curso:{'contenido':pad(curso_descripcion,1),
			'temas':pad(conteo_tema,2),
			'tareas':pad(conteo_tarea,2),
			'archivos':pad(conteo_adjuntos,2)} ,
	};
	$$('.cur_contenido').html(compiledTemplate(context));

});

	

});

// presionando el curso para visualizar su información
$$(document).on('click','.cur_contenido',function(){
    	myApp.showPreloader();
    	datos={curso:curso_informacion(glob_curso_id).curso};
      mainView.router.load({
        template: myApp.templates.curso_detalle,
        context: datos,
      });
      myApp.hidePreloader();
      modulo_curso_cronograma();
});

// al presionar una opcion del detalle
$$(document).on('click','.cursos-detalle .opcion',function(){
	$$('.cursos-detalle .opcion').removeClass('activo');
	$$(this).addClass('activo');
	opcion=$$(this).attr('opcion');
	$$('.floating-button-curso').hide();

	if (opcion==1){
		modulo_curso_cronograma();
	}
	if (opcion==2){
		$$('.cursos.detalle .contenido').html('');
	}
	if (opcion==3){
		modulo_curso_tareas();
	}
	if (opcion==4){
		modulo_curso_adjuntos();
	}
})




// ===================================================================================================
// información del curso
// ===================================================================================================
function curso_informacion(id_curs){
	if (localStorage.cursos){
		var info=JSON.parse(localStorage.cursos);
		for (vinfo in info){
			if (info[vinfo].id_curs==id_curs){
				return info[vinfo];
			}
		}
	}
}
