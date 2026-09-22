import { useEffect, useState } from 'react'
import { Drawer, DrawerFooter, DrawerHeader, FormCell, Radio } from '@ds'
import { EDO_OPERATORS } from '../data'
import { OPERATOR_LOGOS } from './operatorLogos'
import type { Contractor, EdoOperatorId } from '../types'

interface OperatorPickerDrawerProps {
  contractor: Contractor | null
  isOpen: boolean
  onClose: () => void
  onSave: (contractorId: string, operator: EdoOperatorId) => void
}

/**
 * Шторка выбора системы ЭДО для контрагента.
 * По макету кнопка «Сохранить» появляется только после выбора оператора —
 * до этого у шторки нет футера вовсе.
 */
export function OperatorPickerDrawer({
  contractor,
  isOpen,
  onClose,
  onSave,
}: OperatorPickerDrawerProps) {
  const [selected, setSelected] = useState<EdoOperatorId | null>(null)

  useEffect(() => {
    if (isOpen) setSelected(contractor?.operator ?? null)
  }, [isOpen, contractor?.id])

  const handleSave = () => {
    if (contractor && selected) onSave(contractor.id, selected)
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className="operator-drawer"
      header={
        <DrawerHeader
          title={
            <span className="operator-drawer__title">
              <span className="ts-500-m">{contractor?.name}</span>
              <span className="ts-400-s operator-drawer__inn">ИНН: {contractor?.inn}</span>
            </span>
          }
          onClose={onClose}
        />
      }
      footer={
        selected ? (
          <DrawerFooter
            layout="1-button"
            primaryAction={{ label: 'Сохранить', onClick: handleSave, isSelected: true }}
          />
        ) : undefined
      }
    >
      <div className="drawer-body">
        <p className="ts-400-m drawer-body__hint">
          Выберите, куда отправлять документы этому контрагенту&nbsp;— запомним ваш выбор
        </p>

        {/* Radio презентационные: выбор обрабатывает строка — иначе клик по Radio
            всплывает до её обработчика и срабатывает дважды */}
        <div className="operator-card">
          {EDO_OPERATORS.map((operator, index) => (
            <div
              key={operator.id}
              className="operator-card__row"
              role="button"
              tabIndex={0}
              onClick={() => setSelected(operator.id)}
            >
              <FormCell
                title={operator.name}
                description={operator.description}
                variant={
                  index === 0
                    ? 'stack-top'
                    : index === EDO_OPERATORS.length - 1
                      ? 'stack-bottom'
                      : 'stack-middle'
                }
                left={
                  <img
                    className="operator-card__logo"
                    src={OPERATOR_LOGOS[operator.id]}
                    width={40}
                    height={40}
                    alt=""
                  />
                }
                right={<Radio isSelected={selected === operator.id} />}
              />
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  )
}
