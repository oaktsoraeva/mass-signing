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

/** «Подписать КЭП» — документы, которые из ветки СМС подписать нельзя */
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
          title="Подписать КЭП"
          hasDefaultBackArrow
          onLeftAccessoryClick={onBack}
          onClose={onClose}
        />
      }
      footer={
        <DrawerFooter layout="1-button" primaryAction={{ label: 'Подписать', onClick: onSwitchToKep }} />
      }
    >
      <div className="drawer-body">
        <p className="ts-400-m drawer-body__hint">
          Эти документы не&nbsp;получится подписать смс-кодом&nbsp;— только электронной подписью
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
