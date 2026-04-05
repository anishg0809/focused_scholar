import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/analyze', async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBkpfvkRd-sSdGxigvrGmPMYqj6_Q_zNR8`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  console.log("GEMINI RAW:", JSON.stringify(data, null, 2));
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  console.log("GEMINI TEXT:", text);
  res.json({ text });
});
app.listen(3001, () => console.log('Proxy running on port 3001'));
