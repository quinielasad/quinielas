//funcion para leer un archivo
function readFile(){
	//peticion que devuelve el sistema de archivo del dispoditivos para poder buscar el archivo.
	//el primer parametro es una constante para definir que el archivodebe persistir tras salir de la app
	//el segundo indica el tamaño que se debe reservar en el dispositivo, el siguiente funcion si exito,
	//el ultimo funcion si error.
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem){
		//ejecutar si exito haciendo uso del fileSystem
		fileSystem.root.getFile("login.txt", {create:true}, function (fileEntry){
			//funtion si exito en la busqueda
			fileEntry.file(function (file){
				//preparado para leer
				var reader = new FileReader();
				reader.readAsText(file);
				confirm(reader.result);

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

//funcion para escribir un archivo
function writeFile(){
	//comentar
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem){
		//ejecutar si exito haciendo uso del fileSystem
		fileSystem.root.getFile("login.txt", {create:true}, function (fileEntry){
			//funtion si exito en la busqueda
			fileEntry.createWriter(function (writer){
				//preparado para leer
				writer.write("example");
				confirm("ok writer");

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