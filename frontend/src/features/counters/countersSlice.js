import { createSlice } from '@reduxjs/toolkit'

const countersSlice = createSlice({
    name: 'counters',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            const { value } = action.payload;
            state.value = value + 1
        },

        decrement: (state, action) => {
            const { value } = action.payload;
            state.value = value - 1
        }
    }
})

export default countersSlice.reducer;
export const { increment, decrement } = countersSlice.actions;