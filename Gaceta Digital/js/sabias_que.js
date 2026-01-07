// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleccionar solo los divs con notas (excluir el div de imágenes)
    const todosDivs = document.querySelectorAll('body > div');
    const tarjetas = Array.from(todosDivs).filter(div => div.querySelector('h3'));
    const divImagenes = Array.from(todosDivs).find(div => !div.querySelector('h3'));
    
    // 1. ANIMACIÓN DE ENTRADA - Aparecen las tarjetas una por una
    tarjetas.forEach((tarjeta, index) => {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(30px)';
        tarjeta.style.position = 'relative';
        
        // Aparecer con delay progresivo
        setTimeout(() => {
            tarjeta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Animar imágenes si existen
    if (divImagenes) {
        const imagenes = divImagenes.querySelectorAll('img');
        imagenes.forEach((img, index) => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, (tarjetas.length * 150) + (index * 100));
        });
    }

    // 2. CONTADOR DE LECTURA
    let notasLeidas = new Set();
    const contadorDiv = document.createElement('div');
    contadorDiv.className = 'contador-lectura';
    contadorDiv.innerHTML = `
        <p>📚 Notas leídas: <span id="count">0</span>/${tarjetas.length}</p>
        <div class="barra-contador">
            <div class="barra-contador-fill" style="width: 0%"></div>
        </div>
    `;
    document.body.insertBefore(contadorDiv, document.querySelector('h1').nextSibling);

    // 3. MARCAR COMO LEÍDA al hacer clic
    tarjetas.forEach((tarjeta, index) => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.dataset.index = index;
        
        tarjeta.addEventListener('click', function() {
            if (!this.classList.contains('leida')) {
                this.classList.add('leida');
                notasLeidas.add(index);
                
                // Actualizar contador
                const porcentaje = (notasLeidas.size / tarjetas.length) * 100;
                document.getElementById('count').textContent = notasLeidas.size;
                document.querySelector('.barra-contador-fill').style.width = porcentaje + '%';
                
                // Efecto de confetti
                crearConfetti(this);
                
                // Animación de checkmark
                const checkmark = document.createElement('span');
                checkmark.className = 'checkmark';
                checkmark.textContent = '✓';
                this.appendChild(checkmark);
                
                // Vibración (si el dispositivo lo soporta)
                if (navigator.vibrate) {
                    navigator.vibrate(100);
                }
            }
        });
    });

    // 4. EFECTO DE PARALLAX al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        tarjetas.forEach((tarjeta, index) => {
            const velocidad = (index % 2 === 0) ? 0.5 : -0.3;
            tarjeta.style.transform = `translateY(${scrollY * velocidad * 0.1}px)`;
        });
    });

    // 5. BOTÓN PARA MOSTRAR UNA NOTA ALEATORIA
    const btnAleatorio = document.createElement('button');
    btnAleatorio.textContent = '🎲 Nota Aleatoria';
    btnAleatorio.className = 'btn-control';
    btnAleatorio.onclick = function() {
        const randomIndex = Math.floor(Math.random() * tarjetas.length);
        tarjetas[randomIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        tarjetas[randomIndex].classList.add('pulso');
        setTimeout(() => {
            tarjetas[randomIndex].classList.remove('pulso');
        }, 1000);
    };

    // 6. MODO LECTURA
    const btnModoLectura = document.createElement('button');
    btnModoLectura.textContent = '📖 Modo Lectura';
    btnModoLectura.className = 'btn-control';
    let modoLectura = false;
    
    btnModoLectura.onclick = function() {
        modoLectura = !modoLectura;
        tarjetas.forEach(tarjeta => {
            if (modoLectura) {
                tarjeta.classList.add('modo-lectura');
                btnModoLectura.textContent = '📱 Modo Normal';
            } else {
                tarjeta.classList.remove('modo-lectura');
                btnModoLectura.textContent = '📖 Modo Lectura';
            }
        });
    };

    // Contenedor de botones
    const containerBotones = document.createElement('div');
    containerBotones.className = 'container-botones-control';
    containerBotones.appendChild(btnAleatorio);
    containerBotones.appendChild(btnModoLectura);
    document.querySelector('h1').after(containerBotones);

    // 7. GALERÍA DE IMÁGENES INTERACTIVA
    if (divImagenes) {
        divImagenes.classList.add('galeria-imagenes');
        const imagenes = divImagenes.querySelectorAll('img');
        
        imagenes.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.classList.add('img-galeria');
            
            // Click para ampliar
            img.addEventListener('click', function() {
                crearModal(this.src, index, imagenes);
            });
        });
    }

    // FUNCIONES AUXILIARES (DENTRO DEL SCOPE)
    function crearConfetti(elemento) {
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = ['#6b7f6e', '#4a6b4d', '#3d5a40', '#8bc34a'][Math.floor(Math.random() * 4)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            elemento.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 1000);
        }
    }

    function crearModal(imgSrc, indexActual, todasImagenes) {
        const modal = document.createElement('div');
        modal.className = 'modal-imagen';
        
        modal.innerHTML = `
            <div class="modal-contenido">
                <span class="modal-cerrar">&times;</span>
                <button class="modal-nav modal-prev">❮</button>
                <img src="${imgSrc}" alt="Imagen ampliada">
                <button class="modal-nav modal-next">❯</button>
                <div class="modal-contador">${indexActual + 1} / ${todasImagenes.length}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        let indiceActual = indexActual;
        const imgModal = modal.querySelector('img');
        const contador = modal.querySelector('.modal-contador');
        
        // Cerrar modal
        modal.querySelector('.modal-cerrar').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        // Navegación
        modal.querySelector('.modal-prev').onclick = (e) => {
            e.stopPropagation();
            indiceActual = (indiceActual - 1 + todasImagenes.length) % todasImagenes.length;
            imgModal.src = todasImagenes[indiceActual].src;
            contador.textContent = `${indiceActual + 1} / ${todasImagenes.length}`;
        };
        
        modal.querySelector('.modal-next').onclick = (e) => {
            e.stopPropagation();
            indiceActual = (indiceActual + 1) % todasImagenes.length;
            imgModal.src = todasImagenes[indiceActual].src;
            contador.textContent = `${indiceActual + 1} / ${todasImagenes.length}`;
        };
        
        // Teclado
        const navTeclado = function(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', navTeclado);
            }
            if (e.key === 'ArrowLeft') modal.querySelector('.modal-prev').click();
            if (e.key === 'ArrowRight') modal.querySelector('.modal-next').click();
        };
        document.addEventListener('keydown', navTeclado);
        
        setTimeout(() => modal.classList.add('modal-visible'), 10);
    }

}); // FIN DEL DOMContentLoaded