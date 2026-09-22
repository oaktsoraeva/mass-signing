import { AccordeonCell, Cell, CellRightAccessory, Footer, NavigationBar, PageLayout } from '@ds'
import { Trash } from '@ds/icons'
import { EDO_OPERATORS } from '../data'
import { ContractorAvatar } from '../components/ContractorAvatar'
import type { Contractor } from '../types'

interface SendStepProps {
  /** Контрагенты партии без выбранной системы ЭДО */
  unmapped: Contractor[]
  /** Контрагенты партии, для которых система уже известна */
  mapped: Contractor[]
  isMappedOpen: boolean
  onToggleMapped: (isOpen: boolean) => void
  /** Подсказка показывается один раз при первом входе в сценарий */
  showOnboarding: boolean
  onDismissOnboarding: () => void
  /** Проставляется, когда «Продолжить» нажали с незаполненными операторами */
  hasValidationError: boolean
  onOpenContractor: (id: string) => void
  onRemoveContractor: (id: string) => void
  onBack: () => void
  onContinue: () => void
}

export function SendStep({
  unmapped,
  mapped,
  isMappedOpen,
  onToggleMapped,
  showOnboarding,
  onDismissOnboarding,
  hasValidationError,
  onOpenContractor,
  onRemoveContractor,
  onBack,
  onContinue,
}: SendStepProps) {
  const total = unmapped.length + mapped.length

  const renderRow = (contractor: Contractor, withOperator: boolean) => {
    const operator = EDO_OPERATORS.find((o) => o.id === contractor.operator)

    return (
      <Cell
        key={contractor.id}
        className="cp-row"
        leftAccessory={<ContractorAvatar contractor={contractor} />}
        title={contractor.name}
        titleClassName="ts-500-l"
        description={
          !withOperator && hasValidationError ? (
            <span className="cp-row__error ts-500-s">Выберите систему ЭДО</span>
          ) : (
            <>
              <span className="cp-row__inn ts-400-s">ИНН: {contractor.inn}</span>
              {withOperator && operator && (
                <span className="cp-row__operator ts-400-s"> {operator.name}</span>
              )}
            </>
          )
        }
        rightAccessory={
          <CellRightAccessory
            variant="custom"
            content={
              <button
                type="button"
                className="cp-row__trash"
                aria-label={`Убрать ${contractor.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveContractor(contractor.id)
                }}
              >
                <span className="ds-icon ds-icon--m" aria-hidden="true">
                  <Trash />
                </span>
              </button>
            }
          />
        }
        onClick={() => onOpenContractor(contractor.id)}
      />
    )
  }

  return (
    <>
      <PageLayout
        size="s"
        topOffset={74}
        navigationBar={
          <NavigationBar
            title="Подписание и отправка"
            rootLinkLabel="Документооборот"
            onRootLinkClick={onBack}
            hasDescription={false}
            hasActionButton={false}
            backButtonLabel="Назад"
            onBackClick={onBack}
            items={[
              { kind: 'step', label: 'Куда отправить', state: 'current' },
              { kind: 'step', label: 'Как подписать', state: 'upcoming' },
            ]}
          />
        }
      >
        <div className="wizard-page">
          <h1 className="ts-600-4xl wizard-page__title">Куда отправить документы</h1>

          {unmapped.length > 0 && (
            <section className="cp-group">
              <div className="cp-group__header">
                <p className="ts-500-xl cp-group__title">Система ЭДО не&nbsp;выбрана</p>
                <p className="ts-400-s cp-group__caption">
                  Вы впервые обмениваетесь документами с&nbsp;этими контрагентами&nbsp;— выберите,
                  куда их&nbsp;отправить
                </p>
              </div>

              <div className="cp-list">
                {unmapped.map((contractor, index) => (
                  <div key={contractor.id} className="cp-list__item">
                    {renderRow(contractor, false)}
                    {/* Подсказка привязана к первому контрагенту без системы ЭДО */}
                    {showOnboarding && index === 0 && (
                      <div className="coach">
                        <p className="ts-500-s coach__text">
                          Нажмите на контрагента и&nbsp;выберите оператора ЭДО, а&nbsp;мы запомним
                          ваш выбор
                        </p>
                        <button
                          type="button"
                          className="ts-500-s coach__button"
                          onClick={onDismissOnboarding}
                        >
                          Понятно
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {mapped.length > 0 && (
            <AccordeonCell
              className="cp-accordeon"
              size="xl"
              chevronPosition="edge"
              title="Система выбрана"
              description={
                unmapped.length === 0
                  ? 'Для всех контрагентов уже знаем, куда отправить'
                  : `Для ${mapped.length} из ${total} контрагентов уже знаем, куда отправить`
              }
              isOpen={isMappedOpen}
              onOpenChange={onToggleMapped}
              contentSpacing="4x"
              listSpacing="0"
            >
              <div className="cp-list">{mapped.map((contractor) => renderRow(contractor, true))}</div>
            </AccordeonCell>
          )}
        </div>
      </PageLayout>

      <Footer layout="1-button" primaryAction={{ label: 'Продолжить', onClick: onContinue }} />
    </>
  )
}
