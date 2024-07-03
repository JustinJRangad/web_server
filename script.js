document.addEventListener('DOMContentLoaded', function() {
    fetch('/generate_images') // Adjust this path to match your Python script endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const imageContainer = document.getElementById('image-container');
            imageContainer.innerHTML = ''; // Clear any existing content
            
            data.images.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            const imageContainer = document.getElementById('image-container');
            imageContainer.textContent = 'Error fetching images.';
        });
});
