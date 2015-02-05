function login(){
	var datosUsuario = $("#username").val();
	var datosPassword = $("#password").val();
	var datosRecord = $("#recordar").is(":checked");//devuelve true si recordar esta seleccionado
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion = "http://darteaga.com/webapp/quinielas/api/v1/loginUser.php?jsoncallback=?";
  	disableLoginForm ();
	$.getJSON( archivoValidacion+'&data={"username":"'+datosUsuario+'","password":"'+datosPassword+'"}', null).done(function(respuestaServer) {

		if(respuestaServer.estado == "OK"){
			//guardando los datos
			_USER.datosjson = JSON.stringify(respuestaServer.data);//guardamos el JSON que representa al usuario
			_USER.datos = respuestaServer.data;//guardamos un array que representa al usuario

		 	//Poner los campos del formulario en blanco.
		 	$("#username").val("");
			$("#password").val("");
			$("#login_errors").html("");
			/// si la validacion es correcta, muestra la pantalla "home"
			$.mobile.changePage("#home");

		  	//si recordar esta activado escribe en el archivo.
			if(datosRecord){
				writeFileLogin();
			}
			
			//carga de datos...
			$("#bienvenida").text("¡Hola " + _USER.datos['username']+"!");

		}else{

		  	//Si la validación falla imprime error.	Selecciona el div con id="login_error" y añade un p con ese contenido		
		  	$("#login_errors").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	$(".login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
	return false;
}
