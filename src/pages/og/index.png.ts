import type { APIRoute } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { SITE_TITLE } from '../../consts';

const WIDTH = 1200;
const HEIGHT = 630;

function loadProfileImage(): string {
  const imagePath = path.join(process.cwd(), 'public/images/me.jpg');
  const imageBuffer = fs.readFileSync(imagePath);
  return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
}

async function loadGoogleFont(text: string): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(API)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!resource) {
    throw new Error('Failed to load font');
  }
  const response = await fetch(resource[1]);
  return response.arrayBuffer();
}

export const GET: APIRoute = async () => {
  const fontData = await loadGoogleFont(SITE_TITLE);
  const profileImage = loadProfileImage();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #2a4a7a, #5e3a7a, #7a2a55)',
          padding: '60px',
        },
        children: [
          {
            type: 'img',
            props: {
              src: profileImage,
              style: {
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                marginBottom: '40px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '91px',
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
              },
              children: SITE_TITLE,
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
