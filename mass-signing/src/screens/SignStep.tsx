import { Cell, CellLeftAccessory, Footer, NavigationBar, PageLayout } from '@ds'
import { BubbleListShort, USBFlashDrive } from '@ds/icons'
import type { SignMethod } from '../types'

interface SignStepProps {
  /** Сколько документов подписано каждым способом */
  signedByKep: number
  signedBySms: number
  /** Сколько документов вообще можно подписать в этой партии */
  signableCount: number
  isSmsAvailable: boolean
  onPickMethod: (method: SignMethod) => void
  onBack: () => void
  onFinish: () => void
}

export function SignStep({
  signedByKep,
  signedBySms,
  signableCount,
  isSmsAvailable,
  onPickMethod,
  onBack,
  onFinish,
}: SignStepProps) {
  const signedCount = signedByKep + signedBySms

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
              { kind: 'step', label: 'Куда отправить', state: 'completed', onClick: onBack },
              { kind: 'step', label: 'Как подписать', state: 'current' },
            ]}
          />
        }
        rightPanel={
          <div className="sign-panel">
            <div className="sign-summary">
              <div className="sign-summary__row ts-400-m">
                <span>Электронной подписью</span>
                <span>{signedByKep}</span>
              </div>
              <div className="sign-summary__row ts-400-m">
                <span>СМС-кодом</span>
                <span>{signedBySms}</span>
              </div>
              <div className="sign-summary__total ts-600-xl">
                <span>Подписано</span>
                <span>
                  {signedCount} из {signableCount}
                </span>
              </div>
            </div>

          </div>
        }
      >
        <div className="wizard-page">
          <h1 className="ts-600-4xl wizard-page__title">Как подписать</h1>

          <div className="sign-methods">
            <Cell
              className="sign-method"
              leftAccessory={<CellLeftAccessory variant="icon-24" icon={<USBFlashDrive />} />}
              hasRightAccessory={false}
              title="Электронной подписью"
              titleClassName="ts-500-l"
              description="КЭП — для работы с любыми контрагентами. Проверьте токен-флешку перед подписанием."
              onClick={() => onPickMethod('kep')}
            />
            <Cell
              className={isSmsAvailable ? 'sign-method' : 'sign-method sign-method--disabled'}
              leftAccessory={<CellLeftAccessory variant="icon-24" icon={<BubbleListShort />} />}
              hasRightAccessory={false}
              title="СМС-кодом"
              titleClassName="ts-500-l"
              description={
                isSmsAvailable
                  ? 'НЭП — для работы с физлицами, самозанятыми и бизнесом без ЭДО'
                  : 'Нет документов на подпись НЭП'
              }
              onClick={isSmsAvailable ? () => onPickMethod('sms') : undefined}
            />
          </div>
        </div>
      </PageLayout>

      <Footer
        className="footer--neutral"
        layout="1-button"
        primaryAction={{ label: 'Выйти на главную ЭДО', onClick: onFinish }}
      />
    </>
  )
}
