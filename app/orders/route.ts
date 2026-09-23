
import { NextRequest, NextResponse } from "next/server";

type Brand = 'BurgerForge' | 'TacoMatrix' | 'WingProtocol' | 'GreenBowl';

interface RawOrderPayload {
  brand: Brand;
  channel: 'DoorDash' | 'UberEats' | 'GrubHub' | 'Direct Web';
  items: Array<{ name: string; qty: number; notes?: string }>;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as RawOrderPayload;

    if (!payload.brand || !payload.items || !payload.channel) {
      return NextResponse.json(
        { error: "Missing required order fields: brand, items, or channel." },
        { status: 400 }
      );
    }

    // PII Sanitization Firewall: Strip customer data before it reaches the local depletion engine
    const sanitizedOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      brand: payload.brand,
      channel: payload.channel,
      items: payload.items.map(item => ({
        name: item.name,
        qty: item.qty,
        // Regex firewall to strip potential phone numbers or emails from delivery notes
        notes: item.notes 
          ? item.notes
              .replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[REDACTED-PHONE]")
              .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[REDACTED-EMAIL]")
          : undefined
      })),
      status: "PENDING",
      elapsedMins: 0,
      timestamp: Date.now()
    };

    return NextResponse.json({ 
      success: true, 
      message: "Order sanitized and structured.",
      order: sanitizedOrder 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process incoming order webhook." },
      { status: 500 }
    );
  }
}
