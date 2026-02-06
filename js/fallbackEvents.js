/**
 * 離線備用事件：當 API 不可用時使用
 * 每個職業至少 2 個事件，可自行擴充
 */
window.FALLBACK_EVENTS = {
  support: [
    {
      title: '韭菜暴動',
      description:
        '一位大戶在群組裡怒噴「幣安吃我的單」，帶動 500 人同時開工單投訴。客服系統直接被塞爆，你的工單佇列突破歷史新高。主管在群組 @all 要求立刻處理。',
      choices: [
        { text: '逐一認真回覆', stressChange: 15, performanceChange: 12, bossApprovalChange: 8, outcome: '累到虛脫但主管點讚' },
        { text: '用模板快速回覆', stressChange: 5, performanceChange: -5, bossApprovalChange: 3, outcome: '速度快但被用戶罵敷衍' },
        { text: '假裝系統故障', stressChange: -5, performanceChange: -15, bossApprovalChange: -10, outcome: '混過去了但被主管發現' },
      ],
    },
    {
      title: '迷因幣客訴',
      description:
        '有個用戶花光積蓄 All-in 了一個叫「ElonMoonDoge69Inu」的迷因幣，現在歸零了，在工單裡寫了一篇三千字的人生故事要求退款，最後還附上了他家貓的照片。',
      choices: [
        { text: '溫柔安慰並解釋', stressChange: 8, performanceChange: 10, bossApprovalChange: 5, outcome: '用戶感動但你內心淌血' },
        { text: '直接丟免責條款', stressChange: 3, performanceChange: 5, bossApprovalChange: -3, outcome: '高效率但有點冷血' },
        { text: '偷偷轉給別的客服', stressChange: -8, performanceChange: -8, bossApprovalChange: -5, outcome: '甩鍋成功但同事記恨你' },
      ],
    },
    {
      title: 'VIP 大客戶直撥',
      description:
        '一位持倉超過 1000 BTC 的 VIP 大客戶直接打到你的分機，說他的提幣被風控凍結了，語氣非常不善。他的帳戶經理剛好請假，你是唯一能處理的人。',
      choices: [
        { text: '親自跟進到底', stressChange: 12, performanceChange: 15, bossApprovalChange: 10, outcome: '大客戶滿意，老闆親自來謝你' },
        { text: '轉接風控部門', stressChange: 3, performanceChange: 0, bossApprovalChange: -5, outcome: '規矩但客戶嫌你踢皮球' },
        { text: '說要回電但先拖著', stressChange: -3, performanceChange: -12, bossApprovalChange: -8, outcome: '客戶投訴到 CEO 信箱' },
      ],
    },
  ],
  trading: [
    {
      title: '鯨魚異動',
      description:
        '凌晨三點警報大響，一個巨鯨帳戶突然轉出 5000 BTC，同時有三個關聯帳戶在瘋狂市價賣出。K 線像瀑布一樣往下衝，你的手機被主管連環 call。',
      choices: [
        { text: '立即凍結帳戶調查', stressChange: 10, performanceChange: 15, bossApprovalChange: 10, outcome: '果斷處理獲得表揚' },
        { text: '先觀察等主管指示', stressChange: 5, performanceChange: -5, bossApprovalChange: -8, outcome: '錯過最佳時機被唸' },
        { text: '只發一封報告郵件', stressChange: -3, performanceChange: -10, bossApprovalChange: -5, outcome: '被批評反應太慢' },
      ],
    },
    {
      title: '機器人叛亂',
      description:
        '監控系統檢測到有人用高頻交易機器人在 BNB/USDT 交易對上洗量，一秒鐘掛撤單 2000 次。但帳戶是某個 VIP 大客戶的。處理不好會得罪金主，不處理會被合規追殺。',
      choices: [
        { text: '照規矩標記違規', stressChange: 12, performanceChange: 15, bossApprovalChange: -5, outcome: '合規讚你但業務部來找碴' },
        { text: '私下通知客戶收斂', stressChange: 5, performanceChange: -5, bossApprovalChange: 8, outcome: '暫時和平但有隱患' },
        { text: '當作沒看見', stressChange: -5, performanceChange: -15, bossApprovalChange: 3, outcome: '躲過一時但風險累積' },
      ],
    },
    {
      title: '閃崩預警',
      description:
        '你的自製監控腳本偵測到某個新上線的 altcoin 深度極薄，有人正在大量掛市價買單準備拉盤。如果他們拉完馬上砸，散戶會血虧。但目前技術上沒有違規。',
      choices: [
        { text: '主動通報風控團隊', stressChange: 8, performanceChange: 12, bossApprovalChange: 5, outcome: '提前預警，團隊感謝你' },
        { text: '調高該幣的監控等級', stressChange: 5, performanceChange: 8, bossApprovalChange: 0, outcome: '穩健做法但反應稍慢' },
        { text: '繼續觀察不介入', stressChange: -2, performanceChange: -10, bossApprovalChange: -3, outcome: '果然崩了，你被問為什麼沒提早說' },
      ],
    },
  ],
  compliance: [
    {
      title: 'SEC 來電',
      description:
        '美國 SEC 突然發來一封正式函件，要求幣安在 48 小時內提交過去半年所有涉及美國用戶的交易記錄。法務長臉都綠了，直接衝進你辦公室要你「想辦法」。',
      choices: [
        { text: '通宵整理完整報告', stressChange: 20, performanceChange: 18, bossApprovalChange: 12, outcome: '爆肝完成但贏得信任' },
        { text: '先交初步回覆爭取時間', stressChange: 8, performanceChange: 8, bossApprovalChange: 5, outcome: '穩妥但壓力延後了' },
        { text: '推給外部律所處理', stressChange: -5, performanceChange: -10, bossApprovalChange: -8, outcome: '被罵缺乏擔當' },
      ],
    },
    {
      title: '內鬼疑雲',
      description:
        '內部審計發現有員工帳戶在新幣上線前反覆買入，疑似利用內幕消息交易。更尷尬的是，這個帳戶的 KYC 資料指向你隔壁的同事 Kevin。Kevin 昨天還請你喝咖啡。',
      choices: [
        { text: '公事公辦提交報告', stressChange: 15, performanceChange: 15, bossApprovalChange: 10, outcome: '正義凜然但失去朋友' },
        { text: '先私下找 Kevin 談', stressChange: 10, performanceChange: -5, bossApprovalChange: -5, outcome: '打草驚蛇且有包庇風險' },
        { text: '匿名提交線索', stressChange: 5, performanceChange: 5, bossApprovalChange: 0, outcome: '折衷方案但效率較低' },
      ],
    },
    {
      title: '神秘的空殼公司',
      description:
        '你在審查一筆大額入金時，發現資金來源是一家在開曼群島註冊的空殼公司，受益人資訊層層嵌套。Google 一下發現這家公司跟某個被制裁國家的官員有間接關聯。',
      choices: [
        { text: '立即提交 SAR 報告', stressChange: 10, performanceChange: 18, bossApprovalChange: 8, outcome: '正確決定，避免了巨額罰款' },
        { text: '要求客戶補充文件', stressChange: 8, performanceChange: 5, bossApprovalChange: 0, outcome: '拖延了但沒解決根本問題' },
        { text: '請主管來決定', stressChange: 3, performanceChange: -5, bossApprovalChange: -3, outcome: '主管說這明明就是你的職責' },
      ],
    },
  ],
};

/**
 * 取得隨機備用事件
 */
window.getRandomFallback = function (job) {
  var events = window.FALLBACK_EVENTS[job];
  return events[Math.floor(Math.random() * events.length)];
};
