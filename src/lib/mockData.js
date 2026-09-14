export const EVENT = {
  name: "DRIFT FESTIVAL 2027",
  status: "LIVE",
  days: [
    { id: 1, label: "ZIUA 1 — FUN DAY", short: "FUN DAY" },
    { id: 2, label: "ZIUA 2 — COMPETIȚIE", short: "COMPETIȚIE" },
  ],
};

export const CURRENT_USER = { name: "Alex Ionescu", role: "Event Manager" };

export const ROLES = [
  "Administrator",
  "Casier",
  "Securitate",
  "Pilot",
  "Judecător",
  "Inspector Tehnic",
  "Control Pista",
  "Staff Expo",
];

export const TICKET_TYPES = [
  { id: "general", name: "GENERAL", price: 150, accent: "sky", zone: "Tribună" },
  { id: "vip", name: "VIP", price: 300, accent: "amber", zone: "VIP + Paddock" },
  { id: "paddock", name: "PADDOCK", price: 250, accent: "violet", zone: "Paddock" },
  { id: "weekend", name: "WEEKEND", price: 400, accent: "emerald", zone: "Toate zonele (2 zile)" },
];

const firstNames = ["Andrei", "Mihai", "Vlad", "Radu", "Cristian", "Alex", "Bogdan", "Florin", "Tudor", "Ștefan", "Denis", "Marian", "Răzvan", "George", "Cătălin", "Eduard", "Robert", "Dragoș", "Ion", "Vasile"];
const lastNames = ["Popescu", "Radu", "Dumitrescu", "Stan", "Ionescu", "Marin", "Pavel", "Diaconescu", "Munteanu", "Olaru", "Voicu", "Tudor", "Constantin", "Ilie", "Niță", "Dobre", "Florea", "Chițu", "Avram", "Georgescu"];
const carModels = ["BMW E36", "Nissan S14", "Toyota AE86", "Nissan Skyline R34", "Mazda RX-7 FD", "Toyota Supra MK4", "BMW E30", "Nissan 180SX", "Honda S2000", "Mazda MX-5 NB", "Nissan Silvia S15", "BMW M3 E46", "Nissan 350Z", "Subaru BRZ", "Toyota GT86", "Lexus IS200", "Volvo 240", "Opel Manta", "Ford Mustang Fox", "Toyota Chaser JZX100"];
const engines = ["2JZ-GTE", "SR20DET", "4A-GE", "RB26DETT", "13B-REW", "2JZ", "M20", "CA18DET", "F20C", "BP05", "SR20", "S54", "VQ35", "FA20", "FA20", "1G-FE", "B230", "C20NE", "5.0 V8", "1JZ-GTE"];
const clubs = ["Night Riders", "Street Society", "JDM Romania", "Apex Drift", "Carbon Crew"];

export const DRIVERS = firstNames.map((fn, i) => {
  const number = i < 9 ? `0${i + 1}` : `${i + 1}`;
  // special: #23 and #07 per spec
  const num = i === 0 ? "23" : i === 1 ? "07" : number;
  return {
    id: "D" + (i + 1),
    number: num,
    name: `${fn} ${lastNames[i]}`,
    car: carModels[i],
    engine: engines[i],
    power: 420 + ((i * 37) % 280),
    group: i % 2 === 0 ? "A" : "B",
    techStatus: i % 5 === 0 ? "CONDITIONAL" : "PASS",
    funDay: "Active",
    competition: i % 3 === 0 ? "Pending" : "Registered",
    driftTaxi: i % 4 === 0 ? "Disabled" : "Enabled",
    status: i % 6 === 0 ? "On Track" : "Ready",
    club: clubs[i % clubs.length],
    driftTaxiPrice: 180 + ((i * 20) % 120),
    availability: i % 3 === 0 ? "ON TRACK" : "AVAILABLE",
    team: `Team ${clubs[i % clubs.length]}`,
  };
});

