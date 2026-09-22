import { Tag } from '@ds'
import type { DocStatus } from '../types'

const STATUS_CONFIG: Record<DocStatus, { label: string; className: string }> = {
  awaiting_signature: { label: 'Ждёт вашей подписи', className: 'status-tag--brand' },
  awaiting_payment: { label: 'Ожидает оплаты', className: 'status-tag--brand' },
  signed: { label: 'Подписано', className: 'status-tag--success' },
}

export function StatusTag({ status }: { status: DocStatus }) {
  const config = STATUS_CONFIG[status]

  return (
    <Tag shape="square" size="m" className={`status-tag ${config.className}`}>
      {config.label}
    </Tag>
  )
}
