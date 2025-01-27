import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
/*function fetchJoke(category)
 {
  axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
   .then(function(result){
console.log(result.data.value)
     setJoke(result.data.value)
   })    
*/
const fetchJoke = createAsyncThunk("jokes/jokecategory",async function(category){
    return axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
    .then(function(result){
      console.log(result.data.value)
           return result.data.value
         })   
})

const initialState = {
    joke:"No Joke"
}
const jokeSlice = createSlice({
 name:"joke",
 initialState,
 reducers:{
 
 },
 extraReducers:(build)=>{
build.addCase(fetchJoke.pending,function(){
    console.log("Loading...")
}).addCase(fetchJoke.fulfilled,(state,action)=>{
state.joke=action.payload
})
 }
})

export default jokeSlice
export {fetchJoke}