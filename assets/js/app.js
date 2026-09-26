/**
 * ========================================================
 * Sistem Manajemen Database Mahasiswa - JavaScript (AJAX)
 * ========================================================
 * Menangani komunikasi Fetch API dengan backend PHP Native (MariaDB)
 */

const API_BASE = 'api/';

// Variabel state global
let currentDeleteId = null;
let searchDebounceTimer = null;

// Peta kode agama
const AGAMA_MAP = {
    'I': 'Islam',
    'P': 'Kristen',
    'K': 'Katolik',
    'B': 'Buddha',
    'H': 'Hindu',
    'C': 'Konghucu',
    'A': 'Lainnya'
};

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

    // 2. Form Submit Listeners
    const formAdd = document.getElementById('mahasiswa-form');
    if (formAdd) {
        formAdd.addEventListener('submit', handleCreateMahasiswa);
    }

    const formEdit = document.getElementById('edit-mahasiswa-form');
    if (formEdit) {
        formEdit.addEventListener('submit', handleUpdateMahasiswa);
    }

    // 3. Search & Filter Event Listeners
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                loadMahasiswa();
            }, 300);
        });
    }

    const filterProdi = document.getElementById('filter-prodi');
    if (filterProdi) {
        filterProdi.addEventListener('change', () => loadMahasiswa());
    }

    const filterAngkatan = document.getElementById('filter-angkatan');
    if (filterAngkatan) {
        filterAngkatan.addEventListener('change', () => loadMahasiswa());
    }

    // 4. Muat Data Mahasiswa Awal
    loadMahasiswa(true);
});

// ========================================================
// CRUD FUNCTIONS (Fetch API)
// ========================================================

/**
 * Mengambil dan menampilkan data mahasiswa dari api/read.php
 * @param {boolean} updateFilterOptions Jika true, opsi filter prodi/angkatan akan diperbarui
 */
