import api from './base.js';
import axios from 'axios';

export const fetchData =(n , setCheck , setLoading , setError) =>
async (dispatch)=>{
    await api.get("people/?page="+n)
      .then((res)=>{
          dispatch(
              {type:'FetchChar' ,
              payload :res}
              )
              setCheck(1);
              setLoading(false);
          })
      .catch((err)=>{
          dispatch(
              {type:'FetchChar' ,
              payload :err}
              )
              setError(1);
              setLoading(false);
      })
  }
  export const fetchPlanet =(endpoint , setLoading , setCheck2) =>
async (dispatch)=>{
    await axios.get(endpoint)
      .then((res)=>{
          dispatch(
              {type:'FetchPlanet' ,
              payload :res}
              )
              setCheck2(1);
              setLoading(false);
          })
      .catch((err)=>{
          dispatch(
              {type:'FetchPlanet' ,
              payload :err}
              )
            //   setError(1);
              setLoading(false);
      })
  }
 