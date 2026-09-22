import { useEffect, useRef, useState } from 'react'
import { Modal, ModalHeader } from '@ds'

const CODE_LENGTH = 5

interface SmsCodeModalProps {
  isOpen: boolean
  /** Порядковый номер документа в пачке — в заголовке «Введите код №N» */
  index: number
  onClose: () => void
  onComplete: () => void
}

/**
 * Код подтверждения приходит на каждый документ отдельно,
 * поэтому окно открывается столько раз, сколько документов подписывают.
 */
export function SmsCodeModal({ isOpen, index, onClose, onComplete }: SmsCodeModalProps) {
  const [code, setCode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    setCode('')
    // Фокус нужен, чтобы код можно было просто набрать с клавиатуры
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => window.clearTimeout(timer)
  }, [isOpen, index])

  useEffect(() => {
    if (code.length < CODE_LENGTH) return
    const timer = window.setTimeout(onComplete, 400)
    return () => window.clearTimeout(timer)
  }, [code])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="sms-modal"
      header={<ModalHeader onClose={onClose} />}
    >
      <div className="sms-code" onClick={() => inputRef.current?.focus()}>
        <h2 className="ts-600-2xl sms-code__title">Введите код №{index}</h2>
        <p className="ts-400-s sms-code__hint">
          Мы отправили пятизначный код
          <br />в пуш-уведомлении или смс
        </p>

        <div className="sms-code__digits">
          {Array.from({ length: CODE_LENGTH }).map((_, i) => (
            <span key={i} className="ts-600-2xl sms-code__digit">
              {code[i] ?? ''}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          className="sms-code__input"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(event) =>
            setCode(event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))
          }
          aria-label={`Код подтверждения №${index}`}
        />

        <p className="ts-400-s sms-code__resend">
          Не приходит код? <button type="button" className="sms-code__link">Отправьте ещё один</button>
        </p>
      </div>
    </Modal>
  )
}
