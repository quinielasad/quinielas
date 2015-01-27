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
			$.mobile.changePage("#home");
		  
		}else{
		  				
		  	$("#login_errors").append("<p>" +respuestaServer.estado + " mensaje: " + respuestaServer.message +"</p>");
		  				/// ejecutar una conducta cuando la validacion falla
		}
  
	});
	return false;
}

//funciones para evitar que funcione el backButton en android
function onDeviceReady() {
   document.addEventListener("backbutton", onBackKeyPress, false);
}
function onBackKeyPress() {
    /* If the current page is the login page, disable the button completely (aka do nothing) */
    if ($.mobile.activePage.attr('id') == 'login_page') {

    }else {
        if (confirm("¿Quieres salir de la app?")) {
        /* Here is where my AJAX code for logging off goes */
        }else {
            return false;
        }
    }
}
document.addEventListener("deviceready", onDeviceReady, false);

//funcion que añade las funcionalidad a los botones
$(document).ready(function(){
	$("#login").submit(login);
});

