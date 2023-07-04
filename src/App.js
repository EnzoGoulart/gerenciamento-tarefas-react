import RoutesApp from "./routes"
import { BrowserRouter } from "react-router-dom"

export default function App(){
  return(
    <div>
      <BrowserRouter>
      <RoutesApp/>
      </BrowserRouter>
    </div>
  )
}