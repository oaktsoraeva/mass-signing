import React, { useState } from 'react';
import {
    ActionSheet,
    ActionSheetButton,
    ActionSheetFooter,
    ActionSheetHeader,
    Alert,
    Button,
    Cell,
    Drawer,
    DrawerFooter,
    DrawerHeader,
    DrawerHeaderTitle,
    Dropdown,
    FlowResultView,
    Modal,
    ModalFooter,
    ModalHeader,
    NavigationBar,
    PageLayout,
    Switch,
} from '../../src';
import type { FlowResultViewItem } from '../../src';
import { Circle } from '../../src/icons';
import type { AlertType, AlertTextAlign, PageLayoutProps } from '../../src';

export const OverlaysPreview: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerBackButtonVisible, setIsDrawerBackButtonVisible] = useState(true);
    const [isDrawerFooterDescriptionVisible, setIsDrawerFooterDescriptionVisible] = useState(true);
    const [drawerFooterLayout, setDrawerFooterLayout] = useState<'1-button' | '2-buttons' | '2-horizontal-buttons' | 'empty'>('2-horizontal-buttons');
    const [isDrawerPrimarySelected, setIsDrawerPrimarySelected] = useState(true);
    const [isDrawerSecondarySelected, setIsDrawerSecondarySelected] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalBackButtonVisible, setIsModalBackButtonVisible] = useState(false);
    const [isModalLongContent, setIsModalLongContent] = useState(false);
    const [isModalFooterDescriptionVisible, setIsModalFooterDescriptionVisible] = useState(false);
    const [modalFooterLayout, setModalFooterLayout] = useState<'none' | '1-button' | '2-buttons' | '2-horizontal-buttons'>('1-button');
    const [isModalPrimarySelected, setIsModalPrimarySelected] = useState(true);
    const [isModalSecondarySelected, setIsModalSecondarySelected] = useState(false);
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
    const [isActionSheetMultiAction, setIsActionSheetMultiAction] = useState(false);
    const [isActionSheetHeaderVisible, setIsActionSheetHeaderVisible] = useState(true);
    const [isActionSheetDanger, setIsActionSheetDanger] = useState(false);
    const [isActionSheetIconVisible, setIsActionSheetIconVisible] = useState(false);
    const [isActionSheetDescriptionVisible, setIsActionSheetDescriptionVisible] = useState(false);

    // FlowResultView demo
    const [frvIsOpen, setFrvIsOpen] = useState(false);
    const [frvState, setFrvState] = useState<'neutral' | 'success' | 'error'>('neutral');
    const [frvItemsCount, setFrvItemsCount] = useState(3);

    const frvStateOptions: { value: 'neutral' | 'success' | 'error'; label: string }[] = [
        { value: 'neutral', label: 'Neutral' },
        { value: 'success', label: 'Success' },
        { value: 'error', label: 'Error' },
    ];

    const frvAllItems: FlowResultViewItem[] = [
        { title: 'Сохранить квитанцию', onClick: () => {} },
        { title: 'Повторить платёж', onClick: () => {} },
        { title: 'Перейти к деталям', onClick: () => {} },
        { title: 'Связаться с поддержкой', onClick: () => {} },
        { title: 'Вернуться на главную', onClick: () => {} },
    ];

    // Alert preview
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<AlertType>('success');
    const [alertTextAlign, setAlertTextAlign] = useState<AlertTextAlign>('left');

    // PageLayout preview
    const [isPageLayoutOpen, setIsPageLayoutOpen] = useState(false);
    const [pageLayoutSize, setPageLayoutSize] = useState<PageLayoutProps['size']>('m');
    const [hasRightPanel, setHasRightPanel] = useState(false);

    const demoIcon = <Circle />;

    const drawerFooter = (
        <DrawerFooter
            layout={drawerFooterLayout}
            description={isDrawerFooterDescriptionVisible ? 'Description' : undefined}
            primaryAction={{
                label: 'Primary',
                isSelected: isDrawerPrimarySelected,
                onClick: () => {
                    setIsDrawerPrimarySelected(true);
                    setIsDrawerSecondarySelected(false);
                },
            }}
            secondaryAction={drawerFooterLayout === '1-button' ? undefined : {
                label: 'Secondary',
                isSelected: isDrawerSecondarySelected,
                onClick: () => {
                    setIsDrawerPrimarySelected(false);
                    setIsDrawerSecondarySelected(true);
                },
            }}
        />
    );

    const modalFooter = modalFooterLayout === 'none'
        ? undefined
        : (
            <ModalFooter
                layout={modalFooterLayout}
                description={isModalFooterDescriptionVisible ? 'Description' : undefined}
                primaryAction={{
                    label: 'Primary',
                    isSelected: isModalPrimarySelected,
                    onClick: () => {
                        setIsModalPrimarySelected(true);
                        setIsModalSecondarySelected(false);
                    },
                }}
                secondaryAction={modalFooterLayout === '1-button' ? undefined : {
                    label: 'Secondary',
                    isSelected: isModalSecondarySelected,
                    onClick: () => {
                        setIsModalPrimarySelected(false);
                        setIsModalSecondarySelected(true);
                    },
                }}
            />
        );

    const modalParagraphs = isModalLongContent
        ? Array.from({ length: 12 }, (_, index) => (
            <p key={`modal-long-paragraph-${index}`} className="components-preview__modal-text ts-400-m">
                Long modal content paragraph {index + 1}. This block is used to check internal scrolling, content clipping and compact header state while the footer remains fixed.
            </p>
        ))
        : (
            <>
                <p className="components-preview__modal-text ts-400-m">
                    Short modal content for the default state.
                </p>
                <div className="components-preview__modal-placeholder" />
            </>
        );

    const actionSheetButtons = (isActionSheetMultiAction
        ? [
            { key: 'primary', title: 'Основное действие', description: 'Описание действия' },
            { key: 'secondary', title: 'Дополнительное действие', description: 'Описание действия' },
            { key: 'tertiary', title: 'Ещё действие', description: 'Описание действия' },
        ]
        : [
            { key: 'primary', title: 'Основное действие', description: 'Описание действия' },
        ]
    ).map((item) => (
        <ActionSheetButton
            key={item.key}
            title={item.title}
            description={item.description}
            hasDescription={isActionSheetDescriptionVisible}
            icon={demoIcon}
            hasIcon={isActionSheetIconVisible}
            variant={isActionSheetDanger ? 'danger' : 'default'}
            onClick={() => setIsActionSheetOpen(false)}
        />
    ));

    const alertTypeLabel: Record<typeof alertType, string> = {
        'success': 'Success', 'error': 'Error', 'neutral': 'Neutral',
    };
    const pageSizeLabel: Record<NonNullable<typeof pageLayoutSize>, string> = {
        's': 'S — 720px', 'm': 'M — 870px', 'l': 'L — 1120px',
    };

    return (
        <div className="tab-panel is-active">
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Drawer</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Кнопка назад</span>
                                <Switch
                                    label="Кнопка назад"
                                    isSelected={isDrawerBackButtonVisible}
                                    onChange={setIsDrawerBackButtonVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    label="Description"
                                    isSelected={isDrawerFooterDescriptionVisible}
                                    onChange={setIsDrawerFooterDescriptionVisible}
                                />
                            </div>
                        </div>

                        <Dropdown
                            label="Футер"
                            value={drawerFooterLayout}
                            hasHelpIcon={false}
                        >
                            {(['1-button', '2-buttons', '2-horizontal-buttons', 'empty'] as const).map(v => (
                                <Cell key={v} title={v} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setDrawerFooterLayout(v)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Button className="components-preview__drawer-trigger" onClick={() => setIsDrawerOpen(true)}>
                            Open Drawer
                        </Button>
                    </div>
                </div>

                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    header={(
                        <DrawerHeader
                            title={<DrawerHeaderTitle variant="text-m">Drawer Title</DrawerHeaderTitle>}
                            hasDefaultBackArrow={isDrawerBackButtonVisible}
                            onLeftAccessoryClick={isDrawerBackButtonVisible ? () => setIsDrawerOpen(false) : undefined}
                            onClose={() => setIsDrawerOpen(false)}
                        />
                    )}
                    footer={drawerFooter}
                >
                    <div className="components-preview__drawer-body">
                        <div className="components-preview__drawer-placeholder" />
                    </div>
                </Drawer>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Action Sheet</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Текст в хедере</span>
                                <Switch
                                    label="Текст в хедере"
                                    isSelected={isActionSheetHeaderVisible}
                                    onChange={setIsActionSheetHeaderVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Несколько кнопок</span>
                                <Switch
                                    label="Несколько кнопок"
                                    isSelected={isActionSheetMultiAction}
                                    onChange={setIsActionSheetMultiAction}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Иконка</span>
                                <Switch
                                    label="Иконка"
                                    isSelected={isActionSheetIconVisible}
                                    onChange={setIsActionSheetIconVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Дескриптор</span>
                                <Switch
                                    label="Дескриптор"
                                    isSelected={isActionSheetDescriptionVisible}
                                    onChange={setIsActionSheetDescriptionVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Danger состояние</span>
                                <Switch
                                    label="Danger состояние"
                                    isSelected={isActionSheetDanger}
                                    onChange={setIsActionSheetDanger}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="preview-stage">
                        <Button className="components-preview__action-sheet-trigger" onClick={() => setIsActionSheetOpen(true)}>
                            Open Action Sheet
                        </Button>
                    </div>
                </div>

                <ActionSheet
                    isOpen={isActionSheetOpen}
                    onClose={() => setIsActionSheetOpen(false)}
                    header={(
                        <ActionSheetHeader
                            title="Action Sheet Title"
                            description="Description"
                            hasContent={isActionSheetHeaderVisible}
                        />
                    )}
                    footer={<ActionSheetFooter onClick={() => setIsActionSheetOpen(false)} />}
                >
                    <div className="components-preview__action-sheet-body">
                        {actionSheetButtons}
                    </div>
                </ActionSheet>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Modal</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Кнопка назад</span>
                                <Switch
                                    label="Кнопка назад"
                                    isSelected={isModalBackButtonVisible}
                                    onChange={setIsModalBackButtonVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Длинный контентt</span>
                                <Switch
                                    label="Длинный контент"
                                    isSelected={isModalLongContent}
                                    onChange={setIsModalLongContent}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Дескриптор в футере</span>
                                <Switch
                                    label="Дескриптор в футере"
                                    isSelected={isModalFooterDescriptionVisible}
                                    onChange={setIsModalFooterDescriptionVisible}
                                />
                            </div>
                        </div>

                        <Dropdown
                            label="Футер"
                            value={modalFooterLayout}
                            hasHelpIcon={false}
                        >
                            {(['none', '1-button', '2-buttons', '2-horizontal-buttons'] as const).map(v => (
                                <Cell key={v} title={v} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setModalFooterLayout(v)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Button className="components-preview__modal-trigger" onClick={() => setIsModalOpen(true)}>
                            Open Modal
                        </Button>
                    </div>
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    header={(
                        <ModalHeader
                            title="Modal Title"
                            hasDefaultBackArrow={isModalBackButtonVisible}
                            onLeftAccessoryClick={isModalBackButtonVisible ? () => setIsModalOpen(false) : undefined}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                    footer={modalFooter}
                >
                    <div className="components-preview__modal-body">
                        {modalParagraphs}
                    </div>
                </Modal>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Alert</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <Dropdown
                            label="Тип"
                            value={alertTypeLabel[alertType]}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 'success', label: 'Success' },
                                { value: 'error', label: 'Error' },
                                { value: 'neutral', label: 'Neutral' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setAlertType(opt.value)} />
                            ))}
                        </Dropdown>
                        <Dropdown
                            label="Выравнивание"
                            value={alertTextAlign === 'left' ? 'Left' : 'Center'}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 'left', label: 'Left' },
                                { value: 'center', label: 'Center' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setAlertTextAlign(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Button onClick={() => setIsAlertVisible(true)}>
                            Show Alert
                        </Button>
                    </div>
                </div>

                {isAlertVisible && (
                    <Alert type={alertType} textAlign={alertTextAlign} onHide={() => setIsAlertVisible(false)}>
                        Короткое текстовое уведомление об успехе, ошибке или нейтральном статусе
                    </Alert>
                )}
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Page Layout</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Right Panel (только size S)</span>
                                <Switch
                                    label="Right Panel"
                                    isSelected={hasRightPanel}
                                    onChange={setHasRightPanel}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="Size"
                            value={pageLayoutSize ? pageSizeLabel[pageLayoutSize] : undefined}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 's', label: 'S — 720px' },
                                { value: 'm', label: 'M — 870px' },
                                { value: 'l', label: 'L — 1120px' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setPageLayoutSize(opt.value as PageLayoutProps['size'])} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Button onClick={() => setIsPageLayoutOpen(true)}>
                            Open Page Layout
                        </Button>
                    </div>
                </div>
            </section>

            {isPageLayoutOpen && (
                <div className="page-layout-preview-overlay">
                    <PageLayout
                        size={pageLayoutSize}
                        navigationBar={(
                            <NavigationBar
                                title="Заголовок страницы"
                                description="Text XS"
                                rootLinkLabel="Раздел"
                                hasActionButton={false}
                                onBackClick={() => setIsPageLayoutOpen(false)}
                                titleVariant="title"
                                rightAccessoryVariant="none"
                                items={[
                                    { kind: 'link', label: 'Ссылка 1' },
                                    { kind: 'link', label: 'Ссылка 2' },
                                    { kind: 'link', label: 'Ссылка 3' },
                                ]}
                            />
                        )}
                        rightPanel={hasRightPanel ? (
                            <div>
                                <div className="page-layout-preview__right-panel-placeholder" />
                            </div>
                        ) : undefined}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4x)' }}>
                            {Array.from({ length: 6 }, (_, i) => (
                                <div
                                    key={i}
                                    className="page-layout-preview__placeholder-block"
                                    style={{ height: `${80 + i * 24}px` }}
                                />
                            ))}
                        </div>
                    </PageLayout>
                </div>
            )}

            {/* FlowResultView */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Flow Result View</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <Dropdown label="State" value={frvStateOptions.find(o => o.value === frvState)?.label} hasHelpIcon={false}>
                            {frvStateOptions.map(opt => (
                                <Cell
                                    key={opt.value}
                                    title={opt.label}
                                    hasLeftAccessory={false}
                                    hasRightAccessory={false}
                                    onClick={() => setFrvState(opt.value)}
                                />
                            ))}
                        </Dropdown>
                        <Dropdown label="Links" value={String(frvItemsCount)} hasHelpIcon={false}>
                            {[0, 1, 2, 3, 4, 5].map(n => (
                                <Cell
                                    key={n}
                                    title={String(n)}
                                    hasLeftAccessory={false}
                                    hasRightAccessory={false}
                                    onClick={() => setFrvItemsCount(n)}
                                />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Button onClick={() => setFrvIsOpen(true)}>
                            Open Flow Result View
                        </Button>
                    </div>
                </div>

                <FlowResultView
                    isOpen={frvIsOpen}
                    onDone={() => setFrvIsOpen(false)}
                    state={frvState}
                    title="Платёж отправлен"
                    text={
                        <>
                            <p>Деньги поступят на счёт получателя в течение 1–3 рабочих дней.</p>
                            <p style={{ marginTop: 'var(--spacing-2x)' }}>Квитанция отправлена на вашу почту.</p>
                        </>
                    }
                    items={frvAllItems.slice(0, frvItemsCount)}
                />
            </section>
        </div>
    );
};
