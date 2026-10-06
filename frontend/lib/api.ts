const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";
const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/+$/, "") ||
  API_URL.replace(/\/api$/, "");

type ApiResult<T> = {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: { id: number; username: string };
};

export async function fetchApi<T = ApiResult<unknown>>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi.");
  }

  const headers = new Headers(options.headers);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}/${endpoint.replace(/^\/+/, "")}`, {
    ...options,
    headers,
  });
  const responseText = await response.text();
  let result: ApiResult<unknown> | null = null;

  if (responseText) {
    try {
      result = JSON.parse(responseText) as ApiResult<unknown>;
    } catch {
      if (response.ok) {
        throw new Error("Respons API bukan JSON yang valid.");
      }
    }
  }

  if (!response.ok) {
    throw new Error(result?.message || "Terjadi kesalahan pada request API.");
  }

  return result as T;
}

const jsonRequest = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export function loginAdmin(
  username: string,
  password: string,
  turnstileToken: string,
) {
  return fetchApi<ApiResult<never>>(
    "/auth/login",
    jsonRequest("POST", {
      username,
      password,
      "cf-turnstile-response": turnstileToken,
    }),
  );
}

export function getAdminProfile() {
  return fetchApi<ApiResult<never>>("/auth/me");
}

export function getProducts(
  params: { category?: string; activeOnly?: boolean } = {},
) {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.activeOnly) query.set("active_only", "true");

  return fetchApi<ApiResult<Record<string, unknown>[]>>(
    `/products${query.size ? `?${query.toString()}` : ""}`,
  );
}

export function saveProduct(
  product: Record<string, string | number | boolean>,
  image: File | null,
  id?: number,
) {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  if (image) formData.append("image", image);

  return fetchApi<ApiResult<unknown>>(id ? `/products/${id}` : "/products", {
    method: id ? "PUT" : "POST",
    body: formData,
  });
}

export function deleteProduct(id: number) {
  return fetchApi<ApiResult<unknown>>(`/products/${id}`, { method: "DELETE" });
}

export function getPosters() {
  return fetchApi<ApiResult<Record<string, unknown>[]>>("/posters");
}

export function getPosterByCategory(category: string) {
  return fetchApi<ApiResult<Record<string, unknown>>>(
    `/posters/${encodeURIComponent(category)}`,
  );
}

export function savePoster(
  poster: { title: string; category: string; is_active: boolean },
  image: File,
  id?: number,
) {
  const formData = new FormData();
  formData.append("title", poster.title);
  formData.append("category", poster.category);
  formData.append("is_active", String(poster.is_active));
  formData.append("image", image);
  if (id) formData.append("poster_id", String(id));

  return fetchApi<ApiResult<unknown>>("/posters", {
    method: "POST",
    body: formData,
  });
}

export function deletePoster(id: number) {
  return fetchApi<ApiResult<unknown>>(`/posters/${id}`, { method: "DELETE" });
}

export function getImageUrl(imagePath: unknown) {
  if (typeof imagePath !== "string" || !imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return `${IMAGE_BASE_URL}/${imagePath.replace(/^\/+/, "")}`;
}
