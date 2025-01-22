import { createSlice} from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        job:{},
        searchQuery:"",
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setJob:(state,action)=>{
            state.job = action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery = action.payload;
        }
    }
})
export const {setAllJobs,setJob,setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;