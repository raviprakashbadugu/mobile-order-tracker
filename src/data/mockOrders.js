// Mock API Service with Cache, Pull-to-Refresh, & Edge Case Controls (Indian E-commerce Edition)

const LOCAL_STORAGE_KEY = 'digital_heroes_order_cache_inr';

export const formatINR = (amount) => {
  if (typeof amount !== 'number') return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(amount);
};

export const fetchOrders = async ({ forceError = false, simulateEmpty = false, delayMs = 800 } = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      // Check offline mode
      if (!navigator.onLine) {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            const data = JSON.parse(cached);
            resolve({ data, fromCache: true, message: 'Serving cached offline Indian orders snapshot' });
            return;
          } catch (e) {
            console.error('Failed to parse cached data', e);
          }
        }
        reject(new Error('Network error: You are offline and no cached orders are available.'));
        return;
      }

      if (forceError) {
        reject(new Error('500 Internal Server Error: Failed to fetch order stream from Indian API server.'));
        return;
      }

      if (simulateEmpty) {
        resolve({ data: [], fromCache: false, message: 'No orders found' });
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.BASE_URL}api/orders.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Save to cache for offline access
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        resolve({ data, fromCache: false });
      } catch (err) {
        // Fallback to cached data if network request fails
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          try {
            resolve({ data: JSON.parse(cached), fromCache: true, message: 'Network failed, showing cache' });
            return;
          } catch (e) {
            // ignore
          }
        }
        reject(new Error('Unable to connect to Digital Heroes India Tracking Service. Please try again.'));
      }
    }, delayMs);
  });
};

export const getOrderStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-500', label: 'Pending' };
    case 'processing':
      return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500', label: 'Processing' };
    case 'shipped':
      return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', dot: 'bg-purple-500', label: 'Dispatched' };
    case 'delivered':
      return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300', dot: 'bg-emerald-500', label: 'Delivered' };
    case 'cancelled':
      return { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300', dot: 'bg-rose-500', label: 'Cancelled' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', dot: 'bg-gray-500', label: status };
  }
};
