import { useState, useEffect } from "react";

const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');`;

const styles = `
  ${GOOGLE_FONT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --green: #00C853;
    --green-dim: #00a844;
    --dark: #0a0f0a;
    --dark2: #111811;
    --card: #141f14;
    --border: #1f2f1f;
    --muted: #4a6a4a;
    --text: #e8f0e8;
    --text2: #9ab09a;
    --accent: #aaff44;
    --red: #ff4444;
    --yellow: #ffc107;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--dark); color: var(--text); min-height: 100vh; }
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* TOPBAR */
  .topbar {
    background: var(--dark2);
    border-bottom: 1px solid var(--border);
    padding: 0 20px;
    display: flex; align-items: center; justify-content: space-between;
    height: 58px; position: sticky; top: 0; z-index: 100;
  }
  .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem; letter-spacing: -0.5px; }
  .logo span { color: var(--accent); }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--green), var(--accent)); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--dark); cursor: pointer; }
  .notif-dot { position: relative; }
  .notif-dot::after { content: ''; position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; border-radius: 50%; background: var(--red); border: 2px solid var(--dark2); }

  /* LAYOUT */
  .layout { display: flex; flex: 1; }
  .sidebar {
    width: 220px; min-height: calc(100vh - 58px);
    background: var(--dark2); border-right: 1px solid var(--border);
    padding: 20px 12px; display: flex; flex-direction: column; gap: 4px;
    position: sticky; top: 58px; height: calc(100vh - 58px); overflow-y: auto;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: 8px; cursor: pointer;
    font-size: 0.9rem; color: var(--text2); transition: all 0.15s;
    font-weight: 400; border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: var(--border); color: var(--text); }
  .nav-item.active { background: linear-gradient(90deg, rgba(0,200,83,0.15), transparent); color: var(--accent); font-weight: 500; border-left: 2px solid var(--accent); }
  .nav-icon { font-size: 1rem; width: 20px; text-align: center; }
  .nav-section { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); padding: 12px 12px 4px; font-weight: 600; }

  /* MAIN */
  .main { flex: 1; padding: 24px; overflow-y: auto; max-width: 900px; }

  /* CARDS */
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .card-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 14px; color: var(--text); display: flex; align-items: center; gap: 8px; }

  /* HOME */
  .hero { background: linear-gradient(135deg, #0a1f0a, #0f2a0f); border: 1px solid var(--border); border-radius: 16px; padding: 28px; margin-bottom: 20px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(0,200,83,0.12), transparent); }
  .hero h1 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.6rem; line-height: 1.2; margin-bottom: 8px; }
  .hero h1 span { color: var(--accent); }
  .hero p { color: var(--text2); font-size: 0.9rem; line-height: 1.5; }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px; text-align: center; }
  .stat-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.6rem; color: var(--accent); }
  .stat-label { font-size: 0.75rem; color: var(--text2); margin-top: 2px; }

  /* NEWS */
  .news-item { border-bottom: 1px solid var(--border); padding: 14px 0; cursor: pointer; transition: all 0.15s; }
  .news-item:last-child { border-bottom: none; }
  .news-item:hover { padding-left: 6px; }
  .news-tag { display: inline-block; font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .tag-general { background: rgba(0,200,83,0.15); color: var(--green); }
  .tag-exam { background: rgba(255,193,7,0.15); color: var(--yellow); }
  .tag-event { background: rgba(100,100,255,0.15); color: #8888ff; }
  .tag-urgent { background: rgba(255,68,68,0.15); color: var(--red); }
  .news-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
  .news-meta { font-size: 0.78rem; color: var(--text2); }

  /* MATERIALS */
  .materials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .material-card { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.2s; }
  .material-card:hover { border-color: var(--green); transform: translateY(-2px); }
  .material-icon { font-size: 1.4rem; margin-bottom: 8px; }
  .material-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.85rem; margin-bottom: 4px; }
  .material-info { font-size: 0.75rem; color: var(--text2); }
  .upload-btn { display: flex; align-items: center; gap: 8px; background: rgba(0,200,83,0.1); border: 1px dashed var(--green); border-radius: 10px; padding: 14px; cursor: pointer; color: var(--green); font-size: 0.875rem; font-weight: 500; transition: all 0.15s; width: 100%; justify-content: center; margin-top: 12px; }
  .upload-btn:hover { background: rgba(0,200,83,0.18); }

  /* MARKETPLACE */
  .market-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .market-card { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: all 0.2s; }
  .market-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .market-img { height: 90px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; background: linear-gradient(135deg, #111, #1a2a1a); }
  .market-body { padding: 10px; }
  .market-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.85rem; margin-bottom: 2px; }
  .market-price { color: var(--accent); font-weight: 700; font-size: 0.9rem; }
  .market-seller { font-size: 0.72rem; color: var(--text2); }
  .sell-btn { background: linear-gradient(90deg, var(--green), var(--accent)); color: var(--dark); border: none; border-radius: 8px; padding: 10px 20px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; cursor: pointer; margin-bottom: 16px; width: 100%; transition: opacity 0.15s; }
  .sell-btn:hover { opacity: 0.9; }

  /* FORUM */
  .forum-item { border-bottom: 1px solid var(--border); padding: 14px 0; cursor: pointer; }
  .forum-item:last-child { border-bottom: none; }
  .forum-title { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; }
  .forum-item:hover .forum-title { color: var(--accent); }
  .forum-meta { font-size: 0.75rem; color: var(--text2); display: flex; gap: 12px; }
  .forum-votes { display: flex; align-items: center; gap: 4px; }
  .post-btn { background: var(--green); color: var(--dark); border: none; border-radius: 8px; padding: 10px 20px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; cursor: pointer; margin-bottom: 16px; width: 100%; transition: opacity 0.15s; }
  .post-btn:hover { opacity: 0.9; }

  /* SERVICES */
  .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .service-card { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.2s; display: flex; gap: 12px; align-items: flex-start; }
  .service-card:hover { border-color: var(--accent); }
  .service-icon { font-size: 1.6rem; flex-shrink: 0; }
  .service-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.85rem; margin-bottom: 3px; }
  .service-desc { font-size: 0.75rem; color: var(--text2); line-height: 1.4; }
  .service-contact { font-size: 0.72rem; color: var(--green); margin-top: 4px; }

  /* SEARCH */
  .search-bar { display: flex; align-items: center; gap: 10px; background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; margin-bottom: 20px; }
  .search-bar input { background: none; border: none; outline: none; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; flex: 1; }
  .search-bar input::placeholder { color: var(--muted); }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px); }
  .modal { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; width: 100%; max-width: 420px; }
  .modal-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; }
  .modal input, .modal textarea, .modal select { background: var(--dark2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.9rem; width: 100%; margin-bottom: 12px; outline: none; transition: border 0.15s; }
  .modal input:focus, .modal textarea:focus, .modal select:focus { border-color: var(--green); }
  .modal textarea { resize: vertical; min-height: 80px; }
  .modal select option { background: var(--dark2); }
  .modal-actions { display: flex; gap: 10px; margin-top: 4px; }
  .btn-primary { background: var(--green); color: var(--dark); border: none; border-radius: 8px; padding: 10px 20px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.85rem; cursor: pointer; flex: 1; transition: opacity 0.15s; }
  .btn-primary:hover { opacity: 0.9; }
  .btn-secondary { background: transparent; color: var(--text2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 20px; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.85rem; cursor: pointer; flex: 1; }
  .btn-secondary:hover { border-color: var(--text2); }

  /* TOAST */
  .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--green); color: var(--dark); padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 0.85rem; z-index: 300; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* BADGE */
  .badge { background: var(--green); color: var(--dark); border-radius: 20px; font-size: 0.65rem; font-weight: 700; padding: 1px 6px; margin-left: auto; }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .sidebar { display: none; }
    .stats-row { grid-template-columns: repeat(3, 1fr); }
    .materials-grid, .market-grid, .services-grid { grid-template-columns: 1fr; }
    .main { padding: 16px; }
  }

  /* BOTTOM NAV (mobile) */
  .bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: var(--dark2); border-top: 1px solid var(--border); padding: 8px 0 12px; z-index: 100; }
  @media (max-width: 640px) {
    .bottom-nav { display: flex; }
    .main { padding-bottom: 80px; }
  }
  .bottom-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; color: var(--text2); font-size: 0.6rem; }
  .bottom-nav-item.active { color: var(--accent); }
  .bottom-nav-icon { font-size: 1.2rem; }

  /* Section header */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.3rem; }
  .see-all { font-size: 0.8rem; color: var(--green); cursor: pointer; }
  .see-all:hover { text-decoration: underline; }

  /* Filter pills */
  .filter-pills { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .pill { padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); font-size: 0.78rem; cursor: pointer; transition: all 0.15s; color: var(--text2); background: none; }
  .pill.active, .pill:hover { background: rgba(0,200,83,0.12); border-color: var(--green); color: var(--green); }
`;

