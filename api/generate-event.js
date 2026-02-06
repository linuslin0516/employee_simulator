/**
 * Vercel Serverless Function: 代理 Anthropic API
 * API Key 從 Vercel 環境變數讀取，前端看不到
 *
 * POST /api/generate-event
 * Body: { job, day, stats: { stress, performance, bossApproval } }
 */
export default async function handler(req, res) {
  // 只允許 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const { job, day, stats } = req.body;

    if (!job || !day || !stats) {
      return res.status(400).json({ error: 'Missing required fields: job, day, stats' });
    }

    const jobNames = {
      support: '客服專員',
      trading: '交易監控員',
      compliance: '合規審查官',
    };

    const jobName = jobNames[job];
    if (!jobName) {
      return res.status(400).json({ error: 'Invalid job type' });
    }

    const prompt =
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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      return res.status(502).json({ error: 'Anthropic API error: ' + response.status });
    }

    const data = await response.json();
    const text = data.content[0].text;

    // Extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(502).json({ error: 'Invalid response from AI' });
    }

    const event = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (!event.title || !event.choices || event.choices.length !== 3) {
      return res.status(502).json({ error: 'Invalid event structure from AI' });
    }

    return res.status(200).json(event);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
