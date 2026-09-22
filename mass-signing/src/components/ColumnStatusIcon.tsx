import statusOk from '../assets/icons/status-ok.svg'
import statusPending from '../assets/icons/status-pending.svg'
import statusError from '../assets/icons/status-error.svg'
import type { ColumnStatus } from '../types'

/**
 * Индикаторы в колонках «НДС» и «1С».
 * В макете это залитые 24px-графики (Filled/Checkmark Circle, Filled/Watch,
 * Filled/Cross Circle) — в UI-ките есть только контурные версии,
 * поэтому используем выгруженные из Figma ассеты.
 */
const CONFIG: Record<ColumnStatus, { src: string; label: string }> = {
  ok: { src: statusOk, label: 'Готово' },
  pending: { src: statusPending, label: 'В обработке' },
  error: { src: statusError, label: 'Ошибка' },
}

export function ColumnStatusIcon({ status }: { status: ColumnStatus }) {
  const config = CONFIG[status]

  return <img className="column-status" src={config.src} width={24} height={24} alt={config.label} />
}
