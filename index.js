console.log("jabagat-index.js");

var pub_button = document.getElementById('pub-button');
pub_button.addEventListener('click', () => {
  var pub_topic_input = document.getElementById('pub-topic-input').value;
  var pub_payload_input = document.getElementById('pub-payload-input').value;
  client.publish(pub_topic_input, pub_payload_input)
});

var brokerAdd = $("#broker-address").val("wss://test.mosquitto.org:8081/mqtt")
  , conBtn = $("#connect-button")
  , pubBtn = $("#pub-button")
  ,  subBtn = $("#sub-button")
;

conBtn.click( function (){
  brokerAdd = $("#broker-address").val();
  var client  = mqtt.connect(brokerAdd);
  var status = $("#status").val("Connecting...");
  client.on('connect', function () {
    status.val("Successfully Connected!");
  });

  client.on('message', function (topic, message) {
    var datas = $("#incomingMsgs");
    appendData(topic, message, datas);
  });

  var pubPayload;
  pubBtn.click(function () {
    var pubTopic = $("#pub-topic-input");
    pubPayload = $("#pub-payload-input");
    var datas = $("#pubInfos");
    appendData(pubTopic.val(), pubPayload.val(), datas);
    client.publish(pubTopic.val(), pubPayload.val());
  });
  
  subBtn.click(function () {
    var subTopic = $("#sub-input");
    var datas = $("#subInfos");
    appendData(subTopic.val(),undefined, datas);
    client.subscribe(subTopic.val());
  });
});

function appendData(topic, payload = undefined, datas){
  var data;
  var date = new Date();
  if(payload == undefined){
    data = "<tr><td>"+topic+"</td><td>"+date.toGMTString()+"</td></tr>"
  }else{
    data = "<tr><td>"+topic+"</td><td>"+payload+"</td><td>"+date.toGMTString()+"</td></tr>"
  }
  datas.append(data);
}