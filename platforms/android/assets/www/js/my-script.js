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
        if (datos.opcion=='curso_listado_cronograma'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
          localStorage.setItem('cursos_cronograma_'+datos.curso, JSON.stringify(info));
        }
        if (datos.opcion=='curso_listado_tareas'){
          for (v_resp in resp2){info.push(JSON.parse(resp2[v_resp]));}
            console.log('cursos_tareas_'+datos.curso);
          localStorage.setItem('cursos_tareas_'+datos.curso, JSON.stringify(info));
        }
        if (datos.opcion=='curso_listado_adjuntos'){
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

      if (opcion=='curso_listado_cronograma'){
        if (localStorage.getItem('cursos_cronograma_'+datos.curso)){
          $$.get('include/curso-cronograma.html', function (data){
            var compiledTemplate = Template7.compile(data);
            var context_curso = {"elementos":JSON.parse(localStorage.getItem('cursos_cronograma_'+datos.curso))};
            $$('.cursos.detalle .contenido').html(compiledTemplate(context_curso));
          });
        }else{
          $$('.cursos.detalle .contenido').html('Sin cronograma');
        }
      }

      if (opcion=='curso_listado_tareas'){
        if (localStorage.getItem('cursos_tareas_'+datos.curso)){
          $$.get('include/curso-tareas-listado.html',function(data){
            var compiledTemplate = Template7.compile(data);
            $$('.cursos.detalle .contenido').html(compiledTemplate({"datos":JSON.parse(localStorage.getItem('cursos_tareas_'+datos.curso)) }));
          });
        }else{
          $$('.cursos.detalle .contenido').html('Sin información de tareas');
        }
      }  

      if (opcion=='curso_listado_adjuntos'){
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
