//Variable de la id de entrada para recargar los comentarios
var id_entrada;

//Blockeo de posteo de formulario
var alertComment = false;

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
		id_entrada = params[1];
		

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
					
					//Formateo del texto de la entrada
					finalText =
						"<h2>"+datosJSON["FILAS"][0]["nombre"]+"</h2>"+
						"<article>"+
							datosJSON["FILAS"][0]["descripcion_foto"]+
							"<address> Creado por: "+datosJSON["FILAS"][0]["login"]+"</address>"+
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
					
					//_________________________________________________
					
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
								
								if(datosJSON["FILAS"].length == 0){
									finalText +="<p>Esta galer&iacute;a no tiene fotos.</p>";
								}else{
									for( i = 0; i<datosJSON["FILAS"].length; i++){
									finalText += 
										"<figure>"+
											"<img src='img/"+datosJSON["FILAS"][i]["fichero"]+"' alt='"+datosJSON["FILAS"][i]["id"]+"'>"+
											"<p>"+datosJSON["FILAS"][i]["texto"]+"</p>"+
										"</figure>";
									}
								}
								
								//Inclusión en el main de la galería
								parte2.innerHTML = finalText;
								document.querySelector("main").appendChild(parte2);
								
								
								//_________________________________________________
								
								//Generación de comentarios, sólo si está logueado.
								let parte3 = document.createElement("section");
								finalText = "<h2>Generar comentario</h2>";
								
								if(comprobarLogin()){
									finalText +=
									"<form id='formComment' onsubmit='postearComment(this);return false;'>"+
										"<fieldset>"+
											"<label for='name'>T&iacute;tulo</label>"+
											"<input id='name' type='text' maxlength='50' required>"+
										
											"<label for='comment'>Comentario</label>"+
											"<textarea id='comment' required></textarea>"+
											
											"<input type='hidden' name='idEntrada' id='id_entrada' value='"+params[1]+"'>"+
											"<input type='submit' value='Enviar'>"+
										"</fieldset>"+
									"</form>";
										
									parte3.innerHTML = finalText;
									document.querySelector("main").appendChild(parte3);
								}else{
									finalText +="<p>Debes de estar <a href='login.html'></a> para poder dejar un comentario.</p>";
									parte3.innerHTML = finalText;
									document.querySelector("main").appendChild(parte3);
								}
											
								//Petición para los comentarios
								loadComments();
								
							}else{
								
								//En caso de fallar
								parte2.innerHTML = finalText;
								document.querySelector("main").appendChild(parte2);
								console.log("ERROR: "+xhr2.responseText);
							}
						}
					}
					
				}else{
					//En caso de fallar la búsqueda de la entrada
					parte1.innerHTML = finalText;
					document.querySelector("main").appendChild(parte1);
					console.log("ERROR: "+xhr.responseText);
				}
			}
		}
	}
	
}
//Función para cargar el menú
function loadMenu(){
	let header = document.querySelector("header");
	if(comprobarLogin()){
		let html = 
		"<input type='checkbox' id='ckb-menu'>"+
		"<nav class='menu'>"+
			"<ul  id='menuPrincipal'>"+
				"<li><label for='ckb-menu'>&equiv;</label></li>"+
				"<li><a class='icon-home' href='index.html'>Inicio</a></li>"+
				"<li><a class='icon-search' href='buscar.html'>Buscar</a></li>"+
				"<li id='signout'><a onclick='cerrarSesion();' class='icon-logout' href=''>Cerrar sesi&oacute;n</a></li>"+
				"<li><a class='icon-book-open' href='nueva-entrada.html'>Nueva entrada</a></li>"+
			"</ul>"+
		"</nav>";
		
		header.innerHTML = header.innerHTML + html;
		
	}else{
		let html = 
		"<input type='checkbox' id='ckb-menu'>"+
		"<nav class='menu'>"+
			"<ul  id='menuPrincipal'>"+
				"<li><label for='ckb-menu'>&equiv;</label></li>"+
				"<li><a class='icon-home' href='index.html'>Inicio</a></li>"+
				"<li><a class='icon-search' href='buscar.html'>Buscar</a></li>"+
				"<li><a class='icon-user' href='registro.html'>Registro</a></li>"+
				"<li id='signin'><a class='icon-login-1' href='login.html'>Iniciar sesi&oacute;n</a></li>"+
			"</ul>"+
		"</nav>";
		
		header.innerHTML = header.innerHTML + html;
	}
}

//Función para el formulario de posteado de comments
function postearComment(frm){
	if(alertComment == false){
		let formulario = new FormData();
		let xhr = new XMLHttpRequest(),
			url = "./rest/comentario/",
			du = JSON.parse(sessionStorage['du']);
			
		formulario.append('login',du.login);
		formulario.append('titulo',frm.querySelector('input[id=name]').value);
		formulario.append('texto',frm.querySelector('textarea[id=comment]').value);
		formulario.append('id_entrada',frm.querySelector('input[id=id_entrada]').value);
		
		xhr.open("POST",url,true);
		
		xhr.setRequestHeader('Authorization', du.clave);
		
		
		
		xhr.send(formulario);
		
		//Control de variable
		var ok = false;
		
		
		xhr.onreadystatechange = function(){
			if(xhr.responseText != null  && xhr.responseText != "" && ok==false){
				ok = true;
				
				let respuesta = JSON.parse(xhr.responseText);
				
				//Si la confirmación es positiva, alertamos correctamente y recargamos los comentarios
				if(respuesta["RESULTADO"] == "ok"){
					//Si existe ya la zona de comentarios, lo borramos y actualizamos por uno nuevo
					let existe = document.getElementsByClassName("comments");
					if(existe != null){
						for(var i = 0; i<existe.length;i++){
							document.querySelector("main").removeChild(existe[i]);
						}
						
					}
					
					generaPopUp("Comentario enviado correctamente.",true);
					
				}else{
					//Sino, alertamos de que no se ha podido realizar
					generaPopUp("Comentario fallido. Int&eacute;ntelo de nuevo.",false);
				}
			}
		}
		
		//Si se ha completado, devuelve true
		if(ok){
			return false;
		}
	}else{
		return false;
	}
}

