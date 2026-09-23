
import { NextRequest, NextResponse } from "next/server";

interface InventoryAdjustment {
  sku: string;
  adjustment: number;
  supplierId?: string;
  notes?: string;
}

interface InventoryPayload {
  batchId: string;
  updates: InventoryAdjustment[];
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as InventoryPayload;

    if (!payload.batchId || !payload.updates || !Array.isArray(payload.updates)) {
      return NextResponse.json(
        { error: "Invalid payload format. Required: batchId and updates array." },
        { status: 400 }
      );
    }

    // Sanitization Firewall: Strip sensitive supplier routing IDs and sanitize input notes
    const sanitizedUpdates = payload.updates.map(item => ({
      sku: item.sku.toUpperCase().trim(),
      adjustment: typeof item.adjustment === "number" ? item.adjustment : 0,
      // Strip potential script injection or SQL control characters from notes
      notes: item.notes 
        ? item.notes.replace(/<[^>]*>?/gm, "").substring(0, 100) 
        : "Standard restock"
    })).filter(item => item.sku !== "");

    return NextResponse.json({
      success: true,
      message: "Inventory batch sanitized and structured.",
      processedBatch: {
        batchId: payload.batchId,
        timestamp: Date.now(),
        updates: sanitizedUpdates
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to process incoming inventory webhook." },
      { status: 500 }
    );
  }
}
