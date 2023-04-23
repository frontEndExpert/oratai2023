//import axios from 'axios';
// import request from 'request';

//var request = require('request')

// export const sendLine = (userID, message) => {

// const m2line = axios.create({
//     baseURL: 'https://api.line.me/v2/bot/message/push'
// });
//            mHeader = {
//             'Content-Type':'application/json',


//             }
//    // axios2mail.get(mylink)
//     m2line.post('/' ,message1)
//       .then(response => {
//         console.log('action sendmail Success',response);
//     })
//     .catch(error => {
//         console.log('axios sendmail error' + error);
//     });

//     return {
        
//     };
// };

// XXXX //

// var express = require('express')
// var bodyParser = require('body-parser')
// var request = require('request')
// var cors = require('cors');
// var app = express()
// app.use(cors());

// app.use(bodyParser.json())'Aylon was here 123'
//module.exports.send = function send(to,from,subject,html){
module.exports.sendText = function sendText(sender, message){
//export const sendText = (sender, message) => {
  message1 = 'aylon is the winner';

    var text = {
    type: 'text',
    text: message1 
  };
  var sender = 'U264ab1e2b57d6adcff784c0820285590'; // 'mcu9345p'; //'1588104142' // '21351379';
  //sendText(sender, text)
  ////console.log('sender <to> ', sender)
  let data = {
    to: sender,
    messages: [text]
  }
  request({
    headers: {
        'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer X61BJdU02fVedz/yXypAgXiCT1Omt1diVjvj9wtj2DM+iJ30N67txsnB2QAnB8zMSLRE0ditYf1KwbnD/vywAi0SpH2CoOdCyRrHWcfyQgpt1ntKx25vEK42mmcUyTRr3ESGLr3W3IXz7pF7ltTIEQdB04t89/1O/w1cDnyilFU='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    mode: 'no-cors',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}
