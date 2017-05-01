var totalZonas=0;

//Funcion para nueva entrada
function mostrarFoto(zona){
	//Se carga
	let error = false;
	var inp = document.getElementById("archivo-entrada"+zona);
	let errorMensaje = inp.parentNode.querySelector('div');
	inp.parentNode.setAttribute("class","");
	
	//Se hace click para que salga el dialogo de carga
	inp.click();
	inp.onchange = function(){
		let fr = new FileReader();
		
		//En cargar una foto
		fr.onload = function(){
			//Mensaje de error que se mostraría
			
			
			//Comprobamos su formato
			//var patt = new RegExp("/\.(jpe?g|png|gif)$/i");
			//if ( patt.test(inp.files[0].name) ) {
				//Comprobamos su tamaño
				if(inp.files[0].size/1024 <=500){
					inp.parentNode.querySelector('img').src = fr.result;
					inp.parentNode.querySelector('img').alt = inp.files[0].name;
					errorMensaje.setAttribute("class","inputAlertNo");
					errorMensaje.innerHTML="";
					
				}else{
					error=true;
					errorMensaje.innerHTML = "No debe de exceder los 500KB de tama&ntilde;o";
					errorMensaje.setAttribute("class","inputAlert");
					inp.parentNode.setAttribute("class","error");
				}
			/*}else{
				error = true;
				errorMensaje.innerHTML = "El formato debe de ser jpg, jpeg, gif o png exclusivamente.";
				errorMensaje.setAttribute("class","inputAlert");
				inp.parentNode.setAttribute("class","error");
				inp.parentNode.appendChild(errorMensaje);
				
			}*/
		};
		if(!error){
			fr.readAsDataURL(inp.files[0]);
		}
	}
}

/*function enviarFotos(){
	let error = false;
	let inputs = document.body.querySelector("input");
	
	let i = 0;
	
	//Comprobamos que no haya errores
	for(i = 0; i<inputs.length;i++){
		let fotos = inputs[i].querySelector("div[class='inputAlert']");
		if(fotos != null){
			error=true;
		}
	}
	if(!error){
		let xhrEntrada = new XMLHttpRequest(),
			urlEntrada = "./rest/entrada";
			
		xhrEntrada.open("POST",urlEntrada,true);
		
		xhrEntrada.sendRequestHeader("Authorization",du.clave);
		xhrEntrada.send();
			
		for(i = 0; i<inputs.length;i++){
			let xhr = new XMLHttpRequest(),
				url = './rest/foto/',
				fd  = new FormData(),
				du  = JSON.parse(sessionStorage['du']);

			fd.append('login', du.login);
			fd.append('id_entrada',1);
			fd.append('texto', inputs[i].parentNode.querySelector('textarea').value);
			fd.append('foto', inputs[i].files[0]);

			xhr.open('POST', url, true);
			xhr.onload = function(){
				console.log(xhr.responseText);
			};

			xhr.sendRequestHeader('Authorization', du.clave);
			xhr.send(fd);
		}
	}
}*/
//Fin funcion

//Función para meter zonas para seleccionar fotos
function meteZona(){
	//No nos pasemos de los 100
	if(totalZonas<100){
		//Creamos el nodo
		var zona = document.createElement("div");
		zona.setAttribute("id","zona"+totalZonas);
			
		//Lo rellenamos
		zona.innerHTML +=
				"<div class='inputAlertNo'></div>"+
				"<button onclick='mostrarFoto("+totalZonas+");return false;' class='icon-picture' for='archivo-entrada"+totalZonas+"'>Seleccionar imagen</button>"+
				"<input id='archivo-entrada"+totalZonas+"' type='file'>"+
				"<br>"+
				
				"<span class='icon-cancel' onclick='this.parentNode.remove();return false;'></span>"+
				
				"<img onclick='mostrarFoto("+totalZonas+");return false;' class='miniatura-entrada' src='img/descarga.png' alt=''> "+
				"<textarea  id='text"+totalZonas+"' cols='30' rows='10' required></textarea>"+
				"<br>"+
				
				"<br>";
		
		//Añadimos la zona
		totalZonas++;
			
		//Lo añado
		var formulario = document.getElementById("entrada-form");
		formulario.appendChild(zona);
	}
	return false;
}

function subirFotos(){
	if(!error){
		
	}else{
		
	}
}
//Comprobar que el login esté bien
function comprobarLogin(){
	if(sessionStorage.getItem('status')){
		return true;
	}
	else{
		
		return false;
	}
}

//Carga del menú en función del logueo
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

/* Funciones que se hacen automáticamente*/
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

//Funciones automáticas
function loadNuevaEntrada(){
	loadMenu();
	setFooterTime();
}
