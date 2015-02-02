//funcion para leer un archivo
function readFile(onsuccess, file){
	//peticion que devuelve el sistema de archivo del dispoditivos para poder buscar el archivo.
	//el primer parametro es una constante para definir que el archivodebe persistir tras salir de la app
	//el segundo indica el tamaño que se debe reservar en el dispositivo, el siguiente funcion si exito,
	//el ultimo funcion si error.
	window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function (fileSystem, onsuccess, file){
		//ejecutar si exito haciendo uso del fileSystem
		fileSystem.root.getFile(file, {create:true}, function (fileEntry, onsuccess){
			//funtion si exito en la busqueda
			fileEntry.file(function (file, onsuccess){
				//preparado para leer
				var reader = new FileReader();
				reader.readAsText(file);
				onsuccess(reader.result);

			}, function (e){
				//error no puede leer
				confirm(e);
			});
		}, function (e){
			//funcion si error
			confirm(e);
		});
	}, function(e){
		//ejecutar si el acceso al archivo falla
		confirm(e);
	});
}