// DATA
const newsData = [
  { id: 1, tag: "urgent", title: "ND I Second Semester Exams begin July 14 â€” Check timetable on portal", date: "Today", reads: 342 },
  { id: 2, tag: "general", title: "New Computer Lab opened at Engineering Block B â€” 80 new workstations", date: "Jun 2", reads: 218 },
  { id: 3, tag: "event", title: "SUG Cultural Night â€” Friday 7 PM, School Hall. Free entry for students", date: "Jun 1", reads: 156 },
  { id: 4, tag: "exam", title: "Physics STP 111 continuous assessment results now available on portal", date: "May 30", reads: 290 },
  { id: 5, tag: "general", title: "Library extends hours to 10 PM during exam season starting Monday", date: "May 29", reads: 187 },
  { id: 6, tag: "event", title: "Entrepreneurship Club invites all ND I students â€” next meeting Thursday 4 PM", date: "May 28", reads: 112 },
];

const materialsData = [
  { id: 1, icon: "âš¡", name: "Digital Electronics Notes", dept: "EEE", uploader: "Engr. Musa", size: "2.4 MB", type: "PDF" },
  { id: 2, icon: "ðŸ”¬", name: "Physics STP 111 Past Questions", dept: "SCI", uploader: "Ibrahim K.", size: "1.1 MB", type: "PDF" },
  { id: 3, icon: "ðŸ§ª", name: "Inorganic Chemistry Lab Manual", dept: "CHM", uploader: "Aisha M.", size: "3.2 MB", type: "PDF" },
  { id: 4, icon: "ðŸ§¬", name: "Biology Practical Guide ND I", dept: "BIO", uploader: "Dr. Salisu", size: "4.8 MB", type: "PDF" },
  { id: 5, icon: "ðŸ“", name: "Engineering Mathematics I", dept: "MTH", uploader: "Ahmed B.", size: "2.0 MB", type: "PDF" },
  { id: 6, icon: "ðŸ’»", name: "Computer Hardware Principles", dept: "CMP", uploader: "Usman T.", size: "1.7 MB", type: "PDF" },
];

