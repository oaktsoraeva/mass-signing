import { Fragment, useMemo, useState } from 'react'
import {
  Checkbox,
  Chip,
  ContextMenu,
  ContextualNotification,
  Footer,
  HeaderButton,
  NavigationBar,
  PageLayout,
  Table,
  TableCell,
  TabsCarousel,
} from '@ds'
import {
  ArrowUpUnderline,
  ChevronDown,
  DotsThreeHorizontal,
  Filters,
  Gear,
  PlusCircle,
  RequisitesT,
} from '@ds/icons'
import { StatusTag } from '../components/StatusTag'
import { SearchBar } from '../components/SearchBar'
import { ColumnStatusIcon } from '../components/ColumnStatusIcon'
import { DocumentCard } from '../components/DocumentCard'
import { FilePdfIcon } from '../components/FilePdfIcon'
import { ADAPTIVE_QUERY, useMediaQuery } from '../hooks/useMediaQuery'
import type { Contractor, DocumentRow } from '../types'

const FILTERS = ['Все', 'Входящие', 'Исходящие', 'На подпись'] as const
type Filter = (typeof FILTERS)[number]

const TABS = ['Документооборот', 'Перевозки', 'Чеки']

/** Колонки из макета: чекбокс 64 · Документ 269 · Контрагент flex · Сумма 160 · НДС/1С/файл 80 · меню 64 */
const TABLE_COLUMNS = 'var(--doc-table-columns)'

const VALIDATION_MESSAGE = 'Выберите документ, который нужно подписать'

function pluralizeDocuments(count: number) {
  const tail = count % 100
  if (tail >= 11 && tail <= 14) return 'документов'
  switch (count % 10) {
    case 1:
      return 'документ'
    case 2:
    case 3:
    case 4:
      return 'документа'
    default:
      return 'документов'
  }
}

interface DocumentListScreenProps {
  documents: DocumentRow[]
  contractors: Contractor[]
  selectedIds: string[]
  onToggleSelect: (id: string) => void
  onToggleSelectAll: (ids: string[]) => void
  onStartSigning: () => void
}

