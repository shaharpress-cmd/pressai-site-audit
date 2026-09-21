export type IndustrySample = {
  id: string
  label: string
  /** Example overall score /10 */
  overall: number
  scores: { label: string; value: number; color: string }[]
  blurb: string
  losses: string[]
}

export const industries: IndustrySample[] = [
  {
    id: 'law',
    label: 'משרד עו״ד',
    overall: 4.3,
    scores: [
      { label: 'SEO / גוגל', value: 3.9, color: 'bg-rose-400' },
      { label: 'UX / המרה', value: 4.8, color: 'bg-amber-400' },
      { label: 'מהירות', value: 4.1, color: 'bg-orange-400' },
      { label: 'אמון / בהירות', value: 5.2, color: 'bg-teal' },
    ],
    blurb: 'בדוגמה למשרד עו״ד: נראות חלשה על חיפושי שירות מקומיים, וחיכוך בטופס יצירת קשר במובייל.',
    losses: ['דפי שירות בלי כוונת חיפוש ברורה', 'CTA משפטי לא חד', 'אמון חלש מול מתחרים בדף הבית'],
  },
  {
    id: 'clinic',
    label: 'קליניקה',
    overall: 4.6,
    scores: [
      { label: 'SEO / גוגל', value: 4.4, color: 'bg-amber-400' },
      { label: 'UX / המרה', value: 4.2, color: 'bg-rose-400' },
      { label: 'מהירות', value: 5.0, color: 'bg-teal' },
      { label: 'אמון / בהירות', value: 4.9, color: 'bg-orange-400' },
    ],
    blurb: 'בדוגמה לקליניקה: המבקרים מגיעים — אבל נוטשים לפני קביעת תור בגלל בהירות ומסלול הזמנה.',
    losses: ['מסלול «קביעת תור» ארוך מדי', 'הוכחות אמון חלשות', 'מובייל לא מותאם לשיחה מיידית'],
  },
  {
    id: 'realestate',
    label: 'סוכנות נדל״ן',
    overall: 4.1,
    scores: [
      { label: 'SEO / גוגל', value: 3.6, color: 'bg-rose-400' },
      { label: 'UX / המרה', value: 4.5, color: 'bg-amber-400' },
      { label: 'מהירות', value: 3.8, color: 'bg-rose-400' },
      { label: 'אמון / בהירות', value: 5.1, color: 'bg-teal' },
    ],
    blurb: 'בדוגמה לנדל״ן: נכסים יפים — אבל גוגל והמתחרים תופסים את החיפושים האזוריים.',
    losses: ['דפי אזור/עיר חלשים', 'טעינה כבדה בגלל גלריות', 'ליד־פורם לא בולט במובייל'],
  },
  {
    id: 'services',
    label: 'חברת שירותים',
    overall: 4.8,
    scores: [
      { label: 'SEO / גוגל', value: 4.5, color: 'bg-amber-400' },
      { label: 'UX / המרה', value: 5.0, color: 'bg-teal' },
      { label: 'מהירות', value: 4.7, color: 'bg-amber-400' },
      { label: 'אמון / בהירות', value: 5.3, color: 'bg-teal' },
    ],
    blurb: 'בדוגמה לחברת שירותים: בסיס סביר — הפער מול מתחרים הוא בעיקר בהירות הצעה והמרה.',
    losses: ['מסר שירות מפוזר', 'השוואה למתחרים חסרה', 'CTA משני מדי'],
  },
  {
    id: 'medical',
    label: 'מרפאה',
    overall: 4.4,
    scores: [
      { label: 'SEO / גוגל', value: 4.0, color: 'bg-rose-400' },
      { label: 'UX / המרה', value: 4.6, color: 'bg-amber-400' },
      { label: 'מהירות', value: 4.3, color: 'bg-amber-400' },
      { label: 'אמון / בהירות', value: 5.4, color: 'bg-teal' },
    ],
    blurb: 'בדוגמה למרפאה: אמון בסיסי קיים — אבל חיפושי טיפול מקומיים והזמנה במובייל דורשים חיזוק.',
    losses: ['דפי טיפול דקים ל־SEO', 'מספר טלפון לא תמיד נגיש', 'חוסר בהירות על תהליך הקבלה'],
  },
]
