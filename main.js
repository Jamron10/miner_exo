// Constants & Configuration
const DRONES = {
    FREE: { 
        id: 'FREE', nameKey: 'app.rarity_free', rateDay: 0.004, maxDays: null, maxMined: null,
        color: 'text-gray-400', bg: 'bg-gray-800/40', solidBg: 'bg-gray-700', border: 'border-gray-600',
        imageSvg: `<svg class="w-full h-full p-2 drop-shadow-lg" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" rx="5" fill="#374151" stroke="#9ca3af" stroke-width="2"/>
            <circle cx="50" cy="50" r="20" fill="#1f2937" stroke="#4b5563" stroke-width="2"/>
            <path d="M50 30 L50 70 M30 50 L70 50 M35 35 L65 65 M35 65 L65 35" stroke="#9ca3af" stroke-width="2" class="animate-[spin_10s_linear_infinite] origin-center" style="transform-origin: 50px 50px;"/>
        </svg>`
    },
    COMMON: { 
        id: 'COMMON', nameKey: 'app.rarity_common', rateDay: 0.050, maxDays: 30, maxMined: 1.50,
        color: 'text-green-400', bg: 'bg-green-900/20', solidBg: 'bg-green-600', border: 'border-green-500/50',
        imageSvg: `<svg class="w-full h-full p-2 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" viewBox="0 0 100 100">
            <rect x="25" y="15" width="50" height="70" rx="4" fill="#14532d" stroke="#4ade80" stroke-width="2"/>
            <rect x="35" y="25" width="30" height="10" fill="#166534" stroke="#22c55e" stroke-width="1"/>
            <circle cx="50" cy="60" r="16" fill="#064e3b" stroke="#4ade80" stroke-width="2"/>
            <path d="M50 44 L50 76 M34 60 L66 60" stroke="#4ade80" stroke-width="3" class="animate-[spin_3s_linear_infinite] origin-center" style="transform-origin: 50px 60px;"/>
        </svg>`
    },
    UNCOMMON: { 
        id: 'UNCOMMON', nameKey: 'app.rarity_uncommon', rateDay: 0.057, maxDays: 28, maxMined: 1.60,
        color: 'text-blue-400', bg: 'bg-blue-900/20', solidBg: 'bg-blue-600', border: 'border-blue-500/50',
        imageSvg: `<svg class="w-full h-full p-2 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]" viewBox="0 0 100 100">
            <rect x="20" y="10" width="60" height="80" rx="6" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
            <circle cx="50" cy="35" r="14" fill="#172554" stroke="#3b82f6" stroke-width="2"/>
            <path d="M50 21 L50 49 M36 35 L64 35" stroke="#60a5fa" stroke-width="3" class="animate-[spin_2s_linear_infinite] origin-center" style="transform-origin: 50px 35px;"/>
            <circle cx="50" cy="65" r="14" fill="#172554" stroke="#3b82f6" stroke-width="2"/>
            <path d="M50 51 L50 79 M36 65 L64 65" stroke="#60a5fa" stroke-width="3" class="animate-[spin_2s_linear_infinite] origin-center" style="transform-origin: 50px 65px;"/>
            <rect x="40" y="80" width="20" height="15" fill="#3b82f6" class="animate-pulse"/>
        </svg>`
    },
    RARE: { 
        id: 'RARE', nameKey: 'app.rarity_rare', rateDay: 0.068, maxDays: 25, maxMined: 1.70,
        color: 'text-purple-400', bg: 'bg-purple-900/20', solidBg: 'bg-purple-600', border: 'border-purple-500/50',
        imageSvg: `<svg class="w-full h-full p-1 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]" viewBox="0 0 100 100">
            <defs>
                <linearGradient id="rareGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#c084fc"/>
                    <stop offset="100%" stop-color="#6b21a8"/>
                </linearGradient>
            </defs>
            <polygon points="50,10 80,30 80,70 50,90 20,70 20,30" fill="#4c1d95" stroke="#a855f7" stroke-width="2"/>
            <polygon points="50,20 70,35 70,65 50,80 30,65 30,35" fill="none" stroke="#d8b4fe" stroke-width="1"/>
            <circle cx="50" cy="50" r="12" fill="url(#rareGrad)" class="animate-pulse"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="#e9d5ff" stroke-width="2" stroke-dasharray="10 5" class="animate-[spin_4s_linear_infinite] origin-center" style="transform-origin: 50px 50px;"/>
        </svg>`
    },
    EPIC: { 
        id: 'EPIC', nameKey: 'app.rarity_epic', rateDay: 0.082, maxDays: 22, maxMined: 1.80,
        color: 'text-pink-400', bg: 'bg-pink-900/20', solidBg: 'bg-pink-600', border: 'border-pink-500/50',
        imageSvg: `<svg class="w-full h-full p-1 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="epicGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#f472b6" stop-opacity="1"/>
                    <stop offset="100%" stop-color="#831843" stop-opacity="0.2"/>
                </radialGradient>
            </defs>
            <rect x="30" y="30" width="40" height="40" rx="8" fill="#831843" stroke="#f472b6" stroke-width="2" transform="rotate(45 50 50)"/>
            <circle cx="50" cy="50" r="25" fill="url(#epicGlow)"/>
            <path d="M50,25 L50,15 M50,75 L50,85 M25,50 L15,50 M75,50 L85,50" stroke="#fbcfe8" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="10" fill="#fdf2f8" class="animate-ping" style="animation-duration: 2s; transform-origin: 50px 50px;"/>
            <circle cx="50" cy="50" r="6" fill="#fbcfe8"/>
        </svg>`
    },
    LEGENDARY: { 
        id: 'LEGENDARY', nameKey: 'app.rarity_legendary', rateDay: 0.100, maxDays: 20, maxMined: 2.00,
        color: 'text-yellow-400', bg: 'bg-yellow-900/20', solidBg: 'bg-yellow-600', border: 'border-yellow-500/50',
        imageSvg: `<svg class="w-full h-full drop-shadow-[0_0_20px_rgba(250,204,21,1)]" viewBox="0 0 100 100">
            <defs>
                <radialGradient id="legGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#fef08a" stop-opacity="1"/>
                    <stop offset="100%" stop-color="#713f12" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <polygon points="50,5 90,50 50,95 10,50" fill="url(#legGlow)" opacity="0.5"/>
            <polygon points="50,15 80,50 50,85 20,50" fill="none" stroke="#facc15" stroke-width="2"/>
            <path d="M 50 25 A 25 10 0 1 1 49.9 25" fill="none" stroke="#fef08a" stroke-width="2" class="animate-[spin_3s_linear_infinite] origin-center" style="transform-origin: 50px 50px;"/>
            <path d="M 50 25 A 10 25 0 1 1 49.9 25" fill="none" stroke="#eab308" stroke-width="3" class="animate-[spin_4s_linear_infinite_reverse] origin-center" style="transform-origin: 50px 50px;"/>
            <circle cx="50" cy="50" r="12" fill="#fef08a" class="animate-pulse"/>
            <circle cx="50" cy="50" r="6" fill="#fff"/>
        </svg>`
    }
};

// Calculate per-second rates for the engine
Object.keys(DRONES).forEach(k => {
    DRONES[k].rate = DRONES[k].rateDay / 86400;
});

const PACKS = [
    { 
        id: 'starter', nameKey: 'app.pack_starter', price: 1.00, chances: { COMMON: 82, UNCOMMON: 14, RARE: 3, EPIC: 1 }, color: 'from-gray-700 to-gray-600',
        imageSvg: `<svg viewBox="0 0 100 100" class="w-full h-full p-2 drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]">
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="#374151" stroke="#9ca3af" stroke-width="2"/>
            <polygon points="50,20 80,35 50,50 20,35" fill="#4b5563"/>
            <polygon points="20,35 50,50 50,80 20,65" fill="#1f2937"/>
            <path d="M50,50 L50,80 M20,35 L50,50 M80,35 L50,50" stroke="#9ca3af" stroke-width="2"/>
            <circle cx="50" cy="35" r="8" fill="#3b82f6" class="animate-pulse"/>
        </svg>`
    },
    { 
        id: 'advanced', nameKey: 'app.pack_advanced', price: 1.10, chances: { COMMON: 28, UNCOMMON: 37, RARE: 24, EPIC: 9, LEGENDARY: 2 }, color: 'from-blue-700 to-indigo-600',
        imageSvg: `<svg viewBox="0 0 100 100" class="w-full h-full p-2 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">
            <rect x="30" y="20" width="40" height="60" rx="8" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
            <rect x="25" y="30" width="50" height="10" fill="#172554" stroke="#3b82f6" stroke-width="2"/>
            <rect x="25" y="60" width="50" height="10" fill="#172554" stroke="#3b82f6" stroke-width="2"/>
            <circle cx="50" cy="50" r="10" fill="#3b82f6" stroke="#bfdbfe" stroke-width="2"/>
            <path d="M50,40 L50,60 M40,50 L60,50" stroke="#bfdbfe" stroke-width="2" class="animate-[spin_4s_linear_infinite] origin-center" style="transform-origin: 50px 50px;"/>
        </svg>`
    },
    { 
        id: 'elite', nameKey: 'app.pack_elite', price: 1.25, chances: { COMMON: 6, UNCOMMON: 18, RARE: 34, EPIC: 32, LEGENDARY: 10 }, color: 'from-purple-700 to-pink-600',
        imageSvg: `<svg viewBox="0 0 100 100" class="w-full h-full p-1 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">
            <polygon points="50,15 85,50 50,85 15,50" fill="#701a75" stroke="#e879f9" stroke-width="2"/>
            <polygon points="50,15 85,50 50,50" fill="#86198f"/>
            <polygon points="50,15 15,50 50,50" fill="#4a044e"/>
            <circle cx="50" cy="50" r="12" fill="#facc15" stroke="#fef08a" stroke-width="2" class="animate-pulse"/>
            <circle cx="50" cy="50" r="4" fill="#fff"/>
            <path d="M 50 25 A 25 10 0 1 1 49.9 25" fill="none" stroke="#e879f9" stroke-width="1.5" stroke-dasharray="4 4" class="animate-[spin_3s_linear_infinite] origin-center" style="transform-origin: 50px 50px;"/>
        </svg>`
    }
];

