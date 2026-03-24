const express = require('express');
const app = express();
const fs = require('fs');

const connectToDatabase = require('./database');
const Book = require('./Model/bookModel');

const {multer,storage} = require('./middleware/multerConfig');

const upload = multer({storage : storage});

//const app = require("express")();

app.use(express.json())

connectToDatabase();


app.get("/",(req,res)=>{
  res.status(200).json({
      "message" : "success"
  })
  
})

//create book
app.post("/book",upload.single('image'), async(req,res)=>{
  let fileName;
  if(!req.file){
    fileName = "https://imgs.search.brave.com/aYwPrU_5qxNl6pgyw4uaurvOMvlhXO3eUtXJ45EjVGA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/NC8yMi9hbm9ueW1v/dXMtbWFsZS1hbmQt/ZmVtYWxlLXByb2Zp/bGUtcGljdHVyZS1l/bW90aW9uLXZlY3Rv/ci01MzUxNDIyLmpw/Zw";
  }else{
    fileName = "http://localhost:3000/"+req.file.filename;
  }
  const {bookName, bookPrice,isbrNumber, authorName , publishedAt,publisher} = req.body;

  await Book.create({
    bookName,
    bookPrice,
    isbrNumber,
    authorName,
    publishedAt,
    publisher,
    imageURL : fileName
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
//delete option
app.delete("/book/:id",async(req,res)=>{
  const id = req.params.id;
  
  const oldData = await Book.findById(id);
  
  const oldImageURL = oldData.imageURL;
  const localHostImageURL = "http://localhost:3000/".length;
  const newOldImageURL = oldImageURL.slice(localHostImageURL)
  fs.unlink(`storage/${newOldImageURL}`,(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log("File Deleted Successfully");
    }
  })
  
  
  await Book.findByIdAndDelete(id);
  
  res.status(200).json({
    message : "Book Delete Successfully"
  })
})

//update book
app.patch("/book/:id",upload.single('image'),async (req,res)=>{
  const id = req.params.id;
  let fileName;
  const {bookName, bookPrice,isbrNumber, authorName , publishedAt,publisher} = req.body;
  const oldData = await Book.findById(id);
  if(req.file){
    const oldImageURL = oldData.imageURL;
    const localHostImageURL = "http://localhost:3000/".length;
    const newOldImageURL = oldImageURL.slice(localHostImageURL)
    fs.unlink(`storage/${newOldImageURL}`,(err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("File Deleted Successfully");
      }
    })
    fileName = req.file.filename;
  }
  
  

  await Book.findByIdAndUpdate(id,{
    bookName,
    bookPrice,
    isbrNumber,
    authorName,
    publishedAt,
    publisher,
    imageURL : "http://localhost:3000/" + fileName
  });
  
  res.status(200).json({
    message : "Book Updated Successfully"
  })
})

app.use(express.static("./storage/"));

app.listen(3000, ()=>{
  console.log("Node js project has started at 3000 port");
})