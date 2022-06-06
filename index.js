const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { urlencoded } = require('express')
const cors = require('cors')
const path = require('path')

// middlewares
dotenv.config({path: './config.env'})
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors({
    origin: "https://zsncart.herokuapp.com",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true
}))
app.use(cookieParser())

// Config File

const PORT = process.env.PORT
const DB = process.env.DB

// Database Connection

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected successfuly")
}).catch((err) => {
    console.log("database connection error")
})

// Product Schema

const product = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    }
})

const ProductSchema = mongoose.model("PRODUCT", product)

// Cart Schema

const cart = mongoose.Schema({
    name: {
        type: String
    },
    qty: {
        type: Number
    },
    price: {
        type: Number
    },
    currency: {
        type: String
    },
    total: {
        type: Number
    }
})

const CartSchema = mongoose.model("CART", cart)

app.post("/addtocart", async(req, res) => {
    const {id} = req.body
    const data = await ProductSchema.findById({_id: id})
    const cartData = await CartSchema.find({name: data.name, price: data.price})
    if(cartData.length !== 0){
        
    }else{
        const cart = await CartSchema.create({
            name: data.name,
            price: data.price,
            qty: 1,
            currency: data.currency,
            total: data.price
        })
        cart.save()
        res.json({cart})
    }
})

app.get("/getProducts", async(req, res) => {
    const data = await ProductSchema.find()
    res.send(data)
})

app.get("/getCartItems", async(req, res) => {
    const data = await CartSchema.find()
    res.json(data)
})

app.delete("/deleteItem/:id", async(req, res) => {
    const {id} = req.params
    const data = await CartSchema.findOneAndDelete({_id: id})
    res.json({data})
})

app.put("/increment", async(req, res) => {
    const {id} = req.body
    const data = await CartSchema.findById({_id: id})
    const newQty = data.qty + 1
    const newTotal = newQty * data.price
    const update  = await CartSchema.findByIdAndUpdate({_id: id}, {qty: newQty, total: newTotal})
    res.json({update})
})

app.put("/decrement", async(req, res) => {
    const {id} = req.body
    const data = await CartSchema.findById({_id: id})
    const newQty = data.qty <= 0 ? 0 : data.qty - 1
    const newTotal = newQty * data.price
    const update  = await CartSchema.findByIdAndUpdate({_id: id}, {qty: newQty, total: newTotal})
    res.json({update})
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// Server Listener

app.listen(PORT, () => {
    console.log("Server is running...")
})