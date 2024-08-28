import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api2 } from '../../api/api';


// Initial state with a more structured format
const initialState = {
  message: '',
  status: 'idle'
};

export const contactSendEmail = createAsyncThunk('contact/SendEmail', async (info, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await api2.post('/contact/email', info);
    console.log('contact API response:', data); // Log API response
    return fulfillWithValue(data);
  } catch (error) {
    console.error('API error:', error.message); // Log any errors
    return error.message;
  }
});



// Slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(contactSendEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Action payload contact:', action.payload); // Log action payload
        state.message = action.payload.message;


      });
  },
});

export default contactSlice.reducer;