export const CARS = DRIVERS.map((d) => ({
  id: "C" + d.number,
  model: d.car,
  driver: d.name,
  driverId: d.id,
  number: d.number,
  engine: d.engine,
  power: d.power,
  techStatus: d.techStatus,
  color: ["Alb", "Negru", "Argintiu", "Rosu", "Albastru", "Galben"][d.number.charCodeAt(0) % 6],
}));

export const STAFF_DEPARTMENTS = [
  { id: "sec", name: "Securitate", present: 12, total: 14, color: "rose" },
  { id: "mar", name: "Comisari Pista", present: 18, total: 18, color: "amber" },
  { id: "med", name: "Medical", present: 8, total: 8, color: "red" },
  { id: "cas", name: "Casieri", present: 5, total: 5, color: "emerald" },
  { id: "med2", name: "Media", present: 16, total: 20, color: "sky" },
  { id: "stf", name: "Staff Operațional", present: 34, total: 36, color: "violet" },
];

export const STAFF_ROLES = [
  "Securitate", "Comisar Pista", "Medical", "Casier", "Media", "Staff", "Judecător", "Inspector Tehnic",
];

export const INCIDENT_TYPES = ["Vehicle stopped on track", "Spectator medical assistance", "Oil spill", "Barrier contact", "Fire", "Spectator intrusion", "Debris on track"];

export const ZONES = ["Tribună", "VIP", "Paddock", "Pista", "P1 Public", "P2 VIP", "P3 Piloți", "P4 Staff", "P5 Vânzători", "Medical", "Media"];

export const ACCREDITATION_TYPES = [
  { id: "driver", name: "Pilot", zones: ["Paddock", "Pista", "P3 Piloți", "VIP"], color: "amber" },
  { id: "mechanic", name: "Mecanic", zones: ["Paddock", "P3 Piloți"], color: "sky" },
  { id: "media", name: "Media", zones: ["Media", "VIP", "Paddock"], color: "violet" },
  { id: "security", name: "Securitate", zones: ["Tribună", "VIP", "Paddock", "P1 Public", "P2 VIP"], color: "rose" },
  { id: "judge", name: "Judecător", zones: ["Pista", "Paddock", "VIP"], color: "emerald" },
  { id: "staff", name: "Staff", zones: ["Paddock", "P4 Staff", "VIP"], color: "slate" },
  { id: "sponsor", name: "Sponsor", zones: ["VIP", "P2 VIP"], color: "cyan" },
  { id: "vendor", name: "Vânzător", zones: ["P5 Vânzători", "Paddock"], color: "orange" },
];

export const PARKING = [
  { id: "P1", name: "P1 Public", capacity: 1200, occupied: 980 },
  { id: "P2", name: "P2 VIP", capacity: 180, occupied: 142 },
  { id: "P3", name: "P3 Piloți", capacity: 60, occupied: 41 },
  { id: "P4", name: "P4 Staff", capacity: 140, occupied: 118 },
  { id: "P5", name: "P5 Vânzători", capacity: 40, occupied: 33 },
];

