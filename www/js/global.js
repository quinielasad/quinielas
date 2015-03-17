/* fichero global con funciones globales, declaracion de variables y asignaciones a eventos*/

//VARIABLES GLOBALES
var _USER = new Object(); //variable global que representa al usuario que usa la app, objeto vacio al incializar.
var _BASEURL = "http://darteaga.com/webapp/quinielas/api/v1/" //http://darteaga.com http://localhost
var _ESTADOAPP = new Object();
var _VALUEPLENO = ["0 - 0","0 - 1", "0 - 2", "0 - M", "1 - 0", "1 - 1", "1 - 2", "1 - M", "2 - 0", "2 - 1", "2 - 2", "2 - M", "M - 0", "M - 1", "M - 2","M - M"];

//añade la funcion onDeviceReady para que se ejecute en el evento ondeviceready 
//(cuando el dispositivo este preparado y todo se haya cargado)
document.addEventListener("deviceready", onDeviceReady, false);

//funcion en la que se debeejecutar todo lo que se necesite dejar preparado a la hora de cargar la app
function onDeviceReady() {
	//cargar estado de la app
	getStatus();
	//funcion que lee del archivo login.txt para realizar el login recordando.
    readFileLogin();
    //llamada a la funcion que establece la funcionalidad del backbutton
    backButtonProperties();
    //añade funcionalidad al boton enviar del formulario.
	$("#login").submit(login);
	//funcionalidad al boton derecho salir
	$('.exit').on('vclick',function(){
		navigator.app.exitApp();
	});
	$(".apComun").on("vclick", getApuestaComun);
	//Añadiendo funcionalidad al boton "cerrar sesion" cuando cierra la sesion borra los datos del usuario del archivo.
	$('.logout').on('vclick', writeFileLogout);
}

//funciones para evitar que funcione el backButton en android
function backButtonProperties(){
	//añade la ejecucion de la funcion cuando el boton back es pulsado.
	document.addEventListener("backbutton", function (e) {
    	if($.mobile.activePage.is("#home") ){ //Accion del boton back si es home

    		if (confirm("¿Quiere salir de la app?")) { //pregunta si desea salir
    			navigator.app.exitApp(); //funcion que provoca la salida de la app
    		}else{
    			e.preventDefault(); //funcion que anula la accion por defecto del boton back
    		} 

    	}else if ($.mobile.activePage.is("#login_page")){ //acciones a realizar si el boton es pulsado en la pagina de login

    		if (confirm("¿Quiere salir de la app?")) {//pregunta si desea salir
    			navigator.app.exitApp();//funcion que provoca la salida de la app
    		}else{
    			e.preventDefault();//funcion que anula la accion por defecto del boton back
    		} 

    	}else{ //accion a realizar en el resto de paginas.
    		navigator.app.backHistory();   		
    	}
        
    }, false );
}

