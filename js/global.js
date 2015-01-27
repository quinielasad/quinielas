/* fichero global con funciones globales, declaracion de variables y asignaciones a eventos*/
function login(){
	var datosUsuario = $("#username").val();
	var datosPassword = $("#password").val();
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion = "http://darteaga.com/webapp/quinielas/api/v1/loginUser.php?jsoncallback=?";

	$.getJSON( archivoValidacion+'&data={"username":"'+datosUsuario+'","password":"'+datosPassword+'"}', null).done(function(respuestaServer) {

		if(respuestaServer.estado == "OK"){
		  	//alert("ok");
		 	/// si la validacion es correcta, muestra la pantalla "home"
			$.mobile.changePage("#pagina5");
		  
		}else{
		  				
		  	$("#login_errors").append("<p>" +respuestaServer.estado + " mensaje: " + respuestaServer.message +"</p>");
		  				/// ejecutar una conducta cuando la validacion falla
		}
  
	});
	return false;
}

$(document).ready(function(){
	$("#login").submit(login);
});