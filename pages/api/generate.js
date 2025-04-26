import formidable from 'formidable';
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import { uploadToCDN } from '../../src/utils/uploadToCDN';

export const config = { api: { bodyParser: false } };
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Parsing error' });
    try {
      const { heroName, style, language, templateId, isPremium } = fields;
      // Генерация сценария через OpenAI
      const prompt = `Create a ${style} cartoon scenario for hero ${heroName} in ${language}`;
      const aiRes = await openai.createChatCompletion({ model: 'gpt-4', messages: [{ role: 'user', content: prompt }] });
      const scenario = JSON.parse(aiRes.data.choices[0].message.content);
      // Фейковая генерация видео
      const fakeVideoPath = `/tmp/${heroName}.mp4`;
      fs.writeFileSync(fakeVideoPath, 'FAKE_VIDEO_CONTENT');
      const videoUrl = await uploadToCDN(fakeVideoPath);
      res.status(200).json({ ...scenario, videoUrl, shareUrl: videoUrl });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Generation failed' });
    }
  });
}