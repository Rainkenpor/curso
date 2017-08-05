function cargar_archivo(archivo,codigo_archivo,codigo){

// codigos
// 3.2 => Tareas
// 3.3 => adjuntos


var nombre_archivo=archivo.split('/');
// console.log(nombre_archivo);
var nombre_archivo=nombre_archivo.pop();
// console.log(nombre_archivo);


  switch (codigo){
    case "3.2":
      $$('.detalle-tarea .porcentaje').show();
    case "3.3":
      $$('.curso-adjunto .porcentaje').show();
  }

    function win(r) {
    vconsole("Code = " + r.responseCode);
    vconsole("Response = " + r.response);
    vconsole("Sent = " + r.bytesSent);

    switch (codigo){
      case "3.2":
        $$('.detalle-tarea .porcentaje').hide();
        var datos = {
          opcion:   "curso_tarea_detalle_adjuntos",
          curso:    glob_curso_id,
          rol:      glob_rol_id,
          usuario:  Gusuario_id,
          agregar:  1,
          codigo_archivo:  r.response,
          archivo: nombre_archivo
        };
        script(datos);
      case "3.3":
        if (r.response < 0){
          vconsole.log('error: ' +r.response);
        }else{
          $$('.curso-adjunto .porcentaje').hide();
          var datos = {
            opcion:   "curso_listado_adjuntos",
            curso:    glob_curso_id,
            rol:      glob_rol_id,
            usuario:  Gusuario_id,
            agregar:  1,
            codigo_archivo:  r.response,
            archivo: nombre_archivo
          };
          script(datos);
        }
    }
    // return r.response;
}

function fail(error) {
    // alert("An error has occurred: Code = " + error.code);
    vconsole("upload error source " + error.source);
    vconsole("upload error target " + error.target);
    switch (codigo){
      case "3.2":
        $$('.detalle-tarea .porcentaje').hide();
      case "3.3":
        $$('.curso-adjunto .porcentaje').hide();
    }
}

var uri = encodeURI("https://zaionnet.000webhostapp.com/carga.php?codigo="+codigo_archivo);


var options = new FileUploadOptions();
options.fileKey="fileToUpload";
options.fileName=archivo.substr(archivo.lastIndexOf('/')+1);
options.mimeType="text/plain";

var headers={'headerParam':'headerValue'};

options.headers = headers;

var ft = new FileTransfer();

ft.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
      perc = parseInt((progressEvent.loaded / progressEvent.total) *100,10);
        // vconsole("current progress: "+perc+"%");
        $$('.avance').css("width",perc+'%');
         if(perc==100){
         // alert("Complete");
         }
    }
}


ft.upload(archivo, uri, win, fail, options);

}
