import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";



function MainLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />
            <main className="flex-fill">
                <Header />
                <div className="p-3">
                    {children}
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default MainLayout;