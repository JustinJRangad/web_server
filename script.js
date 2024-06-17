document.addEventListener('DOMContentLoaded', () => {
    fetch('coverage.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#coverage-table tbody');
            Object.keys(data).forEach(address => {
                const row = document.createElement('tr');
                const addressCell = document.createElement('td');
                const statusCell = document.createElement('td');
                const instructionCell = document.createElement('td');

                addressCell.textContent = address;
                statusCell.textContent = data[address];
                instructionCell.textContent = disassembly[address];

                if (data[address] === 'executed') {
                    row.classList.add('executed');
                } else {
                    row.classList.add('not-executed');
                }

                row.appendChild(addressCell);
                row.appendChild(statusCell);
                row.appendChild(instructionCell);
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading coverage data:', error));
});

// Dummy disassembly data for demonstration purposes
const disassembly = {
    "08000000": "ldr r3, [pc, #20]",
    "08000004": "add r0, r1, r2",
    // Add more instructions as needed
};