// App State
let state = {
    balance: 0.0, // Deposit balance
    miningBalance: 0.0, // Withdrawable/Convertible balance
    unclaimed: 0.0,
    currencyVersion: 1, // 1 = USDT
    lastUpdate: Date.now(),
    lastAirdropTime: 0,
    drones: [],
    hasClaimedFreeDrone: false,
    memo: Math.floor(Math.random() * 9000000000) + 1000000000,
    history: { deposits: [], withdrawals: [], conversions: [] },
    referrals: { invitedBy: null, level1Count: 0, level2Count: 0, totalProfit: 0 } // Подготовлено для Mongoose
};

let animationFrameId;
let isInitialized = false;
let scene, camera, renderer, planet, orbitsGroup;
let orbitDrones = [];
let currentHangarFilter = 'FREE'; // Active tab in hangar

// DOM Elements
const els = {
    headerBalance: document.getElementById('header-balance'),
    headerMining: document.getElementById('header-mining'),
    miningCounter: document.getElementById('mining-counter'),
    rateSec: document.getElementById('rate-sec'),
    rateMin: document.getElementById('rate-min'),
    rateHour: document.getElementById('rate-hour'),
    rateDay: document.getElementById('rate-day'),
    btnClaim: document.getElementById('btn-claim'),
    navItems: document.querySelectorAll('.nav-item'),
    views: document.querySelectorAll('.view-section'),
    hangarList: document.getElementById('hangar-list'),
    hangarEmpty: document.getElementById('hangar-empty'),
    hangarCount: document.getElementById('hangar-count'),
    shopList: document.getElementById('shop-list'),
    modalOverlay: document.getElementById('modal-overlay'),
    starfield: document.getElementById('starfield'),
    btnLang: document.getElementById('btn-lang'),
    langDropdown: document.getElementById('lang-dropdown'),
    // Wallet Elements
    walletDepositBalance: document.getElementById('wallet-deposit-balance'),
    walletWithdrawBalance: document.getElementById('wallet-withdraw-balance'),
    walletConvertBalance: document.getElementById('wallet-convert-balance'),
    depositMemo: document.getElementById('deposit-memo')
};

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
    initTelegramUser();
    setupAudio();
    createStarfield();
    setupLanguageSwitcher();
    await loadState();
    setupNavigation();
    setupWallet();
    setupReferrals();
    updateNavIndicators();
    renderShop();
    renderHangar();
    updateRatesDisplay();
    initAirdrop();
    
    initThreeJS();
    renderOrbits();
    
    els.btnClaim.addEventListener('click', claimTokens);
    
    if (state.lastUpdate > Date.now()) state.lastUpdate = Date.now();
    
    lastFrameTime = Date.now();
    gameLoop();
    
    setInterval(() => {
        saveState();
        renderHangar();
    }, 10000);
    
    isInitialized = true;
});

// Toast Utility
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'bg-gray-800 text-white px-4 py-3 rounded-xl shadow-lg border border-gray-700 text-sm font-bold tracking-wide transition-all duration-300 opacity-0 translate-y-[-10px] text-center w-max max-w-[90vw] z-[200] relative';
    toast.textContent = message;
    
    const container = document.getElementById('toast-container');
    if(!container) return;
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.remove('opacity-0', 'translate-y-[-10px]');
        toast.classList.add('opacity-100', 'translate-y-0');
    });
    
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-[-10px]');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Utility: Generate UUID
function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Background effect
function createStarfield() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    els.starfield.appendChild(canvas);

    const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
    }));

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

// Storage
async function loadState() {
    try {
        const raw = await miniappsAI.storage.getItem('exoMinerState');
        if (raw) {
            const parsed = JSON.parse(raw);
            
            state.balance = parsed.balance || 0;
            state.miningBalance = parsed.miningBalance || 0;
            state.unclaimed = parsed.unclaimed || 0;
            state.currencyVersion = parsed.currencyVersion || 1;
            state.lastUpdate = parsed.lastUpdate || Date.now();
            state.lastAirdropTime = parsed.lastAirdropTime || 0;
            
            // Migrate drones
            state.drones = parsed.drones || state.drones;
            state.drones.forEach(d => {
                if (!d.acquiredAt) {
                    d.acquiredAt = Date.now() - (Math.random() * 30 * 24 * 3600 * 1000);
                }
                if (d.minedAmount === undefined) {
                    d.minedAmount = 0;
                }
            });
            
            if (parsed.hasClaimedFreeDrone !== undefined) {
                state.hasClaimedFreeDrone = parsed.hasClaimedFreeDrone;
            } else {
                state.hasClaimedFreeDrone = state.drones.length > 0;
            }
            
            state.memo = parsed.memo || Math.floor(Math.random() * 9000000000) + 1000000000;
            state.history = parsed.history || { deposits: [], withdrawals: [], conversions: [] };
            
            // FETCH FROM BACKEND
            try {
                const res = await fetch(`${BACKEND_URL}/api/user/${state.memo}`);
                if (res.ok) {
                    const data = await res.json();
                    state.balance = data.depositBalance !== undefined ? data.depositBalance : state.balance;
                    state.miningBalance = data.miningBalance !== undefined ? data.miningBalance : state.miningBalance;
                    if (data.drones && data.drones.length > 0) state.drones = data.drones;
                    
                    if (!state.referrals) state.referrals = {};
                    state.referrals.invitedBy = data.referrerTgId;
                    state.referrals.level1Count = data.referralsLvl1Count || 0;
                    state.referrals.level2Count = data.referralsLvl2Count || 0;
                    state.referrals.totalProfit = data.referralProfit || 0;
                }
            } catch(e) { console.error("Backend fetch error:", e); }
            
            // Calculate offline earnings (max 24 hours)
            const now = Date.now();
            const timeDiff = Math.min(now - state.lastUpdate, 24 * 60 * 60 * 1000);
            if (timeDiff > 0) {
                const dt = timeDiff / 1000;
                let activeRateSec = 0;
                
                state.drones.forEach(d => {
                    const stats = DRONES[d.type];
                    if (!stats) return;
                    let isActive = true;
                    if (stats.maxDays) {
                        const daysActive = (now - d.acquiredAt) / 86400000;
                        if (daysActive >= stats.maxDays) isActive = false;
                    }
                    if (stats.maxMined && (d.minedAmount || 0) >= stats.maxMined) {
                        isActive = false;
                    }
                    if (isActive) {
                        const minedNow = stats.rate * dt;
                        d.minedAmount = (d.minedAmount || 0) + minedNow;
                        activeRateSec += stats.rate;
                    }
                });
                state.unclaimed += dt * activeRateSec;
            }
            state.lastUpdate = now;
        }
        updateBalancesUI();
    } catch (e) {
        console.error("Failed to load state", e);
    }
}

const BACKEND_URL = 'https://miner-exo.onrender.com';

