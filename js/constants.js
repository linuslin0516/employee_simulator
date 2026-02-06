/**
 * 遊戲常數：職業定義、初始數值、通知訊息
 */
window.JOBS = {
  support: {
    id: 'support',
    name: '客服專員',
    emoji: '🎧',
    desc: '面對無數幣圈韭菜的靈魂拷問，從「我的BTC怎麼沒了」到「狗狗幣什麼時候上月球」，你都得微笑回答。',
    difficulty: '普通',
    diffColor: 'text-green-400',
    borderColor: '#0ECB81',
    accent: '#3b82f6',
    images: {
      happy: 'support-happy.png',
      normal: 'support-normal.png',
      stressed: 'support-stressed.png',
    },
  },
  trading: {
    id: 'trading',
    name: '交易監控員',
    emoji: '📊',
    desc: '盯著無數跳動的K線和異常交易警報，在鯨魚大戶和機器人之間尋找真正的問題。一個閃神就是幾百萬美金的失誤。',
    difficulty: '困難',
    diffColor: 'text-yellow-400',
    borderColor: '#F0B90B',
    accent: '#10b981',
    images: {
      happy: 'trading-happy.png',
      normal: 'trading-normal.png',
      stressed: 'trading-stressed.png',
    },
  },
  compliance: {
    id: 'compliance',
    name: '合規審查官',
    emoji: '⚖️',
    desc: '在各國監管機構、洗錢防制、KYC審查之間周旋。每個決定都可能讓公司上新聞頭條或收到天價罰單。',
    difficulty: '地獄',
    diffColor: 'text-red-400',
    borderColor: '#F6465D',
    accent: '#8b5cf6',
    images: {
      happy: 'compliance-happy.png',
      normal: 'compliance-normal.png',
      stressed: 'compliance-stressed.png',
    },
  },
};

window.INITIAL_STATS = {
  stress: 30,
  performance: 50,
  bossApproval: 50,
};

window.INITIAL_EMPLOYEE = {
  coffee: 3,         // 每天可用的咖啡次數（喝咖啡降壓力）
  salary: 3500,      // 月薪 (USDT)
  bnbBalance: 0.5,   // BNB 持倉
};

/**
 * Slack 風格的隨機通知訊息
 * 在每天結束時或事件間隙隨機顯示
 */
window.SLACK_NOTIFICATIONS = {
  support: [
    { from: '客服主管 Lily', msg: '今天的工單數量又破紀錄了，辛苦大家 💪', icon: '👩‍💼' },
    { from: 'Slack Bot', msg: '提醒：本週五有團隊 team building 🎉', icon: '🤖' },
    { from: '同事 Jason', msg: '那個 VIP 用戶又來了，這次他說要告我們 😱', icon: '😰' },
    { from: '#general', msg: 'CZ：大家好，我剛從杜拜回來 ✈️', icon: '💬' },
    { from: 'HR 部門', msg: '請記得填寫本月的自評表', icon: '📋' },
    { from: '同事 Amy', msg: '茶水間的咖啡機又壞了...', icon: '☕' },
    { from: '系統通知', msg: '工單系統將於今晚 2:00-4:00 進行維護', icon: '🔧' },
  ],
  trading: [
    { from: '風控系統', msg: '⚠️ BTC 過去 1 小時波動超過 5%', icon: '📉' },
    { from: '交易主管 Mike', msg: '注意關注 ETH/USDT 的異常掛單', icon: '👨‍💼' },
    { from: '#trading-alerts', msg: '有巨鯨剛在鏈上移動了 10,000 BTC', icon: '🐋' },
    { from: 'Slack Bot', msg: '提醒：本月 KPI review 在下週一', icon: '🤖' },
    { from: '同事 Kevin', msg: '你有看到那個新上的 memecoin 嗎 😂', icon: '🪙' },
    { from: '系統通知', msg: '監控面板已更新至 v3.2.1', icon: '🔧' },
    { from: '#general', msg: 'CEO 分享了一篇關於 DeFi 未來的文章', icon: '💬' },
  ],
  compliance: [
    { from: '法務長 Sarah', msg: '歐盟 MiCA 的新規今天正式生效，請注意', icon: '👩‍⚖️' },
    { from: '#compliance-updates', msg: '日本 FSA 更新了虛擬資產監管指引', icon: '📜' },
    { from: '同事 David', msg: '那個可疑交易的 SAR 報告我幫你交了', icon: '🤝' },
    { from: 'Slack Bot', msg: '提醒：反洗錢培訓下週二 3pm', icon: '🤖' },
    { from: 'HR 部門', msg: '合規部門本季度表現優異，獎金 +10% 🎉', icon: '📋' },
    { from: '系統通知', msg: 'KYC 審查系統新增了 AI 輔助功能', icon: '🔧' },
    { from: '#general', msg: '有記者在問我們關於某筆交易的事...', icon: '📰' },
  ],
};

/**
 * 每日隨機小事件（在通知中出現，增加沉浸感）
 */
window.DAILY_FLAVOR = [
  '你走進辦公室，發現有人在你桌上放了一個寫著「HODL」的便利貼。',
  '茶水間的電視正在播放「比特幣跌破 XX 萬」的新聞，所有人都裝作沒看到。',
  '你打開電腦，發現昨天忘記關的 K 線圖已經天翻地覆。',
  '隔壁同事正在偷偷看他的 Phantom 錢包。',
  '有人在 #random 頻道分享了一個極度看漲的分析，底下全是 🚀🚀🚀。',
  '你收到一封來自「奈及利亞王子」的詐騙郵件，諷刺的是你的工作就是抓這種東西。',
  '辦公室裡突然響起歡呼聲——BNB 又創新高了。',
  '你發現自動販賣機現在也接受 BNB 付款了。',
  '主管分享了一個「我們公司在 Glassdoor 上的評分」，氣氛突然凝重。',
  '你在電梯裡遇到 CZ，他朝你點了點頭。你興奮了一整天。',
  '午餐時聽到實習生在討論要不要把薪水全部換成狗狗幣。',
  '有人把會議室預約名稱寫成「To The Moon Strategy Session」。',
];
