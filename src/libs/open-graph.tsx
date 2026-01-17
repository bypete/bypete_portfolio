import fs from "node:fs/promises";
import path from "node:path";
import interSans400Normal from "@fontsource/inter/files/inter-latin-400-normal.woff?arraybuffer";
import redditSansCondensed900Normal from "@fontsource/reddit-sans-condensed/files/reddit-sans-condensed-latin-900-normal.woff?arraybuffer";
import type { JSX } from "preact";
import type { SatoriOptions } from "satori";
import satori from "satori";
import sharp from "sharp";

const satoriOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Inter",
      data: interSans400Normal,
      weight: 400,
      style: "normal",
    },
    {
      name: "Reddit Sans Condensed",
      data: redditSansCondensed900Normal,
      weight: 900,
      style: "normal",
    },
  ],
};


function ByPeteLogo(props: JSX.SVGAttributes<SVGSVGElement>) {
  return (
    <svg id="uuid-414d6db2-4b5f-47f2-a463-0af8abef4a21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1344 448" {...props}><title style={{ display: 'none' }}>Logo</title> <path d="M32,32v192c0-53.02,42.98-96,96-96s96,42.98,96,96-42.98,96-96,96-96-42.98-96-96" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M224,96v128c0,52.66,43.34,96,96,96s96-43.34,96-96V96v320" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M544,416v-192c0,53.02,42.98,96,96,96s96-42.98,96-96-42.98-96-96-96-96,42.98-96,96" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M880,307.24c-14.59,8.43-31.15,12.86-48,12.86-52.66,0-96-43.34-96-96s43.34-96,96-96c34.25,0,66.01,18.33,83.14,48l-165.93,95.8,304.23-175.65" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M928,32s0,112,0,192.3c0,52.66,43.34,96,96,96,16.85,0,33.41-4.44,48-12.86l227.14-131.34" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M1264,307.24c-14.59,8.43-31.15,12.86-48,12.86-52.66,0-96-43.34-96-96s43.34-96,96-96c34.25,0,66.01,18.33,83.14,48l-165.93,95.8" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /></svg>
  )
}


export const BackgroundImage = async (brightness = 0.6) => {
  const backgroundImage = await fs.readFile(
    path.resolve("./public/images/opengraph.png"),
  );
  return {
    type: "img",
    props: {
      src: backgroundImage.buffer,
      style: {
        position: "absolute",
        width: "1200px",
        height: "630px",
        objectFit: "cover",
        filter: `brightness(${brightness})`,
      },
    },
  };
};

function toArrayBuffer(buffer?: Buffer): ArrayBuffer | undefined {
  if (!buffer) return undefined;
  // Modern & simple: Buffer implements .buffer as ArrayBufferView, but slice safely
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}


export async function generateOgImage({
  title,
  subTitle,
  backgroundBuffer,
}: {
  title: string;
  subTitle: string;
  backgroundBuffer?: Buffer;
}): Promise<Response> {

  // const backgroundSrc = backgroundBuffer ? toArrayBuffer(backgroundBuffer) : undefined;

  const base64 = backgroundBuffer
    ? (await sharp(backgroundBuffer).png().toBuffer()).toString('base64')
    : null;


  const content = (
    <div
      style={{
        height: "630px",
        width: "1200px",
        display: 'flex',
        position: 'relative',
        alignItems: 'stretch',
        textAlign: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#ffffff',
      }}
    >

      {base64 && (
        <img src={base64 ? `data:image/png;base64,${base64}` : ''} alt="Project" style={{
          position: "absolute", display: 'block', top: 0, right: 0, height: '100%', width: '50%',
          objectFit: "cover", objectPosition: "center",
        }} />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: '660px',
          height: '630px',
          padding: '5%',
          position: 'relative',
          clipPath: 'polygon(0px 0px, 600px 0px, 660px 210px, 600px 630px, 0px 630px, 0px 0px)',
          overflow: 'hidden',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          fontStyle: 'normal',
          color: 'black',
          backgroundColor: '#E60E5B',
          backgroundImage: 'linear-gradient(to bottom, rgba(230, 14, 91, 1) 60% , rgba(148, 0, 60, 1) 100%)',
          textAlign: 'left',
          lineHeight: 1.2,
          whiteSpace: 'pre-wrap',
        }}
      >
        <svg height="60" id="uuid-414d6db2-4b5f-47f2-a463-0af8abef4a21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1344 448" ><title style={{ display: 'none' }}>Logo</title> <path d="M32,32v192c0-53.02,42.98-96,96-96s96,42.98,96,96-42.98,96-96,96-96-42.98-96-96" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M224,96v128c0,52.66,43.34,96,96,96s96-43.34,96-96V96v320" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M544,416v-192c0,53.02,42.98,96,96,96s96-42.98,96-96-42.98-96-96-96-96,42.98-96,96" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M880,307.24c-14.59,8.43-31.15,12.86-48,12.86-52.66,0-96-43.34-96-96s43.34-96,96-96c34.25,0,66.01,18.33,83.14,48l-165.93,95.8,304.23-175.65" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M928,32s0,112,0,192.3c0,52.66,43.34,96,96,96,16.85,0,33.41-4.44,48-12.86l227.14-131.34" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /><path d="M1264,307.24c-14.59,8.43-31.15,12.86-48,12.86-52.66,0-96-43.34-96-96s43.34-96,96-96c34.25,0,66.01,18.33,83.14,48l-165.93,95.8" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="64" /></svg>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
          <h1 style={{
            color: 'white',
            fontSize: 64,
            fontFamily: 'Reddit Sans Condensed',
            textShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
            fontWeight: 900,
            margin: '0 0 8px 0',
            padding: 0,
          }}>{title}</h1>
          <p style={{
            color: 'white',
            fontSize: 24,
            margin: 0,
            textAlign: 'left',
            display: 'block',
          }}>{subTitle}</p>
        </div>

      </div>

    </div>
  );

  const svg = await satori(content, satoriOptions);

  const png = await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
