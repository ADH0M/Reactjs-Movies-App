export const initialState = {
    loading:true ,
    data :[] , 
    error:'',
    value: 0,
    standerValue:4,
};

const reducer = (state , action )=>{

    switch(action.type){
        case 'pendding':{
            return {...state ,loading:true , data :[] , error:''};
        }
        case 'fullfiald':{
            return {...state ,loading:false , data :action.payload , error:''};
        }
        case 'rejected':{
            return {...state ,loading:false , data :[] , error:action.payload};
        }
        
        case 'add':{
            return {...state ,value:state.value + 1 ,standerValue:state.standerValue + 1};
        }
        case 'remove':{
            return {...state ,value:state.value - 1 ,standerValue:state.standerValue - 1};
        }

        default:{
            return state;
        }
    };
}

export default reducer