const marketData = [
  { id: 1, emoji: "ðŸ“š", name: "ND I Textbook Bundle", price: "â‚¦3,500", seller: "Fatima A.", dept: "General" },
  { id: 2, emoji: "ðŸ–©", name: "Scientific Calculator", price: "â‚¦2,200", seller: "Bello M.", dept: "EEE" },
  { id: 3, emoji: "ðŸ‘•", name: "School Lab Coat (M)", price: "â‚¦1,800", seller: "Grace O.", dept: "SCI" },
  { id: 4, emoji: "ðŸ’¾", name: "32GB USB Drive", price: "â‚¦1,500", seller: "Yakubu S.", dept: "CMP" },
  { id: 5, emoji: "ðŸ““", name: "Engineering Drawing Set", price: "â‚¦2,800", seller: "Maryam I.", dept: "ENG" },
  { id: 6, emoji: "ðŸ”‹", name: "Rechargeable Reading Lamp", price: "â‚¦2,000", seller: "Daniel A.", dept: "General" },
];

const forumData = [
  { id: 1, title: "Best way to memorize Boolean algebra laws before exam?", author: "Ibrahim", dept: "EEE", replies: 12, votes: 34, time: "2h ago" },
  { id: 2, title: "Anyone have the marking scheme for STP 111 last semester?", author: "Aisha", dept: "SCI", replies: 7, votes: 22, time: "5h ago" },
  { id: 3, title: "Which hostel has the most reliable power supply?", author: "Moses", dept: "General", replies: 28, votes: 61, time: "1d ago" },
  { id: 4, title: "Is Brownian motion coming in the physics practical exam?", author: "Fatima", dept: "SCI", replies: 9, votes: 18, time: "1d ago" },
  { id: 5, title: "Recommendations for cheap data bundles that work on campus?", author: "Usman", dept: "General", replies: 19, votes: 44, time: "2d ago" },
];