async function loadMahasiswa(updateFilterOptions = false) {
    const tableBody = document.getElementById('mahasiswa-table-body');
    const searchInput = document.getElementById('search-input');
    const filterProdi = document.getElementById('filter-prodi');
    const filterAngkatan = document.getElementById('filter-angkatan');

    const searchVal = searchInput ? searchInput.value.trim() : '';
    const prodiVal  = filterProdi ? filterProdi.value : '';
    const angkatanVal = filterAngkatan ? filterAngkatan.value : '';

    // Susun URL Query Parameters
    const params = new URLSearchParams();
    if (searchVal) params.append('q', searchVal);
    if (prodiVal) params.append('prodi', prodiVal);
    if (angkatanVal) params.append('angkatan', angkatanVal);

    try {
        const response = await fetch(`${API_BASE}read.php?${params.toString()}`);
        const result = await response.json();

        if (result.status === 'success') {
            const students = result.data.students || [];
            const stats = result.data.stats || {};

            // Update Statistik Dashboard
            const statTotalEl = document.getElementById('stat-total-mahasiswa');
            const statProdiEl = document.getElementById('stat-total-prodi');
            if (statTotalEl && stats.total_mahasiswa !== undefined) {
                statTotalEl.textContent = stats.total_mahasiswa;
            }
            if (statProdiEl && stats.total_prodi !== undefined) {
                statProdiEl.textContent = stats.total_prodi;
            }

            // Update Dropdown Filter (hanya saat awal atau dibutuhkan)
            if (updateFilterOptions && stats.prodi_list && stats.angkatan_list) {
                populateFilterOptions(stats.prodi_list, stats.angkatan_list, prodiVal, angkatanVal);
            }

            // Render Baris Tabel
            renderTable(students);
        } else {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center" style="padding: 25px; color: #d00;">
                        <i class="ph-bold ph-warning-circle"></i> ${result.message || 'Gagal memuat data.'}
                    </td>
                </tr>
            `;
        }
    } catch (err) {
        console.error('Fetch error:', err);
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center" style="padding: 25px; color: #555;">
                    <i class="ph-bold ph-plugs"></i> Tidak dapat terhubung ke server backend PHP.<br>
                    <small>Pastikan server lokal (Apache/PHP/MariaDB) sudah aktif dan file database telah di-import.</small>
                </td>
            </tr>
        `;
    }
}

/**
 * Render array mahasiswa ke dalam tabel HTML
 */
function renderTable(students) {
    const tableBody = document.getElementById('mahasiswa-table-body');
    if (!tableBody) return;

    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center" style="padding: 30px; font-weight: 600;">
                    <i class="ph-bold ph-folder-open" style="font-size: 24px; vertical-align: middle;"></i> Tidak ada data mahasiswa yang cocok.
                </td>
            </tr>
        `;
        return;
    }

    let rowsHtml = '';
    students.forEach((mhs, index) => {
        const isLaki = mhs.jenis_kelamin === 'L';
        const badgeGender = isLaki ? 'badge-l' : 'badge-p';
        const labelGender = isLaki ? 'L' : 'P';
        const namaAgama = AGAMA_MAP[mhs.agama] || mhs.agama;

        // Escape string untuk pencegahan XSS
        const safeNama = escapeHtml(mhs.nama_mahasiswa);
        const safeNPM  = escapeHtml(mhs.npm);
        const safeProdi = escapeHtml(mhs.program_studi);

        rowsHtml += `
            <tr>
                <td data-label="No">${index + 1}</td>
                <td data-label="NPM"><strong>${safeNPM}</strong></td>
                <td data-label="Nama Mahasiswa">${safeNama}</td>
                <td data-label="L/P"><span class="badge ${badgeGender}">${labelGender}</span></td>
                <td data-label="Program Studi">${safeProdi}</td>
                <td data-label="Angkatan">${mhs.angkatan}</td>
                <td data-label="Agama"><span class="badge" style="background-color: var(--bg-cream);">${namaAgama}</span></td>
                <td data-label="Aksi">
                    <div class="action-buttons">
                        <button class="neo-btn-icon btn-yellow" onclick="openEditModal(${mhs.id_mahasiswa})" title="Edit / Update">
                            <i class="ph-bold ph-pencil-simple"></i>
                        </button>
                        <button class="neo-btn-icon btn-pink" onclick="openDeleteModal(${mhs.id_mahasiswa}, '${safeNama.replace(/'/g, "\\'")}', '${safeNPM}')" title="Hapus">
                            <i class="ph-bold ph-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rowsHtml;
}

/**
 * Handler Simpan Mahasiswa Baru (Create)
 */
