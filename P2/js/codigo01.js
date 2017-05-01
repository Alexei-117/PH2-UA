

//El formulario de login llama a esta funcion
//la cual almacena en el sessionStorage los datos
// y muestra un mensaje
function hacerLogin(frm){
	//Peticion
	let xhr = new XMLHttpRequest(), 
		url = './rest/login/',
		fd	= new FormData(frm);

	//Mostrar login
	let capa2 = document.createElement('div'),
	capa1 = document.createElement('article'),

    html = '';

    capa2.appendChild(capa1);

	xhr.open('POST', url, true);
	xhr.onload = function(){
		console.log(xhr.responseText);
		let v = JSON.parse(xhr.responseText);
		if(v["RESULTADO"] == 'ok'){
			sessionStorage['du'] = xhr.responseText;
			sessionStorage.setItem('status', 'true');

			//Mensaje correcto
		    html += '<h2>Login correcto</h2>';
		    html += '<p>Bienvenido a Img-in</p>';
		    html += '<p>Su ultimo acceso fue:</p>';
		    html +=	'<p>';
		    html += v["ultimo_acceso"];
		    html += '</p>';
		    html += '<a href="index.html" onclick="this.parentNode.parentNode.remove();">Cerrar</a>';
		    capa1.innerHTML = html;
		}
		else{
			//Mensaje incorrecto
			html += '<h2>Login incorrecto</h2>';
		    html += '<p>Vuelva a intentarlo</p>';
		    html += '<a href="login.html" onclick="this.parentNode.parentNode.remove();">Cerrar</a>';		}
			capa1.innerHTML = html;
	};
	capa1.innerHTML = html;

	xhr.send(fd);

    capa2.classList.add('capa2'); 
    capa1.classList.add('capa1');

    document.body.appendChild(capa2);
	return false;
}
//Fin funcion

//Función para registrar a un nuevo usuario
function hacerRegistro(frm){

	let xhr1 = new XMLHttpRequest(),
		url1 = './rest/login/';

	
	var login_value = frm.parentNode.querySelector('input[id=login]').value;				
	var nombre_value = frm.parentNode.querySelector('input[id=nombre]').value;
	var pass_value = frm.parentNode.querySelector('input[id=pass]').value;
	var pass2_value = frm.parentNode.querySelector('input[id=pass2]').value;
	var email_value = frm.parentNode.querySelector('input[id=email]').value;

	let login_disponible = false;

	url1 += login_value;

	xhr1.open('GET', url1, true);

	xhr1.onload = function(){
		console.log(xhr1.responseText);
		let v1 = JSON.parse(xhr1.responseText);

		let error_contrasenya = false;
		let error_login = false;
		
		if(v1.DISPONIBLE == 'true' && login_value!=''){
			login_disponible = true;
		}
		//Comprueba el login y las contrasenyas
		if((pass_value != pass2_value) && (login_disponible == false)){
				document.getElementById("error1").innerHTML = "Ya existe un usuario con el mismo login";
				document.getElementById("error2").innerHTML = "Las contraseñas no coinciden";

				error_login = true;
				error_contrasenya = true;

		}else{
			//Contrasenyas distintas
			if(pass_value != pass2_value){
				document.getElementById("error2").innerHTML = "Las contraseñas no coinciden";
				error_contrasenya = true;
			}else{
				//Login utilizado
				if(login_disponible == false){
					document.getElementById("error1").innerHTML = "Ya existe un usuario con el mismo login";
					error_login = true;
				}
			}
		}
		//Eliminacion de mensajes
		if(error_login == false){
			document.getElementById("error1").innerHTML = "";
		}
		if(error_contrasenya == false){
			document.getElementById("error2").innerHTML = "";
		}

	}

	xhr1.send();

	let xhr2 = new XMLHttpRequest(),
		url2 = './rest/usuario/',
		fd = new FormData();

	xhr2.open('POST', url2, true);

	xhr2.onload = function(){
		console.log(xhr2.responseText);
		let v2 = JSON.parse(xhr2.responseText);

		if(v2.RESULTADO != 'error'){
			mostrarMensajeRegistroCorrecto();
		}
	};

	fd.append('login', login_value);
	fd.append('nombre', nombre_value);
	fd.append('pwd', pass_value);
	fd.append('pwd2', pass2_value);
	fd.append('email', email_value);

	xhr2.send(fd);

	return false;
}
//Fin funcion
function checkLibre(){
	let xhr1 = new XMLHttpRequest(),
		url1 = './rest/login/';
		
	var login_value = document.querySelector('input[id=login]').value;
	
	let login_disponible = false;

	url1 += login_value;
	xhr1.open('GET', url1, true);

	xhr1.onload = function(){
		if(v1.DISPONIBLE == 'true'){
			login_disponible = true;
		}
	}
	if(!login_disponible){
		document.getElementById("error1").innerHTML = "Ya existe un usuario con el mismo login";
	}
}
//Funcion para libear el sessionStorage y cerrar sesion
function cerrarSesion(){
	sessionStorage.clear();
	volverIndex();
	return false;
}
//Fin funcion 

