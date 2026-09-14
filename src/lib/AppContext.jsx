import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
    EVENT, CURRENT_USER, ROLES, TICKET_TYPES, DRIVERS, CARS, STAFF_DEPARTMENTS,
    INCIDENT_TYPES, EXPO_CARS_SAMPLE, MERCH, SPONSORS, VENDORS, PARKING,
    ACCREDITATIONS_SEED, NOTIFICATION_TARGETS, SCHEDULE, QUALIFYING, BATTLES,
    ACCREDITATION_TYPES, EXPO_CATEGORIES,
} from "./mockData";
import { uid, nowTime } from "./format";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const baselineActivity = [
    { time: "14:42", text: "Bilet VIP scanat la Paddock" },
    { time: "14:41", text: "Bilet Drift Taxi vândut pentru Pilot #23" },
    { time: "14:39", text: "Verificare tehnică finalizată — PASS" },
    { time: "14:37", text: "Program Grupa B actualizat" },
    { time: "14:35", text: "Mașina expo #47 a primit un vot" },
];

const baselineAudit = [
    { time: "14:42:03", user: "Securitate #04", role: "Securitate", action: "Scan Acces", entity: "Bilet #T92842", result: "GRANTED" },
    { time: "14:41:48", user: "Casier Maria", role: "Casier", action: "Vânzare Drift Taxi", entity: "Pilot #23", result: "200 RON" },
    { time: "14:40:11", user: "Race Control", role: "Control Pista", action: "Status Pistă", entity: "RED FLAG → TRACK OPEN", result: "OK" },
    { time: "14:38:22", user: "Inspector Radu", role: "Inspector Tehnic", action: "Inspecție", entity: "#23 BMW E36", result: "PASS" },
];

const baselineScans = [
    { id: "s1", time: "14:41", name: "Ion Georgescu", ticket: "VIP", zone: "Paddock", result: "GRANTED" },
    { id: "s2", time: "14:38", name: "Maria V.", ticket: "GENERAL", zone: "Paddock", result: "DENIED", reason: "Fără acces Paddock" },
    { id: "s3", time: "14:35", name: "Andrei P.", ticket: "PADDOCK", zone: "Paddock", result: "GRANTED" },
];

