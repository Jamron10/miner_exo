
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// ==========================================
// ⚙️ НАСТРОЙКИ (Замените на свои данные)
// ==========================================
const MONGO_URI = "mongodb+srv://jamron:WV5nO1UIvofK01Nl@cluster0.ucx8kac.mongodb.net/?appName=Cluster0";
const BOT_TOKEN = "8307131916:AAE4tBL6kaRSG2GeuHihvBt9sBFdPPqku_c"; 
const WEB_APP_URL = "https://miner-exo.onrender.com"; // Например: https://t.me/ExoMinerBot/app
const ADMIN_LIST = ['5730406030', '7166133241'];



// ==========================================
// 1. ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ MONGODB
// ==========================================
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Успешно подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// --- Схема пользователя ---
const UserSchema = new mongoose.Schema({
  id: String, // Legacy field
  tgId: { type: String, required: true, unique: true },
  username: String,
  firstName: String,
  depositBalance: { type: Number, default: 0 },
  miningBalance: { type: Number, default: 0 },
  drones: { type: Array, default: [] }, // Купленные майнеры
  
  // Реферальная система
  referrerTgId: { type: String, default: null }, // Тот, кто пригласил (Уровень 1)
  referrerLvl2TgId: { type: String, default: null }, // Тот, кто пригласил пригласившего (Уровень 2)
  referralsLvl1Count: { type: Number, default: 0 }, // Количество прямых рефералов
  referralsLvl2Count: { type: Number, default: 0 }, // Количество рефералов второго уровня
  referralProfit: { type: Number, default: 0 }, // Сколько всего заработано с рефералов
  
  lastSync: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// --- Схема транзакций (Пополнения и Выводы) ---
const TransactionSchema = new mongoose.Schema({
    userId: String,
    type: String, // 'deposit' или 'withdraw'
    amount: Number,
    status: { type: String, default: 'pending' }, // 'pending' | 'approved' | 'rejected'
    address: String, // Кошелек для вывода
    memo: String, // Memo для пополнения
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

// --- Схема настроек проекта ---
const SettingsSchema = new mongoose.Schema({
    isMaintenance: { type: Boolean, default: false },
    depositsEnabled: { type: Boolean, default: true },
    withdrawsEnabled: { type: Boolean, default: true },
    depositAddress: { type: String, default: 'UQAZ4SVVMcdWdemuzKbU-hUe6oZ33Heg8xNzGmhl_J-XT54c' },
    refLvl1: { type: Number, default: 7 },
    refLvl2: { type: Number, default: 5 },
    rates: {\n        FREE: { type: Number, default: 0.004 },\n        COMMON: { type: Number, default: 0.050 },\n        UNCOMMON: { type: Number, default: 0.057 },\n        RARE: { type: Number, default: 0.068 },\n        EPIC: { type: Number, default: 0.082 },\n        LEGENDARY: { type: Number, default: 0.100 }\n    }
});
const Settings = mongoose.model('Settings', SettingsSchema);

// Инициализация настроек по умолчанию, если их нет
async function initSettings() {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            await new Settings().save();
            console.log('⚙️ Созданы настройки по умолчанию');
        }
    } catch (e) {
        console.error('Ошибка инициализации настроек:', e);
    }
}
initSettings();

// ==========================================
// 2. TELEGRAM БОТ (Обработка команды /start)
// ==========================================
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start(?: (.*))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const tgId = msg.from.id.toString();
    const username = msg.from.username || '';
    const firstName = msg.from.first_name || '';
    
    // Получаем реферальный ID
    const referrerId = match[1] || null;

    try {
        let user = await User.findOne({ tgId });

        // Если пользователя нет в базе — регистрируем его
        if (!user) {
            user = new User({ 
                id: tgId, // Заполняем legacy id тем же tgId, чтобы избежать ошибки E11000 duplicate key
                tgId, 
                username, 
                firstName, 
                depositBalance: 0, 
                miningBalance: 0, 
                drones: []
            });

            // Логика реферальной системы
            if (referrerId && referrerId !== tgId) {
                const referrer = await User.findOne({ tgId: referrerId });
                if (referrer) {
                    user.referrerTgId = referrerId;
                    referrer.referralsLvl1Count += 1;
                    await referrer.save();

                    if (referrer.referrerTgId) {
                        user.referrerLvl2TgId = referrer.referrerTgId;
                        const referrerLvl2 = await User.findOne({ tgId: referrer.referrerTgId });
                        if (referrerLvl2) {
                            referrerLvl2.referralsLvl2Count += 1;
                            await referrerLvl2.save();
                        }
                    }
                }
            }
            await user.save();
            console.log(`👤 Новый игрок зарегистрирован: ${tgId} (Реферал от: ${referrerId || 'никого'})`);
        }

        const text = `Привет, ${firstName}! 🚀\n\nДобро пожаловать в ExoMiner — симулятор добычи ресурсов.\n\nПокупай майнеры, добывай USDT и выводи прибыль. Приглашай друзей и получай 7% от их депозитов и 5% от депозитов их друзей!`;
        
        bot.sendMessage(chatId, text, {
            reply_markup: {
                inline_keyboard: [[
                    { text: '🎮 Играть', web_app: { url: WEB_APP_URL } }
                ]]
            }
        });

    } catch (error) {
        console.error('Ошибка при обработке /start:', error);
        bot.sendMessage(chatId, 'Произошла ошибка при запуске. Попробуйте позже.');
    }
});

