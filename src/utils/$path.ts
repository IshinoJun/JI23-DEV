/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  $404: {
    $url: (url?: { hash?: string }) => ({ pathname: '/404' as const, hash: url?.hash })
  },
  blogs: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/blogs/[id]' as const, query: { id }, hash: url?.hash })
    }),
    categories: {
      _id: (id: string | number) => ({
        page: {
          _offset: (offset: string | number) => ({
            $url: (url?: { hash?: string }) => ({ pathname: '/blogs/categories/[id]/page/[offset]' as const, query: { id, offset }, hash: url?.hash })
          })
        }
      })
    },
    page: {
      _offset: (offset: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blogs/page/[offset]' as const, query: { offset }, hash: url?.hash })
      })
    },
    search: {
      $url: (url?: { hash?: string }) => ({ pathname: '/blogs/search' as const, hash: url?.hash })
    },
    sitemap: {
      $url: (url?: { hash?: string }) => ({ pathname: '/blogs/sitemap' as const, hash: url?.hash })
    },
    tags: {
      _id: (id: string | number) => ({
        page: {
          _offset: (offset: string | number) => ({
            $url: (url?: { hash?: string }) => ({ pathname: '/blogs/tags/[id]/page/[offset]' as const, query: { id, offset }, hash: url?.hash })
          })
        }
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/blogs' as const, hash: url?.hash })
  },
  contact: {
    error: {
      $url: (url?: { hash?: string }) => ({ pathname: '/contact/error' as const, hash: url?.hash })
    },
    success: {
      $url: (url?: { hash?: string }) => ({ pathname: '/contact/success' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/contact' as const, hash: url?.hash })
  },
  portfolio: {
    $url: (url?: { hash?: string }) => ({ pathname: '/portfolio' as const, hash: url?.hash })
  },
  privacy: {
    $url: (url?: { hash?: string }) => ({ pathname: '/privacy' as const, hash: url?.hash })
  },
  profile: {
    $url: (url?: { hash?: string }) => ({ pathname: '/profile' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
