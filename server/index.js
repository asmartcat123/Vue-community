
// eslint-disable-next-line no-unused-vars
var userNum=0;
const Ws=require('ws');
((Ws)=>{
   const server=new Ws.Server({port:8001});

   const init=()=>{
      bindEvent();
   }
   function bindEvent(){
      server.on('open',handleOpen);
      server.on('close',handleClose);
      server.on('error',handleError);
      server.on('connection',handleConnection);

   }

   function handleOpen(){
      console.log('open');
   }

   function handleClose(){
      console.log('close');

   }

   function handleError(){
      console.log('error');
   }

   function handleConnection(ws){
      userNum++;
      console.log('connection');
      ws.on('message',handleMessage);
   }

   function handleMessage(msg){

      const data=JSON.parse(msg);
      var message={
         msg:data.msg,
         username:data.username,
         userNum:userNum
      }
      server.clients.forEach((c)=>{
         c.send(JSON.stringify(message));
      })

   }

   init()
})(Ws);


