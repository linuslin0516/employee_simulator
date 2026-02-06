/**
 * Anthropic API 事件生成
 */
window.GameAPI = {
  // API Key 存在記憶體中（不存 localStorage）
  apiKey: '',

  setApiKey: function (key) {
    this.apiKey = (key || '').trim();
  },

  hasApiKey: function () {
    return this.apiKey.length > 0;
  },

  /**
   * 呼叫 Claude API 生成遊戲事件
   */
  fetchEvent: async function (job, day, stats) {
    if (!this.hasApiKey()) {
      throw new Error('No API key');
    }

    var jobName = window.JOBS[job].name;

    var prompt =
      '你是「幣安員工模擬器」遊戲的事件生成器。\n\n' +
      '當前狀態：\n' +
      '- 職位：' + jobName + '\n' +
      '- 第 ' + day + ' 天\n' +
      '- 壓力值：' + stats.stress + '/100\n' +
      '- 績效：' + stats.performance + '/100\n' +
      '- 老闆好感：' + stats.bossApproval + '/100\n\n' +
      '生成一個' + jobName + '會遇到的荒謬但真實的職場事件。要幽默、有 crypto 圈的梗，但也要有深度。\n' +
      '根據當前數值狀態來調整事件難度和風格：壓力高時給一些喘息機會，績效低時給翻盤機會。\n' +
      '每次生成完全不同的事件，不要重複之前的主題。\n\n' +
      '請用以下 JSON 格式回應（只回傳 JSON，不要其他文字）：\n' +
      '{\n' +
      '  "title": "事件標題（簡短有梗，10字內）",\n' +
      '  "description": "事件描述（80-120字，要生動有趣，有crypto梗）",\n' +
      '  "choices": [\n' +
      '    {\n' +
      '      "text": "選項文字（15字內）",\n' +
      '      "stressChange": 數字（-15到20之間的整數）,\n' +
      '      "performanceChange": 數字（-20到20之間的整數）,\n' +
      '      "bossApprovalChange": 數字（-15到15之間的整數）,\n' +
      '      "outcome": "結果描述（30字內）"\n' +
      '    },\n' +
      '    { "text": "...", "stressChange": 0, "performanceChange": 0, "bossApprovalChange": 0, "outcome": "..." },\n' +
      '    { "text": "...", "stressChange": 0, "performanceChange": 0, "bossApprovalChange": 0, "outcome": "..." }\n' +
      '  ]\n' +
      '}';

    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error('API error: ' + response.status);
    }

    var data = await response.json();
    var text = data.content[0].text;

    var jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    return JSON.parse(jsonMatch[0]);
  },
};
