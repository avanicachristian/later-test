import { browser, Config } from 'protractor';
const dateTime = Date.now();
export const config: Config = {
    allScriptsTimeout: 60000,
    //  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        // MicrosoftEdge  //firefox // internet explorer // chrome
    },
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000,
        isVerbose: true,
        showColors: true,
    },
    noGlobals: false,
    onPrepare() {
        browser.driver.manage().window().maximize();
        browser.driver.manage().timeouts().pageLoadTimeout(60000);
        browser.waitForAngularEnabled(false);
     //   browser.get(TestData.appURL, 30000);
     //   browser.waitForAngularEnabled(true);
        // browser.waitForAngular ();
        const fs = require('fs-extra');
        fs.emptyDir(`./report/${dateTime}/screenshots/`, (err: any) => {
            console.log(err);
        });
        const jasmineReporters = require('../customreport');
        jasmine.getEnv().addReporter(new jasmineReporters.CustomXmlReporter({
            consolidateAll: true,
            filePrefix: 'xmlresults',
            savePath: `./report/${dateTime}`,
        }));
        jasmine.getEnv().addReporter({
            specDone: (result) => {
                if (result.status !== 'failed') {
                    return;
                }
                browser.getCapabilities().then((caps) => {
                    const browserName = caps.get('browserName');
                    browser.takeScreenshot().then((png) => {
                        const stream = fs.createWriteStream(`./report/${dateTime}/screenshots/${browserName}-${result.id}.png`);
                        stream.write(Buffer.from(png, 'base64'));
                        stream.end();
                    });
                });
            },
        });
    },

    onComplete() {
        let browserName: string;
        let browserVersion: string;
        let platform: string;
        let testConfig: object;
        const capsPromise = browser.getCapabilities();

        capsPromise.then((caps) => {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            const HTMLReport = require('../customreport');

            testConfig = {
                browserVersion,
                modifiedSuiteName: false,
                outputFilename: 'ProtractorTestReport',
                outputPath: `./report/${dateTime}`,
                reportTitle: 'Protractor Test Execution Report',
                screenshotPath: './screenshots',
                screenshotsOnlyOnFailure: false,
                testBrowser: browserName,
                testPlatform: platform,
            };
            new HTMLReport().from(`./report/${dateTime}/xmlresults.xml`, testConfig);
        });
    },

};