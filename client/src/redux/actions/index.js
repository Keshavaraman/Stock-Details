import api from "../../helperFunctions/api";
import { RESET_MODAL_MESSAGE, RESET_STOCK_DATA, UPDATE_MODAL_MESSAGE, UPDATE_STOCK_DATA } from "../constants";
export function stockDetails(symbol,date) {
    return (async(dispatch)=>{
        const requestParam = {
            url:process.env.REACT_APP_END_POINT+"/api/fetchStockData",
            data:{
                "stockSymbol":symbol,
                "selectedDate":date
            }
        }
        try{
        const stockData = await api(requestParam.url,"POST",requestParam.data);
        if(stockData.data==null || stockData.data.results==null || stockData.data.results.open==null)
        {
            dispatch({type:UPDATE_MODAL_MESSAGE,data:{messageType:"INFO",message:"No Data Found!"}});
            dispatch({type:RESET_STOCK_DATA});
        }
        else 
        {
            dispatch({type:UPDATE_STOCK_DATA,data:stockData.data.results});
            dispatch({type:UPDATE_MODAL_MESSAGE,data:{messageType:"SUCCESS",message:"Data Fetched Successfully!"}})
        }
        }
        catch(error){
            if(error.code == "ERR_NETWORK")
            dispatch({UPDATE_MODAL_MESSAGE,data:{messageType:"ERROR",message:"Network Error!"}});
            if(error.response.status == 400)
            dispatch({type:UPDATE_MODAL_MESSAGE,data:{messageType:"ERROR",message:"Invalid Request!"}});
            if(error.response.status == 404)
            dispatch({type:UPDATE_MODAL_MESSAGE,data:{messageType:"ERROR",message:"No Data Found!"}});

            dispatch({type:RESET_STOCK_DATA});
        }
    })
}