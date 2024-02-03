document.addEventListener('DOMContentLoaded', function () {
  const ratings = document.querySelectorAll('.rating');

  ratings.forEach(rating => {
      const bookId = rating.dataset.bookId;

      // Obtener el número de estrellas marcado desde el archivo de texto
      readRatingFromFile(bookId)
          .then(storedRating => {
              // Establecer el número de estrellas marcado
              setRating(rating, storedRating);
          })
          .catch(error => {
              console.error(`Error al leer la calificación para el libro ID ${bookId}: ${error}`);
          });

      // Evento de clic para actualizar el número de estrellas marcado si el usuario lo cambia
      rating.addEventListener('click', function (event) {
        const selectedRatingInput = rating.querySelector('input:checked');
        const selectedRating = selectedRatingInput ? selectedRatingInput.value : null;
        
          console.log(`Libro ID ${bookId}: Calificación seleccionada - ${selectedRating}`);
          // Puedes agregar lógica para enviar la calificación al servidor u otras acciones

          // Actualizar el número de estrellas marcado
          setRating(rating, selectedRating);
      });
  });
});

function readRatingFromFile(bookId) {
  return new Promise((resolve, reject) => {
      // Construir la ruta del archivo de texto
      const filePath = `ratings/libro${bookId}.txt`;

      // Realizar una solicitud para leer el archivo de texto
      fetch(filePath)
          .then(response => {
              if (!response.ok) {
                  reject(`No se pudo leer el archivo para el libro ID ${bookId}`);
              }
              return response.text();
          })
          .then(text => {
              // Convertir el contenido del archivo de texto a un número
              const rating = parseInt(text, 10);
              resolve(rating);
          })
          .catch(error => {
              reject(error.message);
          });
  });
}

function setRating(rating, value) {
  // Establecer el número de estrellas marcado
  const stars = rating.querySelectorAll(`[id^="star${value}_book"]`);

  stars.forEach(star => {
      star.checked = true;
  });
}
