import React, { useEffect, useReducer } from 'react'
import reducer, { initState } from '../../data/productPage'
import { useNavigate, useParams } from 'react-router-dom';


const ProductPage = () => {
    const param = useParams()
    const [state , dispatch ] = useReducer( reducer , initState );
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    console.log(token);
    

    useEffect(()=>{         
        if( !token || token === ''){
            return navigate('/')
        }
        const fetchData = async () =>{
            const controller = new AbortController();
            const signal  = controller.signal ; 
            try{
                const res = await fetch(`https://fakestoreapi.com/products/${param.id }` , {signal});
                const data = await res.json();
                dispatch({type:'fullfiald' , payload:data});
            }catch(err){
                dispatch({type:'rejected' , payload:err})
            };
            return ()=>{controller.abort()};
        };
        fetchData()
    },[]);
    
    
    return (
    <div className='flex justify-center  items-center w-full h-[100vh] flex-col font-bold text-3xl'>
        {state.data.length > 0 && state.data.map((item,index)=>(
            <>
                <ul key={index} className='flex flex-col items-center '>
                    <img src={item.image} alt={item.id}className='w-[400px] bg-gray-500 '  />
                    <li className='bg-gray-700 p-2 text-gray-50 border border-gray-950 rounded-lg outline-none '>{item.category}</li>
                    <li className='w-[50%] text-center p-2 '>{item.title}</li>
                    <li className='bg-gray-300 p-2 text-blue-500'>${item.price}</li>
                </ul>
            </>
        )) }
    </div>
  )
}

export default ProductPage
