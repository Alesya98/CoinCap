import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"

export const IndexPage = () => {
    return (
        <div>
            <Header /> 
            <main>
                <Outlet/>
            </main>
        </div>
    )
}