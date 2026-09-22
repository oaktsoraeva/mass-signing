import type { Certificate, Contractor, DocumentRow, EdoOperator, PowerOfAttorney } from './types'

/** Неразрывный пробел — в макете им разделены разряды ИНН */
const NB = ' '
/** Неразрывный дефис — в макете им пишутся «Ромашка‑Трейд» и «Т‑Банк» */
const NH = '‑'

export const CLIENT_NAME = `Носковец${NB}О.Н., ИП`
export const CLIENT_INITIALS = 'НО'

/**
 * Сертификаты КЭП клиента. Их больше одного, поэтому в сценарии есть шаг
 * «Подписание» — при единственном сертификате и без доверенностей
 * этот шаг по макету пропускается.
 */
export const CERTIFICATES: Certificate[] = [
  { id: 'cert-2027', owner: 'Носковец Олег Николаевич', validUntil: 'Действует до 1 января 2027' },
  { id: 'cert-2026', owner: 'Носковец Олег Николаевич', validUntil: 'Действует до 30 ноября 2026' },
]

/** Машиночитаемые доверенности из фрейма «Параметры подписания» */
export const POWERS_OF_ATTORNEY: PowerOfAttorney[] = [
  {
    id: 'poa-1',
    number: '3f7ad1c9....4e6d-a5c1-9d0f2e7b',
    owner: 'Носковец Олег Николаевич',
    validUntil: 'Действует до 30 ноября 2026',
  },
  {
    id: 'poa-2',
    number: 'b204e8f1....41ab-9e5d-6c8f0a2d',
    owner: 'Носковец Олег Николаевич',
    validUntil: 'Действует до 1 января 2027',
  },
  {
    id: 'poa-3',
    number: 'e91c47a6....4f82-bc71-2a9e5f6d',
    owner: 'Носковец Олег Николаевич',
    validUntil: 'Действует до 14 августа 2027',
  },
]

export const EDO_OPERATORS: EdoOperator[] = [
  { id: 'diadoc', name: 'Диадок', description: 'ID: 2BM-9F3C...A417' },
  { id: 'sbis', name: 'СБИС', description: 'ID: 2BE-4D81...C052' },
  { id: 'sberkorus', name: 'СберКорус', description: 'ID: 2AE-7B26...E930' },
  {
    id: 'tochka',
    name: `ЭДО для${NB}клиентов Точки и${NB}Т${NH}Банка`,
    description: 'Подписание без роуминга',
  },
]

export const INITIAL_CONTRACTORS: Contractor[] = [
  {
    id: 'romashka',
    name: `Ромашка${NH}Трейд, ООО`,
    inn: `7715${NB}3420${NB}83`,
    initials: 'Р',
    color: 'var(--category-orchid)',
    operator: null,
  },
  {
    id: 'technosnab',
    name: 'ТехноСнаб, ООО',
    inn: `7804${NB}1936${NB}51`,
    initials: 'Т',
    color: 'var(--category-sand)',
    operator: null,
  },
  {
    id: 'stroyinvest',
    name: 'СтройИнвестГрупп, АО',
    inn: `5260${NB}1748${NB}33`,
    initials: 'С',
    color: 'var(--category-indigo)',
    operator: 'diadoc',
  },
  {
    id: 'smirnov',
    name: 'Смирнов Алексей Викторович, ИП',
    inn: `7724${NB}9305${NB}1818`,
    initials: 'СА',
    color: 'var(--category-emerald)',
    operator: 'sbis',
  },
  {
    id: 'logistik',
    name: 'Логистик Партнёр, ООО',
    inn: `6150${NB}8274${NB}18`,
    initials: 'Л',
    color: 'var(--category-coral)',
    operator: 'sberkorus',
  },
  {
    id: 'grandmebel',
    name: 'Гранд Мебель, ООО',
    inn: `1653${NB}0792${NB}48`,
    initials: 'Г',
    color: 'var(--category-amethyst)',
    operator: 'tochka',
  },
  {
    id: 'pechatny',
    name: 'Печатный Двор, ООО',
    inn: `6672${NB}1459${NB}07`,
    initials: 'П',
    color: 'var(--category-sand)',
    operator: 'diadoc',
  },
  {
    id: 'kovaleva',
    name: 'Ковалёва Марина Сергеевна, ИП',
    inn: `2310${NB}5782${NB}4665`,
    initials: 'КМ',
    color: 'var(--category-sky)',
    operator: 'sbis',
  },
  {
    id: 'agropostavka',
    name: 'АгроПоставка, ООО',
    inn: `3628${NB}4017${NB}54`,
    initials: 'А',
    color: 'var(--category-mint)',
    operator: 'sberkorus',
  },
  {
    id: 'uralmetkom',
    name: 'Уралметком, АО',
    inn: `7441${NB}9603${NB}28`,
    initials: 'У',
    color: 'var(--category-flamingo)',
    operator: 'diadoc',
  },
  {
    id: 'klinservis',
    name: 'Клинсервис Плюс, ООО',
    inn: `5408${NB}7361${NB}95`,
    initials: 'К',
    color: 'var(--category-lavender)',
    operator: 'tochka',
  },
  {
    id: 'medtehnika',
    name: `Медтехника${NH}Юг, ООО`,
    inn: `6319${NB}2570${NB}80`,
    initials: 'М',
    color: 'var(--category-orchid)',
    operator: 'sbis',
  },
]

