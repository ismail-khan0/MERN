const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');

  console.log('db connected')
}
const UserSchema = new mongoose.Schema({
    UserName: String,
    Password:String
  });
  const User = mongoose.model('User', UserSchema);

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async (req,res)=>{
    let user =new User();
    user.UserName= req.body.UserName;
    user.Password=req.body.Password;
    const doc=await user.save();

    console.log(doc);
    res.json(doc);
    // res.json(req.body);
})

server.get('/demo',async (req,res)=>{
    const docs=await User.find({});
    res.json(docs)
})


server.listen(8080,()=>{
console.log("start the server")
})