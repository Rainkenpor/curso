function modulo_curso_cronograma(){
	var datos = {opcion:"curso_cronograma",usuario:Gusuario_id,curso:glob_curso_id,rol:glob_rol_id}; 
	script(datos);

// var dia = Date.now()
// hexString = dia.toString(36);
// console.log(hexString);
// $$.get('include/curso-cronograma.html', function (data){
// 	var compiledTemplate = Template7.compile(data);
// 	var context_curso = {"elementos":[
// 					{"mes":"DIC","dia":"31","datos":[
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea"},
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea2"}]
// 					},
// 					{"mes":"DIC","dia":"26","datos":[
// 						{"tarea":"","titulo":"titulo del elemento","descripcion":"tema"},
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea2"}]
// 					},
// 					{"mes":"DIC","dia":"25","datos":[
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea"},
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea2"}]
// 					},
// 					{"mes":"DIC","dia":"26","datos":[
// 						{"tarea":"","titulo":"titulo del elemento","descripcion":"tema"},
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea2"}]
// 					},
// 					{"mes":"DIC","dia":"25","datos":[
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea"},
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea2"}]
// 					},
// 					{"mes":"DIC","dia":"26","datos":[
// 						{"tarea":"","titulo":"titulo del elemento","descripcion":"tema"},
// 						{"tarea":"1","titulo":"titulo del elemento","descripcion":"Prueba de tarea2"}]
// 					}
// 				]};

// 	// vconsole(context_curso);

// 	$$('.cursos.detalle .contenido').html(compiledTemplate(context_curso));
// });

}
