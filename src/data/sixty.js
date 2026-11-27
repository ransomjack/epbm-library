// 60-Second Management: a separate series of one-card lessons.
// Each card: three rows (label, word, line, example) and a punchline.
// Row tones: 1 = warm, 2 = accent, 3 = ink. Add new cards to the end of the list.
export const sixty = [
  {
    n: 1, slug: 'vanity-sanity-reality', topic: 'Finance',
    title: 'Vanity. Sanity. Reality.',
    sub: 'Three numbers, and which one to trust.',
    rows: [
      { label: 'Revenue', word: 'Vanity', line: "Looks big. Doesn't show if you make money.", eg: 'Company A sells ₹1 Cr, double Company B.' },
      { label: 'Profit', word: 'Sanity', line: "What's left after costs. Judge by this.", eg: 'B keeps ₹10L (20%). A keeps only ₹5L (5%).' },
      { label: 'Cash', word: 'Reality', line: 'Money actually in the bank. Pays the bills.', eg: "Profit that customers still owe you isn't cash yet." },
    ],
    punch: 'Sales impress. Profit proves. Cash keeps you alive.',
  },
  {
    n: 2, slug: 'stp', topic: 'Marketing',
    title: "Don't sell to everyone.",
    sub: 'STP: segment, target, position. In that order.',
    rows: [
      { label: 'Step 1', word: 'Segment', line: 'Split the market into groups with different needs.', eg: 'Tea drinkers: office-goers, students, the health-conscious.' },
      { label: 'Step 2', word: 'Target', line: 'Pick the slice you can serve best, and profitably.', eg: 'A chai stall outside a college goes after students.' },
      { label: 'Step 3', word: 'Position', line: 'Give them one clear reason to choose you.', eg: '"Cutting chai, ₹10, ready before your class starts."' },
    ],
    punch: "Try to please everyone and you'll be nobody's first choice.",
  },
  {
    n: 3, slug: 'motivating-potential-score', topic: 'Leadership',
    title: 'Why some jobs drain people.',
    sub: 'The Motivating Potential Score (Hackman and Oldham), on one card.',
    rows: [
      { label: 'Averaged', word: 'Meaning', line: 'Variety, doing a whole task, and knowing it matters.', eg: 'Building a full report beats typing one column all day.' },
      { label: '× Multiplied', word: 'Autonomy', line: 'Freedom to decide how to do the work.', eg: '"Here\'s the goal. You choose the method."' },
      { label: '× Multiplied', word: 'Feedback', line: "Knowing how well you're doing, from the work itself.", eg: 'An analyst who sees the attack they stopped, not just a closed ticket.' },
    ],
    punch: 'They multiply. If autonomy or feedback is zero, so is motivation.',
  },
  {
    n: 4, slug: 'bottleneck', topic: 'Operations',
    title: 'Find the bottleneck.',
    sub: 'A process is only as fast as its slowest step. Take a dosa counter:',
    rows: [
      { label: 'Taking orders', word: '60 / hr', line: 'Fast. Not the problem.', eg: 'Taking orders faster only makes the queue longer.', tone: 'muted' },
      { label: 'The tawa · bottleneck', word: '20 / hr', line: 'The whole shop serves 20 customers an hour.', eg: 'Add a second tawa and output doubles to 40.', tone: 'warm', hot: true },
      { label: 'Billing', word: '50 / hr', line: 'Speeding this up changes nothing.', eg: 'Until the tawa is fixed, billing just waits.', tone: 'muted' },
    ],
    punch: 'Fix the slowest step first. Everything else is just looking busy.',
  },
  {
    n: 5, slug: 'expected-value', topic: 'Decisions',
    title: 'Launch or play safe?',
    sub: 'Expected value puts a number on a risky choice.',
    rows: [
      { label: 'A · Launch', word: '₹18L', line: '60% chance of +₹50L, 40% chance of −₹30L.', eg: '(0.6 × 50) − (0.4 × 30) = ₹18L expected.' },
      { label: 'B · Play safe', word: '₹15L', line: 'A sure ₹15L. No risk at all.', eg: '100% × ₹15L = ₹15L expected.' },
      { label: 'The catch', word: 'Survival', line: 'A wins on average. Can you survive a ₹30L loss?', eg: 'EV gives you the average. Your risk appetite makes the call.' },
    ],
    punch: 'Expected value = each outcome × its chance, added up.',
  },
  {
    n: 6, slug: 'how-banks-create-money', topic: 'Economics',
    title: 'How banks create money.',
    sub: "Every loan becomes someone else's deposit. Simple example, 10% reserve:",
    rows: [
      { label: '1 · Deposit', word: '₹100', line: 'You put ₹100 in a bank.', eg: 'The bank keeps ₹10 aside as reserve.' },
      { label: '2 · Lend, again and again', word: '₹90 → ₹81', line: 'It lends ₹90, which lands in another bank.', eg: 'That bank keeps ₹9 and lends ₹81. And so on.' },
      { label: '3 · The system', word: '₹1,000', line: '₹100 can grow into up to ₹1,000 of deposits.', eg: 'Money multiplier = 1 ÷ reserve ratio = 1 ÷ 10% = 10.' },
    ],
    punch: "Lower the reserve ratio and banks can create more money. That's a lever the RBI pulls.",
  },
  {
    n: 7, slug: 'political-risk', topic: 'Strategy',
    title: 'Price the country first.',
    sub: 'Political risk: why a good deal can still fail at the border.',
    rows: [
      { label: 'Risk 1', word: 'Policy', line: 'A new tax, ban or licence rule, overnight.', eg: "India's 2012 retrospective tax hit Vodafone and Cairn." },
      { label: 'Risk 2', word: 'Contract', line: 'A government cancels or rewrites the deal.', eg: 'A new ruling party reviews what the last one signed.' },
      { label: 'Risk 3', word: 'Conflict', line: 'Sanctions, war or unrest cut off a market.', eg: 'Firms that left Russia in 2022 wrote off billions.' },
    ],
    punch: 'Before you price the deal, price the country.',
  },
  {
    n: 8, slug: 'digital-three-levels', topic: 'Digital',
    title: 'Three words, three levels.',
    sub: 'They sound alike. They are not the same thing.',
    rows: [
      { label: 'Level 1', word: 'Digitisation', line: 'Turn paper into data.', eg: 'Scanning paper invoices into PDFs.' },
      { label: 'Level 2', word: 'Digitalisation', line: 'Use that data to run a process better.', eg: 'Software matches each invoice and pays it on time.' },
      { label: 'Level 3', word: 'Transformation', line: 'Change how the business works and earns.', eg: 'A bank that becomes an app. No branch needed.' },
    ],
    punch: "Buying software isn't transformation. Changing how you make money is.",
  },
];
