const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
let port=process.env.PORT || 3000;

mongo  = require('mongodb');
let mongoClient=mongo.MongoClient;
let mongoUrl=process.env.LiveMongo;
let db;

let bodyParser=require('body-parser');
const { ObjectId } = require('mongodb');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})



//To get the watches based on the watchcollection (men,women,couple,kids) or watchType (smart watch, regular watch, clock )
app.get("/watches",(req,res)=>{
  let query={};
  let collectionId=Number(req.query.collectionId);
  let watchType=Number(req.query.watchType);
  if(collectionId){
    query={collection_id:collectionId}
  }else if(watchType){
    query={watchType_id:watchType}
  }
  else{
    query={}
    console.log("no query applied");
  }

  db.collection("watches").find(query).toArray((err,result)=>{
  if (err) throw err;
  res.send(result);
})
})

//To get the watch details which are in Shop for section
app.get("/shopFor",(req,res)=>{
  db.collection("shop_for").find({}).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

// Filter by brand or price when user has selected watchcollection (men,women,couple,kids)

app.get("/collectionFilter/:collectionId",(req,res)=>{
  let query={};
  let collectionId=Number(req.params.collectionId);
  let brandId=Number(req.query.brandId);
  let lprice=Number(req.query.lprice);
  let hprice=Number(req.query.hprice);

let sort={watch_price:1}
if(req.query.sort){
  sort={watch_price:req.query.sort}
}

  if(brandId && lprice && hprice){
    query={
      collection_id:collectionId,
      brand_id:brandId,
      $and:[{watch_price:{$gt:lprice,$lt:hprice}}]
    }
  }else if(brandId){
    query={
      collection_id:collectionId,
      brand_id:brandId
    }
  }else if(lprice && hprice){
    query={
      collection_id:collectionId,
      $and:[{watch_price:{$gt:lprice,$lt:hprice}}]
    }
  }
  else{
    query={collection_id:collectionId}
  }

  db.collection("watches").find(query).sort(sort).toArray((err,result)=>{
  if (err) throw err;
  res.send(result);
})
})

// Filter by brand or price when user has selected watchType (Smart watch, Regular watch, clock)

app.get("/watchTypeFilter/:watchType",(req,res)=>{
  let query={};
  let watchType=Number(req.params.watchType);
  let brandId=Number(req.query.brandId);
  let lprice=Number(req.query.lprice);
  let hprice=Number(req.query.hprice);

let sort={watch_price:1}
if(req.query.sort){
  sort={watch_price:req.query.sort}
}

  if(brandId && lprice && hprice){
    query={
      watchType_id:watchType,
      brand_id:brandId,
      $and:[{watch_price:{$gt:lprice,$lt:hprice}}]
    }
  }else if(brandId){
    query={
      watchType_id:watchType,
      brand_id:brandId
    }
  }else if(lprice && hprice){
    query={
      watchType_id:watchType,
      $and:[{watch_price:{$gt:lprice,$lt:hprice}}]
    }
  }
  else{
    query={watchType_id:watchType}
  }

  db.collection("watches").find(query).sort(sort).toArray((err,result)=>{
  if (err) throw err;
  res.send(result);
})
})

//watch Details page
app.get("/details",(req,res)=>{
  let query={};
  let watchId=Number(req.query.watchId);
  if(watchId){
    query={watch_id:watchId}
  }else{
    query={}
  }
  db.collection("watches").find(query).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

//Items added to cart
app.post("/cart",(req,res)=>{
  if(Array.isArray(req.body.id)){
    db.collection('watches').find({watch_id:{$in:req.body.id}}).toArray((err,result)=>{
      if (err) throw err;
      res.send(result);
    })
  }else{
    res.send('Invalid Input');
  }
})


///To place the order
app.post("/placeOrder",(req,res)=>{
  db.collection("orders").insertOne(req.body,(err,result)=>{
    if(err) throw err;
    res.send("order placed");
  })
})

//To show the orders 
app.get("/orders",(req,res)=>{
  let emailId=req.query.email;
  query={};
  if(emailId){
    query={
      email:emailId
    }
  }else{
    query={}
  }
  db.collection("orders").find(query).toArray((err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

//Update order
app.put("/updateOrder/:oId",(req,res)=>{
  let order_Id=Number(req.params.oId);  //system will return data as string. So we are explicitely changing it to Number
  db.collection('orders').updateOne(
    {orderId:order_Id},
    {
      $set:{
        "status":req.body.status,
        "bank_details": req.body.bank_details,
        "date":req.body.date
      }
    },(err,result)=>{
      if(err) console.log(order_Id);
      res.send("Order updated");
    })

})

//Delete order
app.delete('/deleteOrder/:id',(req,res)=>{
  let unique_id=mongo.ObjectId(req.params.id);
  
  db.collection('orders').deleteOne({_id:unique_id},(err,result)=>{
    if (err) throw err;
    res.send("Order Deleted")

  })
})


//connection with db

mongoClient.connect(mongoUrl,(err,client)=>{
  if (err) console.log("Error while connecting to DB");
  db=client.db("titanDB");
  app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
  })
})

