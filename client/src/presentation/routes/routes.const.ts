export const ROUTES = {
    login: '/login',
    register: '/register',
    books: '/books',
    bookDetails: (id: string) => `/books/${id}`,
    myBooks: '/me/books',
    bookCreate: '/me/books/new',
    profile: '/profile',
    admin: '/admin',
    forbidden: '/403',
  } as const;