export const EXPO_CARS_SAMPLE = [
  { id: "E47", number: "047", model: "Nissan Skyline R34", year: 1999, owner: "Alex Marin", club: "Night Riders", engine: "RB26", power: 680, wheels: "Work Meister", color: "Bayside Blue", status: "Checked In", votes: 187, desc: "Build complet RB26, turbo single, roll cage, interior JDM original restaurat." },
  { id: "E12", number: "012", model: "BMW E30", year: 1987, owner: "Vlad Dumitrescu", club: "Carbon Crew", engine: "M20 turbo", power: 420, wheels: "BBS RS", color: "Alpinweiss", status: "Checked In", votes: 164, desc: "E30 drift build, M20 turbo, suspensie completă, faruri smiley." },
  { id: "E33", number: "033", model: "Toyota Supra MK4", year: "1996", owner: "Cristian Ionescu", club: "JDM Romania", engine: "2JZ-GTE", power: 720, wheels: "Volk TE37", color: "RSP Blue", status: "Checked In", votes: 142, desc: "2JZ single turbo, 720HP, interior roll cage, paint original Toyota." },
  { id: "E08", number: "008", model: "Mazda RX-7 FD", year: "1998", owner: "Mihai Radu", club: "Apex Drift", engine: "13B-REW", power: 450, wheels: "Enkei RPF1", color: "Vintage Red", status: "Checked In", votes: 121, desc: "Rotativ twin turbo, bridge port, body kit Veilside." },
  { id: "E21", number: "021", model: "Nissan Silvia S15", year: "2002", owner: "Bogdan Pavel", club: "Street Society", engine: "SR20DET", power: 380, wheels: "Work VS-KF", color: "Silvia Yellow", status: "Checked In", votes: 98, desc: "SR20DET, suspensie drift, diferențial blocat, recaro." },
  { id: "E55", number: "055", model: "Honda S2000", year: "2004", owner: "Florin Diaconescu", club: "Night Riders", engine: "F20C", power: 320, wheels: "CE28N", color: "Spa Yellow", status: "Approved", votes: 76, desc: "F20C, turbo kit, hardtop, interior stock restaurat." },
  { id: "E63", number: "063", model: "Toyota AE86", year: "1986", owner: "Tudor Munteanu", club: "Carbon Crew", engine: "4A-GE", power: 165, wheels: "Watanabe RS", color: "Two-Tone", status: "Checked In", votes: 134, desc: "Hachi-Roku classic, 4A-GE ITB, lsd, fully restored." },
  { id: "E71", number: "071", model: "BMW E36 M3", year: "1998", owner: "Denis Voicu", club: "Apex Drift", engine: "S50", power: 340, wheels: "BBS LM", color: "Dakar Yellow", status: "Checked In", votes: 89, desc: "E36 M3 drift, S50 turbo, widebody, cage." },
];

export const EXPO_CATEGORIES = ["People's Choice", "Best Build", "Best Interior", "Best Wheels", "Best Engine Bay", "Best JDM", "Best Euro", "Best Classic"];

export const SPONSORS = [
  { id: "S1", name: "EnergyFuel RO", pkg: "Title", tickets: 50, area: "Main Stage", deliverables: "Branding pistă, activations, 50 VIP", completion: 100 },
  { id: "S2", name: "Turan Motors", pkg: "Gold", tickets: 20, area: "Paddock", deliverables: "Banner paddock, expo stand, 20 VIP", completion: 80 },
  { id: "S3", name: "DriftShop", pkg: "Silver", tickets: 10, area: "Expo Zone", deliverables: "Stand merch, 10 paddock", completion: 60 },
  { id: "S4", name: "RubberCo Tires", pkg: "Gold", tickets: 15, area: "Track Side", deliverables: "Banner, tire demo, 15 VIP", completion: 90 },
  { id: "S5", name: "Garage72", pkg: "Bronze", tickets: 5, area: "Vendor Alley", deliverables: "Stand, 5 general", completion: 40 },
];

export const VENDORS = [
  { id: "V1", name: "Burger Lab", type: "Food", location: "Food Court A", contract: "Signed", fee: 1500, accreditations: 4, parking: 2 },
  { id: "V2", name: "Pizza Drift", type: "Food", location: "Food Court A", contract: "Signed", fee: 1200, accreditations: 3, parking: 1 },
  { id: "V3", name: "TunedWear", type: "Merch", location: "Vendor Alley", contract: "Pending", fee: 800, accreditations: 2, parking: 1 },
  { id: "V4", name: "JDM Parts", type: "Merch", location: "Vendor Alley", contract: "Signed", fee: 900, accreditations: 2, parking: 1 },
  { id: "V5", name: "Coffee Pit", type: "Food", location: "Food Court B", contract: "Signed", fee: 700, accreditations: 2, parking: 1 },
  { id: "V6", name: "DetailPro", type: "Other", location: "Expo Zone", contract: "Signed", fee: 500, accreditations: 2, parking: 1 },
];

