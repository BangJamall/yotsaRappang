"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    deletePoster,
    deleteProduct,
    getAdminProfile,
    getImageUrl,
    getPosters,
    getProducts,
    loginAdmin,
    savePoster,
    saveProduct,
} from "@/lib/api";

const emptyProduct = {
    title: "",
    category: "makanan",
    price: "",
    description: "",
    is_best_seller: false,
    is_active: true,
};

const posterCategories = ["makanan", "minuman", "splash"];

function Icon({ name }) {
    return <span aria-hidden="true" className="material-symbols-outlined text-[20px]">{name}</span>;
}

function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(price) || 0);
}

export default function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("products");
    const [products, setProducts] = useState([]);
    const [posters, setPosters] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [productModalOpen, setProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productDraft, setProductDraft] = useState(emptyProduct);
    const [productImage, setProductImage] = useState(null);
    const [posterModalOpen, setPosterModalOpen] = useState(false);
    const [posterDraft, setPosterDraft] = useState({
        title: "",
        category: "makanan",
        is_active: true,
    });
    const [editingPosterId, setEditingPosterId] = useState(null);
    const [posterImage, setPosterImage] = useState(null);

    async function refreshData() {
        setLoadingData(true);
        setError("");
        try {
            const [productResult, posterResult] = await Promise.all([getProducts(), getPosters()]);
            setProducts(productResult.data || []);
            setPosters(posterResult.data || []);
        } catch (requestError) {
            setError(requestError.message || "Gagal memuat data admin.");
        } finally {
            setLoadingData(false);
        }
    }

    useEffect(() => {
        async function restoreSession() {
            const token = localStorage.getItem("admin_token");
            if (!token) {
                setCheckingSession(false);
                return;
            }

            try {
                const result = await getAdminProfile();
                setUser(result.user || null);
                await refreshData();
            } catch {
                localStorage.removeItem("admin_token");
            } finally {
                setCheckingSession(false);
            }
        }

        restoreSession();
    }, []);

    async function handleLogin(event) {
        event.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const result = await loginAdmin(username, password);
            if (!result.token) throw new Error("Token login tidak ditemukan.");
            localStorage.setItem("admin_token", result.token);
            setUser(result.user || { username });
            setPassword("");
            await refreshData();
        } catch (requestError) {
            setError(requestError.message || "Login gagal.");
        } finally {
            setSubmitting(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("admin_token");
        setUser(null);
        setProducts([]);
        setPosters([]);
        setNotice("");
        setError("");
    }

    function openProductForm(product = null) {
        setEditingProduct(product);
        setProductDraft(product ? {
            title: product.title || "",
            category: product.category || "makanan",
            price: product.price ?? "",
            description: product.description || "",
            is_best_seller: Boolean(Number(product.is_best_seller)),
            is_active: Boolean(Number(product.is_active)),
        } : emptyProduct);
        setProductImage(null);
        setProductModalOpen(true);
        setError("");
    }

    async function handleSaveProduct(event) {
        event.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await saveProduct(productDraft, productImage, editingProduct?.id);
            setProductModalOpen(false);
            setNotice(editingProduct ? "Produk berhasil diperbarui." : "Produk berhasil ditambahkan.");
            await refreshData();
        } catch (requestError) {
            setError(requestError.message || "Gagal menyimpan produk.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDeleteProduct(product) {
        if (!window.confirm(`Hapus produk ${product.title}?`)) return;
        setError("");
        try {
            await deleteProduct(Number(product.id));
            setNotice("Produk berhasil dihapus.");
            await refreshData();
        } catch (requestError) {
            setError(requestError.message || "Gagal menghapus produk.");
        }
    }

    async function handleSavePoster(event) {
        event.preventDefault();
        if (!posterImage) {
            setError("Pilih gambar poster terlebih dahulu.");
            return;
        }
        setSubmitting(true);
        setError("");

        try {
            await savePoster(posterDraft, posterImage, editingPosterId);
            setPosterModalOpen(false);
            setNotice(editingPosterId ? "Poster berhasil diperbarui." : "Poster berhasil ditambahkan.");
            await refreshData();
        } catch (requestError) {
            setError(requestError.message || "Gagal menyimpan poster.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDeletePoster(poster) {
        if (!window.confirm(`Hapus poster ${poster.title}?`)) return;
        setError("");
        try {
            await deletePoster(Number(poster.id));
            setNotice("Poster berhasil dihapus.");
            await refreshData();
        } catch (requestError) {
            setError(requestError.message || "Gagal menghapus poster.");
        }
    }

    function openPosterForm(poster = null) {
        setEditingPosterId(poster?.id || null);
        setPosterDraft({
            title: poster?.title || "",
            category: poster?.category || "makanan",
            is_active: poster ? Boolean(Number(poster.is_active)) : true,
        });
        setPosterImage(null);
        setPosterModalOpen(true);
        setError("");
    }

    if (checkingSession) {
        return <main className="mx-auto w-full max-w-container-max px-4 py-20 text-center text-on-surface-variant">Memeriksa sesi admin...</main>;
    }

    if (!user) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
                <form onSubmit={handleLogin} className="w-full max-w-md rounded-xl border border-outline-variant/40 bg-white p-7 shadow-lg sm:p-9">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon name="lock" />
                    </div>
                    <p className="mb-2 text-sm font-semibold uppercase text-primary">Yotsa Admin</p>
                    <h1 className="mb-2 text-2xl font-bold text-on-surface">Masuk ke dashboard</h1>
                    <p className="mb-7 text-sm text-on-surface-variant">Gunakan akun admin untuk mengelola katalog.</p>
                    <label className="mb-4 block text-sm font-semibold text-on-surface">
                        Username
                        <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required className="mt-2 w-full rounded-lg border border-outline-variant px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </label>
                    <label className="mb-5 block text-sm font-semibold text-on-surface">
                        Password
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="mt-2 w-full rounded-lg border border-outline-variant px-3 py-2.5 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                    </label>
                    {error && <p role="alert" className="mb-4 rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</p>}
                    <button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60">
                        <Icon name="login" /> {submitting ? "Memproses..." : "Masuk"}
                    </button>
                </form>
            </main>
        );
    }

    const activeProducts = products.filter((product) => Boolean(Number(product.is_active))).length;

    return (
        <main className="mx-auto w-full max-w-container-max flex-1 px-4 py-8 sm:px-6 md:py-12">
            <header className="mb-8 flex flex-col gap-4 border-b border-outline-variant/40 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-1 text-sm font-semibold uppercase text-primary">Yotsa Admin</p>
                    <h1 className="text-3xl font-bold text-on-surface">Dashboard</h1>
                    <p className="mt-2 text-sm text-on-surface-variant">Kelola menu dan materi promosi Yotsa.</p>
                </div>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 self-start rounded-lg border border-outline-variant px-4 py-2 text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container sm:self-auto">
                    <Icon name="logout" /> Keluar
                </button>
            </header>

            <div className="mb-7 grid grid-cols-2 gap-3 sm:gap-5">
                <div className="rounded-lg border border-outline-variant/40 bg-white p-4 sm:p-5">
                    <p className="text-sm text-on-surface-variant">Total produk</p>
                    <p className="mt-1 text-2xl font-bold text-on-surface">{products.length}</p>
                </div>
                <div className="rounded-lg border border-outline-variant/40 bg-white p-4 sm:p-5">
                    <p className="text-sm text-on-surface-variant">Produk aktif</p>
                    <p className="mt-1 text-2xl font-bold text-on-surface">{activeProducts}</p>
                </div>
            </div>

            <div className="mb-5 flex items-center justify-between gap-3 border-b border-outline-variant/40">
                <div role="tablist" aria-label="Jenis konten" className="flex gap-5">
                    <button role="tab" aria-selected={activeTab === "products"} onClick={() => setActiveTab("products")} className={`inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-semibold ${activeTab === "products" ? "border-primary text-primary" : "border-transparent text-on-surface-variant"}`}>
                        <Icon name="restaurant_menu" /> Produk
                    </button>
                    <button role="tab" aria-selected={activeTab === "posters"} onClick={() => setActiveTab("posters")} className={`inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-semibold ${activeTab === "posters" ? "border-primary text-primary" : "border-transparent text-on-surface-variant"}`}>
                        <Icon name="image" /> Poster
                    </button>
                </div>
                <button onClick={() => activeTab === "products" ? openProductForm() : openPosterForm()} className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white shadow-sm transition hover:bg-primary/90" aria-label={activeTab === "products" ? "Tambah produk" : "Tambah poster"} title={activeTab === "products" ? "Tambah produk" : "Tambah poster"}>
                    <Icon name="add" />
                </button>
            </div>

            {notice && <div role="status" className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-on-surface"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Tutup pemberitahuan"><Icon name="close" /></button></div>}
            {error && <div role="alert" className="mb-4 rounded-lg border border-error/20 bg-error/5 px-4 py-3 text-sm text-error">{error}</div>}

            <section aria-label={activeTab === "products" ? "Daftar produk" : "Daftar poster"}>
                {loadingData ? <p className="py-14 text-center text-sm text-on-surface-variant">Memuat data...</p> : activeTab === "products" ? (
                    <div className="overflow-x-auto rounded-lg border border-outline-variant/40 bg-white">
                        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                            <thead className="bg-surface-container text-xs uppercase text-on-surface-variant"><tr><th className="px-4 py-3">Produk</th><th className="px-4 py-3">Kategori</th><th className="px-4 py-3">Harga</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Aksi</th></tr></thead>
                            <tbody className="divide-y divide-outline-variant/30">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-4 py-3"><div className="flex items-center gap-3"><Image src={getImageUrl(product.image_url)} alt="" width={48} height={48} unoptimized className="h-12 w-12 rounded-md bg-surface-container object-cover" /><div><p className="font-semibold text-on-surface">{product.title}</p><p className="max-w-xs truncate text-xs text-on-surface-variant">{product.description}</p></div></div></td>
                                        <td className="px-4 py-3 capitalize text-on-surface-variant">{product.category}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-on-surface">{formatPrice(product.price)}</td>
                                        <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${Boolean(Number(product.is_active)) ? "bg-primary/10 text-primary" : "bg-surface-container text-on-surface-variant"}`}>{Boolean(Number(product.is_active)) ? "Aktif" : "Nonaktif"}</span></td>
                                        <td className="px-4 py-3"><div className="flex justify-end gap-2"><button onClick={() => openProductForm(product)} aria-label={`Edit ${product.title}`} title="Edit produk" className="flex h-9 w-9 items-center justify-center rounded-md border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"><Icon name="edit" /></button><button onClick={() => handleDeleteProduct(product)} aria-label={`Hapus ${product.title}`} title="Hapus produk" className="flex h-9 w-9 items-center justify-center rounded-md border border-error/20 text-error hover:bg-error/5"><Icon name="delete" /></button></div></td>
                                    </tr>
                                ))}
                                {!products.length && <tr><td colSpan="5" className="px-4 py-12 text-center text-on-surface-variant">Belum ada produk.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {posters.map((poster) => (
                            <article key={poster.id} className="overflow-hidden rounded-lg border border-outline-variant/40 bg-white">
                                <Image src={getImageUrl(poster.image_url)} alt={poster.title} width={900} height={675} unoptimized className="aspect-[4/3] w-full bg-surface-container object-cover" />
                                <div className="flex items-center justify-between gap-3 p-4">
                                    <div className="min-w-0"><h2 className="truncate font-semibold text-on-surface">{poster.title}</h2><p className="mt-1 text-xs capitalize text-on-surface-variant">{poster.category} · {Boolean(Number(poster.is_active)) ? "Aktif" : "Nonaktif"}</p></div>
                                    <div className="flex shrink-0 gap-2"><button onClick={() => openPosterForm(poster)} aria-label={`Ganti poster ${poster.title}`} title="Ganti poster" className="flex h-9 w-9 items-center justify-center rounded-md border border-outline-variant/50 text-on-surface-variant hover:bg-surface-container"><Icon name="edit" /></button><button onClick={() => handleDeletePoster(poster)} aria-label={`Hapus poster ${poster.title}`} title="Hapus poster" className="flex h-9 w-9 items-center justify-center rounded-md border border-error/20 text-error hover:bg-error/5"><Icon name="delete" /></button></div>
                                </div>
                            </article>
                        ))}
                        {!posters.length && <p className="col-span-full rounded-lg border border-outline-variant/40 bg-white px-4 py-12 text-center text-sm text-on-surface-variant">Belum ada poster.</p>}
                    </div>
                )}
            </section>

            {productModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setProductModalOpen(false); }}>
                    <form onSubmit={handleSaveProduct} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl sm:p-7">
                        <div className="mb-6 flex items-start justify-between"><div><p className="text-sm font-semibold text-primary">Katalog</p><h2 className="mt-1 text-xl font-bold text-on-surface">{editingProduct ? "Edit produk" : "Tambah produk"}</h2></div><button type="button" onClick={() => setProductModalOpen(false)} aria-label="Tutup" className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-surface-container"><Icon name="close" /></button></div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="text-sm font-semibold text-on-surface sm:col-span-2">Nama produk<input value={productDraft.title} onChange={(event) => setProductDraft({ ...productDraft, title: event.target.value })} required className="mt-1.5 w-full rounded-lg border border-outline-variant px-3 py-2.5 font-normal" /></label>
                            <label className="text-sm font-semibold text-on-surface">Kategori<select value={productDraft.category} onChange={(event) => setProductDraft({ ...productDraft, category: event.target.value })} className="mt-1.5 w-full rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-normal"><option value="makanan">Makanan</option><option value="minuman">Minuman</option></select></label>
                            <label className="text-sm font-semibold text-on-surface">Harga<input type="number" min="0" value={productDraft.price} onChange={(event) => setProductDraft({ ...productDraft, price: event.target.value })} required className="mt-1.5 w-full rounded-lg border border-outline-variant px-3 py-2.5 font-normal" /></label>
                            <label className="text-sm font-semibold text-on-surface sm:col-span-2">Deskripsi<textarea value={productDraft.description} onChange={(event) => setProductDraft({ ...productDraft, description: event.target.value })} rows="3" className="mt-1.5 w-full rounded-lg border border-outline-variant px-3 py-2.5 font-normal" /></label>
                            <label className="text-sm font-semibold text-on-surface sm:col-span-2">Gambar {editingProduct && <span className="font-normal text-on-surface-variant">(kosongkan jika tidak diganti)</span>}<input type="file" accept="image/jpeg,image/png,image/webp" required={!editingProduct} onChange={(event) => setProductImage(event.target.files?.[0] || null)} className="mt-1.5 block w-full text-sm font-normal file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:font-semibold file:text-primary" /></label>
                            <label className="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" checked={productDraft.is_best_seller} onChange={(event) => setProductDraft({ ...productDraft, is_best_seller: event.target.checked })} className="h-4 w-4 accent-primary" />Best Seller</label>
                            <label className="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" checked={productDraft.is_active} onChange={(event) => setProductDraft({ ...productDraft, is_active: event.target.checked })} className="h-4 w-4 accent-primary" />Produk aktif</label>
                        </div>
                        <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setProductModalOpen(false)} className="rounded-lg border border-outline-variant px-4 py-2.5 text-sm font-semibold text-on-surface-variant">Batal</button><button disabled={submitting} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Menyimpan..." : "Simpan produk"}</button></div>
                    </form>
                </div>
            )}

            {posterModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPosterModalOpen(false); }}>
                    <form onSubmit={handleSavePoster} className="w-full max-w-lg rounded-xl bg-white p-5 shadow-2xl sm:p-7">
                        <div className="mb-6 flex items-start justify-between"><div><p className="text-sm font-semibold text-primary">Materi promosi</p><h2 className="mt-1 text-xl font-bold text-on-surface">{editingPosterId ? "Edit poster" : posterDraft.category === "splash" ? "Tambah poster splash" : posters.some((poster) => poster.category === posterDraft.category) ? "Ganti poster" : "Tambah poster"}</h2></div><button type="button" onClick={() => setPosterModalOpen(false)} aria-label="Tutup" className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-surface-container"><Icon name="close" /></button></div>
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-on-surface">Judul poster<input value={posterDraft.title} onChange={(event) => setPosterDraft({ ...posterDraft, title: event.target.value })} required className="mt-1.5 w-full rounded-lg border border-outline-variant px-3 py-2.5 font-normal" /></label>
                            <label className="block text-sm font-semibold text-on-surface">Kategori<select value={posterDraft.category} onChange={(event) => setPosterDraft({ ...posterDraft, category: event.target.value })} className="mt-1.5 w-full rounded-lg border border-outline-variant bg-white px-3 py-2.5 font-normal">{posterCategories.map((category) => <option key={category} value={category} className="capitalize">{category}</option>)}</select></label>
                            <label className="block text-sm font-semibold text-on-surface">Gambar poster<input type="file" accept="image/jpeg,image/png,image/webp" required onChange={(event) => setPosterImage(event.target.files?.[0] || null)} className="mt-1.5 block w-full text-sm font-normal file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:font-semibold file:text-primary" /></label>
                            <label className="flex items-center gap-2 text-sm text-on-surface"><input type="checkbox" checked={posterDraft.is_active} onChange={(event) => setPosterDraft({ ...posterDraft, is_active: event.target.checked })} className="h-4 w-4 accent-primary" />Poster aktif</label>
                            <p className="text-xs text-on-surface-variant">Format JPG, PNG, atau WEBP. Maksimal 5 MB. Gambar baru menggantikan poster dengan kategori yang sama.</p>
                        </div>
                        <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setPosterModalOpen(false)} className="rounded-lg border border-outline-variant px-4 py-2.5 text-sm font-semibold text-on-surface-variant">Batal</button><button disabled={submitting} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Menyimpan..." : "Simpan poster"}</button></div>
                    </form>
                </div>
            )}
        </main>
    );
}
