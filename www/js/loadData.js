//funcion que obtiene el estatus de la app
function getStatus(callback){
	archivoValidacion = _BASEURL+"getStatus.php?jsoncallback=?";//se localiza el servicio web
	$.getJSON( archivoValidacion, null).done(function(respuestaServer) {
		//si la respuesta del serivor es OK
		if(respuestaServer.estado == "OK"){
			//guardando los datos
			_ESTADOAPP = respuestaServer.data;//guardamos el estado actual en una variable global.
			callback();
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
  	$(".tabla-apuesta-comun rcomun").attr("hidden","hidden");
  	//llama al servicio con una funcion que transforma el json devuelto en objeto javascript
	$.getJSON( archivoValidacion+'&data={"id":"'+idJornada+'"}', null).done(function(respuestaServer) {
		//si la respuesta del serivor es OK
		if(respuestaServer.estado == "OK"){
			//guardando los datos
			jornada = respuestaServer.data;//guardamos la jornada en una variable
			
			$("#home .contenido-nombre-jornada").html(""); //modificamos el nobre de la jornada que se localiza en ese <div>
			var table = $("<table class='tabla-apuesta-comun'>"+ //creamos a tabla a añadir al html
								"<tr class='linea-cabecera'>"+
									"<th></th>"+
									"<th class='left' colspan='2' >"+jornada.jornada.nombre+"</th>"+
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
									"<td colspan='2'>"+jornada.partidos[partido].local+" - "+jornada.partidos[partido].visitante+"</td>"+
									"<td class='center rcomun'>"+Math.round(jornada.partidos[partido].xcomun)+"</td>"+
									"<td class='center rcomun'>"+Math.round(jornada.partidos[partido].ycomun)+"</td>"+
									"<td class='center rcomun'>"+Math.round(jornada.partidos[partido].zcomun)	+"</td>"+
								"</tr>");
				}else{//si es pleno añadimos una linea mas de cabeceras y los datos del pleno
					table.append("<tr class='linea-cabecera'>"+
									"<th></th>"+
									"<th colspan='2' class='left'></th>"+
									"<th colspan='2'></th>"+
									"<th></th>"+
								"</tr>");
					table.append("<tr>"+
									"<td class='right' style='border:none'><b>"+ipartido+"</b></td>"+
									"<td colspan='2'><b>"+jornada.partidos[partido].local+" - "+jornada.partidos[partido].visitante+"</b></td>"+
									"<td class='center rcomun' colspan='3'><b>"+_VALUEPLENO[jornada.partidos[partido].xcomun-1]+"</b></td>"+
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

//funcion que llama al servicio REST para apuesta comun y optiene la joranda Actual
function getMiApuesta(){
	var idJornada = _ESTADOAPP.joractual;//id de la jornada actual utilizado para enviar al servicio web
	var iduser =_USER.datos.id;
	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion =  _BASEURL+"getApuesta.php?jsoncallback=?";//se localiza el servicio web

  	$("#myAp select").attr("hidden","hidden");

  	//llama al servicio con una funcion que transforma el json devuelto en objeto javascript
	$.getJSON( archivoValidacion+'&data={"id":"'+idJornada+'","idUser":"'+iduser+'"}', null).done(function(respuestaServer) {
		//si la respuesta del serivor es OK
		if(respuestaServer.estado == "OK"){
			//guardando los datos
			jornada = respuestaServer.data;//guardamos la jornada en una variable
			$("#myAp .estado-apuesta").html("Estado: "+ _ESTADOAPP.estado);
			$("#myAp .contenido-nombre-jornada").html("<button onclick='setMiApuesta()' class='ui-btn ui-input-btn ui-corner-all ui-shadow' data-role='button'>Guardar</button>"); //modificamos el nobre de la jornada que se localiza en ese <div>
			var table = $("<table class='tabla-Miapuesta'>"+ //creamos a tabla a añadir al html
								"<tr class='linea-cabecera'>"+
									"<th></th>"+
									"<th class='left' colspan='2'>"+jornada.jornada.nombre+"</th>"+
									"<th>Apuesta</th>"+
								"</tr>"+
							"</table>");

			for (var partido in jornada.partidos){ //por cada partido 
				var ipartido = parseInt(partido) + 1;
				if(jornada.partidos[partido].espleno != 1){ //si no es pleno añadimos una linea de la tabla con sus datos
					table.append("<tr>"+
									"<td class='right' style='border:none'>"+ipartido+"</td>"+
									"<td colspan='2'>"+jornada.partidos[partido].local+" - "+jornada.partidos[partido].visitante+"</td>"+
									"<td class='center'><select type='text' class='partido' id='"+jornada.partidos[partido].id+"'>"+
															"<option value='0'>.</option>"+
															"<option value='1'>1</option>"+
															"<option value='3'>X</option>"+
															"<option value='2'>2</option>"+
														"</select>"+
									"</td>"+

								"</tr>");
				}else{//si es pleno añadimos una linea mas de cabeceras y los datos del pleno
					/*table.append("<tr class='linea-cabecera'>"+
									"<th></th>"+
									"<th colspan='2' class='left'></th>"+
									"<th></th>"+
								"</tr>");*/
					table.append("<tr>"+
									"<td class='right' style='border:none'><b>"+ipartido+"</b></td>"+
									"<td colspan='2'><b>"+jornada.partidos[partido].local+" - "+jornada.partidos[partido].visitante+"</b></td>"+
									"<td class='center'><select type='text' class='partido ' id='"+jornada.partidos[partido].id+"'>"+
															"<option value='0'>...</option>"+
															"<option value='1'>0 - 0</option>"+
															"<option value='2'>0 - 1</option>"+
															"<option value='3'>0 - 2</option>"+
															"<option value='4'>0 - M</option>"+
															"<option value='5'>1 - 0</option>"+
															"<option value='6'>1 - 1</option>"+
															"<option value='7'>1 - 2</option>"+
															"<option value='8'>1 - M</option>"+
															"<option value='9'>2 - 0</option>"+
															"<option value='10'>2 - 1</option>"+
															"<option value='11'>2 - 2</option>"+
															"<option value='12'>2 - M</option>"+
															"<option value='13'>M - 0</option>"+
															"<option value='14'>M - 1</option>"+
															"<option value='15'>M - 2</option>"+
															"<option value='16'>M - M</option>"+
														"</select>"+
									"</td>"+
								"</tr>");
				}
			}
			
			//añadimos la tabla al contenido de la pagina para mostrar
			$("#myAp .contenido .wrapper-tabla").html(table);

			for (var partido in jornada.partidos){
				var apuestas = jornada.partidos[partido].apuestas;
				for(var apuesta in apuestas){
					$('.tabla-Miapuesta #'+apuestas[apuesta].partido+' option[value="'+apuestas[apuesta].valor+'"]').attr('selected', 'selected');
				}
			}
		}else{
		  	//Si la validación falla imprime error.	Selecciona el div con id=".wrapper-tabla" y añade un p con ese contenido		
		  	$("#myAp .contenido .wrapper-tabla").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>");
		  	//$(".login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
	
}

function setMiApuesta(){
	var idJornada =_ESTADOAPP.joractual;//id de la jornada actual utilizado para enviar al servicio web
	var iduser =_USER.datos.id;

	var ar = {};
	$('.tabla-Miapuesta .partido').each(function(index, value){ar[$(this).attr("id")]= $(this).find("option:checked").val();});

	var arjson = JSON.stringify(ar);

	//prod: http://darteaga.com
	//des: http://localhost
  	archivoValidacion =  _BASEURL+"putApuesta.php?jsoncallback=?";//se localiza el servicio web

	$("#myAp .contenido-nombre-jornada button").attr("disabled","disabled");
	$("#myAp select").attr("disabled","disabled");
  	//llama al servicio con una funcion que transforma el json devuelto en objeto javascript
	$.getJSON( archivoValidacion+'&data={"idJornada":"'+idJornada+'", "idUser":"'+iduser+'", "data":'+ arjson +'}', null).done(function(respuestaServer) {
		//si la respuesta del serivor es OK
		if(respuestaServer.estado == "OK"){

			$("#myAp select").removeAttr("disabled");
			$("#myAp .contenido-nombre-jornada button").removeAttr("disabled");

		}else{
			$("#myAp .contenido-nombre-jornada button").removeAttr("disabled");
		  	//Si la validación falla imprime error.	Selecciona el div con id=".wrapper-tabla" y añade un p con ese contenido		
		  	$("#myAp .contenido .wrapper-tabla").html("<p class='login_error'>" +respuestaServer.estado + ": " + respuestaServer.message +"</p>" + $("#myAp .contenido .wrapper-tabla").html());
		  	$(".login_error").delay(3000).fadeOut(600); // añade a los p con la clase="login_error" el efecto de desvanecimiento.
		}
  
	});
	
}