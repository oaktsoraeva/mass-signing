import { Checkbox, Drawer, DrawerFooter, DrawerHeader } from '@ds'
import { DocumentRow } from './DocumentRow'
import type { Contractor, DocumentRow as DocumentRowModel } from '../types'

interface SignDocumentsDrawerProps {
  isOpen: boolean
  /** Документы, доступные способу подписания */
  documents: DocumentRowModel[]
  contractorById: Record<string, Contractor>
  checkedIds: string[]
  onToggle: (id: string) => void
  onToggleAll: () => void
  onReset: () => void
  onBack: () => void
  onSave: () => void
}

/**
 * «На подпись» — выбор документов внутри способа.
 * Шапка: стрелка назад, название, «Сбросить» справа.
 */
export function SignDocumentsDrawer({
  isOpen,
  documents,
  contractorById,
  checkedIds,
  onToggle,
  onToggleAll,
  onReset,
  onBack,
  onSave,
}: SignDocumentsDrawerProps) {
  const allChecked = documents.length > 0 && documents.every((d) => checkedIds.includes(d.id))
  const someChecked = documents.some((d) => checkedIds.includes(d.id))

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onBack}
      className="sign-drawer"
      header={
        <>
          <DrawerHeader title="На подпись" hasDefaultBackArrow onLeftAccessoryClick={onBack} />
          {/* В шапке кита справа только крестик — «Сбросить» кладём поверх */}
          <button type="button" className="ts-500-m sign-drawer__reset" onClick={onReset}>
            Сбросить
          </button>
        </>
      }
      footer={
        <DrawerFooter
          layout="1-button"
          primaryAction={{ label: 'Сохранить', onClick: onSave, isSelected: true }}
        />
      }
    >
      <div className="drawer-body">
        <div className="sign-list__header">
          <p className="ts-500-xl sign-list__title">На подпись</p>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={!allChecked && someChecked}
            onChange={onToggleAll}
            label="Выбрать все документы на подпись"
          />
        </div>

        <div className="sign-list">
          {documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              document={doc}
              contractor={contractorById[doc.contractorId]}
              rightAccessory={
                <Checkbox isChecked={checkedIds.includes(doc.id)} label={`Подписать ${doc.title}`} />
              }
              onClick={() => onToggle(doc.id)}
            />
          ))}
        </div>
      </div>
    </Drawer>
  )
}
