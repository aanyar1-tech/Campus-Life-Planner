const STORAGE_KEY = 'simple_planner_records';

// 1. INITIALIZE STATE ENGINE WITH PLANNER MOCK DATA
let state = {
    records: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    currentTab: 'dashboard',
    timeTarget: 180,
    isCaseSensitive: false,
    editingId: null
};

// Fallback logic to automatically seed the dashboard if database runs empty
if (state.records.length === 0) {
    state.records = [
        { "id": "rec_1", "description": "Prepare for chemistry semester exam test", "amount": 120, "category": "Study", "date": "2026-10-16" },
        { "id": "rec_2", "description": "Review textbook assignment chapters", "amount": 90, "category": "Classes", "date": "2026-10-05" },
        { "id": "rec_3", "description": "Weekly group project sync planning session", "amount": 45, "category": "Classes", "date": "2026-10-08" },
        { "id": "rec_4", "description": "Late late task review submission penalty check", "amount": 15, "category": "Exams", "date": "2026-10-10" },
        { "id": "rec_5", "description": "Weekly coffee coffee run study run session", "amount": 30, "category": "Personal", "date": "2026-10-14" }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

// 2. INPUT VALIDATOR CARDS WITH PLANNER REGEX PATTERNS
function validateFormInputs(description, amount, date) { 
    const descRegex \(= /^\S\)(?:\(.*\S\))?\$/; 
    const amountRegex = /^(0|[1-9]\d*)\$/;
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|\d|3)\$/;

    if (!descRegex.test(description)) return false;
    if (!amountRegex.test(amount)) return false;
    if (!dateRegex.test(date)) return false;
    return true;
}

// 3. CORE VIEW RENDERING LOOP
function renderApp() {
    const records = state.records;
    
    // Update Dashboard Metric Numbers
    if (document.getElementById('stat-count')) {
        document.getElementById('stat-count').textContent = records.length;
    }

    let totalMins = 0;
    let categoryCounts = {};
    records.forEach(item => {
        totalMins += parseInt(item.amount || 0);
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
    });

    const displayUnitElement = document.getElementById('display-unit');
    const totalMinsElement = document.getElementById('stat-sum');
    if (totalMinsElement) {
        if (displayUnitElement && displayUnitElement.value === 'hours') {
            totalMinsElement.textContent = (totalMins / 60).toFixed(1) + " hours";
        } else {
            totalMinsElement.textContent = totalMins;
        }
    }

    let topCategory = "N/A";
    let maxCount = 0;
    for (let cat in categoryCounts) {
        if (categoryCounts[cat] > maxCount) {
            maxCount = categoryCounts[cat];
            topCategory = cat;
        }
    }
    
    if (document.getElementById('stat-top')) {
        document.getElementById('stat-top').textContent = topCategory;
    }

    // Dynamic Study-Cap Threshold Check
    const remaining = state.timeTarget - totalMins;
    const statusText = document.getElementById('stat-cap-status');
    const alertRegion = document.getElementById('alert-region');

    if (statusText) {
        if (remaining >= 0) {
            statusText.textContent = `Remaining: ${remaining} mins`;
            statusText.className = "cap-msg safe";
            if (alertRegion) alertRegion.textContent = "";
        } else {
            statusText.textContent = `Over Cap: ${Math.abs(remaining)} mins`;
            statusText.className = "cap-msg warning";
            if (alertRegion) alertRegion.textContent = `Alert! Passed your study target!`;
        }
    }

    // Ledger Data Grid Template Engine
    const tbody = document.querySelector('table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let sorted = [...state.records];
    const sortVal = document.getElementById('sort-select')?.value || 'date-desc';
    if (sortVal === 'date-desc') sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortVal === 'date-asc') sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortVal === 'amount-desc') sorted.sort((a, b) => b.amount - a.amount);
    if (sortVal === 'amount-asc') sorted.sort((a, b) => a.amount - b.amount);

    const searchInput = document.getElementById('search-input')?.value || '';
    let searchRegex = null;
    if (searchInput) {
        try {
            searchRegex = new RegExp(searchInput, state.isCaseSensitive ? '' : 'i');
        } catch(e) { 
            searchRegex = null; 
        }
    }

    let matchCount = 0;
    sorted.forEach(item => { 
        const hasDuplicateWord = /\b(\w+)\s+\1\b/i.test(item.description);
        if (searchRegex && !searchRegex.test(item.description) && !searchRegex.test(item.category)) return;
        matchCount++;

        let descText = item.description;
        if (searchRegex) {
            descText = descText.replace(searchRegex, match => `<mark>${match}</mark>`);
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${descText} ${hasDuplicateWord ? '⚠️' : ''}</td>
            <td>${item.category}</td>
            <td>${item.amount} mins</td>
            <td>
                <button onclick="handleEdit('${item.id}')" style="width:auto; padding:2px 6px;">Edit</button>
                <button onclick="handleDelete('${item.id}')" style="width:auto; padding:2px 6px; background:#991b1b;">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    const noRecords = document.getElementById('no-records');
    if (noRecords) {
        noRecords.className = matchCount === 0 ? '' : 'hidden';
    }
}

// 4. ACTION INTERFACE TRIGGERS
window.switchTab = function(tabId) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + tabId) l.classList.add('active');
    });
};

window.updateBudgetCap = function() {
    const val = document.getElementById('cap-input').value;
    state.timeTarget = parseInt(val) || 0;
    renderApp();
};

window.toggleCase = function() {
    state.isCaseSensitive = !state.isCaseSensitive;
    renderApp();
};

window.handlesort = function() {
    renderApp();
};

window.convertDisplayUnits = function() {
    renderApp();
};

// Form Management Events Hook
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-input')?.addEventListener('input', renderApp);

    document.getElementById('transaction-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const desc = document.getElementById('form-desc').value;
        const amountStr = document.getElementById('form-amount').value;
        const cat = document.getElementById('form-category').value;
        const date = new Date().toISOString().split('T')[0];

        if (!validateFormInputs(desc, amountStr, date)) {
            alert("Validation failed! Please review inputs.");
            return;
        }

        if (state.editingId) {
            state.records = state.records.map(r => r.id === state.editingId ? { 
                ...r, description: desc, amount: parseInt(amountStr), category: cat, date: date 
            } : r);
            state.editingId = null;
            document.getElementById('submit-btn').textContent = "Save Task Entry";
        } else {
            state.records.push({ 
                id: "rec_" + Date.now(), description: desc, amount: parseInt(amountStr), category: cat, date: date 
            });
        }
        saveToLocalStorage();
        document.getElementById('transaction-form').reset();
        renderApp();
        window.switchTab('dashboard');
    });

    renderApp();
});

window.handleDelete = function(id) {
    if (confirm("Delete this entry?")) {
        state.records = state.records.filter(r => r.id !== id);
        saveToLocalStorage();
        renderApp();
    }
};

window.handleEdit = function(id) {
    const item = state.records.find(r => r.id === id);
    if (!item) return;
    state.editingId = id;
    window.switchTab('form-section');
    document.getElementById('form-desc').value = item.description;
    document.getElementById('form-amount').value = item.amount;
    document.getElementById('form-category').value = item.category;
    document.getElementById('submit-btn').textContent = "Update Task";
};

// Force the app to only show the Dashboard on initial load
document.addEventListener('DOMContentLoaded', () => {
    window.switchTab('dashboard');
    renderApp();
});