// --- ИНТЕГРАЦИЯ С БЭКЕНДОМ (MongoDB / Mongoose) ---
async function syncStateWithBackend(currentState) {
    if (!currentState.memo) return;
    try {
        await fetch(`${BACKEND_URL}/api/user/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tgId: currentState.memo,
                miningBalance: currentState.miningBalance,
                depositBalance: currentState.balance,
                drones: currentState.drones,
                username: document.getElementById('tg-username')?.textContent?.replace('@', '') || '',
                firstName: document.getElementById('tg-name')?.textContent || 'Guest'
            })
        });
    } catch(e) {
        console.error("Backend sync error:", e);
    }
}

async function saveState() {
    if (!isInitialized) return;
    try {
        await miniappsAI.storage.setItem('exoMinerState', JSON.stringify(state));
        syncStateWithBackend(state);
    } catch (e) {
        console.error("Failed to save state", e);
    }
}

// Telegram User Init
function initTelegramUser() {
    let user = null;
    
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        user = window.Telegram.WebApp.initDataUnsafe.user;
    } else {
        try {
            let tgWebAppData = new URLSearchParams(window.location.hash.slice(1)).get('tgWebAppData') || 
                               new URLSearchParams(window.location.search).get('tgWebAppData');
            if (tgWebAppData) {
                const userStr = new URLSearchParams(tgWebAppData).get('user');
                if (userStr) user = JSON.parse(userStr);
            }
        } catch (e) {
            console.error('Failed to parse TG data', e);
        }
    }
    
    const avatarEl = document.getElementById('tg-avatar');
    const nameEl = document.getElementById('tg-name');
    const usernameEl = document.getElementById('tg-username');
    
    if (user) {
        if (user.photo_url && avatarEl) avatarEl.src = user.photo_url;
        if (nameEl) nameEl.textContent = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        if (usernameEl) {
            usernameEl.textContent = '@' + (user.username || user.id);
        }
        if (user.id) {
            state.memo = user.id.toString();
            if (els.depositMemo) els.depositMemo.textContent = state.memo;
        }
    }
}

// Audio System
class SpaceAmbientEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.ambientGain = null;
        this.isPlaying = false;
        this.nodes = [];
        this.pingTimer = null;
    }
    
    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.5;
    }
    
    start() {
        if (this.isPlaying) return;
        this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this.isPlaying = true;
        
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.value = 0;
        this.ambientGain.connect(this.masterGain);
        this.ambientGain.gain.setTargetAtTime(1, this.ctx.currentTime, 2.0);
        
        // Deep Space Reverb/Delay Network
        const delay1 = this.ctx.createDelay(5.0);
        delay1.delayTime.value = 0.83;
        const delayFeedback = this.ctx.createGain();
        delayFeedback.gain.value = 0.6;
        
        const delayFilter = this.ctx.createBiquadFilter();
        delayFilter.type = 'lowpass';
        delayFilter.frequency.value = 800; // Muffled space reflections
        
        delay1.connect(delayFilter);
        delayFilter.connect(delayFeedback);
        delayFeedback.connect(delay1);
        delay1.connect(this.ambientGain);
        
        // 1. Sub Bass Drone (C2 = 65.41 Hz)
        const subOsc = this.ctx.createOscillator();
        subOsc.type = 'sine';
        subOsc.frequency.value = 65.41;
        const subGain = this.ctx.createGain();
        subGain.gain.value = 0.6;
        subOsc.connect(subGain);
        subGain.connect(this.ambientGain);
        subOsc.start();
        this.nodes.push(subOsc);
        
        // 2. Evolving Dark Pad (Blade Runner style)
        const padOsc1 = this.ctx.createOscillator();
        padOsc1.type = 'sawtooth';
        padOsc1.frequency.value = 65.41; 
        padOsc1.detune.value = 6;
        
        const padOsc2 = this.ctx.createOscillator();
        padOsc2.type = 'sawtooth';
        padOsc2.frequency.value = 98.00; // G2
        padOsc2.detune.value = -6;
        
        const padFilter = this.ctx.createBiquadFilter();
        padFilter.type = 'lowpass';
        padFilter.frequency.value = 150; 
        padFilter.Q.value = 1.5;
        
        const padLFO = this.ctx.createOscillator();
        padLFO.type = 'sine';
        padLFO.frequency.value = 0.05; // 20 sec sweep
        const padLFOGain = this.ctx.createGain();
        padLFOGain.gain.value = 250; 
        padLFO.connect(padLFOGain);
        padLFOGain.connect(padFilter.frequency);
        
        const padGain = this.ctx.createGain();
        padGain.gain.value = 0.15;
        
        padOsc1.connect(padFilter);
        padOsc2.connect(padFilter);
        padFilter.connect(padGain);
        padGain.connect(this.ambientGain);
        padGain.connect(delay1); // Send to delay
        
        padOsc1.start(); padOsc2.start(); padLFO.start();
        this.nodes.push(padOsc1, padOsc2, padLFO);
        
        // 3. Ethereal High Chords (EVE/Stellaris vibe)
        const chordFreqs = [155.56, 196.00, 233.08]; // Eb3, G3, Bb3
        chordFreqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            const oscGain = this.ctx.createGain();
            oscGain.gain.value = 0.025;
            
            const lfo = this.ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 0.02 + (idx * 0.005); 
            const lfoGain = this.ctx.createGain();
            lfoGain.gain.value = 0.025; 
            
            lfo.connect(lfoGain);
            lfoGain.connect(oscGain.gain);
            
            osc.connect(oscGain);
            oscGain.connect(delay1); 
            oscGain.connect(this.ambientGain);
            
            osc.start(); lfo.start();
            this.nodes.push(osc, lfo);
        });
        
        // 4. Random Spatial Pings
        this.pingTimer = setInterval(() => {
            if(!this.isPlaying) return;
            const pingOsc = this.ctx.createOscillator();
            pingOsc.type = 'sine';
            const notes = [523.25, 622.25, 698.46, 783.99, 932.33]; // C5, Eb5, F5, G5, Bb5
            pingOsc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
            
            const pGain = this.ctx.createGain();
            pGain.gain.setValueAtTime(0, this.ctx.currentTime);
            pGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.5); 
            pGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4.0); 
            
            pingOsc.connect(pGain);
            pGain.connect(delay1); 
            
            pingOsc.start();
            pingOsc.stop(this.ctx.currentTime + 4.5);
        }, 12000 + Math.random() * 8000);
    }
    
    stop() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        clearInterval(this.pingTimer);
        
        if (this.ambientGain) {
            this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 1.0);
            setTimeout(() => {
                this.nodes.forEach(n => {
                    try { n.stop(); } catch(e){}
                    try { n.disconnect(); } catch(e){}
                });
                this.nodes = [];
                if(this.ambientGain) {
                    this.ambientGain.disconnect();
                    this.ambientGain = null;
                }
            }, 3000);
        }
    }
    
    setVolume(val) {
        if (!this.ctx) this.init();
        this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
        if (val > 0 && !this.isPlaying) {
            this.start();
        } else if (val === 0 && this.isPlaying) {
            this.stop();
        }
    }
}

const ambient = new SpaceAmbientEngine();

function setupAudio() {
    const btnVolume = document.getElementById('btn-volume');
    const volumeDropdown = document.getElementById('volume-dropdown');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.getElementById('volume-value');
    
    if (!btnVolume) return;
    
    btnVolume.addEventListener('click', (e) => {
        e.stopPropagation();
        volumeDropdown.classList.toggle('hidden');
        volumeDropdown.classList.toggle('flex');
        
        // Try to start on interaction
        if (!ambient.isPlaying && parseInt(volumeSlider.value) > 0) {
            ambient.start();
        }
    });
    
    document.addEventListener('click', () => {
        if(volumeDropdown) {
            volumeDropdown.classList.add('hidden');
            volumeDropdown.classList.remove('flex');
        }
    });
    
    volumeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        volumeValue.textContent = val + '%';
        ambient.setVolume(val / 100);
    });
    
    volumeSlider.addEventListener('change', (e) => {
        const val = parseInt(e.target.value);
        miniappsAI.storage.setItem('exoMinerVolume', (val / 100).toString());
    });
    
    miniappsAI.storage.getItem('exoMinerVolume').then(val => {
        if (val !== null) {
            const vol = parseFloat(val);
            volumeSlider.value = vol * 100;
            volumeValue.textContent = Math.round(vol * 100) + '%';
            
            // Wait for user interaction to set actual audio volume
            const startAudio = () => {
                ambient.init();
                ambient.setVolume(vol);
                if(vol > 0) ambient.start();
                document.removeEventListener('click', startAudio);
            };
            document.addEventListener('click', startAudio);
        } else {
            const startAudio = () => {
                if(parseInt(volumeSlider.value) > 0) ambient.start();
                document.removeEventListener('click', startAudio);
            };
            document.addEventListener('click', startAudio);
        }
    });
}

// Core Logic
function getTotalMiningRate() {
    let ratePerDay = 0;
    const now = Date.now();
    state.drones.forEach(d => {
        const stats = DRONES[d.type];
        if (!stats) return;
        
        let isActive = true;
        if (stats.maxDays) {
            const daysActive = (now - d.acquiredAt) / 86400000;
            if (daysActive >= stats.maxDays) isActive = false;
        }
        if (stats.maxMined && (d.minedAmount || 0) >= stats.maxMined) {
            isActive = false;
        }
        
        if (isActive) {
            ratePerDay += stats.rateDay;
        }
    });
    return ratePerDay / 86400; // Returns rate per second
}

let lastFrameTime = 0;
function gameLoop() {
    const now = Date.now();
    const dt = (now - lastFrameTime) / 1000;
    lastFrameTime = now;
    
    if (dt > 0 && dt < 1) { // Prevent huge jumps
        let activeRateSec = 0;
        state.drones.forEach(d => {
            const stats = DRONES[d.type];
            if (!stats) return;
            
            let isActive = true;
            if (stats.maxDays) {
                const daysActive = (now - d.acquiredAt) / 86400000;
                if (daysActive >= stats.maxDays) isActive = false;
            }
            if (stats.maxMined && (d.minedAmount || 0) >= stats.maxMined) {
                isActive = false;
            }
            
            if (isActive) {
                const minedNow = stats.rate * dt;
                d.minedAmount = (d.minedAmount || 0) + minedNow;
                activeRateSec += stats.rate;
            }
        });

        state.unclaimed += activeRateSec * dt;
        state.lastUpdate = now;
        
        els.miningCounter.textContent = state.unclaimed.toFixed(6);
    } else if (dt >= 1) {
        state.lastUpdate = now;
    }
    
    if (window.THREE && scene && camera && renderer) {
        if (planet) {
            planet.rotation.y += 0.001;
        }
        
        orbitDrones.forEach(d => {
            d.angle += d.speed;
            d.mesh.position.x = Math.cos(d.angle) * d.radius;
            d.mesh.position.z = Math.sin(d.angle) * d.radius;
            d.mesh.rotation.x += 0.05;
            d.mesh.rotation.y += 0.05;
        });
        
        renderer.render(scene, camera);
    }
    
    animationFrameId = requestAnimationFrame(gameLoop);
}

function claimTokens() {
    if (state.unclaimed < 0.0001) return;
    
    els.btnClaim.classList.add('scale-95', 'opacity-80');
    setTimeout(() => els.btnClaim.classList.remove('scale-95', 'opacity-80'), 150);
    
    state.miningBalance += state.unclaimed;
    state.unclaimed = 0;
    updateBalancesUI();
    saveState();
}

function updateBalancesUI() {
    const depFormatted = state.balance.toFixed(4);
    const minFormatted = state.miningBalance.toFixed(4);
    
    if(els.headerBalance) els.headerBalance.textContent = depFormatted;
    if(els.headerMining) els.headerMining.textContent = minFormatted;
    
    if(els.walletDepositBalance) els.walletDepositBalance.textContent = depFormatted;
    if(els.walletWithdrawBalance) els.walletWithdrawBalance.textContent = minFormatted;
    if(els.walletConvertBalance) els.walletConvertBalance.textContent = minFormatted;
}

function updateRatesDisplay() {
    const rateSec = getTotalMiningRate();
    if(els.rateSec) els.rateSec.textContent = rateSec.toFixed(6);
    if(els.rateMin) els.rateMin.textContent = (rateSec * 60).toFixed(5);
    if(els.rateHour) els.rateHour.textContent = (rateSec * 3600).toFixed(4);
    if(els.rateDay) els.rateDay.textContent = (rateSec * 86400).toFixed(4);
}

function initAirdrop() {
    const btnAirdrop = document.getElementById('btn-airdrop');
    if (!btnAirdrop) return;
    
    btnAirdrop.addEventListener('click', () => {
        const now = Date.now();
        const lastTime = state.lastAirdropTime || 0;
        if (now - lastTime < 3600000) {
            showToast('Airdrop пока недоступен');
            return;
        }
        
        const adModal = document.getElementById('modal-ad');
        if (adModal) {
            adModal.classList.remove('hidden');
            adModal.classList.add('flex');
            setTimeout(() => adModal.classList.add('opacity-100'), 10);
            
            let timeLeft = 3;
            const timerEl = document.getElementById('ad-timer');
            if(timerEl) timerEl.textContent = timeLeft;
            
            const interval = setInterval(() => {
                timeLeft--;
                if(timerEl) timerEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    adModal.classList.remove('opacity-100');
                    setTimeout(() => {
                        adModal.classList.add('hidden');
                        adModal.classList.remove('flex');
                    }, 300);
                    
                    state.lastAirdropTime = Date.now();
                    state.miningBalance += 0.001;
                    saveState();
                    updateBalancesUI();
                    updateAirdropUI();
                    showToast('+0.001 USDT');
                }
            }, 1000);
        }
    });
    updateAirdropUI();
}

function updateAirdropUI() {
    const statusEl = document.getElementById('airdrop-status');
    const actionEl = document.getElementById('airdrop-action');
    const btnAirdrop = document.getElementById('btn-airdrop');
    if (!statusEl || !actionEl || !btnAirdrop) return;

    const checkTime = () => {
        const now = Date.now();
        const lastTime = state.lastAirdropTime || 0;
        const diff = 3600000 - (now - lastTime);
        
        if (diff <= 0) {
            statusEl.textContent = window.miniappI18n.t('app.airdrop_desc') || 'Смотреть рекламу (0.001 USDT)';
            actionEl.textContent = window.miniappI18n.t('app.airdrop_btn') || 'Смотреть';
            actionEl.className = 'bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shrink-0 transition-colors duration-300';
            btnAirdrop.style.opacity = '1';
            btnAirdrop.style.pointerEvents = 'auto';
        } else {
            const min = Math.floor(diff / 60000);
            const sec = Math.floor((diff % 60000) / 1000);
            statusEl.textContent = `Ожидание: ${min}м ${sec}с`;
            actionEl.textContent = 'Ждать';
            actionEl.className = 'bg-gray-700 text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shrink-0 transition-colors duration-300';
            btnAirdrop.style.opacity = '0.7';
            btnAirdrop.style.pointerEvents = 'none';
        }
    };
    checkTime();
    setInterval(checkTime, 1000);
}

// Wallet & History Logic
function renderWalletHistory() {
    ['deposits', 'withdrawals', 'conversions'].forEach(type => {
        const container = document.getElementById(`history-${type}`);
        if(!container) return;
        
        const items = state.history[type] || [];
        if(items.length === 0) {
            container.innerHTML = `<div class="text-center text-sm text-gray-600 py-4">${window.miniappI18n.t('app.history_empty') || 'История пуста'}</div>`;
            return;
        }
        
        container.innerHTML = items.sort((a,b)=>b.date-a.date).map(item => {
            const date = new Date(item.date).toLocaleString();
            let statusColor = item.status === 'pending' ? 'text-yellow-400' : 'text-emerald-400';
            let statusText = item.status === 'pending' ? 'В обработке' : 'Успешно';
            
            let addressHtml = '';
            if (type === 'withdrawals' && item.address) {
                 addressHtml = `<div class="text-[9px] text-gray-500 font-mono mt-1 truncate max-w-[150px]">${item.address}</div>`;
            }

            return `<div class="bg-gray-900/60 backdrop-blur-md border border-gray-800/80 rounded-2xl p-4 flex justify-between items-center shadow-lg hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 group animate-slide-up-fade" style="animation-fill-mode: both;">
                <div class="flex flex-col relative z-10">
                    <div class="flex items-center gap-2 mb-0.5">
                        <div class="w-2 h-2 rounded-full ${item.status === 'pending' ? 'bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'}"></div>
                        <span class="text-white font-mono font-bold text-lg drop-shadow-sm leading-none">${item.amount.toFixed(4)} <span class="text-[10px] text-gray-500 ml-0.5"><div class="relative w-4 h-4 inline-block align-middle ml-1.5 shrink-0"><div class="w-full h-full rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_5px_rgba(16,185,129,0.3)]"><svg class="w-2.5 h-2.5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#26A17B"/><path d="M22.9248 18.0673H28.4348V13.8223H11.5648V18.0673H17.0748V31.6443H22.9248V18.0673Z" fill="white"/><path d="M20 23.3773C25.4638 23.3773 29.8938 22.0673 29.8938 20.4523C29.8938 18.8373 25.4638 17.5273 20 17.5273C14.5362 17.5273 10.1062 18.8373 10.1062 20.4523C10.1062 22.0673 14.5362 23.3773 20 23.3773Z" stroke="white" stroke-width="2"/></svg></div><div class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-gray-900 border-[0.5px] border-gray-800 flex items-center justify-center z-20 shadow-[0_0_3px_rgba(0,152,234,0.5)]"><svg class="w-full h-full" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0098EA"/><path d="M18.8453 8.4H9.15461C8.30396 8.4 7.77884 9.37128 8.22055 10.096L13.0659 18.0494C13.4359 18.6568 14.5641 18.6568 14.9341 18.0494L19.7794 10.096C20.2211 9.37128 19.696 8.4 18.8453 8.4Z" fill="white"/><path d="M14 16.5161L9.62341 9.42944H18.3766L14 16.5161Z" fill="#0098EA"/></svg></div></div></span></span>
                    </div>
                    <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest ml-4">${date}</span>
                    ${addressHtml ? `<div class="ml-4 mt-1">${addressHtml}</div>` : ''}
                </div>
                <div class="flex items-center gap-2 relative z-10">
                    <span class="text-[10px] font-black uppercase tracking-wider ${statusColor} bg-gray-950/50 px-2.5 py-1.5 rounded-lg border border-gray-800/50 shadow-inner">${statusText}</span>
                </div>
            </div>`;
        }).join('');
    });
}

function setupWallet() {
    // Tabs
    document.querySelectorAll('.wallet-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.currentTarget.dataset.tab;
            
            document.querySelectorAll('.wallet-tab-btn').forEach(b => {
                b.classList.remove('active', 'text-white', 'bg-gradient-to-r', 'from-blue-600', 'to-blue-500', 'shadow-[0_0_15px_rgba(37,99,235,0.4)]');
                b.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-800/50');
            });
            
            e.currentTarget.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-gray-800/50');
            e.currentTarget.classList.add('active', 'text-white', 'bg-gradient-to-r', 'from-blue-600', 'to-blue-500', 'shadow-[0_0_15px_rgba(37,99,235,0.4)]');
            
            document.querySelectorAll('.wallet-tab-content').forEach(c => {
                c.classList.remove('block');
                c.classList.add('hidden');
            });
            const targetContent = document.getElementById(`wallet-tab-${tab}`);
            if(targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('block');
            }
        });
    });

    // Copy actions
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            const text = document.getElementById(targetId).textContent;
            navigator.clipboard.writeText(text).then(() => {
                showToast(window.miniappI18n.t('app.copied') || 'Скопировано!');
            });
        });
    });

    // Secret Dev Trigger for Deposits
    const devTrigger = document.getElementById('dev-deposit-trigger');
    if (devTrigger) {
        let clickCount = 0;
        let clickTimer = null;
        devTrigger.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            if (clickCount >= 3) {
                state.balance += 10;
                state.history.deposits.push({ date: Date.now(), amount: 10, status: 'success' });
                saveState();
                updateBalancesUI();
                renderWalletHistory();
                showToast('+10 USDT+TON (Тестовое пополнение)');
                clickCount = 0;
            } else {
                clickTimer = setTimeout(() => { clickCount = 0; }, 500);
            }
        });
    }

    // Memo setup
    if(els.depositMemo) {
        els.depositMemo.textContent = state.memo;
    }

    // Deposit Submit
    const btnDepositSubmit = document.getElementById('btn-deposit-submit');
    if (btnDepositSubmit) {
        btnDepositSubmit.addEventListener('click', async () => {
            const input = document.getElementById('deposit-amount-input');
            const amount = parseFloat(input.value);
            if (isNaN(amount) || amount <= 0) {
                showToast(window.miniappI18n.t('app.invalid_amount') || 'Некорректная сумма');
                return;
            }
            
            const depositId = generateId();
            const btn = document.getElementById('btn-deposit-submit');
            if (btn) btn.disabled = true;
            
            try {
                const res = await fetch(`${BACKEND_URL}/api/user/deposit_request`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tgId: state.memo, amount, memo: state.memo })
                });
                if (res.ok) {
                    state.history.deposits.push({ id: depositId, date: Date.now(), amount, status: 'pending' });
                    input.value = '';
                    saveState();
                    renderWalletHistory();
                    showToast(window.miniappI18n.t('app.deposit_created') || 'Заявка отправлена. Ожидайте зачисления.');
                } else {
                    showToast('Ошибка при создании заявки');
                }
            } catch(e) {
                showToast('Ошибка сети');
            }
            if (btn) btn.disabled = false;
        });
    }

    // Withdraw MAX
    const btnWithdrawMax = document.getElementById('btn-withdraw-max');
    if(btnWithdrawMax) {
        btnWithdrawMax.addEventListener('click', () => {
            document.getElementById('withdraw-amount').value = state.miningBalance.toFixed(4);
        });
    }

    // Withdraw Submit
    const btnWithdrawSubmit = document.getElementById('btn-withdraw-submit');
    if(btnWithdrawSubmit) {
        btnWithdrawSubmit.addEventListener('click', async () => {
            const addressInput = document.getElementById('withdraw-wallet-address-input');
            const address = addressInput ? addressInput.value.trim() : '';
            if (!address || address.length < 10) {
                showToast(window.miniappI18n.t('app.enter_wallet_address') || 'Введите адрес кошелька');
                return;
            }

            const input = document.getElementById('withdraw-amount');
            const amount = parseFloat(input.value);
            if (isNaN(amount) || amount <= 0 || amount > state.miningBalance) {
                showToast(window.miniappI18n.t('app.invalid_amount') || 'Некорректная сумма');
                return;
            }
            const btn = document.getElementById('btn-withdraw-submit');
            if (btn) btn.disabled = true;
            
            try {
                const res = await fetch(`${BACKEND_URL}/api/user/withdraw`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tgId: state.memo, amount, address })
                });
                
                if (res.ok) {
                    state.miningBalance -= amount;
                    state.history.withdrawals.push({ date: Date.now(), amount, address, status: 'pending' });
                    input.value = '';
                    if (addressInput) addressInput.value = '';
                    saveState();
                    updateBalancesUI();
                    renderWalletHistory();
                    showToast(window.miniappI18n.t('app.withdraw_created') || 'Заявка на вывод создана');
                } else {
                    const err = await res.json();
                    showToast(err.error || 'Ошибка вывода');
                }
            } catch(e) {
                showToast('Ошибка сети');
            }
            if (btn) btn.disabled = false;
        });
    }

    // Convert ALL
    const btnConvertAll = document.getElementById('btn-convert-all');
    if(btnConvertAll) {
        btnConvertAll.addEventListener('click', () => {
            document.getElementById('convert-amount').value = state.miningBalance.toFixed(4);
        });
    }

    // Convert Submit
    const btnConvertSubmit = document.getElementById('btn-convert-submit');
    if(btnConvertSubmit) {
        btnConvertSubmit.addEventListener('click', async () => {
            const input = document.getElementById('convert-amount');
            const amount = parseFloat(input.value);
            if (isNaN(amount) || amount <= 0 || amount > state.miningBalance) {
                showToast('Некорректная сумма');
                return;
            }
            const btn = document.getElementById('btn-convert-submit');
            if (btn) btn.disabled = true;
            
            try {
                const res = await fetch(`${BACKEND_URL}/api/user/convert`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tgId: state.memo, amount })
                });
                
                if (res.ok) {
                    state.miningBalance -= amount;
                    state.balance += amount; 
                    state.history.conversions.push({ date: Date.now(), amount, status: 'success' });
                    input.value = '';
                    saveState();
                    updateBalancesUI();
                    renderWalletHistory();
                    showToast('Успешно конвертировано');
                } else {
                    showToast('Ошибка при конвертации');
                }
            } catch(e) {
                showToast('Ошибка сети');
            }
            if (btn) btn.disabled = false;
        });
    }

    renderWalletHistory();

}

// Referrals
function renderReferrals() {
    const lvl1 = document.getElementById('ref-lvl1-count');
    const lvl2 = document.getElementById('ref-lvl2-count');
    const profit = document.getElementById('ref-total-profit');
    
    if (lvl1) lvl1.textContent = state.referrals.level1Count || 0;
    if (lvl2) lvl2.textContent = state.referrals.level2Count || 0;
    if (profit) profit.innerHTML = `${(state.referrals.totalProfit || 0).toFixed(4)} <span class="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 shadow-inner"><div class="relative w-6 h-6 inline-block align-middle ml-1 shrink-0"><div class="w-full h-full rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_5px_rgba(16,185,129,0.3)]"><svg class="w-3.5 h-3.5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#26A17B"/><path d="M22.9248 18.0673H28.4348V13.8223H11.5648V18.0673H17.0748V31.6443H22.9248V18.0673Z" fill="white"/><path d="M20 23.3773C25.4638 23.3773 29.8938 22.0673 29.8938 20.4523C29.8938 18.8373 25.4638 17.5273 20 17.5273C14.5362 17.5273 10.1062 18.8373 10.1062 20.4523C10.1062 22.0673 14.5362 23.3773 20 23.3773Z" stroke="white" stroke-width="2"/></svg></div><div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gray-900 border-[1px] border-gray-800 flex items-center justify-center z-20 shadow-[0_0_3px_rgba(0,152,234,0.5)]"><svg class="w-full h-full" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0098EA"/><path d="M18.8453 8.4H9.15461C8.30396 8.4 7.77884 9.37128 8.22055 10.096L13.0659 18.0494C13.4359 18.6568 14.5641 18.6568 14.9341 18.0494L19.7794 10.096C20.2211 9.37128 19.696 8.4 18.8453 8.4Z" fill="white"/><path d="M14 16.5161L9.62341 9.42944H18.3766L14 16.5161Z" fill="#0098EA"/></svg></div></div></span>`;
}

function setupReferrals() {
    renderReferrals();
    
    const updateRefLink = () => {
        const refLink = `https://t.me/TON_USDT_Miner_Bot?start=${state.memo}`;
        const refDisplay = document.getElementById('ref-link-display');
        if (refDisplay) refDisplay.textContent = refLink;
        return refLink;
    };
    
    updateRefLink();

    const btnCopy = document.getElementById('btn-ref-copy');
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const link = updateRefLink();
            navigator.clipboard.writeText(link).then(() => {
                showToast(window.miniappI18n.t('app.copied') || 'Скопировано!');
            });
        });
    }

    const btnShare = document.getElementById('btn-ref-share');
    if (btnShare) {
        btnShare.addEventListener('click', () => {
            const link = updateRefLink();
            const text = window.miniappI18n.t('app.ref_share_text') || 'Присоединяйся и майни USDT!';
            const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
            
            if (window.Telegram?.WebApp?.openTelegramLink) {
                window.Telegram.WebApp.openTelegramLink(shareUrl);
            } else {
                window.open(shareUrl, '_blank');
            }
        });
    }

    // Tabs
    document.querySelectorAll('.ref-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.ref-tab-btn').forEach(b => {
                b.classList.remove('active', 'text-white', 'bg-gradient-to-r', 'from-indigo-600', 'to-purple-500', 'shadow-[0_0_15px_rgba(99,102,241,0.4)]');
                b.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-gray-800/50');
            });
            
            e.currentTarget.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-gray-800/50');
            e.currentTarget.classList.add('active', 'text-white', 'bg-gradient-to-r', 'from-indigo-600', 'to-purple-500', 'shadow-[0_0_15px_rgba(99,102,241,0.4)]');
            
            const list = document.getElementById('ref-list');
            if (list) {
                list.innerHTML = `<span class="text-sm text-gray-500">${window.miniappI18n.t('app.no_referrals_yet') || 'Пока нет рефералов'}</span>`;
            }
        });
    });
}

