const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');

const imagesToFix = {
  "custom-sky-oxford.jpg": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=400&auto=format&fit=crop",
  "fabric-4.jpg": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=800&auto=format&fit=crop",
  "process-4.jpg": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=800&auto=format&fit=crop",
  "hero-bg.jpg": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
  "rtw-1.jpg": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
  "rtw-6.jpg": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800&auto=format&fit=crop",
  "rtw-7.jpg": "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop",
  "premium-linen-bg.jpg": "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1920&auto=format&fit=crop"
};

async function download() {
  for (const [filename, url] of Object.entries(imagesToFix)) {
    const dest = path.join(assetsDir, filename);
    console.log('Downloading', filename);
    try {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(dest, buffer);
      console.log('Saved', filename, buffer.length, 'bytes');
    } catch (err) {
      console.error('Error downloading', filename, err);
    }
  }
}

download();
