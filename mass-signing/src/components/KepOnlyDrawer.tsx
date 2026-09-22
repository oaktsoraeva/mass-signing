import { Drawer, DrawerFooter, DrawerHeader } from '@ds'
import { DocumentRow } from './DocumentRow'
import type { Contractor, DocumentRow as DocumentRowModel } from '../types'

interface KepOnlyDrawerProps {
  isOpen: boolean
  documents: DocumentRowModel[]
  contractorById: Record<string, Contractor>
  onBack: () => void
  onClose: () => void
  onSwitchToKep: () => void
}

/** «Только КЭП» — документы, которые из ветки СМС подписать нельзя */
export function KepOnlyDrawer({
  isOpen,
  documents,
  contractorById,
  onBack,
  onClose,
  onSwitchToKep,
}: KepOnlyDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className="sign-drawer"
      header={
        <DrawerHeader
          title="Только КЭП"
          hasDefaultBackArrow
          onLeftAccessoryClick={onBack}
          onClose={onClose}
        />
      }
      footer={
        <DrawerFooter layout="1-button" primaryAction={{ label: 'Подписать КЭП', onClick: onSwitchToKep }} />
      }
    >
      <div className="drawer-body">
        <p className="ts-400-m drawer-body__hint">
          Эти документы можно подписать только электронной подписью. К&nbsp;ним можно вернуться
          после подписания остальных документов СМС-кодом.
        </p>

        <div className="sign-list">
          {documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              document={doc}
              contractor={contractorById[doc.contractorId]}
            />
          ))}
        </div>
      </div>
    </Drawer>
  )
}
