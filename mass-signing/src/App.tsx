import { useEffect, useMemo, useState } from 'react'
import {
  ActionSheet,
  ActionSheetButton,
  ActionSheetFooter,
  ActionSheetHeader,
  Alert,
  FlowResultView,
  MainPageNavigationBar,
} from '@ds'
import { ArrowRightOutgoingRectangleVertical } from '@ds/icons'
import { DocumentListScreen } from './screens/DocumentListScreen'
import { SendStep } from './screens/SendStep'
import { SignStep } from './screens/SignStep'
import { OperatorPickerDrawer } from './components/OperatorPickerDrawer'
import { SignMethodDrawer } from './components/SignMethodDrawer'
import { SignDocumentsDrawer } from './components/SignDocumentsDrawer'
import { CannotSignDrawer } from './components/CannotSignDrawer'
import { KepOnlyDrawer } from './components/KepOnlyDrawer'
import { SmsCodeModal } from './components/SmsCodeModal'
import { DocumentCardDrawer } from './components/DocumentCardDrawer'
import { DesktopOnlyScreen } from './components/DesktopOnlyScreen'
import { ADAPTIVE_QUERY, useMediaQuery } from './hooks/useMediaQuery'
import {
  CERTIFICATES,
  CLIENT_INITIALS,
  CLIENT_NAME,
  INITIAL_CONTRACTORS,
  INITIAL_DOCUMENTS,
  POWERS_OF_ATTORNEY,
} from './data'
import { blockOf, supportsMethod } from './signing'
import type { Contractor, DocumentRow, EdoOperatorId, SignBlock, SignMethod } from './types'

/**
 * Руководителю с единственной КЭП и без доверенностей выбирать нечего —
 * по макету шторку способа не показывают и сразу подписывают.
 */
const NEEDS_METHOD_DRAWER = CERTIFICATES.length > 1 || POWERS_OF_ATTORNEY.length > 0

type Screen = 'list' | 'send' | 'sign'
/** Что открыто поверх шторки способа подписания */
type SignStage = 'method' | 'documents' | 'kep-only' | 'blocked' | 'sms-codes'

