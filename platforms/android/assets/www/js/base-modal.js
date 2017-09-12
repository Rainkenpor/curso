
function modal_ok(elemento,tipo){
	if (tipo=='nuevo_tarea'){
		var arr=localStorage.getItem('varios');
		vtitulo=$$('.fondo-blur #contenedor #titulo').val();
		vdescripcion=$$('.fondo-blur #contenedor #descripcion').val();
		vfecha=$$('.fondo-blur #contenedor #modal_fecha').val();
		vfecha= new Date(vfecha);
		vfecha=vfecha.getFullYear() +"-"+(vfecha.getMonth() + 1) + '-' + vfecha.getDate() + '- 00:00:00' ;
		vcurso=JSON.parse(arr)[0].id_curso;
			 		
		datos = {opcion:"curso_tarea_nuevo",usuario:Gusuario_id,curso:vcurso,tarea:vtitulo,descripcion:vdescripcion,fecha_finalizacion:vfecha,tipo:2};	
		script(datos,2);
		$$('.fondo-blur').removeClass('jackInTheBox').removeClass('animated').addClass('fadeOutUp animated');
	}
	if (tipo=='nuevo_tema'){
		alert('tema');
		var arr=localStorage.getItem('varios');
		vtitulo=$$('.fondo-blur #contenedor #titulo').val();
		vdescripcion=$$('.fondo-blur #contenedor #descripcion').val();
		vfecha=$$('.fondo-blur #contenedor #modal_fecha').val();
		vfecha= new Date(vfecha);
		vfecha=vfecha.getFullYear() +"-"+(vfecha.getMonth() + 1) + '-' + vfecha.getDate() + '- 00:00:00' ;
		vcurso=JSON.parse(arr)[0].id_curso;
			 		
		datos = {opcion:"curso_tema_nuevo",usuario:Gusuario_id,curso:vcurso,tema:vtitulo,descripcion:vdescripcion,fecha_habilitacion:vfecha};	
		vconsole(datos);
		script(datos,2);
		$$('.fondo-blur').removeClass('jackInTheBox').removeClass('animated').addClass('fadeOutUp animated');
	}
	
}