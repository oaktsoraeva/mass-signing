import { Avatar } from '@ds'
import { OPERATOR_LOGOS } from './operatorLogos'
import type { Contractor } from '../types'

/**
 * Аватар контрагента из макета: круг с инициалами и 16px логотипом оператора ЭДО
 * в правом верхнем углу. Место под логотип вырезано из круга alpha-маской
 * (Figma: Fill + Label под mask-image), поэтому вокруг бейджа остаётся зазор.
 * Если оператор не выбран — обычный круг без маски и бейджа.
 */
export function ContractorAvatar({ contractor }: { contractor: Contractor }) {
  const logo = contractor.operator ? OPERATOR_LOGOS[contractor.operator] : undefined

  if (!logo) {
    return (
      <Avatar
        size={40}
        shape="circle"
        label={contractor.initials}
        style={
          {
            '--avatar-surface': contractor.color,
            '--avatar-color': 'var(--primitive-default)',
          } as React.CSSProperties
        }
      />
    )
  }

  return (
    <span className="contractor-avatar">
      <span className="contractor-avatar__fill ts-600-m" style={{ background: contractor.color }}>
        {contractor.initials}
      </span>
      <img className="contractor-avatar__badge" src={logo} width={16} height={16} alt="" />
    </span>
  )
}
