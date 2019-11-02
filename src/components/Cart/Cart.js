import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

import { animated } from 'react-spring'
import "../../styles.scss"

const Cart = ({style}) => {
    const { 
        toggleCartOpen, 
        CheckCoupon, 
        checkout, 
        removeCoupon, 
        removeProductFromCart } = useContext(StoreContext)

    const [ coupon, setCoupon ] = useState('')
    
    return (
        <animated.div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '50%',
                height: "100%",
                background: "white",
                padding: '40px 2%',
                boxShadow: "var(--elevation-4)",
                ...style,
                zIndex: '1'
            }}
        >
            <button 
                style={{
                    background: "var(--red)",
                    position: "absolute",
                    top: 10,
                    right: 10,
                }} 
                onClick={toggleCartOpen}  
                className="delete is-large"
            >Close Cart
            </button>
            <h3 className="title">Cart</h3>
            <div style={{ padding: 40}}>
                {   
                    checkout.lineItems.length === 0 ?
                        <p style={{ fontStyle: "italic"}}>You have no items in your cart</p>
                        :
                        checkout.lineItems.map((item) => {
                        
                            return (
                                <div key={item.id} style={{ display: "flex", marginBottom: "2rem"}}>
                                    <div style={{
                                        width: 120,
                                        height: 120,
                                        overflow: "hidden",
                                        marginRight: 20,
                                    }}>
                                        <img src={item.variant.image.src} alt=""></img>
                                    </div>
                                    <div>
                                        <h4 className="title is-4">{item.title}</h4>
                                        <p className="sub-title is-5">${item.variant.price}</p>
                                        <p className="sub-title is-5">Qty: {item.quantity}</p>
                                        <button aria-label="remove product from cart" onClick={() => removeProductFromCart(item.id)} className="is-small button is-danger is-outlined">Remove</button>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            
            <div>
                { checkout.discountApplications.length > 0 ? (
                    <div style={{ padding: 40}}>
                        <p>Coupon</p>
                        <h5 className="title">
                            {checkout.discountApplications[0].code} - {checkout.discountApplications[0].value.percentage}% off
                        </h5>
                        <button 
                            aria-label="remove product from cart" 
                            onClick={(e) => {
                                e.preventDefault()
                                removeCoupon(coupon)
                            }}
                            className="is-small button is-danger is-outlined"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault() 
                            CheckCoupon(coupon)
                        }}>
                        <div className="field">
                            <label htmlFor="coupon" className="label">
                                Coupon
                            </label>
                            <input 
                                id="coupon" 
                                className="input" 
                                value={coupon} 
                                onChange={(e) => setCoupon(e.target.value)} 
                                type="text" 
                                placeholder="Add Your Coupon " 
                                
                            />
                        </div>         
                        <button className="button">Add Coupon</button>
                    </form>
                )}
            </div>
            <hr/>
            <div>
                <p>Total:</p> <h5 className="title">${checkout.totalPrice}</h5>
            </div>
            <div style={{marginTop: '2rem'}}>
                <a href={checkout.webUrl} className="button is-fullwidth is-success">Pay Now</a>
            </div>
            
        </animated.div>
    )
}

export default Cart
