export type EdoOperatorId = 'diadoc' | 'sbis' | 'sberkorus' | 'tochka'

export interface EdoOperator {
  id: EdoOperatorId
  /** Название в шторке выбора и второй строкой в списке контрагентов */
  name: string
  /** Вторая строка в шторке выбора: роуминг-ID или пояснение */
  description: string
}

export interface Contractor {
  id: string
  name: string
  /** Уже с разрядкой неразрывными пробелами, как в макете */
  inn: string
  initials: string
  /** Категорийный цвет аватара из токенов (--category-*) */
  color: string
  operator: EdoOperatorId | null
}

export type DocStatus = 'awaiting_signature' | 'awaiting_payment' | 'signed'

/** Индикатор в колонках «НДС» и «1С» */
export type ColumnStatus = 'ok' | 'pending' | 'error'

/**
 * На десктопе это иконка в своей колонке, в адаптиве — тег с подписью.
 * Подпись у одного и того же статуса разная («Отправлен в 1С» и
 * «Сохранён в ЭДО из 1С» — оба `ok`), поэтому лежит в данных.
 */
export interface ColumnIndicator {
  status: ColumnStatus
  label: string
}

/**
 * Почему документ выпадает из подписания.
 * `fix` — секция «К исправлению», `skip` — «Не нужно подписывать».
 */
export type BlockKind = 'fix' | 'skip'

export interface SignBlock {
  kind: BlockKind
  reason: string
}

export interface DocumentRow {
  id: string
  title: string
  /** «24 августа 2026» — для списка документов */
  date: string
  /** «24.08.26» — в шторках документ называется «Акт №47 от 24.08.26» */
  shortDate: string
  contractorId: string
  /** «128 400 ₽» либо «—», если суммы нет */
  amount: string
  /** Строка для карточки документа: «Без НДС», «20%» и т.п. */
  vat: string
  status: DocStatus
  /**
   * УПД, счета-фактуры, УКД и КСФ подписываются только КЭП.
   * Документ становится «только КЭП» и по роумингу — см. `supportsMethod`.
   */
  isKepOnlyType: boolean
  nds?: ColumnIndicator
  oneC?: ColumnIndicator
  block?: SignBlock
}

/** Способ подписания, выбранный на шаге «Как подписать» */
export type SignMethod = 'kep' | 'sms'

/** Сертификат КЭП в шторке «Подписание» */
export interface Certificate {
  id: string
  owner: string
  /** «Действует до 1 января 2027» */
  validUntil: string
}

/** Машиночитаемая доверенность в шторке «Подписание» */
export interface PowerOfAttorney {
  id: string
  number: string
  owner: string
  validUntil: string
}
