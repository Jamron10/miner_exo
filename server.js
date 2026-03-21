const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

// ==========================================
// ⚙️ НАСТРОЙКИ (Замените на свои данные)
// ==========================================
const MONGO_URI = "mongodb+srv://jamron:Jamron5551111@cluster0.ucx8kac.mongodb.net/exominer?retryWrites=true&w=majority";
const BOT_TOKEN = "ВАШ_ТОКЕН_БОТА_ОТ_BOTFATHER"; 
const WEB_APP_URL = "ССЫЛКА_НА_ВАШ_МИНИАПП"; // Например: https://t.me/ExoMinerBot/app

// ==========================================
// 1. ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ MONGODB
// ==========================================
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Успешно подключено к MongoDB'))
  .catch(err => console.error('❌ Ошибка подключения к MongoDB:', err));

// --- Схема пользователя ---
const UserSchema = new mongoose.Schema({
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
                tgId, username, firstName, depositBalance: 0, miningBalance: 0, drones: []
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
app.use(express.json());
app.use(cors());

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
    const { tgId, miningBalance, drones, username, firstName } = req.body;
    const user = await User.findOneAndUpdate(
      { tgId },
      { miningBalance, drones, username, firstName, lastSync: Date.now() },
      { new: true }
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

// --- ЭНДПОИНТЫ ДЛЯ АДМИНКИ ---

// Получить все данные для дашборда
app.get('/api/admin/data', async (req, res) => {
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
app.post('/api/admin/transaction', async (req, res) => {
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
                    const lvl1Bonus = parseFloat((tx.amount * 0.07).toFixed(4));
                    await User.updateOne(
                        { tgId: user.referrerTgId },
                        { $inc: { depositBalance: lvl1Bonus, referralProfit: lvl1Bonus } }
                    );
                }
                if (user.referrerLvl2TgId) {
                    const lvl2Bonus = parseFloat((tx.amount * 0.05).toFixed(4));
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
app.post('/api/admin/user', async (req, res) => {
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
