import { http, HttpResponse } from 'msw';
import {
  MOCK_USERS_DATA,
  MOCK_POST_DETAIL,
  MOCK_PRODUCTS_LIST,
  MOCK_USER_BY_ID,
  MOCK_CART_ITEMS,
  MOCK_INVENTORY_ITEMS,
  MOCK_CASE_TYPES,
  MOCK_PHONE_MODELS,
  MOCK_CARTS
} from './mockData'; // <-- IMPORT DỮ LIỆU

export const handlers = [
  // 1. Mock GET request trả về danh sách người dùng
  http.get('/api/users', () => {
    // Trả về toàn bộ array MOCK_USERS_DATA
    return HttpResponse.json(MOCK_USERS_DATA, { status: 200 });
  }),

  http.get('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    if (userId === '1') {
      return HttpResponse.json(MOCK_USER_BY_ID, { status: 200 });
    }
    return HttpResponse.json({ message: 'User not found' }, { status: 404 });
  }),

  http.put('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    if (userId === '1') {
      return HttpResponse.json(MOCK_USER_BY_ID, { status: 200 });
    }
    return HttpResponse.json({ message: 'User not found' }, { status: 404 });
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

  // Mock GET request trả về danh sách giỏ hàng
  http.get('/api/cart', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    // Check if the requested userId matches the mock cart's user_id
    if (userId !== MOCK_CARTS.user_id) {
      return HttpResponse.json([], { status: 200 });
    }

    const cartId = MOCK_CARTS.id;

    const cartData = MOCK_CART_ITEMS
      .filter(item => item.cart_id === cartId)
      .map(cartItem => {
        const inventoryItem = MOCK_INVENTORY_ITEMS.find(inv => inv.id === cartItem.inventory_item_id);
        if (!inventoryItem) return null;

        const caseType = MOCK_CASE_TYPES.find(ct => ct.id === inventoryItem.case_type_id);
        const phoneModel = MOCK_PHONE_MODELS.find(pm => pm.id === inventoryItem.phone_model_id);

        return {
          id: cartItem.id,
          name: caseType ? caseType.name : 'Unknown Product',
          price: caseType ? caseType.price : 0,
          quantity: cartItem.quantity,
          imageUrl: caseType ? caseType.image_url : 'https://placehold.co/400x400?text=No+Image',
          brand: phoneModel ? phoneModel.name : '',
        };
      }).filter(item => item !== null);

    return HttpResponse.json(cartData, { status: 200 });
  }),

  // 3. Mock POST request for login
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    // Simple mock: accept any email ending with @example.com and password '123456'
    if (typeof email === 'string' && email.endsWith('@example.com') && password === '123456') {
      // Return a fake user object and token
      return HttpResponse.json({
        user: {
          id: 1,
          name: 'Test User',
          email,
        },
        token: 'mock-jwt-token',
      }, { status: 200 });
    }
    // Otherwise, return error
    return HttpResponse.json({ message: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
  }),
];