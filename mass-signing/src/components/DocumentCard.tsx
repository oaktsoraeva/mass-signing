import { Checkbox } from '@ds'
import { DotsThreeHorizontal } from '@ds/icons'
import { StatusTag } from './StatusTag'
import { ColumnStatusTag } from './ColumnStatusTag'
import type { Contractor, DocumentRow } from '../types'

interface DocumentCardProps {
  document: DocumentRow
  contractor: Contractor | undefined
  /** В адаптиве чекбоксы появляются только в режиме выбора */
  isSelecting: boolean
  isChecked: boolean
  onToggle: () => void
}

/** Строка таблицы в адаптиве: карточка, где колонки НДС и 1С стали тегами */
export function DocumentCard({
  document,
  contractor,
  isSelecting,
  isChecked,
  onToggle,
}: DocumentCardProps) {
  return (
    <div
      className="doc-card"
      role={isSelecting ? 'button' : undefined}
      tabIndex={isSelecting ? 0 : undefined}
      onClick={isSelecting ? onToggle : undefined}
    >
      <div className="doc-card__head">
        <div className="doc-card__text">
          <p className="ts-400-l doc-card__title">
            {document.title} от {document.shortDate}
          </p>
          <p className="ts-400-s doc-card__contractor">{contractor?.name ?? '—'}</p>
          <p className="ts-400-l doc-card__amount">{document.amount}</p>
        </div>

        <div className="doc-card__action">
          {isSelecting ? (
            <Checkbox isChecked={isChecked} label={`Выбрать ${document.title}`} />
          ) : (
            <span className="ds-icon ds-icon--m doc-cell__menu" aria-hidden="true">
              <DotsThreeHorizontal />
            </span>
          )}
        </div>
      </div>

      <div className="doc-card__tags">
        <StatusTag status={document.status} />
        {document.nds && <ColumnStatusTag indicator={document.nds} />}
        {document.oneC && <ColumnStatusTag indicator={document.oneC} />}
      </div>
    </div>
  )
}
