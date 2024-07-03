document.addEventListener('DOMContentLoaded', function() {
    // Known paths to the images
    const images = [
        'path/to/img1.png',  // Adjust the path to the actual image locations
        'path/to/img2.png'
    ];

    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Clear any existing content

    images.forEach(imageUrl => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imageContainer.appendChild(imgElement);
    });
});
