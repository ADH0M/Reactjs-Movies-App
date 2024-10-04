export const initState = {
    loading:true ,
    data :[] , 
    error:'',
    productId:'',
};

const reducer = (state , action )=>{

    switch(action.type){
        case 'pendding':{
            return {...state ,loading:true , data :[] , error:''};
        }
        case 'fullfiald':{
            return {...state ,loading:false , data :[action.payload] , error:''};
        }
        case 'rejected':{
            return {...state ,loading:false , data :[] , error:action.payload};
        }

        default:{
            return state;
        }
    };
}

export default reducer