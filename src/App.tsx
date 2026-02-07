import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';

import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ServicesList from './pages/admin/services/ServicesList';
import ServiceEditor from './pages/admin/services/ServiceEditor';
import BlogList from './pages/admin/blog/BlogList';
import BlogEditor from './pages/admin/blog/BlogEditor';
import CaseStudyList from './pages/admin/case-studies/CaseStudyList';
import CaseStudyEditor from './pages/admin/case-studies/CaseStudyEditor';
import AuthGuard from './components/auth/AuthGuard';
import ReferencesList from './pages/admin/references/ReferencesList';
import ReferencesEditor from './pages/admin/references/ReferencesEditor';
import MediaLibrary from './pages/admin/media/MediaLibrary';
import FormSubmissionsList from './pages/admin/forms/FormSubmissionsList';
import Settings from './pages/admin/settings/Settings';
import HomepageManager from './pages/admin/homepage/HomepageManager';
import WhyDigmaEditor from './pages/admin/homepage/WhyDigmaEditor';
import LogosManager from './pages/admin/homepage/LogosManager';
import HeaderManager from './pages/admin/header/HeaderManager';
import FooterManager from './pages/admin/footer/FooterManager';
import AboutPageManager from './pages/admin/pages/AboutPageManager';
import ContactPageManager from './pages/admin/pages/ContactPageManager';

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
        path: "vaka-calismalari/:slug",
        element: <CaseStudyDetail />,
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
        path: "blog/:slug",
        element: <BlogPost />,
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
            element: <BlogList />,
          },
          {
            path: "blog/new",
            element: <BlogEditor />,
          },
          {
            path: "blog/:id",
            element: <BlogEditor />,
          },
          {
            path: "case-studies",
            element: <CaseStudyList />,
          },
          {
            path: "case-studies/new",
            element: <CaseStudyEditor />,
          },
          {
            path: "case-studies/:id",
            element: <CaseStudyEditor />,
          },
          {
            path: "team",
            element: <div>Team Placeholder</div>,
          },
          {
            path: "referanslar",
            element: <ReferencesList />,
          },
          {
            path: "referanslar/new",
            element: <ReferencesEditor />,
          },
          {
            path: "referanslar/:id",
            element: <ReferencesEditor />,
          },
          {
            path: "testimonials",
            element: <Navigate to="/admin/referanslar" replace />,
          },
          {
            path: "media",
            element: <MediaLibrary />,
          },
          {
            path: "forms",
            element: <FormSubmissionsList />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "homepage",
            element: <HomepageManager />,
          },
          {
            path: "homepage/why-digma",
            element: <WhyDigmaEditor />,
          },
          {
            path: "homepage/logos",
            element: <LogosManager />,
          },
          {
            path: "header",
            element: <HeaderManager />,
          },
          {
            path: "footer",
            element: <FooterManager />,
          },
          {
            path: "pages/about",
            element: <AboutPageManager />,
          },
          {
            path: "pages/contact",
            element: <ContactPageManager />,
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
