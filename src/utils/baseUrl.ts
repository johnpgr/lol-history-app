export function getBaseUrl() {
    if (typeof window !== "undefined")
        return `${window.location.protocol}//${window.location.hostname}:${
            process.env.PORT ?? 3000
        }`; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}
