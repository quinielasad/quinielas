function getApuestaComun(){
	var idJornada = "1";
	
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion = "http://darteaga.com/webapp/quinielas/api/v1/getJornada.php?jsoncallback=?";

	$.getJSON( archivoValidacion+'&data={"id":"'+idJornada+'"}', null).done(function(respuestaServer) {

		if(respuestaServer.estado == "OK"){
			//guardando los datos
			jornada = respuestaServer.data;//guardamos un array que representa al usuario
			
			$("#home .contenido").html(jornada.jornada.nombre);

		}else{
		  	//Si la validación falla imprime error.	Selecciona el div con id="login_error" y añade un p con ese contenido		
		  	//$("#login_errors").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	//$(".login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
	
}