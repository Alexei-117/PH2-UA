
function loadPag(pag,num,obj){
	
	let xhr = new XMLHttpRequest(),
		url = "./rest/entrada/?pag="+pag+"&lpag="+num;
		
	xhr.open('GET',url,true);
	xhr.send();
	
	xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					let datosJSON = JSON.parse(xhr.responseText);
					let i = 0;
					console.log(xhr.responseText);
					for( i = 0; i<datosJSON["TOTAL_COINCIDENCIAS"]; i++){
						console.log(datosJSON["FILAS"][i]);
					}
					
					obj.innerHTML = "la magia";
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