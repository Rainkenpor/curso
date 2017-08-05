var isMaterial = Framework7.prototype.device.ios === false;
var isIos = Framework7.prototype.device.ios === true;
var glob_page=[];
glob_page['inicio']=0;
glob_page['tarea']=0;
glob_page['curso']=0;
glob_page['comentario']=0;

Template7.global = { 
  material: isMaterial,
  ios: isIos, 
}; 


Template7.registerHelper('if_compare', function (a, operator, b, options) {
    var match = false;
    if (
        (operator === '==' && a == b) ||
        (operator === '===' && a === b) ||
        (operator === '!=' && a != b) ||
        (operator === '>' && a > b) ||
        (operator === '<' && a < b) ||
        (operator === '>=' && a >= b) ||
        (operator === '<=' && a <= b)||
        (operator === '||' && a || b) ||
        (operator === '&&' && a && b) 
        ) {
        match = true;
    }
    if (match) return options.fn(this);
    else return options.inverse(this);
});


if (!isIos) {
// vconsole("android");
  $$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
  $$('.view .navbar').prependTo('.view .page');
}

// Initialize app
var myApp = new Framework7({
tapHold: true,
  material: isIos? false : true,
  template7Pages: true,
  precompileTemplates: true,
  swipePanel: 'left',
  swipePanelActiveArea: '30', 
  swipeBackPage: true,
  animateNavBackIcon: true, 
  pushState: !!Framework7.prototype.device.os, 
});



function vconsole(txt){
  $$("#app-status-ul").append('<br>'+txt);
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    uniqueHistory:true,
    SwipeBackPage:true,
  
});



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    vconsole("Device is ready!");
    vconsole(FileTransfer);
// myApp.showPreloader(''); 
    // setTimeout(function(){
    // registrar();
          
    mueveReloj();
  // },5000);
    
});



$$(document).on('click','#btn-home',function(){
    mainView.router.back({
        template: myApp.templates.index,
        force: true,
        ignoreCache: true
    });
    mainView.router.load({
      template: myApp.templates.index,
      animatePages: false,
      // context: {carpetas: info,cursos:info_curso},
      reload: true, 
    });  
    
});



// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    $$('.toolbar-inner table tr td').removeClass("activo");
    vconsole(page.name);
    glob_page=page.name;

    var v_curso=["curso","curso_busqueda","curso_detalle","curso_detalle_tarea"];
    var v_comentario=["comentario","comentario_nuevo"];

    if (page.name === 'index') {glob_page['inicio']=1;$$("#btn-home").parents('td').addClass("activo");}
    if (page.name === 'tarea') {glob_page['tarea']=1;$$("#btn-tarea").parents('td').addClass("activo");}
    if (v_curso.indexOf(page.name)>-1) {glob_page['curso']=1;$$("#btn-curso").parents('td').addClass("activo");}
    if (v_comentario.indexOf(page.name)>-1) {glob_page['comentario']=1;$$("#btn-comentario").parents('td').addClass("activo");}

    if (page.name === 'index' || page.name === 'tarea' || page.name === 'curso' || page.name === 'comentario'){
      
    }
})



// Option 2. Using live 'pageInit' event handlers for each page
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

function mueveReloj(){ 
    // vconsole(1);
    momentoActual = new Date() 
    hora = momentoActual.getHours() 
    minuto = momentoActual.getMinutes() 
    segundo = momentoActual.getSeconds() 

    str_segundo = new String (segundo) 
    if (str_segundo.length == 1) 
        segundo = "0" + segundo 

    str_minuto = new String (minuto) 
    if (str_minuto.length == 1) 
        minuto = "0" + minuto 

    str_hora = new String (hora) 
    if (str_hora.length == 1) 
        hora = "0" + hora 

    if (hora>12){hora=hora-12;thora='pm'}else{thora='am';}

    horaImprimible = hora + " : " + minuto + ' '+thora

    $$('.hora').html(horaImprimible);

    setTimeout("mueveReloj()",1000) 
} 