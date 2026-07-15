/* =========================================================
   SAMPLE / DEMO DATA ONLY
   Replace with your real committee list and connect the
   member records to a real database before going live.
   ========================================================= */

// ---- Executive Committee (21 members) ----------------------
const COMMITTEE = [
  { name: "Placeholder Name", role: "President", loc: "Dhaka" },
  { name: "Placeholder Name", role: "Senior Vice President", loc: "Chattogram" },
  { name: "Placeholder Name", role: "Vice President", loc: "Rajshahi" },
  { name: "Placeholder Name", role: "Vice President", loc: "Khulna" },
  { name: "Placeholder Name", role: "General Secretary", loc: "Dhaka" },
  { name: "Placeholder Name", role: "Joint General Secretary", loc: "Sylhet" },
  { name: "Placeholder Name", role: "Organizing Secretary", loc: "Barishal" },
  { name: "Placeholder Name", role: "Treasurer", loc: "Rangpur" },
  { name: "Placeholder Name", role: "Office Secretary", loc: "Mymensingh" },
  { name: "Placeholder Name", role: "Publicity & Publication Secretary", loc: "Dhaka" },
  { name: "Placeholder Name", role: "Women & Child Affairs Secretary", loc: "Cumilla" },
  { name: "Placeholder Name", role: "Sports & Cultural Secretary", loc: "Bogura" },
  { name: "Placeholder Name", role: "Welfare Secretary", loc: "Jashore" },
  { name: "Your Name", role: "Technical Affairs Secretary", loc: "—" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Dhaka" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Chattogram" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Rajshahi" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Khulna" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Sylhet" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Barishal" },
  { name: "Placeholder Name", role: "Executive Member", loc: "Rangpur" },
];

// ---- Sample member records for the Verify Member demo ------
// Scan/search these IDs on verify.html to see how the system works.
const SAMPLE_MEMBERS = [
  {
    id: "TTWSB-2026-000001",
    name: "Md. Kamal Hossain",
    role: "Trainer Member",
    institute: "TTC Mirpur, Dhaka",
    trade: "Electrical",
    validTill: "2027-01-10",
    status: "active",
  },
  {
    id: "TTWSB-2026-000002",
    name: "Fatema Akter",
    role: "Trainer Member",
    institute: "TTC Bogura",
    trade: "Computer & IT",
    validTill: "2027-03-22",
    status: "active",
  },
  {
    id: "TTWSB-2025-000045",
    name: "Md. Rafiqul Islam",
    role: "Trainer Member",
    institute: "TTC Cumilla",
    trade: "Civil / Wood Working",
    validTill: "2026-04-05",
    status: "expired",
  },
];

// In-memory store for IDs generated during this demo session
// (resets on page reload — a real deployment stores this in a database).
const SESSION_MEMBERS = [];

function findMember(id) {
  const clean = (id || "").trim().toUpperCase();
  return (
    SAMPLE_MEMBERS.find((m) => m.id.toUpperCase() === clean) ||
    SESSION_MEMBERS.find((m) => m.id.toUpperCase() === clean) ||
    null
  );
}
