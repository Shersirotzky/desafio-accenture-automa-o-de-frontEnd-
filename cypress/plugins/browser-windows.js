const assert = require('node:assert/strict');
const { mkdir } = require('node:fs/promises');
const { retry } = require('@cypress/puppeteer');

let originalTargets = new Set();

async function targetId(target) {
  const session = await target.createCDPSession();
  try {
    const { targetInfo } = await session.send('Target.getTargetInfo');
    return targetInfo.targetId;
  } finally {
    await session.detach();
  }
}

module.exports = {
  async rememberWindows(browser) {
    const pages = (await browser.pages()).map((page) => page.target());
    originalTargets = new Set(await Promise.all(pages.map(targetId)));
    return originalTargets.size;
  },

  async validateAndCloseNewWindow(browser) {
    const target = await retry(
      async () => {
        const candidates = browser
          .targets()
          .filter(
            (item) =>
              item.type() === 'page' &&
              item.url() === 'https://demoqa.com/sample',
          );
        for (const candidate of candidates) {
          if (!originalTargets.has(await targetId(candidate))) {
            return candidate;
          }
        }
        assert.fail(
          'New Window did not open a new real /sample browser target',
        );
      },
      { timeout: 5000 },
    );

    const page = await target.page();
    let text;
    try {
      await page.bringToFront();
      await page.waitForSelector('#sampleHeading', { timeout: 5000 });
      text = await page.$eval(
        '#sampleHeading',
        (heading) => heading.textContent,
      );
      assert.equal(text, 'This is a sample page');
      await mkdir('reports', { recursive: true });
      await page.screenshot({ path: 'reports/browser-window.png' });
    } finally {
      await page.close();
    }
    assert.ok(page.isClosed(), 'The new window must be closed');
    assert.ok(
      !browser.targets().includes(target),
      'The browser target must be removed',
    );
    return { opened: true, text, closed: page.isClosed() };
  },
};
