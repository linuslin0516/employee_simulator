/**
 * 遊戲工具函式：標籤、顏色、數值處理
 */
window.GameHelpers = {
  // ==================== 狀態標籤 ====================
  getStressLabel: function (v) {
    if (v <= 20) return '超 Chill';
    if (v <= 40) return '還行';
    if (v <= 60) return '有點緊繃';
    if (v <= 80) return '快爆了';
    return '要死了';
  },

  getPerfLabel: function (v) {
    if (v <= 20) return '擺爛中';
    if (v <= 40) return '普普通通';
    if (v <= 60) return '中規中矩';
    if (v <= 80) return '表現優秀';
    return '卷王本王';
  },

  getBossLabel: function (v) {
    if (v <= 20) return '黑名單上';
    if (v <= 40) return '不太妙';
    if (v <= 60) return '還算正常';
    if (v <= 80) return '頗受賞識';
    return '親兒子';
  },

  // ==================== 狀態條顏色 ====================
  getStressColor: function (v) {
    if (v <= 40) return '#4ade80';
    if (v <= 70) return '#facc15';
    return '#ef4444';
  },

  getPerfColor: function (v) {
    if (v <= 30) return '#ef4444';
    if (v <= 60) return '#facc15';
    return '#4ade80';
  },

  getBossColor: function (v) {
    if (v <= 30) return '#ef4444';
    if (v <= 60) return '#facc15';
    return '#4ade80';
  },

  // ==================== 情緒判定 ====================
  getMood: function (stats) {
    if (stats.performance >= 70 && stats.bossApproval >= 60) return 'happy';
    if (stats.stress >= 70) return 'stressed';
    return 'normal';
  },

  // ==================== 數值 Clamp ====================
  clamp: function (v, min, max) {
    if (min === undefined) min = 0;
    if (max === undefined) max = 100;
    return Math.max(min, Math.min(max, v));
  },
};