const servicesData = [
  { icon: "ðŸ–¨ï¸", name: "Print & Photocopy", desc: "Fast printing, binding, scanning near Gate A", contact: "08012345678" },
  { icon: "ðŸ½ï¸", name: "Campus Canteen", desc: "Affordable meals, open 7AMâ€“8PM daily", contact: "Block D Canteen" },
  { icon: "ðŸšŒ", name: "Campus Bus", desc: "Shuttle to town, departs main gate at 7AM & 4PM", contact: "SUG Transport" },
  { icon: "ðŸ’Š", name: "Student Clinic", desc: "Free consultation for registered students, 8AMâ€“5PM", contact: "Admin Block" },
  { icon: "ðŸ“¡", name: "WiFi Hotspot Points", desc: "Library, Block A & C labs â€” use your matric number", contact: "ICT Unit" },
  { icon: "ðŸ“·", name: "ID & Passport Photos", desc: "Same-day prints, opposite main gate", contact: "08098765432" },
  { icon: "ðŸ”§", name: "Electronics Repair", desc: "Phones, laptops, gadgets â€” affordable rates", contact: "Workshop Row" },
  { icon: "âœ‚ï¸", name: "Campus Barbershop", desc: "Haircuts & grooming, near male hostel block", contact: "Behind Block F" },
];

const navItems = [
  { id: "home", icon: "ðŸ ", label: "Home" },
  { id: "news", icon: "ðŸ“¢", label: "News", badge: 3 },
  { id: "materials", icon: "ðŸ“š", label: "Materials" },
  { id: "marketplace", icon: "ðŸ›’", label: "Market" },
  { id: "forum", icon: "ðŸ’¬", label: "Forum", badge: 5 },
  { id: "services", icon: "ðŸ”§", label: "Services" },
];

