import { Router } from "express";
import CartManager from "../DAO/MDBmanager/CartsDAO.js"

const CartRouter = Router();

let manager = new CartManager;

CartRouter.post("/", async (req, res)=>{
    let newCart; 
    try {
      newCart = await manager.createCarts();
      res.send({ status: "success", msg: "Cart created!"})
    } catch (error) {
        res.status(400).send({ status: "error", msg: "Cart no Created" }) 
    } 
});

CartRouter.get("/:cid", async (req, res)=>{
    let cid = req.params.cid;
    let product;
    try {
      product = await manager.getCartsById(cid);
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Product not found" }) 
    }
    res.send({ status: "success", payload: product})
});

CartRouter.post("/:cid/products/:pid", async(req, res)=>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    let addProduct;
    try {
      addProduct = await manager.addProductToCart(cid, pid)
    } catch (error) {
      res.status(400).send({ status: "error", msg: "Product not found" })
    }
    res.send({ status: "success", msg: "Product Added"})
})


export default CartRouter;