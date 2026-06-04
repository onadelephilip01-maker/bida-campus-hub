import { useState } from "react";

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --green: #00C853;
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
  body { font-family: Arial, sans-serif; background: var(--dark); color: var(--text); min-height: 100vh; }
  .app { display: flex; flex-direction: column; min-height: 100vh; }
  .topbar { background: var(--dark2); border-bottom: 1px solid var(--border); padding: 0 20px; display: flex; align-items: center; justify-content: space-between; height: 58px; position: sticky; top: 0; z-index: 100; }
  .logo { font-weight: 800; font-size: 1.15rem; letter-spacing: -0.5px; }
  .logo span { color: var(--accent); }
  .avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--green), var(--accent)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: var(--dark); cursor: pointer; }
  .layout { display: flex; flex: 1; }
  .sidebar { width: 220px; background: var(--dark2); border-right: 1px solid var(--border); padding: 20px 12px; display: flex; flex-direction: column; gap: 4px; position: sticky; top: 58px; height: calc(100vh - 58px); overflow-y: auto; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 0.9rem; color: var(--text2); border: none; background: none; width: 100%; text-align: left; }
  .nav-item:hover { background: var(--border); color: var(--text); }
  .nav-item.active { background: rgba(0,200,83,0.15); color: var(--accent); font-weight: 500; border-left: 2px solid var(--accent); }
  .nav-section { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); padding: 12px 12px 4px; font-weight: 600; }
  .main { flex: 1; padding: 24px; max-width: 900px; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .card-title { font-weight: 700; font-size: 1rem; margin-bottom: 14px; }
  .hero { background: linear-gradient(135deg, #0a1f0a, #0f2a0f); border: 1px solid var(--border); border-radius: 16px; padding: 28px; margin-bottom: 20px; }
  .hero h1 { font-weight: 800; font-size: 1.6rem; line-height: 1.2; margin-bottom: 8px; }
  .hero h1 span { color: var(--accent); }
  .hero p { color: var(--text2); font-size: 0.9rem; }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px; text-align: center; }
  .stat-num { font-weight: 800; font-size: 1.6rem; color: var(--accent); }
  .stat-label { font-size: 0.75rem; color: var(--text2); margin-top: 2px; }
  .news-item { border-bottom: 1px solid var(--border); padding: 14px 0; cursor: pointer; }
  .news-item:last-child { border-bottom: none; }
  .news-tag { display: inline-block; font-size: 0.7rem; padding: 2px 8px; border-radius: 20px; font-weight: 600; text-transform: uppercase; margin-bottom: 6px; }
  .tag-general { background: rgba(0,200,83,0.15); color: var(--green); }
  .tag-exam { background: rgba(255,193,7,0.15); color: var(--yellow); }
  .tag-event { background: rgba(100,100,255,0.15); color: #8888ff; }
  .tag-urgent { background: rgba(255,68,68,0.15); color: var(--red); }
  .news-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
  .news-meta { font-size: 0.78rem; color: var(--text2); }
  .materials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .material-card { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.2s; }
  .material-card:hover { border-color: var(--green); }
  .dept-badge { font-size: 0.7rem; font-weight: 700; background: rgba(0,200,83,0.15); color: var(--green); border-radius: 4px; padding: 2px 6px; display: inline-block; margin-bottom: 8px; }
  .material-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 4px; }
  .material-info { font-size: 0.75rem; color: var(--text2); }
  .upload-btn { display: flex; align-items: center; gap: 8px; background: rgba(0,200,83,0.1); border: 1px dashed var(--green); border-radius: 10px; padding: 14px; cursor: pointer; color: var(--green); font-size: 0.875rem; font-weight: 500; width: 100%; justify-content: center; margin-top: 12px; }
  .market-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .market-card { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: all 0.2s; }
  .market-card:hover { border-color: var(--accent); }
  .market-img { height: 80px; display: flex; align-items: center; justify-content: center; background: #0f1f0f; font-size: 2rem; }
  .market-body { padding: 10px; }
  .market-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 2px; }
  .market-price { color: var(--accent); font-weight: 700; font-size: 0.9rem; }
  .market-seller { font-size: 0.72rem; color: var(--text2); }
  .green-btn { background: var(--green); color: var(--dark); border: none; border-radius: 8px; padding: 10px 20px; font-weight: 700; font-size: 0.85rem; cursor: pointer; margin-bottom: 16px; width: 100%; }
  .forum-item { border-bottom: 1px solid var(--border); padding: 14px 0; cursor: pointer; }
  .forum-item:last-child { border-bottom: none; }
  .forum-title { font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; }
  .forum-item:hover .forum-title { color: var(--accent); }
  .forum-meta { font-size: 0.75rem; color: var(--text2); display: flex; gap: 12px; flex-wrap: wrap; }
  .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .service-card { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; }
  .service-card:hover { border-color: var(--accent); }
  .service-icon { font-size: 1.6rem; margin-bottom: 6px; }
  .service-name { font-weight: 600; font-size: 0.85rem; margin-bottom: 3px; }
  .service-desc { font-size: 0.75rem; color: var(--text2); line-height: 1.4; }
  .service-contact { font-size: 0.72rem; color: var(--green); margin-top: 4px; }
  .search-bar { display: flex; align-items: center; gap: 10px; background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; margin-bottom: 20px; }
  .search-bar input { background: none; border: none; outline: none; color: var(--text); font-size: 0.9rem; flex: 1; }
  .search-bar input::placeholder { color: var(--muted); }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; width: 100%; max-width: 420px; }
  .modal-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 16px; }
  .modal input, .modal textarea, .modal select { background: var(--dark2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; color: var(--text); font-size: 0.9rem; width: 100%; margin-bottom: 12px; outline: none; font-family: Arial, sans-serif; }
  .modal textarea { resize: vertical; min-height: 80px; }
  .modal select option { background: var(--dark2); }
  .modal-actions { display: flex; gap: 10px; }
  .btn-primary { background: var(--green); color: var(--dark); border: none; border-radius: 8px; padding: 10px 20px; font-weight: 700; font-size: 0.85rem; cursor: pointer; flex: 1; }
  .btn-secondary { background: transparent; color: var(--text2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 20px; font-weight: 600; font-size: 0.85rem; cursor: pointer; flex: 1; }
  .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--green); color: var(--dark); padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 0.85rem; z-index: 300; }
  .badge { background: var(--green); color: var(--dark); border-radius: 20px; font-size: 0.65rem; font-weight: 700; padding: 1px 6px; margin-left: auto; }
  .filter-pills { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .pill { padding: 5px 14px; border-radius: 20px; border: 1px solid var(--border); font-size: 0.78rem; cursor: pointer; color: var(--text2); background: none; }
  .pill.active { background: rgba(0,200,83,0.12); border-color: var(--green); color: var(--green); }
  .section-title { font-weight: 800; font-size: 1.3rem; margin-bottom: 20px; }
  .quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .quick-item { background: var(--dark2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 8px; text-align: center; cursor: pointer; }
  .quick-item:hover { border-color: var(--green); }
  .quick-icon { font-size: 1.4rem; margin-bottom: 4px; }
  .quick-sub { font-size: 0.65rem; color: var(--text2); }
  .see-all { font-size: 0.8rem; color: var(--green); cursor: pointer; text-align: center; margin-top: 12px; display: block; }
  @media (max-width: 640px) {
    .sidebar { display: none; }
    .materials-grid, .market-grid, .services-grid { grid-template-columns: 1fr; }
    .main { padding: 16px; padding-bottom: 80px; }
  }
  .bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: var(--dark2); border-top: 1px solid var(--border); padding: 8px 0 12px; z-index: 100; }
  @media (max-width: 640px) { .bottom-nav { display: flex; } }
  .bottom-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; cursor: pointer; color: var(--text2); font-size: 0.6rem; }
  .bottom-nav-item.active { color: var(--accent); }
  .bnav-icon { font-size: 1.2rem; }