export default function BidaCampusHub() {
  const [active, setActive] = useState("home");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [newsFilter, setNewsFilter] = useState("all");
  const [marketFilter, setMarketFilter] = useState("all");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleModalSubmit = () => {
    setModal(null);
    showToast("âœ… Submitted successfully!");
  };

  return (
    <div className="app">
      <style>{styles}</style>

      {/* TOPBAR */}
      <div className="topbar">
        <div className="logo">Bida<span>Hub</span></div>
        <div className="topbar-right">
          <div className="notif-dot avatar" style={{ background: "none", color: "var(--text2)", fontSize: "1.1rem" }}>ðŸ””</div>
          <div className="avatar">PH</div>
        </div>
      </div>

      <div className="layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="nav-section">Menu</div>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
              {item.badge && <span className="badge">{item.badge}</span>}
            </button>
          ))}
          <div style={{ marginTop: "auto", paddingTop: 20 }}>
            <div className="nav-section">Account</div>
            <button className="nav-item"><span className="nav-icon">ðŸ‘¤</span> Profile</button>
            <button className="nav-item"><span className="nav-icon">âš™ï¸</span> Settings</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main">
          {active === "home" && <HomeView setActive={setActive} />}
          {active === "news" && <NewsView newsFilter={newsFilter} setNewsFilter={setNewsFilter} />}
          {active === "materials" && <MaterialsView search={search} setSearch={setSearch} setModal={setModal} showToast={showToast} />}
          {active === "marketplace" && <MarketView marketFilter={marketFilter} setMarketFilter={setMarketFilter} setModal={setModal} showToast={showToast} />}
          {active === "forum" && <ForumView setModal={setModal} showToast={showToast} />}
          {active === "services" && <ServicesView showToast={showToast} />}
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        {navItems.map(item => (
          <div key={item.id} className={`bottom-nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
            <span className="bottom-nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {/* MODALS */}
      {modal === "upload" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">ðŸ“¤ Upload Study Material</div>
            <input placeholder="Material title" />
            <select><option>Select Department</option><option>EEE</option><option>SCI</option><option>CHM</option><option>BIO</option><option>MTH</option><option>CMP</option><option>General</option></select>
            <input placeholder="Your name" />
            <div style={{ background: "var(--dark2)", border: "1px dashed var(--border)", borderRadius: 8, padding: 20, textAlign: "center", color: "var(--muted)", fontSize: "0.85rem", marginBottom: 12, cursor: "pointer" }}>ðŸ“Ž Tap to select file (PDF, DOC, PPT)</div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleModalSubmit}>Upload</button>
            </div>
          </div>
        </div>
      )}
      {modal === "sell" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">ðŸ›’ List an Item</div>
            <input placeholder="Item name" />
            <input placeholder="Price (â‚¦)" type="number" />
            <select><option>Category</option><option>Books</option><option>Electronics</option><option>Clothing</option><option>Stationery</option><option>Other</option></select>
            <textarea placeholder="Describe the item (condition, details...)"></textarea>
            <input placeholder="Your WhatsApp number" />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleModalSubmit}>Post Listing</button>
            </div>
          </div>
        </div>
      )}
      {modal === "post" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">ðŸ’¬ Start a Discussion</div>
            <input placeholder="Your question or topic" />
            <select><option>Category</option><option>Academics</option><option>Campus Life</option><option>Exams</option><option>Tech</option><option>General</option></select>
            <textarea placeholder="Give more context (optional)..."></textarea>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleModalSubmit}>Post</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function HomeView({ setActive }) {
  return (
    <div>
      <div className="hero">
        <h1>Welcome back,<br /><span>Philip ðŸ‘‹</span></h1>
        <p>Federal Polytechnic Bida Â· ND I Â· 2025/2026</p>
      </div>
      <div className="stats-row">
        <div className="stat-card"><div className="stat-num">847</div><div className="stat-label">Students</div></div>
        <div className="stat-card"><div className="stat-num">124</div><div className="stat-label">Materials</div></div>
        <div className="stat-card"><div className="stat-num">38</div><div className="stat-label">Listings</div></div>
      </div>
      <div className="card">
        <div className="card-title">ðŸ“¢ Latest News</div>
        {newsData.slice(0, 3).map(n => (
          <div key={n.id} className="news-item" onClick={() => setActive("news")}>
            <span className={`news-tag tag-${n.tag}`}>{n.tag}</span>
            <div className="news-title">{n.title}</div>
            <div className="news-meta">{n.date} Â· {n.reads} reads</div>
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span className="see-all" onClick={() => setActive("news")}>View all announcements â†’</span>
        </div>
      </div>
      <div className="card">
        <div className="card-title">âš¡ Quick Access</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[["ðŸ“š", "Materials"], ["ðŸ›’", "Market"], ["ðŸ’¬", "Forum"], ["ðŸ”§", "Services"]].map(([icon, label]) => (
            <div key={label} onClick={() => setActive(label.toLowerCase())} style={{ background: "var(--dark2)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text2)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsView({ newsFilter, setNewsFilter }) {
  const filters = ["all", "general", "exam", "event", "urgent"];
  const filtered = newsFilter === "all" ? newsData : newsData.filter(n => n.tag === newsFilter);
  return (
    <div>
      <div className="section-header">
        <div className="section-title">ðŸ“¢ Announcements</div>
      </div>
      <div className="filter-pills">
        {filters.map(f => (
          <button key={f} className={`pill ${newsFilter === f ? "active" : ""}`} onClick={() => setNewsFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="card">
        {filtered.map(n => (
          <div key={n.id} className="news-item">
            <span className={`news-tag tag-${n.tag}`}>{n.tag}</span>
            <div className="news-title">{n.title}</div>
            <div className="news-meta">{n.date} Â· {n.reads} reads</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaterialsView({ search, setSearch, setModal, showToast }) {
  const filtered = materialsData.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.dept.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="section-header">
        <div className="section-title">ðŸ“š Study Materials</div>
      </div>
      <div className="search-bar">
        <span>ðŸ”</span>
        <input placeholder="Search materials, departments..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="materials-grid">
        {filtered.map(m => (
          <div key={m.id} className="material-card" onClick={() => showToast(`ðŸ“¥ Downloading: ${m.name}`)}>
            <div className="material-icon">{m.icon}</div>
            <div className="material-name">{m.name}</div>
            <div className="material-info">{m.dept} Â· {m.uploader}</div>
            <div className="material-info" style={{ marginTop: 3 }}>{m.size} Â· {m.type}</div>
          </div>
        ))}
      </div>
      <button className="upload-btn" onClick={() => setModal("upload")}>
        ðŸ“¤ Upload a Material
      </button>
    </div>
  );
}

function MarketView({ marketFilter, setMarketFilter, setModal, showToast }) {
  const depts = ["all", "General", "EEE", "SCI", "CMP", "ENG"];
  const filtered = marketFilter === "all" ? marketData : marketData.filter(m => m.dept === marketFilter);
  return (
    <div>
      <div className="section-header">
        <div className="section-title">ðŸ›’ Marketplace</div>
      </div>
      <button className="sell-btn" onClick={() => setModal("sell")}>+ List Something for Sale</button>
      <div className="filter-pills">
        {depts.map(d => (
          <button key={d} className={`pill ${marketFilter === d ? "active" : ""}`} onClick={() => setMarketFilter(d)}>
            {d}
          </button>
        ))}
      </div>
      <div className="market-grid">
        {filtered.map(m => (
          <div key={m.id} className="market-card" onClick={() => showToast(`ðŸ’¬ Contacting seller for: ${m.name}`)}>
            <div className="market-img">{m.emoji}</div>
            <div className="market-body">
              <div className="market-name">{m.name}</div>
              <div className="market-price">{m.price}</div>
              <div className="market-seller">by {m.seller}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ForumView({ setModal, showToast }) {
  const [votes, setVotes] = useState({});
  const handleVote = (id) => {
    setVotes(v => ({ ...v, [id]: !v[id] }));
    if (!votes[id]) showToast("ðŸ‘ Upvoted!");
  };
  return (
    <div>
      <div className="section-header">
        <div className="section-title">ðŸ’¬ Forum</div>
      </div>
      <button className="post-btn" onClick={() => setModal("post")}>+ Start a Discussion</button>
      <div className="card">
        {forumData.map(f => (
          <div key={f.id} className="forum-item">
            <div className="forum-title">{f.title}</div>
            <div className="forum-meta">
              <span>by {f.author} Â· {f.dept}</span>
              <span>{f.replies} replies</span>
              <span className="forum-votes" onClick={() => handleVote(f.id)} style={{ cursor: "pointer", color: votes[f.id] ? "var(--accent)" : "inherit" }}>
                â–² {votes[f.id] ? f.votes + 1 : f.votes}
              </span>
              <span>{f.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesView({ showToast }) {
  return (
    <div>
      <div className="section-header">
        <div className="section-title">ðŸ”§ Campus Services</div>
      </div>
      <div className="services-grid">
        {servicesData.map((s, i) => (
          <div key={i} className="service-card" onClick={() => showToast(`ðŸ“ž ${s.name}: ${s.contact}`)}>
            <div className="service-icon">{s.icon}</div>
            <div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
              <div className="service-contact">{s.contact}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
