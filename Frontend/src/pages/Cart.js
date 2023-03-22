import React ,{useEffect}from 'react'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import {AiFillDelete} from "react-icons/ai"
import { Link ,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import{createcart,getcart,daletecart,deletecartitem} from '../features/product cart/cartSlice'
const Cart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getcart());
      }, [dispatch]);
      
      const Items = useSelector((state) => state.cart.cart);

 
      const cart= Items.map(item => {
        return {
          cartTotal: item.cartTotal,
          count: item.products[0].count,
          price: item.products[0].price,
          brand: item.products[0].product.brand,
          title:item.products[0].product.title,
          url: item.products[0].product.images[0].url
        };
      });
      
      console.log(cart);
const size=Items.length
const cart_size={
cart_size:size
}
 
  return (
   <>

     
         <Meta title={`${cart_size.cart_size}`} />
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
      <div className="d-flex  flex-column align-items-end">
                          
                            <div  className='button' onClick={()=>{
                                dispatch(daletecart())
                                window.location.reload()
                            }}>
                              Clear Cart
                            </div>
                        </div>
        <div className="container-xxl">
          {  cart.map((items,i)=>(
               <div className="row">
               <div className="col-12">
                   <div className=" card-header py-3 d-flex align-items-center justify-content-between">
                       <h5 className='cart-col-1'>Name</h5>
                       <h5 className='cart-col-2'>Price</h5>
                       <h5 className='cart-col-3'>Quantity</h5>
                       <h5 className='cart-col-4'>Total</h5>
                   </div>
                   <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
             <div className="cart-col-1 gap-15 d-flex align-items-center">
                           <div className='w-25'>
                               <img 
                               src={items.url}
                               alt="product image"
                               className='img-fluid' />
                           </div>
                           <div className="w-75">
                                   <h5 className='title'>{items.title}</h5>
                                   <p className='background'>color</p>
                                   <p className='quantity'>size</p>
                           </div>
                   </div>
                   <div className="cart-col-2 ">
                       <h5 className='price'>₹{items.price}</h5>
                   </div>
                   <div className="cart-col-3 d-flex align-items-center gap-30">
                       <div>
                           <input 
                           className='form-control'
                           type="number"
                           name=''
                           min={1}
                           max={items.count}
                           id='' />
                       </div>
                       <div>
                       <AiFillDelete className='fs-3 text-danger ' onClick={()=>{
                         dispatch(daletecart())
                         window.location.reload()
                          //  dispatch(deletecartitem(`63fdde5635758f299fd27acc`))
                       }}/>
                       </div>
                   </div>
                   <div className="cart-col-4">
                   <h5 className='price'>₹{items.price}</h5>
                   </div>
                   </div>

                   <div className="col-12 py-2 mt-4 align-items-end">
  <div className="d-flex justify-content-end align-items-end">
    <div className="d-flex flex-column align-items-end">
      <h4>SubTotal :₹{items.cartTotal}</h4>
      <p>Taxes and Shipping calculated at checkout</p>
      <Link to="/app/checkout" className="button">
        Chekcout
      </Link>
    </div>
  </div>
</div>

                   
               </div>
           </div>
          ))}
           <div className="col-12 py-2 mt-4">
                       <div className="d-flex justify-content-between align-items-center" >
                           <Link to="/app/product" className="button">
                               Continue to Shopping
                           </Link>
                          
                       </div>
                       
                   </div>

        </div>
      </section>
   </>
  )
}   

export default Cart
