function addItem() {
    const table = document.getElementById('invoice-items');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td contenteditable="true">New Item</td>
        <td contenteditable="true">1</td>
        <td contenteditable="true">₹0.00</td>
        <td contenteditable="true">₹0.00</td>
    `;
    table.appendChild(row);
    row.addEventListener('input', calculateTotal); // Ensure calculations update when new rows are added
}

function calculateTotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#invoice-items tr');
    rows.forEach(row => {
        const qty = parseInt(row.cells[1].innerText) || 0;
        const price = parseFloat(row.cells[2].innerText.replace('₹', '')) || 0;
        const total = qty * price;
        row.cells[3].innerText = ₹${total.toFixed(2)};
        subtotal += total;
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = ₹${subtotal.toFixed(2)};
    document.getElementById('taxable').innerText = ₹${subtotal.toFixed(2)};
    document.getElementById('tax').innerText = ₹${tax.toFixed(2)};
    document.getElementById('total').innerText = ₹${total.toFixed(2)};
    document.getElementById('balance').innerText = ₹${total.toFixed(2)};
}

document.querySelectorAll('#invoice-items tr').forEach(row => {
    row.addEventListener('input', calculateTotal); // Attach event listeners to existing rows
});

document.addEventListener('input', calculateTotal);