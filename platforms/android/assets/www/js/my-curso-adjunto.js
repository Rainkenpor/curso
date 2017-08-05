function modulo_curso_adjuntos(){
	$$('.card-adjuntos').off('taphold');
	$$('#adjuntar_archivo').off('click');
	var datos = {
		opcion: 	"curso_listado_adjuntos",
		curso: 	glob_curso_id,
		rol: 		glob_rol_id,
		usuario:   	Gusuario_id
	}; 
	// alert(22);
	script(datos);
}

$$(document).on('click','#adjuntar_archivo',function(){
	$$('#adjuntar_archivo').off('click');
	var dia = Date.now()  
	hexString = dia.toString(36);
	// alert(1);
	fileChooser.open(function(uri) {
		vconsole(uri);
		window.FilePath.resolveNativePath(uri, 
			function(data){
				vconsole("Directorio encontrado > "+data);
				cargar_archivo(data,Gusuario_id+'_'+glob_curso_id+"_adj_"+hexString,'3.3');
			}, 
			function(data){
				vconsole("error >> "+data);
			});
	});	
})