const dateTime = Date.now();
var path = require("path");
const downloadsPath = path.resolve(__dirname, "../__test__/downloads");

exports.config = {
    allScriptsTimeout: 60000,
    capabilities: 
    {
        browserName: "chrome",
        chromeOptions: {
            args: [
             //   "--headless",
                "no-sandbox",
                "--disable-dev-shm-usage",
                "--window-size=1920,1080"
            ],
            prefs: {
                download: {
                    'prompt_for_download': false,

                    'default_directory': downloadsPath,
               
                    'directory_upgrade': true,

                }
            }
        }
    },
    localSeleniumStandaloneOpts: {
        jvmArgs: ["-Dwebdriver.ie.driver=.\\node_modules\\webdriver-manager\\selenium\\IEDriverServer3.150.1.exe"] 
    },

    directConnect: false,
    framework: "jasmine",
    jasmineNodeOpts: {
        defaultTimeoutInterval: 1000000,
        isVerbose: true,
        showColors: true,
    },
    noGlobals: false,
    suites: {
      linkinBioFunctionality: [
            "./linkinBio/tc01.spec.ts",
            "./linkinBio/tc02.spec.ts",
      ],
    },
    onPrepare() {
        require("ts-node").register({
            project: "./tsconfig.json"
        })
        browser.driver.manage().window().maximize();
        browser.driver.manage().timeouts().pageLoadTimeout(60000);
        const fs = require("fs-extra");
        fs.emptyDir(`./report/${dateTime}/screenshots/`, (err) => {
            console.log(err);
        });
        const jasmineReporters = require("../customreport");
        jasmine.getEnv().addReporter(new jasmineReporters.CustomXmlReporter({
            consolidateAll: true,
            filePrefix: "xmlresults",
            savePath: `./report/${dateTime}`,
        }));
        // setup console reporter
        const JasmineConsoleReporter = require('jasmine-console-reporter');
        jasmine.getEnv().addReporter(new JasmineConsoleReporter({
            colors: 1, // (0|false)|(1|true)|2
            cleanStack: 1, // (0|false)|(1|true)|2|3
            verbosity: 4, // (0|false)|1|2|(3|true)|4|Object
            listStyle: 'indent', // "flat"|"indent"
            timeUnit: 'ms', // "ms"|"ns"|"s"
            timeThreshold: {
                ok: 500,
                warn: 1000,
                ouch: 3000
            }, // Object|Number
            activity: true,
            emoji: true, // boolean or emoji-map object
            beep: true
        }));
        jasmine.getEnv().addReporter({
            specDone: (result) => {
                // if (result.status !== "failed") {
                //     return;
                // }
                browser.getCapabilities().then((caps) => {
                    const browserName = caps.get("browserName");
                    browser.takeScreenshot().then((png) => {
                        const stream = fs.createWriteStream(`./report/${dateTime}/screenshots/${browserName}-${result.id}.png`);
                        stream.write(Buffer.from(png, "base64"));
                        stream.end();
                    });
                });
            },
        });
    },

    onComplete() {
        let browserName;
        let browserVersion;
        let platform;
        let testConfig;
        const capsPromise = browser.getCapabilities();

        capsPromise.then((caps) => {
            browserName = caps.get("browserName");
            browserVersion = caps.get("version");
            platform = caps.get("platform");

            const HTMLReport = require("../customreport");

            testConfig = {
                browserVersion,
                modifiedSuiteName: false,
                outputFilename: "ProtractorTestReport",
                outputPath: `./report/${dateTime}`,
                reportTitle: "Protractor Test Execution Report",
                screenshotPath: "./screenshots",
                screenshotsOnlyOnFailure: false,
                testBrowser: browserName,
                testPlatform: platform,
            };
            new HTMLReport().from(`./report/${dateTime}/xmlresults.xml`, testConfig);
        });

        const fs = require("fs-extra");
        fs.renameSync('./report/combined.log', `./report/${dateTime}/combined.log`);
    },

}