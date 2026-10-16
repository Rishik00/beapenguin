// Everything on the site that isn't an experiment write-up lives here.
// Lines marked TODO are placeholders.

export const profile = {
  name: 'Rishikesh Mallagundla',
  handle: 'notapenguin',
  role: 'ML researcher',
  email: 'mrishikesh104@gmail.com',
  location: 'India', // TODO
};

export const nav = [
  { href: '/experiments', label: 'Experiments' },
  { href: '/random', label: 'Random' },
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
];

// Home page. Placeholder bio.
export const intro = {
  role: 'Researcher',
  org: { name: 'Mercity', href: 'https://www.mercity.ai' },
  // Experiment shown in the card under the portrait.
  featured: 'whisper-noise-hallucination',
  bio: 'I work on interpretability, model architectures, and reproducing papers from their text. I write up every experiment here, including the ones that failed.',
};

export type Role = {
  org: string;
  title: string;
  period: string;
  blurb: string;
  href?: string;
};

export const roles: Role[] = [
  {
    org: 'Elemental Research Group',
    title: 'Researcher',
    period: '2026 — Now',
    blurb: 'Placeholder: one line on what you work on here.', // TODO
  },
  {
    org: 'Mercity AI',
    title: 'ML Researcher',
    period: '2025 — Now', // TODO
    blurb:
      'Pretraining and evaluating ~1B models from scratch, SAE-based guardrails, soft-prompt alignment, speculative decoding.',
    href: 'https://www.mercity.ai/research',
  },
  {
    org: 'Pragya Lab, BITS Goa',
    title: 'Research collaborator',
    period: '2025', // TODO
    blurb: 'Second-order optimization (SahaBose-KFAC) and residual-stream geometry.',
  },
  {
    org: 'Centre for AI and Robotics, DRDO',
    title: 'Research intern',
    period: '2024', // TODO
    blurb: 'Benchmarked tokenizers across Urdu, Chinese and Hindi.',
    href: 'https://github.com/Rishik00/Tokenizer-Study',
  },
];

export type Paper = {
  title: string;
  // Your own name is bolded wherever it appears in this list.
  authors: string[];
  venue: string;
  year: string;
  href?: string;
  code?: string;
};

export const papers: Paper[] = [
  {
    title: 'One Lens, Many Worlds: A Capability-Typed Interface for World-Model Interpretability',
    authors: [
      'B. C. Challagundla',
      'S. Pandey',
      'P. Thakkar',
      'R. Mallagundla',
      'Y. R. Gogireddy',
      'W. Lu',
      'H. R. Choudhury',
      'S. Challagundla',
      'M. Nasr',
      'S. Deshpande',
    ],
    venue: 'arXiv preprint',
    year: '2026',
    href: 'https://arxiv.org/abs/2606.09936',
  },
  {
    title: 'TreeFormer: An Ensemble Framework Integrating Language and Tabular Features for Phishing URL Classification',
    authors: ['R. Mallagundla', 'A. Simhadri', 'S. Muthusamy'],
    venue: 'SSRN preprint',
    year: '2025',
    href: 'https://doi.org/10.2139/ssrn.5523772',
    code: 'https://github.com/Rishik00/PIMP',
  },
  {
    title: 'Enhancing Accuracy in Hourly Passenger Flow Forecasting for Urban Transit Using TBATS Boosting',
    authors: ['M. Patel', 'S. B. Patel', 'D. Swain', 'R. Mallagundla'],
    venue: 'Modelling',
    year: '2025',
    href: 'https://doi.org/10.3390/modelling6020032',
  },
  {
    title: 'SahaBose-KFAC', // TODO: full title and authors once it is on arXiv
    authors: ['R. Mallagundla', 'et al.'],
    venue: 'In preparation',
    year: '2026',
  },
];

