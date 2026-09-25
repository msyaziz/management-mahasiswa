// ==========================================
// Sistem Manajemen Mahasiswa - JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // 2. Setup Data Labels untuk Responsive Table (Mobile)
    const table = document.querySelector('.neo-table');
    if (table) {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('data-label', headers[index]);
                }
            });
        });
    }

    // 3. Form Submit Prevention (Simulasi)
    const form = document.getElementById('mahasiswa-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm();
        });
    }

    const editForm = document.getElementById('edit-mahasiswa-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitEditForm();
        });
    }
});

// --- Fungsi Global ---

// Tutup Mobile Menu
function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn i');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (hamburgerBtn) hamburgerBtn.classList.replace('ph-x', 'ph-list');
    }
}

// Buka Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
}

// Tutup Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Tutup modal jika klik di luar area konten (overlay)
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('neo-modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Simulasi Submit Form Tambah
function submitForm() {
    const form = document.getElementById('mahasiswa-form');
    if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    closeModal('form-modal');
    showToast('Data mahasiswa berhasil disimpan!', 'success');
    if (form) form.reset();
}

// Simulasi Submit Form Edit/Update
function submitEditForm() {
    const form = document.getElementById('edit-mahasiswa-form');
    if (form && !form.checkValidity()) {
        form.reportValidity();
        return;
    }

    closeModal('edit-modal');
    showToast('Data mahasiswa berhasil diperbarui!', 'info');
}

// Simulasi Konfirmasi Hapus
function confirmDelete() {
    closeModal('delete-modal');
    showToast('Data mahasiswa berhasil dihapus!', 'success');
}

// Fungsi Menampilkan Toast/Alert
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `neo-toast toast-${type}`;
    
    let iconClass = 'ph-check-circle';
    if (type === 'error') iconClass = 'ph-x-circle';
    if (type === 'info') iconClass = 'ph-info';

    toast.innerHTML = `
        <i class="ph-fill ${iconClass} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
