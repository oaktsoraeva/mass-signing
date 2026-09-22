import { Cell } from '@ds'
import { ContractorAvatar } from './ContractorAvatar'
import type { Contractor, DocumentRow as DocumentRowModel } from '../types'

interface DocumentRowProps {
  document: DocumentRowModel
  contractor: Contractor | undefined
  /** Третья строка: по умолчанию сумма, в «Не получится подписать» — причина */
  description?: React.ReactNode
  descriptionClassName?: string
  descriptionColor?: string
  rightAccessory?: React.ReactNode
  onClick?: () => void
}

/**
 * Строка документа в шторках: контрагент сверху, название с датой,
 * под ним сумма или причина, по которой документ не подписать.
 */
export function DocumentRow({
  document,
  contractor,
  description,
  descriptionClassName,
  descriptionColor,
  rightAccessory,
  onClick,
}: DocumentRowProps) {
  return (
    <Cell
      className="sign-row"
      leftAccessory={contractor ? <ContractorAvatar contractor={contractor} /> : undefined}
      subtitle={contractor?.name}
      title={`${document.title} от ${document.shortDate}`}
      titleClassName="ts-400-l"
      description={description ?? document.amount}
      descriptionClassName={descriptionClassName}
      descriptionColor={descriptionColor}
      hasRightAccessory={Boolean(rightAccessory)}
      rightAccessory={rightAccessory}
      onClick={onClick}
    />
  )
}
