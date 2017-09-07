$$(document).on('click','#btn-comentario',function(){
   // comentario_cargar();     
});

function comentario_cargar(){

 // mainView  .destroy();

    mainView.history = ["#content-0"];
    $$('.view-main .page-on-left').remove();


    mainView.router.load({
      template: myApp.templates.comentario,
      animatePages: false,
      reload: true, 
    });  
 

     

    $$.get('include/foro-listado.html',function(data){
      var compiledTemplate = Template7.compile(data);
      // console.log(compiledTemplate());
      $$('#foros-base').html(compiledTemplate());
    });

    // $$('.page[data-page="comentario"] #descripcion').keydown(function(event){
    //   if ( event.which == 13 ) {
    //     v_comentario=$$(this).val();
    //     $$(this).val('');
    //     vconsole(v_comentario);
    //     var data=script({opcion:"comentario_nuevo", usuario:Gusuario_id,comentario:v_comentario},1);
    //     console.log(data);
    //   }
    // });

    $$('.foro-nuevo').click(function(){
      myApp.closeModal();
      $$('.floating-button-curso').hide();
      mainView.router.load({
        template: myApp.templates.comentario_nuevo,
      }); 
      $$.get('include/foro-nuevo.html',function(data){
        var compiledTemplate = Template7.compile(data);
        $$('#foros-nuevo').html(compiledTemplate());
      });
    });
}