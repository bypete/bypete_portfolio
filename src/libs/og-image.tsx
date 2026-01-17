import satori, { type SatoriOptions } from 'satori';
import sharp from 'sharp';

async function getFontData(url: string) {
  const fontResponse = await fetch(url);
  return await fontResponse.arrayBuffer();
}

const [AritaBuri, AritaBuriBold] = await Promise.all([
  getFontData(
    'https://cdn.jsdelivr.net/gh/taevel02/typeface-arita/Arita-buriM.woff',
  ),
  getFontData(
    'https://cdn.jsdelivr.net/gh/taevel02/typeface-arita/Arita-buriB.woff',
  ),
]);

const satoriOption: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Arita Buri',
      data: AritaBuri,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Arita Buri',
      data: AritaBuriBold,
      weight: 700,
      style: 'normal',
    },
  ],
};

export async function generateOgImage({
  title,
  desc,
  noFooter,
}: {
  title: string;
  desc?: string;
  noFooter?: boolean;
}) {
  const svg = await satori(
    <div
      style={{
        fontFamily: 'Arita Buri',
        // 스타일 설정
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '16px',
        height: '100%',
        width: '100%',
        padding: '80px',
        color: '#000',
        backgroundColor: '#fff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div style={{ fontSize: '64px', fontWeight: 700 }}>{title}</div>
      {desc && (
        <div style={{ marginTop: '20px', fontSize: '32px', color: '#464646' }}>
          {desc}
        </div>
      )}
      {!noFooter && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '32px',
            color: '#464646',
          }}
        >
          bepyan.me
        </div>
      )}
    </div>,
    satoriOption,
  );

  const image = sharp(Buffer.from(svg)).png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    palette: true,
    quality: 80,
  });
  return await image.toBuffer();
}