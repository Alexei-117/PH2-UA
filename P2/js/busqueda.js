var busquedaActual = "";
var actualPage = 0;
var postperpag = 6;
	
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
	if(titulo!=""){
		url+="?n="+titulo;
		puesto=true;
	}
	
	if(texto!=""){
		if(puesto){
			url+="&";
		}
		url+="?d="+texto;
		puesto = true;
	}
	
	if(autor!=""){
		if(puesto){
			url+="&";
		}
		url+="?l="+autor;
		puesto = true;
	}
	
	if(fempieza!=""){
		if(puesto){
			url+="&";
		}
		url+="?fi="+fempieza;
		puesto=true;
	}
	
	if(ffin!=""){
		if(puesto){
			url+="&";
		}
		url+="?ff="+ffin;
		puesto = true;
	}
	
	
	//Para posteriores busquedas con paginacion
	busquedaActual = url;
	
	
	if(puesto){
		url+="&";
	}
		
	url += "?pag="+pag+"&lpag="+num;
	
	
	
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

function loadPagAux(pag,num){
	
	var xhr = new XMLHttpRequest(),
		url = "./rest/entrada/",
		finalText = "<h2>Lo sentimos, pero no hay suficientes datos para esta petición.</h2>";
	
	
	//Para posteriores busquedas con paginacion
	url = busquedaActual;
	
	if(url != "./rest/entrada/"){
		url+="&";
	}
		
	url += "?pag="+pag+"&lpag="+num;
	
	
	
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

function loadPaginationBuscar(){
	var bar =  document.querySelector("nav[class=pag]");
	
	//Para poner pedir la última página
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


function setFooterTime(){
	var setting =  document.querySelector("footer>nav>ul>li>time");
	//Conseguir el dia de mañana
	var day = new Date();
	var dd = day.getDate();
	var mm = day.getMonth()+1; //January is 0!

	var yyyy = day.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	day = yyyy+"-"+mm+"-"+dd;
	
	setting.setAttribute("datetime",day );
	setting.innerHTML ="&copy; "+ yyyy;
}


//Funciones automaticas en lanzar la pagina
function loadBuscar(){
	if(busquedaActual!=""){
		loadPaginationBuscar();
	}
	setFooterTime();
}	
