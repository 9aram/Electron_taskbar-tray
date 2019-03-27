// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    let n = new Notification('You did it!', {
        body: 'Nice work.'
    })

    // Tell the notification to show the menubar popup window on click
    n.onclick = () => { ipcRenderer.send('show-window') }

})
function noti() {
    let myNotification = new Notification('Title', {
        body: 'Lorem Ipsum Dolor Sit Amet'
    })

    myNotification.onclick = () => {
        console.log('Notification clicked')
    }
}
var targetPriceVal;

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')

    // Add this:
    if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
        const myNotification = new window.Notification(notification.title, notification)
    }

})
}

var EventEmitter = require('events').EventEmitter,
    spawn = require('child_process').spawn,
    rl = require('readline');

var RE_SUCCESS = /bytes from/i,
    INTERVAL = 2, // in seconds
    IP = '8.8.8.8';

var proc = spawn('ping', ['-v', '-n', '-i', INTERVAL, IP]),
    rli = rl.createInterface(proc.stdout, proc.stdin),
    network = new EventEmitter();

network.online = false;

// rli.on('line', function(str) {
//     if (RE_SUCCESS.test(str)) {
//         if (!network.online) {
//             network.online = true;
//             network.emit('online');
//         }
//     } else if (network.online) {
//         network.online = false;
//         network.emit('offline');
//     }
// });



// then just listen for the `online` and `offline` events ...
network.on('online', function() {
    console.log('online!');
}).on('offline', function() {
    console.log('offline!');
});
window.addEventListener('online', () => console.log('came online'))
window.addEventListener('offline', () => console.log('came offline'))

