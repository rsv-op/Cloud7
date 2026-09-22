
import { NextRequest, NextResponse } from "next/server";

interface AnalyticsEvent {
  eventName: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as AnalyticsEvent;

    if (!payload.eventName) {
      return NextResponse.json(
        { status: "error", message: "Missing eventName in telemetry payload" },
        { status: 400 }
      );
    }

    const verificationRecord = {
      received: true,
      eventName: payload.eventName,
      serverTimestamp: new Date().toISOString(),
      clientTimestamp: payload.timestamp || "unknown",
      status: "healthy",
    };

    return NextResponse.json({ success: true, verification: verificationRecord });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error?.message || "Failed to parse analytics event" },
      { status: 500 }
    );
  }
}
