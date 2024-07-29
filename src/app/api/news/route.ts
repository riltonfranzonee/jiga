import { write } from "fs";
import { writeFile } from "fs/promises";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { parse } from 'node-html-parser';

// To handle a GET request to /api
export async function GET(req: NextApiRequest) {
  const {searchParams} = new URL(req.url!);
  const topic =  searchParams.get("topic")
  const query = topic?.split(" ").join("+")
  const res = await fetch(`https://www.google.com/search?q=${query}&sca_esv=ae95a0e0aab0d175&rlz=1C5CHFA_enBR1117BR1117&tbm=nws&sxsrf=ADLYWIL-5GlX8PyV7EtNX-daZkp3CBc2Pw:1722292707412&source=lnt&tbs=sbd:1&sa=X&ved=2ahUKEwi37pioqM2HAxV_E7kGHSODFjkQpwV6BAgCEBQ&biw=1440&bih=547&dpr=2`);
  const text = await res.text();
  const googleNewsDocument = parse(text);
  const headlines = googleNewsDocument.querySelectorAll('h3')
  const news = headlines.map(headline => ({
    title: headline.innerText,
    link: headline.parentNode.parentNode.parentNode.parentNode.getAttribute('href')?.replace("/url?q=", "").split("&sa")[0]
  }))

  return NextResponse.json({ news }, { status: 200 });
}
