// Spielzustand verwalten
class Game {
    constructor(scenesData) {
        this.scenes = scenesData.scenes;  // Lade die Szenen aus der JSON-Datei
        this.currentScene = 0;  // Startszene
        //this.renderScene();  // Initiales Rendering der ersten Szene
    }
    renderScene() {
        const scene = this.scenes[this.currentScene];
    
        // Änderungen bündeln, um mehrfaches Reflow zu vermeiden
        const storyDiv = document.getElementById("story");
        const backgroundDiv = document.getElementById("scene-background");
        const optionsDiv = document.getElementById("options");
    
        // Text und Optionen setzen
        storyDiv.innerHTML = scene.text;
        optionsDiv.innerHTML = ""; 
    
        // Bild erst setzen, wenn es geladen ist
        const img = new Image();
        img.src = scene.backgroundImg;
        img.onload = () => {
            backgroundDiv.style.backgroundImage = `url('${scene.backgroundImg}')`;
        };
    
        scene.options.forEach(option => {
            const button = document.createElement("button");
            button.innerHTML = option.text;
            button.onclick = () => this.changeScene(option.nextScene);
            optionsDiv.appendChild(button);
        });
    }
      // Szene wechseln
      changeScene(nextScene) {
        this.currentScene = nextScene;
        this.renderScene();
    }
}
// Szenen laden und das Spiel starten
function startGame() {
    fetch('scenes.json')  // JSON-Datei laden
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerk-Antwort war nicht ok');  // Fehler bei der Netzwerk-Anfrage abfangen
            }
            return response.json();  // In JS-Objekte umwandeln
        })
        .then(data => {
            const game = new Game(data);  // Neues Spiel mit den Daten starten
        })
        .catch(error => console.error('Fehler beim Laden der Szenen:', error));  // Fehlerbehandlung
}
window.addEventListener("load", async () => {
    try {
        const response = await fetch('scenes.json');
        const data = await response.json();
        const game = new Game(data);
        game.renderScene(); 
    } catch (error) {
        console.error('Fehler beim Laden der Szenen:', error);
    }
});