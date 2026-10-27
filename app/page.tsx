 "use client";

import { useMemo, useState } from "react";
import {
  Activity, CalendarCheck, ClipboardList, AlertTriangle, ShieldCheck, HeartPulse,
  Home, Send, LogOut, PawPrint, Menu, X, CheckCircle2, Phone, MapPin, Clock,
  Stethoscope, ChevronRight
} from "lucide-react";

type Appointment = {
  id: number; owner: string; phone: string; email: string; address: string;
  pet: string; age: string; sex: string; species: string; breed: string;
  symptoms: string; duration: string; treatment: string; date: string;
  remarks: string; status: string; payment: string;
};
type Emergency = { id: number; owner: string; phone: string; animal: string; location: string; response: string; details: string; status: string };

const initialAppointments: Appointment[] = [
  { id: 12, owner: "owner3", phone: "1111111111", email: "", address: "", pet: "lexie", age: "", sex: "", species: "Racoon", breed: "", symptoms: "", duration: "Less than 1 day", treatment: "", date: "2026-10-27", remarks: "", status: "Pending", payment: "Pending" },
  { id: 7, owner: "g", phone: "9876543210", email: "", address: "", pet: "g", age: "", sex: "", species: "Cow", breed: "", symptoms: "", duration: "Less than 1 day", treatment: "", date: "2026-10-31", remarks: "", status: "Pending", payment: "Pending" },
];

type Page = "home" | "book" | "view" | "emergency" | "adminLogin" | "admin";

