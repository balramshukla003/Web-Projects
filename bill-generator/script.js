// Set current date on load
const dateEl = document.getElementById('date-val');
if(dateEl) dateEl.innerText = new Date().toLocaleDateString('en-GB');

// Initial Row
addRow();

// --- 1. Visibility Toggles ---
function toggleVis(id) {
    const el = document.getElementById(id);
    if(el) {
        if(el.classList.contains('hidden')) el.classList.remove('hidden');
        else el.classList.add('hidden');
    }
}

// --- 2. Column Toggles (Qty / Rate) ---
function toggleCol(colClass) {
    const isChecked = document.querySelector(`input[onchange*="${colClass}"]`).checked;
    const elements = document.querySelectorAll(`.${colClass}`);
    elements.forEach(el => {
        if(isChecked) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

// --- 3. Logo Upload ---
document.getElementById('logoInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('disp_logo').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// --- 4. Theme Color ---
function changeColor(color) {
    document.documentElement.style.setProperty('--primary-theme', color);
}

// --- 5. Add New Row ---
function addRow() {
    const tbody = document.getElementById('table-body');
    const tr = document.createElement('tr');
    
    // Check current visibility state of columns to apply to new row
    const hideQty = !document.querySelector(`input[onchange*="col-qty"]`).checked;
    const hideRate = !document.querySelector(`input[onchange*="col-rate"]`).checked;

    tr.innerHTML = `
        <td class="no-print" style="text-align:center;">
            <button class="btn-del" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
        <td contenteditable="true" class="editable">1</td>
        <td contenteditable="true" class="editable">Item Description</td>
        <td contenteditable="true" class="editable col-qty ${hideQty ? 'hidden' : ''}">1</td>
        <td contenteditable="true" class="editable col-rate ${hideRate ? 'hidden' : ''}">0.00</td>
        <td contenteditable="true" class="editable amount-cell" style="text-align:right;" oninput="calcTotals()">0.00</td>
    `;
    tbody.appendChild(tr);
}

// --- 6. Delete Row ---
function deleteRow(btn) {
    const row = btn.closest('tr');
    row.remove();
    calcTotals();
}

// --- 7. Calculate Totals (SUMMATION ONLY) ---
// This function sums the "Amount" column. It does NOT multiply Qty * Rate.
function calcTotals() {
    let subTotal = 0;
    
    // Get all cells with class 'amount-cell'
    const amounts = document.querySelectorAll('.amount-cell');
    
    amounts.forEach(cell => {
        // Clean the text: remove non-numeric chars except dot and minus
        const cleanText = cell.innerText.replace(/[^0-9.-]+/g, "");
        const val = parseFloat(cleanText);
        if(!isNaN(val)) {
            subTotal += val;
        }
    });

    // Update Subtotal Display
    document.getElementById('val-subtotal').innerText = subTotal.toFixed(2);
    
    // Get Tax/Add value (manually entered by user)
    const taxCell = document.getElementById('val-tax');
    const cleanTax = taxCell.innerText.replace(/[^0-9.-]+/g, "");
    const taxVal = parseFloat(cleanTax) || 0;

    // Grand Total
    const grandTotal = subTotal + taxVal;
    document.getElementById('val-grand').innerText = grandTotal.toFixed(2);

    // Update Words
    document.getElementById('amount-words').innerText = numberToWords(Math.floor(grandTotal)) + " Only";
}

// --- 8. Number to Words Helper ---
function numberToWords(number) {
    const a = ['','One ','Two ','Three ','Four ','Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    const b = ['', '', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];

    if ((number = number.toString()).length > 9) return 'overflow';
    n = ('000000000' + number).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str || 'Zero';
}

// --- 9. PDF Generation ---
function generatePDF() {
    // Select the invoice paper
    const element = document.getElementById('invoice-doc');
    
    // Get Invoice No for filename
    const invNo = document.querySelector('#meta-inv .val').innerText.trim() || 'Bill';

    const opt = {
        margin:       0,
        filename:     `Invoice_${invNo}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}