// Language
function setupLanguageSwitcher() {
    if (!window.miniappI18n || !els.btnLang) return;
    
    (async () => {
        try {
            const storedLang = await miniappsAI.storage.getItem('exoMinerLang');
            const targetLang = storedLang || 'ru';
            await window.miniappI18n.setLocale(targetLang);
            els.btnLang.textContent = targetLang.toUpperCase();
        } catch(e) {}
    })();

    els.btnLang.addEventListener('click', (e) => {
        e.stopPropagation();
        els.langDropdown.classList.toggle('hidden');
        els.langDropdown.classList.toggle('flex');
    });

    document.addEventListener('click', () => {
        els.langDropdown.classList.add('hidden');
        els.langDropdown.classList.remove('flex');
    });

    els.langDropdown.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const lang = e.currentTarget.getAttribute('data-lang');
            try {
                await window.miniappI18n.setLocale(lang);
                els.btnLang.textContent = lang.toUpperCase();
                await miniappsAI.storage.setItem('exoMinerLang', lang);
                renderHangar();
                renderShop();
                renderWalletHistory();
            } catch(err) {
                console.error("Failed to change locale", err);
            }
        });
    });
}

// Navigation
function setupNavigation() {
    els.navItems.forEach(item => {
        item.addEventListener('click', () => {
            els.navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            const targetId = item.getAttribute('data-target');
            els.views.forEach(v => {
                v.classList.remove('active');
                if (v.id === targetId) v.classList.add('active');
            });
        });
    });
}

