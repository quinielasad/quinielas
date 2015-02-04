/* fichero global con funciones globales, declaracion de variables y asignaciones a eventos*/
function login(){
	var datosUsuario = $("#username").val();
	var datosPassword = $("#password").val();
	var datosRecord = $("#login #flip-mini option:selected").val();
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion = "http://darteaga.com/webapp/quinielas/api/v1/loginUser.php?jsoncallback=?";

	$.getJSON( archivoValidacion+'&data={"username":"'+datosUsuario+'","password":"'+datosPassword+'"}', null).done(function(respuestaServer) {

		if(respuestaServer.estado == "OK"){
			//si recordar esta activado escribe en el archivo.
			if(datosRecord=="on"){
				writeFile();
			}

		 	//Poner los campos del formulario en blanco.
		 	$("#username").val("");
			$("#password").val("");
			$("#login_errors").html("");
			/// si la validacion es correcta, muestra la pantalla "home"
			$.mobile.changePage("#home");
		  	
		}else{
		  	
		  	//Si la validación falla imprime error.	Selecciona el div con id="login_error" y añade un p con ese contenido		
		  	$("#login_errors").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	$(".login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
	return false;
}

//añade la funcion onDeviceReady para que se ejecute en el evento ondeviceready 
//(cuando el dispositivo este preparado y todo se haya cargado)
document.addEventListener("deviceready", onDeviceReady, false);

//funcion en la que se debeejecutar todo lo que se necesite dejar preparado a la hora de cargar la app
function onDeviceReady() {
	//funcion que lee del archivo login.txt para realizar el login recordando.
    readFile();
    //llamada a la funcion que establece la funcionalidad del backbutton
    backButtonProperties();
    //añade funcionalidad al boton enviar del formulario.
	$("#login").submit(login);
}

//funciones para evitar que funcione el backButton en android
function backButtonProperties(){
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
        
    }, false );
}
//funcion que añade las funcionalidad a los botones
$(document).ready(function(){
});

