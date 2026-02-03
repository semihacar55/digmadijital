import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ServicesList from './pages/admin/services/ServicesList';
import ServiceEditor from './pages/admin/services/ServiceEditor';
import AuthGuard from './components/auth/AuthGuard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "hizmetler",
        element: <Services />,
      },
      {
        path: "hizmetler/:slug",
        element: <ServiceDetail />,
      },
      {
        path: "vaka-calismalari",
        element: <CaseStudies />,
      },
      {
        path: "hakkimizda",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "iletisim",
        element: <Contact />,
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AuthGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          // Services Module
          {
            path: "services",
            element: <ServicesList />,
          },
          {
            path: "services/new",
            element: <ServiceEditor />,
          },
          {
            path: "services/:id",
            element: <ServiceEditor />,
          },

          {
            path: "blog",
            element: <div>Blog List Placeholder</div>,
          },
          {
            path: "case-studies",
            element: <div>Case Studies Placeholder</div>,
          },
          {
            path: "team",
            element: <div>Team Placeholder</div>,
          },
          {
            path: "testimonials",
            element: <div>Testimonials Placeholder</div>,
          },
          {
            path: "media",
            element: <div>Media Placeholder</div>,
          },
          {
            path: "forms",
            element: <div>Forms Placeholder</div>,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
