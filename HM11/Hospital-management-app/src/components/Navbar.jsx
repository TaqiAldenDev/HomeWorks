const TABS = [
  { key: 'appointments', label: 'Appointments' },
  { key: 'doctors', label: 'Doctors' },
  { key: 'patients', label: 'Patients' },
];

function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar" style={{ backgroundColor: '#5ba4a4', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}>
      <ul className="nav nav-pills">
        {TABS.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
              style={{
                color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.75)',
                fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                backgroundColor: activeTab === tab.key ? 'rgba(0,0,0,0.15)' : 'transparent',
                border: 'none',
              }}
              onClick={() => onTabChange(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