//Carga la zona de comentarios de la entrada
function loadComments(){

	//Creamos el nodo
	let parte4 = document.createElement("section");
	parte4.setAttribute("class","comments");
	
	//Inicializamos las variables
	let xhr4 = new XMLHttpRequest();
	let url = "./rest/entrada/"+id_entrada+"/comentarios";
	let finalText = "<h2>Lo sentimos, no hay comentarios en esta galer&iacute;a.</h2>";
	
	//Enviamos la petición
	xhr4.open('GET',url,true);
	xhr4.send();
	
	xhr4.onreadystatechange = function(){
		if(xhr4.readyState == 4){
			if(xhr4.status == 200){
				let datosJSON = JSON.parse(xhr4.responseText);
				let i = 0;
				
				finalText ="<h2>Comentarios</h2>";

				//Formateamos el texto
				if(datosJSON["FILAS"] == 0){
					finalText +="<p>Esta galer&iacute;a no tiene comentarios a&uacute;n.</p>";
					if(comprobarLogin()){
						finalText+="<p>&#161;Deja el primero!</p>";
					}
				}else{
					for( i = 0; i<datosJSON["FILAS"].length; i++){
					finalText += 
						"<article>"+
							"<header>"+
								"<a href='#comentar'>"+datosJSON["FILAS"][i]["titulo"]+"</a>"+
								"<p>"+datosJSON["FILAS"][i]["texto"]+"</p>"+
							"</header>"+
							
							"<footer>"+
									"<time datetime='"+datosJSON["FILAS"][i]["fecha"]+"'>Fecha <br> "+datosJSON["FILAS"][i]["fecha"]+"</time>"+	
									"<address>Autor: "+datosJSON["FILAS"][i]["login"]+"</address>"+
									"<a class='respuesta' onclick='commentFocus("+datosJSON["FILAS"][i]["id"]+");return false;' href='#comentar?id="+id_entrada+"'>Responder</a>"+
							"</footer>"+
						"</article>";
					}
				}
				
				//Lo añadimos al main
				parte4.innerHTML = finalText;
				document.querySelector("main").appendChild(parte4);
			}else{
				
				//En caso de fallar los comentarios
				parte4.innerHTML = finalText;
				document.querySelector("main").appendChild(parte4);
				console.log("ERROR: "+xhr4.responseText);
			}
		}
	}
}

//Mensaje que se genera en el formulario para alertar de la correcta subida o no del comment
function generaPopUp(mensaje, check){
	let frm = document.getElementById("formComment");

	let html = "";

	//Mostrar mensaje de alerta. Creamos los divs.
	let capa2 = document.createElement('div'),
	capa1 = document.createElement('article');
	
	//Para inutilizarlo
	alertComment = true;
	
	//Check que indica si sale una cosa u otra
	if(check == true){
		html += "<p>"+mensaje+"</p>";
		//Carga los nuevos comentarios
		loadComments();
		
		//Reinicia los valores
		formComment.name.value = "";
		formComment.comment.value = "";
		
		//Botón que borra la alerta
		html += "<button onclick='this.parentNode.parentNode.remove();alertComment=true;return false;'>Cerrar</button>";
	}else{
		field.innerHTML = "<p>"+mensaje+"</p>";
		html += "<button onclick='this.parentNode.parentNode.remove();alertComment=true;return false;' href='#comments'>Cerrar</button>";
	}
	
	//Añade los html
    capa2.appendChild(capa1);
	capa1.innerHTML = html;

    capa2.classList.add('capa2'); 
    capa1.classList.add('capa1');

    document.body.appendChild(capa2);
	return false;
}

//Función de cerrar sesión
function cerrarSesion(){
	sessionStorage.clear();
	volverIndex();
	return false;
}
//Funciones automáticas al iniciar la página
//Comprobar el login
function comprobarLogin(){
	if(sessionStorage.getItem('status')){
		return true;
	}
	else{
		
		return false;
	}
}

function commentFocus(id){
	let pedidoExpress = new XMLHttpRequest();
	let urlExpress = "./rest/comentario/"+id;
	
	let nombreValue = "RE: ";
	
	pedidoExpress.open("GET",urlExpress,true);
	pedidoExpress.send();
	pedidoExpress.onreadystatechange = function(){
		if(pedidoExpress.readyState == 4){
			if(pedidoExpress.status == 200){
				let respuestaExpress = JSON.parse(pedidoExpress.responseText);
				nombreValue += respuestaExpress["FILAS"][0]["titulo"];
				
				let frm = document.getElementById("formComment");
				frm.name.value = nombreValue;
				
				frm.focus();
				frm.comment.focus();
			}
		}
	}
	return false;
}

//Poner la fecha del dia correctamente
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

//Cargarlo todo
function loadEntrada(){
	loadMenu();
	loadInfo();
	setFooterTime();
}