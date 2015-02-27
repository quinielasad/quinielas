//funcion que obtiene el estatus de la app
function getStatus(){
	archivoValidacion = _BASEURL+"getStatus.php?jsoncallback=?";//se localiza el servicio web
	$.getJSON( archivoValidacion, null).done(function(respuestaServer) {
		//si la respuesta del serivor es OK
		if(respuestaServer.estado == "OK"){
			//guardando los datos
			_ESTADOAPP = respuestaServer.data;//guardamos el estado actual en una variable global.
			
		}else{
		  	//Si la validación falla imprime error.	Selecciona el div con id=".wrapper-tabla" y añade un p con ese contenido		
			$("#login_errors").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
			$("#home .contenido .wrapper-tabla").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	$("#login_errors .login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
}
//funcion que llama al servicio REST para apuesta comun y optiene la joranda Actual
function getApuestaComun(){
	var idJornada = _ESTADOAPP.joractual;//id de la jornada actual utilizado para enviar al servicio web
	
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion =  _BASEURL+"getJornada.php?jsoncallback=?";//se localiza el servicio web

  	//llama al servicio con una funcion que transforma el json devuelto en objeto javascript
	$.getJSON( archivoValidacion+'&data={"id":"'+idJornada+'"}', null).done(function(respuestaServer) {
		//si la respuesta del serivor es OK
		if(respuestaServer.estado == "OK"){
			//guardando los datos
			jornada = respuestaServer.data;//guardamos la jornada en una variable
			
			$("#home .contenido-nombre-jornada").html(jornada.jornada.nombre); //modificamos el nobre de la jornada que se localiza en ese <div>
			var table = $("<table class='tabla-apuesta-comun'>"+ //creamos a tabla a añadir al html
								"<tr class='linea-cabecera'>"+
									"<th></th>"+
									"<th class='left'>Local</th>"+
									"<th class='left'>Visitante</th>"+
									"<th>1</th>"+
									"<th>X</th>"+
									"<th>2</th>"+
								"</tr>"+
							"</table>");

			for (var partido in jornada.partidos){ //por cada partido 
				var ipartido = parseInt(partido) + 1;
				if(jornada.partidos[partido].espleno != 1){ //si no es pleno añadimos una linea de la tabla con sus datos
					table.append("<tr>"+
									"<td class='right' style='border:none'>"+ipartido+"</td>"+
									"<td>"+jornada.partidos[partido].local+"</td>"+
									"<td>"+jornada.partidos[partido].visitante+"</td>"+
									"<td class='center'>"+jornada.partidos[partido].xcomun+"</td>"+
									"<td class='center'>"+jornada.partidos[partido].ycomun+"</td>"+
									"<td class='center'>"+jornada.partidos[partido].zcomun+"</td>"+
								"</tr>");
				}else{//si es pleno añadimos una linea mas de cabeceras y los datos del pleno
					table.append("<tr class='linea-cabecera'>"+
									"<th></th>"+
									"<th colspan='2' class='left'>Pleno al quince</th>"+
									"<th>L</th>"+
									"<th>V</th>"+
									"<th></th>"+
								"</tr>");
					table.append("<tr>"+
									"<td class='right' style='border:none'><b>"+ipartido+"</b></td>"+
									"<td><b>"+jornada.partidos[partido].local+"</b></td>"+
									"<td><b>"+jornada.partidos[partido].visitante+"</b></td>"+
									"<td class='center'><b>"+jornada.partidos[partido].xcomun+"</b></td>"+
									"<td class='center'><b>"+jornada.partidos[partido].ycomun+"</b></td>"+
									"<td class='center'>"+"</td>"+
								"</tr>");
				}
			}//añadimos la tabla al contenido de la pagina para mostrar
			$("#home .contenido .wrapper-tabla").html(table);
		}else{
		  	//Si la validación falla imprime error.	Selecciona el div con id=".wrapper-tabla" y añade un p con ese contenido		
		  	$("#home .contenido .wrapper-tabla").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	//$(".login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
	
}