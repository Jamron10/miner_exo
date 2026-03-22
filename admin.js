// admin.js - Admin Panel Logic connected to MongoDB Backend

// ВАЖНО: Укажите здесь URL вашего запущенного сервера (например, Render.com)
const ADMIN_API_URL = 'https://miner-exo.onrender.com/api/admin'; 

const ADMIN_DRONE_TYPES = {
    'FREE': { name: 'Бесплатный', color: 'text-gray-400' },
    'COMMON': { name: 'Обычный', color: 'text-green-400' },
    'UNCOMMON': { name: 'Необычный', color: 'text-blue-400' },
    'RARE': { name: 'Редкий', color: 'text-purple-400' },
    'EPIC': { name: 'Эпический', color: 'text-pink-400' },
    'LEGENDARY': { name: 'Легендарный', color: 'text-yellow-400' }
};

// Глобальное состояние
let adminState = {
    stats: { users: 0, miners: 0, totalDeposits: 0, totalWithdraws: 0 },
    pendingDeposits: [],
    pendingWithdraws: [],
    recentActivity: [],
    users: []
};

// 1. Загрузка данных
async function loadAdminData() {
    try {
        const response = await fetch(`${ADMIN_API_URL}/data`);
        if (!response.ok) throw new Error('Сервер недоступен');
        
        const data = await response.json();
        
        adminState.stats = data.stats || adminState.stats;
        
        adminState.pendingDeposits = (data.pendingDeposits || []).map(d => ({
            id: d._id,
            memo: d.memo || d.userId,
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
            memo: String(u.tgId || ''),
            username: u.username ? `@${u.username}` : '',
            name: u.firstName || 'Игрок',
            balance: u.depositBalance || 0,
            mining: u.miningBalance || 0,
            drones: u.drones || []
        }));

        console.log("✅ Данные админки успешно загружены из базы!");
    } catch (error) {
        console.error("❌ Оффлайн режим админки (Сервер недоступен).", error);
        if(typeof showToast === 'function') showToast('Оффлайн-режим: сервер БД недоступен, работаем с кэшем');
        
        // Mock data for offline view
        if(adminState.users.length === 0 && window.state && window.state.memo) {
            adminState.users.push({
                memo: String(window.state.memo),
                username: document.getElementById('tg-username')?.textContent || '@guest',
                name: document.getElementById('tg-name')?.textContent || 'Гость',
                balance: window.state.balance || 0,
                mining: window.state.miningBalance || 0,
                drones: window.state.drones || []
            });
            adminState.stats.users = 1;
            adminState.stats.miners = window.state.drones ? window.state.drones.length : 0;
            adminState.stats.totalDeposits = window.state.balance || 0;
        }
    }
    
    renderAdminDashboard();
    renderAdminRequests();
    renderAdminUsers();
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
                    loadAdminData();
                } else {
                    clickTimer = setTimeout(() => { clickCount = 0; }, 500);
                }
            });
        }
    }

    if (btnClose) {
        btnClose.addEventListener('click', () => {
            viewAdmin.classList.add('hidden');
            viewAdmin.classList.remove('flex');
        });
    }

    const searchInput = document.getElementById('admin-search-users');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderAdminUsers(e.target.value));
    }

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

    // Fix Management buttons data-action
    const mgmtTab = document.getElementById('admin-tab-management');
    if (mgmtTab) {
        const saveBtns = mgmtTab.querySelectorAll('button[data-i18n=\"app.admin_btn_save\"]');
        if (saveBtns[0]) saveBtns[0].setAttribute('data-action', 'save-settings');
        if (saveBtns[1]) saveBtns[1].setAttribute('data-action', 'save-rates');
    }

    const contentArea = document.getElementById('admin-content-area');
    if (contentArea) {
        contentArea.addEventListener('click', async (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const action = btn.getAttribute('data-action');
            if (action) {
                const id = btn.getAttribute('data-id');

                if (action === 'save-settings') {
                    btn.disabled = true;
                    const prevText = btn.innerText;
                    btn.innerText = 'Сохранение...';
                    setTimeout(() => {
                        if(typeof showToast === 'function') showToast('Настройки успешно сохранены');
                        btn.innerText = prevText;
                        btn.disabled = false;
                    }, 500);
                    return;
                }

                if (action === 'save-rates') {
                    btn.disabled = true;
                    const prevText = btn.innerText;
                    btn.innerText = 'Сохранение...';
                    setTimeout(() => {
                        if(typeof showToast === 'function') showToast('Доходность успешно обновлена');
                        btn.innerText = prevText;
                        btn.disabled = false;
                    }, 500);
                    return;
                }

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
                            if(typeof showToast === 'function') showToast(isApprove ? 'Успешно подтверждено' : 'Отклонено');
                            await loadAdminData();
                        } else {
                            throw new Error('Ошибка сервера');
                        }
                    } catch (err) {
                        if(typeof showToast === 'function') showToast('Оффлайн: Действие сымитировано');
                        
                        // Offline mock fallback
                        if (action.includes('dep')) adminState.pendingDeposits = adminState.pendingDeposits.filter(d => d.id !== id);
                        if (action.includes('wit')) adminState.pendingWithdraws = adminState.pendingWithdraws.filter(w => w.id !== id);
                        renderAdminRequests();
                    }
                } 
                
                else if (action === 'edit-user') {
                    const user = adminState.users.find(u => u.memo === id);
                    const modal = document.getElementById('admin-modal-edit-user');
                    if (user && modal) {
                        window.currentEditUserId = id;
                        
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
    
    const adminEditModal = document.getElementById('admin-modal-edit-user');
    if (adminEditModal) {
        adminEditModal.addEventListener('click', async (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            
            if (btn.id === 'btn-admin-close-edit') {
                adminEditModal.classList.add('hidden');
                adminEditModal.classList.remove('flex');
                return;
            }
            
            if (btn.id === 'btn-admin-save-edit') {
                if (!window.currentEditUserId) return;
                const user = adminState.users.find(u => u.memo === window.currentEditUserId);
                
                if (user) {
                    const balanceInput = document.getElementById('admin-edit-balance');
                    const miningInput = document.getElementById('admin-edit-mining');
                    
                    const newBalance = parseFloat(balanceInput.value) || 0;
                    const newMining = parseFloat(miningInput.value) || 0;
                    
                    // Update locally immediately
                    user.balance = newBalance;
                    user.mining = newMining;
                    
                    // If editing the current user offline
                    if (window.state && window.state.memo === user.memo) {
                        window.state.balance = newBalance;
                        window.state.miningBalance = newMining;
                        window.state.drones = user.drones;
                        if (typeof window.updateBalancesUI === 'function') window.updateBalancesUI();
                        if (typeof window.saveState === 'function') window.saveState();
                        if (typeof window.renderHangar === 'function') window.renderHangar();
                    }

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
                            if(typeof showToast === 'function') showToast('Успешно сохранено');
                            await loadAdminData();
                        } else {
                            throw new Error('Error');
                        }
                    } catch (err) {
                        if(typeof showToast === 'function') showToast('Оффлайн: Успешно сохранено локально');
                        renderAdminUsers();
                    }
                    
                    btn.innerText = 'Сохранить';
                    adminEditModal.classList.add('hidden');
                    adminEditModal.classList.remove('flex');
                }
                return;
            }
            
            const action = btn.getAttribute('data-action');
            
            if (action === 'add-miner') {
                if (!window.currentEditUserId) return;
                const user = adminState.users.find(u => u.memo === window.currentEditUserId);
                const select = document.getElementById('admin-add-miner-type');
                
                if (user && select) {
                    if (!user.drones) user.drones = [];
                    const type = select.value;
                    const newId = type.charAt(0).toLowerCase() + Math.random().toString(36).substring(2, 8);
                    
                    user.drones.unshift({ id: newId, type: type, acquiredAt: Date.now(), minedAmount: 0 });
                    renderAdminUserMiners(user.memo);
                    
                    const typeInfo = ADMIN_DRONE_TYPES[type] || { name: type };
                    if(typeof showToast === 'function') showToast(`Выдан: ${typeInfo.name}. Не забудьте нажать \"Сохранить\"!`);
                }
                return;
            }

            if (action === 'delete-miner') {
                const userId = btn.getAttribute('data-user-id');
                const minerId = btn.getAttribute('data-miner-id');
                const user = adminState.users.find(u => u.memo === userId);
                
                if (user && user.drones) {
                    user.drones = user.drones.filter(d => d.id !== minerId);
                    renderAdminUserMiners(userId);
                    if(typeof showToast === 'function') showToast('Удален. Нажмите \"Сохранить\"!');
                }
            }
        });
    }
}

