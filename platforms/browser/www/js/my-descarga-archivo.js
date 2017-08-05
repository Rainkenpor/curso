function descargar_archivo(url,nombre_archivo){
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);
     

myApp.showIndicator();
    fileTransfer.download(
        uri,
        "///storage/emulated/0/Download/"+nombre_archivo,
        function(entry) {
            vconsole("download complete: " + entry.toURL());
            myApp.hideIndicator();
            myApp.alert('Se ha descargado el archivo '+nombre_archivo,"Curso 2.0");
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