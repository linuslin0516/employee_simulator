/**
 * 離線備用事件：當 API 不可用時使用
 * 每個職業 12 個事件，足夠玩完 30 天不重複
 */
window.FALLBACK_EVENTS = {
  support: [
    {
      title: '韭菜暴動',
      description: '一位大戶在群組裡怒噴「幣安吃我的單」，帶動 500 人同時開工單投訴。客服系統直接被塞爆，你的工單佇列突破歷史新高。主管在群組 @all 要求立刻處理。',
      choices: [
        { text: '逐一認真回覆', stressChange: 15, performanceChange: 12, bossApprovalChange: 8, outcome: '累到虛脫但主管點讚' },
        { text: '用模板快速回覆', stressChange: 5, performanceChange: -5, bossApprovalChange: 3, outcome: '速度快但被用戶罵敷衍' },
        { text: '假裝系統故障', stressChange: -5, performanceChange: -15, bossApprovalChange: -10, outcome: '混過去了但被主管發現' },
      ],
    },
    {
      title: '迷因幣客訴',
      description: '有個用戶花光積蓄 All-in 了一個叫「ElonMoonDoge69Inu」的迷因幣，現在歸零了，在工單裡寫了一篇三千字的人生故事要求退款，最後還附上了他家貓的照片。',
      choices: [
        { text: '溫柔安慰並解釋', stressChange: 8, performanceChange: 10, bossApprovalChange: 5, outcome: '用戶感動但你內心淌血' },
        { text: '直接丟免責條款', stressChange: 3, performanceChange: 5, bossApprovalChange: -3, outcome: '高效率但有點冷血' },
        { text: '偷偷轉給別的客服', stressChange: -8, performanceChange: -8, bossApprovalChange: -5, outcome: '甩鍋成功但同事記恨你' },
      ],
    },
    {
      title: 'VIP 大客戶直撥',
      description: '一位持倉超過 1000 BTC 的 VIP 大客戶直接打到你的分機，說他的提幣被風控凍結了，語氣非常不善。他的帳戶經理剛好請假，你是唯一能處理的人。',
      choices: [
        { text: '親自跟進到底', stressChange: 12, performanceChange: 15, bossApprovalChange: 10, outcome: '大客戶滿意，老闆親自來謝你' },
        { text: '轉接風控部門', stressChange: 3, performanceChange: 0, bossApprovalChange: -5, outcome: '規矩但客戶嫌你踢皮球' },
        { text: '說要回電但先拖著', stressChange: -3, performanceChange: -12, bossApprovalChange: -8, outcome: '客戶投訴到 CEO 信箱' },
      ],
    },
    {
      title: '翻譯大危機',
      description: '公司要推新的中文公告，但翻譯團隊把「Staking」翻成「牛排」，「Gas Fee」翻成「汽油費」，公告已經發出去了，用戶在社群瘋狂截圖嘲笑。',
      choices: [
        { text: '立即修正並道歉', stressChange: 10, performanceChange: 12, bossApprovalChange: 8, outcome: '及時止損，用戶覺得反差萌' },
        { text: '假裝是愚人節梗', stressChange: 5, performanceChange: 5, bossApprovalChange: 0, outcome: '有人信了但大部分人沒買帳' },
        { text: '把鍋甩給翻譯團隊', stressChange: -2, performanceChange: -5, bossApprovalChange: -3, outcome: '翻譯組的人從此不理你' },
      ],
    },
    {
      title: '深夜求助',
      description: '凌晨兩點，一個用戶打來哭訴他被釣魚網站騙走了所有的 ETH，聲音聽起來真的很絕望。按照規定你只能叫他報警，但你的心在滴血。',
      choices: [
        { text: '耐心安慰並協助報案', stressChange: 12, performanceChange: 10, bossApprovalChange: 5, outcome: '你沒能追回他的幣但給了他溫暖' },
        { text: '照規定流程處理', stressChange: 5, performanceChange: 5, bossApprovalChange: 3, outcome: '合規但感覺自己像機器人' },
        { text: '轉接夜班同事', stressChange: -5, performanceChange: -8, bossApprovalChange: -2, outcome: '甩出去了但心裡不安' },
      ],
    },
    {
      title: '假冒客服',
      description: 'Twitter 上出現一個假冒幣安官方客服的帳號，到處私訊用戶要 seed phrase，已經有十幾個人上當了。用戶全部湧進來找你罵，覺得是你們的問題。',
      choices: [
        { text: '整理受害名單並上報', stressChange: 10, performanceChange: 15, bossApprovalChange: 8, outcome: '主動積極，安全團隊感謝你' },
        { text: '在社群發警告公告', stressChange: 8, performanceChange: 8, bossApprovalChange: 5, outcome: '阻止了更多人上當' },
        { text: '只回覆個別用戶', stressChange: 3, performanceChange: -5, bossApprovalChange: -5, outcome: '被批評缺乏大局觀' },
      ],
    },
    {
      title: '語言障礙',
      description: '一個用戶用你完全不懂的阿拉伯文寫了一封超長的工單，Google 翻譯翻出來的結果讀起來像是外星密碼。但工單被標記為「緊急」。',
      choices: [
        { text: '找阿拉伯文同事幫忙', stressChange: 5, performanceChange: 10, bossApprovalChange: 5, outcome: '跨部門合作，問題完美解決' },
        { text: '硬用翻譯軟體回覆', stressChange: 8, performanceChange: -3, bossApprovalChange: 0, outcome: '用戶收到一封更難懂的回覆' },
        { text: '轉到其他語言區客服', stressChange: -3, performanceChange: -5, bossApprovalChange: -3, outcome: '被踢了回來因為他們也不懂' },
      ],
    },
    {
      title: '名人效應',
      description: 'Elon Musk 又發了一條關於狗狗幣的推文，瞬間湧入 10 萬筆交易。app 開始卡頓，用戶瘋狂投訴「幣安又掛了」。你的工單數量以每秒 50 封的速度增長。',
      choices: [
        { text: '手動發公告安撫用戶', stressChange: 12, performanceChange: 12, bossApprovalChange: 8, outcome: '前線英雄，客服之光' },
        { text: '等技術團隊修好再回覆', stressChange: 5, performanceChange: 0, bossApprovalChange: -3, outcome: '用戶等太久，滿意度下降' },
        { text: '自己也趁機買狗狗幣', stressChange: -5, performanceChange: -15, bossApprovalChange: -10, outcome: '被監控發現上班炒幣' },
      ],
    },
    {
      title: '內部培訓日',
      description: '今天是季度培訓日，主題是「如何用愛與耐心服務客戶」。你坐在會議室裡聽了三小時的心靈雞湯，但你桌上還有 200 封未處理的工單在等你。',
      choices: [
        { text: '認真聽講做筆記', stressChange: 8, performanceChange: 5, bossApprovalChange: 10, outcome: '主管看到你很認真很開心' },
        { text: '偷偷用手機處理工單', stressChange: 10, performanceChange: 8, bossApprovalChange: -5, outcome: '工單清了但被抓到分心' },
        { text: '在角落打瞌睡', stressChange: -10, performanceChange: -8, bossApprovalChange: -8, outcome: '睡醒精神好但打呼被拍照' },
      ],
    },
    {
      title: '用戶送禮',
      description: '一個你之前幫忙找回帳號的用戶居然寄了一箱台灣鳳梨酥到公司感謝你。同事們都在問是不是收賄，合規部的人已經朝你走過來了。',
      choices: [
        { text: '主動上報合規部', stressChange: 5, performanceChange: 10, bossApprovalChange: 10, outcome: '清清白白，鳳梨酥分給全組吃' },
        { text: '偷偷收下不說', stressChange: 8, performanceChange: -5, bossApprovalChange: -8, outcome: '被隔壁同事舉報了' },
        { text: '退回給用戶', stressChange: 3, performanceChange: 5, bossApprovalChange: 5, outcome: '用戶有點傷心但你問心無愧' },
      ],
    },
    {
      title: '系統大當機',
      description: '客服系統突然掛了，所有工單、對話記錄、用戶資料通通消失。整個客服部陷入混亂，主管在群裡連發 15 個驚嘆號。',
      choices: [
        { text: '用私人信箱臨時頂上', stressChange: 15, performanceChange: 15, bossApprovalChange: 12, outcome: '英雄式救場但累到不行' },
        { text: '等 IT 修好', stressChange: 3, performanceChange: -3, bossApprovalChange: 0, outcome: '三小時後恢復，用戶怒氣值拉滿' },
        { text: '趁機摸魚', stressChange: -10, performanceChange: -10, bossApprovalChange: -5, outcome: '難得的休息但錯過了表現機會' },
      ],
    },
    {
      title: '競爭對手挖角',
      description: '一個自稱 Coinbase 的 HR 在 LinkedIn 私訊你，說他們願意給你雙倍薪水。你心動了三秒鐘，然後想到你的 BNB 持倉還在鎖倉期。',
      choices: [
        { text: '禮貌拒絕表忠心', stressChange: 3, performanceChange: 5, bossApprovalChange: 10, outcome: '消息傳到老闆耳裡，好感大增' },
        { text: '拿 offer 跟老闆談加薪', stressChange: 10, performanceChange: 5, bossApprovalChange: -5, outcome: '加了一點薪但老闆記住了' },
        { text: '認真考慮跳槽', stressChange: -5, performanceChange: -10, bossApprovalChange: -12, outcome: '三心二意被看出來了' },
      ],
    },
  ],
  trading: [
    {
      title: '鯨魚異動',
      description: '凌晨三點警報大響，一個巨鯨帳戶突然轉出 5000 BTC，同時有三個關聯帳戶在瘋狂市價賣出。K 線像瀑布一樣往下衝，你的手機被主管連環 call。',
      choices: [
        { text: '立即凍結帳戶調查', stressChange: 10, performanceChange: 15, bossApprovalChange: 10, outcome: '果斷處理獲得表揚' },
        { text: '先觀察等主管指示', stressChange: 5, performanceChange: -5, bossApprovalChange: -8, outcome: '錯過最佳時機被唸' },
        { text: '只發一封報告郵件', stressChange: -3, performanceChange: -10, bossApprovalChange: -5, outcome: '被批評反應太慢' },
      ],
    },
    {
      title: '機器人叛亂',
      description: '監控系統檢測到有人用高頻交易機器人在 BNB/USDT 交易對上洗量，一秒鐘掛撤單 2000 次。但帳戶是某個 VIP 大客戶的。處理不好會得罪金主，不處理會被合規追殺。',
      choices: [
        { text: '照規矩標記違規', stressChange: 12, performanceChange: 15, bossApprovalChange: -5, outcome: '合規讚你但業務部來找碴' },
        { text: '私下通知客戶收斂', stressChange: 5, performanceChange: -5, bossApprovalChange: 8, outcome: '暫時和平但有隱患' },
        { text: '當作沒看見', stressChange: -5, performanceChange: -15, bossApprovalChange: 3, outcome: '躲過一時但風險累積' },
      ],
    },
    {
      title: '閃崩預警',
      description: '你的自製監控腳本偵測到某個新上線的 altcoin 深度極薄，有人正在大量掛市價買單準備拉盤。如果他們拉完馬上砸，散戶會血虧。但目前技術上沒有違規。',
      choices: [
        { text: '主動通報風控團隊', stressChange: 8, performanceChange: 12, bossApprovalChange: 5, outcome: '提前預警，團隊感謝你' },
        { text: '調高該幣的監控等級', stressChange: 5, performanceChange: 8, bossApprovalChange: 0, outcome: '穩健做法但反應稍慢' },
        { text: '繼續觀察不介入', stressChange: -2, performanceChange: -10, bossApprovalChange: -3, outcome: '果然崩了，你被問為什麼沒提早說' },
      ],
    },
    {
      title: 'API 異常風暴',
      description: '交易 API 突然出現大量異常請求，有人在用 bug 刷出虛假的成交記錄。如果不立即處理，這些假數據會被套利機器人利用，造成真金白銀的損失。',
      choices: [
        { text: '緊急關閉 API 接口', stressChange: 15, performanceChange: 18, bossApprovalChange: 10, outcome: '快刀斬亂麻，損失控制在最小' },
        { text: '先記錄證據再處理', stressChange: 10, performanceChange: 5, bossApprovalChange: 0, outcome: '有證據但多流失了一些錢' },
        { text: '聯繫開發團隊處理', stressChange: 5, performanceChange: -5, bossApprovalChange: -3, outcome: '等開發回覆的 30 分鐘很漫長' },
      ],
    },
    {
      title: '新幣上線',
      description: '今天有一個熱門新幣上線，交易量瞬間暴增。你發現有個帳戶在開盤前 0.1 秒就掛了巨額買單——這要不是內鬼，就是有人偷了上幣時間表。',
      choices: [
        { text: '立即標記並上報', stressChange: 12, performanceChange: 15, bossApprovalChange: 10, outcome: '抓到了一個洩密的 PM' },
        { text: '先蒐集更多證據', stressChange: 8, performanceChange: 8, bossApprovalChange: 3, outcome: '證據確鑿但花了時間' },
        { text: '覺得可能只是巧合', stressChange: -3, performanceChange: -12, bossApprovalChange: -8, outcome: '事後證明不是巧合，你被質疑' },
      ],
    },
    {
      title: '跨市場套利',
      description: '你發現幣安和另一家交易所之間出現了 3% 的價差，某個機構帳戶正在瘋狂搬磚套利。技術上這是合法的，但伺服器快被他搞爆了。',
      choices: [
        { text: '限制該帳戶的請求頻率', stressChange: 8, performanceChange: 10, bossApprovalChange: 5, outcome: '平衡了公平性和效能' },
        { text: '上報給業務部決定', stressChange: 5, performanceChange: 3, bossApprovalChange: 0, outcome: '業務部說這是好客戶不要動' },
        { text: '放著讓他套', stressChange: -3, performanceChange: -8, bossApprovalChange: -3, outcome: '伺服器卡了一小時' },
      ],
    },
    {
      title: '模型異常',
      description: '你負責的異常交易偵測模型突然開始瘋狂報警，一小時內標記了 5000 筆「可疑交易」。你仔細一看，它把所有超過 1 BTC 的交易都標成可疑了。',
      choices: [
        { text: '手動調參修復模型', stressChange: 15, performanceChange: 15, bossApprovalChange: 8, outcome: '加班到半夜但模型恢復正常' },
        { text: '先回滾到舊版本', stressChange: 8, performanceChange: 8, bossApprovalChange: 3, outcome: '暫時解決但得找時間修' },
        { text: '直接關掉警報等明天', stressChange: -8, performanceChange: -15, bossApprovalChange: -10, outcome: '關掉期間真的有可疑交易溜過去了' },
      ],
    },
    {
      title: '做空狙擊',
      description: '有人在合約市場開了一個巨大的空單，然後在現貨市場瘋狂砸盤，企圖觸發連環爆倉。你眼睜睜看著爆倉清算列表不斷增長。',
      choices: [
        { text: '啟動異常交易保護機制', stressChange: 12, performanceChange: 15, bossApprovalChange: 10, outcome: '成功阻止了惡意操縱' },
        { text: '只記錄不干預', stressChange: 5, performanceChange: -5, bossApprovalChange: -5, outcome: '一堆人被爆倉，社群炸了' },
        { text: '試圖手動平衡市場', stressChange: 18, performanceChange: 5, bossApprovalChange: -3, outcome: '好心辦壞事，被質疑干預市場' },
      ],
    },
    {
      title: '凌晨守夜',
      description: '今天輪到你值大夜班。辦公室空蕩蕩的只有你和隔壁的保安。螢幕上一切正常，你的眼皮越來越重⋯⋯突然一個警報彈出來：「異常大額轉帳偵測」。',
      choices: [
        { text: '精神一振開始調查', stressChange: 10, performanceChange: 12, bossApprovalChange: 8, outcome: '關鍵時刻沒掉鏈子' },
        { text: '先喝杯咖啡再說', stressChange: 5, performanceChange: 3, bossApprovalChange: 0, outcome: '稍微延誤但還算及時' },
        { text: '設成已讀明天再處理', stressChange: -8, performanceChange: -15, bossApprovalChange: -10, outcome: '早上發現那是一起洗錢案' },
      ],
    },
    {
      title: '面試新人',
      description: '主管讓你面試一個交易監控的新人。這個人自稱有五年經驗，但面試時你發現他連 MACD 和 RSI 都分不清，不過他是某個高管的親戚。',
      choices: [
        { text: '如實寫面試評語', stressChange: 8, performanceChange: 10, bossApprovalChange: -5, outcome: '正直但得罪了人' },
        { text: '寫得比較委婉', stressChange: 3, performanceChange: 0, bossApprovalChange: 5, outcome: '圓滑但可能害了團隊' },
        { text: '直接通過算了', stressChange: -3, performanceChange: -10, bossApprovalChange: 8, outcome: '新人來了以後天天出包' },
      ],
    },
    {
      title: '量化策略外洩',
      description: '你發現一個離職員工的帳號還有系統權限，而且他在離職後仍然在下載交易數據。更可怕的是，他現在在競爭對手那邊工作。',
      choices: [
        { text: '立即停權並通報安全部', stressChange: 10, performanceChange: 18, bossApprovalChange: 12, outcome: '及時止血，CTO 親自感謝' },
        { text: '先偷偷觀察他在做什麼', stressChange: 12, performanceChange: 5, bossApprovalChange: 0, outcome: '蒐集到更多證據但風險更大' },
        { text: '發 email 提醒 IT 部門', stressChange: 3, performanceChange: -3, bossApprovalChange: -3, outcome: '郵件石沉大海三天才被看到' },
      ],
    },
    {
      title: '聖誕節值班',
      description: '聖誕節全公司都放假了，只有你和兩個實習生在值班。結果 BTC 突然暴跌 15%，觸發了 200 個風控警報。你看著兩個不知所措的實習生，深吸一口氣。',
      choices: [
        { text: '帶領實習生一起處理', stressChange: 15, performanceChange: 15, bossApprovalChange: 12, outcome: '帶兵打仗，節後被提名優秀員工' },
        { text: '瘋狂打電話叫同事回來', stressChange: 12, performanceChange: 5, bossApprovalChange: 0, outcome: '大家不太開心但至少有人幫忙了' },
        { text: '只處理最緊急的幾個', stressChange: 5, performanceChange: -5, bossApprovalChange: -5, outcome: '遺漏了幾個重要的異常' },
      ],
    },
  ],
  compliance: [
    {
      title: 'SEC 來電',
      description: '美國 SEC 突然發來一封正式函件，要求幣安在 48 小時內提交過去半年所有涉及美國用戶的交易記錄。法務長臉都綠了，直接衝進你辦公室要你「想辦法」。',
      choices: [
        { text: '通宵整理完整報告', stressChange: 20, performanceChange: 18, bossApprovalChange: 12, outcome: '爆肝完成但贏得信任' },
        { text: '先交初步回覆爭取時間', stressChange: 8, performanceChange: 8, bossApprovalChange: 5, outcome: '穩妥但壓力延後了' },
        { text: '推給外部律所處理', stressChange: -5, performanceChange: -10, bossApprovalChange: -8, outcome: '被罵缺乏擔當' },
      ],
    },
    {
      title: '內鬼疑雲',
      description: '內部審計發現有員工帳戶在新幣上線前反覆買入，疑似利用內幕消息交易。更尷尬的是，這個帳戶的 KYC 資料指向你隔壁的同事 Kevin。Kevin 昨天還請你喝咖啡。',
      choices: [
        { text: '公事公辦提交報告', stressChange: 15, performanceChange: 15, bossApprovalChange: 10, outcome: '正義凜然但失去朋友' },
        { text: '先私下找 Kevin 談', stressChange: 10, performanceChange: -5, bossApprovalChange: -5, outcome: '打草驚蛇且有包庇風險' },
        { text: '匿名提交線索', stressChange: 5, performanceChange: 5, bossApprovalChange: 0, outcome: '折衷方案但效率較低' },
      ],
    },
    {
      title: '神秘空殼公司',
      description: '你在審查一筆大額入金時，發現資金來源是一家在開曼群島註冊的空殼公司，受益人資訊層層嵌套。Google 一下發現這家公司跟某個被制裁國家的官員有間接關聯。',
      choices: [
        { text: '立即提交 SAR 報告', stressChange: 10, performanceChange: 18, bossApprovalChange: 8, outcome: '正確決定，避免了巨額罰款' },
        { text: '要求客戶補充文件', stressChange: 8, performanceChange: 5, bossApprovalChange: 0, outcome: '拖延了但沒解決根本問題' },
        { text: '請主管來決定', stressChange: 3, performanceChange: -5, bossApprovalChange: -3, outcome: '主管說這明明就是你的職責' },
      ],
    },
    {
      title: 'KYC 照片之謎',
      description: '一個用戶的 KYC 提交了明顯是 AI 生成的證件照——五官完美到不真實，而且如果你把照片放大，他的耳朵有六個手指⋯等等，耳朵怎麼會有手指？',
      choices: [
        { text: '直接拒絕並標記', stressChange: 5, performanceChange: 12, bossApprovalChange: 8, outcome: '又阻止了一個身份詐騙' },
        { text: '要求重新提交真人照', stressChange: 3, performanceChange: 5, bossApprovalChange: 3, outcome: '用戶消失了再也沒回來' },
        { text: '轉給 AI 審核系統', stressChange: -3, performanceChange: -3, bossApprovalChange: 0, outcome: 'AI 覺得 AI 生成的照片沒問題' },
      ],
    },
    {
      title: '跨國監管風暴',
      description: '歐盟、日本和新加坡同時發出監管質詢函，每個要求的格式和截止日期都不同。你桌上堆滿了各國法規的文件，電腦開了 47 個瀏覽器分頁。',
      choices: [
        { text: '列優先級逐個處理', stressChange: 15, performanceChange: 15, bossApprovalChange: 10, outcome: '有條不紊地全部搞定' },
        { text: '各請一個外部顧問', stressChange: 5, performanceChange: 8, bossApprovalChange: 0, outcome: '花了公司不少錢但省了時間' },
        { text: '先處理最近的截止日期', stressChange: 8, performanceChange: 5, bossApprovalChange: -3, outcome: '趕完一個忘了另一個' },
      ],
    },
    {
      title: '吹哨者來信',
      description: '你的公司信箱收到一封匿名信，聲稱某個高管在利用公司資源為自己的私人基金洗錢。信中附了一些看起來很有說服力的截圖。',
      choices: [
        { text: '直接提交給董事會', stressChange: 18, performanceChange: 15, bossApprovalChange: -5, outcome: '正義之舉但得罪了高層' },
        { text: '先自己秘密調查', stressChange: 12, performanceChange: 10, bossApprovalChange: 0, outcome: '掌握了更多證據但壓力山大' },
        { text: '假裝沒收到', stressChange: -5, performanceChange: -15, bossApprovalChange: 5, outcome: '良心不安而且可能成為共犯' },
      ],
    },
    {
      title: '反洗錢培訓',
      description: '今天你要給全公司 200 人做年度反洗錢培訓。PPT 做了 80 頁，但你昨晚才發現有一半的數據是去年的。而且 CEO 說他也會來聽。',
      choices: [
        { text: '通宵更新所有數據', stressChange: 18, performanceChange: 15, bossApprovalChange: 12, outcome: '完美呈現，CEO 當場表揚' },
        { text: '只更新最關鍵的幾頁', stressChange: 8, performanceChange: 5, bossApprovalChange: 3, outcome: '大致過關但有同事發現了舊數據' },
        { text: '講快一點跳過那些頁', stressChange: 5, performanceChange: -5, bossApprovalChange: -5, outcome: '被 CEO 問了一個尷尬的問題' },
      ],
    },
    {
      title: '制裁名單更新',
      description: 'OFAC 制裁名單今天突然新增了 500 個地址，其中 3 個跟你們平台上的活躍帳戶吻合。更麻煩的是，其中一個帳戶的持倉超過 100 萬美金。',
      choices: [
        { text: '立即凍結所有相關帳戶', stressChange: 12, performanceChange: 18, bossApprovalChange: 10, outcome: '合規無瑕疵，法務稱讚' },
        { text: '先凍結再通知用戶', stressChange: 8, performanceChange: 10, bossApprovalChange: 5, outcome: '用戶暴怒但法律上你是對的' },
        { text: '等法務確認再行動', stressChange: 5, performanceChange: -5, bossApprovalChange: -5, outcome: '法務說你早該凍結了' },
      ],
    },
    {
      title: '媒體爆料',
      description: '一家知名科技媒體發了一篇文章，聲稱幣安的 KYC 流程有重大漏洞，允許未成年人開戶交易。PR 部門驚慌失措地跑來問你這是不是真的。',
      choices: [
        { text: '緊急審查所有流程', stressChange: 15, performanceChange: 15, bossApprovalChange: 10, outcome: '找到了一個小漏洞並修復' },
        { text: '準備聲明否認', stressChange: 8, performanceChange: 5, bossApprovalChange: 5, outcome: '暫時平息但沒有真正解決問題' },
        { text: '推給技術部門負責', stressChange: -3, performanceChange: -8, bossApprovalChange: -8, outcome: '被批評推卸責任' },
      ],
    },
    {
      title: 'GDPR 刪除請求',
      description: '一個歐盟用戶行使「被遺忘權」，要求刪除他在平台上的所有資料。但問題是他涉及一個進行中的反洗錢調查，法律要求你保留資料。進退兩難。',
      choices: [
        { text: '跟法務討論折衷方案', stressChange: 10, performanceChange: 12, bossApprovalChange: 8, outcome: '找到了合法的部分刪除方案' },
        { text: '拒絕刪除並引用法律', stressChange: 8, performanceChange: 8, bossApprovalChange: 3, outcome: '法律上站得住但用戶去告了' },
        { text: '直接刪除全部資料', stressChange: -5, performanceChange: -18, bossApprovalChange: -12, outcome: '調查線索斷了，法務氣瘋' },
      ],
    },
    {
      title: '離職審計',
      description: '一個合規部的同事突然提離職了，按照規定你需要審計他過去處理的所有案件。打開他的資料夾發現⋯⋯有 30 個「待處理」案件根本沒有處理過。',
      choices: [
        { text: '加班全部補上', stressChange: 18, performanceChange: 15, bossApprovalChange: 10, outcome: '擦屁股擦到天亮但避免了災難' },
        { text: '分配給團隊一起處理', stressChange: 8, performanceChange: 10, bossApprovalChange: 8, outcome: '團隊合作但大家都在加班' },
        { text: '上報主管讓他決定', stressChange: 5, performanceChange: 3, bossApprovalChange: 0, outcome: '主管說「那不然你來？」' },
      ],
    },
    {
      title: '可疑慈善機構',
      description: '一個自稱慈善機構的帳戶每天固定收到大量小額 USDT 轉帳，然後定期轉出到多個不同的錢包地址。模式看起來非常像洗錢，但萬一真的是慈善機構呢？',
      choices: [
        { text: '深入調查並提交報告', stressChange: 12, performanceChange: 15, bossApprovalChange: 10, outcome: '果然是洗錢，慈善只是幌子' },
        { text: '要求提供慈善證明', stressChange: 5, performanceChange: 8, bossApprovalChange: 3, outcome: '他們提交了一份假證明' },
        { text: '標記為低風險繼續觀察', stressChange: -3, performanceChange: -10, bossApprovalChange: -8, outcome: '三個月後上了新聞頭條' },
      ],
    },
  ],
};

/**
 * 事件追蹤器：避免重複
 */
window.EventTracker = {
  usedIndices: {},

  reset: function () {
    this.usedIndices = {};
  },

  getRandomEvent: function (job) {
    var events = window.FALLBACK_EVENTS[job];
    if (!this.usedIndices[job]) {
      this.usedIndices[job] = [];
    }
    var used = this.usedIndices[job];

    // 如果全用過了就重置
    if (used.length >= events.length) {
      used.length = 0;
    }

    // 找一個沒用過的
    var available = [];
    for (var i = 0; i < events.length; i++) {
      if (used.indexOf(i) === -1) {
        available.push(i);
      }
    }

    var pick = available[Math.floor(Math.random() * available.length)];
    used.push(pick);
    return events[pick];
  },
};

// 保留舊的 API（向後相容），但現在用 EventTracker
window.getRandomFallback = function (job) {
  return window.EventTracker.getRandomEvent(job);
};