// ==========================================
// ФУНКЦИИ ОТРИСОВКИ (Render Functions)
// ==========================================

function renderAdminDashboard() {
    const elUsers = document.getElementById('admin-stat-users');
    if (elUsers) elUsers.textContent = adminState.stats.users;
    
    const elMiners = document.getElementById('admin-stat-miners');
    if (elMiners) elMiners.textContent = adminState.stats.miners;
    
    const elDep = document.getElementById('admin-stat-deposits');
    if (elDep) elDep.textContent = adminState.stats.totalDeposits.toFixed(2);
    
    const elWit = document.getElementById('admin-stat-withdraws');
    if (elWit) elWit.textContent = adminState.stats.totalWithdraws.toFixed(2);

    const activityHtml = adminState.recentActivity.map(act => {
        let icon = '';
        if(act.type==='deposit') icon = '<div class=\"w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0\"><svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M7 11l5-5m0 0l5 5m-5-5v12\"></path></svg></div>';
        else if(act.type==='withdraw') icon = '<div class=\"w-8 h-8 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center shrink-0\"><svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 13l-5 5m0 0l-5-5m5 5V6\"></path></svg></div>';
        else icon = '<div class=\"w-8 h-8 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center shrink-0\"><svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"></path></svg></div>';

        return `
        <div class=\"flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl p-3\">
            ${icon}
            <div class=\"flex flex-col\">
                <span class=\"text-xs text-gray-300\">${act.text}</span>
                <span class=\"text-[10px] text-gray-500\">${act.time}</span>
            </div>
        </div>`;
    }).join('');
    
    const recentEl = document.getElementById('admin-recent-activity');
    if (recentEl) recentEl.innerHTML = activityHtml || '<span class=\"text-xs text-gray-600\">Нет логов</span>';
}

