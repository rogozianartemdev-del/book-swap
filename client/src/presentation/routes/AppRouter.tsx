import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { AdminUsers } from '../pages/AdminUsers/AdminUsers';
import { BookCreate } from '../pages/BookCreate/BookCreate';
import { BookDetails } from '../pages/BookDetails/BookDetails';
import { Books } from '../pages/Books/Books';
import { Forbidden } from '../pages/Forbidden/Forbidden';
import { Login } from '../pages/Login/Login';
import { MyBooks } from '../pages/MyBooks/MyBooks';
import { NotFound } from '../pages/NotFound/NotFound';
import { Profile } from '../pages/Profile/Profile';
import { Register } from '../pages/Register/Register';
import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from './routes.const';

export const AppRouter = () => (
  <Routes>
    <Route element={<GuestRoute />}>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.register} element={<Register />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.books} element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path={ROUTES.myBooks} element={<MyBooks />} />
        <Route path={ROUTES.bookCreate} element={<BookCreate />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={ROUTES.forbidden} element={<Forbidden />} />

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path={ROUTES.admin} element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>

    <Route path="/" element={<Navigate to={ROUTES.books} replace />} />
  </Routes>
);