// Research posts published elsewhere. They appear in the Experiments list
// (linking out) and under Work → Writing.
export const externalPosts = [
  {
    title: 'Online Topic Guardrails with Sparse Autoencoders: A Research Log',
    summary:
      'Small probes on SAE features catch Gemma 3 drifting off topic while it writes. Raw hidden states do as well; the SAE buys a smaller detector whose inputs have names.',
    date: '2026-10-14',
    where: 'Mercity',
    href: 'https://www.mercity.ai/research/online-topic-guardrails-with-saes',
  },
  {
    title: 'Pretraining Dense Models: A Research Log',
    summary:
      'Four dense 1B checkpoints on 6B FineWeb tokens to test Kimi Delta Attention and LongCat n-gram embeddings, then grafting, pruning, 4-bit quantization and NER fine-tuning.',
    date: '2026-09-28',
    where: 'Mercity',
    href: 'https://www.mercity.ai/research/pretraining-dense-models',
  },
  {
    title: 'Classifying Figure Skating Elements from Pose Estimation',
    summary:
      'Five architectures, one ceiling: jumps that differ only by blade edge are invisible to COCO-17 keypoints. Which class you predict matters about three times more than which model.',
    date: '2026-07-27',
    where: 'Mercity',
    href: 'https://www.mercity.ai/blog-post/classifying-figure-skating-elements-from-pose-estimation',
  },
  {
    title: 'Building LLM Guardrails with SAEs',
    summary:
      'Can sparse autoencoder features replace a dedicated topic classifier in a guardrail stack, reading the topic from the model’s activations instead of its output?',
    date: '2026-07-07',
    where: 'Mercity',
    href: 'https://www.mercity.ai/research/building-llm-guardrails-with-saes',
  },
];

export const writing = [
  ...externalPosts.map((p) => ({ title: p.title, where: `${p.where} Research`, href: p.href })),
  {
    title: 'So, about Base64',
    where: 'Substack',
    href: 'https://apenguins2cents.substack.com/p/so-about-base64',
  },
];

export const openSource = [
  {
    name: 'TransformerLens',
    what: '3 merged PRs: Qwen2 and OLMo adapter tests, Pythia adapter removal.',
    href: 'https://github.com/TransformerLensOrg/TransformerLens/pulls?q=author%3ARishik00',
  },
  {
    name: 'WorldModelLens',
    what: 'Core contributor. Codebase cleanup and I-JEPA probing.',
    href: 'https://github.com/Rishik00', // TODO: repo URL
  },
];

export type Project = {
  name: string;
  kind: 'Product' | 'Library' | 'Tool';
  blurb: string;
  stack: string[];
  href?: string;
  live?: string;
  // Screenshot in public/, e.g. '/projects/readxiv.png'. Products show a placeholder until set.
  image?: string;
};

export const projects: Project[] = [
  {
    name: 'ReadXiv',
    kind: 'Product',
    blurb: 'A fast reader for arXiv papers. Collect, annotate, and publish reading notes to Paper Trails.',
    stack: ['TypeScript', 'React'], // TODO
    href: 'https://github.com/Rishik00/ReadXiv',
    live: 'https://readxiv-page.vercel.app/',
  },
  {
    name: 'Tron',
    kind: 'Product',
    blurb: 'A keyboard-first layer for managing Chromium tabs.',
    stack: ['TypeScript', 'Chrome APIs'], // TODO
  },
  {
    name: 'Folio',
    kind: 'Product',
    blurb: 'A research folio backed by R2, with stable public links to PDFs.',
    stack: ['Cloudflare Workers', 'R2'],
    href: 'https://github.com/Rishik00/why-cloud',
  },
  {
    name: 'nanoCTM',
    kind: 'Library',
    blurb: 'nanoGPT, but the model is allowed to think. A minimal Continuous Thought Machine.',
    stack: ['PyTorch'],
    href: 'https://github.com/Rishik00/nanoctm',
  },
  {
    name: 'specdec',
    kind: 'Library',
    blurb: 'A small speculative decoding library.',
    stack: ['PyTorch'],
    href: 'https://github.com/Rishik00/specdec',
  },
  {
    name: 'voila',
    kind: 'Library',
    blurb: 'A simple SymPy transpiler.',
    stack: ['Python', 'SymPy'],
    href: 'https://github.com/Rishik00/voila',
  },
  {
    name: 'forscher',
    kind: 'Tool',
    blurb: 'A harness for exploring codebases.',
    stack: ['Python'], // TODO
    href: 'https://github.com/Rishik00/forscher',
  },
  {
    name: 'quietter',
    kind: 'Tool',
    blurb: 'An X-like feed for private diary logs.',
    stack: ['TypeScript'], // TODO
    href: 'https://github.com/Rishik00/quietter',
  },
  {
    name: 'skillx',
    kind: 'Tool',
    blurb: 'Manage and share agent skills.', // TODO
    stack: ['TypeScript'], // TODO
    href: 'https://github.com/Rishik00/skillx',
  },
  {
    name: 'idea-go',
    kind: 'Tool',
    blurb: 'A tiny idea log that syncs with Notion.',
    stack: ['Go'],
    href: 'https://github.com/Rishik00/idea-go',
  },
];