// ==========================================
// 3. EXPRESS API СЕРВЕР (Для игры и Админки)
// ==========================================

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// Раздаем файлы визуального интерфейса (Фронтенд)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/main.js', (req, res) => res.sendFile(path.join(__dirname, 'main.js')));
app.get('/admin.js', (req, res) => res.sendFile(path.join(__dirname, 'admin.js')));;
app.get('/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'styles.css')));

// --- ЭНДПОИНТЫ ДЛЯ ИГРЫ ---

app.get('/api/user/:tgId', async (req, res) => {
  try {
    const user = await User.findOne({ tgId: req.params.tgId });
    if (!user) return res.status(404).json({ error: 'Игрок не найден' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post('/api/user/sync', async (req, res) => {
  try {
    const { tgId, miningBalance, depositBalance, drones, username, firstName } = req.body;
    // Включаем id: tgId в updateData для случаев создания нового пользователя при upsert,
    // чтобы не было ошибки E11000 null duplicate key
    const updateData = { 
        id: tgId, 
        miningBalance, 
        drones, 
        username, 
        firstName, 
        lastSync: Date.now() 
    };
    if (depositBalance !== undefined) updateData.depositBalance = depositBalance;
    
    const user = await User.findOneAndUpdate(
      { tgId },
      updateData,
      { new: true, upsert: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сохранения' });
  }
});

// Запрос на вывод средств
app.post('/api/user/withdraw', async (req, res) => {
    try {
        const { tgId, amount, address } = req.body;
        const user = await User.findOne({ tgId });
        if (!user || user.miningBalance < amount) return res.status(400).json({ error: 'Недостаточно средств' });

        user.miningBalance -= amount;
        await user.save();

        const tx = new Transaction({ userId: tgId, type: 'withdraw', amount, address, status: 'pending' });
        await tx.save();

        res.json({ success: true, tx });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка вывода' });
    }
});

// Запрос на пополнение (пользователь сообщает, что отправил)
app.post('/api/user/deposit_request', async (req, res) => {
    try {
        const { tgId, amount, memo } = req.body;
        const tx = new Transaction({ userId: tgId, type: 'deposit', amount, memo, status: 'pending' });
        await tx.save();
        res.json({ success: true, tx });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка пополнения' });
    }
});

// Конвертация (Майнинг -> Депозит)
app.post('/api/user/convert', async (req, res) => {
    try {
        const { tgId, amount } = req.body;
        const user = await User.findOne({ tgId });
        if (!user || user.miningBalance < amount) return res.status(400).json({ error: 'Недостаточно средств' });

        user.miningBalance -= amount;
        user.depositBalance += amount;
        await user.save();

        res.json({ success: true, user });
    } catch (e) {
        res.status(500).json({ error: 'Ошибка конвертации' });
    }
});

// --- ЭНДПОИНТЫ ДЛЯ НАСТРОЕК (ПУБЛИЧНЫЕ) ---

app.get('/api/settings', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.json(settings || new Settings());
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Middleware для проверки прав администратора
const isAdmin = (req, res, next) => {
    const tgId = req.headers['x-admin-tg-id'];
    if (!tgId || !ADMIN_LIST.includes(String(tgId))) {
        return res.status(403).json({ error: 'Access denied. You are not an admin.' });
    }
    next();
};

app.post('/api/admin/settings', isAdmin, async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) settings = new Settings();
        
        Object.assign(settings, req.body);
        await settings.save();
        
        res.json({ success: true, settings });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// --- ЭНДПОИНТЫ ДЛЯ АДМИНКИ ---

// Обнуление базы данных (опасно)
app.post('/api/admin/reset', isAdmin, async (req, res) => {
    try {
        await User.deleteMany({});
        await Transaction.deleteMany({});
        res.json({ success: true, message: 'Database reset' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Получить все данные для дашборда
app.get('/api/admin/data', isAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ lastSync: -1 });
        const pendingDeposits = await Transaction.find({ type: 'deposit', status: 'pending' });
        const pendingWithdraws = await Transaction.find({ type: 'withdraw', status: 'pending' });
        
        const totalDep = await Transaction.aggregate([{ $match: { type: 'deposit', status: 'approved' } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
        const totalWit = await Transaction.aggregate([{ $match: { type: 'withdraw', status: 'approved' } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
        
        let minersCount = 0;
        users.forEach(u => minersCount += (u.drones ? u.drones.length : 0));

        res.json({
            stats: {
                users: users.length,
                miners: minersCount,
                totalDeposits: totalDep.length ? totalDep[0].total : 0,
                totalWithdraws: totalWit.length ? totalWit[0].total : 0
            },
            users,
            pendingDeposits,
            pendingWithdraws
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Обработать транзакцию (Подтвердить / Отклонить)
app.post('/api/admin/transaction', isAdmin, async (req, res) => {
    try {
        const { id, action } = req.body; // action: 'approve' | 'reject'
        const tx = await Transaction.findById(id);
        if (!tx || tx.status !== 'pending') return res.status(400).json({ error: 'Транзакция не найдена или уже обработана' });

        tx.status = action === 'approve' ? 'approved' : 'rejected';
        await tx.save();

        if (action === 'approve' && tx.type === 'deposit') {
            const user = await User.findOne({ tgId: tx.userId });
            if (user) {
                user.depositBalance += tx.amount;
                await user.save();

                // Реферальные выплаты
                if (user.referrerTgId) {
                    const settings = await Settings.findOne() || new Settings();
                    const lvl1Bonus = parseFloat((tx.amount * (settings.refLvl1 / 100)).toFixed(4));
                    await User.updateOne(
                        { tgId: user.referrerTgId },
                        { $inc: { depositBalance: lvl1Bonus, referralProfit: lvl1Bonus } }
                    );
                }
                if (user.referrerLvl2TgId) {
                    const lvl2Bonus = parseFloat((tx.amount * (settings.refLvl2 / 100)).toFixed(4));
                    await User.updateOne(
                        { tgId: user.referrerLvl2TgId },
                        { $inc: { depositBalance: lvl2Bonus, referralProfit: lvl2Bonus } }
                    );
                }
            }
        }

        // Если отклонили вывод, возвращаем деньги на баланс
        if (action === 'reject' && tx.type === 'withdraw') {
            const user = await User.findOne({ tgId: tx.userId });
            if (user) {
                user.miningBalance += tx.amount;
                await user.save();
            }
        }

        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Редактировать пользователя (баланс, майнеры)
app.post('/api/admin/user', isAdmin, async (req, res) => {
    try {
        const { tgId, depositBalance, miningBalance, drones } = req.body;
        const user = await User.findOne({ tgId });
        if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

        if (depositBalance !== undefined) user.depositBalance = depositBalance;
        if (miningBalance !== undefined) user.miningBalance = miningBalance;
        if (drones !== undefined) user.drones = drones;

        await user.save();
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер API запущен на порту ${PORT}`);
  console.log(`🤖 Telegram-бот запущен и ожидает сообщений...`);
});
