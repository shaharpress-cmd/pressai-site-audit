export type Lead = {
  id: string
  url: string
  businessName: string
  contactName: string
  phone: string
  email: string
  consent: boolean
  createdAt: string
}

const STORAGE_KEY = 'pressai_leads'

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const full: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const existing = getLeads()
  existing.push(full)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  return full
}

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
