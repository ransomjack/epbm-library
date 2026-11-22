// Subjects in the order they appear on the programme portal.
// A subject becomes a link once it has at least one chapter in src/books/<slug>/.
export const subjects = [
  {
    slug: 'global-political-economy',
    name: 'Global Political Economy',
    blurb: 'Stakeholders and trust, PEST and FDI, geopolitics.',
    pdf: '/pdf/global-political-economy-master-notes.pdf',
    planned: ['Session 2: PEST and FDI', 'Session 3: Geopolitics', 'Quick reference and exam traps', '96 practice MCQs'],
  },
  { slug: 'marketing-management', name: 'Marketing Management' },
  { slug: 'business-decision-making', name: 'Business Decision Making' },
  { slug: 'macroeconomic-policies', name: 'Market Economies & Macroeconomic Policies' },
  { slug: 'financial-reporting-cost-accounting', name: 'Financial Reporting & Cost Accounting' },
  { slug: 'leadership-people-skills', name: 'Leadership and People Skills' },
  { slug: 'operational-excellence', name: 'Operational Excellence' },
  { slug: 'digital-transformation', name: 'Digital Transformation' },
  { slug: 'ai-ml-business-analytics', name: 'AI/ML and Business Analytics' },
];
