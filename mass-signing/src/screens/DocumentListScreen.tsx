import { Fragment, useMemo, useState } from 'react'
import {
  Checkbox,
  Chip,
  ContextualNotification,
  Footer,
  HeaderButton,
  NavigationBar,
  PageLayout,
  Table,
  TableCell,
  TabsCarousel,
} from '@ds'
import { ArrowUpUnderline, DotsThreeHorizontal, Filters, Gear, PlusCircle, RequisitesT } from '@ds/icons'
import { StatusTag } from '../components/StatusTag'
import { SearchBar } from '../components/SearchBar'
import { ColumnStatusIcon } from '../components/ColumnStatusIcon'
import { FilePdfIcon } from '../components/FilePdfIcon'
import type { Contractor, DocumentRow } from '../types'

const FILTERS = ['Все', 'Входящие', 'Исходящие', 'На подпись'] as const
type Filter = (typeof FILTERS)[number]

const TABS = ['Документооборот', 'Перевозки', 'Чеки']

/** Колонки из макета: чекбокс 64 · Документ 269 · Контрагент flex · Сумма 160 · НДС/1С/файл 80 · меню 64 */
const TABLE_COLUMNS = 'var(--doc-table-columns)'

const VALIDATION_MESSAGE = 'Выберите хотя бы 1 документ на подпись'

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
  const [activeTab, setActiveTab] = useState(0)
  const [filter, setFilter] = useState<Filter>('Все')
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState(false)

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
        topOffset={74}
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
                {FILTERS.map((f) => (
                  <Chip key={f} variant="tab" isSelected={filter === f} onClick={() => setFilter(f)}>
                    {f}
                  </Chip>
                ))}
                <div className="doc-page__search">
                  <SearchBar
                    value={query}
                    placeholder="Контрагент или номер документа"
                    onChange={setQuery}
                  />
                </div>
              </div>

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
                        hasRightAccessory={Boolean(doc.ndsStatus)}
                        rightAccessory={doc.ndsStatus && <ColumnStatusIcon status={doc.ndsStatus} />}
                      />
                      <TableCell
                        className="doc-cell--center"
                        hasTitle={false}
                        hasRightAccessory={Boolean(doc.oneCStatus)}
                        rightAccessory={doc.oneCStatus && <ColumnStatusIcon status={doc.oneCStatus} />}
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
          layout="2-buttons-in-line"
          description={
            hasValidationError
              ? VALIDATION_MESSAGE
              : `Выбрано ${selectedIds.length} ${pluralizeDocuments(selectedIds.length)}`
          }
          secondaryAction={{ label: 'Отправить в 1С', onClick: handleSendTo1C }}
          primaryAction={{ label: 'Подписать', onClick: handleSign }}
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
