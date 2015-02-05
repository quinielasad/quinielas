//funcion para leer un archivo
function readFileLogin(){
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
				//una vez finalizada la lectura del archivo se ejecuta esta acción.
				reader.onloadend = function(evt){
					var recordar  = $.parseJSON(reader.result);
					if (recordar.recordar == "on") {
						//rellenamos el _USER
						_USER.datosjson = JSON.stringify(recordar.data);//guardamos el JSON que representa al usuario
						_USER.datos = recordar.data;//guardamos un array que representa al usuario (LOLI HAS COMIOOOO!!!)
						
						//carga de datos...
						$("#bienvenida").text("¡Hola " + _USER.datos['username']+"!");

						/// recordar = on, muestra la pantalla "home"
						$.mobile.changePage("#home");
					}else{

					}
				}
				reader.readAsText(file);

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
function writeFileLogin(){
	//Igual que en la funcion readFile
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem){
		//ejecutar si exito haciendo uso del fileSystem
		fileSystem.root.getFile("login.txt", {create:true}, function (fileEntry){
			//funtion si exito en la busqueda. Llamada al metodo que de devuelve un FileWriter para el 
			//fileEntry con la funcion write escribimos en el archivo.
			fileEntry.createWriter(function (writer){

				writer.write('{"recordar":"on","data":'+_USER.datosjson+'}');

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
function writeFileLogout(){
	//Igual que en la funcion readFile
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem){
		//ejecutar si exito haciendo uso del fileSystem
		fileSystem.root.getFile("login.txt", {create:true}, function (fileEntry){
			//funtion si exito en la busqueda. Llamada al metodo que de devuelve un FileWriter para el 
			//fileEntry con la funcion write escribimos en el archivo.
			fileEntry.createWriter(function (writer){

				writer.write('{"recordar":"off","data":{}}');
				$.mobile.changePage("#login_page");

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