export const INITIAL_DOCUMENTS: DocumentRow[] = [
  {
    id: 'akt-47',
    title: 'Акт №47',
    date: '24 августа 2026',
    shortDate: '24.08.26',
    contractorId: 'romashka',
    amount: `128${NB}400${NB}₽`,
    vat: '20%',
    status: 'awaiting_signature',
    isKepOnlyType: false,
    oneCStatus: 'pending',
  },
  {
    id: 'schet-92',
    title: 'Счёт №92',
    date: '21 августа 2026',
    shortDate: '21.08.26',
    contractorId: 'technosnab',
    amount: `1${NB}042${NB}500${NB}₽`,
    vat: '20%',
    status: 'awaiting_payment',
    isKepOnlyType: false,
    oneCStatus: 'error',
  },
  {
    id: 'dogovor-14',
    title: 'Договор №14',
    date: '20 августа 2026',
    shortDate: '20.08.26',
    contractorId: 'stroyinvest',
    amount: `3${NB}600${NB}000${NB}₽`,
    vat: 'Без НДС',
    status: 'awaiting_signature',
    isKepOnlyType: false,
    block: {
      kind: 'fix',
      reason: `Проверьте данные контрагента${NB}— не${NB}нашли его в${NB}ЕГРЮЛ`,
    },
  },
  {
    id: 'upd-63',
    title: 'УПД №63',
    date: '18 августа 2026',
    shortDate: '18.08.26',
    contractorId: 'smirnov',
    amount: `87${NB}320${NB}₽`,
    vat: '20%',
    status: 'signed',
    isKepOnlyType: true,
    ndsStatus: 'pending',
    oneCStatus: 'ok',
  },
  {
    id: 'schet-88',
    title: 'Счёт №88',
    date: '14 августа 2026',
    shortDate: '14.08.26',
    contractorId: 'logistik',
    amount: `265${NB}000${NB}₽`,
    vat: '20%',
    status: 'awaiting_signature',
    isKepOnlyType: false,
    block: {
      kind: 'skip',
      reason: `Бизнес контрагента ликвидирован${NB}— подписывать документ больше не${NB}нужно`,
    },
  },
  {
    id: 'sf-74',
    title: 'Счёт-фактура №74',
    date: '11 августа 2026',
    shortDate: '11.08.26',
    contractorId: 'grandmebel',
    amount: `54${NB}780${NB}₽`,
    vat: '20%',
    status: 'awaiting_signature',
    isKepOnlyType: true,
    oneCStatus: 'ok',
  },
  {
    id: 'upd-59',
    title: 'УПД №59',
    date: '7 августа 2026',
    shortDate: '07.08.26',
    contractorId: 'pechatny',
    amount: `912${NB}640${NB}₽`,
    vat: '20%',
    status: 'awaiting_signature',
    isKepOnlyType: true,
  },
  {
    id: 'schet-81',
    title: 'Счёт №81',
    date: '3 августа 2026',
    shortDate: '03.08.26',
    contractorId: 'kovaleva',
    amount: `47${NB}900${NB}₽`,
    vat: 'Без НДС',
    status: 'awaiting_signature',
    isKepOnlyType: false,
  },
  {
    id: 'sf-70',
    title: 'Счёт-фактура №70',
    date: '29 июля 2026',
    shortDate: '29.07.26',
    contractorId: 'agropostavka',
    amount: `1${NB}380${NB}000${NB}₽`,
    vat: '20%',
    status: 'awaiting_signature',
    isKepOnlyType: true,
  },
  {
    id: 'tn-26',
    title: 'Товарная накладная №26',
    date: '24 июля 2026',
    shortDate: '24.07.26',
    contractorId: 'uralmetkom',
    amount: `216${NB}750${NB}₽`,
    vat: '20%',
    status: 'awaiting_signature',
    isKepOnlyType: false,
    oneCStatus: 'pending',
  },
  {
    id: 'ds-4',
    title: 'Допсоглашение №4',
    date: '17 июля 2026',
    shortDate: '17.07.26',
    contractorId: 'klinservis',
    amount: '—',
    vat: 'Без НДС',
    status: 'awaiting_signature',
    isKepOnlyType: false,
  },
  {
    id: 'as-9',
    title: 'Акт сверки №9',
    date: '10 июля 2026',
    shortDate: '10.07.26',
    contractorId: 'medtehnika',
    amount: `5${NB}231${NB}870${NB}₽`,
    vat: 'Без НДС',
    status: 'awaiting_signature',
    isKepOnlyType: false,
  },
]
