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
 * «Не получится подписать»: две секции — что можно исправить
 * и что подписывать больше не нужно.
 */
export function CannotSignDrawer({
  isOpen,
  onBack,
  blocked,
  contractorById,
  onOpenDocument,
  onClose,
}: CannotSignDrawerProps) {
  const toFix = blocked.filter((item) => item.block.kind === 'fix')
  const toSkip = blocked.filter((item) => item.block.kind === 'skip')

  const renderSection = (title: string, items: typeof blocked, isError: boolean) =>
    items.length > 0 && (
      <section className="blocked-group">
        <p className="ts-500-xl blocked-group__title">{title}</p>
        <div className="sign-list">
          {items.map(({ document, block }) => (
            <DocumentRow
              key={document.id}
              document={document}
              contractor={contractorById[document.contractorId]}
              description={block.reason}
              descriptionColor={isError ? 'var(--primitive-error)' : undefined}
              onClick={() => onOpenDocument(document.id)}
            />
          ))}
        </div>
      </section>
    )

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
        {renderSection('К исправлению', toFix, true)}
        {renderSection('Не нужно подписывать', toSkip, false)}
      </div>
    </Drawer>
  )
}
