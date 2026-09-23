

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'DISPATCHED';
export type Brand = 'BurgerForge' | 'TacoMatrix' | 'WingProtocol' | 'GreenBowl';

export interface Order {
  id: string;
  brand: Brand;
  channel: 'DoorDash' | 'UberEats' | 'GrubHub' | 'Direct Web';
  items: { name: string; qty: number; notes?: string }[];
  status: OrderStatus;
  elapsedMins: number;
  timestamp: number;
}

export interface InventoryItem {
  sku: string;
  name: string;
  stock: number;
  threshold: number;
  unit: string;
}

const DB_NAME = 'DarkCloudOS';
const DB_VERSION = 1;

export function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('IndexedDB is not available on the server during SSR.'));
    }
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('inventory')) {
        db.createObjectStore('inventory', { keyPath: 'sku' });
      }
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function initDefaultInventory(): Promise<void> {
  if (typeof window === 'undefined') return; // Guard for Vercel static build
  
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('inventory', 'readwrite');
      const store = tx.objectStore('inventory');
      
      const defaultItems: InventoryItem[] = [
        { sku: "BEEF-01", name: "Angus Beef Patties", stock: 120, threshold: 30, unit: "units" },
        { sku: "BUN-01", name: "Brioche Buns", stock: 18, threshold: 25, unit: "units" },
        { sku: "TACO-01", name: "Birria Beef", stock: 45, threshold: 10, unit: "lbs" },
        { sku: "WING-01", name: "Jumbo Chicken Wings", stock: 310, threshold: 100, unit: "units" },
        { sku: "TUNA-01", name: "Sashimi Ahi Tuna", stock: 24, threshold: 8, unit: "lbs" }
      ];
      
      defaultItems.forEach(item => store.put(item));
      
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Failed to initialize inventory:", error);
  }
}

export async function createMockOrder(brand: Brand): Promise<Order | null> {
  if (typeof window === 'undefined') return null; // Guard for Vercel static build
  
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('orders', 'readwrite');
      const store = tx.objectStore('orders');
      
      const order: Order = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        brand,
        channel: 'Direct Web',
        items: [{ name: 'Chef Special Signature Item', qty: 1 }],
        status: 'PENDING',
        elapsedMins: 0,
        timestamp: Date.now()
      };
      
      store.put(order);
      
      tx.oncomplete = () => resolve(order);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Failed to create mock order:", error);
    return null;
  }
}
