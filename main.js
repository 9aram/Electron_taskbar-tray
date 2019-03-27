// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Notification } = require("electron");

const path = require("path");
const url = require("url");
const notifier = require('node-notifier');

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600,title: "TEST", icon:'./facebook.png'});

    // and load the index.html of the app.
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Open the DevTools.
     win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
});
}

//const appId = "elite-notifier";

//app.setAppUserModelId(appId);
app.on("ready", createWindow);

console.log("notifying");
ipcMain.on("notify", () => {
    console.log("notified");
// const WindowsToaster = require("node-notifier").WindowsToaster;
// const notifier = new WindowsToaster({
//     withFallback: false
// });


notifier.notify(
    {
        appName: "com.myapp.id",
        title  : "Hello",
        message: "Hello world!",
        icon   : "./facebook.png"
    },
    function (err, response) {
        // Response is response from notification
        console.log("responded...");
    }
);
});

const notifier = require('node-notifier');
const dns = require('dns');
let isConnected = false;

//인터넷 연결 확인 함수
function liveCheck() {
    //구글로 연결을 시도해 인터넷 연결 확인
    dns.resolve("www.google.com", function(err, addr) {
        //연결이 안될때
        if (err) {
            if (isConnected) {
                notifier.notify({
                    appName: "com.myapp.id",
                    title: "network error",
                    message: "disconnected",
                    icon: "./facebook.png",
                });
            }
            isConnected = false;
        }
        //연결됬을때
        else {
            if (isConnected) {
                //connection is still up and running, do nothing
            } else {
             //   console.log(addr);
                notifier.notify({
                    appName: "com.myapp.id",
                    title: "connection gained",
                    message: "connected",
                    icon: "./facebook.png"
                });
            }
            isConnected = true;
        }
    });
}



//1초마다 인터넷 연결 확인 함수 호출
setInterval(function() {
    liveCheck()
     },1000);

