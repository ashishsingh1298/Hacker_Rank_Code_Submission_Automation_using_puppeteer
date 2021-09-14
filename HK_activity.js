let puppeteer = require("puppeteer");
const { getSystemErrorMap } = require("util");
const codesObj = require("./code");
// const passwordhk = require("./secure");

    let browserStrartPromise = puppeteer.launch({
        headless :false,
        defaultViewport:null,
        args: ["--start-maximized", "--disable-notifications"]
    });
// const secObj = passwordhk.ipf();
const getEmail = 'sakije7178@mnqlm.com';
const password = 'ndfksagdkdfd2919';
let page;
(async function fn(){
    try{
        let browerObj = await browserStrartPromise;
        console.log("browser opened");
        page = await browerObj.newPage();
        console.log("New tab opened");
        await page.goto("https://www.hackerrank.com/auth/login");
        await handelIfNotPresent('input[placeholder="Your username or email"]',page);
        await page.type('input[placeholder="Your username or email"]',getEmail,{delay: 100});
        await page.type('input[placeholder="Your password"]',password,{delay: 100});
        await handelIfNotPresent('button[data-analytics="LoginPassword"]',page);
        await handelIfNotPresent('div[data-automation="algorithms"]',page);
        await handelIfNotPresent('input[value="warmup"]',page);
        await page.waitFor(3000);
        let questionsArr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
            , { delay: 100 });
        for (let i = 0; i < questionsArr.length; i++) {
            await custumQuestionSolver(page, questionsArr[i], codesObj.answers[i]);
        }
    }catch (err){
        console.log(err);
    }
})();
     function myWaitAndClick(selector, cPage){
        return new Promise ( function (resole, reject){
            let waitForModalPromise = cPage.waitForSelector(selector,{visible:true});
            waitForModalPromise.then(function (){
                let clickModal = cPage.click(selector,{delay:100});
                return clickModal;
            }).then(function(){
                resole();
            }).catch(function(){
                reject();
            })
        })
    }

    // promise if banner is not present
    function handelIfNotPresent(selector,cPage){
        return new Promise(function (resolve, reject){
            // wait click modal
            let waitAndClickPromise = myWaitAndClick(selector,cPage);
            waitAndClickPromise.then(function(){
                resolve();
            }).catch(function(){
                resolve();
            })
        })
    }

// Custom Promise by me
function custumQuestionSolver(cPage, question, algoCode){
    return new Promise(function (resolve, reject) {
        let qWillBeCLickedPromise = question.click();
        qWillBeCLickedPromise
            .then(function () {
                let waitFOrEditorToBeInFocus =
                    myWaitAndClick(".monaco-editor.no-user-select.vs", cPage);
                return waitFOrEditorToBeInFocus;
            })
            .then(function () {
                return myWaitAndClick(".checkbox-input", cPage);
            }).then(function () {
                return cPage.waitForSelector("textarea.custominput", { visible: true });
            })
            .then(function () {
                return cPage.type("textarea.custominput", algoCode, { delay: 10 });
            }).then(function () {
                let ctrlIsPressedP = cPage.keyboard.down("Control");
                return ctrlIsPressedP;
            }).then(function () {
                let AIsPressedP = cPage.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                return cPage.keyboard.press("X", { delay: 100 });
            }).then(function () {
                let ctrlIsPressedP = cPage.keyboard.up("Control");
                return ctrlIsPressedP;
            })
            .then(function () {
                // focus 
                let waitFOrEditorToBeInFocus =
                    myWaitAndClick(".monaco-editor.no-user-select.vs", page);
                return waitFOrEditorToBeInFocus;
            })
            .then(function () {
                let ctrlIsPressedP = cPage.keyboard.down("Control");
                return ctrlIsPressedP;
            }).then(function () {
                let AIsPressedP = cPage.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let AIsPressedP = cPage.keyboard.press("V", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let ctrlIsPressedP = cPage.keyboard.up("Control");
                return ctrlIsPressedP;
            }).then(function () {
                return cPage.click(".hr-monaco__run-code", { delay: 50 });
            }).then(function(){
                let future18secondAfter = Date.now() + 3000;
                while (Date.now() < future18secondAfter) {
                }
                console.log("clicked on Submit button")
                let waitForLevel4promise = handelIfNotPresent('button[class="ui-btn ui-btn-normal ui-btn-primary pull-right hr-monaco-submit ui-btn-styled"]',cPage);
                return waitForLevel4promise;
            }).then(function(){
                let future5secondAfter = Date.now() + 5000;
                while (Date.now() < future5secondAfter) {
                }
                console.log("back to algorithm page")
                let waitForLevel3promise = handelIfNotPresent('a[data-attr1="Algorithms"]',cPage);
                return waitForLevel3promise;
            }).then(function(){
            resolve();
        }).catch(function (){
            resolve();
        })
    })
} 
