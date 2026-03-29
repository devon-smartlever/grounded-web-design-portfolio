/**
 * API route for triggering Kling AI animation generation on-demand.
 * POST /api/generate-animation
 *
 * This is useful for generating animations via a UI or webhook
 * rather than a script. Requires KLING_AI_API_KEY in env.
 *
 * Note: Generation is async — returns a task_id that you poll with
 * GET /api/generate-animation?taskId=<id>
 */

import { generateTextToVideo, getTaskStatus } from "@/lib/kling-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, aspect_ratio, duration, mode } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const task = await generateTextToVideo({
      prompt,
      aspect_ratio: aspect_ratio ?? "16:9",
      duration: duration ?? 5,
      mode: mode ?? "std",
      model_name: "kling-v2",
    });

    return NextResponse.json({
      task_id: task.task_id,
      status: task.task_status,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const taskId = request.nextUrl.searchParams.get("taskId");
    if (!taskId) {
      return NextResponse.json(
        { error: "taskId is required" },
        { status: 400 }
      );
    }

    const task = await getTaskStatus(taskId);

    return NextResponse.json({
      task_id: task.task_id,
      status: task.task_status,
      videos: task.task_result?.videos ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
