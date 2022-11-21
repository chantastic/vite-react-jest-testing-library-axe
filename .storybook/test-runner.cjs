const { injectAxe, checkA11y } = require("axe-playwright");

module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    // automate accessibility Jest snapshot tests
    await checkA11y(page, "#root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    const accessibilityTree =
      await page.accessibility.snapshot();
    expect(accessibilityTree).toMatchSnapshot();

    // automate Jest snapshot tests
    const elementHandler = await page.$("#root");
    const innerHTML = await elementHandler.innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};
