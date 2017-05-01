var busquedaActual = "";
var actualPage = 0;
var postperpag = 6;

//Mandar la petici�n de b�squeda y mostrar los resultados
function loadPagBusqueda(frm){
	//Coger informacion del form
	let pag = 0;
	let num = 6;
	
	let puesto = false;
	let titulo = document.getElementById("titulo-buscar").value;
	let texto = document.getElementById("texto-buscar").value;
	let autor = document.getElementById("autor-buscar").value;
	let fempieza = document.getElementById("fechaEntrada-buscar").value;
	let ffin = document.getElementById("fechaSalida-buscar").value;
	
	let xhr = new XMLHttpRequest(),
		url = "./rest/entrada/",
		finalText = "<h2>Lo sentimos, no se ha podido atender la petici&oacute;n en este momento.</h2>";
	
	//adaptar link
	url+="?"
	if(titulo!=""){
		url+="n="+titulo;
		puesto=true;
	}
	
	if(texto!=""){
		if(puesto){
			url+="&";
		}
		url+="d="+texto;
		puesto = true;
	}
	
	if(autor!=""){
		if(puesto){
			url+="&";
		}
		url+="l="+autor;
		puesto = true;
	}
	
	if(fempieza!=""){
		if(puesto){
			url+="&";
		}
		url+="fi="+fempieza;
		puesto=true;
	}
	
	if(ffin!=""){
		if(puesto){
			url+="&";
		}
		url+="ff="+ffin;
		puesto = true;
	}
	
	
	//Para posteriores busquedas con paginacion
	busquedaActual = url;
	
	
	if(puesto){
		url+="&";
	}
		
	url += "pag="+pag+"&lpag="+num;
	
	console.log(url);
	
	xhr.open('GET',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let datosJSON = JSON.parse(xhr.responseText);
					let i = 0;
					console.log(xhr.responseText);
					finalText = "";
					
					for( i = 0; i<datosJSON["FILAS"].length; i++){
						finalText += 
						"<article>"+
							"<img src=img/"+datosJSON["FILAS"][i]["fichero"]+" alt="+datosJSON["FILAS"][i]["nombre"]+" >"+
							"<p>"+datosJSON["FILAS"][i]["descripcion_foto"]+
								"<a href='entrada.html"+datosJSON["FILAS"][i]["id"]+"'>Ver m&aacute;s </a>"+
							"</p>"+
								
							"<a href='entrada.html"+datosJSON["FILAS"][i]["id"]+"'>"+datosJSON["FILAS"][i]["nombre"]+"</a>"+
							"<address>"+datosJSON["FILAS"][i]["login"]+"</address>"+
							"<footer>"+
								"<time datetime='"+datosJSON["FILAS"][i]["fecha"]+"'>Fecha <br> "+datosJSON["FILAS"][i]["fecha"]+"</time>"+	
								"<p>Fotos<br>"+datosJSON["FILAS"][i]["nfotos"]+"</p>"+
								"<p>Comentarios <br> "+datosJSON["FILAS"][i]["ncomentarios"]+"</p>"+
							"</footer>"+
						"</article>";
					}
					
					document.getElementById("muestraBusqueda").innerHTML = finalText;
				}else{
					document.getElementById("muestraBusqueda").innerHTML = finalText;
					console.log("ERROR: "+xhr.responseText);
				}
			}
	}
	
	loadPaginationBuscar();
	
	return false;
};

