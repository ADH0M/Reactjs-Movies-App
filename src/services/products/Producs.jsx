import React, { useEffect, useReducer } from 'react';
import reducer , {initialState} from '../../data/productReducer';
import pageReducer  , {initState}  from '../../data/productPage';
import { Link, useNavigate } from 'react-router-dom';


const Producs = () => {
    const navigate = useNavigate();
    const nextPage = ()=>{
        dispatch({type:'add' })
    };

    const previse = ()=>{
        dispatch({type:'remove' })
    };


    const [state , dispatch ] = useReducer( reducer , initialState );
    const [productState , ProductDispatch ] = useReducer( pageReducer , initState );
    const token = localStorage.getItem('token');
    console.log(token);
    
    useEffect(()=>{
        
        if(!token || token === ''){
            return navigate('/');
        }

        const fetchProducts =  async ()=>{
            const controller = new AbortController();
            const signal = controller.signal;
            try{

                const res = await fetch(`https://fakestoreapi.com/products`, {signal});
                const prodcut = await res.json();
                dispatch({type:'fullfiald' , payload: prodcut});

            }
            
            catch(err){
                dispatch({type:'rejected' ,payload:err});
            }

            return ()=>{
                controller.abort();
            }

        };
        fetchProducts();
    } ,[]);
    console.log(state);
    console.log(productState);
    
    
  return (
    <div>
       <section className='h-[100vh] flex items-center'>
            <ul className='flex relative flex-wrap m-auto w-[70%] bg-gray-600'>
                { state.loading && 'loading ...'}
                { state.error && 'do have nay product reload the page or log out'}
                     <button type='button' disabled={state.value === 0 } onClick={()=>previse()} className={`font-bold text-xl absolute top-40 left-2 px-1 ${state.value === 0 ?'bg-gray-500 opacity-5' : 'bg-slate-100' }`}>{'<'}</button>
                { state.data.length >=1 &&
                    state.data.slice(state.value, state.standerValue).map((item ,index)=>( 
                        <li onClick={()=>{return ProductDispatch({type:'addProductId' , payload:item.id}) }} className='w-[20%] p-4 m-4 ' key={index}>
                            <Link to={`/product/${item.id}`}> 
                                <div ><img src={item.image} alt="" /></div> 
                                <span  >{item.title} </span> 
                                <span  className='font-bold text-black text-center p-2'> ${item.price} </span> 
                        
                            </Link>
                        </li>
                     ) ) 
                     
                    };
                    <button onClick={(() => nextPage())} type='button' className={`font-bold text-xl absolute top-40 right-2 px-1 ${state.standerValue === 20 ? 'bg-gray-500 opacity-5':'bg-slate-100' }`}  disabled={state.standerValue === 20}>{'>'}</button>
            </ul>
       </section>
    </div>
  )
  
}

export default Producs
