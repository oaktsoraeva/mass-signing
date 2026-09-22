import React, { useState } from 'react';
import {
    Avatar,
    Badge,
    Button,
    Cell,
    CellLeftAccessory,
    CellRightAccessory,
    Checkbox,
    Chip,
    Dropdown,
    HeaderButton,
    LinearProgress,
    LinkCell,
    Radio,
    Switch,
    Tag,
} from '../../src';
import { Circle } from '../../src/icons';

export const AtomsPreview: React.FC = () => {
    const [switchStates, setSwitchStates] = useState({ s1: false, s2: true });
    const [cbStates, setCbStates] = useState({ c1: false, c2: true, c3: false, c3Indeterminate: true });
    const [radioState, setRadioState] = useState<'r1' | 'r2'>('r1');
    const [chipSelected, setChipSelected] = useState<Record<string, boolean>>({
        'chip-1': false,
        'tab-1': false,
        'dropdown-1': false,
        'action-1': false,
    });
    const [percentValue, setPercentValue] = useState(65);
    const [stepsValue, setStepsValue] = useState(3);
    const [cellLeftAccessory, setCellLeftAccessory] = useState('avatar');
    const [cellRightAccessory, setCellRightAccessory] = useState('disclosure');
    const [cellShowSubtitle, setCellShowSubtitle] = useState(true);
    const [cellShowDescription, setCellShowDescription] = useState(true);
    const [cellVerticalPadding, setCellVerticalPadding] = useState<'none' | '2x' | '3x' | '4x'>('none');
    const [lcSize, setLcSize] = useState<'l' | 'm'>('l');
    const [lcHasDescription, setLcHasDescription] = useState(false);
    const [lcIsLoading, setLcIsLoading] = useState(false);

    const toggleChip = (id: string) => {
        setChipSelected(prev => ({ ...prev, [id]: !prev[id] }));
    };
    const demoIcon = <Circle />;
    const cellLeftAccessoryOptions = [
        { value: 'none', label: 'none' },
        { value: 'avatar', label: 'avatar' },
        { value: 'icon-30', label: 'icon-30' },
        { value: 'icon-24', label: 'icon-24' },
        { value: 'icon-18', label: 'icon-18' },
        { value: 'card-preview', label: 'card-preview' },
        { value: 'avatar-checkbox', label: 'avatar-checkbox' },
        { value: 'add-button', label: 'add-button' },
    ];
    const cellRightAccessoryOptions = [
        { value: 'none', label: 'none' },
        { value: 'disclosure', label: 'disclosure' },
        { value: 'avatar-m', label: 'avatar-m' },
        { value: 'avatar-s', label: 'avatar-s' },
        { value: 'icon-30', label: 'icon-30' },
        { value: 'icon-24', label: 'icon-24' },
        { value: 'icon-18', label: 'icon-18' },
        { value: 'spinner-24', label: 'spinner-24' },
        { value: 'spinner-34-avatar-s', label: 'spinner-34-avatar-s' },
        { value: 'checkbox', label: 'checkbox' },
        { value: 'radio', label: 'radio' },
        { value: 'switch', label: 'switch' },
        { value: 'text-l', label: 'text-l' },
        { value: 'text-m', label: 'text-m' },
        { value: 'text-s', label: 'text-s' },
        { value: 'text-l-disclosure', label: 'text-l-disclosure' },
        { value: 'text-s-disclosure', label: 'text-s-disclosure' },
        { value: 'badge', label: 'badge' },
        { value: 'badge-disclosure', label: 'badge-disclosure' },
        { value: 'notification-indicator', label: 'notification-indicator' },
        { value: 'text-m-text-xs', label: 'text-m-text-xs' },
        { value: 'table-text-m-text-m', label: 'table-text-m-text-m' },
        { value: 'table-text-s-text-s', label: 'table-text-s-text-s' },
        { value: 'icon-24-icon-24', label: 'icon-24-icon-24' },
        { value: 'text-m-icon-30', label: 'text-m-icon-30' },
        { value: 'text-m-icon-24', label: 'text-m-icon-24' },
        { value: 'text-m-icon-18', label: 'text-m-icon-18' },
        { value: 'stepper', label: 'stepper' },
    ];

    const renderCellLeftAccessory = () => {
        if (cellLeftAccessory === 'none') {
            return undefined;
        }

        return (
            <CellLeftAccessory
                variant={cellLeftAccessory as React.ComponentProps<typeof CellLeftAccessory>['variant']}
                icon={demoIcon}
                isChecked
            />
        );
    };

    const renderCellRightAccessory = () => {
        if (cellRightAccessory === 'none') {
            return undefined;
        }

        return (
            <CellRightAccessory
                variant={cellRightAccessory as React.ComponentProps<typeof CellRightAccessory>['variant']}
                icon={demoIcon}
                secondaryIcon={demoIcon}
                text="Text"
                secondaryText="Text XS"
                value={5}
                isChecked
                avatarLabel="AA"
            />
        );
    };

    return (
        <div className="tab-panel is-active">
            {/* BUTTON SECTION */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--cols': 4, '--col-w': '280px' } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Button</h1>
                    <div className="preview-grid__header ts-500-m">Primary</div>
                    <div className="preview-grid__header ts-500-m">Secondary</div>
                    <div className="preview-grid__header ts-500-m">Transparent</div>
                    <div className="preview-grid__header ts-500-m">White</div>

                    <div className="preview-grid__label ts-500-m">Default</div>
                    <Button variant="primary">Text</Button>
                    <Button variant="secondary">Text</Button>
                    <Button variant="transparent">Text</Button>
                    <Button variant="white">Text</Button>

                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <Button variant="primary" isDisabled>Text</Button>
                    <Button variant="secondary" isDisabled>Text</Button>
                    <Button variant="transparent" isDisabled>Text</Button>
                    <Button variant="white" isDisabled>Text</Button>

                    <div className="preview-grid__label ts-500-m">Loading</div>
                    <Button variant="primary" isLoading>Text</Button>
                    <Button variant="secondary" isLoading>Text</Button>
                    <Button variant="transparent" isLoading>Text</Button>
                    <Button variant="white" isLoading>Text</Button>

                </div>
            </section>

            {/* HEADER BUTTON SECTION */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix">
                    <h1 className="component-screen__title ts-600-2xl">Header Button</h1>
                    <div className="preview-grid__header ts-500-m">Primary</div>
                    <div className="preview-grid__header ts-500-m">Secondary</div>
                    <div className="preview-grid__header ts-500-m">Danger</div>
                    <div className="preview-grid__label ts-500-m">Default</div>
                    <HeaderButton
                      variant="primary"
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                    <HeaderButton
                      variant="secondary"
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                    <HeaderButton
                      variant="danger"
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>

                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <HeaderButton
                      variant="primary"
                      isDisabled
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                    <HeaderButton
                      variant="secondary"
                      isDisabled
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                    <HeaderButton
                      variant="danger"
                      isDisabled
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>

                    <div className="preview-grid__label ts-500-m">Loading</div>
                    <HeaderButton
                      variant="primary"
                      isLoading
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                    <HeaderButton
                      variant="secondary"
                      isLoading
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                    <HeaderButton
                      variant="danger"
                      isLoading
                      icon={demoIcon}
                    >
                      Text
                    </HeaderButton>
                </div>
            </section>

            {/* CHIP SECTION */}
            <section className="component-screen component-screen--flex">
                <div className="preview-grid preview-grid--matrix" style={{ '--cols': 4 } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Chip</h1>
                    <div className="preview-grid__header ts-500-m">Chip</div>
                    <div className="preview-grid__header ts-500-m">Tab</div>
                    <div className="preview-grid__header ts-500-m">Dropdown</div>
                    <div className="preview-grid__header ts-500-m">Action</div>

                    {/* Default Row */}
                    <div className="preview-grid__label ts-500-m">Default</div>
                    <Chip
                        variant="chip"
                        isSelected={chipSelected['chip-1']}
                        onClick={() => toggleChip('chip-1')}
                    >
                        Text S
                    </Chip>
                    <Chip
                        variant="tab"
                        isSelected={chipSelected['tab-1']}
                        onClick={() => toggleChip('tab-1')}
                    >
                        Text S
                    </Chip>
                    <Chip
                        variant="dropdown"
                        popupContent={
                            <>
                                {['Option 1', 'Option 2', 'Option 3'].map(v => (
                                    <Cell key={v} title={v} hasLeftAccessory={false} hasRightAccessory={false}
                                        onClick={() => {}} />
                                ))}
                            </>
                        }
                    >
                        Text S
                    </Chip>
                    <Chip
                        variant="action"
                        isSelected={chipSelected['action-1']}
                        onClick={() => !chipSelected['action-1'] && toggleChip('action-1')}
                        onClose={() => toggleChip('action-1')}
                    >
                        Text S
                    </Chip>

                    {/* Selected Row */}
                    <div className="preview-grid__label ts-500-m">Selected / Pressed</div>
                    <Chip variant="chip" isSelected>Text S</Chip>
                    <Chip variant="tab" isSelected>Text S</Chip>
                    <Chip variant="dropdown" isOpen>Text S</Chip>
                    <Chip variant="action" isSelected>Text S</Chip>

                    {/* Disabled Row */}
                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <Chip variant="chip" isDisabled>Text S</Chip>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className="preview-grid preview-grid--matrix" style={{ '--cols': 4 } as React.CSSProperties}>
                    <div className="preview-grid__label ts-500-m">Accessory</div>
                    <div className="preview-grid__header ts-500-m">Left Icon</div>
                    <div className="preview-grid__header ts-500-m">Logo</div>
                    <div className="preview-grid__header ts-500-m">Logo Stack</div>
                    <div className="preview-grid__header ts-500-m">Right Badge</div>

                    <div>{/* Spacer */}</div>
                    <Chip leftAccessory="icon" leftIcon={demoIcon}>Text S</Chip>
                    <Chip leftAccessory="logo">Text S</Chip>
                    <Chip leftAccessory="logo-stack">Text S</Chip>
                    <Chip variant="tab" badge={0}>Text S</Chip>
                </div>
            </section>

            {/* BADGE SECTION */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--cols': 4 } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Badge</h1>
                    <div className="preview-grid__header ts-500-m">M</div>
                    <div className="preview-grid__header ts-500-m">S</div>
                    <div className="preview-grid__header ts-500-m">XS</div>
                    <div className="preview-grid__header ts-500-m">Overflow</div>

                    <div className="preview-grid__label ts-500-m">Default</div>
                    <Badge value={5} size="m" />
                    <Badge value={5} size="s" />
                    <Badge value={0} size="xs" />
                    <Badge value={150} size="m" />
                </div>
            </section>

            {/* SWITCH */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--cols': 2 } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Switch</h1>
                    <div className="preview-grid__header ts-500-m">Off</div>
                    <div className="preview-grid__header ts-500-m">On</div>
                    <div className="preview-grid__label ts-500-m">Default</div>
                    <Switch isSelected={switchStates.s1} onChange={v => setSwitchStates(p => ({ ...p, s1: v }))} />
                    <Switch isSelected={switchStates.s2} onChange={v => setSwitchStates(p => ({ ...p, s2: v }))} />

                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <Switch isSelected={false} isDisabled />
                    <Switch isSelected={true} isDisabled />
                </div>
            </section>

            {/* CHECKBOX */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix">
                    <h1 className="component-screen__title ts-600-2xl">Checkbox</h1>
                    <div className="preview-grid__header ts-500-m">Unchecked</div>
                    <div className="preview-grid__header ts-500-m">Checked</div>
                    <div className="preview-grid__header ts-500-m">Indeterminate</div>

                    <div className="preview-grid__label ts-500-m">Default</div>
                    <Checkbox isChecked={cbStates.c1} label="Checkbox unchecked" onChange={v => setCbStates(p => ({ ...p, c1: v }))} />
                    <Checkbox isChecked={cbStates.c2} label="Checkbox checked" onChange={v => setCbStates(p => ({ ...p, c2: v }))} />
                    <Checkbox isChecked={cbStates.c3} isIndeterminate={cbStates.c3Indeterminate} label="Checkbox indeterminate" onChange={v => setCbStates(p => ({ ...p, c3: v, c3Indeterminate: false }))} />

                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <Checkbox isChecked={false} isDisabled label="Checkbox unchecked" />
                    <Checkbox isChecked={true} isDisabled label="Checkbox checked" />
                    <Checkbox isIndeterminate isDisabled label="Checkbox indeterminate" />
                </div>
            </section>

            {/* RADIO */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '120px', '--cols': 2 } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Radio</h1>
                    <div className="preview-grid__header ts-500-m">Not selected</div>
                    <div className="preview-grid__header ts-500-m">Selected</div>

                    <div className="preview-grid__label ts-500-m">Default</div>
                    <Radio isSelected={radioState === 'r1'} label="Radio not selected" onChange={() => setRadioState('r1')} />
                    <Radio isSelected={radioState === 'r2'} label="Radio selected" onChange={() => setRadioState('r2')} />

                    <div className="preview-grid__label ts-500-m">Disabled</div>
                    <Radio isSelected={false} isDisabled label="Radio not selected" />
                    <Radio isSelected={true} isDisabled label="Radio selected" />
                </div>
            </section>

            {/* TAG */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--cols': 4 } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Tag</h1>
                    <div className="preview-grid__header ts-500-m">Circle Filled</div>
                    <div className="preview-grid__header ts-500-m">Square Filled</div>
                    <div className="preview-grid__header ts-500-m">Circle Outlined</div>
                    <div className="preview-grid__header ts-500-m">Square Outlined</div>

                    <div className="preview-grid__label ts-500-m">XL</div>
                    <Tag shape="circle" variant="filled" size="xl">Text M</Tag>
                    <Tag shape="square" variant="filled" size="xl">Text M</Tag>
                    <Tag shape="circle" variant="outlined" size="xl">Text M</Tag>
                    <Tag shape="square" variant="outlined" size="xl">Text M</Tag>

                    <div className="preview-grid__label ts-500-m">L</div>
                    <Tag shape="circle" variant="filled" size="l">Text S</Tag>
                    <Tag shape="square" variant="filled" size="l">Text S</Tag>
                    <Tag shape="circle" variant="outlined" size="l">Text S</Tag>
                    <Tag shape="square" variant="outlined" size="l">Text S</Tag>

                    <div className="preview-grid__label ts-500-m">M</div>
                    <Tag shape="circle" variant="filled" size="m">Text XS</Tag>
                    <Tag shape="square" variant="filled" size="m">Text XS</Tag>
                    <Tag shape="circle" variant="outlined" size="m">Text XS</Tag>
                    <Tag shape="square" variant="outlined" size="m">Text XS</Tag>

                    <div className="preview-grid__label ts-500-m">S</div>
                    <Tag shape="circle" variant="filled" size="s">Text XS</Tag>
                    <Tag shape="square" variant="filled" size="s">Text XS</Tag>
                    <Tag shape="circle" variant="outlined" size="s">Text XS</Tag>
                    <Tag shape="square" variant="outlined" size="s">Text XS</Tag>
                </div>
            </section>

            {/* AVATAR */}
            <section className="component-screen component-screen--flex">
                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '90px' } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Avatar</h1>
                    <div className="preview-grid__header ts-500-m">Image</div>
                    <div className="preview-grid__header ts-500-m">Icon</div>
                    <div className="preview-grid__header ts-500-m">Text</div>

                    <div className="preview-grid__label ts-500-m">2XL</div>
                    <Avatar size="2xl" shape="circle" imageUrl="https://picsum.photos/120" />
                    <Avatar size="2xl" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="2xl" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />

                    <div className="preview-grid__label ts-500-m">XL</div>
                    <Avatar size="xl" shape="circle" imageUrl="https://picsum.photos/72" />
                    <Avatar size="xl" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="xl" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />

                    <div className="preview-grid__label ts-500-m">L</div>
                    <Avatar size="l" shape="circle" imageUrl="https://picsum.photos/56" />
                    <Avatar size="l" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="l" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />

                    <div className="preview-grid__label ts-500-m">M</div>
                    <Avatar size="m" shape="circle" imageUrl="https://picsum.photos/40" />
                    <Avatar size="m" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="m" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />

                    <div className="preview-grid__label ts-500-m">S</div>
                    <Avatar size="s" shape="circle" imageUrl="https://picsum.photos/32" />
                    <Avatar size="s" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="s" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />

                    <div className="preview-grid__label ts-500-m">XS</div>
                    <Avatar size="xs" shape="circle" imageUrl="https://picsum.photos/24" />
                    <Avatar size="xs" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="xs" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />

                    <div className="preview-grid__label ts-500-m">2XS</div>
                    <Avatar size="2xs" shape="circle" imageUrl="https://picsum.photos/16" />
                    <Avatar size="2xs" shape="circle" style={{ '--avatar-surface': '#8ea8e3', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} icon={demoIcon} />
                    <Avatar size="2xs" shape="circle" label="AA" style={{ '--avatar-surface': '#c493e1', '--avatar-color': 'var(--primitive-default)' } as React.CSSProperties} />
                </div>

                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '90px', '--cols': 2 } as React.CSSProperties}>
                    <div></div>
                    <div className="preview-grid__header ts-500-m">Superellipse</div>
                    <div className="preview-grid__header ts-500-m">Square</div>

                    <div className="preview-grid__label ts-500-m">2XL</div>
                    <Avatar size="2xl" shape="superellipse" imageUrl="https://picsum.photos/120?2" />
                    <Avatar size="2xl" shape="square" imageUrl="https://picsum.photos/120?3" />

                    <div className="preview-grid__label ts-500-m">XL</div>
                    <Avatar size="xl" shape="superellipse" imageUrl="https://picsum.photos/72?2" />
                    <Avatar size="xl" shape="square" imageUrl="https://picsum.photos/72?3" />

                    <div className="preview-grid__label ts-500-m">L</div>
                    <Avatar size="l" shape="superellipse" imageUrl="https://picsum.photos/56?2" />
                    <Avatar size="l" shape="square" imageUrl="https://picsum.photos/56?3" />

                    <div className="preview-grid__label ts-500-m">M</div>
                    <Avatar size="m" shape="superellipse" imageUrl="https://picsum.photos/40?2" />
                    <Avatar size="m" shape="square" imageUrl="https://picsum.photos/40?3" />

                    <div className="preview-grid__label ts-500-m">S</div>
                    <Avatar size="s" shape="superellipse" imageUrl="https://picsum.photos/32?2" />
                    <Avatar size="s" shape="square" imageUrl="https://picsum.photos/32?3" />

                    <div className="preview-grid__label ts-500-m">XS</div>
                    <Avatar size="xs" shape="superellipse" imageUrl="https://picsum.photos/24?2" />
                    <Avatar size="xs" shape="square" imageUrl="https://picsum.photos/24?3" />

                    <div className="preview-grid__label ts-500-m">2XS</div>
                    <Avatar size="2xs" shape="superellipse" imageUrl="https://picsum.photos/16?2" />
                    <Avatar size="2xs" shape="square" imageUrl="https://picsum.photos/16?3" />
                </div>
            </section>

            {/* LINEAR PROGRESS */}
            <section className="component-screen">
                <div className="preview-grid preview-grid--matrix" style={{ '--label-w': '120px', '--cols': 2 } as React.CSSProperties}>
                    <h1 className="component-screen__title ts-600-2xl">Linear Progress</h1>
                    <div className="preview-grid__header ts-500-m">Percent</div>
                    <div className="preview-grid__header ts-500-m">Steps</div>

                    <div className="preview-grid__label ts-500-m">Interactive</div>

                    {/* Percent Interactive */}
                    <div className="preview-control-stack">
                        <div className="preview-control-stack__bar">
                            <LinearProgress
                                variant="percent"
                                value={percentValue}
                                ariaLabel={`Progress: ${percentValue}%`}
                            />
                        </div>
                        <div className="preview-control-row">
                            <span className="ts-500-s">{percentValue}%</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={percentValue}
                                onChange={(e) => setPercentValue(parseInt(e.target.value))}
                                className="range-slider preview-control-row__fill"
                            />
                        </div>
                    </div>

                    {/* Steps Interactive */}
                    <div className="preview-control-stack">
                        <div className="preview-control-stack__bar">
                            <LinearProgress
                                variant="steps"
                                value={stepsValue}
                                maxSteps={5}
                                ariaLabel={`Progress: ${stepsValue} of 5 steps`}
                            />
                        </div>
                        <div className="preview-control-row">
                            <span className="ts-500-s">{stepsValue}/5</span>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                value={stepsValue}
                                onChange={(e) => setStepsValue(parseInt(e.target.value))}
                                className="range-slider preview-control-row__fill"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CELL */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Cell</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Subtitle</span>
                                <Switch
                                    isSelected={cellShowSubtitle}
                                    onChange={setCellShowSubtitle}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    isSelected={cellShowDescription}
                                    onChange={setCellShowDescription}
                                />
                            </div>
                        </div>
                        <Dropdown
                            label="verticalPadding"
                            value={cellVerticalPadding}
                            hasHelpIcon={false}
                        >
                            {(['none', '2x', '3x', '4x'] as const).map(v => (
                                <Cell
                                    key={v}
                                    title={v}
                                    hasLeftAccessory={false}
                                    hasRightAccessory={false}
                                    onClick={() => setCellVerticalPadding(v)}
                                />
                            ))}
                        </Dropdown>
                        <Dropdown
                            label="leftAccessory"
                            value={cellLeftAccessory}
                            placeholder="Select leftAccessory"
                            hasHelpIcon={false}
                        >
                            {cellLeftAccessoryOptions.map(opt => (
                                <Cell
                                    key={opt.value}
                                    title={opt.label}
                                    hasLeftAccessory={false}
                                    hasRightAccessory={false}
                                    onClick={() => setCellLeftAccessory(opt.value)}
                                />
                            ))}
                        </Dropdown>
                        <Dropdown
                            label="rightAccessory"
                            value={cellRightAccessory}
                            placeholder="Select rightAccessory"
                            hasHelpIcon={false}
                        >
                            {cellRightAccessoryOptions.map(opt => (
                                <Cell
                                    key={opt.value}
                                    title={opt.label}
                                    hasLeftAccessory={false}
                                    hasRightAccessory={false}
                                    onClick={() => setCellRightAccessory(opt.value)}
                                />
                            ))}
                        </Dropdown>
                    </div>
                    <div className="preview-stage">
                        <div className="preview-stack-group">
                            <Cell
                                title="Title"
                                subtitle={cellShowSubtitle ? 'Subtitle' : undefined}
                                description={cellShowDescription ? 'Description' : undefined}
                                leftAccessory={renderCellLeftAccessory()}
                                rightAccessory={renderCellRightAccessory()}
                                hasLeftAccessory={cellLeftAccessory !== 'none'}
                                hasRightAccessory={cellRightAccessory !== 'none'}
                                verticalPadding={cellVerticalPadding}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* LinkCell */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Link Cell</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch label="Description" isSelected={lcHasDescription} onChange={setLcHasDescription} />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Loading</span>
                                <Switch label="Loading" isSelected={lcIsLoading} onChange={setLcIsLoading} />
                            </div>
                        </div>
                        <Dropdown label="Size" value={lcSize.toUpperCase()} hasHelpIcon={false}>
                            {(['l', 'm'] as const).map(s => (
                                <Cell
                                    key={s}
                                    title={s.toUpperCase()}
                                    hasLeftAccessory={false}
                                    hasRightAccessory={false}
                                    onClick={() => setLcSize(s)}
                                />
                            ))}
                        </Dropdown>
                    </div>
                    <div className="preview-stage">
                        <LinkCell
                            title="Заголовок ссылки"
                            description={lcHasDescription ? 'Описание действия' : undefined}
                            size={lcSize}
                            isLoading={lcIsLoading}
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
