
var Gusuario_id =0;
var Gusuario_nombre='';

   // NOTE: use your firebase info here
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDL9XxChRgOrHGVO7R71HSAkU1g4-sQx6c",
    authDomain: "curso-64550.firebaseapp.com",
    databaseURL: "https://curso-64550.firebaseio.com",
    projectId: "curso-64550",
    storageBucket: "curso-64550.appspot.com",
    messagingSenderId: "82712620086"
  };
  firebase.initializeApp(config);
  // fire base login status listener
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        // alert("fire logged! "+user.email +" - "+user.userId);
        var data=script({opcion:"usuario_entrar", email:user.email},1);
        notificaciones_push();
        
        document.querySelector("#image").src = data.imagen;
        $$(".panel-left .content-block #login .usuario").html(data.usuario);
        $$(".panel-left .content-block #login .image-temp").hide();
        $$(".panel-left .content-block #login #imagen #image").show();
        Gusuario_id=data.id_usu;
        Gusuario_nombre=data.usuario;
        
        $$('.toolbar-inferior').show();
         myApp.params.swipePanelOnlyClose=false;
          mainView.router.load({
            template: myApp.templates.index,
            animatePages: false,
            // context: {carpetas: info,cursos:info_curso},
            reload: true, 
          });  

    } else {
      // alert('>>Sin DAtos');
      // vvconsole(script({opcion:"usuario_entrar", email:user.email},1));
       // var data=script({opcion:"usuario_entrar", email:'walteromarr@gmail.com'},1)
      $$(".panel-left .content-block #login .image-temp").show();
      $$(".panel-left .content-block #login #imagen #image").hide();
      $$(".panel-left .content-block #login .usuario").html('Iniciar Sesión');

       $$('.toolbar-inferior').hide();
      myApp.params.swipePanelOnlyClose=true;
      mainView.router.load({
        template: myApp.templates.login,
        animatePages: false,
        // context: {carpetas: info,cursos:info_curso},
        reload: true, 
      }); 
// var data=script({opcion:"usuario_entrar", email:user.email},1);
        // document.querySelector("#image").src = data.imagen;
        // $$(".panel-left .content-block #login .usuario").html(data.usuario);
        // $$(".panel-left .content-block #login .image-temp").hide();
        // $$(".panel-left .content-block #login #imagen #image").show();

        // alert('fire not logged');
    }
  });

  
 
  function login() {
    window.plugins.googleplus.login(
        {
                 'webClientId' : '82712620086-qdln7okmju9irge1h2sa9cl4nkulp8pg.apps.googleusercontent.com',
                 'offline': true
        },
        function (obj) {
          // alert(obj);
            // document.querySelector("#image").src = obj.imageUrl;
            // document.querySelector("#image").style.visibility = 'visible';
            vconsole('Registrando usuario');
            script({opcion:"registro_google", id:obj.userId,usu:obj.displayName,email:obj.email,imagen:obj.imageUrl},1);
            // alert(1);
            var data=script({opcion:"usuario_entrar", email:obj.email},1);
            vconsole('Cargando datos de usuario');
            notificaciones_push();

            document.querySelector("#image").src = null;
              document.querySelector("#image").src = data.imagen;
              $$(".panel-left .content-block #login .usuario").html(data.usuario);
              $$(".panel-left .content-block #login .image-temp").hide();
              $$(".panel-left .content-block #login #imagen #image").show();
              Gusuario_id=data.id_usu;
              Gusuario_nombre=data.usuario;

            document.querySelector("#feedback").innerHTML = "Hi, " + obj.displayName + ", " + obj.email;
            if (!firebase.auth().currentUser) {

              

                document.querySelector("#feedback").innerHTML ='signing firebase';
                firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken))
                .then((success) => {
                    vvconsole("success: " + JSON.stringify(success)); // to long json to put it in #feedback
                })
                .catch((error) => {
                        document.querySelector("#feedback").innerHTML = "error0: " + JSON.stringify(error);
                      });
            }else{
                document.querySelector("#feedback").innerHTML ='error1: already sigend in firebase';
            }
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = "error2: " + msg;
        }
    );
  }
  
  function trySilentLogin() {
    window.plugins.googleplus.trySilentLogin(
        {},
        function (obj) {
          
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = "error: " + msg;
        }
    );
  }

  function logout() {
    trySilentLogin() ;
    window.plugins.googleplus.logout(
        function (msg) {
          document.querySelector("#image").style.visibility = 'hidden';
          document.querySelector("#feedback").innerHTML = msg;
          $$(".panel-left .content-block #login .image-temp").show();
            $$(".panel-left .content-block #login #imagen #image").hide();
            $$(".panel-left .content-block #login .usuario").html('Iniciar Sesión');
            myApp.closePanel();

            for(key in localStorage) {localStorage.removeItem(key);}

            Gusuario_id=0;
            Gusuario_nombre='';
          if(firebase.auth().currentUser){
            document.querySelector("#feedback").innerHTML ='signing out from firebase';
            firebase.auth().signOut();
          }
        },
        function (msg) {
          document.querySelector("#feedback").innerHTML = msg;
        }
    );
  }
  // function disconnect() {
  //   window.plugins.googleplus.disconnect(
  //       function (msg) {
  //         document.querySelector("#image").style.visibility = 'hidden';
  //         document.querySelector("#feedback").innerHTML = msg;

  //           $$(".panel-left .content-block #login .image-temp").show();
  //           $$(".panel-left .content-block #login #imagen #image").hide();
  //           $$(".panel-left .content-block #login .usuario").html('Iniciar Sesión');
  //           Gusuario_id=0;
  //           Gusuario_nombre='';
  //         if(firebase.auth().currentUser){
  //           document.querySelector("#feedback").innerHTML ='signing out from firebase';
  //           firebase.auth().signOut();

            

  //         }
  //       },
  //       function (msg) {

  //         document.querySelector("#feedback").innerHTML = msg;
  //       }
  //   );
  // }
  window.onerror = function(what, line, file) {
    vvconsole(what + '; ' + line + '; ' + file);
  };
  function handleOpenURL (url) {
    document.querySelector("#feedback").innerHTML = "App was opened by URL: " + url;
  }

