/* =========================================================
   TTWSB — Executive Committee (2026–2029 term)
   Source: New_Commeeeti_List-TTWSB.pdf (names, mobiles, designations)
           + Details_of_Members.docx (photos, matched by mobile number)
   ========================================================= */

const ADVISORY_PANEL = [
  { name: "Md. Sharifuzzaman Sajib", mobile: "01713747282", designation: "Founder & Chief Advisor", photo: "assets/committee/md-sharifuzzaman-sajib.jpeg" },
  { name: "Md. Abul Hossain",        mobile: "01737778932", designation: "Advisor-1",               photo: "assets/committee/md-abul-hossain.jpeg" },
  { name: "Robel Hossain",           mobile: "01749704698", designation: "Advisor-2",               photo: "assets/committee/robel-hossain.jpeg" },
  { name: "Md. Shelim Reza",         mobile: "01723619782", designation: "Advisor-3",               photo: "assets/committee/md-shelim-reza.jpeg" },
  { name: "Shah Alam",               mobile: "01711103203", designation: "Advisor-4",               photo: "assets/committee/shah-alam.jpeg" },
];

const EXECUTIVE_COMMITTEE = [
  { name: "Mahabubur Rahman",          mobile: "01757948196", designation: "President",                                     photo: "assets/committee/mahabubur-rahman.jpeg" },
  { name: "Md. Khalilur Rahman",       mobile: "01844882629", designation: "Vice President-1",                              photo: "assets/committee/md-khalilur-rahman.jpeg" },
  { name: "Eusof Khan",                mobile: "01779830586", designation: "Vice President-2",                              photo: "assets/committee/eusof-khan.jpeg" },
  { name: "Md. Arif Ahmed",            mobile: "01723272641", designation: "General Secretary",                             photo: "assets/committee/md-arif-ahmed.jpeg" },
  { name: "Md. Taohidul Islam Faisal", mobile: "01770321440", designation: "Organizing Secretary",                          photo: "assets/committee/md-taohidul-islam-faisal.png" },
  { name: "Md. Ashikur Rahman",        mobile: "01703435868", designation: "Finance Secretary",                             photo: "assets/committee/md-ashikur-rahman.jpeg" },
  { name: "Nusrat Jahan",              mobile: "01531873400", designation: "Joint General Secretary-1",                     photo: "assets/committee/nusrat-jahan.jpeg" },
  { name: "Md. Rubel Mollick",         mobile: "01980947059", designation: "Joint General Secretary-2",                     photo: "assets/committee/md-rubel-mollick.jpeg" },
  { name: "Mst. Mahabuba Akter",       mobile: "01741643384", designation: "Assistant Organizing Secretary",                photo: "assets/committee/mst-mahabuba-akter.jpeg" },
  { name: "Md. Robiul Hasan Rony",     mobile: "01765725284", designation: "Office Secretary",                              photo: "assets/committee/md-robiul-hasan-rony.jpeg" },
  { name: "Md. Mehedi Hasan",          mobile: "01707494673", designation: "Publicity & Publication Secretary",             photo: "assets/committee/md-mehedi-hasan.jpeg" },
  { name: "Mahbub Hassan",             mobile: "01853363434", designation: "Information & Technology Secretary",           photo: "assets/committee/mahbub-hassan.jpeg" },
  { name: "Faruk Ul Islam",            mobile: "01892154208", designation: "Legal & Trainer Welfare Secretary",             photo: "assets/committee/faruk-ul-islam.jpeg" },
  { name: "Md. Al-Imran",              mobile: "01645732806", designation: "Technical Education & Research Secretary",      photo: "assets/committee/md-al-imran.jpeg" },
  { name: "Shetol Kumar Chaudhury",    mobile: "01303100616", designation: "Employment & Skills Development Secretary",     photo: "assets/committee/shetol-kumar-chaudhury.jpeg" },
  { name: "Md. Bablur Rahman",         mobile: "01740160305", designation: "Liaison & International Affairs Secretary",     photo: "assets/committee/md-bablur-rahman.jpeg" },
  { name: "Mehedi Parves",             mobile: "01981818950", designation: "Grievance & Dispute Resolution Secretary",      photo: "assets/committee/mehedi-parves.jpeg" },
  { name: "Md. Rakib Hokkani",         mobile: "01751489072", designation: "Religious & Cultural Affairs Secretary",        photo: "assets/committee/md-rakib-hokkani.jpeg" },
  { name: "Mst. Razia Sultana",        mobile: "01722374271", designation: "Women's Affairs Secretary",                     photo: "assets/committee/mst-razia-sultana.jpeg" },
  { name: "Tamjid Fakir",              mobile: "01791408222", designation: "Social Welfare & Disaster Management Secretary", photo: "assets/committee/tamjid-fakir.jpeg" },
  { name: "Umma Ruman",                mobile: "01997074312", designation: "Executive Member",                              photo: "assets/committee/umma-ruman.jpeg" },
];

// Roles highlighted on the homepage teaser
const HOME_TEASER_DESIGNATIONS = ["Founder & Chief Advisor", "President", "General Secretary", "Finance Secretary"];

// ---- Sample member records for the Verify Member demo ------
// Scan/search these IDs on verify.html to see how the system works.
const SAMPLE_MEMBERS = [
  {
    id: "TTWSB-000001/2026",
    name: "Md. Kamal Hossain",
    role: "Trainer Member",
    institute: "TTC Mirpur, Dhaka",
    trade: "Electrical",
    validTill: "2027-01-10",
    status: "active",
  },
  {
    id: "TTWSB-000002/2026",
    name: "Fatema Akter",
    role: "Trainer Member",
    institute: "TTC Bogura",
    trade: "Computer & IT",
    validTill: "2027-03-22",
    status: "active",
  },
  {
    id: "TTWSB-000045/2025",
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
