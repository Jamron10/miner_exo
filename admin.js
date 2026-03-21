// admin.js - Admin Panel Logic connected to MongoDB Backend

// ВАЖНО: Укажите здесь URL вашего запущенного сервера (например, Render.com)
// Пока сервер не запущен, админка не сможет загрузить данные.
const ADMIN_API_URL = 'http://localhost:3000/api/admin'; // ЗАМЕНИТЬ ПОСЛЕ ЗАПУСКА СЕРВЕРА!

const ADMIN_DRONE_TYPES = {
    'FREE': { name: 'Бесплатный', color: 'text-gray-400' },
    'COMMON': { name: 'Обычный', color: 'text-green-400' },
    'UNCOMMON': { name: 'Необычный', color: 'text-blue-400' },
    'RARE': { name: 'Редкий', color: 'text-purple-400' },
    'EPIC': { name: 'Эпический', color: 'text-pink-400' },
    'LEGENDARY': { name: 'Легендарный', color: 'text-yellow-400' }
};

// Глобальное состояние (загружается с сервера)
let adminState = {
    stats: { users: 0, miners: 0, totalDeposits: 0, totalWithdraws: 0 },
    pendingDeposits: [],
    pendingWithdraws: [],
    recentActivity: [],
    users: []
};

// 1. Загрузка данных с сервера (MongoDB)
async function loadAdminData() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/data`);
        if (!response.ok) throw new Error('Сервер недоступен');
        
        const data = await response.json();
        
        // Преобразуем данные из базы в нужный для UI формат
        adminState.stats = data.stats || adminState.stats;
        
        adminState.pendingDeposits = (data.pendingDeposits || []).map(d => ({
            id: d._id,
            memo: d.memo || d.userId, // Memo или TG ID
            amount: d.amount,
            date: d.date
        }));
        
        adminState.pendingWithdraws = (data.pendingWithdraws || []).map(w => ({
            id: w._id,
            memo: w.userId,
            address: w.address || 'Адрес не указан',
            amount: w.amount,
            date: w.date
        }));
        
        adminState.users = (data.users || []).map(u => ({
            memo: u.tgId,
            username: u.username ? `@${u.username}` : '',
            name: u.firstName || 'Игрок',
            balance: u.depositBalance || 0,
            mining: u.miningBalance || 0,
            drones: u.drones || []
        }));

        console.log("✅ Данные админки успешно загружены из базы!");
        
        // Перерисовываем UI
        renderAdminDashboard();
        renderAdminRequests();
        renderAdminUsers();

    } catch (error) {
        console.error("❌ Ошибка загрузки админки (Сервер не запущен или неверная ссылка?):", error);
        if(typeof showToast === 'function') showToast('Оффлайн-режим: сервер БД недоступен')
        renderAdminDashboard();
        renderAdminRequests();
        renderAdminUsers();;
    }
}

// 2. Инициализация UI
function initAdminPanel() {
    const viewAdmin = document.getElementById('view-admin');
    const btnClose = document.getElementById('btn-close-admin');
    const tabs = document.querySelectorAll('.admin-tab-btn');
    const contents = document.querySelectorAll('.admin-tab-content');

    // Секретный клик (5 раз по аватару)
    let clickCount = 0;
    let clickTimer = null;
    const tgAvatar = document.getElementById('tg-avatar');
    if (tgAvatar) {
        const tgAvatarContainer = tgAvatar.closest('.flex.items-center.gap-2');
        if (tgAvatarContainer) {
            tgAvatarContainer.addEventListener('click', () => {
                clickCount++;
                clearTimeout(clickTimer);
                if (clickCount >= 5) {
                    viewAdmin.classList.remove('hidden');
                    viewAdmin.classList.add('flex');
                    clickCount = 0;
                    
                    if(typeof showToast === 'function') showToast('Вход в панель администратора');
                    
                    // Загружаем актуальные данные из БД при открытии!
                    loadAdminData();
                } else {
                    clickTimer = setTimeout(() => { clickCount = 0; }, 500);
                }
            });
        }
    }

    // Закрыть админку
    if (btnClose) {
        btnClose.addEventListener('click', () => {
            viewAdmin.classList.add('hidden');
            viewAdmin.classList.remove('flex');
        });
    }

    // Поиск
    const searchInput = document.getElementById('admin-search-users');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderAdminUsers(e.target.value));
    }

    // Вкладки
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => {
                t.classList.remove('active', 'text-red-400', 'bg-red-500/10', 'shadow-[inset_0_0_15px_rgba(239,68,68,0.15)]', 'border-red-500/20');
                t.classList.add('text-gray-500', 'hover:text-gray-300', 'hover:bg-gray-800/50', 'border-transparent');
                const svg = t.querySelector('svg');
                if(svg) svg.classList.remove('drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]');
            });
            const target = e.currentTarget;
            target.classList.remove('text-gray-500', 'hover:text-gray-300', 'hover:bg-gray-800/50', 'border-transparent');
            target.classList.add('active', 'text-red-400', 'bg-red-500/10', 'shadow-[inset_0_0_15px_rgba(239,68,68,0.15)]', 'border-red-500/20');
            const svgTarget = target.querySelector('svg');
            if(svgTarget) svgTarget.classList.add('drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]');

            const tabName = target.dataset.tab;
            contents.forEach(c => {
                c.classList.remove('block');
                c.classList.add('hidden');
            });
            
            const targetContent = document.getElementById(`admin-tab-${tabName}`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('block');
            }
        });
    });

    // Делегирование кликов по кнопкам (Одобрить/Отклонить транзакции)
    const contentArea = document.getElementById('admin-content-area');
    if (contentArea) {
        contentArea.addEventListener('click', async (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const action = btn.getAttribute('data-action');
            if (action) {
                const id = btn.getAttribute('data-id');

                // Одобрить / Отклонить депозиты и выводы
                if (action === 'approve-dep' || action === 'reject-dep' || action === 'approve-wit' || action === 'reject-wit') {
                    btn.disabled = true;
                    btn.innerText = '⏳';
                    
                    const isApprove = action.includes('approve');
                    
                    try {
                        const res = await fetch(`${ADMIN_API_URL}/transaction`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: id, action: isApprove ? 'approve' : 'reject' })
                        });
                        
                        if (res.ok) {
                            if(typeof showToast === 'function') showToast(isApprove ? 'Успешно подтверждено' : 'Успешно отклонено');
                            await loadAdminData(); // Перезагружаем данные из БД
                        } else {
                            if(typeof showToast === 'function') showToast('Ошибка сервера');
                            btn.disabled = false;
                        }
                    } catch (err) {
                        if(typeof showToast === 'function') showToast('Ошибка сети');
                        btn.disabled = false;
                    }
                } 
                
                // Открыть окно изменения юзера
                else if (action === 'edit-user') {
                    const user = adminState.users.find(u => u.memo === id);
                    const modal = document.getElementById('admin-modal-edit-user');
                    if (user && modal) {
                        window.currentEditUserId = id;
                        
                        // Если DOM элементы не найдены, пересоздаем модалку динамически (защита)
                        if (!document.getElementById('admin-edit-memo')) {
                            modal.innerHTML = `<div class="bg-gray-900 border border-gray-700 rounded-3xl p-6 w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[95vh] flex flex-col"><h3 class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-5 shrink-0">Изменить пользователя</h3><div class="overflow-y-auto scrollbar-hide flex-1 space-y-5 pr-1 w-full"><div><label class="text-[10px] text-gray-500 uppercase font-bold mb-1.5 block">TG ID</label><input type="text" id="admin-edit-memo" class="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-gray-500 font-mono text-sm shadow-inner" disabled></div><div class="grid grid-cols-2 gap-3"><div><label class="text-[10px] text-gray-500 uppercase font-bold mb-1.5 block">Депозит (USDT)</label><input type="number" id="admin-edit-balance" step="0.01" class="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white font-mono text-sm focus:border-blue-500 focus:outline-none shadow-inner"></div><div><label class="text-[10px] text-gray-500 uppercase font-bold mb-1.5 block">Добыча (USDT)</label><input type="number" id="admin-edit-mining" step="0.01" class="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none shadow-inner"></div></div><div><label class="text-[10px] text-gray-500 uppercase font-bold mb-2 block">Майнеры пользователя</label><div id="admin-edit-miners-list" class="space-y-2 bg-gray-950/80 p-2.5 rounded-2xl border border-gray-800 min-h-[100px] max-h-[200px] overflow-y-auto scrollbar-hide shadow-inner"></div><div class="mt-3 p-3 bg-gray-800/40 rounded-2xl border border-gray-700/50 flex gap-2 items-center"><select id="admin-add-miner-type" class="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-500 font-bold shadow-inner"><option value="FREE" class="text-gray-400">Бесплатный</option><option value="COMMON" class="text-green-400">Обычный</option><option value="UNCOMMON" class="text-blue-400">Необычный</option><option value="RARE" class="text-purple-400">Редкий</option><option value="EPIC" class="text-pink-400">Эпический</option><option value="LEGENDARY" class="text-yellow-400">Легендарный</option></select><button data-action="add-miner" class="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black py-2.5 px-4 rounded-xl text-[10px] transition uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 shrink-0 flex items-center gap-1"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path></svg> Выдать</button></div></div></div><div class="flex gap-3 mt-6 shrink-0 w-full pt-4 border-t border-gray-800"><button id="btn-admin-close-edit" class="flex-1 bg-gray-800 text-gray-300 font-bold py-3.5 rounded-xl border border-gray-700 hover:bg-gray-700 hover:text-white transition active:scale-95">Отмена</button><button id="btn-admin-save-edit" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] transition active:scale-95">Сохранить</button></div></div>`;
                        }
                        
                        const memoInput = document.getElementById('admin-edit-memo');
                        const balanceInput = document.getElementById('admin-edit-balance');
                        const miningInput = document.getElementById('admin-edit-mining');
                        
                        if (memoInput) memoInput.value = user.memo;
                        if (balanceInput) balanceInput.value = user.balance;
                        if (miningInput) miningInput.value = user.mining;
                        
                        renderAdminUserMiners(user.memo);
                        
                        modal.classList.remove('hidden');
                        modal.classList.add('flex');
                    }
                }
            }
        });
    }
    
    // Кнопки внутри модалки редактирования пользователя
    const adminEditModal = document.getElementById('admin-modal-edit-user');
    if (adminEditModal) {
        adminEditModal.addEventListener('click', async (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            // Закрыть
            if (btn.id === 'btn-admin-close-edit') {
                adminEditModal.classList.add('hidden');
                adminEditModal.classList.remove('flex');
                return;
            }
            
            // СОХРАНИТЬ в БД
            if (btn.id === 'btn-admin-save-edit') {
                if (!window.currentEditUserId) return;
                const user = adminState.users.find(u => u.memo === window.currentEditUserId);
                
                if (user) {
                    const balanceInput = document.getElementById('admin-edit-balance');
                    const miningInput = document.getElementById('admin-edit-mining');
                    
                    const newBalance = parseFloat(balanceInput.value) || 0;
                    const newMining = parseFloat(miningInput.value) || 0;
                    
                    btn.innerText = 'Сохранение...';
                    
                    try {
                        const res = await fetch(`${ADMIN_API_URL}/user`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                tgId: user.memo, 
                                depositBalance: newBalance,
                                miningBalance: newMining,
                                drones: user.drones
                            })
                        });
                        
                        if (res.ok) {
                            if(typeof showToast === 'function') showToast('Данные успешно сохранены в БД');
                            await loadAdminData(); // Обновляем с сервера
                            adminEditModal.classList.add('hidden');
                            adminEditModal.classList.remove('flex');
                        } else {
                            if(typeof showToast === 'function') showToast('Ошибка при сохранении');
                        }
                    } catch (err) {
                        if(typeof showToast === 'function') showToast('Ошибка сети');
                    }
                    btn.innerText = 'Сохранить';
                }
                return;
            }
            
            const action = btn.getAttribute('data-action');
            
            // Выдать майнер (изменение в UI, в БД улетит при нажатии "Сохранить")
            if (action === 'add-miner') {
                if (!window.currentEditUserId) return;
                const user = adminState.users.find(u => u.memo === window.currentEditUserId);
                const select = document.getElementById('admin-add-miner-type');
                
                if (user && select) {
                    if (!user.drones) user.drones = [];
                    const type = select.value;
                    const newId = type.charAt(0).toLowerCase() + Math.random().toString(36).substring(2, 8);
                    
                    user.drones.unshift({ id: newId, type: type });
                    renderAdminUserMiners(user.memo);
                    
                    const typeInfo = ADMIN_DRONE_TYPES[type] || { name: type };
                    if(typeof showToast === 'function') showToast(`Выдан майнер: ${typeInfo.name}. Не забудьте нажать "Сохранить"!`);
                }
                return;
            }

            // Удалить майнер (изменение в UI, в БД улетит при нажатии "Сохранить")
            if (action === 'delete-miner') {
                const userId = btn.getAttribute('data-user-id');
                const minerId = btn.getAttribute('data-miner-id');
                const user = adminState.users.find(u => u.memo === userId);
                
                if (user && user.drones) {
                    user.drones = user.drones.filter(d => d.id !== minerId);
                    renderAdminUserMiners(userId);
                    
                    if(typeof showToast === 'function') showToast('Майнер удален. Не забудьте нажать "Сохранить"!');
                }
            }
        });
    }
}

// ==========================================
// ФУНКЦИИ ОТРИСОВКИ (Render Functions)
// ==========================================

function renderAdminDashboard() {
    document.getElementById('admin-stat-users').textContent = adminState.stats.users;
    document.getElementById('admin-stat-miners').textContent = adminState.stats.miners;
    document.getElementById('admin-stat-deposits').textContent = adminState.stats.totalDeposits.toFixed(2);
    document.getElementById('admin-stat-withdraws').textContent = adminState.stats.totalWithdraws.toFixed(2);

    const activityHtml = adminState.recentActivity.map(act => {
        let icon = '';
        if(act.type==='deposit') icon = '<div class="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg></div>';
        else if(act.type==='withdraw') icon = '<div class="w-8 h-8 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg></div>';
        else icon = '<div class="w-8 h-8 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>';

        return `
        <div class="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl p-3">
            ${icon}
            <div class="flex flex-col">
                <span class="text-xs text-gray-300">${act.text}</span>
                <span class="text-[10px] text-gray-500">${act.time}</span>
            </div>
        </div>`;
    }).join('');
    document.getElementById('admin-recent-activity').innerHTML = activityHtml || '<span class="text-xs text-gray-600">Нет логов</span>';
}

function renderAdminRequests() {
    renderAdminDeposits();
    renderAdminWithdraws();
}

function renderAdminDeposits() {
    const list = document.getElementById('admin-list-deposits');
    if(adminState.pendingDeposits.length === 0) {
        list.innerHTML = `<div class="text-center text-sm text-gray-600 py-4">Нет заявок</div>`;
        return;
    }
    list.innerHTML = adminState.pendingDeposits.map(d => `
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-inner">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">MEMO / TG ID: <span class="text-gray-300 tracking-widest">${d.memo}</span></span>
                    <span class="text-lg font-mono font-black text-emerald-400">+${d.amount.toFixed(2)} USDT</span>
                </div>
                <span class="text-[10px] text-gray-500">${new Date(d.date).toLocaleTimeString()}</span>
            </div>
            <div class="flex gap-2">
                <button data-action="approve-dep" data-id="${d.id}" class="flex-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95">Подтвердить</button>
                <button data-action="reject-dep" data-id="${d.id}" class="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95">Отклонить</button>
            </div>
        </div>
    `).join('');
}

function renderAdminWithdraws() {
    const list = document.getElementById('admin-list-withdraws');
    if(adminState.pendingWithdraws.length === 0) {
        list.innerHTML = `<div class="text-center text-sm text-gray-600 py-4">Нет заявок</div>`;
        return;
    }
    list.innerHTML = adminState.pendingWithdraws.map(w => `
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-inner">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">TG ID: <span class="text-gray-300 tracking-widest">${w.memo}</span></span>
                    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Кошелек: <span class="text-gray-300 font-mono text-[10px] break-all">${w.address}</span></span>
                    <span class="text-lg font-mono font-black text-red-400">-${w.amount.toFixed(2)} USDT</span>
                </div>
                <span class="text-[10px] text-gray-500 shrink-0 ml-2">${new Date(w.date).toLocaleTimeString()}</span>
            </div>
            <div class="flex gap-2">
                <button data-action="approve-wit" data-id="${w.id}" class="flex-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95">Выплачено</button>
                <button data-action="reject-wit" data-id="${w.id}" class="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95">Отклонить</button>
            </div>
        </div>
    `).join('');
}

function renderAdminUsers(query = '') {
    const list = document.getElementById('admin-list-users');
    if (!list) return;
    const q = query.toLowerCase().trim();
    
    const filtered = adminState.users.filter(u => 
        u.memo.toLowerCase().includes(q) || 
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.name && u.name.toLowerCase().includes(q))
    );

    if(filtered.length === 0) {
        list.innerHTML = `<div class="text-center text-sm text-gray-600 py-4">Ничего не найдено</div>`;
        return;
    }

    list.innerHTML = filtered.map(u => {
        const droneCount = u.drones ? u.drones.length : 0;
        return `
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-2 shadow-inner">
            <div class="flex justify-between items-center border-b border-gray-800 pb-2">
                <div class="flex flex-col">
                    <span class="text-sm font-bold text-white">${u.name} <span class="text-xs text-blue-400 font-normal ml-1">${u.username || ''}</span></span>
                    <span class="text-[10px] text-gray-500 font-mono tracking-widest mt-0.5">TG ID: ${u.memo}</span>
                </div>
                <button data-action="edit-user" data-id="${u.memo}" class="text-[10px] uppercase font-bold tracking-wider bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700 transition active:scale-95">Изменить</button>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center mt-1">
                <div class="flex flex-col">
                    <span class="text-[9px] text-gray-500 uppercase font-bold">Депозит</span>
                    <span class="text-xs font-mono text-white">${u.balance.toFixed(2)}</span>
                </div>
                <div class="flex flex-col border-x border-gray-800">
                    <span class="text-[9px] text-gray-500 uppercase font-bold">Добыча</span>
                    <span class="text-xs font-mono text-emerald-400">${u.mining.toFixed(2)}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-[9px] text-gray-500 uppercase font-bold">Майнеров</span>
                    <span class="text-xs font-mono text-blue-400">${droneCount} шт.</span>
                </div>
            </div>
        </div>
    `}).join('');
}

function renderAdminUserMiners(memo) {
    const user = adminState.users.find(u => u.memo === memo);
    const list = document.getElementById('admin-edit-miners-list');
    if (!list) return;
    
    if (!user.drones || user.drones.length === 0) {
        list.innerHTML = `<div class="text-center text-xs text-gray-600 py-6">Нет майнеров</div>`;
        return;
    }
    
    list.innerHTML = user.drones.map(d => {
        const typeInfo = ADMIN_DRONE_TYPES[d.type] || { name: d.type, color: 'text-gray-300' };
        
        return `
        <div class="flex justify-between items-center bg-gray-900 border border-gray-800 rounded-xl p-2.5 shadow-inner">
            <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-current ${typeInfo.color} drop-shadow-[0_0_5px_currentColor]"></div>
                <div class="flex flex-col">
                    <span class="text-[11px] font-black uppercase tracking-wider ${typeInfo.color}">${typeInfo.name}</span>
                    <span class="text-[9px] text-gray-500 font-mono tracking-widest mt-0.5">ID: ${d.id.substring(0,8)}</span>
                </div>
            </div>
            <button data-action="delete-miner" data-user-id="${user.memo}" data-miner-id="${d.id}" class="w-8 h-8 flex items-center justify-center bg-red-900/20 text-red-500 hover:bg-red-800/40 hover:text-red-400 rounded-lg border border-red-900/30 transition active:scale-95" title="Удалить">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
        `;
    }).join('');
}

// Запуск при загрузке страницы
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
} else {
    initAdminPanel();
}
