import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";



function HeaderFooterLayout({ children }) {
    return (
        <div className="d-flex">
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

export default HeaderFooterLayout;