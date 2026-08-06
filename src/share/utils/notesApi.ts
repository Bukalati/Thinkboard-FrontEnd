const BASE_URL = "https://thinkboard.codewithmmd.ir/api";

export const request = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${url}`, init);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(
      errorBody?.message ?? `درخواست ناموفق بود (کد ${res.status})`,
    );
  }
  return (await res.json()) as T;
};
