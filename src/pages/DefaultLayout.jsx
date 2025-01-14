import Footer from '../components/FooterComponent';
import Header from '../components/HeaderComponent';

import { Outlet } from 'react-router-dom';

export default function defaultLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}