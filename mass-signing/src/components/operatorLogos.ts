import logoDiadoc from '../assets/icons/logo-diadoc.png'
import logoSberkorus from '../assets/icons/logo-sberkorus.png'
import logoSbis from '../assets/icons/logo-sbis.svg'
import logoTochka from '../assets/icons/logo-tochka.png'
import type { EdoOperatorId } from '../types'

/**
 * Логотипы операторов ЭДО.
 * Диадок, СберКорус и Точка — PNG из макета (SVG-экспорт Figma отдаёт
 * для них заглушку «LOGO»), СБИС — корректно выгруженный SVG.
 */
export const OPERATOR_LOGOS: Record<EdoOperatorId, string> = {
  diadoc: logoDiadoc,
  sbis: logoSbis,
  sberkorus: logoSberkorus,
  tochka: logoTochka,
}
