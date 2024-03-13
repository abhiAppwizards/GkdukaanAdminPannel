const initialState = {
    AddedProdutData: {},
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "AddedProduct": 
        return {
          ...state,
          AddedProdutData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  