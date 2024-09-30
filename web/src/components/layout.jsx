import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }){
    return (
        <div className="flex flex-col min-h-screen flex-1">
            <Navbar/>
            <div className="flex-1">
            { children }
            </div>
            <Footer/>
        </div>
    )
}