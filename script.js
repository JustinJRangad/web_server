document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fileName = urlParams.get('file');
    const functionName = urlParams.get('function');

    if (fileName && functionName) {
        document.getElementById('file-name').textContent = `File: ${fileName}`;
        document.getElementById('function-name').textContent = `Function: ${functionName}`;
        
        fetch(`/get_function_code?file=${encodeURIComponent(fileName)}&function=${encodeURIComponent(functionName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(text => {
                const codeContainer = document.getElementById('code');
                const lines = text.split('\n');
                lines.forEach((line, index) => {
                    const lineElement = document.createElement('span');
                    lineElement.className = 'codeLine';
                    lineElement.innerHTML = `<span class="lineNum">${index + 1}</span> ${line}`;
                    codeContainer.appendChild(lineElement);
                });
            })
            .catch(error => {
                console.error('Error fetching function code:', error);
                const codeContainer = document.getElementById('code');
                codeContainer.textContent = 'Error fetching function code.';
            });
    } else {
        console.error('File name or function name parameter is missing.');
    }
});
