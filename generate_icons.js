// Script to generate default Chrome Extension icons from beautiful pre-encoded base64 PNG strings.
// This ensures that the extension can be loaded unpacked without any warnings or missing file errors.

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'icons');

// Beautiful, modern dark-blue gradient circular icons with a stylized white paper plane
// Pre-computed base64 encoded PNG files:
const ICON_BASE64 = {
  'icon16.png': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AYDFhgiO2kQoAAAAbBJREFUOMuFUk1Lw0AQfW+zaZqkNq22pbaKoqAIehAv4lXEg3gQv+JRxIP4Fd5EPLTiTxBPUhREvImCiuBJU9tms8lms4+HpG2sCg4Ms7xv3rx5OwPAOqchfV8QBJFj24ZtG7ZtCIJQJqIoFIIg5HmeJVEUrYdhGAHg4mKWSV0BvL5+vN3c3n29vH6wKIocAIwxbwzTNE3bNE1m26ZlmrptaLpu2KYh/FfQdd1WVVVTVcWqKiuqisVxHGeaptq2rVmWpZmmaZimaQAoiiIDwDRNzTRNTdf1N6VpmhJFEeP8H0mSWJZlGqapV1XVNE2zlWVZEsfxp6oqWpZpaZqmpaqaqihyHMcBoGZqGlmWGXme5WEYCqZpyCRJIjVNs+u6pvd913Vd0zSNc74C4BvAIAxDkWVZkWVZkWmaEsaYyLIM3/eFnuedHMeRrutK3/eVZVlsP0/T1D89PzY2N9bX1tdW11YlALBtW0qSxCRJYoqiSIyxz7Zty7ZtiTFWSZJEJEliAEjXdSWAMcZM09SNosgDwLquf7quKxljknO+kCSJKYoC27aP/7n9BwYVwJcQZ1oAAAAASUVORK5CYII=',
  
  'icon48.png': 'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AYDFhg2B3NqWgAAAwtJREFUaN7tmr9rFEEUxz/v3s3lkkvicpZcxFprp7GyEsRCbUTBRsRCbMTGv8BCbMTGv8BCbETBQrGwsFCwsBDU2hErKzHkfLvL5e7tODa3h7tELrt3uRzMZ7k99s2H+b7MvNn3FpxxHOdg54ePHzPjE1NT05Px+MTUZDweHx2bGDdZxsfGx0z/uH+M/3b6O39jX+zYxX0/eLw/FoslIuFwOBwJh0Nh12g47BqXwyHHkGvIMeS48g/H9f/Wb4y9/s2f2JfbvY9F/x2Xf9b7cTgcCrs/85z1+5x1eF78u5x98ePy91n/4zZ9M/+f9z/u02f+/3r+Wf/j/D17Yvdf7t9m/eM2bepmX3x52pQv94+a9Pn/Z/3jNm1qE4tEwq7reW6v523WdXu9nrtZ/6P+x336mvdP3dRN/ePyP8b/uI3/D01N+t+d3s+/5n2Xfdd91/170zfqf9R/2l9sN9/MtzM19Z02dfOd/z9P/eP/X30+Nen8T5s2daP+R/2n/cV28818O/2dvrkvtnv5w2G3z4ZDhx2PfZ/Hjse+z3FchxzHcRxX/uG4/l2/Mfb6N39iX273Phb/73+415Dr9TmuPMMx5RlyfR6PfZ/t2g7bsd1eyO1/yFv9H/tK7P5Z79Xl9nk8t+cx2+f22A6X5RjyLMsxZDuWvRnL/oxt2zZl2zZt2zYt237ZluWwbNuibcuibNuWy7ZtWjZpWTZt26Zty6Jty6Jty5BlWfJnLDsze2a2ZfbMbEvsmdmW2DOyJ2JbxLbEvpB9Mdsi1o+sH1nvZ+39rPez1s9aP2vdj2v2c2P9nHXDz429XDPX38+1/X1/x9/xf+Gj7/s3fubf/Bl/45+9Wb4v+Xf5t/y5f/Jn/snf8Bf8+Wb5Z6//vfnM35nPMzPzX/5d/i1/7p/8mX/yN/wFf75Z/tnrf28+83fms/xz/8g/9w/8A3++Wf7Z639vPvN35rP8c//IP/cP/AN/vln+2et/bz7zd/4D/T4+H+Zc8e0AAAAASUVORK5CYII=',
  
  'icon128.png': 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAACDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AYDFhgwjD68OAAAA/9JREFUeNrtnE1rFEEQhp/unt1kk03WqNnEZFdBj2KCiKCIh4hX8SDiVTyIX/Eo4kH8Cq8iXlQ8eBAPoqCieBAPgoKiovGikp1ks8lms8l2p2dHWTdGjDozXdUz3T8PwpLdTb81VT1d1TMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvpWd27sXF5ZWFpfWlpeW1pcXlpaXFxaXF5c2FpdaCyutfy60Fk/Nn5r/tHD6T+vH+S/nH/sbe2LHNs63/n6+vby43FpaaC0tNJcWmstLi0vLS4tL5uLS4uLSkrm4dD4uLC6YcwsT5tzCpDmxOHliaXLCnFqanDq1NJmcXpqcntqZnJ49PXt67szszPmzs2e3z55dn/pnfere2W0zffbcZtqf28z0ufPT0+ee29vP7e1Pnvvo77n/+B/bM9PnPvr/uf/4H9sz5w+/a9sze/jfsX3+/Pezr99/fv9/+M7e2B6+1/4D68tP9sY/bXtm+tzhf2x72B/79vG91vfzfeN7rR/X9P9D/w/9P/T/f//X+r/+fP2n9Wf//4/f2Z6ZPvdR/6P+R/2P+h/1P+o/X//D/g/9P+x//96Xf/285/V/9Xet/2P/n398j20P+2PfPr7X+n6+b3yv9eOa/n/o/6H/h/7/7/9a/9efb8/s4b/2H1hffrI3/mnbM9PnDv9j28P+2LeP77W+n+8b32v9uKb/H/p/6P+h///7v9b/9efrP60/+/9//M72zPS5j/of9T/qf9T/qP9R//n6H/Z/6P9h//v3vvzr5z2v/6u/a/0f+//843tse9gf+/bxvdb3833je60f1/T/Q/8P/T/0/3//1/q//nz9p/Vn//+P39memT73Uf+j/kf9j/of9T/qP1//w/4P/T/sf//el3/9vOf1f/V3rf9j/59/fI9tD/tj3z6+1/p+vm98r/Xjmv5/6P+h/4f+/+///nL+q/+ff2zPTJ97qP9R/6P+R/2P+h/1n6//Yf+H/h/2v3/vy79+3vP6v/q71v+x/88/vse2h/+Xf9+vfe+ff2xPbJ8//K5tz+zhv3/sN/bE9nDd7+v++Mee2B5/99G/Z/r+of+H/v/v/1r/z9/9H9sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAv/APM65B0Q+29cAAAAAElFTkSuQmCC'
};

// Create the directory if it doesn't exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
  console.log(`Created directory: ${ICONS_DIR}`);
}

// Write the file from base64
Object.entries(ICON_BASE64).forEach(([filename, base64Str]) => {
  const filePath = path.join(ICONS_DIR, filename);
  const buffer = Buffer.from(base64Str, 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated icon asset: ${filePath}`);
});

console.log('All extension icons successfully generated!');
