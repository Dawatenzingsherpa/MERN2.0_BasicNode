const express = require('express');
const app = express();

const connectToDatabase = require('./database');
const Book = require('./Model/bookModel');



//const app = require("express")();

app.use(express.json())

connectToDatabase();


app.get("/",(req,res)=>{
  res.status(200).json({
      "message" : "success"
  })
  
})

//create book
app.post("/book", async(req,res)=>{
  const {bookName, bookPrice,isbrNumber, authorName , publishedAt,publisher} = req.body;

  await Book.create({
    bookName,
    bookPrice,
    isbrNumber,
    authorName,
    publishedAt,
    publisher
  })

  res.status(201).json({
    message : "Book Created Successfully"
  })
})

//read all
app.get("/book",async(req,res)=>{
  const books =  await Book.find(); // return array

  res.status(200).json({
    message : "Book fetched Successfully",
    data : books
  })

})

//read single
app.get("/book/:id",async(req,res)=>{
  try{
  const id  = req.params.id;
  const book = await Book.findById(id) //return object
  if(!book){
    res.status(404).json({
      message : "Nothing found"
    })
  }else {
    res.status(200).json({
      message : "Single Book triggered",
      data : book
    })
  }
  }catch(error){

    res.status(500).json({
      message : "Something went wrong"
    })
  }
  
  
})



app.listen(3000, ()=>{
  console.log("Node js project has started at 3000 port");
})