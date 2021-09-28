import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    latest: [],
    status: null
}

export const getAddressByCep = createAsyncThunk(
    'users/fetchByIdStatus',
    async (cep, { getState }) => {
      const state = getState()
      const exist = state.address.list.find(address => address.cep.split('-').join('') === cep)

      if(!exist) {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}address?cep=${cep}`)
        const data = await response.json()
        return data.addresses
      }

      return exist
      
    }
  )

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    getAddress: (state, action) => {
      const exist = state.list.find(address => address.cep === action.payload)
      if(!exist) getAddressByCep(action.payload)
    },
  },
  extraReducers: {
      [getAddressByCep.pending]: (state, action) => {
        state.status = 'loading'
      },
      [getAddressByCep.rejected]: (state, action) => {
        state.status = 'failed'
      },
      [getAddressByCep.fulfilled]: (state, action) => {
          if(action.payload) {
            const exist = address => state.list.find(item => item.cep === address.cep)

            if(Array.isArray(action.payload)){
                const newAdresses = action.payload.filter( address => !exist(address) )
                state.list.push.apply(state.list, newAdresses)
                state.latest = action.payload
            } else state.latest = [action.payload]
            
            state.status = 'success'
          }else{
            state.latest = {}
            state.status = 'failed'
          }
        
      }
  }
})

// Action creators are generated for each case reducer function
export const { getAddress } = addressSlice.actions

export default addressSlice.reducer