export const PATHS: Record<string, string> = {
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  PRODUCT: `product`,
  // PRODUCT_DETAIL: `/product/:slug`,
  // CART: `/cart`,
  // CHECKOUT: `/checkout`,
  // ORDERS: `/orders`,
  // ABOUT: `/about`,
  // CONTACT: `/contact`,
  // BLOG: `/blog`,
  // BLOG_DETAIL: `/blog/:slug`,
};
export const PATHCONST = {
  ADMIN: {
    INDEX: `/${PATHS.ADMIN}`,
    DASHBOARD: {
      INDEX: `/${PATHS.ADMIN}/${PATHS.DASHBOARD}`,
      DETAIL: (slug: string) => `/DETAIL/${slug}`,
    },
    PRODUCT: {
      INDEX: `/${PATHS.ADMIN}/${PATHS.PRODUCT}`,
      CREATE: `/${PATHS.ADMIN}/${PATHS.PRODUCT}/create`,
      UPDATE: (slug: string) => `/${PATHS.ADMIN}/${PATHS.PRODUCT}/update/${slug}`,
      DELETE: (slug: string) => `/${PATHS.ADMIN}/${PATHS.PRODUCT}/delete/${slug}`,
      DETAIL: (slug: string) => `/${PATHS.ADMIN}/${PATHS.PRODUCT}/detail/${slug}`,
    },
    NOTIFICATION: {
      CHECKALL: `/${PATHS.ADMIN}/notification/checkall`,
    }
  },
};
