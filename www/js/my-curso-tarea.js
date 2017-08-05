
function modulo_curso_tareas(){
	// $$('#curso_include_tareas_seleccion1').off('click');
	// $$('#curso_include_tareas_seleccion2').off('click');
	$$('.card-tareas').off('taphold');
	var datos = {
	opcion:"curso_listado_tareas",
	curso:glob_curso_id,
	rol:glob_rol_id}; 
	
	script(datos);
	if (glob_rol_id==2)$$('.floating-button-curso').show();

	$$(document).on('taphold','.card-tareas', function () {
		if (glob_rol_id==2){
			var id_tar=$$(this).attr('id_tar');
		   	var buttons = [
		        {
		            text: 'Opciones (Catedrático)',
		            label: true
		        },
		        {
		            text: 'Eliminar',
		            color:'red',
		            onClick: function () {
		                 myApp.confirm('¿Esta seguro(a) de eliminar la tarea?','Curso 2.0', function () {
		                 	console.log(id_tar);
		                 	var datos = {
					opcion:"curso_listado_tareas",
					tarea:id_tar,
					eliminar:1,
					curso:glob_curso_id,
					rol:glob_rol_id};
				      script(datos); 
				      myApp.closeModal();
				    },function(){
				    	myApp.closeModal();
				    });
		            }
		        },
		    ];
		    myApp.actions(buttons);
		}
	});
}

function modulo_curso_tareas_detalle(id_tar){
	console.log(id_tar);

	var info_curso=curso_informacion(glob_curso_id);
	var info_tarea=curso_tarea_informacion(glob_curso_id,id_tar);



	datos={tarea:info_tarea.tarea,curso:info_curso.curso,descripcion:info_tarea.descripcion,fecha_vencimiento:info_tarea.finalizacion,id_tar:info_tarea.id_tar};
	
	mainView.router.load({
      	template: myApp.templates.curso_detalle_tarea,
      	animatePages: true,
      	context: datos,
      	reload: false, 
    	});  
}

$$(document).on('click','.cursos.detalle-tarea .adjunto',function(){
	var id_tar=$$(this).attr('id_tar');
	var dia = Date.now()  
	hexString = dia.toString(36);
	// console.log(1);
	// cargar_archivo('C:\\install.res.1036.dll',Gusuario_id+'_'+glob_curso_id+"_"+id_tar+'_'+hexString,"3.2");
	fileChooser.open(function(uri) {
		vconsole(uri);
		window.FilePath.resolveNativePath(uri, 
			function(data){
				vconsole("Directorio encontrado > "+data);
				
				vconsole('Archivo generado >>'+cargar_archivo(data,Gusuario_id+'_'+glob_curso_id+"_"+id_tar+'_'+hexString,'3.2'));
			}, 
			function(data){
				vconsole("error >> "+data);
			});
	});
});


function modulo_curso_tareas_nuevo_normal(){
	myApp.closeModal();
	$$('.floating-button-curso').hide();
	$$('.curso_include_tareas_normal_guardar').off('click');

	var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];
	var dayNames =  ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
	var dayNamesShort1=['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];

	$$.get('include/curso-tareas-crear-normal.html',function(data){
		var compiledTemplate = Template7.compile(data);
		$$('.cursos.detalle .contenido').html(compiledTemplate());

		var calendarInline = myApp.calendar({
		    // container: '#curso_include_tareas_normal_calendario',
		    input: '#curso_include_tareas_normal_calendario',
		    value: [new Date()],
		    weekHeader: true,
		     dateFormat: 'dd/MM/yyyy',
		    dayNamesShort:dayNamesShort1,
		    toolbarTemplate: 
		        '<div class="toolbar calendar-custom-toolbar">' +
		            '<div class="toolbar-inner" style="background-color:#2196F3;color:white">' +
		                '<div class="left">' +
		                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
		                '</div>' +
		                '<div class="center"></div>' +
		                '<div class="right">' +
		                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
		                '</div>' +
		            '</div>' +
		        '</div>',
		    onOpen: function (p) {
		        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
		        $$('.calendar-custom-toolbar .left .link').on('click', function () {
		            calendarInline.prevMonth();
		        });
		        $$('.calendar-custom-toolbar .right .link').on('click', function () {
		            calendarInline.nextMonth();
		        });
		    },
		    onMonthYearChangeStart: function (p) {
		        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
		    }
		}); 
		$$('.curso_include_tareas_normal_guardar').click(function(){
			var vtarea=$$('#curso_include_tareas_normal_titulo').val();
			var vdescripcion=$$('#curso_include_tareas_normal_descripcion').val();
			var vfecha= new Date(calendarInline.value);

			var vfecha=vfecha.getFullYear() +"-"+(vfecha.getMonth() + 1) + '-' + vfecha.getDate() + '- 00:00:00' ;

			// alert(vfecha);
			var datos = {
			opcion:"curso_tarea_nuevo",
			tarea:vtarea,
			curso:glob_curso_id,
			tipo:'1',
			descripcion:vdescripcion,
			fecha_finalizacion:vfecha,
			usuario:Gusuario_id}; 
			console.log(datos);
			
			myApp.showIndicator();
			vconsole(script(datos,1));

			var datos = {
				opcion:"curso_listado_tareas",
				curso:glob_curso_id,
				rol:glob_rol_id
			}; 

			script(datos);

			if (glob_rol_id==2)$$('.floating-button-curso').show();
		});
	});	
}


