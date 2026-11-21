import { modules, sectors, highlights, faqs, steps, about, site, contact } from './content';

// STEP 3: turn the site content into plain text the model can read.
// The model never opens files. This text is sent as the `system` field on every request,
// so editing lib/content.ts automatically updates what the assistant knows.

const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');

function modulesSection() {
  return modules
    .map((m) => {
      const extra = highlights.find((h) => h.name === m.name)?.items ?? [];
      return `${m.name}: ${m.desc}\n${list(extra)}`;
    })
    .join('\n\n');
}

function industriesSection() {
  return sectors
    .map((s) => {
      const parts = [`${s.name}: ${s.desc}`, `Modules used: ${s.mods.join(', ')}`];
      if (s.features?.length) parts.push(`What it covers:\n${list(s.features)}`);
      return parts.join('\n');
    })
    .join('\n\n');
}

export function buildSystemPrompt(): string {
  return `You are the ProsERP website assistant. ProsERP is an ERP product of ProsAfrica, developed and supported in Tanzania.
Answer visitors' questions using ONLY the facts below. If the facts do not answer the question, say you are not sure and suggest contacting the team. Keep answers short and plain.

# About
${about.story.paragraphs.join('\n')}
${site.description}

# Modules
${modulesSection()}

# Industries
${industriesSection()}

# How getting started works
${steps.map((s) => `${s.n}. ${s.name}: ${s.desc}`).join('\n')}

# Common questions
${faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

# Contact
${contact.info.map((c) => `${c.label}: ${c.value}`).join('\n')}`;
}
