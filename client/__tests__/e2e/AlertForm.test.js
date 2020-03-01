import "regenerator-runtime/runtime";
import faker from 'faker';
import puppeteer from 'puppeteer';
import UserAgent from 'user-agents';

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
let browser
let page

describe('AlertForm e2e tests', () => {
  it('renders correctly', async () => {
    if (!browser) browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 250,
      executablePath: process.env.CHROMIUM_PATH,
      args: ['--no-sandbox'], 
    });
    if (!page) page = await browser.newPage();
    page.emulate({
      viewport: { width: 360, height: 640 },
      userAgent: (new UserAgent({ deviceCategory: 'mobile' })).toString()
    });
    await page.goto(baseUrl);
    await page.waitForSelector('#createButton');
    await page.click('#createButton');
    await page.waitForSelector('.alert-form');
    browser.close()
    page = null;
    browser = null;
  });
})

