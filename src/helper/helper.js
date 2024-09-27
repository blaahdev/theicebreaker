export const uniqueId = () => {
  return new Date().toISOString() + Math.random().toString(36).substring(2, 10);
};

// --------- COLORS
// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Helper function to convert RGB back to hex
function rgbToHex(r, g, b) {
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

// Function to generate a gradient between two colors
function generateColorRange(color1, color2, steps) {
  const start = hexToRgb(color1);
  const end = hexToRgb(color2);
  const colors = [];

  for (let i = 0; i <= steps; i++) {
    const r = Math.round(start.r + ((end.r - start.r) * i) / steps);
    const g = Math.round(start.g + ((end.g - start.g) * i) / steps);
    const b = Math.round(start.b + ((end.b - start.b) * i) / steps);
    colors.push(rgbToHex(r, g, b));
  }

  return colors;
}

// Generate 10 colors between "#eaef85" and "#372cbf"
const colors = generateColorRange("#eaef85", "#37c2bf", 9);
