export const RON = (n) =>
    new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(Math.round(n || 0)) + " RON";

export const NUM = (n) =>
    new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n || 0);

export const time = (d) =>
    new Date(d).toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });

export const nowTime = () =>
    new Date().toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export const uid = (p = "ID") => p + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();