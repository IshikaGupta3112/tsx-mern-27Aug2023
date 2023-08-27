
const initial={
    next:'',
    prev:'',
    char:'',
    species:'',
    error:'',
    name:'',
    climate:'',
    terrain:'',
    population:''
};
    const charReducer =(state=initial 
        , action)=>{
        switch(action.type){
            case "FetchChar" :{
            console.log(action.payload); 
            console.log(action.payload.message); 
            if(action.payload.data){
                return {
                    next:action.payload.data.next,
                    prev:action.payload.data.previous,
                    char:action.payload.data.results,
                }
            }
            else return{
                error:action.payload.message
            }
        }
            case "FetchPlanet" :{
                console.log(action.payload); 
                console.log(action.payload.data.name); 
                if(action.payload.data){
return {
    name:action.payload.data.name,
    terrain:action.payload.data.terrain,
    climate:action.payload.data.climate,
    population:action.payload.data.population
}
                }
                else return{
                    error:action.payload.message
                }
            }
             default: return null;
        } 
     }
     export default charReducer;