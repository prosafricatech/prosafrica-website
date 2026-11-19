export const modules = [
  { n: '01', name: 'Accounting', desc: 'Ledgers, payments and reports that follow every transaction back to its source.' },
  { n: '02', name: 'Procurement', desc: 'Requisitions, purchase orders and supplier records with clear approval trails.' },
  { n: '03', name: 'Inventory', desc: 'Track stock across stores and sites, with receipts and issues tied to projects.' },
  { n: '04', name: 'HR & Payroll', desc: 'Employee records, leave, loan management and payroll in one place, from hiring to monthly pay.' },
  { n: '05', name: 'POS', desc: 'Sell at the counter and keep every sale connected to your stock and accounts.' },
  { n: '06', name: 'Fuel Station', desc: 'Run pump sales, fuel stock and daily station operations alongside the rest of your business.' },
  { n: '07', name: 'Projects', desc: 'Plan work, assign teams and see cost against progress as the job moves.' },
  { n: '08', name: 'Bio Farming', desc: 'Run fish and poultry farms: stock, feed and costs tracked in the same records your finance team uses.' },
];

export const sectors = [
  { tag: 'SECTOR 01', name: 'Manufacturing', sub: 'Plants, stores and production costs under one roof.', img: '/images/silos.jpg', desc: 'Keep raw materials, finished stock, wages and purchasing connected, so production cost is clear at month end.', mods: ['Accounting', 'Procurement', 'Inventory', 'HR & Payroll'], features: ['Combine raw materials and production costs', 'Calculate accurate cost per unit of finished goods', 'Track work in progress and production runs', 'Move finished goods into inventory automatically', 'Analyze production efficiency and profitability'] },
  { tag: 'SECTOR 02', name: 'Fuel & Energy', sub: 'Stock, suppliers and site operations kept accountable.', img: '/images/fuel.jpg', desc: 'Track stock, suppliers and site activity with approvals and records that stand up to review.', mods: ['Accounting', 'Procurement', 'Inventory', 'Fuel Station'], features: ['Record sales for every shift', 'Track fuel stock per tank and nozzle', 'Monitor dipping and variance', 'Manage fuel deliveries and procurement', 'Connect fuel operations to accounting and inventory'] },
  { tag: 'SECTOR 03', name: 'Construction', sub: 'Materials, resources and project costs in step.', img: '/images/construction.jpg', desc: 'Tie materials, labour and spending to each project so you can track costs against progress while work is ongoing.', mods: ['Accounting', 'Procurement', 'Projects', 'HR & Payroll'], features: ['Define deliverables and milestones', 'Build and manage work breakdown structures', 'Manage subcontractors and site activities', 'Control material consumption during execution', 'Prepare payment claims and certificates', 'Manage budgets and cost overruns'] },
  { tag: 'SECTOR 04', name: 'Property Management', sub: 'Properties, staff and spending in one place.', img: '/images/property.jpg', desc: 'Track maintenance purchases, staff and running costs across your properties with clear records and approvals.', mods: ['Accounting', 'Procurement', 'HR & Payroll'] },
  { tag: 'SECTOR 05', name: 'Distribution', sub: 'Stock moving between stores, always accounted for.', img: '/images/distribution.jpg', desc: 'Follow stock from supplier to store to customer, with purchasing and accounts tied to every movement.', mods: ['Accounting', 'Procurement', 'Inventory'], features: ['Manage sales, purchases and expenses', 'Track inventory across branches', 'Handle customers, suppliers and pricing', 'Operate multiple outlets under one system'] },
  { tag: 'SECTOR 06', name: 'Wholesale', sub: 'Bulk buying and selling with clean records.', img: '/images/wholesale.jpg', desc: 'Manage bulk purchases, stock levels and counter sales, with every sale connected to your stock and accounts.', mods: ['Accounting', 'Inventory', 'POS'], features: ['Manage sales, purchases and expenses', 'Track inventory across branches', 'Handle customers, suppliers and pricing', 'Get P&L, balance sheet and cash flow reports'] },
];

