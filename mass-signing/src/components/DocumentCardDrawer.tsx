import { Drawer, DrawerFooter, DrawerHeader } from '@ds'
import { WarningTriangle } from '@ds/icons'
import { ContractorAvatar } from './ContractorAvatar'
import { FilePdfIcon } from './FilePdfIcon'
import { StatusTag } from './StatusTag'
import type { Contractor, DocumentRow, SignBlock } from '../types'

interface DocumentCardDrawerProps {
  isOpen: boolean
  document: DocumentRow | null
  contractor: Contractor | undefined
  block: SignBlock | undefined
  /** Данные уже поправили — остаётся подписать */
  isFixed: boolean
  onBack: () => void
  onClose: () => void
  onEdit: () => void
  onSign: () => void
  onRemove: () => void
}

/**
 * Карточка документа из списка «Не получится подписать».
 * У исправимой ошибки в футере «Редактировать», после правки — «Подписать
 * и отправить»; у неисправимой — «Удалить».
 */
export function DocumentCardDrawer({
  isOpen,
  document,
  contractor,
  block,
  isFixed,
  onBack,
  onClose,
  onEdit,
  onSign,
  onRemove,
}: DocumentCardDrawerProps) {
  if (!document) return null

  // Неисправимую ошибку остаётся только убрать — в макете эта кнопка нейтральная
  const footerAction = isFixed
    ? { label: 'Подписать и отправить', onClick: onSign, isSelected: true }
    : block?.kind === 'fix'
      ? { label: 'Редактировать', onClick: onEdit, isSelected: true }
      : { label: 'Удалить', onClick: onRemove }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className={block?.kind === 'fix' || isFixed ? 'doc-card-drawer' : 'doc-card-drawer doc-card-drawer--neutral'}
      header={<DrawerHeader hasDefaultBackArrow onLeftAccessoryClick={onBack} onClose={onClose} />}
      footer={<DrawerFooter layout="1-button" primaryAction={footerAction} />}
    >
      <div className="drawer-body doc-card-body">
        <div className="doc-card-head">
          <h2 className="ts-600-3xl doc-card-head__title">
            {document.title} от {document.shortDate}
          </h2>
          <p className="ts-400-s doc-card-head__meta">
            <span>
              Сумма: <span className="doc-card-head__value">{document.amount}</span>
            </span>
            <span>
              НДС: <span className="doc-card-head__value">{document.vat}</span>
            </span>
          </p>
          <StatusTag status={document.status} />
        </div>

        {block && !isFixed && (
          <div className="doc-card-warning">
            <span className="ds-icon ds-icon--m doc-card-warning__icon" aria-hidden="true">
              <WarningTriangle />
            </span>
            <p className="ts-400-s doc-card-warning__text">{block.reason}</p>
          </div>
        )}

        <section className="doc-card-block">
          <p className="ts-600-xl doc-card-block__title">Контрагент</p>
          <div className="doc-card-block__row">
            {contractor && <ContractorAvatar contractor={contractor} />}
            <div className="doc-card-block__text">
              <p className="ts-500-l doc-card-block__name">{contractor?.name}</p>
              <p className="ts-400-s doc-card-block__inn">ИНН: {contractor?.inn}</p>
            </div>
          </div>
        </section>

        <section className="doc-card-block">
          <p className="ts-600-xl doc-card-block__title">Документ</p>
          <div className="doc-card-block__row">
            <span className="doc-card-block__file">
              <FilePdfIcon />
            </span>
            <p className="ts-400-m">
              {document.title} от {document.shortDate}
            </p>
          </div>
        </section>
      </div>
    </Drawer>
  )
}