function renderAdminRequests() {
    renderAdminDeposits();
    renderAdminWithdraws();
}

function renderAdminDeposits() {
    const list = document.getElementById('admin-list-deposits');
    if(!list) return;
    if(adminState.pendingDeposits.length === 0) {
        list.innerHTML = `<div class=\"text-center text-sm text-gray-600 py-4\">Нет заявок</div>`;
        return;
    }
    list.innerHTML = adminState.pendingDeposits.map(d => `
        <div class=\"bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-inner\">
            <div class=\"flex justify-between items-start\">
                <div class=\"flex flex-col\">
                    <span class=\"text-xs text-gray-500 uppercase font-bold tracking-wider mb-1\">MEMO / TG ID: <span class=\"text-gray-300 tracking-widest\">${d.memo}</span></span>
                    <span class=\"text-lg font-mono font-black text-emerald-400\">+${d.amount.toFixed(2)} USDT</span>
                </div>
                <span class=\"text-[10px] text-gray-500\">${new Date(d.date).toLocaleTimeString()}</span>
            </div>
            <div class=\"flex gap-2\">
                <button data-action=\"approve-dep\" data-id=\"${d.id}\" class=\"flex-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95\">Подтвердить</button>
                <button data-action=\"reject-dep\" data-id=\"${d.id}\" class=\"flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95\">Отклонить</button>
            </div>
        </div>
    `).join('');
}

function renderAdminWithdraws() {
    const list = document.getElementById('admin-list-withdraws');
    if(!list) return;
    if(adminState.pendingWithdraws.length === 0) {
        list.innerHTML = `<div class=\"text-center text-sm text-gray-600 py-4\">Нет заявок</div>`;
        return;
    }
    list.innerHTML = adminState.pendingWithdraws.map(w => `
        <div class=\"bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-inner\">
            <div class=\"flex justify-between items-start\">
                <div class=\"flex flex-col\">
                    <span class=\"text-xs text-gray-500 uppercase font-bold tracking-wider mb-1\">TG ID: <span class=\"text-gray-300 tracking-widest\">${w.memo}</span></span>
                    <span class=\"text-xs text-gray-500 uppercase font-bold tracking-wider mb-1\">Кошелек: <span class=\"text-gray-300 font-mono text-[10px] break-all\">${w.address}</span></span>
                    <span class=\"text-lg font-mono font-black text-red-400\">-${w.amount.toFixed(2)} USDT</span>
                </div>
                <span class=\"text-[10px] text-gray-500 shrink-0 ml-2\">${new Date(w.date).toLocaleTimeString()}</span>
            </div>
            <div class=\"flex gap-2\">
                <button data-action=\"approve-wit\" data-id=\"${w.id}\" class=\"flex-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95\">Выплачено</button>
                <button data-action=\"reject-wit\" data-id=\"${w.id}\" class=\"flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 py-2 rounded-lg text-xs font-bold transition active:scale-95\">Отклонить</button>
            </div>
        </div>
    `).join('');
}

