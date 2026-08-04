const BASE_URL = "https://thinkboard.codewithmmd.ir/api";

export const request = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const data = await fetch(`${BASE_URL}${url}`, init);
  if (!data.ok) {
    throw new Error("not ok");
  }
  return (await data.json()) as T;
};
