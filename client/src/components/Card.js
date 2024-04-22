import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceRef = useRef();
    let priceOptions = Object.keys(options);
    const [qyt, setQyt]= useState("1");
    const [size, setSize]= useState("");
    const handleAddToCart = async()=>{

        let food =[]
        for(const item of data){
            if(item.id === props.foodItem._id){
                food= item;
                break;
            }
        }

        if(food.length !== 0) {
            if(food.size === size){
                await dispatch({
                    type:"UPDATE",
                    if:props.foodItem._id,
                    price: finalPrice,
                    qyt:qyt
                })
                return
            } else if ( food.size !== size ){

                await dispatch({
                    type:"ADD",
                    id:props.foodItem._id,
                    name:props.foodItem.name,
                    price:finalPrice,
                    qyt:qyt,
                    size:size,
                })
                return
            }
            return
        }
        await dispatch({
            type:"ADD",
            id:props.foodItem._id,
            name:props.foodItem.name,
            price:finalPrice,
            qyt:qyt,
            size:size,
        })
    }

    let finalPrice = qyt * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value);
    },[])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" }}>
{/*                     <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
 */}                        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-120 p-0' style={{ height: "38px" }}>
                            <select className='m-2 h-100 rounded' onChange={(e)=> setQyt(e.target.value)} style={{ backgroundColor: 'green' }}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)} style={{ backgroundColor: 'green' }} >
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <button className={'btn btn-success justify-center ms-4'} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card