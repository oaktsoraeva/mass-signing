import { NavigationBar } from '@ds'
import desktopOnly from '../assets/desktop-only.svg'

/**
 * В адаптиве КЭП недоступна: токен-флешку некуда вставить.
 * По макетам вместо шторки подписания показываем экран-заглушку.
 */
export function DesktopOnlyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="desktop-only">
      <NavigationBar
        hasDescription={false}
        hasRootLink={false}
        hasActionButton={false}
        titleVariant="none"
        rightAccessoryVariant="none"
        leftAriaLabel="Назад"
        onLeftClick={onBack}
      />

      <div className="desktop-only__body">
        <img className="desktop-only__image" src={desktopOnly} width={160} height={160} alt="" />
        <p className="ts-500-l desktop-only__title">Продолжите с компьютера</p>
        <p className="ts-400-s desktop-only__text">
          Чтобы выполнить это действие, откройте ЭДО с&nbsp;компьютера и&nbsp;вставьте
          токен-флешку с&nbsp;электронной подписью
        </p>
      </div>
    </div>
  )
}