export const points = [
  'Designed around real operational workflows',
  'Industry-ready ERP, not generic software',
  'Finance and operations fully integrated',
  'Scalable, simple to use, and powerful where it matters',
];

export const values = [
  { n: '01', name: 'Built for how you work', desc: 'We design around real approvals, stores and payrolls, not generic templates.' },
  { n: '02', name: 'One source of truth', desc: 'Every department reads and writes the same records, so figures agree.' },
  { n: '03', name: 'Support you can reach', desc: 'Local people who understand your business answer when you need help.' },
];

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/industries', label: 'Industries' },
  { href: '/contact', label: 'Contact' },
];

export const highlights = [
  { name: 'Accounting', image: '/images/modules/accounting.jpg', items: ['Ledgers and payments', 'Reports traced to source entries', 'Shared data with every other module'] },
  { name: 'Procurement', image: '/images/modules/procurement.jpg', items: ['Purchase requisitions and orders', 'Supplier records', 'Approval trail on every request'] },
  { name: 'Inventory', image: '/images/modules/inventory.jpg', items: ['Stock across stores and sites', 'Receipts and issues', 'Stock linked to projects'] },
  { name: 'HR & Payroll', image: '/images/modules/hr-meeting.jpg', items: ['Employee profiles and designations', 'Leave records per employee', 'Loan management for staff', 'Payroll from the same staff records'] },
  { name: 'POS', image: '/images/modules/pos-cashier.jpg', items: ['Sales counters for daily selling', 'Sales reports by product', 'Sales per salesperson'] },
  { name: 'Fuel Station', image: '/images/modules/fuel-station-sky.jpg', items: ['Pump sales and fuel stock', 'Tank dipping records and reports', 'Station activity tied to your accounts'] },
  { name: 'Projects', image: '/images/modules/projects-meeting.jpg', items: ['Deliverables and work breakdown', 'Budgets, subcontracts and claims', 'Progress updates and project stores'] },
  { name: 'Bio Farming', image: '/images/modules/bio-farming-sea.jpg', items: ['Fish and poultry stock and feed records', 'Purchases and costs per farm', 'Figures shared with finance'] },
];

export const steps = [
  { n: '1', name: 'Tell us about your operation', desc: 'Share what you run today and where the friction is.' },
  { n: '2', name: 'See ProsERP in action', desc: 'We walk your team through the modules that match your work.' },
  { n: '3', name: 'Choose your modules', desc: 'Start with what you need now and add more as you grow.' },
];

export const faqs = [
  { q: 'Can we start with just one module?', a: 'Yes. Start with one and add others later. All modules share the same data.' },
  { q: 'Which industries is ProsERP built for?', a: 'Manufacturing, fuel and energy, construction, property management, distribution and wholesale. See the Industries page for detail.' },
  { q: 'Who builds and supports ProsERP?', a: 'ProsERP is a product of ProsAfrica, developed and supported in Tanzania.' },
  { q: 'How much does it cost?', a: 'Pricing depends on your business and the modules you need. Contact our team and we will prepare a quote for you.' },
  { q: 'How do I see a demo?', a: 'Use the Contact page to request one and tell us what you would like to see.' },
];

export const clients = [
  { name: 'Black Mountain', src: '/logos/black-mountain.png', w: 410, h: 203 },
  { name: 'Brecol', src: '/logos/brecol.png', w: 321, h: 240 },
  { name: 'BuildSol', src: '/logos/buildsol.png', w: 283, h: 240 },
  { name: 'Victoria Service Station', src: '/logos/victoria-service-station.png', w: 184, h: 71 },
  { name: "Farmer's Basket", src: '/logos/farmers-basket.png', w: 189, h: 240 },
  { name: 'doyy Beauty', src: '/logos/doyy-beauty.png', w: 406, h: 240 },
  { name: 'Transpower', src: '/logos/transpower.png', w: 480, h: 57 },
  { name: 'White City International', src: '/logos/white-city-international.png', w: 231, h: 240 },
  { name: 'Dubai Energies', src: '/logos/dubai-energies.png', w: 480, h: 210 },
  { name: 'The Big Best', src: '/logos/the-big-best.png', w: 358, h: 240 },
  { name: 'GP Petrol Stations', src: '/logos/gp-petrol-stations.png', w: 480, h: 219 },
  { name: 'RES Company Ltd', src: '/logos/res-company.png', w: 386, h: 240 },
  { name: 'Shalakh Trading Company Ltd', src: '/logos/shalakh-trading.png', w: 480, h: 141 },
  { name: 'Namis Corporate Ltd', src: '/logos/namis-corporate.png', w: 480, h: 185 },
];