export const archive = [
  { name: 'TreeFormer', year: '2025', blurb: 'Tree + transformer ensemble for phishing URLs', href: 'https://github.com/Rishik00/PIMP' },
  { name: 'Tokenizer Study', year: '2024', blurb: 'Tokenizers across language families', href: 'https://github.com/Rishik00/Tokenizer-Study' },
  { name: 'NER Annotate', year: '2024', blurb: 'Span-based NER annotation, after Naamapadam', href: 'https://github.com/Rishik00/NERAnnotate' },
  { name: 'CrossOCR', year: '2024', blurb: 'Lightweight multilingual OCR', href: 'https://github.com/Rishik00/CrossOCR' },
  { name: 'Saradhi AI', year: '2024', blurb: 'Real-time sign language detection, Intel AI hackathon', href: 'https://github.com/Rishik00/Tekken' },
  { name: 'AttendEase', year: '2023', blurb: 'Template-matching attendance on an ESP32-CAM', href: 'https://github.com/Rishik00/AAttendEase' },
];

export type Build = {
  title: string;
  kind: 'Build' | 'Kernels' | 'Notes' | 'Post' | 'Solutions';
  blurb: string;
  href?: string;
  year: string;
};

// Small builds, kernels and solutions, shown at the bottom of Projects.
export const builds: Build[] = [
  { title: 'A ray tracer, from scratch', kind: 'Build', blurb: 'Spheres, materials, depth of field. 48 renders and counting.', year: '2026' }, // TODO: link
  { title: 'TritonLab', kind: 'Kernels', blurb: 'A playground for Triton kernels.', href: 'https://github.com/Rishik00/TritonLab', year: '2025' },
  { title: 'cuPatcher', kind: 'Kernels', blurb: 'A basic CUDA/Triton kernel dispatcher over pybind11.', href: 'https://github.com/Rishik00/cuPatcher', year: '2025' },
  { title: 'JaxLab', kind: 'Notes', blurb: 'Models and maths, written in JAX.', href: 'https://github.com/Rishik00/JaxLab', year: '2025' },
  { title: 'Base64 with AVX2', kind: 'Build', blurb: 'Vectorised Base64, following Muła and Lemire.', href: 'https://github.com/A-Penguins-Lab/avx-b64-re', year: '2025' },
  { title: 'So, about Base64', kind: 'Post', blurb: 'And how computers share strings.', href: 'https://apenguins2cents.substack.com/p/so-about-base64', year: '2025' },
  { title: 'ARENA', kind: 'Solutions', blurb: 'Worked solutions to the ARENA interpretability curriculum.', href: 'https://github.com/Rishik00/my-ARENA-solns', year: '2025' },
  { title: 'TensorTonic', kind: 'Solutions', blurb: 'Solutions to TensorTonic problems.', href: 'https://github.com/Rishik00/TensorTonic-Solutions', year: '2026' },
  { title: 'Paper Trails', kind: 'Notes', blurb: 'Reading notes, published straight from ReadXiv.', href: 'https://github.com/Rishik00/notes-site', year: '2026' }, // TODO: live URL
];

// Shown on the home page under the bio.
export const links = [
  { label: 'Email', value: 'mrishikesh104@gmail.com', href: 'mailto:mrishikesh104@gmail.com' },
  { label: 'GitHub', value: 'Rishik00', href: 'https://github.com/Rishik00' },
  { label: 'Scholar', value: 'Google Scholar', href: 'https://scholar.google.com/citations?user=jW4OgYwAAAAJ&hl=en' },
  { label: 'X', value: '@_notapenguin', href: 'https://x.com/_notapenguin' },
  { label: 'LinkedIn', value: 'rishikesh-mallagundla', href: 'https://linkedin.com/in/rishikesh-mallagundla' },
  // Hidden for now: Lab (github.com/A-Penguins-Lab), Hugging Face, Substack, CV.
];