export function DocumentListScreen({
  documents,
  contractors,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onStartSigning,
}: DocumentListScreenProps) {
  const isAdaptive = useMediaQuery(ADAPTIVE_QUERY)
  const [activeTab, setActiveTab] = useState(0)
  const [filter, setFilter] = useState<Filter>('Все')
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState(false)
  /** В адаптиве чекбоксы прячутся, пока не нажали «Выбрать» */
  const [isSelecting, setIsSelecting] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  const contractorById = useMemo(
    () => Object.fromEntries(contractors.map((c) => [c.id, c])),
    [contractors],
  )

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (filter === 'На подпись' && doc.status !== 'awaiting_signature') return false
      if (query.trim()) {
        const contractorName = contractorById[doc.contractorId]?.name ?? ''
        const haystack = `${doc.title} ${doc.date} ${doc.amount} ${contractorName}`.toLowerCase()
        if (!haystack.includes(query.trim().toLowerCase())) return false
      }
      return true
    })
  }, [documents, filter, query, contractorById])

  // Выбрать можно любой документ, в том числе уже подписанный:
  // на шаге «Как подписать» он попадёт в «Не получится подписать»
  const selectableIds = useMemo(() => filteredDocuments.map((d) => d.id), [filteredDocuments])
  const allSelected =
    selectableIds.length > 0 && selectableIds.every((id) => selectedIds.includes(id))

  const handleSendTo1C = () => {
    setToast(true)
    window.setTimeout(() => setToast(false), 2500)
  }

  /**
   * Предупреждаем, только если среди выбранного нет ни одного документа,
   * ждущего подписи. Ошибки внутри документов разбираются дальше,
   * на шаге «Как подписать», — здесь они на валидацию не влияют.
   */
  const hasValidationError =
    selectedIds.length > 0 &&
    !documents.some((doc) => selectedIds.includes(doc.id) && doc.status === 'awaiting_signature')

  const handleSign = () => {
    if (hasValidationError) return
    onStartSigning()
  }

  return (
    <>
      <PageLayout
        size="l"
        topOffset={isAdaptive ? 0 : 74}
        navigationBar={
          <NavigationBar
            className="doc-nav"
            hasDescription={false}
            hasRootLink={false}
            hasActionButton={false}
            backButtonLabel="Назад"
            items={[
              { kind: 'link', label: 'Создать платёж' },
              { kind: 'link', label: 'Контрагенты' },
              { kind: 'link', label: 'Бухгалтерия' },
            ]}
            /* В адаптиве шапки банка нет — «Тарифы» переезжают в мобильную панель */
            titleVariant="none"
            rightAccessoryVariant="icon"
            rightIcon={<RequisitesT />}
            rightAriaLabel="Тарифы"
          />
        }
      >
        <div className="doc-page">
          <div className="doc-page__tabs-row">
            <TabsCarousel
              tabs={TABS.map((label) => ({ label }))}
              size="2xl"
              selectedIndex={activeTab}
              onTabChange={setActiveTab}
            />
            <HeaderButton variant="secondary" icon={<RequisitesT />}>
              Тарифы
            </HeaderButton>
          </div>

          <div className="doc-page__actions-row">
            <HeaderButton variant="primary" icon={<PlusCircle />}>
              Создать
            </HeaderButton>
            <HeaderButton variant="secondary" icon={<ArrowUpUnderline />}>
              Загрузить
            </HeaderButton>
            {/* В макете это тот же Header Button, но без подписи — цвет иконки берётся из variant */}
            <span className="doc-page__settings">
              <HeaderButton variant="secondary" icon={<Gear />}>
                <span className="visually-hidden">Настройки таблицы</span>
              </HeaderButton>
            </span>
          </div>

          {activeTab === 0 ? (
            <div className="doc-page__content">
              <div className="doc-page__toolbar">
                <button type="button" className="icon-button icon-button--32" aria-label="Фильтры">
                  {/* В макете глиф фильтров вписан в 16px, а не в 24px */}
                  <span className="ds-icon ds-icon--xs" aria-hidden="true">
                    <Filters />
                  </span>
                </button>

                {/* В адаптиве чипы фильтров не помещаются — вместо них выпадающий список */}
                {isAdaptive ? (
                  <ContextMenu
                    className="doc-page__filter-menu"
                    isOpen={isFilterMenuOpen}
                    onClose={() => setIsFilterMenuOpen(false)}
                    placement="left"
                    items={FILTERS.map((f) => ({
                      key: f,
                      label: f,
                      onClick: () => setFilter(f),
                    }))}
                    trigger={
                      <Chip variant="tab" isSelected onClick={() => setIsFilterMenuOpen((v) => !v)}>
                        <span className="doc-page__filter-chip">
                          {filter}
                          <span className="ds-icon ds-icon--xs" aria-hidden="true">
                            <ChevronDown />
                          </span>
                        </span>
                      </Chip>
                    }
                  />
                ) : (
                  FILTERS.map((f) => (
                    <Chip key={f} variant="tab" isSelected={filter === f} onClick={() => setFilter(f)}>
                      {f}
                    </Chip>
                  ))
                )}

                <div className="doc-page__search">
                  <SearchBar
                    value={query}
                    placeholder="Контрагент или номер документа"
                    onChange={setQuery}
                  />
                </div>

                {isAdaptive && (
                  <div className="doc-page__select-mode">
                    <button
                      type="button"
                      className="ts-500-m doc-page__select-all"
                      onClick={() => {
                        if (isSelecting) onToggleSelectAll(selectedIds)
                        setIsSelecting((v) => !v)
                      }}
                    >
                      {isSelecting ? 'Отменить выбор' : 'Выбрать'}
                    </button>
                    {isSelecting && (
                      <Checkbox
                        isChecked={allSelected}
                        isIndeterminate={
                          !allSelected && selectableIds.some((id) => selectedIds.includes(id))
                        }
                        onChange={() => onToggleSelectAll(selectableIds)}
                        label="Выбрать все документы"
                      />
                    )}
                  </div>
                )}
              </div>

              {isAdaptive ? (
                <div className="doc-cards">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      contractor={contractorById[doc.contractorId]}
                      isSelecting={isSelecting}
                      isChecked={selectedIds.includes(doc.id)}
                      onToggle={() => onToggleSelect(doc.id)}
                    />
                  ))}
                </div>
              ) : (
                <Table className="doc-table" gridTemplateColumns={TABLE_COLUMNS}>
                  <TableCell
                    className="doc-cell--center doc-cell--action"
                    hasTitle={false}
                    hasLeftAccessory
                    leftAccessory={
                      <Checkbox
                        isChecked={allSelected}
                        isIndeterminate={
                          !allSelected && selectableIds.some((id) => selectedIds.includes(id))
                        }
                        onChange={() => onToggleSelectAll(selectableIds)}
                        label="Выбрать все документы"
                      />
                    }
                  />
                  <TableCell title="Документ" titleStyle="500" />
                  <TableCell title="Контрагент" titleStyle="500" />
                  <TableCell className="doc-cell--right" title="Сумма" titleStyle="500" />
                  <TableCell className="doc-cell--center-text" title="НДС" titleStyle="500" />
                  <TableCell className="doc-cell--center-text" title="1С" titleStyle="500" />
                  <TableCell hasTitle={false} />
                  <TableCell hasTitle={false} />

                  {filteredDocuments.map((doc) => {
                    const contractor = contractorById[doc.contractorId]

                    return (
                      <Fragment key={doc.id}>
                        <TableCell
                          className="doc-cell--center doc-cell--action"
                          hasTitle={false}
                          hasLeftAccessory
                          leftAccessory={
                            <Checkbox
                              isChecked={selectedIds.includes(doc.id)}
                              onChange={() => onToggleSelect(doc.id)}
                              label={`Выбрать ${doc.title}`}
                            />
                          }
                        />
                        <TableCell
                          title={doc.title}
                          hasDescription
                          description={doc.date}
                          hasTag
                          tag={<StatusTag status={doc.status} />}
                        />
                        <TableCell
                          className="doc-cell--top doc-cell--wrap"
                          title={contractor?.name ?? '—'}
                          hasDescription
                          description={`ИНН: ${contractor?.inn ?? '—'}`}
                        />
                        <TableCell className="doc-cell--right" title={doc.amount} />
                        <TableCell
                          className="doc-cell--center"
                          hasTitle={false}
                          hasRightAccessory={Boolean(doc.nds)}
                          rightAccessory={doc.nds && <ColumnStatusIcon status={doc.nds.status} />}
                        />
                        <TableCell
                          className="doc-cell--center"
                          hasTitle={false}
                          hasRightAccessory={Boolean(doc.oneC)}
                          rightAccessory={doc.oneC && <ColumnStatusIcon status={doc.oneC.status} />}
                        />
                        <TableCell
                          className="doc-cell--center"
                          hasTitle={false}
                          hasRightAccessory
                          rightAccessory={<FilePdfIcon />}
                        />
                        <TableCell
                          className="doc-cell--center"
                          hasTitle={false}
                          hasRightAccessory
                          rightAccessory={
                            <span className="ds-icon ds-icon--m doc-cell__menu" aria-hidden="true">
                              <DotsThreeHorizontal />
                            </span>
                          }
                        />
                      </Fragment>
                    )
                  })}
                </Table>
              )}
            </div>
          ) : (
            <div className="doc-page__placeholder">
              <p className="ts-400-m">Раздел не реализован в прототипе.</p>
            </div>
          )}
        </div>
      </PageLayout>

      {selectedIds.length > 0 && (
        <Footer
          className={hasValidationError ? 'doc-footer doc-footer--error' : 'doc-footer'}
          /* В адаптиве кнопки в колонку, «Подписать и отправить» сверху */
          layout="2-buttons-in-line"
          description={
            hasValidationError
              ? VALIDATION_MESSAGE
              : `Выбрано ${selectedIds.length} ${pluralizeDocuments(selectedIds.length)}`
          }
          secondaryAction={{ label: 'Отправить в 1С', onClick: handleSendTo1C }}
          primaryAction={{ label: 'Подписать и отправить', onClick: handleSign }}
        />
      )}

      {toast && (
        <div className="doc-page__toast">
          <ContextualNotification
            text="Демо-функция: интеграция с 1С вне рамок прототипа"
            hasTitle
            title="Отправлено в 1С"
            hasCloseIcon
            onClose={() => setToast(false)}
          />
        </div>
      )}
    </>
  )
}
