export default async function handler(req, res) {
  // ⚠️ PROTEJA ESTE ENDPOINT COM UM TOKEN (defina em Vercel env: SECRET_TOKEN)
  if (req.headers['x-secret-token'] !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 1️⃣ Acessa o MEMORY.md na VPS (substitua pelo caminho correto)
    const memoryPath = '/data/.openclaw/workspace/MEMORY.md';
    
    // 2️⃣ Lê o arquivo (via exec - requer gateway pareado)
    const { exec } = require('child_process');
    const output = await new Promise((resolve, reject) => {
      exec(`cat ${memoryPath}`, (error, stdout) => {
        if (error) reject(error);
        else resolve(stdout);
      });
    });

    // 3️⃣ Processa o conteúdo (simplificado para exemplo)
    const entries = [];
    const lines = output.split('\n');
    let currentEntry = null;

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentEntry) entries.push(currentEntry);
        currentEntry = {
          title: line.replace('## ', ''),
          content: '',
          date: new Date().toISOString().split('T')[0]
        };
      } else if (currentEntry) {
        currentEntry.content += line + '\n';
      }
    }

    if (currentEntry) entries.push(currentEntry);

    res.status(200).json({ entries });
  
  } catch (error) {
    console.error('Memory API error:', error);
    res.status(500).json({ error: 'Failed to read MEMORY.md' });
  }
}