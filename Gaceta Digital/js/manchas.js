// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todos los divs que contienen "¿Sabías que...?"
    const body = document.querySelector('body');
    const h1 = document.querySelector('h1');
    
    // Buscamos todos los divs que tienen h3 con "¿Sabías que"
    const todosDivs = document.querySelectorAll('body > div');
    const fichasNotas = [];
    
    todosDivs.forEach(div => {
        const h3 = div.querySelector('h3');
        if (h3 && h3.textContent.includes('¿Sabías que')) {
            fichasNotas.push(div);
        }
    });
    
    // Si encontramos fichas, creamos el contenedor de pares
    if (fichasNotas.length > 0) {
        const contenedorPares = document.createElement('div');
        contenedorPares.style.display = 'flex';
        contenedorPares.style.flexWrap = 'wrap';
        contenedorPares.style.justifyContent = 'center';
        contenedorPares.style.gap = '20px';
        contenedorPares.style.padding = '20px';
        contenedorPares.style.maxWidth = '1400px';
        contenedorPares.style.margin = '0 auto';
        
        // Insertamos el contenedor después del h1
        h1.insertAdjacentElement('afterend', contenedorPares);
        
        // Colores de manchitas en tonos verde grisáceo
        const colores = [
            '#7A9B8E', // Verde grisáceo medio
            '#8FAA96', // Verde salvia
            '#6B8E7F', // Verde musgo grisáceo
            '#A3B9AD', // Verde menta grisáceo
            '#5F8674', // Verde oscuro grisáceo
            '#94AFA1'  // Verde claro grisáceo
        ];
        
        fichasNotas.forEach((contenedorNota, index) => {
            const h3 = contenedorNota.querySelector('h3');
            const parrafo = contenedorNota.querySelector('p');
            
            // Aplicamos estilos al contenedor para layout de dos columnas
            contenedorNota.style.position = 'relative';
            contenedorNota.style.padding = '30px';
            contenedorNota.style.margin = '0';
            contenedorNota.style.width = 'calc(50% - 10px)';
            contenedorNota.style.minWidth = '300px';
            contenedorNota.style.overflow = 'visible';
            contenedorNota.style.boxSizing = 'border-box';
            
            // Creamos la manchita de fondo
            const manchita = document.createElement('div');
            manchita.className = 'manchita-fondo';
            manchita.style.position = 'absolute';
            manchita.style.top = '0';
            manchita.style.left = '0';
            manchita.style.width = '100%';
            manchita.style.height = '100%';
            manchita.style.background = colores[index % colores.length];
            manchita.style.borderRadius = '60% 40% 70% 30% / 40% 50% 60% 50%';
            manchita.style.zIndex = '-1';
            manchita.style.opacity = '0.85';
            manchita.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            
            // Insertamos la manchita antes del contenido
            contenedorNota.insertBefore(manchita, contenedorNota.firstChild);
            
            // Aplicamos estilos al contenido para que esté encima
            if (h3) {
                h3.style.position = 'relative';
                h3.style.zIndex = '1';
                h3.style.color = '#fff';
                h3.style.fontWeight = 'bold';
                h3.style.textShadow = '2px 2px 4px rgba(0,0,0,0.2)';
            }
            
            if (parrafo) {
                parrafo.style.position = 'relative';
                parrafo.style.zIndex = '1';
                parrafo.style.color = '#fff';
                parrafo.style.lineHeight = '1.6';
                parrafo.style.textShadow = '1px 1px 2px rgba(0,0,0,0.1)';
            }
            
            // Movemos la ficha al contenedor de pares
            contenedorPares.appendChild(contenedorNota);
            
            // Animación de movimiento ondulante
            let tiempo = Math.random() * 100;
            
            function animar() {
                tiempo += 0.02;
                
                // Calculamos valores de transformación para simular movimiento orgánico
                const x = Math.sin(tiempo) * 2;
                const y = Math.cos(tiempo * 1.5) * 2;
                const rotacion = Math.sin(tiempo * 0.5) * 2;
                const escala = 1 + Math.sin(tiempo * 0.8) * 0.03;
                
                // Cambiamos la forma del border-radius
                const br1 = 60 + Math.sin(tiempo) * 10;
                const br2 = 40 + Math.cos(tiempo * 1.2) * 10;
                const br3 = 70 + Math.sin(tiempo * 0.8) * 10;
                const br4 = 30 + Math.cos(tiempo * 1.5) * 10;
                const br5 = 40 + Math.sin(tiempo * 1.3) * 10;
                const br6 = 50 + Math.cos(tiempo) * 10;
                const br7 = 60 + Math.sin(tiempo * 0.7) * 10;
                const br8 = 50 + Math.cos(tiempo * 1.1) * 10;
                
                manchita.style.transform = `translate(${x}px, ${y}px) rotate(${rotacion}deg) scale(${escala})`;
                manchita.style.borderRadius = `${br1}% ${br2}% ${br3}% ${br4}% / ${br5}% ${br6}% ${br7}% ${br8}%`;
                
                requestAnimationFrame(animar);
            }
            
            animar();
            
            // Efecto hover: la manchita se expande ligeramente
            contenedorNota.addEventListener('mouseenter', function() {
                manchita.style.transition = 'transform 0.3s ease';
                manchita.style.transform += ' scale(1.05)';
            });
            
            contenedorNota.addEventListener('mouseleave', function() {
                manchita.style.transition = 'transform 0.3s ease';
            });
        });
        
        // Responsivo: en pantallas pequeñas, las fichas ocupan el 100%
        function ajustarResponsivo() {
            fichasNotas.forEach(ficha => {
                if (window.innerWidth <= 768) {
                    ficha.style.width = '100%';
                } else {
                    ficha.style.width = 'calc(50% - 10px)';
                }
            });
        }
        
        ajustarResponsivo();
        window.addEventListener('resize', ajustarResponsivo);
    }
});