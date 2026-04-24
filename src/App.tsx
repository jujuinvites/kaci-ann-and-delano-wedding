// @ts-nocheck
import { useState, useEffect, useRef } from 'react';

const SK = 'kd_wg_v5';

const defaultGuests = [
  { id: 1, name: 'Kaci-Ann Brown', table: 1, seat: 1, group: 'Bride' },
  { id: 2, name: 'Delano Williams', table: 1, seat: 2, group: 'Groom' },
  { id: 3, name: 'Grace Brown', table: 2, seat: 1, group: 'Family' },
  { id: 4, name: 'Marcus Williams', table: 2, seat: 2, group: 'Family' },
  { id: 5, name: 'Tanya Reid', table: 3, seat: 1, group: 'Friends' },
  { id: 6, name: 'Devon Campbell', table: 3, seat: 2, group: 'Friends' },
  { id: 7, name: 'Simone Clarke', table: 4, seat: 1, group: 'Bridal Party' },
  { id: 8, name: 'Andre Thompson', table: 4, seat: 2, group: 'Bridal Party' },
  { id: 9, name: 'Nadine Francis', table: 5, seat: 1, group: 'Family' },
  { id: 10, name: 'Kevin Morgan', table: 5, seat: 2, group: 'Friends' },
  { id: 11, name: 'Patrice Hamilton', table: 6, seat: 1, group: 'Family' },
  { id: 12, name: 'Jordan Reid', table: 6, seat: 2, group: 'Friends' },
];

const defaultContent = {
  heroSuper: 'WELCOME TO THE WEDDING OF',
  coupleName: 'Kaci-Ann & Delano',
  weddingDate: 'July 4, 2026',
  venue: 'Little Savoy Guest House',
  welcomeMsg:
    'We are so happy to celebrate this special day with you. Please use this page as your guide throughout the event.',

  timelineEvents: JSON.stringify([
    {
      t: '3:00 PM',
      ti: 'Guests Arrive',
      d: 'Welcome drinks and light refreshments at the garden',
    },
    {
      t: '3:30 PM',
      ti: 'Ceremony Begins',
      d: 'Garden ceremony with the officiant',
    },
    {
      t: '4:00 PM',
      ti: 'Exchange of Vows',
      d: 'The couple say their heartfelt vows',
    },
    {
      t: '4:30 PM',
      ti: 'Cocktail Hour',
      d: 'Mingle with guests, light bites & signature cocktails',
    },
    {
      t: '5:30 PM',
      ti: 'Reception Opens',
      d: 'Guests welcomed into the reception hall',
    },
    {
      t: '6:00 PM',
      ti: 'Grand Entrance',
      d: 'Introduction of the wedding party & newlyweds',
    },
    {
      t: '6:15 PM',
      ti: 'First Dance',
      d: 'The couple share their first dance as husband and wife',
    },
    {
      t: '6:30 PM',
      ti: 'Dinner Service',
      d: 'Buffet dinner — please enjoy at your leisure',
    },
    {
      t: '7:30 PM',
      ti: 'Toasts & Speeches',
      d: 'Best man, maid of honour & family toasts',
    },
    {
      t: '8:00 PM',
      ti: 'Cake Cutting',
      d: 'The couple cut their wedding cake',
    },
    {
      t: '8:30 PM',
      ti: 'Dancing Begins',
      d: 'DJ takes the floor — all are invited!',
    },
    {
      t: '11:00 PM',
      ti: 'Last Dance',
      d: 'A final dance to close the celebration',
    },
    {
      t: '11:30 PM',
      ti: 'Farewell',
      d: 'Safe travels — thank you for celebrating with us',
    },
  ]),
  menuIntro: 'Buffet Service — Please help yourself',
  menuSections: JSON.stringify([
    {
      h: 'Proteins',
      items: [
        'Jerk Chicken — seasoned & slow-grilled',
        'Brown Stew Fish — traditional Jamaican style',
        'Curry Goat — tender, slow-cooked',
        'Roast Beef — herb-crusted, carved to order',
      ],
    },
    {
      h: 'Sides & Accompaniments',
      items: [
        'Rice & Peas',
        'Festival (Sweet Fried Dumplings)',
        'Bammy',
        'Steamed Callaloo',
        'Fried Plantain',
        'Garden Salad',
      ],
    },
    {
      h: 'Desserts',
      items: [
        'Wedding Cake — vanilla & passion fruit',
        'Rum Cake — classic Jamaican',
        'Fruit Platter — fresh tropical fruits',
      ],
    },
    {
      h: 'Cocktails',
      items: [
        'Rum Punch — classic Jamaican blend',
        'Sorrel Spritz — hibiscus & ginger ale',
        'Blue Lagoon — signature wedding cocktail',
        'Fresh Fruit Punch (non-alcoholic)',
      ],
    },
  ]),
  lwTitle: 'Love & Wisdom',
  lwSubtitle:'While waiting to be served, each table is invited to take part in a fun and meaningful challenge.',
  lwChallenges: JSON.stringify([
    {
      ti: 'Song Dedication',
      de: "Identify a love song played by the DJ and either sing a short line or name the artist.",
    },
    {
      ti: 'Marriage Advice',
      de: 'Work together to share your best piece of advice for a happy and lasting marriage.',
    },
    {
      ti: 'Memory Lane',
      de: 'Share a favourite memory you have with the bride or groom.',
    },
    {
      ti: 'Love Prediction',
      de: 'Predict where the couple will be in 10 years — the more creative, the better.',
    },
  ]),
  bridalMembers: JSON.stringify([
    { role: 'Bride', name: 'Kaci-Ann Brown' },
    { role: 'Groom', name: 'Delano Williams' },
    { role: 'Maid of Honour', name: 'Simone Clarke' },
    { role: 'Best Man', name: 'Andre Thompson' },
    { role: 'Bridesmaid', name: 'Tanya Reid' },
    { role: 'Bridesmaid', name: 'Nadine Francis' },
    { role: 'Groomsman', name: 'Devon Campbell' },
    { role: 'Groomsman', name: 'Kevin Morgan' },
    { role: 'Flower Girl', name: 'Lily Brown' },
    { role: 'Ring Bearer', name: 'Ethan Williams' },
  ]),
  notesQuote:
    'Pick a seat, not a side.\nWe are one family once the knot is tied.',
  notesPrompt:
    'Leave a blessing or piece of advice for the newlyweds. Your words will be cherished forever.',
  notesThanks: 'Your message has been received with love.',
  seatingIntro:
    "Find your seat and get comfortable. We can't wait to celebrate with you!",
};

const defaultTheme = {
  heroBg1: '#b8cfe2',
  heroBg2: '#d6e8f4',
  cream: '#FAF8F4',
  pageBg: '#FAF8F4',
  dustyBlue: '#6b8fa8',
  navBg: '#dce8f0',
  footerBg: '#2d3a4a',
  footerText: '#c8d8e8',
  cardBg: '#ffffff',
  beigeBg: '#EDE7E2',
  scriptFont: 'Great Vibes',
  titleFont: 'Playfair Display',
  bodyFont: 'Raleway',
  heroNameSize: 76,
  heroSubSize: 20,
  sectionTitleSize: 54,
  heroAlign: 'center',
  showFloral: true,
  floralHeight: 220,
  heroImage: '',
  logoImage: '',
  nameImage: '',
  heroBgImage: '',
  footerBgImage: '',
  cardShadow: '0 4px 20px rgba(80,110,140,0.10)',
};

const ld = (k, f) => {
  try {
    const d = localStorage.getItem(k);
    return d ? JSON.parse(d) : f;
  } catch {
    return f;
  }
};
const sv = (k, v) => {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
};
const tryJ = (s, f) => {
  try {
    return JSON.parse(s);
  } catch {
    return f;
  }
};

const gf = (t) => "'" + t.scriptFont + "',cursive";
const pf = (t) => "'" + t.titleFont + "',serif";
const rf = (t) => "'" + t.bodyFont + "',sans-serif";

const SCRIPT_FONTS = [
  'Great Vibes',
  'Dancing Script',
  'Pacifico',
  'Satisfy',
  'Pinyon Script',
];
const TITLE_FONTS = [
  'Playfair Display',
  'Cormorant Garamond',
  'EB Garamond',
  'Libre Baskerville',
  'Lora',
];
const BODY_FONTS = ['Raleway', 'Lato', 'Nunito', 'Josefin Sans', 'Montserrat'];

const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@400;700&family=Pacifico&family=Satisfy&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Raleway:wght@300;400;500;600&family=Lato:wght@300;400;700&family=Nunito:wght@300;400;600&family=Josefin+Sans:wght@300;400;600&family=Montserrat:wght@300;400;500&display=swap');";