// Hangar View
function renderHangar() {
    const freeCaseContainer = document.getElementById('free-case-container');
    if (freeCaseContainer) {
        if (!state.hasClaimedFreeDrone) {
            freeCaseContainer.classList.remove('hidden');
            freeCaseContainer.innerHTML = `
                <div class="bg-gradient-to-r from-emerald-900/60 to-emerald-800/30 border border-emerald-500/50 rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)] group cursor-pointer" id="btn-claim-free-box">
                    <div class="absolute inset-0 bg-emerald-400/5 animate-pulse"></div>
                    <div class="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
                    
                    <div class="w-20 h-20 shrink-0 bg-emerald-950/80 rounded-2xl flex items-center justify-center border border-emerald-400/40 relative z-10 shadow-inner group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                        <svg viewBox="0 0 100 100" class="w-full h-full p-2 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">
                            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
                            <polygon points="50,20 80,35 50,50 20,35" fill="#065f46"/>
                            <polygon points="20,35 50,50 50,80 20,65" fill="#022c22"/>
                            <path d="M50,50 L50,80 M20,35 L50,50 M80,35 L50,50" stroke="#34d399" stroke-width="2"/>
                            <circle cx="50" cy="35" r="8" fill="#10b981" class="animate-pulse"/>
                        </svg>
                    </div>
                    
                    <div class="flex-1 relative z-10 pr-2">
                        <h3 class="text-xl font-black text-emerald-400 mb-1 drop-shadow-md tracking-wide" data-i18n="app.free_case_title">${window.miniappI18n.t('app.free_case_title') || 'Бесплатный кейс'}</h3>
                        <p class="text-[11px] text-emerald-100/80 leading-snug mb-3 font-medium" data-i18n="app.free_case_desc">${window.miniappI18n.t('app.free_case_desc') || 'Заберите первого дрона и начните майнить USDT бесплатно.'}</p>
                        
                        <button class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black py-2.5 rounded-xl shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all transform group-active:scale-95 text-xs uppercase tracking-widest border border-emerald-400/50">
                            ${window.miniappI18n.t('app.claim_free') || 'Получить'}
                        </button>
                    </div>
                </div>
            `;
            document.getElementById('btn-claim-free-box').onclick = claimFreeDrone;
        } else {
            freeCaseContainer.classList.add('hidden');
            freeCaseContainer.innerHTML = '';
        }
    }

    const filtersContainer = document.getElementById('hangar-filters');
    if(filtersContainer) {
        filtersContainer.innerHTML = '';
        
        const filters = ['FREE', 'COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];
        
        filters.forEach(f => {
            const btn = document.createElement('button');
            const isSelected = currentHangarFilter === f;
            
            const def = DRONES[f];
            let name = window.miniappI18n.t(def.nameKey);
            const count = state.drones.filter(d => d.type === f).length;
            
            let baseClass = 'px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 border relative overflow-hidden group shrink-0 ';
            if (isSelected) {
                baseClass += `text-white ${def.solidBg} border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-[1.03]`;
            } else {
                baseClass += `bg-gray-900/60 text-gray-500 border-gray-800 hover:text-gray-300 hover:bg-gray-800 hover:border-gray-700`;
            }
            
            btn.className = baseClass;
            
            const glowHtml = isSelected ? `<div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>` : '';
            
            btn.innerHTML = `${glowHtml}<span class="relative z-10 flex items-center gap-2">${name} <span class="${isSelected ? 'bg-black/30 text-white' : 'bg-gray-800 text-gray-400'} px-1.5 py-0.5 rounded-md text-[9px]">${count}</span></span>`;
            btn.onclick = () => {
                currentHangarFilter = f;
                renderHangar();
            };
            
            filtersContainer.appendChild(btn);
        });
    }

    els.hangarList.innerHTML = '';
    els.hangarCount.textContent = state.drones.length;
    
    const filteredDrones = state.drones.filter(d => d.type === currentHangarFilter);

    if (filteredDrones.length === 0) {
        els.hangarEmpty.classList.remove('hidden');
        els.hangarEmpty.classList.add('flex');
        els.hangarEmpty.querySelector('p').textContent = window.miniappI18n.t('app.hangar_empty_filter') || 'В этой категории нет майнеров.';
    } else {
        els.hangarEmpty.classList.add('hidden');
        els.hangarEmpty.classList.remove('flex');
        
        const def = DRONES[currentHangarFilter];
        const now = Date.now();
        
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 gap-5 pb-4';
        
        filteredDrones.sort((a, b) => b.acquiredAt - a.acquiredAt);
        
        filteredDrones.forEach(droneData => {
            const name = window.miniappI18n.t(def.nameKey);
            
            const daysActive = (now - droneData.acquiredAt) / 86400000;
            let isStopped = false;
            let daysLeft = '∞';
            let wearPercent = 0;
            
            if (def.maxDays) {
                daysLeft = Math.max(0, def.maxDays - daysActive);
                wearPercent = (daysActive / def.maxDays) * 100;
                if (daysActive >= def.maxDays) isStopped = true;
            }
            
            const mined = droneData.minedAmount || 0;
            const maxMined = def.maxMined ? def.maxMined : null;
            if (maxMined && mined >= maxMined) {
                isStopped = true;
                wearPercent = 100;
            }
            
            const statusText = isStopped ? (window.miniappI18n.t('app.drone_status_stopped') || 'Остановлен') : (window.miniappI18n.t('app.drone_status_mining') || 'Работает');
            const statusColor = isStopped ? 'text-red-400' : 'text-emerald-400';
            const pulseClass = isStopped ? '' : 'animate-pulse';
            const bgDot = isStopped ? 'bg-red-500' : 'bg-emerald-400';
            const wearBarColor = isStopped ? 'bg-red-500' : `bg-${def.solidBg.split('-')[1]}-500`;
            const shadowColor = def.solidBg.split('-')[1];
            
            const el = document.createElement('div');
            el.className = `relative w-full rounded-[28px] p-[1.5px] bg-gradient-to-b from-gray-700 to-gray-950 ${isStopped ? 'opacity-70 grayscale-[30%]' : ''} card-hover-fx overflow-hidden group shadow-xl`;
            
            const glowBorder = isStopped ? 'from-red-900/50' : `from-${shadowColor}-500/50`;
            const ratePeriodStr = window.miniappI18n.t('app.mining_rate_day') || 'день';
            
            el.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-b ${glowBorder} to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div class="relative w-full h-full bg-gray-900/95 backdrop-blur-2xl rounded-[26px] p-5 border border-black/50 overflow-hidden">
                    
                    <div class="absolute -top-10 -right-10 w-32 h-32 bg-${shadowColor}-500/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 16px 16px;"></div>

                    <div class="flex justify-between items-center mb-5 relative z-10">
                        <div class="flex items-center gap-2">
                            <div class="px-3 py-1.5 rounded-lg ${def.bg} border ${def.border} shadow-inner flex items-center gap-2">
                                <div class="w-1.5 h-1.5 rounded-full ${def.solidBg} ${pulseClass}"></div>
                                <span class="text-[9px] uppercase font-black tracking-widest ${def.color} drop-shadow-md">${name}</span>
                            </div>
                        </div>
                        <div class="flex flex-col items-end">
                            <div class="flex items-center gap-1.5">
                                <span class="text-white font-mono font-black text-xl leading-none tracking-tight">+${def.rateDay.toFixed(3)}</span>
                            </div>
                            <span class="text-[9px] text-gray-500 uppercase font-bold tracking-widest mt-1"><div class="relative w-3.5 h-3.5 inline-block align-middle shrink-0 mr-1"><div class="w-full h-full rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_5px_rgba(16,185,129,0.3)]"><svg class="w-2 h-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#26A17B"/><path d="M22.9248 18.0673H28.4348V13.8223H11.5648V18.0673H17.0748V31.6443H22.9248V18.0673Z" fill="white"/><path d="M20 23.3773C25.4638 23.3773 29.8938 22.0673 29.8938 20.4523C29.8938 18.8373 25.4638 17.5273 20 17.5273C14.5362 17.5273 10.1062 18.8373 10.1062 20.4523C10.1062 22.0673 14.5362 23.3773 20 23.3773Z" stroke="white" stroke-width="2"/></svg></div><div class="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-gray-900 border-[0.5px] border-gray-800 flex items-center justify-center z-20 shadow-[0_0_3px_rgba(0,152,234,0.5)]"><svg class="w-full h-full" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0098EA"/><path d="M18.8453 8.4H9.15461C8.30396 8.4 7.77884 9.37128 8.22055 10.096L13.0659 18.0494C13.4359 18.6568 14.5641 18.6568 14.9341 18.0494L19.7794 10.096C20.2211 9.37128 19.696 8.4 18.8453 8.4Z" fill="white"/><path d="M14 16.5161L9.62341 9.42944H18.3766L14 16.5161Z" fill="#0098EA"/></svg></div></div> / ${ratePeriodStr}</span>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 items-center relative z-10">
                        <div class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-[20px] bg-gradient-to-br from-gray-800 to-gray-950 border border-gray-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center p-3 relative group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 opacity-20 ${def.solidBg} mix-blend-screen rounded-[20px]"></div>
                            ${def.imageSvg}
                        </div>
                        
                        <div class="flex-1 min-w-0 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-3 bg-gray-950/60 w-fit px-3 py-1.5 rounded-lg border border-gray-800 shadow-inner">
                                <span class="relative flex h-2.5 w-2.5">
                                  ${!isStopped ? `<span class="animate-ping absolute inline-flex h-full w-full rounded-full ${bgDot} opacity-75"></span>` : ''}
                                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 ${bgDot}"></span>
                                </span>
                                <span class="text-[10px] font-black uppercase tracking-wider ${statusColor}">${statusText}</span>
                            </div>
                            
                            <div class="w-full">
                                <div class="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-2">
                                    <span class="text-gray-500">${window.miniappI18n.t('app.hangar_lifespan') || 'Срок работы'}</span>
                                    <span class="${isStopped ? 'text-red-400' : 'text-gray-300'} font-mono">${daysLeft === '∞' ? '∞' : typeof daysLeft === 'number' ? daysLeft.toFixed(1) + ' дн.' : daysLeft}</span>
                                </div>
                                <div class="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-2">
                                    <span class="text-gray-500">${window.miniappI18n.t('app.hangar_mined') || 'Добыто'}</span>
                                    <span class="${isStopped ? 'text-red-400' : 'text-blue-400'} font-mono">${mined.toFixed(4)} ${maxMined ? '/ ' + maxMined : ''}</span>
                                </div>
                                <div class="h-2.5 w-full bg-gray-950 rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-gray-800/80 relative">
                                    <div class="h-full ${wearBarColor} rounded-full transition-all duration-1000 relative overflow-hidden" style="width: ${Math.min(100, wearPercent)}%">
                                        ${!isStopped ? '<div class="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12"></div>' : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(el);
        });
        
        els.hangarList.appendChild(grid);
    }
}

function updateNavIndicators() {
    const hangarTab = document.querySelector('.nav-item[data-target="view-hangar"]');
    if(!hangarTab) return;
    
    if (!state.hasClaimedFreeDrone) {
        if(!hangarTab.querySelector('.free-badge')) {
            const badge = document.createElement('div');
            badge.className = 'free-badge absolute top-1.5 right-3 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] border-[1.5px] border-gray-900 z-10';
            hangarTab.appendChild(badge);
        }
    } else {
        const badge = hangarTab.querySelector('.free-badge');
        if(badge) badge.remove();
    }
}

function claimFreeDrone() {
    state.hasClaimedFreeDrone = true;
    const newDrone = { id: generateId(), type: 'FREE', acquiredAt: Date.now(), minedAmount: 0 };
    state.drones.push(newDrone);
    
    saveState();
    updateRatesDisplay();
    renderHangar();
    renderOrbits();
    updateNavIndicators();
    
    const freePack = {
        id: 'free_pack',
        nameKey: 'app.free_case_title',
        color: 'from-emerald-700 to-emerald-500',
        imageSvg: `<svg viewBox="0 0 100 100" class="w-full h-full p-2 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]">
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="#064e3b" stroke="#34d399" stroke-width="2"/>
            <polygon points="50,20 80,35 50,50 20,35" fill="#065f46"/>
            <polygon points="20,35 50,50 50,80 20,65" fill="#022c22"/>
            <path d="M50,50 L50,80 M20,35 L50,50 M80,35 L50,50" stroke="#34d399" stroke-width="2"/>
            <circle cx="50" cy="35" r="8" fill="#10b981" class="animate-pulse"/>
        </svg>`
    };
    
    showUnboxingModal(freePack, 'FREE');
}

// Shop View & Gacha
function renderShop() {
    els.shopList.innerHTML = '';
    
    PACKS.forEach(pack => {
        const name = window.miniappI18n.t(pack.nameKey);
        
        let segmentsHtml = '';
        let legendHtml = '';
        
        for (const [type, chance] of Object.entries(pack.chances)) {
            const def = DRONES[type];
            segmentsHtml += `<div class="${def.solidBg} h-full border-r border-gray-900/50 last:border-0" style="width: ${chance}%"></div>`;
            
            legendHtml += `<div class="flex items-center gap-1 min-w-[30%]">
                <span class="w-2 h-2 rounded-full ${def.solidBg} shadow-inner"></span>
                <span class="${def.color} font-bold tracking-wide">${window.miniappI18n.t(def.nameKey)} <span class="text-gray-300 font-mono ml-0.5">${chance}%</span></span>
            </div>`;
        }
        
        const el = document.createElement('div');
        el.className = `relative bg-gray-900 rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl flex group transition duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-4`;
        el.innerHTML = `
            <div class="flex-1 p-4 flex flex-col justify-center relative z-10">
                <div class="absolute inset-0 bg-gradient-to-br ${pack.color} opacity-10 pointer-events-none"></div>
                
                <div class="flex items-center gap-4 mb-3">
                    <div class="w-16 h-16 rounded-2xl bg-gray-950 flex-shrink-0 border border-gray-700/50 flex items-center justify-center shadow-inner relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br ${pack.color} opacity-20"></div>
                        ${pack.imageSvg}
                    </div>
                    
                    <div>
                        <h3 class="font-black text-xl text-white drop-shadow-md leading-tight">${name}</h3>
                        <div class="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1 inline-block border-b border-gray-700/50 pb-0.5" data-i18n="app.chance">${window.miniappI18n.t('app.chance') || 'Шансы выпадения'}</div>
                    </div>
                </div>
                
                <div class="w-full mt-1">
                    <div class="h-2 w-full bg-gray-950 rounded-full flex overflow-hidden border border-gray-700/80 mb-2.5 shadow-inner">
                        ${segmentsHtml}
                    </div>
                    <div class="flex flex-wrap gap-x-3 gap-y-1.5 text-[9px]">
                        ${legendHtml}
                    </div>
                </div>
            </div>

            <button class="btn-buy w-24 shrink-0 bg-gray-800/80 border-l border-gray-700/50 flex flex-col items-center justify-center p-2 transition-all hover:bg-gray-700 active:bg-gray-600 relative overflow-hidden cursor-pointer" data-pack="${pack.id}">
                <div class="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <span class="text-2xl font-black text-white mb-2 relative z-10 drop-shadow-md">${pack.price.toFixed(2)}</span>
                
                <div class="relative w-12 h-12 flex items-center justify-center relative z-10 mb-1">
                    <div class="w-10 h-10 rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] relative z-10">
                        <svg class="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#26A17B"/>
                          <path d="M22.9248 18.0673H28.4348V13.8223H11.5648V18.0673H17.0748V31.6443H22.9248V18.0673Z" fill="white"/>
                          <path d="M20 23.3773C25.4638 23.3773 29.8938 22.0673 29.8938 20.4523C29.8938 18.8373 25.4638 17.5273 20 17.5273C14.5362 17.5273 10.1062 18.8373 10.1062 20.4523C10.1062 22.0673 14.5362 23.3773 20 23.3773Z" stroke="white" stroke-width="2"/>
                        </svg>
                    </div>
                    
                    <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center z-20 shadow-[0_0_10px_rgba(0,152,234,0.5)]">
                        <svg class="w-full h-full" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z" fill="#0098EA"/>
                            <path d="M18.8453 8.4H9.15461C8.30396 8.4 7.77884 9.37128 8.22055 10.096L13.0659 18.0494C13.4359 18.6568 14.5641 18.6568 14.9341 18.0494L19.7794 10.096C20.2211 9.37128 19.696 8.4 18.8453 8.4Z" fill="white"/>
                            <path d="M14 16.5161L9.62341 9.42944H18.3766L14 16.5161Z" fill="#0098EA"/>
                        </svg>
                    </div>
                </div>
            </button>
        `;
        els.shopList.appendChild(el);
    });
    
    document.querySelectorAll('.btn-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const packId = e.currentTarget.getAttribute('data-pack');
            buyPack(packId);
        });
    });
}

