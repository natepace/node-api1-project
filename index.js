const server = require('./api/server.js');

const port = 5000;

// // START YOUR SERVER HERE
server.listen(port, () => {
    console.log("your server runs on 5000, my lord")
})
// // server.listen(999, () => {
//     console.log("running on port 999")
// })
// console.log('hi')