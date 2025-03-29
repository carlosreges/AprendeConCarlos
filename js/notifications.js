// Sistema de notificaciones para la interfaz
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <p>${message}</p>
    <button class="close-notification">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  // Mostrar con animación
  setTimeout(() => {
    notification.classList.add('visible');
  }, 10);
  
  // Auto-cerrar después de 5 segundos
  const timeout = setTimeout(() => {
    closeNotification(notification);
  }, 5000);
  
  // Botón para cerrar
  notification.querySelector('.close-notification').addEventListener('click', () => {
    clearTimeout(timeout);
    closeNotification(notification);
  });
}

function closeNotification(notification) {
  notification.classList.remove('visible');
  notification.addEventListener('transitionend', () => {
    notification.remove();
  });
} 