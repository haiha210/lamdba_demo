const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const Handlebars = require("handlebars");
const fs = require("fs");

exports.handler = async (event) => {
  chromium.setHeadlessMode = true;
  chromium.setGraphicsMode = false;
  await chromium.font(
    "/opt/fonts/NotoSansJP-VariableFont_wght.ttf"
  );

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  const templateContent = fs.readFileSync('/opt/nodejs/pdfs/index.hbs', 'utf-8');
  const template = Handlebars.compile(templateContent, { strict: true });
  const edBase64 = fs.readFileSync("/opt/nodejs/pdfs/a.png").toString("base64")

  const contentHtml = template({ edBase64 });
  await page.setContent(contentHtml, { waitUntil: "networkidle2" })

  await page.emulateMediaType('screen');

  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4',
    // scale: 1.32,
  });

  await browser.close();

  const response = {
    statusCode: 200,
    body: pdf.toString("base64")
  };
  return response;
};
