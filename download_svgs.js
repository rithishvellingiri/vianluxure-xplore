const fs = require('fs');
const path = require('path');

const folders = [
  'public/logo',
  'public/icons',
  'public/images'
];

folders.forEach(f => {
  const dir = path.join(__dirname, f);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const assets = {
  "public/logo/VL_Global.svg": "https://vianluxure.com/VL%20Global.svg",
  "public/logo/FooterLogo.svg": "https://vianluxure.com/FooterLogo.svg",
  "public/logo/VL.png": "https://vianluxure.com/VL.png",
  "public/icons/header-hover.svg": "https://vianluxure.com/HeaderIcon/Hover.svg",
  "public/icons/wishlist.svg": "https://vianluxure.com/HeaderIcon/WishList.svg",
  "public/icons/cart.svg": "https://vianluxure.com/HeaderIcon/Cart.svg",
  "public/icons/profile.svg": "https://vianluxure.com/HeaderIcon/Person.svg",
  "public/icons/fb.svg": "https://vianluxure.com/FooterIcon/fb.svg",
  "public/icons/insta.svg": "https://vianluxure.com/FooterIcon/Insta.svg",
  "public/icons/twitter.svg": "https://vianluxure.com/FooterIcon/Twitter.svg",
  "public/icons/youtube.svg": "https://vianluxure.com/FooterIcon/YouTube.svg",
  "public/icons/accordion-close.svg": "https://vianluxure.com/AccordianClose.svg",
  "public/icons/accordion-open.svg": "https://vianluxure.com/AccordianOpen.svg",
  "public/icons/shirt-logo.svg": "https://vianluxure.com/CustomTailored/shirt-logo.svg",
  "public/icons/user-logo.svg": "https://vianluxure.com/CustomTailored/user-logo.svg",
  "public/icons/search-logo.svg": "https://vianluxure.com/CustomTailored/search-logo.svg",
  "public/icons/tic-icon.svg": "https://vianluxure.com/CustomTailored/tic-icon.svg",
  "public/icons/phone-logo.svg": "https://vianluxure.com/Contact/phone-logo.svg",
  "public/icons/arrow.svg": "https://vianluxure.com/Contact/arrow.svg",
  "public/icons/location-logo.svg": "https://vianluxure.com/Contact/location-logo.svg",
  "public/icons/mail-logo.svg": "https://vianluxure.com/Contact/mail-logo.svg",
  "public/icons/form-bg.svg": "https://vianluxure.com/Contact/form-bg.svg",
  "public/images/shirt-sketch.svg": "https://vianluxure.com/Home/Shirtsketch.svg",
  "public/images/vision.svg": "https://vianluxure.com/Vision.svg",
  "public/images/mission-img.webp": "https://vianluxure.com/Missionimg.webp",
  "public/images/bespoke-why.webp": "https://vianluxure.com/bespokewhy.webp",
  "public/images/readytowear-why.webp": "https://vianluxure.com/readytowearwhy.webp",
  "public/images/customer-review-4.webp": "https://vianluxure.com/Register/customer/customer4.webp",
  "public/images/customer-review-3.webp": "https://vianluxure.com/Register/customer/customer3.webp",
  "public/images/customer-review-2.webp": "https://vianluxure.com/Register/customer/customer2.webp",
  "public/images/customer-review-section.webp": "https://vianluxure.com/Register/customer/review_section.webp",
  "public/images/profile-boy.svg": "https://vianluxure.com/boy%20profile.svg"
};

async function downloadAll() {
  console.log('Starting download of Vian Luxure branding assets...');
  for (const [filename, url] of Object.entries(assets)) {
    const dest = path.join(__dirname, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      console.log(`Already exists: ${filename}`);
      continue;
    }
    console.log(`Downloading ${url} -> ${filename}`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to download: ${url} - Status ${res.statusText}`);
        continue;
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(dest, buffer);
      console.log(`✓ Successfully saved: ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${url}:`, err.message);
    }
  }
  console.log('Asset downloads complete.');
}

downloadAll();
