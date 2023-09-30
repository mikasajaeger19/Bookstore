import express from 'express'
import {Book} from "../models/bookModel.js"

const router = express.Router()

router.post('/', async(req, res) => {
    try {
        const newBook = {
            "title" : req.body.title,
            "author" : req.body.author,
            "publishYear" : req.body.publishYear
        }
        const book = await Book.create(newBook)
        res.send(book)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/', async(req, res) => {
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count :  books.length,
            data: books
        });
    } catch (error){
        console.log(error.message)
    }
})

router.get('/:id', async(req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        return res.status(200).json({
            data: book
        });
    } catch (error){
        console.log(error.message)
    }
})

router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.delete("/:id", async(req, res) => {
    try{
        const {id} = req.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        return res.status(200).json({
            message: "Book deleted successfully"
        })
    } catch(error){
        console.log(error.message)
    }
})

export default router