function buyPack(packId) {
    const pack = PACKS.find(p => p.id === packId);
    if (!pack) return;
    
    claimTokens();
    
    if (state.balance < pack.price) {
        showToast('Недостаточно баланса депозита');
        if(els.headerBalance) {
            els.headerBalance.parentElement.parentElement.classList.add('animate-bounce');
            setTimeout(() => els.headerBalance.parentElement.parentElement.classList.remove('animate-bounce'), 1000);
        }
        return;
    }
    
    state.balance -= pack.price;
    updateBalancesUI();
    
    const roll = Math.random() * 100;
    let currentChance = 0;
    let wonType = 'COMMON';
    
    for (const [type, chance] of Object.entries(pack.chances)) {
        currentChance += chance;
        if (roll <= currentChance) {
            wonType = type;
            break;
        }
    }
    
    const newDrone = { id: generateId(), type: wonType, acquiredAt: Date.now(), minedAmount: 0 };
    state.drones.push(newDrone);
    
    saveState();
    updateRatesDisplay();
    renderHangar();
    renderOrbits();
    showUnboxingModal(pack, wonType);
}

function showUnboxingModal(pack, wonType) {
    const rays = document.getElementById('gacha-rays');
    if(rays) rays.classList.add('hidden');
    
    const modalContent = els.modalOverlay.querySelector('#modal-content');
    const packName = window.miniappI18n.t(pack.nameKey);
    
    modalContent.innerHTML = `
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pack.color}"></div>
        <h3 class="text-3xl font-black mb-2 text-white shadow-black drop-shadow-md">${packName}</h3>
        <p class="text-gray-400 mb-8 text-sm">${window.miniappI18n.t('app.case_ready') || 'Кейс готов к открытию'}</p>
        
        <div id="pack-container" class="w-48 h-48 mx-auto mb-10 relative transform transition-transform duration-300 animate-float cursor-pointer hover:scale-105 active:scale-95 group">
            <div class="absolute inset-0 bg-gradient-to-br ${pack.color} opacity-30 rounded-2xl blur-2xl transition-all duration-300 group-hover:opacity-50" id="pack-glow"></div>
            ${pack.imageSvg}
        </div>
        
        <button id="btn-open-case" class="w-full bg-gradient-to-r ${pack.color} text-white font-bold py-4 px-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-[0.98] transition uppercase tracking-wider text-lg">
            ${window.miniappI18n.t('app.open_case') || 'Открыть кейс'}
        </button>
        <button id="btn-close-modal" class="mt-4 text-gray-500 hover:text-white text-sm font-medium transition py-2 px-4">
            ${window.miniappI18n.t('app.close_case') || 'Закрыть (в ангар)'}
        </button>
    `;
    
    els.modalOverlay.classList.remove('hidden');
    els.modalOverlay.classList.add('flex');
    
    setTimeout(() => els.modalOverlay.classList.add('opacity-100'), 10);
    
    const btnOpen = document.getElementById('btn-open-case');
    const packContainer = document.getElementById('pack-container');
    const packGlow = document.getElementById('pack-glow');
    const btnClose = document.getElementById('btn-close-modal');
    
    const startOpening = () => {
        if(btnOpen.disabled) return;
        btnOpen.disabled = true;
        btnOpen.innerHTML = `<span class="animate-pulse">${window.miniappI18n.t('app.opening') || 'Открываем...'}</span>`;
        btnClose.classList.add('hidden');
        
        packContainer.classList.remove('animate-float', 'cursor-pointer', 'hover:scale-105', 'active:scale-95');
        packContainer.classList.add('animate-shake-intense', 'scale-[1.2]');
        packGlow.classList.remove('opacity-30', 'group-hover:opacity-50');
        packGlow.classList.add('opacity-100', 'blur-3xl', 'animate-pulse');
        
        setTimeout(() => {
            const flash = document.getElementById('modal-flash');
            if(flash) {
                flash.classList.remove('opacity-0');
                flash.classList.add('opacity-100');
            }
            
            setTimeout(() => {
                if(flash) {
                    flash.classList.remove('opacity-100');
                    flash.classList.add('opacity-0');
                }
                showGachaResult(wonType);
            }, 400); 
        }, 2200); 
    };
    
    btnOpen.onclick = startOpening;
    packContainer.onclick = startOpening;
    btnClose.onclick = closeModal;
}

