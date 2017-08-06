function script(datos,devolver){
  // devolver es opcional null = no ; 1 = si
vconsole('>INICIANDO SCRIPT<');

// myApp.showPreloader();

if (datos.preload){
  if (datos.opcion=='curso_tareas__adjuntos')  $$('.cursos.detalle-tarea #listado_adjuntos').html('<span class="preloader"></span>');
}else{
  myApp.showIndicator();
}

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
                datos_crono['codigo']=array[a].codigo;
                datos_crono['tarea']=array[a].tipo;
                datos_crono['titulo']=array[a].titulo;
                datos_crono['descripcion']=array[a].descripcion;
                elementos[pos_ant]['datos'].push(datos_crono);
              }else{
                datos_crono=[];
                datos_crono['codigo']=array[a].codigo;
                datos_crono['tarea']=array[a].tipo;
                datos_crono['titulo']=array[a].titulo;
                datos_crono['descripcion']=array[a].descripcion;
                elementos[pos_ant]['datos'].push(datos_crono);
              }
              t_mes=array[a].mes;
              t_dia=array[a].dia;
            }
            var context_curso = {"elementos":elementos};
            
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
            var array=JSON.parse(localStorage.getItem('curso_tareas__adjuntos_'+datos.tarea));
            $$('.cursos.detalle-tarea #listado_adjuntos').html('');
            for (a in array){
                $$('.cursos.detalle-tarea #listado_adjuntos').append('<div class="caja" cod_archivo="'+array[a].codigo_archivo+'">'+array[a].nombre_archivo+'</div>' );
            }
        }else{
          $$('.cursos.detalle-tarea #listado_adjuntos').html('Sin información de adjuntos');
        }
      }

      if (opcion=='curso_adjuntos'){
        if (localStorage.getItem('cursos_adjuntos_'+datos.curso)){
          array=JSON.parse(localStorage.getItem('cursos_adjuntos_'+datos.curso));
          console.log(array);
          v_titulo='';v_fecha='';
          datos=[];
          archivos=[];

          for (arr in array){
            if (array[arr].titulo!=v_titulo){

              if (archivos.length>0) datos.push({"titulo":titulo,"fecha":array[arr].fecha,"id_adj":array[arr].id_adj,"tipo":tipo,"id_tipo":id_tipo,"archivos":archivos});

              // titulos
              titulo=array[arr].titulo;
              if (titulo=='' || titulo == null )titulo='Biblioteca';
              if (array[arr].id_tar>0) titulo='Tarea - '+titulo;
              // tipo
              if(array[arr].id_tar>0){ 
                tipo="tar";
              }else if(array[arr].id_tem>0){
                tipo="tem";
              }else{
                tipo='biblioteca';
              }
              // id tipo
              if(array[arr].id_tar>0){ 
                id_tipo=array[arr].id_tar;
              }else if(array[arr].id_tem>0){
                id_tipo=array[arr].id_tem;
              }else{
                id_tipo=0;
              }
              // icono
              var extension=extension_archivo(array[arr].codigo_archivo);
              var icono='<span style="font-size:25px" class="'+ extension.icono+'">';
              if (extension.icono=='img')icono='<img src="https://zaionnet.000webhostapp.com/carga/'+array[arr].codigo_archivo+'" alt="" height="25px" width="25px">';
              // insertando datos de archivos si ya existieran
              
              archivos=[];
              archivos.push({"codigo":array[arr].codigo_archivo,"nombre": array[arr].nombre_archivo,"icono":icono,"usuario":array[arr].usuario});
            }else{
              // icono
              var extension=extension_archivo(array[arr].codigo_archivo);
              var icono='<span style="font-size:25px" class="'+ extension.icono+'">';
              if (extension.icono=='img')icono='<img src="https://zaionnet.000webhostapp.com/carga/'+array[arr].codigo_archivo+'" alt="" height="25px" width="25px">';
              archivos.push({"codigo":array[arr].codigo_archivo,"nombre": array[arr].nombre_archivo,"icono":icono,"usuario":array[arr].usuario});
            }
            v_titulo=array[arr].titulo;
            v_fecha=array[arr].fecha;
          }
          if (archivos.length>0) if (archivos.length>0) datos.push({"titulo":titulo,"fecha":array[arr].fecha,"id_adj":array[arr].id_adj,"tipo":tipo,"id_tipo":id_tipo,"usuario":array[arr].usuario,"archivos":archivos});

          console.log(datos);

          $$.get('include/curso-adjuntos-listado.html',function(data){
            var compiledTemplate = Template7.compile(data);
            $$('.cursos.detalle .contenido').html(compiledTemplate({"datos":datos }));
          });
        }else{
          $$('.cursos.detalle .contenido').html('Sin información de adjuntos');
        }
      }
  }

}