export default function PageRoot({ initialPage = "home" }: { initialPage?: Page }) {
  const [page, setPage] = useState<Page>(initialPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [ownerSearch, setOwnerSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [adminUser, setAdminUser] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [notice, setNotice] = useState("");
  const [newAppointmentId, setNewAppointmentId] = useState<number | null>(null);
  const [book, setBook] = useState({
    owner: "", phone: "", email: "", address: "", pet: "", age: "", sex: "",
    species: "", breed: "", duration: "Less than 1 day", symptoms: "",
    treatment: "", date: "", remarks: ""
  });
  const [emergency, setEmergency] = useState({ owner: "", phone: "", animal: "", location: "", response: "Field Response (Vet visits immediately)", details: "" });

  const found = useMemo(() => appointments.filter(a =>
    a.owner.trim().toLowerCase() === ownerSearch.trim().toLowerCase() &&
    a.phone.trim() === phoneSearch.trim()
  ), [appointments, ownerSearch, phoneSearch]);

  function navigate(next: Page) {
    setPage(next); setMenuOpen(false); setNotice(""); setSearched(false);
    if (next !== "admin") setLoggedIn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = Math.max(0, ...appointments.map(a => a.id)) + 1;
    setAppointments(prev => [{ ...book, id, status: "Pending", payment: "Pending" }, ...prev]);
    setNewAppointmentId(id);
    setNotice("");
  }

  function submitEmergency(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = Math.max(0, ...emergencies.map(a => a.id)) + 1;
    setEmergencies(prev => [{ ...emergency, id, status: "Received" }, ...prev]);
    setNotice(`Emergency request #${id} submitted. This demo does not contact an actual veterinarian.`);
    setEmergency({ owner: "", phone: "", animal: "", location: "", response: "Field Response (Vet visits immediately)", details: "" });
  }

  function adminLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (adminUser === "admin" && adminPassword === "admin123") {
      setLoggedIn(true); setPage("admin"); setNotice("");
    } else setNotice("Invalid demo credentials. Use admin / admin123.");
  }

  function updateStatus(id: number, status: string) {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" }, { label: "Book Appointment", page: "book" },
    { label: "View Appointments", page: "view" }, { label: "Emergency Help", page: "emergency" },
    { label: "Admin Page", page: "adminLogin" },
  ];

  return (
    <main>
      <header className="topbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => navigate("home")} aria-label="eVetCare home"><span className="brand-mark"><HeartPulse size={22} /></span><span>eVetCare</span></button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {navItems.map(item => <button key={item.page} className={page === item.page || (page === "admin" && item.page === "adminLogin") ? "nav-link active" : "nav-link"} onClick={() => navigate(item.page)}>{item.label}</button>)}
          </nav>
        </div>
      </header>

      {page === "home" && <><section className="hero">
        <div className="hero-content"><span className="eyebrow"><PawPrint size={16} /> CARE THAT COMES FROM THE HEART</span>
          <h1>Better care for<br /><span>every beloved animal.</span></h1>
          <p>Your trusted platform for veterinary appointments, animal wellness and urgent care support.</p>
          <div className="hero-actions"><button className="btn btn-green" onClick={() => navigate("book")}><CalendarCheck size={19} /> Book Appointment</button><button className="btn btn-red" onClick={() => navigate("emergency")}><AlertTriangle size={19} /> Emergency Help</button></div>
          <div className="hero-trust"><span><ShieldCheck size={17} /> Compassionate care</span><span><Clock size={17} /> Timely assistance</span><span><Stethoscope size={17} /> Veterinary support</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-circle circle-one"></div><div className="art-circle circle-two"></div><div className="pet-card"><div className="pet-emoji">🐕</div><div><strong>Healthy pets, happy homes</strong><span>Care starts here</span></div><HeartPulse className="pet-heart" size={25} /></div><div className="floating-badge"><span className="badge-icon"><CheckCircle2 size={20} /></span><div><strong>Care you can trust</strong><small>Every paw matters</small></div></div></div>
      </section>
      <section className="mission section-wrap"><div className="section-kicker">WHY EVETCARE</div><h2>Care that puts animals first.</h2><p className="section-intro">We help pet owners and livestock caretakers connect with veterinary services, share symptoms and organize appointments in one simple place.</p>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon blue"><CalendarCheck /></span><h3>Easy appointments</h3><p>Share your animal’s details and preferred date to request a veterinary visit.</p><button className="text-link" onClick={() => navigate("book")}>Book a visit <ChevronRight size={16} /></button></article>
          <article className="feature-card"><span className="feature-icon green"><HeartPulse /></span><h3>Care information</h3><p>Provide symptoms, previous treatment and other useful clinical information.</p><button className="text-link" onClick={() => navigate("view")}>View appointments <ChevronRight size={16} /></button></article>
          <article className="feature-card"><span className="feature-icon red"><AlertTriangle /></span><h3>Emergency requests</h3><p>Submit urgent animal-care details and indicate the response you need.</p><button className="text-link" onClick={() => navigate("emergency")}>Get emergency help <ChevronRight size={16} /></button></article>
        </div>
      </section><section className="cta-band"><div><div className="section-kicker light">HERE WHEN YOU NEED US</div><h2>Give your animal the care it deserves.</h2><p>Start an appointment request in just a few minutes.</p></div><button className="btn btn-white" onClick={() => navigate("book")}>Get started <ChevronRight size={18} /></button></section></>}

      {page === "book" && <section className="page-shell"><PageHeading icon={<CalendarCheck />} title="Book Veterinary Appointment" subtitle="Tell us about the owner, animal and symptoms." />
        {newAppointmentId === null ? <form className="form-card" onSubmit={submitBooking}>
          <FormSection title="Owner Information" /><div className="form-grid">
            <Field label="Owner Name" required value={book.owner} onChange={v => setBook({ ...book, owner: v })} />
            <Field label="Contact Number" required type="tel" pattern="[0-9]{10}" placeholder="10-digit number" value={book.phone} onChange={v => setBook({ ...book, phone: v })} />
            <Field label="Email" type="email" placeholder="owner@example.com" value={book.email} onChange={v => setBook({ ...book, email: v })} />
            <Field label="Address" placeholder="City / Town / Area" value={book.address} onChange={v => setBook({ ...book, address: v })} />
          </div>
          <FormSection title="Pet Information" /><div className="form-grid">
            <Field label="Pet Name" required value={book.pet} onChange={v => setBook({ ...book, pet: v })} />
            <Field label="Age (years)" type="number" min="0" value={book.age} onChange={v => setBook({ ...book, age: v })} />
            <SelectField label="Sex" value={book.sex} onChange={v => setBook({ ...book, sex: v })} options={["Male", "Female", "Unknown"]} placeholder="Select" />
            <Field label="Animal Species" required placeholder="Dog, Cat, Cow, Goat, etc." value={book.species} onChange={v => setBook({ ...book, species: v })} />
            <Field label="Breed" placeholder="If known" value={book.breed} onChange={v => setBook({ ...book, breed: v })} />
          </div>
          <FormSection title="Clinical Information" /><div className="form-grid">
            <SelectField label="Duration of Symptoms" value={book.duration} onChange={v => setBook({ ...book, duration: v })} options={["Less than 1 day", "1–3 days", "4–7 days", "More than 1 week", "Routine check-up / no symptoms"]} />
            <label className="field"><span>Attach Photo (Optional)</span><input type="file" accept="image/*" /></label>
            <TextField label="Symptoms" placeholder="Describe symptoms such as fever, loss of appetite..." value={book.symptoms} onChange={v => setBook({ ...book, symptoms: v })} />
            <TextField label="Previous Treatment / Vaccination" placeholder="Mention any prior medication, vaccination, or treatment" value={book.treatment} onChange={v => setBook({ ...book, treatment: v })} />
          </div>
          <FormSection title="Appointment Details" /><div className="form-grid">
            <Field label="Preferred Appointment Date" required type="date" min={new Date().toISOString().slice(0,10)} value={book.date} onChange={v => setBook({ ...book, date: v })} />
            <TextField label="Additional Remarks" placeholder="Any additional details or concerns..." value={book.remarks} onChange={v => setBook({ ...book, remarks: v })} />
          </div>
          <div className="form-submit"><button className="btn btn-primary" type="submit"><Send size={18} /> Submit Appointment</button></div>
        </form> : <div className="success-card"><span className="success-icon"><CheckCircle2 size={28} /></span><h2>Appointment submitted successfully!</h2><p>Your demo appointment ID is <strong>#{newAppointmentId}</strong>.</p><p className="muted">This sample stores data in the current browser session only; it is not connected to a live backend.</p><div className="inline-actions"><button className="btn btn-primary" onClick={() => { setNewAppointmentId(null); setBook({ owner: "", phone: "", email: "", address: "", pet: "", age: "", sex: "", species: "", breed: "", duration: "Less than 1 day", symptoms: "", treatment: "", date: "", remarks: "" }); }}>Book Another</button><button className="btn btn-outline" onClick={() => navigate("home")}>Home</button></div></div>}
      </section>}

      {page === "view" && <section className="page-shell"><PageHeading icon={<ClipboardList />} title="View My Appointment" subtitle="Find your appointment using the owner name and contact number." />
        <form className="search-card" onSubmit={e => { e.preventDefault(); setSearched(true); }}><h2>Find Your Appointment</h2><Field label="Owner Name" required value={ownerSearch} onChange={setOwnerSearch} /><Field label="Contact Number" required type="tel" value={phoneSearch} onChange={setPhoneSearch} /><button className="btn btn-primary full" type="submit">View Appointment</button></form>
        {searched && <div className="results-wrap">{found.length ? <div className="table-scroll"><table><thead><tr><th>ID</th><th>Owner</th><th>Pet</th><th>Species</th><th>Date</th><th>Fee (₹)</th><th>Payment</th><th>Status</th></tr></thead><tbody>{found.map(a => <tr key={a.id}><td>{a.id}</td><td>{a.owner}</td><td>{a.pet}</td><td>{a.species}</td><td>{a.date || "Not set"}</td><td>₹200.00</td><td><span className="pill pending">{a.payment}</span></td><td>{a.status}</td></tr>)}</tbody></table></div> : <div className="empty-state"><ClipboardList size={28} /><strong>No matching appointments</strong><p>Check the owner name and contact number, then try again.</p></div>}</div>}
        <button className="btn btn-outline home-back" onClick={() => navigate("home")}><Home size={17} /> Home</button>
      </section>}

      {page === "emergency" && <section className="page-shell emergency-page"><div className="emergency-heading"><span className="emergency-symbol"><AlertTriangle size={25} /></span><PageHeading icon={<AlertTriangle />} title="Emergency Veterinary Help" subtitle="For a serious animal emergency, contact a local veterinarian or emergency clinic immediately." danger /></div>
        <div className="hotline-card"><span className="hotline-icon"><Phone size={23} /></span><div><strong>Need urgent veterinary assistance?</strong><p>Use your local veterinary hospital or animal husbandry department contact. This demo does not provide a verified hotline.</p></div></div>
        <div className="tips-card"><h2>Emergency Care Tips</h2><ul><li>Stay calm and assess the situation safely.</li><li>Keep the animal as comfortable and still as possible.</li><li>Contact the nearest emergency veterinary clinic.</li><li>Have the animal’s medical records ready if possible.</li><li>For severe bleeding, breathing difficulty or major trauma, seek immediate professional help.</li></ul></div>
        <div className="emergency-form-wrap"><div className="center-heading"><div className="section-kicker red-text">URGENT CARE REQUEST</div><h2>Emergency Portal</h2><p>Provide the details below so the request can be reviewed.</p></div>
          <form className="form-card" onSubmit={submitEmergency}><div className="form-grid">
            <Field label="Owner Name" required value={emergency.owner} onChange={v => setEmergency({ ...emergency, owner: v })} />
            <Field label="Contact Number" required type="tel" pattern="[0-9]{10}" placeholder="10-digit number" value={emergency.phone} onChange={v => setEmergency({ ...emergency, phone: v })} />
            <Field label="Animal Type" required placeholder="Dog, cow, cat, etc." value={emergency.animal} onChange={v => setEmergency({ ...emergency, animal: v })} />
            <Field label="Location / Address" required placeholder="Village, town or full address" value={emergency.location} onChange={v => setEmergency({ ...emergency, location: v })} />
            <SelectField label="Type of Emergency Assistance Needed" value={emergency.response} onChange={v => setEmergency({ ...emergency, response: v })} options={["Field Response (Vet visits immediately)", "Clinic Visit", "Phone Consultation", "Transport Assistance"]} />
            <TextField label="Describe the Emergency" required placeholder="Describe the injury, symptoms and when it happened..." value={emergency.details} onChange={v => setEmergency({ ...emergency, details: v })} />
          </div><div className="form-submit"><button className="btn btn-red" type="submit"><Send size={18} /> Submit Emergency</button></div></form>
          {notice && <div className="notice warning">{notice}</div>}
        </div><button className="btn btn-outline home-back" onClick={() => navigate("home")}><Home size={17} /> Home</button>
      </section>}

      {page === "adminLogin" && <section className="page-shell auth-page"><PageHeading icon={<ShieldCheck />} title="Admin Panel" subtitle="Sign in to review and manage appointment requests." /><form className="search-card auth-card" onSubmit={adminLogin}><h2>Admin Login</h2><Field label="Username" required value={adminUser} onChange={setAdminUser} /><Field label="Password" required type="password" value={adminPassword} onChange={setAdminPassword} /><button className="btn btn-dark full" type="submit">Login</button>{notice && <p className="form-error">{notice}</p>}<p className="demo-hint">Demo credentials: <strong>admin</strong> / <strong>admin123</strong></p></form><button className="btn btn-outline home-back" onClick={() => navigate("home")}><Home size={17} /> Home</button></section>}

      {page === "admin" && loggedIn && <section className="page-shell admin-page"><div className="admin-top"><PageHeading icon={<ShieldCheck />} title="Admin Dashboard" subtitle="Manage demo appointment requests." /><button className="btn btn-outline" onClick={() => { setLoggedIn(false); navigate("adminLogin"); }}><LogOut size={17} /> Logout</button></div>
        <div className="stats-grid"><Stat label="Total appointments" value={appointments.length} icon={<CalendarCheck />} /><Stat label="Pending requests" value={appointments.filter(a => a.status === "Pending").length} icon={<Clock />} /><Stat label="Emergency requests" value={emergencies.length} icon={<AlertTriangle />} /></div>
        <div className="admin-table-card"><div className="table-heading"><div><h2>Appointments</h2><p>Review and update appointment status.</p></div><span className="count-chip">{appointments.length} records</span></div><div className="table-scroll"><table><thead><tr><th>ID</th><th>Owner</th><th>Pet</th><th>Species</th><th>Contact</th><th>Date</th><th>Fee</th><th>Payment</th><th>Status</th><th>Update</th></tr></thead><tbody>{appointments.map(a => <tr key={a.id}><td>{a.id}</td><td>{a.owner}</td><td>{a.pet}</td><td>{a.species}</td><td>{a.phone}</td><td>{a.date || "Not set"}</td><td>₹200.00</td><td><span className="pill pending">{a.payment}</span></td><td><span className={`pill ${a.status === "Approved" ? "approved" : a.status === "Rejected" ? "rejected" : "pending"}`}>{a.status}</span></td><td><select className="status-select" value={a.status} onChange={e => updateStatus(a.id, e.target.value)}><option>Pending</option><option>Approved</option><option>Rejected</option><option>Completed</option></select></td></tr>)}</tbody></table></div></div>
        <div className="admin-table-card"><div className="table-heading"><div><h2>Emergency Requests</h2><p>Requests submitted in this demo session.</p></div><span className="count-chip">{emergencies.length} records</span></div>{emergencies.length ? <div className="table-scroll"><table><thead><tr><th>ID</th><th>Owner</th><th>Animal</th><th>Contact</th><th>Location</th><th>Response</th><th>Details</th><th>Status</th></tr></thead><tbody>{emergencies.map(e => <tr key={e.id}><td>{e.id}</td><td>{e.owner}</td><td>{e.animal}</td><td>{e.phone}</td><td>{e.location}</td><td>{e.response}</td><td>{e.details}</td><td><span className="pill pending">{e.status}</span></td></tr>)}</tbody></table></div> : <div className="empty-inline">No emergency requests submitted in this session.</div>}</div>
      </section>}

      <footer className="footer"><div className="footer-brand"><span className="brand-mark"><HeartPulse size={19} /></span><strong>eVetCare</strong></div><p>Compassionate animal healthcare, made simpler.</p><span className="copyright">© 2026 eVetCare · Animal Healthcare System</span></footer>
    </main>
  );
}

function PageHeading({ icon, title, subtitle, danger = false }: { icon: React.ReactNode; title: string; subtitle: string; danger?: boolean }) {
  return <div className={`page-heading ${danger ? "danger-heading" : ""}`}><span className="heading-icon">{icon}</span><h1>{title}</h1><p>{subtitle}</p></div>;
}
function FormSection({ title }: { title: string }) { return <h2 className="form-section-title">{title}</h2>; }
function Field({ label, value, onChange, type = "text", required = false, placeholder = "", pattern, min }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; pattern?: string; min?: string }) {
  return <label className="field"><span>{label}{required && <i> *</i>}</span><input type={type} required={required} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} pattern={pattern} min={min} /></label>;
}
function SelectField({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={e => onChange(e.target.value)}>{placeholder && <option value="">{placeholder}</option>}{options.map(o => <option key={o} value={o}>{o}</option>)}</select></label>;
}
function TextField({ label, value, onChange, placeholder = "", required = false }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return <label className="field field-wide"><span>{label}{required && <i> *</i>}</span><textarea rows={3} required={required} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} /></label>;
}
function Stat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return <article className="stat-card"><span className="stat-icon">{icon}</span><div><span>{label}</span><strong>{value}</strong></div></article>;
}