function showGachaResult(type) {
    const def = DRONES[type];
    const name = window.miniappI18n.t(def.nameKey);
    const rays = document.getElementById('gacha-rays');
    if(rays) rays.classList.remove('hidden');
    
    const modalContent = els.modalOverlay.querySelector('#modal-content');
    
    modalContent.innerHTML = `
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        <h3 class="text-3xl font-black mb-1 text-white shadow-black drop-shadow-md">${window.miniappI18n.t('app.congratulations') || 'Поздравляем!'}</h3>
        <p class="text-gray-400 mb-6 text-sm">${window.miniappI18n.t('app.you_got') || 'Вы получили новый майнер!'}</p>
        
        <div class="w-64 py-10 px-4 rounded-[2rem] mb-8 flex flex-col items-center justify-center border-2 border-t-4 bg-gradient-to-b ${def.bg} ${def.border} shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden gacha-item">
            <div class="absolute inset-0 opacity-30 ${def.solidBg}"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10 pointer-events-none"></div>
            <div class="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);"></div>
            
            <div class="transform scale-[1.8] mb-10 relative z-10 drop-shadow-2xl hover:scale-[2] transition-transform duration-500">${def.imageSvg}</div>
            
            <div class="font-black text-3xl ${def.color} tracking-wide mt-2 shadow-black drop-shadow-lg relative z-10 text-center uppercase">${name}</div>
            
            <div class="text-sm font-mono text-white mt-4 bg-black/60 px-5 py-2.5 rounded-xl backdrop-blur-md border border-white/20 relative z-10 flex items-center gap-2 shadow-inner">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                +${def.rateDay.toFixed(3)} / ${window.miniappI18n.t('app.mining_rate_day') || 'день'}
            </div>
        </div>
        
        <button id="btn-collect" class="w-full bg-white text-gray-900 font-black py-4 px-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition text-lg uppercase tracking-widest">
            ${window.miniappI18n.t('app.collect') || 'Забрать'}
        </button>
    `;
    
    document.getElementById('btn-collect').onclick = closeModal;
}

