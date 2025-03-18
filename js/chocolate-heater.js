// Script divertido para "calentar" el chocolate
function heatChocolate() {
    console.log("🔥 Calentando el chocolate...");
    
    const heatingElement = document.createElement('div');
    heatingElement.innerHTML = `
        <div class="chocolate-heater" style="position: fixed; bottom: 100px; right: 30px; background-color: #6b3e26; color: white; padding: 15px; border-radius: 10px; z-index: 1000; box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);">
            <i class="fas fa-fire" style="color: orange; animation: flame 1s infinite alternate;"></i>
            <span>Calentando chocolate... <span id="temp">20</span>°C</span>
        </div>
    `;
    document.body.appendChild(heatingElement);
    
    let temp = 20;
    const interval = setInterval(() => {
        temp += 5;
        document.getElementById('temp').textContent = temp;
        
        if (temp >= 60) {
            clearInterval(interval);
            heatingElement.innerHTML = `
                <div class="chocolate-heater" style="position: fixed; bottom: 100px; right: 30px; background-color: #6b3e26; color: white; padding: 15px; border-radius: 10px; z-index: 1000; box-shadow: 0 0 20px rgba(255, 165, 0, 0.5);">
                    <i class="fas fa-check-circle" style="color: #2ecc71;"></i>
                    <span>¡Chocolate perfecto a 60°C!</span>
                </div>
            `;
            
            setTimeout(() => {
                heatingElement.style.animation = 'fadeOut 1s forwards';
                setTimeout(() => {
                    document.body.removeChild(heatingElement);
                }, 1000);
            }, 3000);
        }
    }, 500);
}

// Añadir un poco de CSS para la animación
const style = document.createElement('style');
style.textContent = `
    @keyframes flame {
        0% { transform: scale(1); }
        100% { transform: scale(1.2); }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Botón para calentar el chocolate
const heatButton = document.createElement('button');
heatButton.innerHTML = '<i class="fas fa-fire"></i> Calentar Chocolate';
heatButton.style.cssText = 'position: fixed; bottom: 30px; right: 30px; background-color: #6b3e26; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; z-index: 1000;';
heatButton.onclick = heatChocolate;
document.body.appendChild(heatButton); 