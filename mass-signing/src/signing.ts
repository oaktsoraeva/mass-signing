import type { Contractor, DocumentRow, SignBlock, SignMethod } from './types'

/**
 * Подписывать можно только то, что ждёт подписи. «Подписано» и «Ожидает
 * оплаты» значат, что подпись уже поставлена, — такой документ уходит
 * в «Не нужно подписывать», а если выбран только он, список даёт ошибку.
 */
const ALREADY_SIGNED: SignBlock = { kind: 'skip', reason: 'Документ уже подписан' }

/** Причина, по которой документ выпадает из подписания, либо undefined */
export function blockOf(doc: DocumentRow): SignBlock | undefined {
  if (doc.block) return doc.block
  if (doc.status !== 'awaiting_signature') return ALREADY_SIGNED
  return undefined
}

export function isSignable(doc: DocumentRow) {
  return blockOf(doc) === undefined
}

/**
 * Можно ли подписать документ выбранным способом.
 * НЭП не подходит для УПД, счетов-фактур, УКД и КСФ, а также для документов,
 * которые уходят в чужую систему ЭДО, — так написано в шторке «СМС-кодом».
 */
export function supportsMethod(doc: DocumentRow, contractor: Contractor | undefined, method: SignMethod) {
  if (method === 'kep') return true
  if (doc.isKepOnlyType) return false
  return contractor?.operator === 'tochka'
}
