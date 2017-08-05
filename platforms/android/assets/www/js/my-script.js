function script(datos,devolver){
  // devolver es opcional null = no ; 1 = si
vconsole('>INICIANDO SCRIPT<');

// myApp.showPreloader();
myApp.showIndicator();
v_async=true;

var glob_resp;
if (devolver){ v_async=false; vconsole('EN ESPERA');}

  $$.ajax({
    dataType: 'jsonp',
    data: datos,
    jsonp: "callback",
    async:v_async,
    processData: true,
    url: 'https://zaionnet.000webhostapp.com/funcion.php',
    method:'POST',
    success: function searchSuccess(resp) {
      // alert(resp);
      glob_resp=resp;
    	if ((resp!='' && !devolver) || (resp!='' && devolver==2)  ){
	    	resp2=JSON.parse(resp);
	    	var info=[];

        // ====================================================================================================
        if (datos.opcion=='curso_listado'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
  		    localStorage.setItem('cursos', JSON.stringify(info));
        }
        if (datos.opcion=='curso_busqueda'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
          localStorage.setItem('curso_busqueda', JSON.stringify(info));
        }
        if (datos.opcion=='curso_cronograma'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
          localStorage.setItem('cursos_cronograma_'+datos.curso, JSON.stringify(info));
        }
        if (datos.opcion=='curso_tareas'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
            console.log('cursos_tareas_'+datos.curso);
          localStorage.setItem('cursos_tareas_'+datos.curso, JSON.stringify(info));
        }
        if (datos.opcion=='curso_tareas__adjuntos'){

          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
            console.log('curso_tareas__adjuntos_'+datos.tarea);
          localStorage.setItem('curso_tareas__adjuntos_'+datos.tarea, JSON.stringify(info));
        }
        if (datos.opcion=='curso_adjuntos'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
            console.log('cursos_adjuntos_'+datos.curso);
          localStorage.setItem('cursos_adjuntos_'+datos.curso, JSON.stringify(info));
        }
        // ====================================================================================================
         myApp.hideIndicator();
	   }
     // si no existen valore
    script_carga(datos.opcion);
    myApp.hideIndicator();
    },
    error: function searchError(xhr, err) {
      console.error("Error on ajax call: " + err);
      vconsole(JSON.stringify(xhr));
      if (devolver){ return err;}
        // ====================================================================================================
        script_carga(datos.opcion);
        // ====================================================================================================
        myApp.hideIndicator();
    }
  });

  vconsole('>FINALIZANDO SCRIPT<');
   // myApp.hideIndicator();
          if (devolver){
            if (devolver==1) myApp.hideIndicator();
          // vconsole(glob_resp);
          try{
            return JSON.parse(glob_resp);
          }catch(e){
            return glob_resp;
          }
        }
        glob_resp='';

function script_carga(opcion){

      if (opcion=='curso_listado'){
        if (localStorage.cursos){

          mainView.history = ["#content-0"];
          $$('.view-main .page-on-left').remove();

          mainView.router.load({
            template: myApp.templates.curso,
            animatePages: true,
            context: {"cursos":JSON.parse(localStorage.cursos) },
            reload: true,
          });
        }
      }


      if (opcion=='curso_busqueda'){
        if (localStorage.getItem('curso_busqueda')){
          $$.get('include/curso-busqueda.html',function(data){
              var compiledTemplate = Template7.compile(data);
              $$('.cursos.busqueda').html(compiledTemplate({"datos":JSON.parse(localStorage.getItem('curso_busqueda')) }));
          });
        }else{
          $$('.cursos.busqueda').html('<div style="text-aling:center">Sin información</div>');
        }
      }

      if (opcion=='curso_cronograma'){
        if (localStorage.getItem('cursos_cronograma_'+datos.curso)){
          $$.get('include/curso-cronograma.html', function (data){
            var compiledTemplate = Template7.compile(data);
            var array=JSON.parse(localStorage.getItem('cursos_cronograma_'+datos.curso));
            console.log(array);
            var elementos=[];
            var t_mes=0;var t_dia=0;var pos_ant=0;
            for (a in array){
              if (array[a].mes!=t_mes || array[a].dia != t_dia){
                elementos[a]=[];
                elementos[a]['datos']=[];
                datos_crono=[];
                elementos[a]['mes']=array[a].mes;
                elementos[a]['dia']=array[a].dia;
                pos_ant=a;
                if (array[a].tipo=='tar'){datos_crono['tarea']=1;}else{datos_crono['tarea']=0;}
                datos_crono['titulo']=array[a].titulo;
                datos_crono['descripcion']=array[a].descripcion;
                elementos[pos_ant]['datos'].push(datos_crono);
              }else{
                datos_crono=[];
                if (array[a].tipo=='tar'){datos_crono['tarea']=1;}else{datos_crono['tarea']=0;}
                datos_crono['titulo']=array[a].titulo;
                datos_crono['descripcion']=array[a].descripcion;
                elementos[pos_ant]['datos'].push(datos_crono);
              }
              t_mes=array[a].mes;
              t_dia=array[a].dia;
            }
            var context_curso = {"elementos":elementos};
            console.log(context_curso);
            $$('.cursos.detalle .contenido').html(compiledTemplate(context_curso));
          });
        }else{
          $$('.cursos.detalle .contenido').html('Sin cronograma');
        }
      }

      if (opcion=='curso_tareas'){
        if (localStorage.getItem('cursos_tareas_'+datos.curso)){
          $$.get('include/curso-tareas-listado.html',function(data){
            var compiledTemplate = Template7.compile(data);
            $$('.cursos.detalle .contenido').html(compiledTemplate({"datos":JSON.parse(localStorage.getItem('cursos_tareas_'+datos.curso)) }));
          });
        }else{
          $$('.cursos.detalle .contenido').html('Sin información de tareas');
        }
      }

      if (opcion=='curso_tareas__adjuntos'){
        if (localStorage.getItem('curso_tareas__adjuntos_'+datos.tarea)){
          // $$.get('include/curso-adjuntos-listado.html',function(data){
            // var compiledTemplate = Template7.compile(data);
            var array=JSON.parse(localStorage.getItem('curso_tareas__adjuntos_'+datos.tarea));
            $$('.cursos.detalle-tarea #listado_adjuntos').html('');
            for (a in array){
                $$('.cursos.detalle-tarea #listado_adjuntos').append('<div class="caja" cod_archivo="'+array[a].codigo_archivo+'">'+array[a].nombre_archivo+'</div>' );
            }

          // });
        }else{
          $$('.cursos.detalle-tarea #listado_adjuntos').html('Sin información de adjuntos');
        }
      }

      if (opcion=='curso_adjuntos'){
        if (localStorage.getItem('cursos_adjuntos_'+datos.curso)){
          $$.get('include/curso-adjuntos-listado.html',function(data){
            var compiledTemplate = Template7.compile(data);
            $$('.cursos.detalle .contenido').html(compiledTemplate({"datos":JSON.parse(localStorage.getItem('cursos_adjuntos_'+datos.curso)) }));
          });
        }else{
          $$('.cursos.detalle .contenido').html('Sin información de adjuntos');
        }
      }
}

}
