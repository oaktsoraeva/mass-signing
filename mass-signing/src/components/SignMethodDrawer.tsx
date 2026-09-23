import { Cell, Drawer, DrawerFooter, DrawerHeader, Dropdown } from '@ds'
import { ChevronRight, DocumentList } from '@ds/icons'
import certToken from '../assets/icons/cert-token.svg'
import { CERTIFICATES, POWERS_OF_ATTORNEY } from '../data'
import type { SignMethod } from '../types'

const TITLES: Record<SignMethod, string> = {
  kep: 'Электронной подписью',
  sms: 'СМС-кодом',
}

interface SignMethodDrawerProps {
  method: SignMethod | null
  isOpen: boolean
  /** Всего документов в партии — знаменатель во всех подписях */
  totalCount: number
  /** Сколько документов уйдёт на подпись этим способом */
  selectedCount: number
  /** Только для СМС: сколько документов требуют КЭП */
  kepOnlyCount: number
  blockedCount: number
  certificateId: string | undefined
  onCertificateChange: (id: string) => void
  poaId: string | undefined
  onPoaChange: (id: string) => void
  onOpenDocuments: () => void
  onOpenKepOnly: () => void
  onOpenBlocked: () => void
  onClose: () => void
  onSign: () => void
}

/**
 * Главная шторка способа подписания. У КЭП сверху полномочия — доверенность
 * и сертификат, дальше навигаторы по спискам документов.
 */
export function SignMethodDrawer({
  method,
  isOpen,
  totalCount,
  selectedCount,
  kepOnlyCount,
  blockedCount,
  certificateId,
  onCertificateChange,
  poaId,
  onPoaChange,
  onOpenDocuments,
  onOpenKepOnly,
  onOpenBlocked,
  onClose,
  onSign,
}: SignMethodDrawerProps) {
  const certificate = CERTIFICATES.find((c) => c.id === certificateId)
  const poa = POWERS_OF_ATTORNEY.find((p) => p.id === poaId)

  const navigator = (title: string, description: string, onClick: () => void) => (
    <button type="button" className="sign-nav" onClick={onClick}>
      <span className="sign-nav__title ts-600-xl">
        {title}
        <span className="ds-icon ds-icon--18" aria-hidden="true">
          <ChevronRight />
        </span>
      </span>
      <span className="ts-400-s sign-nav__description">{description}</span>
    </button>
  )

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className="method-drawer"
      header={<DrawerHeader title={method ? TITLES[method] : ''} onClose={onClose} />}
      footer={
        <DrawerFooter
          layout="1-button"
          primaryAction={{
            label: 'Подписать',
            onClick: onSign,
            isDisabled: selectedCount === 0,
            isSelected: true,
          }}
        />
      }
    >
      <div className="drawer-body">
        {method === 'kep' && POWERS_OF_ATTORNEY.length > 0 && (
          <p className="ts-400-m drawer-body__hint">
            Посмотрите список полномочий перед подписанием&nbsp;— проверьте, можете подписывать
            этот документ или нет
          </p>
        )}

        {method === 'kep' && (POWERS_OF_ATTORNEY.length > 0 || CERTIFICATES.length > 0) && (
          <div className="cert-fields">
            {POWERS_OF_ATTORNEY.length > 0 && (
              <Dropdown
                label="Доверенность"
                placeholder="Выберите доверенность из списка"
                value={poa?.owner ?? ''}
                /* Кит типизирует description строкой, но рендерит как есть —
                   в макете под разделителем ещё и ссылка на полномочия */
                description={
                  poa
                    ? ((
                        <>
                          {poa.validUntil}.
                          <br />
                          <button
                            type="button"
                            className="poa-powers"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Посмотреть полномочия
                          </button>
                        </>
                      ) as unknown as string)
                    : undefined
                }
                hasHelpIcon={false}
                right={
                  <span className="poa-badge" aria-hidden="true">
                    <span className="ds-icon ds-icon--18">
                      <DocumentList />
                    </span>
                  </span>
                }
              >
                {POWERS_OF_ATTORNEY.map((item) => (
                  <Cell
                    key={item.id}
                    className={item.id === poaId ? 'cert-option cert-option--selected' : 'cert-option'}
                    subtitle={item.number}
                    title={item.owner}
                    description={item.validUntil}
                    hasLeftAccessory={false}
                    titleColor={item.id === poaId ? 'var(--primitive-brand)' : undefined}
                    onClick={() => onPoaChange(item.id)}
                  />
                ))}
              </Dropdown>
            )}

            {CERTIFICATES.length > 0 && (
              <Dropdown
                label="Электронная подпись"
                value={certificate?.owner ?? ''}
                description={certificate?.validUntil}
                hasHelpIcon={false}
                right={
                  <img className="cert-fields__token" src={certToken} width={32} height={32} alt="" />
                }
              >
                {CERTIFICATES.map((item) => (
                  <Cell
                    key={item.id}
                    className={
                      item.id === certificateId ? 'cert-option cert-option--selected' : 'cert-option'
                    }
                    title={item.owner}
                    description={item.validUntil}
                    hasLeftAccessory={false}
                    titleColor={item.id === certificateId ? 'var(--primitive-brand)' : undefined}
                    onClick={() => onCertificateChange(item.id)}
                  />
                ))}
              </Dropdown>
            )}
          </div>
        )}

        <div className="sign-nav-list">
          {navigator(
            'На подпись',
            `${selectedCount} из ${totalCount} документов будут подписаны ${method === 'kep' ? 'КЭП' : 'НЭП'}`,
            onOpenDocuments,
          )}

          {/* Навигатора нет, если все документы можно подписать НЭП */}
          {method === 'sms' && kepOnlyCount > 0 &&
            navigator(
              'Подписать электронной подписью',
              `${kepOnlyCount} из ${totalCount} документов можно подписать только специальной токен-флешкой, КЭП`,
              onOpenKepOnly,
            )}

          {/* Навигатора нет, если среди выбранного нет подписанных и документов с ошибками */}
          {blockedCount > 0 &&
            navigator(
              'Не получится подписать',
              `${blockedCount} из ${totalCount} документов уже подписаны или содержат ошибки`,
              onOpenBlocked,
            )}
        </div>
      </div>
    </Drawer>
  )
}
