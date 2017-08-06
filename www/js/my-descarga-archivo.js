function descargar_archivo(url,nombre_archivo){
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);


    var extension=extension_archivo(nombre_archivo);
    console.log(extension);
    if (extension.mdi==''){
        myApp.alert('No es posible abrir el archivo '+nombre_archivo,"Curso 2.0");
        return ;
    }

    myApp.showIndicator();
    fileTransfer.download(
        uri,
        "///storage/emulated/0/Download/"+nombre_archivo,
        function(entry) {
            vconsole("download complete: " + entry.toURL());
            myApp.hideIndicator();

            cordova.plugins.fileOpener2.open(
                  "///storage/emulated/0/Download/"+nombre_archivo, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
                extension.mdi,
                {
                    error : function(e) {
                        vconsole('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success : function () {
                        vconsole('file opened successfully');
                    }
                }
            );
        },
        function(error) {
            vconsole("download error source " + error.source);
            vconsole("download error target " + error.target);
            vconsole("download error code" + error.code);
            myApp.hideIndicator();
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}
