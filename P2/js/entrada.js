function loadInfo(){
	//Cogemos la url
	let url = window.location.search;
	
	//Redireccionamiento
	if(url == ""){
		window.location="index.html";
	}else{
		//tratamiento
		url = url.replace("?","");
		url = url.replace("&","");
		url = url.replace("=",",");
		let params = url.split(",");
		
		url = "./rest/entrada/"+params[1];
		
		//abrimos el canal y hacemos la petición
		let xhr = new XMLHttpRequest(),
			finalText = "<h2>Lo sentimos, no hay información de la entrada que busca</h2>";
		
		xhr.open('GET',url,true);
		xhr.send();
		
		//mostramos la info de la entrada
		let parte1 = document.createElement("section");
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let datosJSON = JSON.parse(xhr.responseText);
					let i = 0;
					
					console.log(url + "  -  " +xhr.responseText);
					
					finalText ="";
					//Formateo del texto de la entrada
					finalText =
						"<h2>"+datosJSON["FILAS"][0]["nombre"]+"</h2>"+
						"<article>"+
							datosJSON["FILAS"][0]["descripcion_foto"]+
							"<address> Hecho por: "+datosJSON["FILAS"][0]["login"]+"</address>"+
							"<footer>"+
									"<time datetime='"+datosJSON["FILAS"][0]["fecha"]+"'>Fecha <br> "+datosJSON["FILAS"][0]["fecha"]+"</time>"+	
									"<a href='#galeria'>Fotos<br>"+datosJSON["FILAS"][0]["nfotos"]+"</p>"+
									"<a href='#comentarios'>Comentarios <br> "+datosJSON["FILAS"][0]["ncomentarios"]+"</p>"+
							"</footer>"+
						"</article>";
					
					//inserción en el main
					parte1.innerHTML = finalText;
					document.querySelector("main").appendChild(parte1);
					
					//Las peticiones deben de ir anidadas para que salgan en orden
					
					//Petición para las fotos
					let parte2 = document.createElement("section");
					
					let xhr2 = new XMLHttpRequest();
					url = "./rest/entrada/"+params[1]+"/fotos";
					finalText = "<h2>Lo sentimos, no hay fotos en esta galer&iacute;a.</h2>";
						
					xhr2.open('GET',url,true);
					xhr2.send();
					xhr2.onreadystatechange = function(){
						if(xhr2.readyState == 4){
							if(xhr2.status == 200){
								datosJSON = JSON.parse(xhr2.responseText);
								let i = 0;
								
								finalText ="<h2>Galer&iacute;a</h2>";
								
								console.log(xhr2.responseText);
								for( i = 0; i<datosJSON["FILAS"].length; i++){
								finalText += 
									"<figure>"+
										"<img src='"+datosJSON["FILAS"][i]["fichero"]+"' alt='"+datosJSON["FILAS"][i]["id"]+"'>"+
										"<p>"+datosJSON["FILAS"][i]["texto"]+"</p>"+
									"</figure>";
									
									let nodos = document.querySelectorAll("section");
									nodos[0].innerHTML = finalText;
								}
								
								//Inclusión en el main de la galería
								parte2.innerHTML = finalText;
								document.querySelector("main").appendChild(parte2);
								
								//Generación de comentarios, sólo si está logueado.
								let parte3 = document.createElement("section");
								
								//Petición para los comentarios
								let parte4 = document.createElement("section");
								
								xhr4 = new XMLHttpRequest();
								url = "./rest/entrada/"+params[1]+"/comentarios";
								finalText = "<h2>Lo sentimos, no hay fotos en esta galer&iacute;a.</h2>";
									
								xhr4.open('GET',url,true);
								xhr4.send();
								
								xhr4.onreadystatechange = function(){
									if(xhr4.readyState == 4){
										if(xhr4.status == 200){
											let datosJSON = JSON.parse(xhr4.responseText);
											let i = 0;
											
											finalText ="<h2>Comentarios</h2>";
											
											console.log(xhr4.responseText);
											/*for( i = 0; i<datosJSON["TOTAL_COINCIDENCIAS"]; i++){
											finalText = 
												"<article>"+
													"<h2>"+datosJSON["nombre"]+"</h2>"+
													datosJSON["FILAS"][i]["descripcion_foto"]+
													"<address>"+datosJSON["FILAS"][i]["login"]+"</address>"+
													"<footer>"+
															"<time datetime='"+datosJSON["FILAS"][i]["fecha"]+"'>Fecha <br> "+datosJSON["FILAS"][i]["fecha"]+"</time>"+	
															"<a href='#galeria'>Fotos<br>"+datosJSON["FILAS"][i]["nfotos"]+"</p>"+
															"<a href='#comentarios'>Comentarios <br> "+datosJSON["FILAS"][i]["ncomentarios"]+"</p>"+
													"</footer>"+
												"</article>";
												
												let nodos = document.querySelectorAll("section");
												nodos[0].innerHTML = finalText;
											}*/
											
											parte4.innerHTML = finalText;
											document.querySelector("main").appendChild(parte4);
										}else{
											parte4.innerHTML = finalText;
											document.querySelector("main").appendChild(parte2);
											console.log("ERROR: "+xhr4.responseText);
										}
									}
								}
							}else{
								
								//En caso de fallar
								parte2.innerHTML = finalText;
								document.querySelector("main").appendChild(parte2);
								console.log("ERROR: "+xhr2.responseText);
							}
						}
					}
					
				}else{
					parte1.innerHTML = finalText;
					document.querySelector("main").appendChild(parte1);
					console.log("ERROR: "+xhr.responseText);
				}
			}
		}
	}
	
}

function postearComment(){
	return false;
}
//Funciones automáticas al iniciar la página
function comprobarLogin(){
	if(sessionStorage.getItem('status')){
		return true;
	}
	else{
		
		return false;
	}
}

function setFooterTime(){
	let setting =  document.createElement("footer");
	
	//Conseguir el dia de mañana
	let day = new Date();
	let dd = day.getDate();
	let mm = day.getMonth()+1; //January is 0!

	let yyyy = day.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	day = yyyy+"-"+mm+"-"+dd;
	
	setting.innerHTML=
		"<nav>"+
			"<ul>"+
				"<li><time datetime="+day+">&copy; "+yyyy+"</time></li>"+
				"<li></li>"+
				"<li><a href='acerca.html'>Saber m&aacute;s</a></li>"+
			"</ul>"+
		"</nav>";
	document.body.appendChild(setting);
}

function loadEntrada(){
	loadInfo();
	setFooterTime();
}