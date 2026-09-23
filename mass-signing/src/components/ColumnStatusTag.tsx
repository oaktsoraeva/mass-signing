import { Tag } from '@ds'
import type { ColumnIndicator, ColumnStatus } from '../types'

/** Цвет тега повторяет цвет иконки в колонках «НДС» и «1С» */
const CLASS_BY_STATUS: Record<ColumnStatus, string> = {
  ok: 'status-tag--success',
  pending: 'status-tag--neutral',
  error: 'status-tag--error',
}

/** В адаптиве колонок нет — индикаторы 1С и НДС становятся тегами с подписью */
export function ColumnStatusTag({ indicator }: { indicator: ColumnIndicator }) {
  return (
    <Tag shape="square" size="m" className={`status-tag ${CLASS_BY_STATUS[indicator.status]}`}>
      {indicator.label}
    </Tag>
  )
}
