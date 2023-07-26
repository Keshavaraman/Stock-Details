import {useSelector} from "react-redux";
import Main from "./components/mainComponent/mainScreen";
import Modal from "./components/modal";
import Toast from "./components/toast";
function App() {
	const stockData=useSelector((data)=>data.stockData);
	console.log(stockData);
	return (
		<>
		<Modal/>
		<Toast/>
		<Main/>
		</>
	);
}

export default App;