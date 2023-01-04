if (navigator.geolocation) {
    const opcionesDeSolicitud = {
        enableHighAccuracy: true, // Alta precisión
        maximumAge: 0, // No queremos caché
        timeout: 5000 // Esperar solo 5 segundos
    };
  
    navigator.geolocation.getCurrentPosition(muestraPosicion, errorPosicion,opcionesDeSolicitud);
   
}
else
{
    alert("no geo");
}

function muestraPosicion(pos){


    

    console.log("Te encuentras en las siguientes coordenadas: " + pos.coords.latitude + ', ' + pos.coords.longitude  );   
  
  alert('Te encuentras en las siguientes coordenadas: (' + pos.coords.latitude + ', ' + pos.coords.longitude + ')' );
 
  var map = L.map('map').
  setView([pos.coords.latitude, pos.coords.longitude],
  15);

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
    }).addTo(map);

    L.control.scale().addTo(map);

  L.marker([pos.coords.latitude,pos.coords.longitude],{draggable: true}).addTo(map);

  const coordenadas = pos.coords;
  const formateador = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'medium' });
  const formatearFecha = fecha => formateador.format(fecha);
  const fecha = formatearFecha(new Date(pos.timestamp));
      const registro = `Última actualización: ${fecha} en ${pos.coords.latitude},${pos.coords.longitude}`;
      console.log(registro);
}






function errorPosicion(err) {
    switch(err.code) {
        case err.PERMISSION_DENIED:
            alert("Debe usted permitir el acceso a su posición para que la aplicación pueda funcionar");
            break;
        case err.POSITION_UNAVAILABLE:
            alert("La información sobre su posición actual no está disponible");
            break;
        case err.TIMEOUT:
            alert("No he podido obtener su posición en un tiempo razonable");
            break;
        default:
            alert("Se ha producido un error desconocido al intentar obtener la posición actual");
            break;
    }
}



