
function modulo_curso_busqueda(){
	myApp.closeModal();
	$$('.floating-button-curso').hide();
    	mainView.router.load({
        template: myApp.templates.curso_busqueda,
        animatePages: true,
        // context: {"cursos":JSON.parse(localStorage.cursos) },
        reload: false, 
      }); 

	var datos = {
	opcion:"curso_busqueda",
	usuario:Gusuario_id}; 

     script(datos);     
	// $$('.card-tareas').off('taphold');
	// var datos = {
	// opcion:"curso_tareas",
	// curso:glob_curso_id,
	// rol:glob_rol_id}; 
	// script(datos);
}
$$(document).on('click','.curso-busqueda-asignacion',function(){
	var id_curs=$$(this).attr('id_curs');
	var datos = {
	opcion:"curso_busqueda",
	asignar:1,
	curso:id_curs,
	usuario:Gusuario_id}; 

     script(datos);
})