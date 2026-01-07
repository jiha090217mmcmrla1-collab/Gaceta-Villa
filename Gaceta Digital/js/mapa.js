// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Botón para abrir el mapa en ventana nueva
    const btnAbrirMapa = document.createElement('button');
    btnAbrirMapa.textContent = '🗺️ Abrir mapa en ventana nueva';
    btnAbrirMapa.className = 'btn-mapa';
    btnAbrirMapa.onclick = function() {
        window.open('https://maps.app.goo.gl/tJzX5BmnDKBP8dUh7', '_blank');
    };

    // 2. Botón para obtener direcciones
    const btnDirecciones = document.createElement('button');
    btnDirecciones.textContent = '🧭 Cómo llegar';
    btnDirecciones.className = 'btn-mapa';
    btnDirecciones.onclick = function() {
        const destino = 'San Bartolo Oxtotitlán, México';
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`, '_blank');
    };

    // 3. Botón para mostrar/ocultar mapa
    const btnToggleMapa = document.createElement('button');
    btnToggleMapa.textContent = '👁️ Mostrar/Ocultar Mapa';
    btnToggleMapa.className = 'btn-mapa';
    const iframe = document.querySelector('iframe');
    btnToggleMapa.onclick = function() {
        if (iframe.style.display === 'none') {
            iframe.style.display = 'block';
            btnToggleMapa.textContent = '👁️ Ocultar Mapa';
        } else {
            iframe.style.display = 'none';
            btnToggleMapa.textContent = '👁️ Mostrar Mapa';
        }
    };

    // 4. Información adicional interactiva
    const infoDistancias = document.createElement('div');
    infoDistancias.className = 'info-distancias';
    infoDistancias.innerHTML = `
        <h3>Distancias desde:</h3>
        <ul>
            <li><strong>CDMX:</strong> 2 horas aprox.</li>
            <li><strong>Toluca:</strong> 2 horas aprox.</li>
            <li><strong>Querétaro:</strong> 2:30 horas aprox.</li>
            <li><strong>Pachuca:</strong> 2:30 horas aprox.</li>
            <li><strong>Cuernavaca:</strong> 3 horas aprox.</li>
            <li><strong>Morelia:</strong> 3 horas aprox.</li>
        </ul>
    `;

    // 5. Contenedor de botones
    const containerBotones = document.createElement('div');
    containerBotones.className = 'container-botones-mapa';
    containerBotones.appendChild(btnAbrirMapa);
    containerBotones.appendChild(btnDirecciones);
    containerBotones.appendChild(btnToggleMapa);

    // Insertar los elementos antes del iframe
    const divMapa = iframe.parentElement;
    divMapa.insertBefore(containerBotones, iframe);
    divMapa.insertBefore(infoDistancias, iframe);

    // 6. Agregar coordenadas y datos útiles
    const coordenadas = document.createElement('div');
    coordenadas.className = 'info-coordenadas';
    coordenadas.innerHTML = `
        <p><strong>📍 Coordenadas aproximadas:</strong> 19°36'N, 99°32'W</p>
        <p><strong>🏔️ Altitud:</strong> Aproximadamente 2,600 msnm</p>
    `;
    divMapa.appendChild(coordenadas);

    // 7. Animación de carga para el iframe
    iframe.addEventListener('load', function() {
        iframe.classList.add('mapa-cargado');
    });

    // 8. Mensaje de ayuda
    const mensajeAyuda = document.createElement('p');
    mensajeAyuda.className = 'mensaje-ayuda';
    mensajeAyuda.textContent = '💡 Usa los controles del mapa para hacer zoom y explorar el área';
    divMapa.appendChild(mensajeAyuda);
});

// Función para calcular distancia desde ubicación actual (opcional)
function obtenerUbicacionActual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`Tu ubicación: ${lat}, ${lon}`);
                alert('Ubicación obtenida. Puedes calcular la ruta desde aquí.');
            },
            function(error) {
                console.log('Error al obtener ubicación:', error);
            }
        );
    } else {
        alert('Tu navegador no soporta geolocalización');
    }
}