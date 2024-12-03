// function toggleOverlay() {
//     let overlayRef = document.getElementById("overlay"); // Referenz auf das Overlay
//     overlayRef.classList.toggle("d_none"); // Sichtbarkeit toggeln
//   }
  
//   /**
//    * Lädt das ausgewählte Bild in das Overlay.
//    * Setzt den aktuellen Index und zeigt das entsprechende Bild an.
//    * @param {number} index - Der Index des Bildes im `images`-Array
//    */
//   function overlayContent(index) {
//     let content = document.getElementById("overlayImg"); // Container für das Overlay-Bild
//     currentIndex = index; // Speichert den aktuellen Index
//     content.innerHTML = `<img src="${images[index]}" alt=""></img>`; // Setzt das Bild im Overlay
//   }
  
//   /**
//    * Verhindert, dass Klick-Events vom Overlay-Bild nach außen propagiert werden.
//    * Dies dient dazu, das Schließen des Overlays bei einem Klick auf das Bild zu verhindern.
//    * @param {Event} event - Das Klick-Event
//    */
//   function bubblingProtextin(event) {
//     console.log("overlayImg"); // Debug-Ausgabe im Browser-Log
//     event.stopPropagation(); // Stoppt die Event-Weiterleitung
//   }
  
//   /**
//    * Zeigt das nächste Bild in der Galerie im Overlay an.
//    * Wenn das letzte Bild erreicht ist, wird zum ersten Bild gesprungen.
//    */
//   function next() {
//     if (currentIndex + 1 >= images.length) {
//       currentIndex = 0; // Zurück zum ersten Bild
//     } else {
//       currentIndex += 1; // Nächstes Bild
//     }
//     overlayContent(currentIndex); // Aktualisiert das Overlay
//   }
  
//   /**
//    * Zeigt das vorherige Bild in der Galerie im Overlay an.
//    * Wenn das erste Bild erreicht ist, wird zum letzten Bild gesprungen.
//    */
//   function back() {
//     if (currentIndex - 1 < 0) {
//       currentIndex = images.length - 1; // Zum letzten Bild springen
//     } else {
//       currentIndex -= 1; // Vorheriges Bild
//     }
//     overlayContent(currentIndex); // Aktualisiert das Overlay
//   }