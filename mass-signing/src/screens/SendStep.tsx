import { AccordeonCell, Cell, Footer, NavigationBar, PageLayout } from '@ds'
import { EDO_OPERATORS } from '../data'
import { ContractorAvatar } from '../components/ContractorAvatar'
import { ADAPTIVE_QUERY, useMediaQuery } from '../hooks/useMediaQuery'
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
  onBack,
  onContinue,
}: SendStepProps) {
  const isAdaptive = useMediaQuery(ADAPTIVE_QUERY)
  const renderRow = (contractor: Contractor, withOperator: boolean) => {
    const operator = EDO_OPERATORS.find((o) => o.id === contractor.operator)

    return (
      <Cell
        key={contractor.id}
        className="cp-row"
        leftAccessory={<ContractorAvatar contractor={contractor} />}
        hasRightAccessory={false}
        title={contractor.name}
        titleClassName="ts-400-l"
        description={
          !withOperator && hasValidationError ? (
            <span className="cp-row__error ts-500-s">Выберите систему ЭДО</span>
          ) : (
            <>
              <span className="cp-row__inn ts-400-s">ИНН: {contractor.inn}</span>
              {withOperator && operator && (
                <span className="cp-row__operator ts-400-s">{operator.name}</span>
              )}
            </>
          )
        }
        onClick={() => onOpenContractor(contractor.id)}
      />
    )
  }

  return (
    <>
      <PageLayout
        size="s"
        topOffset={isAdaptive ? 0 : 74}
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
            /* В адаптиве шаги превращаются в полоску прогресса */
            titleVariant="step-progress"
            progress={{ value: 1, maxSteps: 2, ariaLabel: 'Шаг 1 из 2' }}
            rightAccessoryVariant="none"
            leftAriaLabel="Назад"
            onLeftClick={onBack}
          />
        }
      >
        <div className="wizard-page">
          <h1 className="ts-600-4xl wizard-page__title">Куда отправить документы</h1>

          {unmapped.length > 0 && (
            <section className="cp-group">
              <p className="ts-500-xl cp-group__title">Выберите ЭДО контрагента</p>

              <div className="cp-list">
                {unmapped.map((contractor, index) => (
                  <div key={contractor.id} className="cp-list__item">
                    {renderRow(contractor, false)}
                    {/* Подсказка привязана к первому контрагенту без системы ЭДО */}
                    {showOnboarding && index === 0 && (
                      <div className="coach">
                        <p className="ts-500-s coach__text">
                          Нажмите на контрагента и&nbsp;выберите нужный ЭДО&nbsp;— запомним ваш выбор
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
              title="ЭДО уже выбран"
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