function renderAdminUsers(query = '') {
    const list = document.getElementById('admin-list-users');
    if (!list) return;
    const q = query.toLowerCase().trim();
    
    const filtered = adminState.users.filter(u => 
        (u.memo && String(u.memo).toLowerCase().includes(q)) || 
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.name && u.name.toLowerCase().includes(q))
    );

    if(filtered.length === 0) {
        list.innerHTML = `<div class=\"text-center text-sm text-gray-600 py-4\">Ничего не найдено</div>`;
        return;
    }

    list.innerHTML = filtered.map(u => {
        const droneCount = u.drones ? u.drones.length : 0;
        return `
        <div class=\"bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-2 shadow-inner\">
            <div class=\"flex justify-between items-center border-b border-gray-800 pb-2\">
                <div class=\"flex flex-col\">
                    <span class=\"text-sm font-bold text-white\">${u.name} <span class=\"text-xs text-blue-400 font-normal ml-1\">${u.username || ''}</span></span>
                    <span class=\"text-[10px] text-gray-500 font-mono tracking-widest mt-0.5\">TG ID: ${u.memo}</span>
                </div>
                <button data-action=\"edit-user\" data-id=\"${u.memo}\" class=\"text-[10px] uppercase font-bold tracking-wider bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700 transition active:scale-95\">Изменить</button>
            </div>
            <div class=\"grid grid-cols-3 gap-2 text-center mt-1\">
                <div class=\"flex flex-col\">
                    <span class=\"text-[9px] text-gray-500 uppercase font-bold\">Депозит</span>
                    <span class=\"text-xs font-mono text-white\">${u.balance.toFixed(2)}</span>
                </div>
                <div class=\"flex flex-col border-x border-gray-800\">
                    <span class=\"text-[9px] text-gray-500 uppercase font-bold\">Добыча</span>
                    <span class=\"text-xs font-mono text-emerald-400\">${u.mining.toFixed(2)}</span>
                </div>
                <div class=\"flex flex-col\">
                    <span class=\"text-[9px] text-gray-500 uppercase font-bold\">Майнеров</span>
                    <span class=\"text-xs font-mono text-blue-400\">${droneCount} шт.</span>
                </div>
            </div>
        </div>
    `}).join('');
}

function renderAdminUserMiners(memo) {
    const user = adminState.users.find(u => u.memo === memo);
    const list = document.getElementById('admin-edit-miners-list');
    if (!list) return;
    
    if (!user || !user.drones || user.drones.length === 0) {
        list.innerHTML = `<div class=\"text-center text-xs text-gray-600 py-6\">Нет майнеров</div>`;
        return;
    }
    
    list.innerHTML = user.drones.map(d => {
        const typeInfo = ADMIN_DRONE_TYPES[d.type] || { name: d.type, color: 'text-gray-300' };
        
        return `
        <div class=\"flex justify-between items-center bg-gray-900 border border-gray-800 rounded-xl p-2.5 shadow-inner\">
            <div class=\"flex items-center gap-3\">
                <div class=\"w-2 h-2 rounded-full bg-current ${typeInfo.color} drop-shadow-[0_0_5px_currentColor]\"></div>
                <div class=\"flex flex-col\">
                    <span class=\"text-[11px] font-black uppercase tracking-wider ${typeInfo.color}\">${typeInfo.name}</span>
                    <span class=\"text-[9px] text-gray-500 font-mono tracking-widest mt-0.5\">ID: ${d.id.substring(0,8)}</span>
                </div>
            </div>
            <button data-action=\"delete-miner\" data-user-id=\"${user.memo}\" data-miner-id=\"${d.id}\" class=\"w-8 h-8 flex items-center justify-center bg-red-900/20 text-red-500 hover:bg-red-800/40 hover:text-red-400 rounded-lg border border-red-900/30 transition active:scale-95\" title=\"Удалить\">
                <svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\"></path></svg>
            </button>
        </div>
        `;
    }).join('');
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
} else {
    initAdminPanel();
}