export function AppProvider({ children }) {
    const [day, setDay] = useState(1);
    const [role, setRole] = useState("Administrator");
    const [trackStatus, setTrackStatusState] = useState("OPEN");
    const [trackChange, setTrackChange] = useState({ status: "TRACK OPEN", by: "Race Control", time: "14:30" });
    const [session, setSession] = useState({ name: "Grupa A", window: "14:00–15:00", driversOnTrack: 10, next: "Grupa B", nextTime: "15:00" });

    // KPIs
    const [kpis, setKpis] = useState({
        ticketsSold: 2847, peopleInside: 2315, driftTaxiRides: 126, cashRevenue: 284700,
        driversActive: 18, expoCars: 74, staffPresent: 93,
    });

    const [cart, setCart] = useState({});
    const [recentSales, setRecentSales] = useState([]);
    const [accessScans, setAccessScans] = useState(baselineScans);
    const [assignedZone, setAssignedZone] = useState("PADDOCK");

    // Drift Taxi
    const [taxiDrivers, setTaxiDrivers] = useState(() =>
        DRIVERS.filter((d) => d.driftTaxi === "Enabled").slice(0, 8).map((d) => ({
            ...d, queue: [], sold: 10 + (parseInt(d.number) % 20), completed: 8 + (parseInt(d.number) % 18), revenue: 0,
        }))
    );
    const [selectedTaxiDriver, setSelectedTaxiDriver] = useState(null);

    // Incidents
    const [incidents, setIncidents] = useState([
        { id: "INC-023", type: "Vehicle stopped on track", priority: "HIGH", zone: "Turn 3", time: "14:36", status: "IN PROGRESS", timeline: [{ t: "14:36", e: "Creat" }, { t: "14:37", e: "Asignat Echipa Recovery" }] },
        { id: "INC-024", type: "Spectator medical assistance", priority: "MEDIUM", zone: "VIP Zone", time: "14:41", status: "ASSIGNED", timeline: [{ t: "14:41", e: "Creat" }] },
    ]);

    // Expo
    const [expoCars, setExpoCars] = useState(EXPO_CARS_SAMPLE);
    const [expoVotingOpen, setExpoVotingOpen] = useState(true);
    const [expoVotesTotal, setExpoVotesTotal] = useState(1842);
    const [expoStats] = useState({ registered: 92, approved: 78, checkedIn: 74 });
    const [myVote, setMyVote] = useState(null);

    // Track layout voting
    const [trackVote, setTrackVote] = useState(null);
    const [trackVotes] = useState({ A: 7, B: 9, C: 2 });

    // Staff
    const [staff] = useState(STAFF_DEPARTMENTS);

    // Cash register
    const [reg, setReg] = useState({ open: true, register: "Gate POS 01", cashier: "Maria Popescu", openingCash: 1000, sales: 14850, counted: null, difference: null, closed: false });
    const [regTx, setRegTx] = useState([
        { id: "r1", time: "09:00", type: "Deschidere", amount: 1000 },
        { id: "r2", time: "10:12", type: "Vânzare Bilete", amount: 600 },
        { id: "r3", type: "Vânzare Bilete", time: "11:40", amount: 450 },
        { id: "r4", time: "13:20", type: "Drift Taxi", amount: 200 },
    ]);

    // Merch
    const [merch, setMerch] = useState(MERCH);
    const [merchCart, setMerchCart] = useState({});

    // Notifications
    const [notifications, setNotifications] = useState([
        { id: "n1", time: "14:30", to: "Toți Piloții", text: "Grupa A începe în 30 minute.", priority: "Important" },
        { id: "n2", time: "13:50", to: "Securitate", text: "Verificați accesul la P2 VIP.", priority: "Normal" },
    ]);

    // Activity & audit
    const [activity, setActivity] = useState(baselineActivity);
    const [audit, setAudit] = useState(baselineAudit);

    const addActivity = useCallback((text) => {
        setActivity((a) => [{ time: nowTime().slice(0, 5), text }, ...a].slice(0, 30));
    }, []);

    const addAudit = useCallback((entry) => {
        setAudit((a) => [{ time: nowTime(), user: CURRENT_USER.name, role, ...entry }, ...a].slice(0, 100));
    }, [role]);

    // ---- Actions ----
    const changeDay = (d) => { setDay(d); toast.success(`Zi selectată: ${EVENT.days.find((x) => x.id === d).label}`); };

    const setTrackStatus = (status, label) => {
        setTrackStatusState(status);
        const change = { status: label, by: CURRENT_USER.name, time: nowTime().slice(0, 5) };
        setTrackChange(change);
        addActivity(`Status pistă: ${label}`);
        addAudit({ action: "Status Pistă", entity: label, result: "OK" });
        if (status === "RED") toast.error("🔴 RED FLAG ACTIVAT — Pista închisă!");
        else toast.success(`Status pistă: ${label}`);
    };

    const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const decFromCart = (id) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) - 1) }));
    const removeFromCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });
    const clearCart = () => setCart({});

    const cartTotal = useMemo(() =>
            Object.entries(cart).reduce((s, [id, q]) => s + (TICKET_TYPES.find((t) => t.id === id)?.price || 0) * q, 0),
        [cart]);
    const cartCount = useMemo(() => Object.values(cart).reduce((s, q) => s + q, 0), [cart]);

    const confirmSale = () => {
        if (cartCount === 0) { toast.error("Coș gol"); return null; }
        const tickets = Object.entries(cart).flatMap(([id, q]) => {
            const t = TICKET_TYPES.find((x) => x.id === id);
            return Array.from({ length: q }, () => ({ id: uid("T"), type: t.name, price: t.price, zone: t.zone }));
        });
        setKpis((k) => ({ ...k, ticketsSold: k.ticketsSold + cartCount, peopleInside: k.peopleInside + cartCount, cashRevenue: k.cashRevenue + cartTotal }));
        setReg((r) => ({ ...r, sales: r.sales + cartTotal }));
        setRegTx((t) => [{ id: uid("r"), time: nowTime().slice(0, 5), type: "Vânzare Bilete", amount: cartTotal }, ...t]);
        setRecentSales((s) => [{ id: uid("S"), time: nowTime().slice(0, 5), tickets, total: cartTotal }, ...s]);
        addActivity(`Vânzare bilete: ${cartCount} × ${cartTotal} RON`);
        addAudit({ action: "Vânzare Bilete", entity: `${cartCount} bilete`, result: `${cartTotal} RON` });
        clearCart();
        return tickets;
    };

    const scanAccess = () => {
        const granted = Math.random() > 0.3;
        const names = ["Ion Georgescu", "Maria V.", "Andrei P.", "Cristian S.", "Daniel P.", "Alex M."];
        const name = names[Math.floor(Math.random() * names.length)];
        const ticket = granted ? (Math.random() > 0.5 ? "VIP" : "PADDOCK") : "GENERAL";
        const scan = { id: uid("s"), time: nowTime().slice(0, 5), name, ticket, zone: assignedZone, result: granted ? "GRANTED" : "DENIED", reason: granted ? null : "Fără acces " + assignedZone };
        setAccessScans((s) => [scan, ...s].slice(0, 20));
        addActivity(`Scan ${granted ? "GRANTED" : "DENIED"} — ${name} (${ticket})`);
        addAudit({ action: "Scan Acces", entity: name, result: scan.result });
        if (granted) setKpis((k) => ({ ...k, peopleInside: k.peopleInside + 1 }));
        return scan;
    };

    const sellDriftTaxiRide = (driverId) => {
        const driver = taxiDrivers.find((d) => d.id === driverId);
        if (!driver) return;
        const passenger = { id: uid("P"), name: ["Alex M.", "Daniel P.", "Cristian S.", "Vlad R."][Math.floor(Math.random() * 4)], status: "WAITING" };
        setTaxiDrivers((ds) => ds.map((d) => d.id === driverId ? { ...d, queue: [...d.queue, passenger], sold: d.sold + 1, revenue: d.revenue + d.driftTaxiPrice } : d));
        setKpis((k) => ({ ...k, driftTaxiRides: k.driftTaxiRides + 1, cashRevenue: k.cashRevenue + driver.driftTaxiPrice }));
        setReg((r) => ({ ...r, sales: r.sales + driver.driftTaxiPrice }));
        setRegTx((t) => [{ id: uid("r"), time: nowTime().slice(0, 5), type: "Drift Taxi", amount: driver.driftTaxiPrice }, ...t]);
        addActivity(`Bilet Drift Taxi vândut — Pilot #${driver.number}`);
        addAudit({ action: "Vânzare Drift Taxi", entity: `Pilot #${driver.number}`, result: `${driver.driftTaxiPrice} RON` });
        toast.success(`Cursă vândută — #${driver.number} ${driver.name}`);
    };

    const completeRide = (driverId, passengerId) => {
        setTaxiDrivers((ds) => ds.map((d) => {
            if (d.id !== driverId) return d;
            const p = d.queue.find((q) => q.id === passengerId);
            return { ...d, queue: d.queue.filter((q) => q.id !== passengerId).map((q, i) => i === 0 ? { ...q, status: "READY" } : q), completed: d.completed + 1 };
        }));
        addActivity(`Cursă Drift Taxi finalizată — Pilot #${taxiDrivers.find((d) => d.id === driverId)?.number}`);
        toast.success("Cursă finalizată");
    };

    const createIncident = (data) => {
        const inc = { id: uid("INC"), time: nowTime().slice(0, 5), status: "IN PROGRESS", timeline: [{ t: nowTime().slice(0, 5), e: "Creat" }], ...data };
        setIncidents((i) => [inc, ...i]);
        setKpis((k) => ({ ...k }));
        addActivity(`Incident nou: ${inc.type} (${inc.priority})`);
        addAudit({ action: "Incident Nou", entity: inc.id, result: inc.priority });
        toast.error(`Incident creat: ${inc.id}`);
    };

    const updateIncidentStatus = (id, status, event) => {
        setIncidents((is) => is.map((i) => i.id === id ? { ...i, status, timeline: [...i.timeline, { t: nowTime().slice(0, 5), e: event }] } : i));
        addActivity(`Incident ${id}: ${event}`);
    };

    const voteExpoCar = (carId) => {
        if (!expoVotingOpen) { toast.error("Votarea este închisă"); return false; }
        if (myVote) { toast.error("Ai votat deja"); return false; }
        setExpoCars((cs) => cs.map((c) => c.id === carId ? { ...c, votes: c.votes + 1 } : c));
        setExpoVotesTotal((v) => v + 1);
        setMyVote(carId);
        addActivity(`Mașina expo #${expoCars.find((c) => c.id === carId)?.number} a primit un vot`);
        return true;
    };

    const closeExpoVoting = () => { setExpoVotingOpen(false); addActivity("Votare Expo închisă"); toast.success("Votare închisă — rezultate oficiale generate"); };

    const voteTrack = (opt) => { if (!trackVote) { setTrackVote(opt); toast.success(`Vot înregistrat: Track ${opt}`); } else toast.error("Ai votat deja"); };

    const closeRegister = (counted) => {
        const expected = reg.openingCash + reg.sales;
        const diff = counted - expected;
        setReg((r) => ({ ...r, counted, difference: diff, closed: true, open: false }));
        addAudit({ action: "Închidere Casă", entity: reg.register, result: `${diff >= 0 ? "+" : ""}${diff} RON` });
        toast.success(`Casă închisă. Diferență: ${diff >= 0 ? "+" : ""}${diff} RON`);
    };
    const openRegister = () => { setReg((r) => ({ ...r, open: true, closed: false, counted: null, difference: null, openingCash: 1000, sales: 0 })); toast.success("Casă deschisă"); };
    const cashAdjustment = (amount, reason) => {
        setRegTx((t) => [{ id: uid("r"), time: nowTime().slice(0, 5), type: "Ajustare: " + reason, amount }, ...t]);
        setReg((r) => ({ ...r, sales: r.sales + amount }));
        addAudit({ action: "Ajustare Casă", entity: reason, result: `${amount} RON` });
        toast.success("Ajustare înregistrată");
    };

    const sellMerch = (cart) => {
        const total = Object.entries(cart).reduce((s, [id, q]) => s + (merch.find((m) => m.id === id)?.price || 0) * q, 0);
        if (total === 0) { toast.error("Coș gol"); return; }
        setMerch((ms) => ms.map((m) => ({ ...m, sold: m.sold + (cart[m.id] || 0), stock: m.stock - (cart[m.id] || 0) })));
        setKpis((k) => ({ ...k, cashRevenue: k.cashRevenue + total }));
        setReg((r) => ({ ...r, sales: r.sales + total }));
        setMerchCart({});
        addActivity(`Vânzare merch: ${total} RON`);
        addAudit({ action: "Vânzare Merch", entity: "Merch", result: `${total} RON` });
        toast.success(`Vânzare merch: ${total} RON`);
    };

    const sendNotification = (data) => {
        setNotifications((n) => [{ id: uid("n"), time: nowTime().slice(0, 5), ...data }, ...n]);
        addActivity(`Notificare → ${data.to}: ${data.text}`);
        addAudit({ action: "Notificare", entity: data.to, result: data.priority });
        toast.success("Notificare trimisă");
    };

    const value = {
        EVENT, CURRENT_USER, ROLES, TICKET_TYPES, DRIVERS, CARS, staff, SPONSORS, VENDORS, PARKING,
        ACCREDITATION_TYPES, EXPO_CATEGORIES, NOTIFICATION_TARGETS, SCHEDULE, QUALIFYING, BATTLES,
        ACCREDITATIONS_SEED, INCIDENT_TYPES,
        day, setDay: changeDay, role, setRole,
        trackStatus, trackChange, setTrackStatus, session, setSession,
        kpis, openIncidents: incidents.filter((i) => i.status !== "Closed").length,
        cart, addToCart, decFromCart, removeFromCart, clearCart, cartTotal, cartCount, confirmSale, recentSales,
        accessScans, scanAccess, assignedZone, setAssignedZone,
        taxiDrivers, selectedTaxiDriver, setSelectedTaxiDriver, sellDriftTaxiRide, completeRide,
        incidents, createIncident, updateIncidentStatus,
        expoCars, expoVotingOpen, expoVotesTotal, expoStats, myVote, voteExpoCar, closeExpoVoting,
        trackVote, trackVotes, voteTrack,
        reg, regTx, closeRegister, openRegister, cashAdjustment,
        merch, merchCart, setMerchCart, sellMerch,
        notifications, sendNotification,
        activity, audit,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}