export const MERCH = [
  { id: "M1", name: "Tricou Eveniment", price: 80, stock: 240, sold: 132 },
  { id: "M2", name: "Șapcă", price: 60, stock: 150, sold: 64 },
  { id: "M3", name: "Pachet Sticker", price: 25, stock: 400, sold: 210 },
  { id: "M4", name: "Hoodie", price: 180, stock: 90, sold: 38 },
];

export const SCHEDULE = [
  { time: "09:00", title: "Check-in Piloți", group: null, type: "admin" },
  { time: "10:00", title: "Verificare Tehnică", group: null, type: "tech" },
  { time: "11:30", title: "Briefing Piloți", group: null, type: "brief" },
  { time: "12:00", title: "Pista Deschisă", group: null, type: "track" },
  { time: "12:00–13:00", title: "Grupa A", group: "A", type: "session" },
  { time: "13:00–14:00", title: "Grupa B", group: "B", type: "session" },
  { time: "14:00", title: "Sesiune Drift Taxi", group: null, type: "taxi" },
  { time: "15:00", title: "Grupa A — Runda 2", group: "A", type: "session" },
  { time: "16:00", title: "Grupa B — Runda 2", group: "B", type: "session" },
  { time: "17:30", title: "Car Expo — Votare Public", group: null, type: "expo" },
  { time: "18:30", title: "Premiere Expo", group: null, type: "expo" },
];

export const QUALIFYING = [
  { pos: 1, number: "23", driver: "Andrei Popescu", run1: 87, run2: 91, best: 91, penalty: 0, status: "Qualified" },
  { pos: 2, number: "07", driver: "Mihai Radu", run1: 89, run2: 88, best: 89, penalty: 0, status: "Qualified" },
  { pos: 3, number: "12", driver: "Vlad Dumitrescu", run1: 84, run2: 86, best: 86, penalty: 0, status: "Qualified" },
  { pos: 4, number: "33", driver: "Cristian Ionescu", run1: 82, run2: 85, best: 85, penalty: 2, status: "Qualified" },
  { pos: 5, number: "08", driver: "Mihai Radu", run1: 80, run2: 83, best: 83, penalty: 0, status: "Qualified" },
  { pos: 6, number: "21", driver: "Bogdan Pavel", run1: 78, run2: 81, best: 81, penalty: 0, status: "Qualified" },
  { pos: 7, number: "55", driver: "Florin Diaconescu", run1: 75, run2: 79, best: 79, penalty: 0, status: "Qualified" },
  { pos: 8, number: "63", driver: "Tudor Munteanu", run1: 72, run2: 77, best: 77, penalty: 0, status: "Qualified" },
  { pos: 9, number: "71", driver: "Denis Voicu", run1: 70, run2: 73, best: 73, penalty: 0, status: "Bubble" },
  { pos: 10, number: "04", driver: "Radu Stan", run1: 68, run2: 71, best: 71, penalty: 0, status: "Bubble" },
];

export const BATTLES = {
  top16: [
    ["#23", "#71"], ["#08", "#55"], ["#33", "#04"], ["#21", "#63"],
    ["#07", "#09"], ["#12", "#15"], ["#18", "#02"], ["#06", "#11"],
  ],
};

export const ACCREDITATIONS_SEED = [
  { id: "AC1", type: "Pilot", holder: "Andrei Popescu", zones: ["Paddock", "Pista", "P3 Piloți", "VIP"] },
  { id: "AC2", type: "Media", holder: "ProTV Sport", zones: ["Media", "VIP", "Paddock"] },
  { id: "AC3", type: "Securitate", holder: "Securitate #04", zones: ["Tribună", "VIP", "Paddock", "P1 Public"] },
  { id: "AC4", type: "Mecanic", holder: "Team Apex", zones: ["Paddock", "P3 Piloți"] },
  { id: "AC5", type: "Judecător", holder: "Marcu Drift", zones: ["Pista", "Paddock", "VIP"] },
];

export const NOTIFICATION_TARGETS = ["Tot Staff", "Toți Piloții", "Grupa A", "Grupa B", "Securitate", "Comisari Pista", "Judecători", "Casieri", "Custom"];