export const site = {
  title: 'ProsERP',
  url: 'https://proserp.co.tz',
  description: 'One system for accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming.',
  ctaLabel: 'Request a demo',
};

export const footer = {
  blurb: 'One platform for accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming.',
  companyLinks: [
    { href: '/about', label: 'About' },
    { href: '/industries', label: 'Industries' },
    { href: '/contact', label: 'Contact' },
  ],
  moduleNames: ['Accounting', 'Procurement', 'Inventory', 'HR & Payroll', 'POS', 'Fuel Station', 'Projects', 'Bio Farming'],
  contact: ['info@prosafrica.com', '+255 746 917 817', 'Dar es Salaam, Tanzania'],
  copyright: '© ProsERP. All rights reserved.',
};

export const home = {
  meta: {
    title: 'ProsERP | ERP for accounting, inventory & HR in Tanzania',
    description:
      'ProsERP by ProsAfrica brings accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming into one connected system for businesses in Tanzania.',
  },
  hero: {
    badge: 'ENTERPRISE RESOURCE PLANNING',
    title: 'One system to run every part of your business.',
    lead: 'ProsERP brings accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming into one platform, so your teams work from the same numbers.',
    primaryCta: 'Request a demo',
    secondaryCta: 'See industries',
    image: { src: '/images/dashboard.webp', alt: 'ProsERP dashboard showing profit and loss and balance sheet trends' },
  },
  clientsTitle: 'Trusted by a variety of businesses',
  modulesHeading: {
    eyebrow: 'The platform',
    title: 'Everything your operation needs, in eight modules.',
    text: 'Start with one, add the rest as you grow. Every module shares the same data.',
  },
  devices: {
    title: 'Choose where you work from.',
    text: 'ProsERP works on your laptop and on your phone. One system and one set of data, on every screen.',
    laptop: { name: 'Laptop and desktop', desc: 'The full system on a bigger screen, for the work you do at your desk.' },
    phone: { name: 'Mobile phone', desc: 'The same system in your pocket, so work does not wait until you are back at the office.' },
    laptopAlt: 'ProsERP dashboard on a laptop',
    phoneAlt: 'ProsERP dashboard on a mobile phone',
  },
  industriesHeading: { eyebrow: 'Industries', title: 'Built for heavy, high-volume work.' },
  industriesLink: 'Explore all industries →',
  workingTogether: {
    eyebrow: 'Working together',
    title: 'Your team, finance and field on the same page.',
    text: 'When purchasing, stores, payroll and accounts share one record, approvals move faster and nobody re-types the same data twice.',
    image: { src: '/images/team.jpg', alt: 'A team working together' },
  },
  stepsHeading: { eyebrow: 'Getting started', title: 'From first call to first module.' },
  faqHeading: { eyebrow: 'FAQ', title: 'Common questions.' },
  cta: {
    title: 'See ProsERP running on your own workflow.',
    text: 'Book a walkthrough and tell us what you run today. We will show you where ProsERP fits.',
  },
};

