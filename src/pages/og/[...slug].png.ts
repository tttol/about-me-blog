import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title } = props as { title: string };
  const fontData = await loadGoogleFont(`${title}${SITE_TITLE}`);
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
            type: 'div',
            props: {
              style: {
                fontSize: '70px',
                fontWeight: 700,
                color: 'white',
                textAlign: 'left',
                lineHeight: 1.4,
                maxWidth: '1000px',
                wordBreak: 'break-word',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
              },
              children: [
                {
                  type: 'img',
                  props: {
                    src: profileImage,
                    style: {
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      marginRight: '16px',
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '28px',
                      color: 'rgba(255, 255, 255, 0.8)',
                    },
                    children: SITE_TITLE,
                  },
                },
              ],
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