async function handleCreateMahasiswa(e) {
    e.preventDefault();
    const form = e.target;
    const btnSubmit = document.getElementById('btn-save-add');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // Ubah teks tombol saat loading
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = `<i class="ph-bold ph-spinner ph-spin"></i> Menyimpan...`;
    btnSubmit.disabled = true;

    try {
        const response = await fetch(`${API_BASE}create.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.status === 'success') {
            closeModal('form-modal');
            form.reset();
            showToast(result.message || 'Data mahasiswa berhasil ditambahkan!', 'success');
            loadMahasiswa(true); // reload tabel dan dropdown filter
        } else {
            showToast(result.message || 'Gagal menambahkan data.', 'error');
        }
    } catch (err) {
        console.error('Error create:', err);
        showToast('Terjadi kesalahan jaringan atau server.', 'error');
    } finally {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
}

/**
 * Buka modal edit dan isi form dengan data dari server
 */
async function openEditModal(id) {
    try {
        const response = await fetch(`${API_BASE}read.php?id=${id}`);
        const result = await response.json();

        if (result.status === 'success') {
            const mhs = result.data;
            document.getElementById('edit-id').value = mhs.id_mahasiswa;
            document.getElementById('edit-npm').value = mhs.npm;
            document.getElementById('edit-nama').value = mhs.nama_mahasiswa;
            document.getElementById('edit-jk').value = mhs.jenis_kelamin;
            document.getElementById('edit-agama').value = mhs.agama;
            document.getElementById('edit-prodi').value = mhs.program_studi;
            document.getElementById('edit-angkatan').value = mhs.angkatan;

            openModal('edit-modal');
        } else {
            showToast(result.message || 'Gagal memuat detail mahasiswa.', 'error');
        }
    } catch (err) {
        console.error('Error fetch detail:', err);
        showToast('Koneksi server gagal saat mengambil data.', 'error');
    }
}

/**
 * Handler Simpan Perubahan Data (Update)
 */
async function handleUpdateMahasiswa(e) {
    e.preventDefault();
    const form = e.target;
    const btnSubmit = document.getElementById('btn-save-edit');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = `<i class="ph-bold ph-spinner ph-spin"></i> Memperbarui...`;
    btnSubmit.disabled = true;

    try {
        const response = await fetch(`${API_BASE}update.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.status === 'success') {
            closeModal('edit-modal');
            showToast(result.message || 'Data berhasil diperbarui!', 'success');
            loadMahasiswa(true);
        } else {
            showToast(result.message || 'Gagal memperbarui data.', 'error');
        }
    } catch (err) {
        console.error('Error update:', err);
        showToast('Gagal terhubung ke server.', 'error');
    } finally {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
}

/**
 * Buka modal konfirmasi hapus
 */
function openDeleteModal(id, nama, npm) {
    currentDeleteId = id;
    const textEl = document.getElementById('delete-confirm-text');
    if (textEl) {
        textEl.innerHTML = `Data mahasiswa <strong>${escapeHtml(nama)} (${escapeHtml(npm)})</strong> akan dihapus permanen. Anda yakin?`;
    }
    openModal('delete-modal');
}

/**
 * Handler Eksekusi Hapus Mahasiswa (Delete)
 */
async function confirmDelete() {
    if (!currentDeleteId) return;

    const btnDelete = document.getElementById('btn-confirm-delete');
    const originalText = btnDelete.innerHTML;
    btnDelete.innerHTML = `<i class="ph-bold ph-spinner ph-spin"></i> Menghapus...`;
    btnDelete.disabled = true;

    try {
        const response = await fetch(`${API_BASE}delete.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_mahasiswa: currentDeleteId })
        });
        const result = await response.json();

        if (result.status === 'success') {
            closeModal('delete-modal');
            showToast(result.message || 'Data mahasiswa berhasil dihapus!', 'success');
            currentDeleteId = null;
            loadMahasiswa(true);
        } else {
            showToast(result.message || 'Gagal menghapus data.', 'error');
        }
    } catch (err) {
        console.error('Error delete:', err);
        showToast('Terjadi kesalahan saat menghapus data.', 'error');
    } finally {
        btnDelete.innerHTML = originalText;
        btnDelete.disabled = false;
    }
}

/**
 * Update dropdown opsi prodi & angkatan
 */
function populateFilterOptions(prodiList, angkatanList, currentProdi, currentAngkatan) {
    const filterProdi = document.getElementById('filter-prodi');
    const filterAngkatan = document.getElementById('filter-angkatan');

    if (filterProdi) {
        let prodiOptions = '<option value="">Semua Program Studi</option>';
        prodiList.forEach(p => {
            const selected = p === currentProdi ? 'selected' : '';
            prodiOptions += `<option value="${escapeHtml(p)}" ${selected}>${escapeHtml(p)}</option>`;
        });
        filterProdi.innerHTML = prodiOptions;
    }

    if (filterAngkatan) {
        let angkatanOptions = '<option value="">Semua Angkatan</option>';
        angkatanList.forEach(a => {
            const selected = a.toString() === currentAngkatan ? 'selected' : '';
            angkatanOptions += `<option value="${escapeHtml(a.toString())}" ${selected}>${escapeHtml(a.toString())}</option>`;
        });
        filterAngkatan.innerHTML = angkatanOptions;
    }
}

// ========================================================
// UI UTILITIES
// ========================================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn i');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (hamburgerBtn) hamburgerBtn.classList.replace('ph-x', 'ph-list');
    }
}

// Klik di luar overlay untuk menutup modal
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('neo-modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

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
        <span class="toast-message">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}

function escapeHtml(string) {
    if (!string) return '';
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