//Cargar la b�squeda en funci�n de los resultados
function loadPagAux(pag,num){
	
	var xhr = new XMLHttpRequest(),
		url = "./rest/entrada/",
		finalText = "<h2>Lo sentimos, pero no hay suficientes datos para esta petici�n.</h2>";
	
	
	//Para posteriores busquedas con paginacion
	url = busquedaActual;
	
	if(url != "./rest/entrada/"){
		url +="&";
		url += "pag="+pag+"&lpag="+num;
	}else{
		url += "?pag="+pag+"&lpag="+num;
	}
	
	
	
	xhr.open('GET',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let datosJSON = JSON.parse(xhr.responseText);
					let i = 0;
					console.log(xhr.responseText);
					finalText = "";
					
					for( i = 0; i<datosJSON["FILAS"].length; i++){
						finalText += 
						"<article>"+
							"<img src=img/"+datosJSON["FILAS"][i]["fichero"]+" alt="+datosJSON["FILAS"][i]["nombre"]+" >"+
							"<p>"+datosJSON["FILAS"][i]["descripcion_foto"]+
								"<a href='entrada.html"+datosJSON["FILAS"][i]["id"]+"'>Ver m&aacute;s </a>"+
							"</p>"+
								
							"<a href='entrada.html"+datosJSON["FILAS"][i]["id"]+"'>"+datosJSON["FILAS"][i]["nombre"]+"</a>"+
							"<address>"+datosJSON["FILAS"][i]["login"]+"</address>"+
							"<footer>"+
								"<time datetime='"+datosJSON["FILAS"][i]["fecha"]+"'>Fecha <br> "+datosJSON["FILAS"][i]["fecha"]+"</time>"+	
								"<p>Fotos<br>"+datosJSON["FILAS"][i]["nfotos"]+"</p>"+
								"<p>Comentarios <br> "+datosJSON["FILAS"][i]["ncomentarios"]+"</p>"+
							"</footer>"+
						"</article>";
					}
					
					document.getElementById("muestraBusqueda").innerHTML = finalText;
				}else{
					document.getElementById("muestraBusqueda").innerHTML = finalText;
					console.log("ERROR: "+xhr.responseText);
				}
			}
	}
	
	return false;
};

//Cargar la paginaci�n
function loadPaginationBuscar(){
	var bar =  document.querySelector("nav[class=pag]");
	
	//Para poner pedir la �ltima p�gina
	var xhr = new XMLHttpRequest(),
		url = busquedaActual;
		totalPosts = 0;
	
	
	
	xhr.open('GET',url,true);
	xhr.send();
	
	xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					var datosJSON = JSON.parse(xhr.responseText);
					totalPosts = datosJSON["FILAS"].length;
					console.log(xhr.responseText);
				}else{
					console.log("ERROR: "+xhr.responseText);
				}
			}
	}
	totalPags = Math.ceil(totalPosts / postperpag);
	
	if(actualPage == 0){
		bar.innerHTML = 
		"<ul>"+
			"<li>Actual (1)</li>"+
			"<li onclick='loadPagAux(1,postperpag)'>2</li>"+
			"<li onclick='loadPagAux(2,postperpag)'>3</li>"+
			"<li onclick='loadPagAux("+(totalPags-1)+",postperpag)'>&Uacute;ltima</li>"+
			"<li onclick='loadPagAux("+(actualPage+1)+",postperpag)'>Next</li>"+
		"</ul>";
	}else{
		if(actualPage == totalpags){
			bar.innerHTML = 
			"<ul>"+
				"<li onclick='loadPagAux("+(actualPage-1)+",postperpag)'>Anterior</li>"+
				"<li onclick='loadPagAux(0,postperpag)'>Primera</li>"+
				"<li onclick='loadPagAux("+(totalPags-3)+",postperpag)'>"+(totalPags-2)+"</li>"+
				"<li onclick='loadPagAux("+(totalPags-2)+",postperpag)'>"+(totalPags-1)+"</li>"+
				"<li> Actual ("+totalPags+")</li>"+
			"</ul>";
		}else{
			bar.innerHTML = 
			"<ul>"+
				"<li onclick='loadPagAux("+(actualPage-1)+",postperpag)'>Anterior</li>"+
				"<li onclick='loadPagAux(0,postperpag)'>Primera</li>"+
				"<li>Actual ("+(actualPage+1)+")</li>"+
				"<li onclick='loadPagAux("+(totalPags-1)+",postperpag)'>&Uacute;ltima</li>"+
				"<li onclick='loadPagAux("+(actualPage+1)+",postperpag)'>Next</li>"+
			"</ul>";
		}
	}
	return false;
};

//Funci�n para cargar el men�
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

//Funci�n para cargar la fecha correctamente formateada
function setFooterTime(){
	let setting =  document.createElement("footer");
	
	//Conseguir el dia de ma�ana
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
//Comprobar el login
function comprobarLogin(){
	if(sessionStorage.getItem('status')){
		return true;
	}
	else{
		
		return false;
	}
}

//Funci�n de cerrar sesi�n
function cerrarSesion(){
	sessionStorage.clear();
	volverIndex();
	return false;
}

//Funciones automaticas en lanzar la pagina
function loadBuscar(){
	loadMenu();
	if(busquedaActual!=""){
		loadPaginationBuscar();
	}
	setFooterTime();
}	
