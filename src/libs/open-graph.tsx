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
    <svg id="uuid-414d6db2-4b5f-47f2-a463-0af8abef4a21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1344 448" {...props}><title style={{ display: 'none' }}>Logo</title> <path d="M32,32v192c0-53.02,42.98-96,96-96s96,42.98,96,96-42.98,96-96,96-96-42.98-96-96" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="64" /><path d="M224,96v128c0,52.66,43.34,96,96,96s96-43.34,96-96V96v320" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="64" /><path d="M544,416v-192c0,53.02,42.98,96,96,96s96-42.98,96-96-42.98-96-96-96-96,42.98-96,96" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="64" /><path d="M880,307.24c-14.59,8.43-31.15,12.86-48,12.86-52.66,0-96-43.34-96-96s43.34-96,96-96c34.25,0,66.01,18.33,83.14,48l-165.93,95.8,304.23-175.65" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="64" /><path d="M928,32s0,112,0,192.3c0,52.66,43.34,96,96,96,16.85,0,33.41-4.44,48-12.86l227.14-131.34" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="64" /><path d="M1264,307.24c-14.59,8.43-31.15,12.86-48,12.86-52.66,0-96-43.34-96-96s43.34-96,96-96c34.25,0,66.01,18.33,83.14,48l-165.93,95.8" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="64" /></svg>
  )
}

const maskBlob = `<svg id="uuid-748afc55-7510-4e5b-be04-6ebe75570d19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630"><path fill="white" d="M341.99,605.23c-48.32,0-91.75-10.71-129.09-31.83-42.08-23.8-78.24-61.8-107.46-112.93-32.36-56.62-57.3-131.19-74.14-221.63C13.01,140.54,3.73,20.51,3.73-117.91c0-45.94,60.34-99.3,161.42-142.74,49.16-21.13,105.71-38.75,163.54-50.95,62.03-13.08,123.19-19.72,181.79-19.72,80.06,0,150.09,12.37,208.17,36.77,65.18,27.39,113.11,69.33,142.46,124.68,59.22,111.66,95.83,204.94,111.93,285.16,15.02,74.85,11.82,137-9.77,189.99-26.3,64.54-79.96,115.74-168.87,161.14-81.05,41.39-185.11,74.62-295.27,109.81l-7.09,2.27c-56.31,17.99-105.39,26.73-150.04,26.73h0Z" opacity=".97"/><path fill="white" d="M510.48-326.32c38.15,0,74.59,2.92,108.3,8.67,35.7,6.09,68.64,15.41,97.93,27.72,64.09,26.93,111.19,68.11,139.98,122.41,29.61,55.83,54.01,108.19,72.54,155.64,18.01,46.13,31.1,89.25,38.91,128.16,14.82,73.86,11.71,135.07-9.5,187.12-25.82,63.36-78.73,113.75-166.51,158.58-80.69,41.21-184.55,74.38-294.52,109.5l-7.1,2.27c-55.81,17.83-104.39,26.49-148.52,26.49-23.04,0-45.07-2.46-65.46-7.3-21.69-5.16-42.27-13.19-61.16-23.87-20.06-11.35-38.88-26.06-55.95-43.72-18.11-18.74-34.81-41.4-49.63-67.33-32.08-56.13-56.83-130.17-73.56-220.07C17.98,139.92,8.73,20.2,8.73-117.91c0-21.34,14.61-45.37,42.25-69.49,27.69-24.16,67.85-47.9,116.14-68.66,48.86-21,105.09-38.51,162.6-50.65,61.69-13.01,122.5-19.61,180.75-19.61M510.48-336.32C266.67-336.32-1.27-219.6-1.27-117.91c0,578.13,158.58,728.14,343.26,728.14,49.5,0,100.87-10.77,151.56-26.97,390.98-124.89,662.49-207.71,371.97-755.48-63.49-119.7-204.68-164.11-355.05-164.11h0Z"/><path fill="white" d="M24.03-160.88c17.56-171.54,480.98-242,673.51,73.97,395.27,648.69-148.89,679.74-447.17,672.73C17.73,580.36-.64,80.07,24.03-160.88Z" opacity=".15"/><path fill="white" d="M31.14-227.45c36.81-172.77,572.67-204.06,761.56,133.75,387.8,693.52-236.37,677.75-576.16,644.68C-48.48,525.2-20.57,15.25,31.14-227.45Z" opacity=".05"/></svg>`

function svgToMaskDataUrl(svg: string): string {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

const maskImage = svgToMaskDataUrl(maskBlob);

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
        width: "1200px",
        height: "630px",
        display: 'flex',
        position: 'relative',
        alignItems: 'stretch',
        textAlign: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#ecebe8',
      }}
    >


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: 'border-box',
          padding: '5%',
          width: '570px',
          height: '630px',
          position: 'relative',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          fontStyle: 'normal',
          color: '#14151A',
          textAlign: 'left',
          lineHeight: 1.2,
        }}
      >
        <ByPeteLogo height="60" style={{ color: '#14151A' }} />

        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
          <h1 style={{
            fontSize: 60,
            fontFamily: 'Reddit Sans Condensed',
            textShadow: '0px 1px 3px rgba(255, 255, 255, 0.25)',
            fontWeight: 900,
            lineHeight: 1,
            margin: '0 0 8px 0',
            padding: 0,
          }}>{title}</h1>
          <p style={{
            fontFamily: 'Inter',
            fontSize: 24,
            fontWeight: 400,
            margin: 0,
            textAlign: 'left',
            display: 'block',
          }}>{subTitle}</p>
        </div>

      </div>
      <div
        style={{
          display: 'flex',
          width: '630px',
          height: '630px',
          maskImage: maskImage,
          maskSize: '100% 100%',
          backgroundColor: '#E60E5B',
        }}>
        {base64 && (
          <img src={base64 ? `data:image/png;base64,${base64}` : ''} alt="Project" style={{
            display: 'block', height: '100%', width: '100%',
            objectFit: "cover", objectPosition: "center",
          }} />
        )}
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