function modulo_curso_tareas_nuevo_conceptos(){
	// $$('.demo-popover').hide();
	myApp.closeModal();
	$$('.floating-button-curso').hide();

	$$('.curso_include_tareas_conceptos_guardar').off('click');
	$$('#curso_include_tareas_conceptos_palabra .icon-trash-empty').off('click');
	$$('#curso_include_tareas_conceptos_palabra input').off('keyup');

	var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'];
	var dayNames =  ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
	var dayNamesShort1=['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];

	$$.get('include/curso-tareas-crear-glosario.html',function(data){
		var compiledTemplate = Template7.compile(data);
		$$('.cursos.detalle .contenido').html(compiledTemplate());
		$$('#curso_include_tareas_conceptos_palabra input').keyup(function(){
			var contadores_vacios=0;
			 $$('#curso_include_tareas_conceptos_palabra input').each(function(){
	        	    if ($$(this).val().trim()=='')contadores_vacios++;
	        	});
			if (contadores_vacios==0){
				$$('#curso_include_tareas_conceptos_palabra').append('<div><input type="text" class="form-control" placeholder="Palabra" style="display: inline;width: calc(100% - 70px)"> <span class="icon-trash-empty" style="font-size: 27px"></span></div>');
			}
		});

		$$('#curso_include_tareas_conceptos_palabra .icon-trash-empty').click(function(){
			var contador=0;
			 $$('#curso_include_tareas_conceptos_palabra input').each(function(){
			 	contador++;
			 });
			 if (contador>1){
			 	$$(this).parent('div').remove();
			 }else{
			 	$$(this).parent('div').find('input').val('');
			 }
		});

		var calendarInline = myApp.calendar({
		    input: '#curso_include_tareas_conceptos_calendario',
		    value: [new Date()],
		    weekHeader: true,
		     dateFormat: 'dd/MM/yyyy',
		    dayNamesShort:dayNamesShort1,
		    toolbarTemplate: 
		        '<div class="toolbar calendar-custom-toolbar">' +
		            '<div class="toolbar-inner" style="background-color:#2196F3;color:white">' +
		                '<div class="left">' +
		                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
		                '</div>' +
		                '<div class="center"></div>' +
		                '<div class="right">' +
		                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
		                '</div>' +
		            '</div>' +
		        '</div>',
		    onOpen: function (p) {
		        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
		        $$('.calendar-custom-toolbar .left .link').on('click', function () {
		            calendarInline.prevMonth();
		        });
		        $$('.calendar-custom-toolbar .right .link').on('click', function () {
		            calendarInline.nextMonth();
		        });
		    },
		    onMonthYearChangeStart: function (p) {
		        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
		    }
		}); 


		$$('.curso_include_tareas_conceptos_guardar').click(function(){
			var vtarea=$$('#curso_include_tareas_conceptos_titulo').val();
			var vdescripcion=$$('#curso_include_tareas_conceptos_descripcion').val();
			var vfecha= new Date(calendarInline.value);
			var vpalabras=[];
			var vfecha=vfecha.getFullYear() +"-"+(vfecha.getMonth() + 1) + '-' + vfecha.getDate() + '- 00:00:00' ;

			$$('#curso_include_tareas_conceptos_palabra input').each(function(){
				if ($$(this).val().trim()!='')vpalabras.push($$(this).val());
			 });

			var datos = {
			opcion:"curso_tarea_nuevo",
			tarea:vtarea,
			curso:glob_curso_id,
			tipo:'2',
			descripcion:vdescripcion,
			palabras:JSON.stringify(vpalabras),
			fecha_finalizacion:vfecha,
			usuario:Gusuario_id}; 

			console.log(script(datos,1));

			var datos = {
				opcion:"curso_listado_tareas",
				curso:glob_curso_id,
				rol:glob_rol_id
			}; 
			script(datos);

			if (glob_rol_id==2)$$('.floating-button-curso').show();

		});
	});
}

// ===================================================================================================
// información de las tareas
// ===================================================================================================
function curso_tarea_informacion(id_curs,id_tar){
	if (localStorage.getItem('cursos_tareas_'+id_curs)){
		var info=JSON.parse(localStorage.getItem('cursos_tareas_'+id_curs));
		for (vinfo in info){
			if (info[vinfo].id_tar==id_tar){
				return info[vinfo];
			}
		}
	}
}
