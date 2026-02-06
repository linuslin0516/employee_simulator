/**
 * 事件生成 API：透過 Vercel Serverless Function 代理 Anthropic API
 * 前端不需要 API Key
 */
window.GameAPI = {
  /**
   * 呼叫後端 API 生成遊戲事件
   */
  fetchEvent: async function (job, day, stats) {
    var response = await fetch('/api/generate-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job: job, day: day, stats: stats }),
    });

    if (!response.ok) {
      throw new Error('API error: ' + response.status);
    }

    var event = await response.json();

    // Validate
    if (!event.title || !event.choices || event.choices.length !== 3) {
      throw new Error('Invalid event format');
    }

    return event;
  },
};