function closeModal() {
    els.modalOverlay.classList.remove('opacity-100');
    setTimeout(() => {
        els.modalOverlay.classList.add('hidden');
        els.modalOverlay.classList.remove('flex');
    }, 300);
}

// Three.js Planet & Orbits System
function createProceduralPlanetTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(0.1, '#0f172a');
    grad.addColorStop(0.2, '#1e3a8a');
    grad.addColorStop(0.3, '#172554');
    grad.addColorStop(0.4, '#1d4ed8');
    grad.addColorStop(0.5, '#3b82f6');
    grad.addColorStop(0.6, '#1e40af');
    grad.addColorStop(0.7, '#0f172a');
    grad.addColorStop(0.8, '#1e3a8a');
    grad.addColorStop(0.9, '#020617');
    grad.addColorStop(1, '#000000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.filter = 'blur(4px)'; // Less blur makes the bump map look sharper and deeper
    for(let i=0; i<400; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 20 + 2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fill();
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
}

let planetContainer;
function initThreeJS() {
    const container = document.getElementById('planet-3d-container');
    if (!container || !window.THREE) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 280;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Enable shadows for real 3D depth
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(renderer.domElement);

    planetContainer = new THREE.Group();
    planetContainer.rotation.x = 0.4; // Tilted to show shadows better
    planetContainer.rotation.z = -0.2;
    scene.add(planetContainer);

    const geometry = new THREE.SphereGeometry(45, 64, 64);
    const texture = createProceduralPlanetTexture();
    
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        bumpMap: texture, // Uses the bands to create physical ridges
        bumpScale: 1.5,
        roughness: 0.8,
        metalness: 0.1,
    });
    
    planet = new THREE.Mesh(geometry, material);
    planet.castShadow = true;
    planet.receiveShadow = true;
    planetContainer.add(planet);
    
    const atmosGeometry = new THREE.SphereGeometry(46.5, 32, 32);
    const atmosMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    planet.add(atmosphere);

    const ringGroup = new THREE.Group();
    
    const ringGeo = new THREE.RingGeometry(80, 85, 64);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.castShadow = true;
    ring.receiveShadow = true;
    ringGroup.add(ring);

    planetContainer.add(ringGroup);

    // Darker ambient light makes shadows much more prominent
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Strong key light that casts shadows
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(80, 60, 50); // Angle chosen to cast long shadow of the rings onto the planet
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 300;
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.right = 100;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.bias = -0.002;
    scene.add(dirLight);
    
    // Subtle rim light from behind
    const backLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
    backLight.position.set(-100, -50, -100);
    scene.add(backLight);

    orbitsGroup = new THREE.Group();
    orbitsGroup.rotation.x = 0.4;
    orbitsGroup.rotation.z = -0.2;
    scene.add(orbitsGroup);

    window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function getHexColor(colorClass) {
    const colors = {
        'text-gray-400': 0x9ca3af,
        'text-green-400': 0x4ade80,
        'text-blue-400': 0x60a5fa,
        'text-purple-400': 0xc084fc,
        'text-pink-400': 0xf472b6,
        'text-yellow-400': 0xfacc15
    };
    return colors[colorClass] || 0xffffff;
}

function renderOrbits() {
    if (!window.THREE || !orbitsGroup) return;
    
    while(orbitsGroup.children.length > 0){ 
        orbitsGroup.remove(orbitsGroup.children[0]); 
    }
    orbitDrones = [];

    const now = Date.now();
    
    // Only show active drones in orbit
    const activeDrones = state.drones.filter(d => {
        const stats = DRONES[d.type];
        if (!stats) return false;
        if (stats.maxDays && (now - d.acquiredAt) / 86400000 >= stats.maxDays) return false;
        if (stats.maxMined && (d.minedAmount || 0) >= stats.maxMined) return false;
        return true;
    });
    
    const displayDrones = activeDrones.sort((a, b) => b.acquiredAt - a.acquiredAt).slice(0, 25);

    displayDrones.forEach((d) => {
        const def = DRONES[d.type];
        if (!def) return;
        
        const hash = d.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const radius = 110 + (hash % 60);
        const speed = (0.005 + (hash % 10) * 0.001) * (hash % 2 === 0 ? 1 : -1);
        const angleY = (hash % 360) * (Math.PI / 180);
        const angleZ = ((hash % 60) - 30) * (Math.PI / 180);
        
        const color = getHexColor(def.color);
        
        const ringGeo = new THREE.RingGeometry(radius, radius + 0.3, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        
        const ringPivot = new THREE.Group();
        ringPivot.rotation.y = angleY;
        ringPivot.rotation.z = angleZ;
        ringPivot.add(ring);
        orbitsGroup.add(ringPivot);
        
        const isHighTier = (def.id === 'EPIC' || def.id === 'LEGENDARY');
        const droneSize = isHighTier ? 3.5 : 2.5;
        const droneGeo = new THREE.OctahedronGeometry(droneSize);
        const droneMat = new THREE.MeshBasicMaterial({ color: color });
        const drone = new THREE.Mesh(droneGeo, droneMat);
        
        drone.castShadow = true; // Drones cast shadows too!
        
        const glowGeo = new THREE.OctahedronGeometry(droneSize * 1.5);
        const glowMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        drone.add(glow);
        
        ringPivot.add(drone);
        
        orbitDrones.push({
            mesh: drone,
            radius: radius,
            angle: hash % 360,
            speed: speed
        });
    });
}
