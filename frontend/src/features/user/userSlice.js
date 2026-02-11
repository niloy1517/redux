import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {}
    },
    reducers: {
        setUserData: (state, action) => {
            const {name, email} = action.payload;
            console.log(name, email)
            state.userData = {name, email}
        }
    }
})


export default userSlice.reducer;

export const { setUserData } = userSlice.actions;