/* ── SVG FLORAL ── */
function SvgFloral({ theme }) {
  const stems = [60, 160, 240, 320, 400, 480, 560, 640, 730];
  const leaves = [80, 180, 280, 380, 500, 600, 700];
  const roses = [60, 200, 380, 560, 730];
  const hydrangeas = [130, 310, 470, 640];
  const daisies = [260, 440, 680];
  const angles8 = [0, 45, 90, 135, 180, 225, 270, 315];
  const angles12 = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg
      viewBox="0 0 800 240"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block' }}
    >
      <defs>
        <style>
          {'.fl{fill:none;stroke:' +
            theme.dustyBlue +
            ';opacity:.42}.fld{fill:' +
            theme.dustyBlue +
            ';opacity:.28}.lf{fill:none;stroke:#7a9c78;opacity:.38}'}
        </style>
      </defs>
      {stems.map((x, i) => (
        <line
          key={i}
          className="fl"
          x1={x}
          y1={240}
          x2={x + (i % 2 ? -18 : 18)}
          y2={75 + ((i * 9) % 65)}
          strokeWidth="1.2"
        />
      ))}
      {leaves.map((x, i) => (
        <ellipse
          key={i}
          className="lf"
          cx={x}
          cy={145 + (i % 3) * 18}
          rx={24}
          ry={10}
          transform={
            'rotate(' +
            (-30 + i * 12) +
            ' ' +
            x +
            ' ' +
            (145 + (i % 3) * 18) +
            ')'
          }
          strokeWidth="1"
        />
      ))}
      {roses.map((x, i) => {
        const y = 88 + (i % 3) * 22;
        return (
          <g key={i}>
            <circle className="fl" cx={x} cy={y} r={18} strokeWidth="1.3" />
            <circle className="fl" cx={x} cy={y} r={11} strokeWidth="1" />
            <circle className="fld" cx={x} cy={y} r={6} />
            {angles8.map((a, j) => {
              const rx2 = x + Math.cos((a * Math.PI) / 180) * 15;
              const ry2 = y + Math.sin((a * Math.PI) / 180) * 15;
              return (
                <ellipse
                  key={j}
                  className="fl"
                  cx={rx2}
                  cy={ry2}
                  rx={6}
                  ry={3.5}
                  transform={'rotate(' + a + ' ' + rx2 + ' ' + ry2 + ')'}
                  strokeWidth="0.8"
                />
              );
            })}
          </g>
        );
      })}
      {hydrangeas.map((x, i) => {
        const y = 115 + (i % 2) * 22;
        const cells = [];
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            cells.push(
              <circle
                key={dx + ',' + dy}
                className="fl"
                cx={x + dx * 13}
                cy={y + dy * 13}
                r={8}
                strokeWidth="0.9"
              />
            );
          }
        }
        return <g key={i}>{cells}</g>;
      })}
      {daisies.map((x, i) => {
        const y = 98 + i * 16;
        return (
          <g key={i}>
            <circle className="fld" cx={x} cy={y} r={7} />
            {angles12.map((a, j) => {
              const dx2 = x + Math.cos((a * Math.PI) / 180) * 16;
              const dy2 = y + Math.sin((a * Math.PI) / 180) * 16;
              return (
                <ellipse
                  key={j}
                  className="fl"
                  cx={dx2}
                  cy={dy2}
                  rx={7}
                  ry={3}
                  transform={'rotate(' + a + ' ' + dx2 + ' ' + dy2 + ')'}
                  strokeWidth="0.9"
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ── MONOGRAM ── */
function Monogram({ theme, size }) {
  const s = size || 44;
  return (
    <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
      <text
        x="6"
        y="60"
        fontFamily={pf(theme)}
        fontSize="54"
        fontWeight="600"
        fill={theme.dustyBlue}
        opacity="0.88"
      >
        K
      </text>
      <text
        x="34"
        y="64"
        fontFamily={pf(theme)}
        fontSize="46"
        fontWeight="400"
        fill={theme.dustyBlue}
        opacity="0.72"
        fontStyle="italic"
      >
        D
      </text>
      <path
        d="M38 7 Q56 4 59 74 Q42 77 38 7Z"
        fill={theme.dustyBlue}
        opacity="0.13"
      />
    </svg>
  );
}

/* ── RING DIVIDER ── */
function RingDivider({ theme, light }) {
  const c = light ? 'rgba(255,255,255,0.65)' : theme.dustyBlue;
  const grad = light
    ? [
        'linear-gradient(to right,transparent,rgba(255,255,255,0.45))',
        'linear-gradient(to left,transparent,rgba(255,255,255,0.45))',
      ]
    : [
        'linear-gradient(to right,transparent,' + theme.dustyBlue + '60)',
        'linear-gradient(to left,transparent,' + theme.dustyBlue + '60)',
      ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        margin: '18px auto',
        maxWidth: 260,
      }}
    >
      <div style={{ flex: 1, height: 1, background: grad[0] }} />
      <svg width="30" height="18" viewBox="0 0 30 18" fill="none">
        <circle
          cx="9"
          cy="9"
          r="7"
          stroke={c}
          strokeWidth="1.3"
          opacity="0.7"
        />
        <circle
          cx="21"
          cy="9"
          r="7"
          stroke={c}
          strokeWidth="1.3"
          opacity="0.7"
        />
      </svg>
      <div style={{ flex: 1, height: 1, background: grad[1] }} />
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ theme, content }) {
  var hasBgImg = !!theme.footerBgImage;
  return (
    <div
      style={{
        background: hasBgImg
          ? 'url(' + theme.footerBgImage + ') center center / cover no-repeat'
          : theme.footerBg,
        padding: '100px 24px 48px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {hasBgImg ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(30,45,58,0.1), rgba(30,45,58,0.3))',
            pointerEvents: 'none',
          }}
        />
      ) : null}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: gf(theme),
            fontSize: 'clamp(36px,9vw,50px)',
            color: theme.footerText,
            marginBottom: 12,
            lineHeight: 1.1,
          }}
        >
          {content.footerNames}
        </p>

        <p
          style={{
            fontFamily: rf(theme),
            fontSize: 13,
            color: theme.footerText + '80',
            letterSpacing: '0.1em',
            fontWeight: 300,
          }}
        >
          {content.footerDate} · {content.footerVenue}
        </p>
        {content.footerNote ? (
          <p
            style={{
              fontFamily: pf(theme),
              fontSize: 14,
              color: theme.footerText + '60',
              fontStyle: 'italic',
              marginTop: 10,
            }}
          >
            {content.footerNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ── NAV DRAWER ── */
const NAV_ITEMS = [
  {
    l: 'Home',
    p: 'home',
    d: 'M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z',
  },
  {
    l: 'Wedding Timeline',
    p: 'timeline',
    d: 'M12 2a10 10 0 110 20 10 10 0 010-20zm0 5v5.5l3.5 2',
  },
  {
    l: 'Menu',
    p: 'menu',
    d: 'M12 2c0 4-2 6-2 9h4c0-3-2-5-2-9zM8 21h8M12 14v7',
  },
  {
    l: 'Bridal Party',
    p: 'bridal',
    d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  },
  {
    l: 'Guest Notes',
    p: 'notes',
    d: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
  },
  {
    l: 'Seating Plan',
    p: 'seating',
    d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
  },
  {
    l: 'Love & Wisdom',
    p: 'activity',
    d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
];

function NavDrawer({ open, onClose, setPage, theme }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: open ? 'rgba(30,40,50,0.38)' : 'transparent',
          zIndex: 98,
          pointerEvents: open ? 'all' : 'none',
          transition: 'fade 0.3s',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: 285,
          background: theme.pageBg || theme.cream,
          zIndex: 99,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: open ? '-6px 0 32px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <div
          style={{
            padding: '22px 22px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid ' + theme.dustyBlue + '22',
          }}
        >
          {theme.logoImage ? (
            <img
              src={theme.logoImage}
              alt="logo"
              style={{ height: 38, objectFit: 'contain' }}
            />
          ) : (
            <Monogram theme={theme} size={38} />
          )}
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, padding: '6px 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map(function (item) {
            return (
              <button
                key={item.p}
                onClick={function () {
                  setPage(item.p);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  padding: '12px 22px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: rf(theme),
                  fontSize: 14,
                  color: '#3a3530',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = theme.dustyBlue + '14';
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = 'none';
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme.dustyBlue}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.d} />
                </svg>
                {item.l}
              </button>
            );
          })}
        </div>
        <div
          style={{
            padding: '14px 22px',
            borderTop: '1px solid ' + theme.dustyBlue + '18',
          }}
        >
          <button
            onClick={function () {
              setPage('admin');
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: rf(theme),
              fontSize: 12,
              color: '#8a9aaa',
              letterSpacing: '0.12em',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8a9aaa"
              strokeWidth="1.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            ADMIN
          </button>
        </div>
      </div>
    </>
  );
}

/* ── HEADER ── */
function Header({ onMenu, transparent, theme }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '13px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: transparent ? 'transparent' : theme.cream + 'f0',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        transition: 'all 0.4s',
      }}
    >
      {theme.logoImage ? (
        <img
          src={theme.logoImage}
          alt="logo"
          style={{ height: 40, objectFit: 'contain' }}
        />
      ) : (
        <Monogram theme={theme} size={40} />
      )}
      <button
        onClick={onMenu}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke={transparent ? '#3a6080' : '#3a3530'}
          strokeWidth="1.5"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
    </div>
  );
}

/* ── HOME ── */
function HomePage({ guests, setPage, theme, content }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [vis, setVis] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    setTimeout(function () {
      setVis(true);
    }, 80);
  }, []);

  function doSearch() {
    if (!query.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const q = query.toLowerCase().trim();
      const found = guests.find((g) => g.name.toLowerCase().includes(q));

      setResult(found);
      setSearched(true);
      setLoading(false);
    }, 300);
  }

  var venueParts = content.venue.split('\n');

  var navCards = [
    {
      l: 'Wedding Timeline',
      p: 'timeline',
      d: 'M12 2a10 10 0 110 20 10 10 0 010-20zm0 5v5.5l3.5 2',
    },
    { l: 'Menu', p: 'menu', d: 'M3 3h18v4H3zM3 10h18M3 15h18M3 20h18' },
    {
      l: 'Bridal Party',
      p: 'bridal',
      d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    },
    {
      l: 'Love & Wisdom',
      p: 'activity',
      d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    },
    {
      l: 'Guest Notes',
      p: 'notes',
      d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
    },
    {
      l: 'Seating Plan',
      p: 'seating',
      d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
    },
  ];

  return (
    <div
      style={{ minHeight: '100vh', background: theme.pageBg || theme.cream }}
    >
      <div
        style={{
          background: theme.heroBgImage
            ? 'url(' + theme.heroBgImage + ') center center / cover no-repeat'
            : 'linear-gradient(180deg,' +
              theme.heroBg1 +
              ' 0%,' +
              theme.heroBg2 +
              ' 50%,' +
              (theme.pageBg || theme.cream) +
              ' 100%)',
          paddingTop: 100,
          textAlign: theme.heroAlign,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {theme.heroBgImage ? (
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
            }}
          />
        ) : null}
        
        <div
          style={{
            position: 'absolute',
            top: 120,
            right: '14%',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: theme.dustyBlue,
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 190,
            left: '22%',
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: theme.dustyBlue,
            opacity: 0.15,
          }}
        />
        <div
          style={{
            padding: '0 28px',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(22px)',
            transition: 'all 1.1s ease',
          }}
        >
          <p
            style={{
              fontFamily: rf(theme),
              fontSize: 'clamp(12px,3vw,15px)',
              letterSpacing: '0.38em',
              color: theme.dustyBlue,
              textTransform: 'uppercase',
              marginBottom: 22,
              fontWeight: 600,
              opacity: 0.85,
            }}
          >
            {content.heroSuper}
          </p>
          {theme.nameImage ? (
            <img
              src={theme.nameImage}
              alt={content.coupleName}
              style={{
                maxWidth: 'min(520px,90vw)',
                width: '100%',
                marginBottom: 20,
                display: 'block',
                margin:
                  theme.heroAlign === 'center' ? '0 auto 20px' : '0 0 20px',
              }}
            />
          ) : (
            <h1
              style={{
                fontFamily: gf(theme),
                fontSize:
                  'clamp(52px,' +
                  theme.heroNameSize +
                  'px,' +
                  theme.heroNameSize +
                  'px)',
                color: theme.dustyBlue,
                lineHeight: 1.08,
                marginBottom: 20,
              }}
            >
              {content.coupleName}
            </h1>
          )}
          <RingDivider theme={theme} />
          <p
            style={{
              fontFamily: pf(theme),
              fontSize:
                'clamp(18px,' +
                theme.heroSubSize +
                'px,' +
                (theme.heroSubSize + 4) +
                'px)',
              color: '#3d4f5e',
              letterSpacing: '0.12em',
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            {content.weddingDate}
          </p>
          <div style={{ marginBottom: 30, paddingBottom: 2 }}>
            {venueParts.map(function (line, i) {
              return (
                <p
                  key={i}
                  style={{
                    fontFamily: pf(theme),
                    fontSize: 'clamp(13px,3vw,16px)',
                    color: '#7a8e9a',
                    fontStyle: 'italic',
                    lineHeight:1.5,
                    letterSpacing: '0em',
                  }}
                >
                  {line}
                </p>
              );
            })}
          </div>
          <p
            style={{
              fontFamily: rf(theme),
              fontSize: 'clamp(14px,3.8vw,17px)',
              color: '#4e5e6a',
              maxWidth: 400,
              margin: theme.heroAlign === 'center' ? '0 auto' : '0',
              lineHeight: 1.8,
              fontWeight: 300,
              padding: '0 4px',
            }}
          >
            {content.welcomeMsg}
          </p>
        </div>
        <div style={{ marginTop: 44, lineHeight: 0 }}>
          {theme.heroImage ? (
            <img
              src={theme.heroImage}
              alt=""
              style={{
                width: '100%',
                display: 'block',
                maxHeight: theme.floralHeight,
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
          ) : theme.showFloral ? (
            <SvgFloral theme={theme} />
          ) : null}
        </div>
      </div>

      {/* FIND YOUR SEAT — gradient bridge from hero */}
      <div
        style={{
          background: 'linear-gradient(to bottom,#eaf1f7 0%,#ffffff 18%)',
          padding: '64px 24px 60px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: gf(theme),
            fontSize: theme.sectionTitleSize,
            color: theme.dustyBlue,
            marginBottom: 10,
          }}
        >
          Find Your Seat
        </h2>
        <p
          style={{
            fontFamily: rf(theme),
            fontSize: 11,
            letterSpacing: '0.28em',
            color: '#9aacb8',
            textTransform: 'uppercase',
            marginBottom: 38,
            fontWeight: 600,
          }}
        >
          SEARCH BY YOUR NAME BELOW
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <input
            value={query}
            onChange={function (e) {
              setQuery(e.target.value);
              setSearched(false);
            }}
            onKeyDown={function (e) {
              if (e.key === 'Enter') doSearch();
            }}
            placeholder="Enter your name..."
            style={{
              width: 'min(88%,560px)',
              height: 62,
              borderRadius: 50,
              background: theme.beigeBg,
              border: '2px solid ' + theme.dustyBlue + '48',
              fontFamily: pf(theme),
              fontSize: 16,
              color: '#3a3530',
              textAlign: 'center',
              outline: 'none',
              paddingInline: 28,
            }}
          />
          <button
            onClick={doSearch}
            style={{
              height: 56,
              width: 'min(82%,300px)',
              borderRadius: 50,
              background:
                'linear-gradient(135deg,' +
                theme.dustyBlue +
                'ee,' +
                theme.dustyBlue +
                'bb)',
              border: 'none',
              color: '#fff',
              fontFamily: rf(theme),
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.2em',
              cursor: 'pointer',
              boxShadow: '0 8px 24px ' + theme.dustyBlue + '38',
              transition: 'all 0.2s',
            }}
            onMouseEnter={function (e) {
              e.currentTarget.style.filter = 'brightness(0.91)';
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.filter = 'none';
            }}
          >
            FIND MY SEAT
          </button>
        </div>
        {searched && (
          <div style={{ marginTop: 28, animation: 'fadeUp 0.4s ease both' }}>
            {result ? (
              <div>
                <p
                  style={{
                    fontFamily: rf(theme),
                    fontSize: 11,
                    color: '#9aacb8',
                    letterSpacing: '0.15em',
                    marginBottom: 8,
                  }}
                >
                  YOU ARE SEATED AT
                </p>
                <p
                  style={{
                    fontFamily: pf(theme),
                    fontSize: 28,
                    color: theme.dustyBlue,
                    fontWeight: 600,
                  }}
                >
                  Table {result.table}
                  {result.seat ? ' · Seat ' + result.seat : ''}
                </p>
                <p
                  style={{
                    fontFamily: rf(theme),
                    fontSize: 14,
                    color: '#9aacb8',
                    marginTop: 6,
                  }}
                >
                  {result.name}
                </p>
              </div>
            ) : (
              <p
                style={{
                  fontFamily: pf(theme),
                  fontStyle: 'italic',
                  color: '#9aacb8',
                  fontSize: 15,
                  maxWidth: 320,
                  margin: '0 auto',
                  lineHeight: 1.8,
                }}
              >
                We couldn't find your name. Please check the spelling or visit
                the welcome desk.
              </p>
            )}
          </div>
        )}
      </div>

      {/* EXPLORE THE DAY — gradient bridge from white */}
      <div
        style={{
          background:
            'linear-gradient(to bottom,#f0f5f9 0%,' + theme.navBg + ' 20%)',
          padding: '52px 20px 52px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: gf(theme),
            fontSize: Math.round(theme.sectionTitleSize * 0.82),
            color: theme.dustyBlue,
            marginBottom: 8,
          }}
        >
          Explore the Day
        </h2>
        <p
          style={{
            fontFamily: rf(theme),
            fontSize: 11,
            letterSpacing: '0.28em',
            color: '#8a9aaa',
            textTransform: 'uppercase',
            marginBottom: 36,
            fontWeight: 600,
          }}
        >
          TAP TO NAVIGATE
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 14,
            maxWidth: 560,
            margin: '0 auto',
          }}
        >
          {navCards.map(function (card) {
            return (
              <button
                key={card.p}
                onClick={function () {
                  setPage(card.p);
                }}
                style={{
                  background: theme.cardBg,
                  border: 'none',
                  borderRadius: 18,
                  padding: '28px 14px 22px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: theme.cardShadow,
                  transition: 'transform 0.2s,box-shadow 0.2s',
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 26px rgba(80,110,140,0.16)';
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow =
                    '0 2px 14px rgba(80,110,140,0.09)';
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={theme.dustyBlue}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={card.d} />
                </svg>
                <span
                  style={{
                    fontFamily: pf(theme),
                    fontSize: 15,
                    color: '#3a3530',
                    lineHeight: 1.3,
                  }}
                >
                  {card.l}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <Footer theme={theme} content={content} />
    </div>
  );
}

function PW({ title, theme, content, children }) {
  return (
    <div
      style={{ minHeight: '100vh', background: theme.pageBg || theme.cream }}
    >
      <div
        style={{
          background:
            'linear-gradient(180deg,' +
            theme.heroBg1 +
            ' 0%,' +
            theme.heroBg2 +
            ' 45%,' +
            (theme.pageBg || theme.cream) +
            ' 100%)',
          padding: '92px 24px 36px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: gf(theme),
            fontSize: 'clamp(40px,10vw,' + theme.sectionTitleSize + 'px)',
            color: theme.dustyBlue,
            lineHeight: 1,
          }}
        >
          {title}
        </h1>
        <RingDivider theme={theme} />
      </div>
      <div style={{ padding: '0 20px 48px', maxWidth: 600, margin: '0 auto' }}>
        {children}
      </div>
      {/* Gradient bridge into footer */}
      <div
        style={{
          height: 60,
          background:
            'linear-gradient(to bottom,' + theme.cream + ' 0%,#e8eff5 100%)',
        }}
      />
      <Footer theme={theme} content={content} />
    </div>
  );
}

/* ── TIMELINE ── */
function TimelinePage({ theme, content }) {
  var ev = tryJ(content.timelineEvents, []);
  return (
    <PW title="Wedding Timeline" theme={theme} content={content}>
      {ev.map(function (e, i) {
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 18,
              marginBottom: 24,
              animation: 'fadeUp 0.4s ease ' + i * 0.04 + 's both',
            }}
          >
            <div style={{ minWidth: 76, textAlign: 'right', paddingTop: 2 }}>
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 12,
                  color: theme.dustyBlue,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {e.t}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 18,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: theme.dustyBlue,
                  opacity: 0.5,
                  marginTop: 3,
                  flexShrink: 0,
                }}
              />
              {i < ev.length - 1 ? (
                <div
                  style={{
                    flex: 1,
                    width: 1,
                    background: theme.dustyBlue + '30',
                    marginTop: 4,
                  }}
                />
              ) : null}
            </div>
            <div style={{ flex: 1, paddingBottom: 10 }}>
              <p
                style={{
                  fontFamily: pf(theme),
                  fontSize: 16,
                  color: '#3a3530',
                  marginBottom: 4,
                }}
              >
                {e.ti}
              </p>
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 13,
                  color: '#7a8a95',
                  lineHeight: 1.65,
                  fontWeight: 300,
                }}
              >
                {e.d}
              </p>
            </div>
          </div>
        );
      })}
    </PW>
  );
}

/* ── MENU ── */
function MenuPage({ theme, content }) {
  var sections = tryJ(content.menuSections, []);
  return (
    <PW title="Dinner Menu" theme={theme} content={content}>
      <p
        style={{
          fontFamily: pf(theme),
          fontStyle: 'italic',
          fontSize: 14,
          color: '#8a9aaa',
          textAlign: 'center',
          marginBottom: 34,
        }}
      >
        {content.menuIntro}
      </p>
      {sections.map(function (sec) {
        return (
          <div key={sec.h} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: theme.dustyBlue + '28',
                }}
              />
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 11,
                  letterSpacing: '0.25em',
                  color: theme.dustyBlue,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {sec.h}
              </p>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: theme.dustyBlue + '28',
                }}
              />
            </div>
            {sec.items.map(function (it) {
              return (
                <p
                  key={it}
                  style={{
                    fontFamily: pf(theme),
                    fontSize: 15,
                    color: '#3a3530',
                    textAlign: 'center',
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  {it}
                </p>
              );
            })}
          </div>
        );
      })}
    </PW>
  );
}

