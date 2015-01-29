/* fichero global con funciones globales, declaracion de variables y asignaciones a eventos*/
function login(){
	var datosUsuario = $("#username").val();
	var datosPassword = $("#password").val();
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion = "http://darteaga.com/webapp/quinielas/api/v1/loginUser.php?jsoncallback=?";

	$.getJSON( archivoValidacion+'&data={"username":"'+datosUsuario+'","password":"'+datosPassword+'"}', null).done(function(respuestaServer) {

		if(respuestaServer.estado == "OK"){
		 	//Poner los campos del formulario en blanco.
		 	$("#username").val("");
			$("#password").val("");
			$("#login_errors").html("");
			/// si la validacion es correcta, muestra la pantalla "home"
			$.mobile.changePage("#home");
		  
		}else{
		  	
		  	//Si la validación falla imprime error.			
		  	$("#login_errors").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	$(".login_error").delay(3000).fadeOut(600);
		}
  
	});
	return false;
}

//funciones para evitar que funcione el backButton en android
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", function (e) {
    	if($.mobile.activePage.is("#home") ){
    		if (confirm("¿Quiere salir de la app?")) {
    			navigator.app.exitApp();
    		}else{
    			e.preventDefault();
    		} 
    	}else if ($.mobile.activePage.is("#login_page")){
    		if (confirm("¿Quiere salir de la app?")) {
    			navigator.app.exitApp();
    		}else{
    			e.preventDefault();
    		} 
    	}else{
    		navigator.app.backHistory();   		
    	}
        
    }, false );}

//funcion que añade las funcionalidad a los botones
$(document).ready(function(){
	$("#login").submit(login);
});

