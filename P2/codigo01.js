//El formulario de login llama a esta funcion
//la cual almacena en el sessionStorage los datos
// y muestra un mensaje 
//IMPORTANTE AÑADIR EL TIEMPO DE LA ULTIMA
//CONEXION, ESTA EN LA BASE DE DATOS 
//CON UNA PETICION GET ES EASY!!!!!!!!!!!!!!!!!!!!
function hacerLogin(frm){
	//Peticion
	let xhr = new XMLHttpRequest(), 
		url = 'http://localhost/P2/rest/login/',
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
		if(v.RESULTADO == 'ok'){
			sessionStorage['du'] = xhr.responseText;
			sessionStorage.setItem('status', 'true');

			//Mensaje correcto
		    html += '<h2>Login correcto</h2>';
		    html += '<p>Bienvenido a Img-in</p>';
		    html += '<p>Su ultimo acceso fue:</p>';
		    html +=	'<p>';
		    html += v.ultimo_acceso;
		    html += '</p>';
		    html += '<a href="index.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
		    capa1.innerHTML = html;
		}
		else{
			//Mensaje incorrecto
			html += '<h2>Login incorrecto</h2>';
		    html += '<p>Vuelva a intentarlo</p>';
		    html += '<a href="login.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';		}
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
		url1 = 'http://localhost/P2/rest/login/';

	
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

		let error_login = false;
		let error_contrasenya = false;

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
		url2 = 'http://localhost/P2/rest/usuario/',
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

//Funcion para libear el sessionStorage y cerrar sesion
function cerrarSesion(){
	sessionStorage.clear();
	volverIndex();
	return false;
}
//Fin funcion 

//Funcion para nueva entrada
//SIN TESTEAR, MIRAR GITHUB EL ZIP nueva_entrada.zip
function mostrarFoto(inp){
	let fr = new FileReader();

	fr.onload = function(){
		inp.parentNode.querySelector('img').src = fr.result;
		inp.parentNode.querySelector('img').alt = inp.files[0].name;
	};
	fr.readAsDataURL(inp.files[0]);
}
function enviarFoto(btn){
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/ph2/rest/foto/',
		fd  = new FormData(),
		du  = JSON.parse(sessionStorage['du']);

	fd.append('login', du.login);
	fd.append('id_entrada',1);
	fd.append('texto', btn.parentNode.querySelector('textarea').value);
	fd.append('foto', btn.parentNode.querySelector('[type="file"]').files[0]);

	xhr.open('POST', url, true);
	xhr.onload = function(){
		console.log(xhr.responseText);
	};

	xhr.sendRequestHeader('Authorization', du.clave);
	xhr.send(fd);
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
    html += '<a href="login.html"><button onclick="this.parentNode.parentNode.remove();">Cerrar</button></a>';
    
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
	html += '<input id="pass" name="pass" type="password" >';
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

//Funcion comprobar login
//IMPORTANTE, AÑADIR ESTE METODO EN EL HEAD DE CADA HTML
//FALTA POR AÑADIR LAS OPCIONES AL MENU, ES DECIR
//EN EL PRIMER IF METES QUE LA OPCION CERRAR SESION APAREZCA
//EN EL ELSE METES QUE INICIAR SESION APAREZCA
function comprobarLogin(){
	if(sessionStorage.getItem('status')){

		return true;
	}
	else{
		
		return false;
	}
}
//Fin funcion