export const about = {
  meta: {
    title: 'About ProsAfrica',
    description:
      'ProsAfrica provides business management technology that connects finances, people, resources and daily operations through ProsERP, one integrated ERP platform.',
  },
  hero: {
    eyebrow: 'About ProsAfrica',
    title: 'Business operations, made simpler.',
    lead: 'We believe businesses perform better when their operations work together.',
  },
  topImage: { src: '/images/team.jpg', alt: 'The team at work' },
  story: {
    eyebrow: 'Who we are',
    title: 'One connected platform for how you run.',
    paragraphs: [
      'ProsAfrica provides business management technology designed to help organisations manage their finances, people, resources and daily operations through one connected platform.',
      'Through ProsERP, we bring essential business functions together, giving organisations better visibility, control and the information they need to make informed decisions.',
    ],
  },
  whatWeDo: {
    eyebrow: 'What we do',
    title: 'One ERP. Every part of the operation.',
    text: 'We provide an integrated Enterprise Resource Planning (ERP) solution that connects key business operations, including:',
    items: [
      'Financial Management',
      'Procurement',
      'Inventory Management',
      'Project Management',
      'Manufacturing',
      'Fuel Management',
      'Human Resources',
      'Asset Register',
    ],
    closing: 'Our solution is designed to support businesses across different industries, adapting to their operational needs as they grow.',
  },
  approach: {
    eyebrow: 'Our approach',
    title: 'We understand that every business operates differently.',
    text: 'That is why we focus on providing flexible solutions that fit the way organisations work. From system setup and configuration to training and ongoing support, we work with businesses to make technology practical and useful.',
    steps: [
      { n: '1', name: 'Setup and configuration', desc: 'ProsERP is set up around how your business actually works.' },
      { n: '2', name: 'Training', desc: 'Your people learn the system so they can use it with confidence.' },
      { n: '3', name: 'Ongoing support', desc: 'Help stays available as your business and your needs grow.' },
    ],
  },
  whyHeading: { eyebrow: 'Why ProsAfrica?', title: 'What you can expect from us.' },
  why: [
    { n: '1', name: 'Connected Operations', desc: 'Bring essential business functions into one system.' },
    { n: '2', name: 'Better Visibility', desc: 'Access business information and reports in one place.' },
    { n: '3', name: 'Flexible Solutions', desc: 'Support different business structures and operational needs.' },
    { n: '4', name: 'Practical Support', desc: 'Get assistance with implementation, training and system use.' },
  ],
  whereWeWork: {
    eyebrow: 'Where we work',
    title: 'From the boardroom to the site office.',
    text: 'Leaders get the full picture on a dashboard. Teams in stores, yards and plants get simple screens for their daily tasks.',
    image: { src: '/images/boardroom.jpg', alt: 'Boardroom with the ProsERP dashboard' },
  },
  cta: {
    title: "Let's move your business forward.",
    text: 'Discover how ProsERP can bring your business operations together.',
    button: 'Request a Demo',
  },
};

export const industries = {
  meta: {
    title: 'ERP for manufacturing, fuel, construction and more',
    description:
      'See how ProsERP supports manufacturing, fuel and energy, construction, property management, distribution and wholesale businesses, and which modules fit each one.',
  },
  hero: {
    eyebrow: 'Industries',
    title: 'Sectors we support.',
    lead: 'ProsERP fits businesses that move materials, manage labour and answer for every shilling spent.',
  },
  cta: { title: 'Not sure where you fit? Ask us.' },
};

export const contactForm = {
  fields: [
    { label: 'Full name', id: 'name', placeholder: 'Your name' },
    { label: 'Company', id: 'company', placeholder: 'Company name' },
    { label: 'Email', id: 'email', type: 'email', placeholder: 'you@company.com' },
    { label: 'Phone', id: 'phone', type: 'tel', placeholder: '+255' },
  ],
  industryOptions: [...sectors.map((s) => s.name), 'Other'],
  messagePlaceholder: 'Tell us what you would like to improve',
  submitLabel: 'Send message',
};

export const contact = {
  meta: {
    title: 'Contact us and request a demo',
    description:
      'Talk to the ProsAfrica team in Dar es Salaam, Tanzania. Request a ProsERP demo, ask about pricing, or find out which modules fit your business.',
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Let us talk.',
    lead: 'Tell us about your business and we will arrange a walkthrough of ProsERP.',
  },
  image: { src: '/images/team.jpg', alt: 'Our team ready to help' },
  info: [
    { label: 'Email', value: 'info@prosafrica.com' },
    { label: 'Support', value: 'support@prosafrica.co.tz' },
    { label: 'Phone', value: '+255 746 917 817' },
    { label: 'Office', value: 'Dar es Salaam, Tanzania' },
  ],
};