/* ── LOVE & WISDOM (was Table Activity — duplicates removed) ── */
function ActivityPage({ theme, content }) {
  var challenges = tryJ(content.lwChallenges, []);
  return (
    <PW title="Love & Wisdom" theme={theme} content={content}>
      <p
        style={{
          fontFamily: rf(theme),
          fontSize: 11,
          letterSpacing: '0.22em',
          color: '#9aacb8',
          textTransform: 'uppercase',
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        {content.lwSubtitle}
      </p>

      <RingDivider theme={theme} />

        <div style={{ height: 20 }} />
              {challenges.map(function (c, i) {
                return (
          <div
            key={i}
            style={{
              padding: "22px 25px",
              marginBottom: 25,
              borderRadius: 20,
              background: "rgba(237,231,226,0.55)", // softer beige
              backdropFilter: "blur(2px)",
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 28,
                  borderRadius: '50%',
                  background: theme.dustyBlue + '18',
                  border: '1px solid ' + theme.dustyBlue + '35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: pf(theme),
                    fontSize: 15,
                    color: theme.dustyBlue,
                    fontWeight: 300,
                  }}
                >
                  {i + 1}
                </span>
              </div>
              <p
                style={{
                  fontFamily: pf(theme),
                  fontSize: 18,
                  color: '#3a3530',
                }}
              >
                {c.ti}
              </p>
            </div>
            <p
              style={{
                fontFamily: rf(theme),
                fontSize: 14,
                color: '#7a8a95',
                lineHeight: 1.75,
                fontWeight: 400,
                paddingLeft: 38,
              }}
            >
              {c.de}
            </p>
          </div>
        );
      })}
    </PW>
  );
}

/* ── BRIDAL PARTY ── */
function BridalPage({ theme, content, bridalParty }) {
  var bp = bridalParty;

  function MemberCard(props) {
    return (
      <div
        style={{
          background: theme.cardBg,
          border: '1px solid ' + theme.dustyBlue + '28',
          borderRadius: 18,
          padding: '22px 14px',
          textAlign: 'center',
          boxShadow: theme.cardShadow,
          animation: 'fadeUp 0.4s ease ' + props.idx * 0.05 + 's both',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: theme.dustyBlue + '14',
            border: '1.5px solid ' + theme.dustyBlue + '38',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.dustyBlue}
            strokeWidth="1.3"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        {props.role ? (
          <p
            style={{
              fontFamily: rf(theme),
              fontSize: 10,
              letterSpacing: '0.2em',
              color: theme.dustyBlue,
              textTransform: 'uppercase',
              marginBottom: 5,
              fontWeight: 600,
            }}
          >
            {props.role}
          </p>
        ) : null}
        <p style={{ fontFamily: pf(theme), fontSize: 15, color: '#3a3530' }}>
          {props.name}
        </p>
      </div>
    );
  }

  function SectionBlock(props) {
    return (
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: theme.dustyBlue + '28' }}
          />
          <p
            style={{
              fontFamily: rf(theme),
              fontSize: 11,
              letterSpacing: '0.25em',
              color: theme.dustyBlue,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {props.title}
          </p>
          <div
            style={{ flex: 1, height: 1, background: theme.dustyBlue + '28' }}
          />
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
        >
          {props.children}
        </div>
      </div>
    );
  }

  var globalIdx = 0;

  return (
    <PW title="Bridal Party" theme={theme} content={content}>
      {/* Couple */}
      <SectionBlock title="The Couple">
        <MemberCard role="Bride" name="Kaci-Ann Brown" idx={globalIdx++} />
        <MemberCard role="Groom" name="Delano Williams" idx={globalIdx++} />
      </SectionBlock>

      {/* Bridesmaids */}
      {bp.bridesmaids && bp.bridesmaids.length > 0 && (
        <SectionBlock title="Bridesmaids">
          {bp.bridesmaids.map(function (name, i) {
            return (
              <MemberCard
                key={i}
                role="Bridesmaid"
                name={name}
                idx={globalIdx++}
              />
            );
          })}
        </SectionBlock>
      )}

      {/* Groomsmen */}
      {bp.groomsmen && bp.groomsmen.length > 0 && (
        <SectionBlock title="Groomsmen">
          {bp.groomsmen.map(function (name, i) {
            return (
              <MemberCard
                key={i}
                role="Groomsman"
                name={name}
                idx={globalIdx++}
              />
            );
          })}
        </SectionBlock>
      )}

      {/* Flower Girls */}
      {bp.flowerGirls && bp.flowerGirls.length > 0 && (
        <SectionBlock title="Flower Girls">
          {bp.flowerGirls.map(function (name, i) {
            return (
              <MemberCard
                key={i}
                role="Flower Girl"
                name={name}
                idx={globalIdx++}
              />
            );
          })}
        </SectionBlock>
      )}

      {/* Special Roles / Participants */}
      {bp.specialRoles && bp.specialRoles.length > 0 && (
        <SectionBlock title="Participants">
          {bp.specialRoles.map(function (member, i) {
            return (
              <MemberCard
                key={i}
                role={member.role}
                name={member.name}
                idx={globalIdx++}
              />
            );
          })}
        </SectionBlock>
      )}
    </PW>
  );
}

/* ── GUEST NOTES ── */
const SHEETS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyZUAxo330ZmV20qUtsMw5xadmt3heQLjxWUrE0xiN40HT3VIo8lfyMBQuNZDrrE966/exec';

function NotesPage({ theme, content }) {
  var [name, setName] = useState('');
  var [message, setMessage] = useState('');
  var [sending, setSending] = useState(false);
  var [done, setDone] = useState(false);
  var [error, setError] = useState('');

  /* Soft bottom-border only input style */
  var fieldSt = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1.5px solid ' + theme.dustyBlue + '45',
    fontFamily: pf(theme),
    fontSize: 15,
    color: '#3a3530',
    padding: '10px 4px',
    outline: 'none',
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 20,
    transition: 'border-color 0.2s',
  };
  var textareaSt = {
    width: '100%',
    minHeight: 140,
    borderRadius: 16,
    background: theme.beigeBg,
    border: 'none',
    fontFamily: pf(theme),
    fontSize: 14,
    color: '#3a3530',
    padding: '18px 20px',
    outline: 'none',
    resize: 'vertical',
    lineHeight: 1.75,
    display: 'block',
  };

  async function submitNote() {
    if (!name.trim() || !message.trim()) {
      setError('Please enter your name and a message 🤍');
      return;
    }
    setError('');
    setSending(true);
    try {
      await fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      /* no-cors means opaque response — assume success */
      setName('');
      setMessage('');
      setDone(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <PW title="Guest Notes" theme={theme} content={content}>
      {/* Quote — elegant script, no box */}
      <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 8px' }}>
        <p
          style={{
            fontFamily: gf(theme),
            fontSize: 'clamp(24px,6vw,32px)',
            lineHeight: 1.5,
            color: theme.dustyBlue,
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          {content.notesQuote.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div
          style={{
            width: 35,
            height: 1,
            background: theme.dustyBlue + '40',
            margin: '16px auto 0',
          }}
        />
      </div>

      {!done ? (
        <div>
          {/* Prompt */}
          <p
            style={{
              fontFamily: pf(theme),
              fontStyle: 'italic',
              fontSize: 15,
              color: '#5a6e7a',
              marginBottom: 35,
              lineHeight: 1.8,
              textAlign: 'center',
            }}
          >
            {content.notesPrompt}
          </p>

          {/* Name — bottom border only */}
          <input
            value={name}
            onChange={function (e) {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Your name..."
            style={fieldSt}
            onFocus={function (e) {
              e.currentTarget.style.borderBottomColor = theme.dustyBlue;
            }}
            onBlur={function (e) {
              e.currentTarget.style.borderBottomColor = theme.dustyBlue + '45';
            }}
          />

          {/* Message — soft beige card */}
          <textarea
            value={message}
            onChange={function (e) {
              setMessage(e.target.value);
              setError('');
            }}
            placeholder="Write your message here..."
            style={textareaSt}
            onFocus={function (e) {
              e.currentTarget.style.boxShadow =
                '0 0 0 2px ' + theme.dustyBlue + '30';
            }}
            onBlur={function (e) {
              e.currentTarget.style.boxShadow = 'none';
            }}
          />

          {/* Soft muted error (no red) */}
          {error ? (
            <p
              style={{
                fontFamily: rf(theme),
                fontSize: 13,
                color: theme.dustyBlue,
                opacity: 0.7,
                marginTop: 12,
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              {error}
            </p>
          ) : null}

          {/* Submit */}
          <button
            onClick={submitNote}
            disabled={sending}
            style={{
              marginTop: 20,
              width: '100%',
              height: 54,
              borderRadius: 50,
              background: sending
                ? theme.dustyBlue + '55'
                : 'linear-gradient(135deg,' +
                  theme.dustyBlue +
                  'ee,' +
                  theme.dustyBlue +
                  'bb)',
              border: 'none',
              color: '#fff',
              fontFamily: rf(theme),
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.2em',
              cursor: sending ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: sending
                ? 'none'
                : '0 6px 20px ' + theme.dustyBlue + '35',
            }}
          >
            {sending ? 'SENDING...' : 'SUBMIT NOTE'}
          </button>
        </div>
      ) : (
        /* Success — no alert, inline fade-in */
        <div
          style={{
            textAlign: 'center',
            padding: '44px 0',
            animation: 'fadeUp 0.6s ease both',
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: theme.beigeBg,
              border: '1.5px solid ' + theme.dustyBlue + '40',
              margin: '0 auto 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.dustyBlue}
              strokeWidth="1.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p
            style={{
              fontFamily: gf(theme),
              fontSize: 42,
              color: theme.dustyBlue,
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            Thank you
          </p>
          <p
            style={{
              fontFamily: pf(theme),
              fontStyle: 'italic',
              color: '#8a9aaa',
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            Thank you for your beautiful message 🤍
          </p>
          <button
            onClick={function () {
              setDone(false);
            }}
            style={{
              marginTop: 28,
              background: 'none',
              border: '1px solid ' + theme.dustyBlue + '45',
              borderRadius: 50,
              padding: '12px 32px',
              fontFamily: rf(theme),
              fontSize: 12,
              color: theme.dustyBlue,
              cursor: 'pointer',
              letterSpacing: '0.12em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={function (e) {
              e.currentTarget.style.background = theme.dustyBlue + '10';
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.background = 'none';
            }}
          >
            WRITE ANOTHER
          </button>
        </div>
      )}
    </PW>
  );
}

/* ── SEATING ── */
function SeatingPage({ guests, theme, content }) {
  var tables = [];
  guests.forEach(function (g) {
    if (tables.indexOf(g.table) === -1) tables.push(g.table);
  });
  tables.sort(function (a, b) {
    return a - b;
  });
  return (
    <PW title="Seating Plan" theme={theme} content={content}>
      {content.seatingIntro ? (
        <p
          style={{
            fontFamily: pf(theme),
            fontStyle: 'italic',
            fontSize: 14,
            color: '#8a9aaa',
            textAlign: 'center',
            marginBottom: 28,
            lineHeight: 1.7,
          }}
        >
          {content.seatingIntro}
        </p>
      ) : null}
      {tables.map(function (t) {
        var seated = guests.filter(function (g) {
          return g.table === t;
        });
        return (
          <div
            key={t}
            style={{
              marginBottom: 18,
              background: theme.cardBg,
              border: '1px solid ' + theme.dustyBlue + '28',
              borderRadius: 16,
              padding: '18px 20px',
              boxShadow: theme.cardShadow,
              animation: 'fadeUp 0.4s ease ' + t * 0.06 + 's both',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: theme.dustyBlue + '16',
                  border: '1.5px solid ' + theme.dustyBlue + '38',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: rf(theme),
                    fontSize: 12,
                    color: theme.dustyBlue,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              </div>
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: theme.dustyBlue,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Table {t}
              </p>
            </div>
            {seated.map(function (g) {
              return (
                <div
                  key={g.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '7px 0',
                    borderBottom: '1px solid ' + theme.dustyBlue + '15',
                  }}
                >
                  <p
                    style={{
                      fontFamily: pf(theme),
                      fontSize: 14,
                      color: '#3a3530',
                    }}
                  >
                    {g.name}
                  </p>
                  <p
                    style={{
                      fontFamily: rf(theme),
                      fontSize: 12,
                      color: '#9aacb8',
                    }}
                  >
                    Seat {g.seat}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </PW>
  );
}

/* ── IMAGE UPLOAD ── */
function ImgUpload({ label, value, onChange, theme }) {
  var ref = useRef();
  return (
    <div style={{ marginBottom: 16 }}>
      <p
        style={{
          fontFamily: rf(theme),
          fontSize: 11,
          color: '#8a9aaa',
          letterSpacing: '0.12em',
          marginBottom: 7,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
      <div
        style={{
          border: '1.5px dashed ' + theme.dustyBlue + '48',
          borderRadius: 12,
          padding: '13px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          background: value ? theme.dustyBlue + '07' : theme.beigeBg,
        }}
        onClick={function () {
          ref.current.click();
        }}
      >
        {value ? (
          <img
            src={value}
            alt=""
            style={{ height: 44, borderRadius: 8, objectFit: 'contain' }}
          />
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.dustyBlue}
            strokeWidth="1.3"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
        )}
        <div>
          <p
            style={{
              fontFamily: rf(theme),
              fontSize: 13,
              color: theme.dustyBlue,
              fontWeight: 500,
            }}
          >
            {value ? 'Change image' : 'Upload image'}
          </p>
          <p style={{ fontFamily: rf(theme), fontSize: 11, color: '#9aacb8' }}>
            PNG, JPG, WebP
          </p>
        </div>
        {value ? (
          <button
            onClick={function (e) {
              e.stopPropagation();
              onChange('');
            }}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#b07070',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        ) : null}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={function (e) {
          var f = e.target.files[0];
          if (!f) return;
          var r = new FileReader();
          r.onload = function (ev) {
            onChange(ev.target.result);
          };
          r.readAsDataURL(f);
        }}
        style={{ display: 'none' }}
      />
    </div>
  );
}

/* ── ADMIN ── */
function AdminPage({
  guests,
  setGuests,
  theme,
  setTheme,
  content,
  setContent,
  bridalParty,
  setBridalParty,
}) {
  var [authed, setAuthed] = useState(false);
  var [pw, setPw] = useState('');
  var [err, setErr] = useState(false);
  var [tab, setTab] = useState('guests');
  var [search, setSearch] = useState('');
  var [editId, setEditId] = useState(null);
  var [form, setForm] = useState({ name: '', table: '', seat: '', group: '' });
  var [showAdd, setShowAdd] = useState(false);
  var [csvText, setCsvText] = useState('');
  var [saved, setSaved] = useState(false);
  var [cTab, setCTab] = useState('hero');

  function login() {
    if (pw === 'admin') {
      setAuthed(true);
      setErr(false);
    } else setErr(true);
  }
  function del(id) {
    var g = guests.filter(function (x) {
      return x.id !== id;
    });
    setGuests(g);
    sv(SK + '_g', g);
  }
  function startEdit(g) {
    setEditId(g.id);
    setForm({ name: g.name, table: g.table, seat: g.seat, group: g.group });
  }
  function saveEdit() {
    var g = guests.map(function (x) {
      return x.id === editId
        ? Object.assign({}, x, form, { table: +form.table, seat: +form.seat })
        : x;
    });
    setGuests(g);
    sv(SK + '_g', g);
    setEditId(null);
  }
  function addGuest() {
  if (!form.name.trim()) return;

  var g = guests.concat([
    Object.assign({ id: Date.now() }, form, {
      table: +form.table,
      seat: +form.seat,
    }),
  ]);

  setGuests(g);
  sv(SK + '_g', g);
  setForm({ name: '', table: '', seat: '', group: '' });
  setShowAdd(false);
}
const [dragActive, setDragActive] = useState(false);
function handleDrag(e) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(true);
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  const file = e.dataTransfer.files[0];
  if (!file || !file.name.endsWith(".csv")) {
    alert("Please drop a CSV file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    setCsvText(event.target.result);
  };
  reader.readAsText(file);
}
  function exportCSV() {
    var rows = ['Name,Table,Seat,Group']
      .concat(
        guests.map(function (g) {
          return g.name + ',' + g.table + ',' + g.seat + ',' + g.group;
        })
      )
      .join('\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([rows], { type: 'text/csv' }));
    a.download = 'guests.csv';
    a.click();
  }
  function upT(k, v) {
    var nt = Object.assign({}, theme);
    nt[k] = v;
    setTheme(nt);
    sv(SK + '_t', nt);
  }
  function upC(k, v) {
    var nc = Object.assign({}, content);
    nc[k] = v;
    setContent(nc);
    sv(SK + '_c', nc);
  }
  function showSavedMsg() {
    setSaved(true);
    setTimeout(function () {
      setSaved(false);
    }, 2000);
  }

  var filtered = guests.filter(function (g) {
    return g.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  var iSt = {
    height: 44,
    borderRadius: 50,
    background: theme.beigeBg,
    border: '1.5px solid ' + theme.dustyBlue + '38',
    fontFamily: rf(theme),
    fontSize: 13,
    color: '#3a3530',
    paddingInline: 18,
    outline: 'none',
    width: '100%',
    marginBottom: 8,
  };
  var taSt = {
    width: '100%',
    minHeight: 78,
    borderRadius: 12,
    background: theme.beigeBg,
    border: '1.5px solid ' + theme.dustyBlue + '38',
    fontFamily: rf(theme),
    fontSize: 13,
    color: '#3a3530',
    padding: '10px 14px',
    outline: 'none',
    resize: 'vertical',
    lineHeight: 1.6,
    marginBottom: 8,
  };
  var bSt = {
    height: 42,
    borderRadius: 50,
    background:
      'linear-gradient(135deg,' +
      theme.dustyBlue +
      'ee,' +
      theme.dustyBlue +
      'bb)',
    border: 'none',
    color: '#fff',
    fontFamily: rf(theme),
    fontSize: 11,
    letterSpacing: '0.13em',
    cursor: 'pointer',
    padding: '0 20px',
  };
  var b2St = {
    height: 42,
    borderRadius: 50,
    background: 'none',
    border: '1.5px solid ' + theme.dustyBlue + '55',
    color: theme.dustyBlue,
    fontFamily: rf(theme),
    fontSize: 11,
    letterSpacing: '0.13em',
    cursor: 'pointer',
    padding: '0 20px',
  };
  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
  
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const text = event.target.result;
      setCsvText(text);
    };
  
    reader.readAsText(file);
  }
  
  function importCSV() {
    if (!csvText.trim()) {
      alert("Paste or upload CSV first");
      return;
    }
  
    const lines = csvText.trim().split("\n").slice(1);
  
    const newGuests = lines
      .map((line, i) => {
        const [name, table, seat, group] = line.split(",");
  
        if (!name) return null;
  
        return {
          id: Date.now() + i,
          name: name.trim(),
          table: Number(table),
          seat: Number(seat),
          group: group?.trim() || "",
        };
      })
      .filter(Boolean);
  
    const updated = guests.concat(newGuests);
    setGuests(updated);
    localStorage.setItem("kd_wg_v5_g", JSON.stringify(updated));
  
    setCsvText("");
    alert("Guests imported!");
  }

  function Sec(props) {
    return (
      <div style={{ marginBottom: 28 }}>
        <p
          style={{
            fontFamily: rf(theme),
            fontSize: 11,
            letterSpacing: '0.2em',
            color: theme.dustyBlue,
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: 14,
            paddingBottom: 8,
            borderBottom: '1px solid ' + theme.dustyBlue + '22',
          }}
        >
          {props.title}
        </p>
        {props.children}
      </div>
    );
  }
  function Lbl(props) {
    return (
      <p
        style={{
          fontFamily: rf(theme),
          fontSize: 12,
          color: '#7a8a95',
          marginBottom: 6,
          letterSpacing: '0.04em',
        }}
      >
        {props.children}
      </p>
    );
  }

  function ColorRow(props) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 13,
        }}
      >
        <p style={{ fontFamily: rf(theme), fontSize: 13, color: '#3a3530' }}>
          {props.label}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              overflow: 'hidden',
              border: '1.5px solid #ddd',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <input
              type="color"
              value={theme[props.k]}
              onChange={function (e) {
                upT(props.k, e.target.value);
              }}
              style={{
                position: 'absolute',
                top: -8,
                left: -8,
                width: 50,
                height: 50,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                opacity: 0,
              }}
            />
            <div
              style={{
                width: '100%',
                height: '100%',
                background: theme[props.k],
              }}
            />
          </div>
          <input
            value={theme[props.k]}
            onChange={function (e) {
              upT(props.k, e.target.value);
            }}
            style={{
              width: 86,
              height: 34,
              borderRadius: 8,
              background: '#f5f5f5',
              border: '1px solid #e0e0e0',
              fontFamily: 'monospace',
              fontSize: 12,
              color: '#3a3530',
              paddingInline: 8,
              outline: 'none',
            }}
          />
        </div>
      </div>
    );
  }

  function FontSel(props) {
    return (
      <div style={{ marginBottom: 16 }}>
        <Lbl>{props.label}</Lbl>
        <select
          value={theme[props.k]}
          onChange={function (e) {
            upT(props.k, e.target.value);
          }}
          style={{
            width: '100%',
            height: 42,
            borderRadius: 50,
            background: theme.beigeBg,
            border: '1.5px solid ' + theme.dustyBlue + '38',
            fontSize: 14,
            color: '#3a3530',
            paddingInline: 16,
            outline: 'none',
            cursor: 'pointer',
            marginBottom: 6,
          }}
        >
          {props.opts.map(function (f) {
            return (
              <option key={f} value={f}>
                {f}
              </option>
            );
          })}
        </select>
        <p
          style={{
            fontFamily: "'" + theme[props.k] + "',cursive,serif",
            fontSize: 20,
            color: theme.dustyBlue,
            paddingLeft: 4,
          }}
        >
          Kaci-Ann &amp; Delano
        </p>
      </div>
    );
  }

  function SliderRow(props) {
    return (
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <p style={{ fontFamily: rf(theme), fontSize: 13, color: '#3a3530' }}>
            {props.label}
          </p>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: theme.dustyBlue,
            }}
          >
            {theme[props.k]}px
          </p>
        </div>
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={theme[props.k]}
          onChange={function (e) {
            upT(props.k, +e.target.value);
          }}
          style={{ width: '100%', accentColor: theme.dustyBlue }}
        />
      </div>
    );
  }

  function Toggle(props) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <p style={{ fontFamily: rf(theme), fontSize: 13, color: '#3a3530' }}>
          {props.label}
        </p>
        <button
          onClick={function () {
            upT(props.k, !theme[props.k]);
          }}
          style={{
            width: 46,
            height: 26,
            borderRadius: 50,
            background: theme[props.k] ? theme.dustyBlue : '#ccc',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.2s',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 3,
              left: theme[props.k] ? 22 : 3,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s',
            }}
          />
        </button>
      </div>
    );
  }

  function JsonListEditor(props) {
    var items = tryJ(content[props.k], []);
    function update(i, field, val) {
      var arr = items.map(function (x, j) {
        return j === i
          ? Object.assign({}, x, Object.fromEntries([[field, val]]))
          : x;
      });
      upC(props.k, JSON.stringify(arr));
    }
    function addRow() {
      var blank = {};
      props.fields.forEach(function (f) {
        blank[f.k] = '';
      });
      upC(props.k, JSON.stringify(items.concat([blank])));
    }
    function delRow(i) {
      upC(
        props.k,
        JSON.stringify(
          items.filter(function (_, j) {
            return j !== i;
          })
        )
      );
    }
    return (
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Lbl>{props.label}</Lbl>
          <button
            onClick={addRow}
            style={Object.assign({}, bSt, {
              height: 32,
              fontSize: 10,
              padding: '0 14px',
            })}
          >
            + Add
          </button>
        </div>
        {items.map(function (item, i) {
          return (
            <div
              key={i}
              style={{
                background: theme.dustyBlue + '07',
                borderRadius: 12,
                padding: '12px 14px',
                marginBottom: 10,
                border: '1px solid ' + theme.dustyBlue + '18',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: 6,
                }}
              >
                <button
                  onClick={function () {
                    delRow(i);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#b07070',
                    fontSize: 13,
                    fontFamily: rf(theme),
                  }}
                >
                  ✕ Remove
                </button>
              </div>
              {props.fields.map(function (field) {
                return (
                  <div key={field.k} style={{ marginBottom: 7 }}>
                    <p
                      style={{
                        fontFamily: rf(theme),
                        fontSize: 11,
                        color: '#9aacb8',
                        marginBottom: 3,
                      }}
                    >
                      {field.label}
                    </p>
                    {field.multi ? (
                      <textarea
                        value={item[field.k] || ''}
                        onChange={function (e) {
                          update(i, field.k, e.target.value);
                        }}
                        style={Object.assign({}, taSt, {
                          minHeight: 54,
                          marginBottom: 0,
                        })}
                      />
                    ) : (
                      <input
                        value={item[field.k] || ''}
                        onChange={function (e) {
                          update(i, field.k, e.target.value);
                        }}
                        style={Object.assign({}, iSt, { marginBottom: 0 })}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  var cTabs = [
    { id: 'hero', label: 'Hero' },
    { id: 'footer', label: 'Footer' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'menu', label: 'Menu' },
    { id: 'notes', label: 'Notes' },
    { id: 'seating', label: 'Seating' },
  ];

  if (!authed)
    return (
      <div
        style={{
          minHeight: '100vh',
          background: theme.pageBg || theme.cream,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div style={{ width: '100%', maxWidth: 340, textAlign: 'center' }}>
        {theme.logoImage ? (
        <img
          src={theme.logoImage}
          alt="logo"
          style={{
            height: 56,
            objectFit: 'contain',
            marginBottom: 8,
          }}
        />
      ) : (
        <Monogram theme={theme} size={56} />
      )}
          <h2
            style={{
              fontFamily: gf(theme),
              fontSize: 38,
              color: theme.dustyBlue,
              margin: '14px 0 8px',
            }}
          >
            Admin Access
          </h2>
          <p
            style={{
              fontFamily: rf(theme),
              fontSize: 12,
              color: '#9aacb8',
              marginBottom: 26,
              letterSpacing: '0.12em',
            }}
          >
            ENTER PASSWORD TO CONTINUE
          </p>
          <input
            type="password"
            value={pw}
            onChange={function (e) {
              setPw(e.target.value);
            }}
            onKeyDown={function (e) {
              if (e.key === 'Enter') login();
            }}
            placeholder="Password"
            style={Object.assign({}, iSt, {
              textAlign: 'center',
              height: 54,
              marginBottom: 12,
            })}
          />
          {err ? (
            <p
              style={{
                fontFamily: rf(theme),
                fontSize: 12,
                color: '#b07070',
                marginBottom: 12,
              }}
            >
              Incorrect password
            </p>
          ) : null}
          <button
            onClick={login}
            style={Object.assign({}, bSt, { width: '100%', height: 52 })}
          >
            ENTER
          </button>
        </div>
      </div>
    );

  return (
    <div
      style={{ minHeight: '100vh', background: theme.pageBg || theme.cream }}
    >
      <div
        style={{
          padding: '90px 24px 28px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: gf(theme),
            fontSize: theme.sectionTitleSize,
            color: theme.dustyBlue,
            lineHeight: 1,
          }}
        >
          Admin Panel
        </h1>
        <RingDivider theme={theme} />
      </div>

      {/* Main tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid ' + theme.dustyBlue + '22',
          background: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        {[
          ['guests', 'Guests'],
          ['bridal', 'Bridal'],
          ['design', 'Design'],
          ['content', 'Content'],
        ].map(function (pair) {
          return (
            <button
              key={pair[0]}
              onClick={function () {
                setTab(pair[0]);
              }}
              style={{
                flex: 1,
                padding: '13px 6px',
                background: 'none',
                border: 'none',
                borderBottom:
                  tab === pair[0]
                    ? '2px solid ' + theme.dustyBlue
                    : '2px solid transparent',
                fontFamily: rf(theme),
                fontSize: 12,
                color: tab === pair[0] ? theme.dustyBlue : '#9aacb8',
                cursor: 'pointer',
                letterSpacing: '0.07em',
                fontWeight: tab === pair[0] ? 600 : 400,
                transition: 'all 0.2s',
                marginBottom: -1,
              }}
            >
              {pair[1]}
            </button>
          );
        })}
      </div>

      <div
        style={{ padding: '22px 20px 60px', maxWidth: 600, margin: '0 auto' }}
      >
        {/* GUESTS */}
        {tab === 'guests' && (
          <div>
            <div
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 18,
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={function () {
                  setShowAdd(true);
                  setForm({ name: '', table: '', seat: '', group: '' });
                }}
                style={bSt}
              >
                + Add Guest
              </button>
              <button onClick={exportCSV} style={b2St}>
                Export CSV
              </button>
            </div>
            <input
              value={search}
              onChange={function (e) {
                setSearch(e.target.value);
              }}
              placeholder="Search guests..."
              style={Object.assign({}, iSt, { height: 46, marginBottom: 18 })}
            />
            {showAdd && (
              <div
                style={{
                  background: theme.beigeBg,
                  borderRadius: 16,
                  padding: 18,
                  marginBottom: 18,
                }}
              >
                <p
                  style={{
                    fontFamily: rf(theme),
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    color: theme.dustyBlue,
                    marginBottom: 12,
                    fontWeight: 600,
                  }}
                >
                  NEW GUEST
                </p>
                {['name', 'table', 'seat', 'group'].map(function (f) {
                  return (
                    <input
                      key={f}
                      value={form[f]}
                      onChange={function (e) {
                        var nf = Object.assign({}, form);
                        nf[f] = e.target.value;
                        setForm(nf);
                      }}
                      placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                      style={iSt}
                    />
                  );
                })}
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button
                    onClick={addGuest}
                    style={Object.assign({}, bSt, { flex: 1 })}
                  >
                    Save
                  </button>
                  <button
                    onClick={function () {
                      setShowAdd(false);
                    }}
                    style={Object.assign({}, b2St, { flex: 1 })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {filtered.map(function (g) {
              return (
                <div
                  key={g.id}
                  style={{
                    background: '#fff',
                    border: '1px solid ' + theme.dustyBlue + '25',
                    borderRadius: 12,
                    padding: '13px 15px',
                    marginBottom: 9,
                  }}
                >
                  {editId === g.id ? (
                    <div>
                      {['name', 'table', 'seat', 'group'].map(function (f) {
                        return (
                          <input
                            key={f}
                            value={form[f]}
                            onChange={function (e) {
                              var nf = Object.assign({}, form);
                              nf[f] = e.target.value;
                              setForm(nf);
                            }}
                            placeholder={f}
                            style={iSt}
                          />
                        );
                      })}
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <button
                          onClick={saveEdit}
                          style={Object.assign({}, bSt, { flex: 1 })}
                        >
                          Save
                        </button>
                        <button
                          onClick={function () {
                            setEditId(null);
                          }}
                          style={Object.assign({}, b2St, { flex: 1 })}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: pf(theme),
                            fontSize: 14,
                            color: '#3a3530',
                          }}
                        >
                          {g.name}
                        </p>
                        <p
                          style={{
                            fontFamily: rf(theme),
                            fontSize: 12,
                            color: '#9aacb8',
                          }}
                        >
                          Table {g.table} · Seat {g.seat} · {g.group}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 7 }}>
                        <button
                          onClick={function () {
                            startEdit(g);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 4,
                          }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={theme.dustyBlue}
                            strokeWidth="1.5"
                          >
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={function () {
                            del(g.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 4,
                          }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#b07070"
                            strokeWidth="1.5"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div
              style={{
                marginTop: 26,
                background: theme.beigeBg,
                borderRadius: 16,
                padding: 18,
              }}
            >
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  color: theme.dustyBlue,
                  marginBottom: 9,
                  fontWeight: 600,
                }}
              >
                IMPORT CSV
          
              </p>
              <div
  onDragOver={handleDrag}
  onDragEnter={handleDrag}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
  style={{
    display: "block",
    marginBottom: 12,
    padding: "20px",
    borderRadius: 12,
    border: dragActive
      ? `2px dashed ${theme.dustyBlue}`
      : "2px dashed #ccc",
    background: dragActive ? theme.dustyBlue + "10" : theme.beigeBg,
    cursor: "pointer",
    fontSize: 13,
    textAlign: "center",
    transition: "all 0.2s",
  }}
>
  <p style={{ marginBottom: 6 }}>
    {dragActive ? "Drop your CSV here" : "Drag & drop CSV here"}
  </p>

  <label
    style={{
      cursor: "pointer",
      fontSize: 12,
      color: theme.dustyBlue,
      textDecoration: "underline",
    }}
  >
    or click to upload
    <input
      type="file"
      accept=".csv"
      onChange={handleFileUpload}
      style={{ display: "none" }}
    />
  </label>
</div>
                    
              <textarea
                value={csvText}
                onChange={function (e) {
                  setCsvText(e.target.value);
                }}
                placeholder={'Name,Table,Seat,Group\nJane Doe,1,1,Family'}
                style={Object.assign({}, taSt, {
                  fontFamily: 'monospace',
                  fontSize: 12,
                  minHeight: 80,
                })}
              />
              <button
                onClick={importCSV}
                style={Object.assign({}, bSt, { width: '100%', height: 42 })}
              >
                Import
              </button>
            </div>
          </div>
        )}

        {/* BRIDAL PARTY ADMIN */}
        {tab === 'bridal' && (
          <div>
            <div
              style={{
                background: theme.dustyBlue + '10',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 22,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.dustyBlue}
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 13,
                  color: theme.dustyBlue,
                  fontWeight: 500,
                }}
              >
                Changes save automatically to the Bridal Party page
              </p>
            </div>

            {/* Helper to render a list section */}
            {[
              { key: 'bridesmaids', label: 'Bridesmaids' },
              { key: 'groomsmen', label: 'Groomsmen' },
              { key: 'flowerGirls', label: 'Flower Girls' },
            ].map(function (section) {
              var list = bridalParty[section.key] || [];
              return (
                <div key={section.key} style={{ marginBottom: 28 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                      paddingBottom: 8,
                      borderBottom: '1px solid ' + theme.dustyBlue + '22',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: rf(theme),
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        color: theme.dustyBlue,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {section.label}
                    </p>
                    <button
                      onClick={function () {
                        var update = Object.assign({}, bridalParty);
                        update[section.key] = list.concat(['New Name']);
                        setBridalParty(update);
                      }}
                      style={Object.assign({}, bSt, {
                        height: 32,
                        fontSize: 10,
                        padding: '0 14px',
                      })}
                    >
                      + Add
                    </button>
                  </div>
                  {list.map(function (name, i) {
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <input
                          value={name}
                          onChange={function (e) {
                            var newList = list.map(function (n, j) {
                              return j === i ? e.target.value : n;
                            });
                            var update = Object.assign({}, bridalParty);
                            update[section.key] = newList;
                            setBridalParty(update);
                          }}
                          style={Object.assign({}, iSt, {
                            flex: 1,
                            marginBottom: 0,
                          })}
                        />
                        <button
                          onClick={function () {
                            var newList = list.filter(function (_, j) {
                              return j !== i;
                            });
                            var update = Object.assign({}, bridalParty);
                            update[section.key] = newList;
                            setBridalParty(update);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0 6px',
                            color: '#b07070',
                            fontSize: 20,
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  {list.length === 0 && (
                    <p
                      style={{
                        fontFamily: rf(theme),
                        fontSize: 13,
                        color: '#9aacb8',
                        fontStyle: 'italic',
                      }}
                    >
                      No entries yet — click + Add above.
                    </p>
                  )}
                </div>
              );
            })}

            {/* Special Roles */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottom: '1px solid ' + theme.dustyBlue + '22',
                }}
              >
                <p
                  style={{
                    fontFamily: rf(theme),
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    color: theme.dustyBlue,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Participants / Special Roles
                </p>
                <button
                  onClick={function () {
                    var update = Object.assign({}, bridalParty);
                    update.specialRoles = (
                      bridalParty.specialRoles || []
                    ).concat([{ role: 'Role', name: 'Name' }]);
                    setBridalParty(update);
                  }}
                  style={Object.assign({}, bSt, {
                    height: 32,
                    fontSize: 10,
                    padding: '0 14px',
                  })}
                >
                  + Add
                </button>
              </div>
              {(bridalParty.specialRoles || []).map(function (member, i) {
                var roles = bridalParty.specialRoles;
                return (
                  <div
                    key={i}
                    style={{
                      background: theme.beigeBg,
                      borderRadius: 12,
                      padding: '12px 14px',
                      marginBottom: 10,
                      border: '1px solid ' + theme.dustyBlue + '18',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 6,
                      }}
                    >
                      <button
                        onClick={function () {
                          var update = Object.assign({}, bridalParty);
                          update.specialRoles = roles.filter(function (_, j) {
                            return j !== i;
                          });
                          setBridalParty(update);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#b07070',
                          fontSize: 13,
                          fontFamily: rf(theme),
                        }}
                      >
                        ✕ Remove
                      </button>
                    </div>
                    <Lbl>Role</Lbl>
                    <input
                      value={member.role}
                      onChange={function (e) {
                        var update = Object.assign({}, bridalParty);
                        update.specialRoles = roles.map(function (r, j) {
                          return j === i
                            ? Object.assign({}, r, { role: e.target.value })
                            : r;
                        });
                        setBridalParty(update);
                      }}
                      style={Object.assign({}, iSt, { marginBottom: 8 })}
                    />
                    <Lbl>Name</Lbl>
                    <input
                      value={member.name}
                      onChange={function (e) {
                        var update = Object.assign({}, bridalParty);
                        update.specialRoles = roles.map(function (r, j) {
                          return j === i
                            ? Object.assign({}, r, { name: e.target.value })
                            : r;
                        });
                        setBridalParty(update);
                      }}
                      style={Object.assign({}, iSt, { marginBottom: 0 })}
                    />
                  </div>
                );
              })}
              {(!bridalParty.specialRoles ||
                bridalParty.specialRoles.length === 0) && (
                <p
                  style={{
                    fontFamily: rf(theme),
                    fontSize: 13,
                    color: '#9aacb8',
                    fontStyle: 'italic',
                  }}
                >
                  No entries yet — click + Add above.
                </p>
              )}
            </div>
          </div>
        )}
        {/* DESIGN */}
        {tab === 'design' && (
          <div>
            <div
              style={{
                background: theme.dustyBlue + '10',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 22,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.dustyBlue}
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
              </svg>
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 13,
                  color: theme.dustyBlue,
                  fontWeight: 500,
                }}
              >
                Changes apply live across the entire website
              </p>
            </div>
            <Sec title="Images">
              <ImgUpload
                label="Hero background photo (fills hero section)"
                value={theme.heroBgImage}
                onChange={function (v) {
                  upT('heroBgImage', v);
                }}
                theme={theme}
              />
              <ImgUpload
                label="Footer background photo"
                value={theme.footerBgImage}
                onChange={function (v) {
                  upT('footerBgImage', v);
                }}
                theme={theme}
              />
              <ImgUpload
                label="Hero floral image (bottom of hero)"
                value={theme.heroImage}
                onChange={function (v) {
                  upT('heroImage', v);
                }}
                theme={theme}
              />
              <ImgUpload
                label="Logo / Monogram (top-left)"
                value={theme.logoImage}
                onChange={function (v) {
                  upT('logoImage', v);
                }}
                theme={theme}
              />
              <ImgUpload
                label="Couple names image (replaces text in hero)"
                value={theme.nameImage}
                onChange={function (v) {
                  upT('nameImage', v);
                }}
                theme={theme}
              />
              <Toggle
                label="Show SVG floral (when no floral image)"
                k="showFloral"
              />
              {theme.heroImage ? (
                <SliderRow
                  label="Floral image height"
                  k="floralHeight"
                  min={100}
                  max={420}
                />
              ) : null}
            </Sec>
            <Sec title="Backgrounds">
              <ColorRow label="Page background" k="pageBg" />
              <ColorRow label="Hero gradient — top" k="heroBg1" />
              <ColorRow label="Hero gradient — bottom" k="heroBg2" />
              <ColorRow label="Navigation section" k="navBg" />
              <ColorRow label="Footer background" k="footerBg" />
              <ColorRow label="Footer text colour" k="footerText" />
            </Sec>
            <Sec title="Colours">
              <ColorRow label="Dusty blue (accent)" k="dustyBlue" />
              <ColorRow label="Card background" k="cardBg" />
              <ColorRow label="Beige / input fields" k="beigeBg" />
            </Sec>
            <Sec title="Fonts">
              <FontSel
                label="Script font (names, section headings)"
                k="scriptFont"
                opts={SCRIPT_FONTS}
              />
              <FontSel
                label="Title font (dates, body headings)"
                k="titleFont"
                opts={TITLE_FONTS}
              />
              <FontSel
                label="Body font (labels, buttons, text)"
                k="bodyFont"
                opts={BODY_FONTS}
              />
            </Sec>
            <Sec title="Font Sizes">
              <SliderRow
                label="Hero name size"
                k="heroNameSize"
                min={32}
                max={110}
              />
              <SliderRow
                label="Hero date size"
                k="heroSubSize"
                min={12}
                max={38}
              />
              <SliderRow
                label="Section title size"
                k="sectionTitleSize"
                min={28}
                max={80}
              />
            </Sec>
            <Sec title="Layout">
              <Lbl>Hero text alignment</Lbl>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {['left', 'center', 'right'].map(function (a) {
                  return (
                    <button
                      key={a}
                      onClick={function () {
                        upT('heroAlign', a);
                      }}
                      style={{
                        flex: 1,
                        height: 38,
                        borderRadius: 50,
                        background:
                          theme.heroAlign === a
                            ? theme.dustyBlue
                            : theme.beigeBg,
                        border:
                          '1.5px solid ' +
                          (theme.heroAlign === a
                            ? theme.dustyBlue
                            : theme.dustyBlue + '38'),
                        color: theme.heroAlign === a ? '#fff' : theme.dustyBlue,
                        fontFamily: rf(theme),
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {a.charAt(0).toUpperCase() + a.slice(1)}
                    </button>
                  );
                })}
              </div>
            </Sec>
            <button
              onClick={function () {
                setTheme(defaultTheme);
                sv(SK + '_t', defaultTheme);
                showSavedMsg();
              }}
              style={Object.assign({}, b2St, { width: '100%', height: 46 })}
            >
              Reset to Defaults
            </button>
            {saved ? (
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 12,
                  color: '#7aaa7a',
                  textAlign: 'center',
                  marginTop: 12,
                }}
              >
                Saved ✓
              </p>
            ) : null}
          </div>
        )}

        {/* CONTENT */}
        {tab === 'content' && (
          <div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                overflowX: 'auto',
                paddingBottom: 12,
                marginBottom: 22,
              }}
            >
              {cTabs.map(function (ct) {
                return (
                  <button
                    key={ct.id}
                    onClick={function () {
                      setCTab(ct.id);
                    }}
                    style={{
                      flexShrink: 0,
                      padding: '8px 15px',
                      borderRadius: 50,
                      background:
                        cTab === ct.id ? theme.dustyBlue : theme.beigeBg,
                      border:
                        '1.5px solid ' +
                        (cTab === ct.id
                          ? theme.dustyBlue
                          : theme.dustyBlue + '38'),
                      color: cTab === ct.id ? '#fff' : theme.dustyBlue,
                      fontFamily: rf(theme),
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: cTab === ct.id ? 600 : 400,
                    }}
                  >
                    {ct.label}
                  </button>
                );
              })}
            </div>

            {cTab === 'hero' && (
              <Sec title="Hero Section">
                <Lbl>Top label</Lbl>
                <input
                  value={content.heroSuper}
                  onChange={function (e) {
                    upC('heroSuper', e.target.value);
                  }}
                  style={iSt}
                />
                <Lbl>Couple's names</Lbl>
                <input
                  value={content.coupleName}
                  onChange={function (e) {
                    upC('coupleName', e.target.value);
                  }}
                  style={iSt}
                />
                <Lbl>Wedding date</Lbl>
                <input
                  value={content.weddingDate}
                  onChange={function (e) {
                    upC('weddingDate', e.target.value);
                  }}
                  style={iSt}
                />
                <Lbl>Venue (use Enter for second line)</Lbl>
                <textarea
                  value={content.venue}
                  onChange={function (e) {
                    upC('venue', e.target.value);
                  }}
                  style={taSt}
                />
                <Lbl>Welcome message</Lbl>
                <textarea
                  value={content.welcomeMsg}
                  onChange={function (e) {
                    upC('welcomeMsg', e.target.value);
                  }}
                  style={taSt}
                />
              </Sec>
            )}

            {cTab === 'footer' && (
              <Sec title="Footer">
                <Lbl>Names</Lbl>
                <input
                  value={content.footerNames}
                  onChange={function (e) {
                    upC('footerNames', e.target.value);
                  }}
                  style={iSt}
                />
                <Lbl>Date</Lbl>
                <input
                  value={content.footerDate}
                  onChange={function (e) {
                    upC('footerDate', e.target.value);
                  }}
                  style={iSt}
                />
                <Lbl>Venue line</Lbl>
                <input
                  value={content.footerVenue}
                  onChange={function (e) {
                    upC('footerVenue', e.target.value);
                  }}
                  style={iSt}
                />
                <Lbl>Closing note</Lbl>
                <input
                  value={content.footerNote}
                  onChange={function (e) {
                    upC('footerNote', e.target.value);
                  }}
                  style={iSt}
                />
              </Sec>
            )}

            {cTab === 'timeline' && (
              <JsonListEditor
                label="Timeline Events"
                k="timelineEvents"
                fields={[
                  { k: 't', label: 'Time' },
                  { k: 'ti', label: 'Title' },
                  { k: 'd', label: 'Description', multi: true },
                ]}
              />
            )}

            {cTab === 'menu' && (
              <div>
                <Sec title="Menu">
                  <Lbl>Intro line</Lbl>
                  <input
                    value={content.menuIntro}
                    onChange={function (e) {
                      upC('menuIntro', e.target.value);
                    }}
                    style={iSt}
                  />
                </Sec>
                <JsonListEditor
                  label="Menu Sections"
                  k="menuSections"
                  fields={[{ k: 'h', label: 'Section heading' }]}
                />
              </div>
            )}

            {cTab === 'notes' && (
              <Sec title="Guest Notes">
                <Lbl>Quote</Lbl>
                <textarea
                  value={content.notesQuote}
                  onChange={function (e) {
                    upC('notesQuote', e.target.value);
                  }}
                  style={taSt}
                />
                <Lbl>Prompt text</Lbl>
                <textarea
                  value={content.notesPrompt}
                  onChange={function (e) {
                    upC('notesPrompt', e.target.value);
                  }}
                  style={taSt}
                />
              </Sec>
            )}

            {cTab === 'seating' && (
              <Sec title="Seating Plan">
                <Lbl>Intro message</Lbl>
                <textarea
                  value={content.seatingIntro}
                  onChange={function (e) {
                    upC('seatingIntro', e.target.value);
                  }}
                  style={taSt}
                />
              </Sec>
            )}

            <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
              <button
                onClick={function () {
                  sv(SK + '_c', content);
                  showSavedMsg();
                }}
                style={Object.assign({}, bSt, { flex: 2, height: 48 })}
              >
                Save Content
              </button>
              <button
                onClick={function () {
                  setContent(defaultContent);
                  sv(SK + '_c', defaultContent);
                  showSavedMsg();
                }}
                style={Object.assign({}, b2St, { flex: 1, height: 48 })}
              >
                Reset
              </button>
            </div>
            {saved ? (
              <p
                style={{
                  fontFamily: rf(theme),
                  fontSize: 12,
                  color: '#7aaa7a',
                  textAlign: 'center',
                  marginTop: 12,
                }}
              >
                Saved ✓
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── INITIAL BRIDAL PARTY ── */
const INITIAL_BRIDAL_PARTY = {
  bridesmaids: ['Kendra Simpson'],
  groomsmen: ['Alex Russell'],
  flowerGirls: ['Khalian Russell', "K'Drian Russell"],
  specialRoles: [
    { role: 'Ring Bearer', name: 'Mykal Russell' },
    { role: 'Scripture Readers', name: "Omarion Campbell  K'Fian Russell" },
    { role: 'Officiant', name: 'Bishop Vernon Morrison' },
    { role: 'Special Solo', name: 'Shanique Davis' },
  ],
};

/* ── ROOT ── */
export default function App() {
  var [page, setPage] = useState('home');
  var [drawer, setDrawer] = useState(false);
  var [guests, setGuests] = useState(function () {
    return ld(SK + '_g', defaultGuests);
  });
  var [theme, setTheme] = useState(function () {
    return ld(SK + '_t', defaultTheme);
  });
  var [content, setContent] = useState(function () {
    return ld(SK + '_c', defaultContent);
  });
  var [bridalParty, setBridalPartyState] = useState(function () {
    try {
      var s = localStorage.getItem('kd_bridal');
      return s ? JSON.parse(s) : INITIAL_BRIDAL_PARTY;
    } catch (e) {
      return INITIAL_BRIDAL_PARTY;
    }
  });

  function setBridalParty(val) {
    setBridalPartyState(val);
    try {
      localStorage.setItem('kd_bridal', JSON.stringify(val));
    } catch (e) {}
  }

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [page]
  );

  return (
    <div
      style={{
        fontFamily: rf(theme),
        background: theme.pageBg || theme.cream,
        minHeight: '100vh',
      }}
    >
      <style>
        {FONTS +
          '* { box-sizing:border-box; margin:0; padding:0; } html,body { background:' +
          theme.cream +
          '; overflow-x:hidden; } @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } } @keyframes fadeIn { from { opacity:0; } to { opacity:1; } } ::selection { background:' +
          theme.dustyBlue +
          '28; }'}
      </style>
      <Header
        onMenu={function () {
          setDrawer(true);
        }}
        transparent={page === 'home'}
        theme={theme}
      />
      <NavDrawer
        open={drawer}
        onClose={function () {
          setDrawer(false);
        }}
        setPage={setPage}
        theme={theme}
      />
      {page === 'home' && (
        <HomePage
          guests={guests}
          setPage={setPage}
          theme={theme}
          content={content}
        />
      )}
      {page === 'timeline' && <TimelinePage theme={theme} content={content} />}
      {page === 'menu' && <MenuPage theme={theme} content={content} />}
      {page === 'bridal' && (
        <BridalPage theme={theme} content={content} bridalParty={bridalParty} />
      )}
      {page === 'notes' && <NotesPage theme={theme} content={content} />}
      {page === 'seating' && (
        <SeatingPage guests={guests} theme={theme} content={content} />
      )}
      {page === 'activity' && <ActivityPage theme={theme} content={content} />}
      {page === 'admin' && (
        <AdminPage
          guests={guests}
          setGuests={setGuests}
          theme={theme}
          setTheme={setTheme}
          content={content}
          setContent={setContent}
          bridalParty={bridalParty}
          setBridalParty={setBridalParty}
        />
      )}
    </div>
  );
}
