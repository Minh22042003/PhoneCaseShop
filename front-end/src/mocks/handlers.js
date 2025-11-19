import { http, HttpResponse } from 'msw';
import { MOCK_USERS_DATA, MOCK_POST_DETAIL, MOCK_PRODUCTS_LIST } from './mockData'; // <-- IMPORT DỮ LIỆU

export const handlers = [
  // 1. Mock GET request trả về danh sách người dùng
  http.get('/api/users', () => {
    // Trả về toàn bộ array MOCK_USERS_DATA
    return HttpResponse.json(MOCK_USERS_DATA, { status: 200 });
  }),

  // 2. Mock GET request trả về chi tiết một bài post
  http.get('/api/posts/:postId', ({ params }) => {
    const { postId } = params;

    if (postId === 'p101') {
      // Trả về object MOCK_POST_DETAIL
      return HttpResponse.json(MOCK_POST_DETAIL, { status: 200 });
    }

    // Trường hợp không tìm thấy bài post
    return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
  }),

  http.get('/api/products/all', () => {
    return HttpResponse.json(MOCK_PRODUCTS_LIST, { status: 200 });
  }),
];