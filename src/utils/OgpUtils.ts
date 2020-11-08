import { createCanvas, registerFont, loadImage, Canvas } from 'canvas';
import * as path from 'path';
import fs from 'fs';
import Blog from '../models/Blog';

interface SeparatedText {
  line: string;
  remaining: string;
}

const createTextLine = (canvas: Canvas, text: string): SeparatedText => {
  const context = canvas.getContext('2d');
  const maxWidth = 500;

  for (let i = 0; i < text.length; i += 1) {
    const line = text.substring(0, i + 1);

    if (context.measureText(line).width > maxWidth) {
      return {
        line,
        remaining: text.substring(i + 1),
      };
    }
  }

  return {
    line: text,
    remaining: '',
  };
};

const createTextLines = (canvas: Canvas, text: string): string[] => {
  const lines: string[] = [];
  let currentText = text;

  while (currentText !== '') {
    const separatedText = createTextLine(canvas, currentText);
    lines.push(separatedText.line);
    currentText = separatedText.remaining;
  }

  return lines;
};

const createOgp = async (blog: Blog): Promise<void> => {
  const id = blog.id as string;

  const width = 600;
  const height = 315;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  registerFont(path.resolve('./fonts/ipagp.ttf'), {
    family: 'ipagp',
  });

  const backgroundImage = await loadImage(
    path.resolve('./public/ogpBackground.png'),
  );

  context.drawImage(backgroundImage, 0, 0, width, height);
  context.font = '30px ipagp';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  const lines = createTextLines(canvas, blog.title);
  lines.forEach((line, index) => {
    const y = 157 + 40 * (index - (lines.length - 1) / 2);
    context.fillText(line, 300, y);
  });

  const buffer = canvas.toBuffer();

  fs.writeFileSync(path.resolve(`./public/ogp/${id}.png`), buffer);
};

// eslint-disable-next-line import/prefer-default-export
export { createOgp };
