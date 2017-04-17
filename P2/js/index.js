
function loadPag(pag,num,obj){
	let idEntrada = frm.id.value;
	console.log("pero que me dices: "+idEntrada);
	
	let xhr = new XMLHttpRequest(),
		url = "un link";
		
	xhr.open('GET',url + idEntrada,true);
	xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let datosEntrada = xhr.responseText;
					frm.parentNode.querySelector('article>p').innerHTML = datosEntrada;
				}
			}
	}
	return false;
	
}	

function loadGallery(obj){
	loadPag(1,6,obj);
}
function loadComments(){
}

function appendUrl(){
}

/* Funciones que se hacen automáticamente*/