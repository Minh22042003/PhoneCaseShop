import { http, HttpResponse } from 'msw';
import {
  MOCK_POST_DETAIL,
  MOCK_PRODUCTS_LIST,
  MOCK_USER_BY_ID,
  MOCK_CART_ITEMS,
  MOCK_INVENTORY_ITEMS,
  MOCK_CASE_TYPES,
  MOCK_PHONE_MODELS,
  MOCK_CARTS,
  MOCK_ORDER,
  MOCK_ORDER_ITEMS,
  MOCK_DESIGNS,
  MOCK_ADMIN_ACCOUNT,
  MOCK_USERS
} from './mockData';

export const handlers = [
  http.get('/api/admin/users', () => {
    return HttpResponse.json(MOCK_USERS, { status: 200 });
  }),

  // Mock GET request for all case types (products)
  http.get('/api/admin/products', () => {
    return HttpResponse.json(MOCK_CASE_TYPES, { status: 200 });
  }),

  // Mock GET request for inventory items
  http.get('/api/admin/inventory', () => {
    // Enrich inventory items with product details
    const inventory = MOCK_INVENTORY_ITEMS.map(item => {
      const phoneModel = MOCK_PHONE_MODELS.find(pm => pm.id === item.phone_model_id);
      const caseType = MOCK_CASE_TYPES.find(ct => ct.id === item.case_type_id);
      return {
        ...item,
        phone_model_name: phoneModel ? phoneModel.name : item.phone_model_id,
        case_type_name: caseType ? caseType.name : item.case_type_id,
      };
    });
    return HttpResponse.json(inventory, { status: 200 });
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
      return HttpResponse.json(MOCK_POST_DETAIL, { status: 200 });
    }

    return HttpResponse.json({ message: 'Post not found' }, { status: 404 });
  }),

  http.get('/api/products/all', () => {
    return HttpResponse.json(MOCK_PRODUCTS_LIST, { status: 200 });
  }),

  // Mock GET request trả về danh sách giỏ hàng
  http.get('/api/cart', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

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
    if (typeof email === 'string' && email.endsWith('@example.com') && password === '123456') {
      return HttpResponse.json({
        user: {
          id: 1,
          name: 'Test User',
          email,
        },
        token: 'mock-jwt-token',
      }, { status: 200 });
    }
    return HttpResponse.json({ message: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
  }),

  // Mock POST request for ADMIN login
  http.post('/api/admin/login', async ({ request }) => {
    const { email, password } = await request.json();
    // Check against MOCK_ADMIN_ACCOUNT
    if (email === MOCK_ADMIN_ACCOUNT.email && password === '123456') {
      return HttpResponse.json({
        user: {
          ...MOCK_ADMIN_ACCOUNT
        },
        token: 'mock-admin-jwt-token',
      }, { status: 200 });
    }
    return HttpResponse.json({ message: 'Email hoặc mật khẩu quản trị viên không đúng.' }, { status: 401 });
  }),

  // Mock GET request to check ADMIN auth
  http.get('/api/admin/check-auth', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader === 'Bearer mock-admin-jwt-token') {
      return HttpResponse.json({
        user: {
          ...MOCK_ADMIN_ACCOUNT
        }
      }, { status: 200 });
    }
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }),

  // 4. Mock POST request tạo đơn hàng
  http.post('/api/orders', async ({ request }) => {
    const orderData = await request.json();
    return HttpResponse.json({ ...MOCK_ORDER, ...orderData, id: 'new_order_id' }, { status: 201 });
  }),

  // 5. Mock GET request lấy danh sách đơn hàng của user
  http.get('/api/orders', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (userId !== MOCK_ORDER.user_id) {
      return HttpResponse.json([], { status: 200 });
    }

    return HttpResponse.json([MOCK_ORDER], { status: 200 });
  }),

  // 6. Mock GET request lấy chi tiết đơn hàng
  http.get('/api/orders/:orderId', ({ params }) => {
    const { orderId } = params;
    if (orderId === MOCK_ORDER.id || orderId === 'new_order_id') {
      const orderItems = MOCK_ORDER_ITEMS.map(item => {
        const inventoryItem = MOCK_INVENTORY_ITEMS.find(inv => inv.id === item.inventory_item_id);
        if (!inventoryItem) return null;

        const caseType = MOCK_CASE_TYPES.find(ct => ct.id === inventoryItem.case_type_id);
        const phoneModel = MOCK_PHONE_MODELS.find(pm => pm.id === inventoryItem.phone_model_id);

        return {
          ...item,
          name: caseType ? caseType.name : 'Unknown Product',
          imageUrl: caseType ? caseType.image_url : '',
          brand: phoneModel ? phoneModel.name : '',
        }
      }).filter(Boolean);

      return HttpResponse.json({ ...MOCK_ORDER, items: orderItems }, { status: 200 });
    }
    return HttpResponse.json({ message: 'Order not found' }, { status: 404 });
  }),

  // 7. Mock GET request lấy danh sách mẫu điện thoại
  http.get('/api/phone-models', () => {
    return HttpResponse.json(MOCK_PHONE_MODELS, { status: 200 });
  }),

  // 8. Mock POST request tạo bản thiết kế mới
  http.post('/api/designs', async ({ request }) => {
    const designData = await request.json();
    // Trả về dữ liệu đã nhận kèm theo ID mới và status success
    return HttpResponse.json({
      ...designData,
      id: 'new_design_id_' + Date.now(),
      status: 'success',
      created_at: new Date().toISOString()
    }, { status: 201 });
  }),

  // 9. Mock GET request lấy danh sách thiết kế của user
  http.get('/api/designs', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    // Trong môi trường thật, sẽ lọc theo userId. 
    // Ở đây ta trả về MOCK_DESIGNS (được wrap trong mảng vì MOCK_DESIGNS là object đơn lẻ trong mockData hiện tại)
    return HttpResponse.json([MOCK_DESIGNS], { status: 200 });
  }),
];