// Función para mostrar el mensaje emergente cuando se ha 
// podido registrar un usuario.
function mostrarMensajeRegistroCorrecto(){
    let capa2 = document.createElement('div'),
        capa1 = document.createElement('article'),
        html = '';

    capa2.appendChild(capa1);    

    html += '<h2>Registro completado</h2>';
    html += '<p>Bienvenido a Img-in</p>';
    html += '<a href="login.html" onclick="this.parentNode.parentNode.remove();">Cerrar</a>';
    
    capa1.innerHTML = html;
    capa2.classList.add('capa2'); 
    capa1.classList.add('capa1');

    document.body.appendChild(capa2);
}
//Fin funcion 

//Funcion para redirigir a index.html
function volverIndex(){
	window.location = 'index.html';
	return false;
}
//Fin funcion 

//Funcion para mostrar el formulario de inicio de sesion
//en login.html
function mostrarLogin(){
	let html = '';
	
	html +=	'<fieldset>';
	html +=	'<legend>Inicio de sesión</legend>';
	html +=	'<label for="login">Usuario</label>';
	html +=	'<input name="login" id="login" type="text">';
	html +=	'<label for="pwd">Contrase&ntilde;a</label>';
	html +=	'<input id="pwd" name="pwd" type="password">';		
	html +=	'<input name="submit" type="submit" value="Loguearse">';
	html +=	'<a href="index.html">Cancelar</a>';
	html +=	'</fieldset>';

	document.getElementById('loginForm').innerHTML = html;

	return false;
}
//Fin funcion 

//Funcion para mostrar el formulario de registro 
//en registro.html
function mostrarRegistro(){
	let html = '';

	html += '<fieldset>';
	html += '<legend>Inicio de sesión</legend>';
	html += '<label for="login">Login</label>';
	html += '<input id="login" name="login" type="text"  autofocus >';
	html += '<p style="color:red" id="error1"></p>';
	html += '<label for="nombre">Nombre</label>';
	html += '<input id="nombre" name="nombre" type="text" >';
	html += '<label for="pass">Contrase&ntilde;a</label>';
	html += '<input id="pass" name="pass" type="password"  pattern="^[^0-9]{1}[\S*][a-zA-Z0-9]+$">';
	html += '<p style="color:red" id="error2"></p>';
	html += '<label for="pass2">Repetir contrase&ntilde;a</label>';
	html += '<input id="pass2" name="pass2" type="password" >';
	html += '<label for="email">E-mail</label>';
	html += '<input id="email" name="email" type="email" >';
	html += '<input name="submit" type="Submit" value="Registrarse">';
	html += '<a href="index.html">Cancelar</a>';
	html += '</fieldset>';

	document.getElementById('registerForm').innerHTML = html;

	return false;
}
//Fin funcion

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

//Fin de función

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


//Funcion comprobar login
function comprobarLogin(){
	if(sessionStorage.getItem('status')){
		return true;
	}
	else{
		
		return false;
	}
}
//Fin funcion
