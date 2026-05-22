const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const images = {
  "custom-white-linen.jpg": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop",
  "custom-navy-cotton.jpg": "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=200&auto=format&fit=crop",
  "custom-olive-linen.jpg": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=200&auto=format&fit=crop",
  "custom-sky-oxford.jpg": "https://images.unsplash.com/photo-1605022600390-071c6efec940?q=80&w=200&auto=format&fit=crop",
  "custom-charcoal.jpg": "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=200&auto=format&fit=crop",
  "process-1.jpg": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop",
  "process-2.jpg": "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2080&auto=format&fit=crop",
  "process-3.jpg": "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1974&auto=format&fit=crop",
  "process-4.jpg": "https://images.unsplash.com/photo-1605022600390-071c6efec940?q=80&w=1974&auto=format&fit=crop",
  "hero-bg.jpg": "https://images.unsplash.com/photo-1594938298596-af34a78732ba?q=80&w=2070&auto=format&fit=crop",
  "cat-1.jpg": "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1974&auto=format&fit=crop",
  "cat-2.jpg": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1926&auto=format&fit=crop",
  "cat-3.jpg": "https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=2070&auto=format&fit=crop",
  "cat-4.jpg": "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=2070&auto=format&fit=crop",
  "brand-intro.jpg": "https://images.unsplash.com/photo-1603252109360-909baaf261c7?q=80&w=1974&auto=format&fit=crop",
  "rtw-1.jpg": "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=1988&auto=format&fit=crop",
  "rtw-2.jpg": "https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=2080&auto=format&fit=crop",
  "rtw-3.jpg": "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1974&auto=format&fit=crop",
  "rtw-4.jpg": "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1926&auto=format&fit=crop",
  "rtw-5.jpg": "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=1974&auto=format&fit=crop",
  "rtw-6.jpg": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60c99?q=80&w=2071&auto=format&fit=crop",
  "rtw-7.jpg": "https://images.unsplash.com/photo-1604135505701-d8ec78f7e2d9?q=80&w=2070&auto=format&fit=crop",
  "rtw-8.jpg": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop",
  "fabric-1.jpg": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
  "fabric-2.jpg": "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1974&auto=format&fit=crop",
  "fabric-3.jpg": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop",
  "fabric-4.jpg": "https://images.unsplash.com/photo-1605022600390-071c6efec940?q=80&w=1974&auto=format&fit=crop",
  "fabric-5.jpg": "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=2080&auto=format&fit=crop",
  "fabric-6.jpg": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=1974&auto=format&fit=crop"
};

async function download() {
  for (const [filename, url] of Object.entries(images)) {
    const dest = path.join(assetsDir, filename);
    if (!fs.existsSync(dest)) {
      console.log('Downloading', filename);
      try {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(dest, buffer);
      } catch (err) {
        console.error('Error downloading', filename, err);
      }
    } else {
      console.log('Already exists:', filename);
    }
  }
  console.log('Done downloading images.');
}

download();