export default function App() {
  const isAdaptive = useMediaQuery(ADAPTIVE_QUERY)
  const [screen, setScreen] = useState<Screen>('list')
  const [documents, setDocuments] = useState<DocumentRow[]>(INITIAL_DOCUMENTS)
  const [contractors, setContractors] = useState<Contractor[]>(INITIAL_CONTRACTORS)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Шаг «Куда отправить»
  const [drawerContractorId, setDrawerContractorId] = useState<string | null>(null)
  const [isMappedOpen, setIsMappedOpen] = useState(false)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [hasSendValidationError, setHasSendValidationError] = useState(false)

  // Шаг «Как подписать». Статусы документов меняются только в конце сценария,
  // поэтому подписанное копится отдельно
  const [signedIds, setSignedIds] = useState<Record<string, SignMethod>>({})
  /** Документы, у которых ошибку исправили в карточке */
  const [fixedIds, setFixedIds] = useState<string[]>([])
  /** Документы, убранные из партии в карточке «Не нужно подписывать» */
  const [removedDocIds, setRemovedDocIds] = useState<string[]>([])
  const [activeMethod, setActiveMethod] = useState<SignMethod | null>(null)
  const [signStage, setSignStage] = useState<SignStage | null>(null)
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [resultCount, setResultCount] = useState<number | null>(null)
  const [certificateId, setCertificateId] = useState(CERTIFICATES[0]?.id)
  const [poaId, setPoaId] = useState<string | undefined>(undefined)
  const [cardDocumentId, setCardDocumentId] = useState<string | null>(null)
  const [isFinishOpen, setIsFinishOpen] = useState(false)
  /** В адаптиве КЭП заменяется экраном «Продолжите с компьютера» */
  const [isDesktopOnlyOpen, setIsDesktopOnlyOpen] = useState(false)
  /** Документы, по которым в ветке СМС осталось ввести код */
  const [smsQueue, setSmsQueue] = useState<string[]>([])
  const [smsDone, setSmsDone] = useState(0)

  const [alert, setAlert] = useState<string | null>(null)

  // Шаги мастера — отдельные экраны: скролл списка не должен на них переноситься
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])

  const contractorById = useMemo(
    () => Object.fromEntries(contractors.map((c) => [c.id, c])),
    [contractors],
  )

  /** Контрагенты выбранных документов — в порядке документов, без повторов */
  const batch = useMemo(() => {
    const ids: string[] = []
    for (const doc of documents) {
      if (!selectedIds.includes(doc.id)) continue
      if (!ids.includes(doc.contractorId)) ids.push(doc.contractorId)
    }
    return ids.map((id) => contractorById[id]).filter(Boolean)
  }, [documents, selectedIds, contractorById])

  const unmapped = batch.filter((c) => c.operator === null)
  const mapped = batch.filter((c) => c.operator !== null)

  /** Документы партии на шаге «Как подписать» */
  const batchDocuments = useMemo(
    () =>
      documents.filter((doc) => selectedIds.includes(doc.id) && !removedDocIds.includes(doc.id)),
    [documents, selectedIds, removedDocIds],
  )

  /** Исправленный документ перестаёт считаться проблемным */
  const blockOfDocument = (doc: DocumentRow) => (fixedIds.includes(doc.id) ? undefined : blockOf(doc))

  const blocked = batchDocuments
    .map((document) => ({ document, block: blockOfDocument(document) }))
    .filter((item): item is { document: DocumentRow; block: SignBlock } => Boolean(item.block))
  const signable = batchDocuments.filter((doc) => !blockOfDocument(doc))

  const signedByKep = Object.values(signedIds).filter((m) => m === 'kep').length
  const signedBySms = Object.values(signedIds).filter((m) => m === 'sms').length
  const isEverythingSigned = signable.length > 0 && signable.every((doc) => signedIds[doc.id])

  const unsigned = signable.filter((doc) => !signedIds[doc.id])
  const supports = (doc: DocumentRow, method: SignMethod) =>
    supportsMethod(doc, contractorById[doc.contractorId], method)

  /** Документы, доступные выбранному способу и ещё не подписанные */
  const methodDocuments = activeMethod ? unsigned.filter((doc) => supports(doc, activeMethod)) : []
  /** Обратная сторона ветки СМС: что придётся подписывать КЭП */
  const kepOnlyDocuments = unsigned.filter((doc) => !supports(doc, 'sms'))
  const isSmsAvailable = unsigned.some((doc) => supports(doc, 'sms'))

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleSelectAll = (ids: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = ids.every((id) => prev.includes(id))
      if (allSelected) return prev.filter((id) => !ids.includes(id))
      return Array.from(new Set([...prev, ...ids]))
    })
  }

  /** Шаг «Куда отправить» нужен, только если хотя бы у одного контрагента нет системы ЭДО */
  const handleStartSigning = () => {
    const needsOperator = batch.some((c) => c.operator === null)
    setRemovedDocIds([])
    setSignedIds({})
    setFixedIds([])
    setIsMappedOpen(false)
    setHasSendValidationError(false)
    if (needsOperator) {
      setScreen('send')
      return
    }
    enterSignScreen(false)
  }

  const handleSaveOperator = (contractorId: string, operator: EdoOperatorId) => {
    setContractors((prev) => prev.map((c) => (c.id === contractorId ? { ...c, operator } : c)))
    setDrawerContractorId(null)
    setHasSendValidationError(false)
    setAlert('Контрагент изменён')
    // Это был последний контрагент без ЭДО — на шаге больше нечего делать
    if (unmapped.length === 1 && unmapped[0].id === contractorId) enterSignScreen(true)
  }

  const handleContinueFromSend = () => {
    if (unmapped.length > 0) {
      setHasSendValidationError(true)
      return
    }
    setHasSendValidationError(false)
    enterSignScreen(true)
  }

  /**
   * Когда доступна только КЭП, шаг «Как подписать» показывают, лишь если
   * перед ним был шаг «Куда отправить». Если шагов не было вовсе, мастер
   * не открывается совсем — шторка подписания ложится поверх списка.
   */
  const enterSignScreen = (hadSendStep: boolean) => {
    if (!isSmsAvailable && !hadSendStep) {
      handlePickMethod('kep')
      return
    }
    setScreen('sign')
  }

  const handlePickMethod = (method: SignMethod) => {
    // Подписать КЭП можно только с компьютера — в адаптиве показываем заглушку
    if (method === 'kep' && isAdaptive) {
      setIsDesktopOnlyOpen(true)
      return
    }
    const available = unsigned.filter((doc) => supports(doc, method))
    setActiveMethod(method)
    setCheckedIds(available.map((doc) => doc.id))
    // Выбирать нечего — сразу подписываем
    if (method === 'kep' && !NEEDS_METHOD_DRAWER) {
      signDocuments(available.map((doc) => doc.id), 'kep')
      return
    }
    setSignStage('method')
  }

  const closeSignFlow = () => {
    setActiveMethod(null)
    setSignStage(null)
    setCheckedIds([])
    setSmsQueue([])
    setSmsDone(0)
  }

  /**
   * Шторка поверх списка — единственный экран сценария, поэтому её закрытие
   * заканчивает подписание: без мастера некому нажать «Завершить подписание».
   */
  const handleDrawerClose = () => {
    closeSignFlow()
    if (screen === 'list' && Object.keys(signedIds).length > 0) commitAndExit()
  }

  const handleSignFromDrawer = () => {
    if (!activeMethod) return
    if (activeMethod === 'sms') {
      setSmsQueue(checkedIds)
      setSmsDone(0)
      setSignStage('sms-codes')
      return
    }
    signDocuments(checkedIds, 'kep')
    closeSignFlow()
  }

  /** Код принят: либо просим следующий, либо закрываем ветку результатом */
  const handleSmsCodeEntered = () => {
    const next = smsDone + 1
    if (next < smsQueue.length) {
      setSmsDone(next)
      return
    }
    signDocuments(smsQueue, 'sms')
    closeSignFlow()
  }

  const signDocuments = (ids: string[], method: SignMethod) => {
    setSignedIds((prev) => {
      const next = { ...prev }
      for (const id of ids) next[id] = method
      return next
    })
    setResultCount(ids.length)
  }

  const commitAndExit = () => {
    setDocuments((prev) => prev.map((doc) => (signedIds[doc.id] ? { ...doc, status: 'signed' } : doc)))
    setSelectedIds([])
    setRemovedDocIds([])
    setSignedIds({})
    setFixedIds([])
    setIsFinishOpen(false)
    setScreen('list')
  }

  /** Когда подписывать больше нечего, сценарий закончился — возвращаемся к списку */
  const handleResultDone = () => {
    setResultCount(null)
    if (isEverythingSigned) commitAndExit()
  }

  const cardDocument = batchDocuments.find((doc) => doc.id === cardDocumentId) ?? null

  return (
    <>
      <MainPageNavigationBar
        customer={CLIENT_NAME}
        avatarInitials={CLIENT_INITIALS}
        hasSelect={false}
      />

      {isDesktopOnlyOpen && <DesktopOnlyScreen onBack={() => setIsDesktopOnlyOpen(false)} />}

      {alert && (
        <div className="page-alert">
          <Alert type="success" textAlign="center" onHide={() => setAlert(null)}>
            {alert}
          </Alert>
        </div>
      )}

      {screen === 'list' && (
        <DocumentListScreen
          documents={documents}
          contractors={contractors}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
          onToggleSelectAll={toggleSelectAll}
          onStartSigning={handleStartSigning}
        />
      )}

      {screen === 'send' && (
        <SendStep
          unmapped={unmapped}
          mapped={mapped}
          isMappedOpen={isMappedOpen}
          onToggleMapped={setIsMappedOpen}
          showOnboarding={!hasSeenOnboarding && unmapped.length > 0}
          onDismissOnboarding={() => setHasSeenOnboarding(true)}
          hasValidationError={hasSendValidationError}
          onOpenContractor={setDrawerContractorId}
          onBack={() => setScreen('list')}
          onContinue={handleContinueFromSend}
        />
      )}

      {screen === 'sign' && (
        <SignStep
          signedByKep={signedByKep}
          signedBySms={signedBySms}
          signableCount={signable.length}
          isSmsAvailable={isSmsAvailable}
          onPickMethod={handlePickMethod}
          onBack={() => setScreen(unmapped.length > 0 ? 'send' : 'list')}
          onFinish={() => setIsFinishOpen(true)}
        />
      )}

      <OperatorPickerDrawer
        contractor={drawerContractorId ? contractorById[drawerContractorId] : null}
        isOpen={drawerContractorId !== null}
        onClose={() => setDrawerContractorId(null)}
        onSave={handleSaveOperator}
      />

      <SignMethodDrawer
        method={activeMethod}
        isOpen={signStage === 'method'}
        totalCount={batchDocuments.length}
        selectedCount={checkedIds.length}
        kepOnlyCount={kepOnlyDocuments.length}
        blockedCount={blocked.length}
        certificateId={certificateId}
        onCertificateChange={setCertificateId}
        poaId={poaId}
        onPoaChange={setPoaId}
        onOpenDocuments={() => setSignStage('documents')}
        onOpenKepOnly={() => setSignStage('kep-only')}
        onOpenBlocked={() => setSignStage('blocked')}
        onClose={handleDrawerClose}
        onSign={handleSignFromDrawer}
      />

      <SignDocumentsDrawer
        isOpen={signStage === 'documents'}
        documents={methodDocuments}
        contractorById={contractorById}
        checkedIds={checkedIds}
        onToggle={(id) =>
          setCheckedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
        }
        onToggleAll={() =>
          setCheckedIds((prev) =>
            methodDocuments.every((doc) => prev.includes(doc.id))
              ? []
              : methodDocuments.map((doc) => doc.id),
          )
        }
        onReset={() => setCheckedIds([])}
        onBack={() => setSignStage('method')}
        onSave={() => setSignStage('method')}
      />

      <KepOnlyDrawer
        isOpen={signStage === 'kep-only'}
        documents={kepOnlyDocuments}
        contractorById={contractorById}
        onBack={() => setSignStage('method')}
        onClose={handleDrawerClose}
        onSwitchToKep={() => handlePickMethod('kep')}
      />

      <SmsCodeModal
        isOpen={signStage === 'sms-codes'}
        index={smsDone + 1}
        onClose={handleDrawerClose}
        onComplete={handleSmsCodeEntered}
      />

      <FlowResultView
        isOpen={resultCount !== null}
        state="success"
        title={resultCount === 1 ? 'Документ подписан!' : 'Документы подписаны!'}
        text={
          resultCount === 1
            ? 'Контрагент увидит его в своём ЭДО'
            : 'Контрагенты увидят их в своих ЭДО'
        }
        onDone={handleResultDone}
      />

      <CannotSignDrawer
        isOpen={signStage === 'blocked' && cardDocumentId === null}
        onBack={() => setSignStage('method')}
        blocked={blocked}
        contractorById={contractorById}
        onOpenDocument={setCardDocumentId}
        onClose={handleDrawerClose}
      />

      <DocumentCardDrawer
        isOpen={cardDocumentId !== null}
        document={cardDocument}
        contractor={cardDocument ? contractorById[cardDocument.contractorId] : undefined}
        block={cardDocument ? blockOf(cardDocument) : undefined}
        isFixed={cardDocumentId !== null && fixedIds.includes(cardDocumentId)}
        onBack={() => setCardDocumentId(null)}
        onClose={() => {
          setCardDocumentId(null)
          handleDrawerClose()
        }}
        onEdit={() => cardDocumentId && setFixedIds((prev) => [...prev, cardDocumentId])}
        onSign={() => {
          if (!cardDocumentId) return
          signDocuments([cardDocumentId], 'kep')
          setCardDocumentId(null)
          closeSignFlow()
        }}
        onRemove={() => {
          if (!cardDocumentId) return
          setRemovedDocIds((prev) => [...prev, cardDocumentId])
          setCardDocumentId(null)
          handleDrawerClose()
        }}
      />

      <ActionSheet
        isOpen={isFinishOpen}
        onClose={() => setIsFinishOpen(false)}
        header={
          <ActionSheetHeader title="Точно хотите выйти на главную ЭДО? Документы, которые вы не успели подписать, нужно будет выбрать заново." />
        }
        footer={<ActionSheetFooter onClick={() => setIsFinishOpen(false)} />}
      >
        <ActionSheetButton
          title="Выйти"
          hasIcon
          icon={<ArrowRightOutgoingRectangleVertical />}
          onClick={commitAndExit}
        />
      </ActionSheet>
    </>
  )
}
