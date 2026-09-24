import type { Workout } from "@/../lib/types";

export const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_BASE, { cache: "no-store" });
  return parseResponse<Workout[]>(response);
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  return parseResponse<Workout>(response);
}
