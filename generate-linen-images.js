const fs = require('fs');
const path = require('path');

// Try to use sharp for image generation, if not available, create SVG-based textures
const createLinenTexture = async () => {
  try {
    const sharp = require('sharp');
    console.log('Using sharp library for high-quality linen textures...');
    
    const linens = [
      {
        name: 'linen-natural-light.jpg',
        colors: { r: 200, g: 190, b: 175 }, // Natural light linen
        description: 'Light Natural Linen'
      },
      {
        name: 'linen-ivory-cream.jpg',
        colors: { r: 240, g: 235, b: 220 }, // Ivory cream
        description: 'Ivory Cream Linen'
      },
      {
        name: 'linen-warm-beige.jpg',
        colors: { r: 210, g: 195, b: 175 }, // Warm beige
        description: 'Warm Beige Linen'
      },
      {
        name: 'linen-stone-gray.jpg',
        colors: { r: 180, g: 180, b: 180 }, // Stone gray
        description: 'Stone Gray Linen'
      }
    ];

    for (const linen of linens) {
      const width = 1920;
      const height = 1080;
      const { r, g, b } = linen.colors;

      // Create SVG with linen weave pattern
      const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
            <pattern id="weave" x="8" y="8" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="8" height="8" fill="rgba(0,0,0,0.02)"/>
              <rect x="8" y="8" width="8" height="8" fill="rgba(0,0,0,0.02)"/>
              <line x1="0" y1="0" x2="16" y2="0" stroke="rgba(0,0,0,0.01)" stroke-width="1"/>
              <line x1="0" y1="8" x2="16" y2="8" stroke="rgba(0,0,0,0.01)" stroke-width="1"/>
              <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(0,0,0,0.01)" stroke-width="1"/>
              <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(0,0,0,0.01)" stroke-width="1"/>
            </pattern>
          </defs>
          
          <!-- Base color -->
          <rect width="${width}" height="${height}" fill="rgb(${r},${g},${b})"/>
          
          <!-- Weave texture -->
          <rect width="${width}" height="${height}" fill="url(#weave)"/>
          
          <!-- Subtle noise overlay -->
          <rect width="${width}" height="${height}" fill="url(#weave)" opacity="0.3" filter="url(#noise)"/>
          
          <!-- Subtle vignette -->
          <defs>
            <radialGradient id="vignette" cx="50%" cy="50%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.05)"/>
              <stop offset="100%" stop-color="rgba(0,0,0,0.1)"/>
            </radialGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#vignette)"/>
        </svg>
      `;

      // Save using sharp
      await sharp(Buffer.from(svg))
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, 'public', 'assets', linen.name));
      
      console.log(`✓ Generated ${linen.name}`);
    }
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('Sharp not available. Installing sharp...');
      require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
      // Retry after installation
      return createLinenTexture();
    }
    throw error;
  }
};

// Run the generation
createLinenTexture()
  .then(() => {
    console.log('\n✓ All linen fabric backgrounds generated successfully!');
    console.log('Images saved to: public/assets/');
  })
  .catch(error => {
    console.error('Error generating images:', error);
    process.exit(1);
  });
