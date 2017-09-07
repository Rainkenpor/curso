




// start();

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    vconsole("Device is ready!");
    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, success, error);

    function error() {
      vconsole('Permiso de escritura erroneo');
    }

    function success( status ) {
        if( !status.hasPermission ) error();
        vconsole('Permiso de escritura success'+status);
    }

    vconsole(FileTransfer);
});




myApp.onPageInit('about', function (page) {})

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    $$('.toolbar-inner table tr td').removeClass("activo");
    vconsole(page.name);
    glob_page=page.name;

    var v_curso=["curso","curso_busqueda","curso_detalle","curso_detalle_tarea"];
    var v_comentario=["comentario","comentario_nuevo"];

    if (page.name === 'index')            {$$("#btn-home").parents('td').addClass("activo");}
    if (page.name === 'tarea')            {$$("#btn-tarea").parents('td').addClass("activo");}
    if (v_curso.indexOf(page.name)>-1)    {$$("#btn-curso").parents('td').addClass("activo");}
    if (v_comentario.indexOf(page.name)>-1) {$$("#btn-comentario").parents('td').addClass("activo");}

})


$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    // myApp.alert('Here comes About page');
})

function back_all(){
   $$('.navbar-on-left').remove();
    $$('.page-on-left').remove();

    var index   = mainView.history[0];
    var actual  = mainView.activePage.url;
    mainView.history = [];
    mainView.history.push(index);
    mainView.history.push( actual );
    mainView.router.back();
}


function extension_archivo(archivo){
    var ext=archivo.split('.').pop();
    var extension='';
    var icono='';

    if (ext=='jpg' || ext=='jpeg'){  extension='image/jpeg'; icono='img'}
    if (ext=='png' || ext=='gif' || ext=='bmp'){  extension='image/'+ext; icono="img";}
    if (ext=='docx'){  extension='application/vnd.openxmlformats-officedocument.wordprocessingml.document'; icono="icon-file-word";}
    if (ext=='xlsx'){  extension='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';icono="icon-file-excel";}
    if (ext=='ppsx'){  extension='application/vnd.openxmlformats-officedocument.presentationml.slideshow';icono="icon-file-powerpoint";}
    if (ext=='doc') { extension='application/msword';icono="icon-file-word";}
    if (ext=='xls') { extension='application/vnd.ms-excel';icono="icon-file-excel";}
    if (ext=='ppt') { extension='application/vnd.ms-powerpoint';icono="icon-file-powerpoint";}
    if (ext=='pdf') { extension='application/pdf';icono="icon-file-pdf";}
    if (ext=='aac') { extension='audio/x-aac';icono="icon-file-audio";}
    if (ext=='mpga' || ext=='mp2' || ext=='mp2a' || ext=='mp3' || ext=='m2a' || ext=='m3a') { extension='audio/mpeg';icono="icon-file-audio";}

    var devolver=({"ext":ext,"mdi":extension,"icono":icono});
    return devolver;
}
