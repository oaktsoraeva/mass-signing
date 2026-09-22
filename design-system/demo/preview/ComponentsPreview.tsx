import React, { useState } from 'react';
import {
    AccordeonCell,
    ActionFormCell,
    Chip,
    Avatar,
    Cell,
    Checkbox,
    ContextMenu,
    ContextualNotification,
    Dropdown,
    FeedbackBanner,
    FormCell,
    Input,
    PageAction,
    Radio,
    NavigationBar,
    MainPageNavigationBar,
    Spinner,
    Switch,
    Table,
    TableCell,
    TabsCarousel,
    Tag,
    TextArea,
    Tooltip,
    Widget,
    WidgetTitleAccessory,
    Footer,
} from '../../src';
import {
    AppIconTSquare,
    ArrowLeft,
    Bell,
    ChevronRight,
    Circle,
    DotsThreeHorizontal,
    LayerOnLayerRectangleVertical,
    Pencil,
    Plus,
    Trash,
} from '../../src/icons';
import type { FooterLayout, CellRightAccessoryVariant } from '../../src';

export const ComponentsPreview: React.FC = () => {
    const [baseTextAreaValue, setBaseTextAreaValue] = useState('');
    const [descriptionTextAreaValue, setDescriptionTextAreaValue] = useState('');
    const [errorTextAreaValue, setErrorTextAreaValue] = useState('');
    const [singleSwitchSelected, setSingleSwitchSelected] = useState(true);
    const [singleCheckboxSelected, setSingleCheckboxSelected] = useState(true);
    const [singleRadioSelected, setSingleRadioSelected] = useState(true);
    const [groupSwitchStates, setGroupSwitchStates] = useState([true, false, true]);
    const [groupCheckboxStates, setGroupCheckboxStates] = useState([true, false, true]);
    const [groupRadioSelectedIndex, setGroupRadioSelectedIndex] = useState(0);
    const [actionFormCellClickCount, setActionFormCellClickCount] = useState(0);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const [contextMenuPlacement, setContextMenuPlacement] = useState<'right' | 'left'>('right');
    const [tooltipPlacement, setTooltipPlacement] = useState<'right' | 'left'>('right');
    const [isTooltipLongText, setIsTooltipLongText] = useState(false);
    const [isWidgetDescriptionVisible, setIsWidgetDescriptionVisible] = useState(true);
    const [isWidgetChevronVisible, setIsWidgetChevronVisible] = useState(true);
    const [isFeedbackBannerSecondaryVisible, setIsFeedbackBannerSecondaryVisible] = useState(true);
    const [isFooterDescriptionVisible, setIsFooterDescriptionVisible] = useState(true);
    const [footerLayout, setFooterLayout] = useState<FooterLayout>('3-buttons');
    const [widgetAccessoryVariant, setWidgetAccessoryVariant] = useState<'icon' | 'link' | 'link-icon' | 'icon-icon' | 'description' | 'editing-mode' | 'none'>('icon');

    // TabsCarousel demo
    const [tcSize, setTcSize] = useState<'xl' | '2xl'>('xl');
    const [tcHasActionTabs, setTcHasActionTabs] = useState(true);
    const [tcSelectedIndex, setTcSelectedIndex] = useState(0);
    const [tcHasBadge, setTcHasBadge] = useState(true);

    // PageAction demo
    const [paVariant, setPaVariant] = useState<'default' | 'danger'>('default');
    const [paHasDescription, setPaHasDescription] = useState(true);
    const [paHasLeftAccessory, setPaHasLeftAccessory] = useState(true);
    const [paIsDisabled, setPaIsDisabled] = useState(false);

    // AccordeonCell demo
    const [acSize, setAcSize] = useState<'xl' | '2xl'>('xl');
    const [acChevronPosition, setAcChevronPosition] = useState<'title' | 'edge'>('title');
    const [acHasDescription, setAcHasDescription] = useState(true);
    const [acHasRightAccessory, setAcHasRightAccessory] = useState(true);
    const [acRightAccessoryVariant, setAcRightAccessoryVariant] = useState<CellRightAccessoryVariant>('text-m');
    const [acContentSpacing, setAcContentSpacing] = useState<'0' | '0-5x' | '1x' | '2x' | '4x' | '6x'>('4x');
    const [acListSpacing, setAcListSpacing] = useState<'0' | '0-5x' | '1x' | '2x' | '4x' | '6x'>('2x');
    const [acIsOpen, setAcIsOpen] = useState(true);

    // Table Cell demo
    const [tcHasTitle, setTcHasTitle] = useState(true);
    const [tcHasDescription, setTcHasDescription] = useState(false);
    const [tcHasTag, setTcHasTag] = useState(false);
    const [tcTitleStyle, setTcTitleStyle] = useState<'400' | '500' | '600'>('400');
    const [tcHasLeftAccessory, setTcHasLeftAccessory] = useState(false);
    const [tcHasRightAccessory, setTcHasRightAccessory] = useState(false);
    const [tcIsEdit, setTcIsEdit] = useState(false);
    const [tcTitle, setTcTitle] = useState('Title');
    const [tcIsDisabled, setTcIsDisabled] = useState(false);
    const [tcIsError, setTcIsError] = useState(false);

    // Contextual Notification demo
    const [cnHasTitle, setCnHasTitle] = useState(true);
    const [cnHasCloseIcon, setCnHasCloseIcon] = useState(true);
    const [cnHasAction, setCnHasAction] = useState(true);
    const [cnHasSpinner, setCnHasSpinner] = useState(true);
    const [cnAccessory, setCnAccessory] = useState<'icon' | 'avatar'>('icon');
    const [cnSize, setCnSize] = useState<'s' | 'm'>('s');

    // Navigation Bar demo
    const [isAdaptiveDemo, setIsAdaptiveDemo] = useState(false);
    const [demoHasRootLink, setDemoHasRootLink] = useState(true);
    const [demoHasDescription, setDemoHasDescription] = useState(true);
    const [demoHasItems, setDemoHasItems] = useState(true);
    const [demoItemsType, setDemoItemsType] = useState<'links' | 'steps'>('links');
    const [demoHasActionButton, setDemoHasActionButton] = useState(true);
    const [demoCurrentStep, setDemoCurrentStep] = useState(1);
    const [demoTitleVariant, setDemoTitleVariant] = useState<'none' | 'title' | 'title-description' | 'step-progress' | 'percent-progress' | 'image'>('title');
    const [demoRightVariant, setDemoRightVariant] = useState<'none' | 'icon' | 'icon-icon' | 'icon-badge' | 'action'>('icon');
    const [demoLeftIconType, setDemoLeftIconType] = useState<'arrow' | 'bell' | 'dots'>('arrow');

    const navBarLeftIconMap = {
        arrow: <ArrowLeft />,
        bell: <Bell />,
        dots: <DotsThreeHorizontal />,
    };

    const navBarDesktopLinks = [
        { kind: 'link' as const, label: 'Text S' },
        { kind: 'link' as const, label: 'Text S' },
        { kind: 'link' as const, label: 'Text S' },
    ];

    const navBarStepLabels = ['Шаг 1', 'Шаг 2', 'Шаг 3', 'Шаг 4'];
    const navBarDesktopSteps = navBarStepLabels.map((label, index) => {
        const stepNumber = index + 1;
        if (stepNumber < demoCurrentStep) {
            return { kind: 'step' as const, label, state: 'completed' as const, onClick: () => setDemoCurrentStep(stepNumber) };
        }
        if (stepNumber === demoCurrentStep) {
            return { kind: 'step' as const, label, state: 'current' as const };
        }
        return { kind: 'step' as const, label, state: 'upcoming' as const };
    });
    const demoIcon = <Circle />;

    const accessoryIcon24 = (
        <span className="ds-icon ds-icon--m" aria-hidden="true">
            {demoIcon}
        </span>
    );

    const accessoryIcon30 = (
        <span className="ds-icon ds-icon--30" aria-hidden="true">
            {demoIcon}
        </span>
    );

    const accessoryAvatarS = (
        <Avatar
            size="s"
            shape="circle"
            style={{ '--avatar-surface': 'var(--bg-neutral-1)', '--avatar-color': 'var(--primitive-secondary)' } as React.CSSProperties}
            icon={demoIcon}
        />
    );

    const formCellLeftAccessory = (
        <Avatar
            size="s"
            shape="circle"
            style={{ '--avatar-surface': 'var(--bg-neutral-1)', '--avatar-color': 'var(--primitive-secondary)' } as React.CSSProperties}
            icon={demoIcon}
        />
    );

    const actionFormCellLeftAccessory = (
        <span className="ds-icon ds-icon--m" aria-hidden="true">
            {demoIcon}
        </span>
    );

    const actionFormCellLoader = <Spinner className="action-form-cell__spinner" />;
    const handleActionFormCellClick = () => {
        setActionFormCellClickCount((count) => count + 1);
    };

    const toggleGroupSwitch = (index: number, nextValue: boolean) => {
        setGroupSwitchStates((current) => current.map((value, currentIndex) => (
            currentIndex === index ? nextValue : value
        )));
    };

    const toggleGroupCheckbox = (index: number, nextValue: boolean) => {
        setGroupCheckboxStates((current) => current.map((value, currentIndex) => (
            currentIndex === index ? nextValue : value
        )));
    };

    const contextMenuItems = [
        {
            key: 'edit',
            label: 'Редактировать',
            icon: <Pencil />,
            variant: 'default' as const,
            onClick: () => setIsContextMenuOpen(false),
        },
        {
            key: 'duplicate',
            label: 'Дублировать',
            icon: <LayerOnLayerRectangleVertical />,
            variant: 'default' as const,
            onClick: () => setIsContextMenuOpen(false),
        },
        {
            key: 'delete',
            label: 'Удалить',
            icon: <Trash />,
            variant: 'danger' as const,
            onClick: () => setIsContextMenuOpen(false),
        },
    ];

    const tooltipContent = isTooltipLongText
        ? (
            <>
                <p>Текст S</p>
                <p>Дополнительный абзац помогает проверить перенос строк и вертикальный ритм внутри подсказки.</p>
                <p>Лонгриды лучше не использовать, но несколько абзацев компонент поддерживает без ограничений.</p>
            </>
        )
        : 'Текст S';

    const itemsTypeLabel = demoItemsType === 'links' ? 'Links' : 'Steps';
    const titleVariantLabel: Record<typeof demoTitleVariant, string> = {
        'none': 'None', 'title': 'Title', 'title-description': 'Title + Description',
        'step-progress': 'Step Progress', 'percent-progress': 'Percent Progress', 'image': 'Image',
    };
    const rightVariantLabel: Record<typeof demoRightVariant, string> = {
        'none': 'None', 'icon': 'Icon', 'icon-icon': 'Icon + Icon', 'icon-badge': 'Icon + Badge', 'action': 'Action',
    };
    const leftIconLabel: Record<typeof demoLeftIconType, string> = {
        'arrow': 'Arrow Left', 'bell': 'Bell', 'dots': 'Dots',
    };
    const footerLayoutLabel: Record<typeof footerLayout, string> = {
        '1-button': '1 Button', '2-buttons-in-line': '2 Buttons In Line', '3-buttons': '3 Buttons',
        'page-control-button': 'Page Control + Button', 'stepper-button': 'Stepper + Button',
    };
    const widgetAccessoryLabel: Record<typeof widgetAccessoryVariant, string> = {
        'icon': 'Icon', 'link': 'Link', 'link-icon': 'Link + Icon', 'icon-icon': 'Icon + Icon',
        'description': 'Description', 'editing-mode': 'Editing Mode', 'none': 'None',
    };

    return (
        <div className="tab-panel is-active">
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '120px', '--cols': 3, '--col-w': '335px' } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Fields</h1>
                    <div className="preview-grid__header ts-500-m">Input</div>
                    <div className="preview-grid__header ts-500-m">TextArea</div>
                    <div className="preview-grid__header ts-500-m">Dropdown</div>

                    <div className="preview-grid__label ts-500-m">Base</div>
                    <Input label="Label" placeholder="Placeholder" right={accessoryIcon24}
                        hasHelpIcon helpText="Подсказка для поля ввода" />
                    <TextArea
                        label="Label"
                        placeholder="Placeholder"
                        value={baseTextAreaValue}
                        onChange={setBaseTextAreaValue}
                        maxLength={200}
                        hasHelpIcon
                        helpText="Подсказка для текстового поля"
                    />
                    <Dropdown label="Label" hasHelpIcon helpText="Подсказка для дропдауна">
                        <Cell title="Option 1" hasLeftAccessory={false} hasRightAccessory={false} />
                        <Cell title="Option 2" hasLeftAccessory={false} hasRightAccessory={false} />
                    </Dropdown>

                    <div className="preview-grid__label ts-500-m">Description</div>
                    <Input label="Label" placeholder="Placeholder" description="Helper text" right={accessoryIcon30} />
                    <TextArea
                        label="Label"
                        placeholder="Placeholder"
                        description="Helper text"
                        value={descriptionTextAreaValue}
                        onChange={setDescriptionTextAreaValue}
                        maxLength={200}
                    />
                    <Dropdown label="Label" description="Helper text">
                        <Cell title="Option 1" hasLeftAccessory={false} hasRightAccessory={false} />
                        <Cell title="Option 2" hasLeftAccessory={false} hasRightAccessory={false} />
                    </Dropdown>

                    <div className="preview-grid__label ts-500-m">Error</div>
                    <Input label="Label" placeholder="Placeholder" isError errorMessage="Error message" right={accessoryAvatarS} />
                    <TextArea
                        label="Label"
                        placeholder="Placeholder"
                        isError
                        errorMessage="Error message"
                        value={errorTextAreaValue}
                        onChange={setErrorTextAreaValue}
                        maxLength={200}
                    />
                    <Dropdown
                        label="Label"
                        isError
                        errorMessage="Error message"
                        right={accessoryAvatarS}
                    >
                        <Cell title="Option 1" hasLeftAccessory={false} hasRightAccessory={false} />
                        <Cell title="Option 2" hasLeftAccessory={false} hasRightAccessory={false} />
                    </Dropdown>

                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <Input label="Label" placeholder="Placeholder" isDisabled />
                    <TextArea
                        label="Label"
                        placeholder="Placeholder"
                        value={errorTextAreaValue}
                        onChange={setErrorTextAreaValue}
                        maxLength={200}
                        isDisabled
                    />
                    <Dropdown
                        label="Label"
                        isDisabled
                        right={accessoryAvatarS}
                        hasChevron={false}
                    >
                        <Cell title="Option 1" hasLeftAccessory={false} hasRightAccessory={false} />
                        <Cell title="Option 2" hasLeftAccessory={false} hasRightAccessory={false} />
                    </Dropdown>

                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Accordeon Cell</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch label="Description" isSelected={acHasDescription} onChange={setAcHasDescription} />
                            </div>
                        </div>
                        <Dropdown label="Size" value={acSize.toUpperCase()} hasHelpIcon={false}>
                            {([
                                { value: 'xl', label: 'XL' },
                                { value: '2xl', label: '2XL' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setAcSize(opt.value)} />
                            ))}
                        </Dropdown>
                        <Dropdown label="Chevron" value={acChevronPosition === 'title' ? 'Title' : 'Edge'} hasHelpIcon={false}>
                            {([
                                { value: 'title', label: 'Title' },
                                { value: 'edge', label: 'Edge' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setAcChevronPosition(opt.value)} />
                            ))}
                        </Dropdown>
                        <div className="preview-cell-switches">
                            {acChevronPosition === 'title' && (
                                <div className="preview-cell-switches__item">
                                    <span className="ts-500-m">Right Accessory</span>
                                    <Switch label="Right Accessory" isSelected={acHasRightAccessory} onChange={setAcHasRightAccessory} />
                                </div>
                            )}
                        </div>
                        {acChevronPosition === 'title' && acHasRightAccessory && (
                            <Dropdown label="Right Accessory" value={acRightAccessoryVariant} hasHelpIcon={false}>
                                {([
                                    'text-m', 'text-l', 'text-s', 'badge', 'disclosure',
                                    'text-l-disclosure', 'text-s-disclosure', 'badge-disclosure',
                                    'icon-24', 'icon-30', 'switch', 'checkbox', 'radio',
                                ] as CellRightAccessoryVariant[]).map(v => (
                                    <Cell key={v} title={v} hasLeftAccessory={false} hasRightAccessory={false}
                                        onClick={() => setAcRightAccessoryVariant(v)} />
                                ))}
                            </Dropdown>
                        )}
                    </div>

                    <div className="preview-stage">
                        <AccordeonCell
                            title={acSize === 'xl' ? 'Текст XL' : 'Текст 2XL'}
                            description="Text S"
                            size={acSize}
                            chevronPosition={acChevronPosition}
                            hasDescription={acHasDescription}
                            hasRightAccessory={acHasRightAccessory}
                            rightAccessoryVariant={acRightAccessoryVariant}
                            rightAccessoryText="Text M"
                            isOpen={acIsOpen}
                            onOpenChange={setAcIsOpen}
                            contentSpacing={acContentSpacing}
                            listSpacing={acListSpacing}
                        >
                            <span className="accordeon-cell-preview__item ts-400-m">Первый элемент</span>
                            <span className="accordeon-cell-preview__item ts-400-m">Второй элемент</span>
                            <span className="accordeon-cell-preview__item ts-400-m">Третий элемент</span>
                        </AccordeonCell>
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '120px', '--cols': 2, '--col-w': '335px' } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Action Form Cell</h1>
                    <div className="preview-grid__header ts-500-m">Text</div>
                    <div className="preview-grid__header ts-500-m">Text + Description</div>

                    <div className="preview-grid__label ts-500-m">Single</div>
                    <ActionFormCell title="Text" left={actionFormCellLeftAccessory} onClick={handleActionFormCellClick} />
                    <ActionFormCell title="Text" description="Description" left={actionFormCellLeftAccessory} right={actionFormCellLoader} onClick={handleActionFormCellClick} />

                    <div className="preview-grid__label ts-500-m">Group</div>
                    <div className="preview-stack-group">
                        <ActionFormCell title="Text" left={actionFormCellLeftAccessory} variant="stack-top" onClick={handleActionFormCellClick} />
                        <ActionFormCell title="Text" left={actionFormCellLeftAccessory} variant="stack-middle" onClick={handleActionFormCellClick} />
                        <ActionFormCell title="Text" left={actionFormCellLeftAccessory} variant="stack-bottom" onClick={handleActionFormCellClick} />
                    </div>
                    <div className="preview-stack-group">
                        <ActionFormCell title="Text" description="Description" left={actionFormCellLeftAccessory} right={actionFormCellLoader} variant="stack-top" onClick={handleActionFormCellClick} />
                        <ActionFormCell title="Text" description="Description" left={actionFormCellLeftAccessory} right={actionFormCellLoader} variant="stack-middle" onClick={handleActionFormCellClick} />
                        <ActionFormCell title="Text" description="Description" left={actionFormCellLeftAccessory} right={actionFormCellLoader} variant="stack-bottom" onClick={handleActionFormCellClick} />
                    </div>
                    <div></div>
                    <div className="preview-grid__label ts-500-m">Clicks: {actionFormCellClickCount}</div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Navigation Bar</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">is Adaptive</span>
                                <Switch
                                    label="is Adaptive"
                                    isSelected={isAdaptiveDemo}
                                    onChange={setIsAdaptiveDemo}
                                />
                            </div>

                            {!isAdaptiveDemo && (
                                <>
                                    <div className="preview-cell-switches__item">
                                        <span className="ts-500-m">Root link</span>
                                        <Switch
                                            label="Root link"
                                            isSelected={demoHasRootLink}
                                            onChange={setDemoHasRootLink}
                                        />
                                    </div>
                                    <div className="preview-cell-switches__item">
                                        <span className="ts-500-m">Description</span>
                                        <Switch
                                            label="Description"
                                            isSelected={demoHasDescription}
                                            onChange={setDemoHasDescription}
                                        />
                                    </div>
                                    <div className="preview-cell-switches__item">
                                        <span className="ts-500-m">Clear button</span>
                                        <Switch
                                            label="Clear button"
                                            isSelected={demoHasActionButton}
                                            onChange={setDemoHasActionButton}
                                        />
                                    </div>
                                    <div className="preview-cell-switches__item">
                                        <span className="ts-500-m">Items</span>
                                        <Switch
                                            label="Items"
                                            isSelected={demoHasItems}
                                            onChange={setDemoHasItems}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {!isAdaptiveDemo && (
                            <Dropdown
                                label="Тип"
                                value={itemsTypeLabel}
                                hasHelpIcon={false}
                            >
                                {([
                                    { value: 'links', label: 'Links' },
                                    { value: 'steps', label: 'Steps' },
                                ] as const).map(opt => (
                                    <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                        onClick={() => setDemoItemsType(opt.value)} />
                                ))}
                            </Dropdown>
                        )}

                        {!isAdaptiveDemo && demoItemsType === 'steps' && (
                            <Dropdown
                                label="Текущий шаг"
                                value={navBarStepLabels[demoCurrentStep - 1]}
                                hasHelpIcon={false}
                            >
                                {navBarStepLabels.map((label, i) => (
                                    <Cell key={i} title={label} hasLeftAccessory={false} hasRightAccessory={false}
                                        onClick={() => setDemoCurrentStep(i + 1)} />
                                ))}
                            </Dropdown>
                        )}

                        {isAdaptiveDemo && (
                            <>
                                <Dropdown
                                    label="Тип тайтла"
                                    value={titleVariantLabel[demoTitleVariant]}
                                    hasHelpIcon={false}
                                >
                                    {([
                                        { value: 'title', label: 'Title' },
                                        { value: 'title-description', label: 'Title + Description' },
                                        { value: 'step-progress', label: 'Step Progress' },
                                        { value: 'percent-progress', label: 'Percent Progress' },
                                        { value: 'image', label: 'Image' },
                                        { value: 'none', label: 'None' },
                                    ] as const).map(opt => (
                                        <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                            onClick={() => setDemoTitleVariant(opt.value)} />
                                    ))}
                                </Dropdown>
                                <Dropdown
                                    label="Правый аксессуар"
                                    value={rightVariantLabel[demoRightVariant]}
                                    hasHelpIcon={false}
                                >
                                    {([
                                        { value: 'icon', label: 'Icon' },
                                        { value: 'icon-icon', label: 'Icon + Icon' },
                                        { value: 'icon-badge', label: 'Icon + Badge' },
                                        { value: 'action', label: 'Action' },
                                        { value: 'none', label: 'None' },
                                    ] as const).map(opt => (
                                        <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                            onClick={() => setDemoRightVariant(opt.value)} />
                                    ))}
                                </Dropdown>
                                <Dropdown
                                    label="Левая иконка"
                                    value={leftIconLabel[demoLeftIconType]}
                                    hasHelpIcon={false}
                                >
                                    {([
                                        { value: 'arrow', label: 'Arrow Left' },
                                        { value: 'bell', label: 'Bell' },
                                        { value: 'dots', label: 'Dots' },
                                    ] as const).map(opt => (
                                        <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                            onClick={() => setDemoLeftIconType(opt.value)} />
                                    ))}
                                </Dropdown>
                            </>
                        )}
                    </div>

                    <div className="preview-stage">
                        <div className={`navigation-bar-demo--${isAdaptiveDemo ? 'adaptive' : 'desktop'}`}>
                            <NavigationBar
                                title={isAdaptiveDemo ? 'Text M' : 'Text 2XL'}
                                description="Text XS"
                                rootLinkLabel="Text S"
                                hasRootLink={demoHasRootLink}
                                hasDescription={demoHasDescription}
                                hasActionButton={demoHasActionButton}
                                items={demoHasItems ? (demoItemsType === 'links' ? navBarDesktopLinks : navBarDesktopSteps) : []}
                                titleVariant={demoTitleVariant}
                                rightAccessoryVariant={demoRightVariant}
                                leftIcon={navBarLeftIconMap[demoLeftIconType]}
                                progress={demoTitleVariant === 'percent-progress'
                                    ? { value: 60, ariaLabel: 'Progress: 60%' }
                                    : { value: 2, maxSteps: 4 }
                                }
                                actionLabel="Text M"
                                badgeValue={3}
                                rightIcon={<Bell />}
                                secondaryRightIcon={<DotsThreeHorizontal />}
                                logo={<span className="ds-icon ds-icon--l"><AppIconTSquare /></span>}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Main Page Navigation Bar</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%' }}>
                    <MainPageNavigationBar
                        customer="ООО Ромашка"
                        hasLive={true}
                        hasNewPush={true}
                        hasSelect={true}
                        hasSubscription={true}
                        hasTin={true}
                        isSecondLine={true}
                        tin="ИНН 4827 1359 64"
                    />
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Footer</h1>
                <div className="preview-grid preview-grid--inspector" style={{ overflowX: 'auto' }}>
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    label="Description"
                                    isSelected={isFooterDescriptionVisible}
                                    onChange={setIsFooterDescriptionVisible}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="Тип"
                            value={footerLayoutLabel[footerLayout]}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: '1-button', label: '1 Button' },
                                { value: '2-buttons-in-line', label: '2 Buttons In Line' },
                                { value: '3-buttons', label: '3 Buttons' },
                                { value: 'page-control-button', label: 'Page Control + Button' },
                                { value: 'stepper-button', label: 'Stepper + Button' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setFooterLayout(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Footer
                            layout={footerLayout}
                            description={isFooterDescriptionVisible ? 'Text S' : undefined}
                            iconAction={{ ariaLabel: 'Дополнительное действие' }}
                            secondaryAction={{ label: 'Действие' }}
                            primaryAction={{ label: 'Действие' }}
                            className="footer-preview"
                        />
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Feedback Banner</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Second action</span>
                                <Switch
                                    label="Second action"
                                    isSelected={isFeedbackBannerSecondaryVisible}
                                    onChange={setIsFeedbackBannerSecondaryVisible}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="preview-stage">
                        <FeedbackBanner
                            primaryAction={{ label: 'Text M', onClick: handleActionFormCellClick }}
                            secondaryAction={isFeedbackBannerSecondaryVisible ? { label: 'Text M', onClick: handleActionFormCellClick } : undefined}
                        >
                            Text M
                        </FeedbackBanner>
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Widget</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    label="Description"
                                    isSelected={isWidgetDescriptionVisible}
                                    onChange={setIsWidgetDescriptionVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Chevron</span>
                                <Switch
                                    label="Chevron"
                                    isSelected={isWidgetChevronVisible}
                                    onChange={setIsWidgetChevronVisible}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="Accessory"
                            value={widgetAccessoryLabel[widgetAccessoryVariant]}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 'icon', label: 'Icon' },
                                { value: 'link', label: 'Link' },
                                { value: 'link-icon', label: 'Link + Icon' },
                                { value: 'icon-icon', label: 'Icon + Icon' },
                                { value: 'description', label: 'Description' },
                                { value: 'editing-mode', label: 'Editing Mode' },
                                { value: 'none', label: 'None' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setWidgetAccessoryVariant(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Widget
                            className="widget-preview"
                            title="Widget"
                            description="Text S"
                            hasDescription={isWidgetDescriptionVisible}
                            hasChevron={isWidgetChevronVisible}
                            rightAccessory={(
                                <WidgetTitleAccessory
                                    variant={widgetAccessoryVariant}
                                    text={widgetAccessoryVariant === 'description' ? 'Text S' : 'Text M'}
                                />
                            )}
                        >
                            <div className="widget-preview__placeholder" />
                        </Widget>
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Page Action</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch label="Description" isSelected={paHasDescription} onChange={setPaHasDescription} />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Left Accessory</span>
                                <Switch label="Left Accessory" isSelected={paHasLeftAccessory} onChange={setPaHasLeftAccessory} />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">is Disabled</span>
                                <Switch label="is Disabled" isSelected={paIsDisabled} onChange={setPaIsDisabled} />
                            </div>
                        </div>
                        <Dropdown label="Variant" value={paVariant === 'default' ? 'Default' : 'Danger'} hasHelpIcon={false}>
                            {([
                                { value: 'default', label: 'Default' },
                                { value: 'danger', label: 'Danger' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setPaVariant(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <PageAction
                            title="Text"
                            description="Description"
                            leftAccessory={paHasLeftAccessory ? accessoryIcon30 : undefined}
                            variant={paVariant}
                            hasDescription={paHasDescription}
                            isDisabled={paIsDisabled}
                            onClick={handleActionFormCellClick}
                        />
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Context Menu</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <Dropdown
                            label="Расположение"
                            hasHelpIcon={false}
                            value={contextMenuPlacement === 'right' ? 'Право' : 'Лево'}
                        >
                            {([
                                { value: 'right', label: 'Право' },
                                { value: 'left', label: 'Лево' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setContextMenuPlacement(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <ContextMenu
                            trigger={(
                                <button
                                    type="button"
                                    className="components-preview__context-menu-trigger hoverOpacity"
                                    aria-label="Открыть context menu"
                                    onClick={() => setIsContextMenuOpen((value) => !value)}
                                >
                                    <span className="ds-icon ds-icon--m" aria-hidden="true">
                                        <DotsThreeHorizontal />
                                    </span>
                                </button>
                            )}
                            isOpen={isContextMenuOpen}
                            onClose={() => setIsContextMenuOpen(false)}
                            placement={contextMenuPlacement}
                            items={contextMenuItems}
                        />
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Tooltip</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Несколько абзацев</span>
                                <Switch
                                    label="Несколько абзацев"
                                    isSelected={isTooltipLongText}
                                    onChange={setIsTooltipLongText}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="Расположение"
                            hasHelpIcon={false}
                            value={tooltipPlacement === 'right' ? 'Право' : 'Лево'}
                        >
                            {([
                                { value: 'right', label: 'Право' },
                                { value: 'left', label: 'Лево' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setTooltipPlacement(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <Tooltip
                            placement={tooltipPlacement}
                            trigger={(
                                <button
                                    type="button"
                                    className="components-preview__tooltip-trigger"
                                    aria-label="Показать tooltip"
                                >
                                    <span className="ds-icon ds-icon--m" aria-hidden="true">
                                        <Circle />
                                    </span>
                                </button>
                            )}
                        >
                            {tooltipContent}
                        </Tooltip>
                    </div>
                </div>
            </section>

            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '120px', '--cols': 3, '--col-w': '335px' } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Form Cell</h1>
                    <div className="preview-grid__header ts-500-m">Text</div>
                    <div className="preview-grid__header ts-500-m">Subtitle + Text</div>
                    <div className="preview-grid__header ts-500-m">Text + Description</div>

                    <div className="preview-grid__label ts-500-m">Single</div>
                    <FormCell
                        title="Text"
                        left={formCellLeftAccessory}
                        right={<Switch isSelected={singleSwitchSelected} onChange={setSingleSwitchSelected} label="Switch" />}
                    />
                    <FormCell
                        title="Text"
                        subtitle="Subtitle"
                        left={formCellLeftAccessory}
                        right={<Checkbox isChecked={singleCheckboxSelected} onChange={setSingleCheckboxSelected} label="Checkbox" />}
                    />
                    <FormCell
                        title="Text"
                        description="Description"
                        left={formCellLeftAccessory}
                        right={<Radio isSelected={singleRadioSelected} onChange={() => setSingleRadioSelected((value) => !value)} label="Radio" />}
                    />

                    <div className="preview-grid__label ts-500-m">Group</div>
                    <div className="preview-stack-group">
                        <FormCell
                            title="Text"
                            left={formCellLeftAccessory}
                            right={<Switch isSelected={groupSwitchStates[0]} onChange={(nextValue) => toggleGroupSwitch(0, nextValue)} label="Switch" />}
                            variant="stack-top"
                        />
                        <FormCell
                            title="Text"
                            subtitle="Subtitle"
                            left={formCellLeftAccessory}
                            right={<Switch isSelected={groupSwitchStates[1]} onChange={(nextValue) => toggleGroupSwitch(1, nextValue)} label="Switch" />}
                            variant="stack-middle"
                        />
                        <FormCell
                            title="Text"
                            description="Description"
                            left={formCellLeftAccessory}
                            right={<Switch isSelected={groupSwitchStates[2]} onChange={(nextValue) => toggleGroupSwitch(2, nextValue)} label="Switch" />}
                            variant="stack-bottom"
                        />
                    </div>
                    <div className="preview-stack-group">
                        <FormCell
                            title="Text"
                            left={formCellLeftAccessory}
                            right={<Checkbox isChecked={groupCheckboxStates[0]} onChange={(nextValue) => toggleGroupCheckbox(0, nextValue)} label="Checkbox" />}
                            variant="stack-top"
                        />
                        <FormCell
                            title="Text"
                            subtitle="Subtitle"
                            left={formCellLeftAccessory}
                            right={<Checkbox isChecked={groupCheckboxStates[1]} onChange={(nextValue) => toggleGroupCheckbox(1, nextValue)} label="Checkbox" />}
                            variant="stack-middle"
                        />
                        <FormCell
                            title="Text"
                            description="Description"
                            left={formCellLeftAccessory}
                            right={<Checkbox isChecked={groupCheckboxStates[2]} onChange={(nextValue) => toggleGroupCheckbox(2, nextValue)} label="Checkbox" />}
                            variant="stack-bottom"
                        />
                    </div>
                    <div className="preview-stack-group">
                        <FormCell
                            title="Text"
                            left={formCellLeftAccessory}
                            right={<Radio isSelected={groupRadioSelectedIndex === 0} onChange={() => setGroupRadioSelectedIndex(0)} label="Radio" />}
                            variant="stack-top"
                        />
                        <FormCell
                            title="Text"
                            subtitle="Subtitle"
                            left={formCellLeftAccessory}
                            right={<Radio isSelected={groupRadioSelectedIndex === 1} onChange={() => setGroupRadioSelectedIndex(1)} label="Radio" />}
                            variant="stack-middle"
                        />
                        <FormCell
                            title="Text"
                            description="Description"
                            left={formCellLeftAccessory}
                            right={<Radio isSelected={groupRadioSelectedIndex === 2} onChange={() => setGroupRadioSelectedIndex(2)} label="Radio" />}
                            variant="stack-bottom"
                        />
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Contextual Notification</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Title</span>
                                <Switch
                                    label="Title"
                                    isSelected={cnHasTitle}
                                    onChange={setCnHasTitle}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Close icon</span>
                                <Switch
                                    label="Close icon"
                                    isSelected={cnHasCloseIcon}
                                    onChange={setCnHasCloseIcon}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Action</span>
                                <Switch
                                    label="Action"
                                    isSelected={cnHasAction}
                                    onChange={setCnHasAction}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Spinner</span>
                                <Switch
                                    label="Spinner"
                                    isSelected={cnHasSpinner}
                                    onChange={setCnHasSpinner}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="Size"
                            value={cnSize === 's' ? 'S' : 'M'}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 's', label: 'S' },
                                { value: 'm', label: 'M' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setCnSize(opt.value)} />
                            ))}
                        </Dropdown>
                        <Dropdown
                            label="Accessory"
                            value={cnAccessory === 'icon' ? 'Icon' : 'Avatar S'}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 'icon', label: 'Icon' },
                                { value: 'avatar', label: 'Avatar S' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setCnAccessory(opt.value)} />
                            ))}
                        </Dropdown>
                        
                    </div>

                    <div className="preview-stage">
                        <ContextualNotification
                            size={cnSize}
                            accessory={cnAccessory}
                            icon={<Circle />}
                            avatar={(
                                <Avatar
                                    size="s"
                                    shape="circle"
                                    style={{ '--avatar-surface': 'var(--bg-neutral-1)', '--avatar-color': 'var(--primitive-secondary)' } as React.CSSProperties}
                                    icon={<Circle />}
                                />
                            )}
                            title="Title"
                            hasTitle={cnHasTitle}
                            text="Text"
                            hasCloseIcon={cnHasCloseIcon}
                            hasAction={cnHasAction}
                            actionLabel="Action"
                            hasSpinner={cnHasSpinner}
                        />
                    </div>
                </div>
            </section>

            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Table Cell</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Has Title</span>
                                <Switch label="Has Title" isSelected={tcHasTitle} onChange={setTcHasTitle} />
                            </div>
                            {tcHasTitle && (
                                <Dropdown label="Title Style" value={tcTitleStyle} hasHelpIcon={false}>
                                    {([
                                        { value: '400', label: '400' },
                                        { value: '500', label: '500' },
                                        { value: '600', label: '600' },
                                    ] as const).map(opt => (
                                        <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                            onClick={() => setTcTitleStyle(opt.value)} />
                                    ))}
                                </Dropdown>
                            )}
                            {([
                                { label: 'Has Description', value: tcHasDescription, onChange: setTcHasDescription },
                                { label: 'Has Tag', value: tcHasTag, onChange: setTcHasTag },
                                { label: 'Has Left Accessory', value: tcHasLeftAccessory, onChange: setTcHasLeftAccessory },
                                { label: 'Has Right Accessory', value: tcHasRightAccessory, onChange: setTcHasRightAccessory },
                                { label: 'is Edit', value: tcIsEdit, onChange: setTcIsEdit },
                                { label: 'is Disabled', value: tcIsDisabled, onChange: setTcIsDisabled },
                                { label: 'is Error', value: tcIsError, onChange: setTcIsError },
                            ]).map(({ label, value, onChange }) => (
                                <div key={label} className="preview-cell-switches__item">
                                    <span className="ts-500-m">{label}</span>
                                    <Switch label={label} isSelected={value} onChange={onChange} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="preview-stage">
                        <Table columns={2} gridTemplateColumns="64px 1fr">
                            {[1, 2, 3].map((row) => (
                                <React.Fragment key={row}>
                                    <TableCell
                                        hasRightAccessory
                                        rightAccessory={<ChevronRight />}
                                    />
                                    <TableCell
                                        hasTitle={tcHasTitle}
                                        title={tcTitle}
                                        hasDescription={tcHasDescription}
                                        description="Description text"
                                        hasTag={tcHasTag}
                                        tag={<Tag>Tag</Tag>}
                                        hasLeftAccessory={tcHasLeftAccessory}
                                        leftAccessory={<Avatar size="s" shape="circle" label="AA" />}
                                        hasRightAccessory={tcHasRightAccessory}
                                        rightAccessory={<ChevronRight />}
                                        titleStyle={tcTitleStyle}
                                        isEdit={tcIsEdit}
                                        placeholder="Введите текст"
                                        onTitleChange={setTcTitle}
                                        isDisabled={tcIsDisabled}
                                        isError={tcIsError}
                                    />
                                </React.Fragment>
                            ))}
                        </Table>
                    </div>
                </div>
            </section>

            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Tabs Carousel</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Action</span>
                                <Switch
                                    label="Action"
                                    isSelected={tcHasActionTabs}
                                    onChange={setTcHasActionTabs}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Badge</span>
                                <Switch
                                    label="Badge"
                                    isSelected={tcHasBadge}
                                    onChange={setTcHasBadge}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="Размер"
                            value={tcSize === 'xl' ? 'XL' : '2XL'}
                            hasHelpIcon={false}
                        >
                            {([
                                { value: 'xl', label: 'XL' },
                                { value: '2xl', label: '2XL' },
                            ] as const).map(opt => (
                                <Cell key={opt.value} title={opt.label} hasLeftAccessory={false} hasRightAccessory={false}
                                    onClick={() => setTcSize(opt.value)} />
                            ))}
                        </Dropdown>
                    </div>

                    <div className="preview-stage">
                        <TabsCarousel
                            size={tcSize}
                            selectedIndex={tcSelectedIndex}
                            onTabChange={setTcSelectedIndex}
                            hasAction={tcHasActionTabs}
                            actionLabel="Открыть"
                            actionIcon={<Plus />}
                            onActionClick={() => {}}
                            tabs={[
                                {
                                    label: 'Tab 1',
                                    badge: tcHasBadge ? 3 : undefined,
                                    content: (
                                        <p className="ts-400-m" style={{ paddingTop: 'var(--spacing-4x)', color: 'var(--primitive-secondary)' }}>
                                            Контент раздела Tab 1
                                        </p>
                                    ),
                                },
                                {
                                    label: 'Tab 2',
                                    content: (
                                        <p className="ts-400-m" style={{ paddingTop: 'var(--spacing-4x)', color: 'var(--primitive-secondary)' }}>
                                            Контент раздела Tab 2
                                        </p>
                                    ),
                                },
                                {
                                    label: 'Tab 3',
                                    content: (
                                        <p className="ts-400-m" style={{ paddingTop: 'var(--spacing-4x)', color: 'var(--primitive-secondary)' }}>
                                            Контент раздела Tab 3
                                        </p>
                                    ),
                                },
                                {
                                    label: 'Tab 4',
                                    content: (
                                        <p className="ts-400-m" style={{ paddingTop: 'var(--spacing-4x)', color: 'var(--primitive-secondary)' }}>
                                            Контент раздела Tab 4.
                                        </p>
                                    ),
                                },
                                {
                                    label: 'Tab 5',
                                    content:
                                        <p className="ts-400-m" style={{ paddingTop: 'var(--spacing-4x)', color: 'var(--primitive-secondary)' }}>Контент раздела Tab 5
                                        </p>
                                },
                                {
                                    label: 'Tab 6',
                                    content:
                                        <p className="ts-400-m" style={{ paddingTop: 'var(--spacing-4x)', color: 'var(--primitive-secondary)' }}>Контент раздела Tab 6
                                        </p>
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