`;

const newsData = [
  { id: 1, tag: "urgent", title: "ND I Second Semester Exams begin July 14 â€” Check timetable on portal", date: "Today", reads: 342 },
  { id: 2, tag: "general", title: "New Computer Lab opened at Engineering Block B â€” 80 new workstations", date: "Jun 2", reads: 218 },
  { id: 3, tag: "event", title: "SUG Cultural Night â€” Friday 7 PM, School Hall. Free entry for students", date: "Jun 1", reads: 156 },
  { id: 4, tag: "exam", title: "Physics STP 111 continuous assessment results now available on portal", date: "May 30", reads: 290 },
  { id: 5, tag: "general", title: "Library extends hours to 10 PM during exam season starting Monday", date: "May 29", reads: 187 },
  { id: 6, tag: "event", title: "Entrepreneurship Club invites all ND I students â€” next meeting Thursday 4 PM", date: "May 28", reads: 112 },
];

const materialsData = [
  { id: 1, dept: "EEE", name: "Digital Electronics Notes", uploader: "Engr. Musa", size: "2.4 MB" },
  { id: 2, dept: "SCI", name: "Physics STP 111 Past Questions", uploader: "Ibrahim K.", size: "1.1 MB" },
  { id: 3, dept: "CHM", name: "Inorganic Chemistry Lab Manual", uploader: "Aisha M.", size: "3.2 MB" },
  { id: 4, dept: "BIO", name: "Biology Practical Guide ND I", uploader: "Dr. Salisu", size: "4.8 MB" },
  { id: 5, dept: "MTH", name: "Engineering Mathematics I", uploader: "Ahmed B.", size: "2.0 MB" },
  { id: 6, dept: "CMP", name: "Computer Hardware Principles", uploader: "Usman T.", size: "1.7 MB" },
];

const marketData = [
  { id: 1, icon: "ðŸ“š", name: "ND I Textbook Bundle", price: "N3,500", seller: "Fatima A." },
  { id: 2, icon: "ðŸ–©", name: "Scientific Calculator", price: "N2,200", seller: "Bello M." },
  { id: 3, icon: "ðŸ‘•", name: "School Lab Coat (M)", price: "N1,800", seller: "Grace O." },
  { id: 4, icon: "ðŸ’¾", name: "32GB USB Drive", price: "N1,500", seller: "Yakubu S." },
  { id: 5, icon: "ðŸ“", name: "Engineering Drawing Set", price: "N2,800", seller: "Maryam I." },
  { id: 6, icon: "ðŸ”‹", name: "Rechargeable Reading Lamp", price: "N2,000", seller: "Daniel A." },
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
  { icon: "ðŸ½ï¸", name: "Campus Canteen", desc: "Affordable meals, open 7AM-8PM daily", contact: "Block D Canteen" },
  { icon: "ðŸšŒ", name: "Campus Bus", desc: "Shuttle to town, departs main gate 7AM & 4PM", contact: "SUG Transport" },
  { icon: "ðŸ’Š", name: "Student Clinic", desc: "Free consultation for registered students, 8AM-5PM", contact: "Admin Block" },
  { icon: "ðŸ“¡", name: "WiFi Hotspot Points", desc: "Library, Block A & C labs â€” use matric number", contact: "ICT Unit" },
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
  const [votes, setVotes] = useState({});

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const handleModalSubmit = () => { setModal(null); showToast("Submitted successfully!"); };

  return (
    <div className="app">
      <style>{styles}</style>
      <div className="topbar">
        <div className="logo">Bida<span>Hub</span></div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="avatar" style={{ background: "var(--border)", color: "var(--text2)", fontSize: "1rem" }}>ðŸ””</div>
          <div className="avatar">PH</div>
        </div>
      </div>

      <div className="layout">
        <div className="sidebar">
          <div className="nav-section">Menu</div>
          {navItems.map(item => (
            <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              {item.label}
              {item.badge && <span className="badge">{item.badge}</span>}
            </button>
          ))}
          <div style={{ marginTop: "auto", paddingTop: 20 }}>
            <div className="nav-section">Account</div>
            <button className="nav-item"><span>ðŸ‘¤</span> Profile</button>
            <button className="nav-item"><span>âš™ï¸</span> Settings</button>
          </div>
        </div>

        <div className="main">
          {active === "home" && (
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
                <span className="see-all" onClick={() => setActive("news")}>View all announcements â†’</span>
              </div>
              <div className="card">
                <div className="card-title">âš¡ Quick Access</div>
                <div className="quick-grid">
                  {[["ðŸ“š","Materials","materials"],["ðŸ›’","Market","marketplace"],["ðŸ’¬","Forum","forum"],["ðŸ”§","Services","services"]].map(([icon,label,id]) => (
                    <div key={id} className="quick-item" onClick={() => setActive(id)}>
                      <div className="quick-icon">{icon}</div>
                      <div className="quick-sub">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === "news" && (
            <div>
              <div className="section-title">ðŸ“¢ Announcements</div>
              <div className="filter-pills">
                {["all","general","exam","event","urgent"].map(f => (
                  <button key={f} className={`pill ${newsFilter === f ? "active" : ""}`} onClick={() => setNewsFilter(f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              <div className="card">
                {(newsFilter === "all" ? newsData : newsData.filter(n => n.tag === newsFilter)).map(n => (
                  <div key={n.id} className="news-item">
                    <span className={`news-tag tag-${n.tag}`}>{n.tag}</span>
                    <div className="news-title">{n.title}</div>
                    <div className="news-meta">{n.date} Â· {n.reads} reads</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "materials" && (
            <div>
              <div className="section-title">ðŸ“š Study Materials</div>
              <div className="search-bar">
                <span style={{ color: "var(--muted)" }}>ðŸ”</span>
                <input placeholder="Search materials, departments..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <div className="materials-grid">
                {materialsData.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.dept.toLowerCase().includes(search.toLowerCase())).map(m => (
                  <div key={m.id} className="material-card" onClick={() => showToast("Downloading: " + m.name)}>
                    <div className="dept-badge">{m.dept}</div>
                    <div className="material-name">{m.name}</div>
                    <div className="material-info">{m.uploader}</div>
                    <div className="material-info">{m.size} Â· PDF</div>
                  </div>
                ))}
              </div>
              <button className="upload-btn" onClick={() => setModal("upload")}>ðŸ“¤ Upload a Material</button>
            </div>
          )}

          {active === "marketplace" && (
            <div>
              <div className="section-title">ðŸ›’ Marketplace</div>
              <button className="green-btn" onClick={() => setModal("sell")}>+ List Something for Sale</button>
              <div className="filter-pills">
                {["all","Books","Tech","Tools","Clothing","General"].map(f => (
                  <button key={f} className={`pill ${marketFilter === f ? "active" : ""}`} onClick={() => setMarketFilter(f)}>{f}</button>
                ))}
              </div>
              <div className="market-grid">
                {marketData.map(m => (
                  <div key={m.id} className="market-card" onClick={() => showToast("Contacting seller for: " + m.name)}>
                    <div className="market-img">{m.icon}</div>
                    <div className="market-body">
                      <div className="market-name">{m.name}</div>
                      <div className="market-price">{m.price}</div>
                      <div className="market-seller">by {m.seller}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "forum" && (
            <div>
              <div className="section-title">ðŸ’¬ Forum</div>
              <button className="green-btn" onClick={() => setModal("post")}>+ Start a Discussion</button>
              <div className="card">
                {forumData.map(f => (
                  <div key={f.id} className="forum-item">
                    <div className="forum-title">{f.title}</div>
                    <div className="forum-meta">
                      <span>by {f.author} Â· {f.dept}</span>
                      <span>{f.replies} replies</span>
                      <span style={{ cursor: "pointer", color: votes[f.id] ? "var(--accent)" : "inherit" }}
                        onClick={() => setVotes(v => ({ ...v, [f.id]: !v[f.id] }))}>
                        â–² {votes[f.id] ? f.votes + 1 : f.votes}
                      </span>
                      <span>{f.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "services" && (
            <div>
              <div className="section-title">ðŸ”§ Campus Services</div>
              <div className="services-grid">
                {servicesData.map((s, i) => (
                  <div key={i} className="service-card" onClick={() => showToast(s.name + ": " + s.contact)}>
                    <div className="service-icon">{s.icon}</div>
                    <div className="service-name">{s.name}</div>
                    <div className="service-desc">{s.desc}</div>
                    <div className="service-contact">{s.contact}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bottom-nav">
        {navItems.map(item => (
          <div key={item.id} className={`bottom-nav-item ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}>
            <span className="bnav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {modal === "upload" && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">ðŸ“¤ Upload Study Material</div>
            <input placeholder="Material title" />
            <select><option>Select Department</option><option>EEE</option><option>SCI</option><option>CHM</option><option>BIO</option><option>MTH</option><option>CMP</option></select>
            <input placeholder="Your name" />
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
            <input placeholder="Price (N)" type="number" />
            <select><option>Category</option><option>Books</option><option>Electronics</option><option>Clothing</option><option>Other</option></select>
            <textarea placeholder="Describe the item..."></textarea>
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
            <select><option>Category</option><option>Academics</option><option>Campus Life</option><option>Exams</option><option>General</option></select>
            <textarea placeholder="Give more context (optional)..."></textarea>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancel</button>
              <button className="btn-primary" onClick={handleModalSubmit}>Post</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
