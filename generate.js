export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { heroName, style } = req.body;

  if (!heroName || !style) {
    return res.status(400).json({ message: 'Missing heroName or style' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Ты профессиональный сценарист мультфильмов.' },
          { role: 'user', content: `Придумай короткий сценарий мультфильма в стиле ${style} про героя по имени ${heroName}. Верни JSON формат с полями: title, synopsis, scenes.` }
        ],
        temperature: 0.7
      })
    });

    const openaiData = await openaiRes.json();
    const parsed = JSON.parse(openaiData.choices[0].message.content);

    res.status(200).json(parsed);
  } catch (err) {
    console.error('[SERVER ERROR]', err);
    res.status(500).json({ message: 'Ошибка генерации сценария' });
  }
}