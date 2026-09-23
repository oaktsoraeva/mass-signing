import { Drawer, DrawerHeader } from '@ds'
import { DocumentRow } from './DocumentRow'
import type { Contractor, DocumentRow as DocumentRowModel, SignBlock } from '../types'

interface CannotSignDrawerProps {
  isOpen: boolean
  /** Из шторки способа подписания открывается со стрелкой назад */
  onBack?: () => void
  /** Документы с причинами, по которым их не подписать */
  blocked: { document: DocumentRowModel; block: SignBlock }[]
  contractorById: Record<string, Contractor>
  onOpenDocument: (id: string) => void
  onClose: () => void
}

/**
 * «Не получится подписать»: один список в порядке документов. Причину,
 * которую можно исправить, в макете красят в красный, остальные — серым.
 */
export function CannotSignDrawer({
  isOpen,
  onBack,
  blocked,
  contractorById,
  onOpenDocument,
  onClose,
}: CannotSignDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className="blocked-drawer"
      header={
        <DrawerHeader
          title="Не получится подписать"
          hasDefaultBackArrow={Boolean(onBack)}
          onLeftAccessoryClick={onBack}
          onClose={onClose}
        />
      }
    >
      <div className="drawer-body">
        <div className="sign-list">
          {blocked.map(({ document, block }) => (
            <DocumentRow
              key={document.id}
              document={document}
              contractor={contractorById[document.contractorId]}
              description={block.reason}
              descriptionColor={block.kind === 'fix' ? 'var(--primitive-error)' : undefined}
              onClick={() => onOpenDocument(document.id)}
            />
          ))}
        </div>
      </div>
    </Drawer>
  )
}
