import React from 'react';

const COLOR_GROUPS = [
    {
        title: 'Primitive',
        prefix: '--primitive',
        colors: [
            'primary', 'secondary', 'neutral-4', 'neutral-3', 'neutral-2', 'neutral-1',
            'default', 'brand', 'error', 'success', 'warning', 'warning-2'
        ]
    },
    {
        title: 'Background',
        prefix: '--bg',
        rows: [
            ['neutral-4', 'neutral-3', 'neutral-2', 'neutral-1', 'default'],
            ['brand', 'brand-5', 'brand-4', 'brand-3', 'brand-2', 'brand-1'],
            ['error', 'error-5', 'error-4', 'error-3', 'error-2', 'error-1'],
            ['success', 'success-5', 'success-4', 'success-3', 'success-2', 'success-1'],
            ['warning', 'warning-5', 'warning-4', 'warning-3', 'warning-2', 'warning-1'],
            ['demo']
        ]
    },
    {
        title: 'Container',
        prefix: '--container',
        colors: ['default', 'transparent-1', 'transparent-1-inverse', 'transparent-2', 'transparent-2-inverse']
    },
    {
        title: 'Page',
        prefix: '--page',
        colors: ['primary', 'secondary']
    },
    {
        title: 'Popup',
        prefix: '--popup',
        colors: ['primary', 'secondary']
    },
    {
        title: 'Overlay',
        prefix: '--overlay',
        colors: ['popup', 'primary-alpha-050']
    },
    {
        title: 'Category',
        prefix: '--category',
        colors: ['sand', 'coral', 'flamingo', 'orchid', 'amethyst', 'lavender', 'indigo', 'sky', 'mint', 'emerald']
    },
    {
        title: 'Translucent',
        prefix: '--translucent',
        colors: [
            'primitives-secondary', 'primitives-neutral-4', 'primitives-neutral-3',
            'primitives-neutral-2', 'primitives-neutral-1'
        ]
    },
    {
        title: 'State',
        prefix: '--state',
        colors: [
            'bg-brand-active', 'bg-default-active',
            'container-transparent-1-active', 'container-transparent-2-active'
        ]
    }
];

const SPACING_GROUPS = [
    {
        title: 'Base',
        prefix: '--spacing',
        tokens: [
            '0-5x', '1x', '1-5x', '2x', '2-5x', '3x', '3-5x', '4x', '4-5x', '5x', '6x',
            '7x', '7-5x', '8x', '10x', '12x', '14x', '16x', '20x', '24x', '30x', '40x'
        ]
    },
    {
        title: 'Page',
        prefix: '--',
        tokens: [
            'page-top-padding',
            'page-bottom-padding',
            'page-bottom-padding-with-chat',
            'page-horizontal-padding',
        ]
    },
    {
        title: 'Content',
        prefix: '--',
        tokens: [
            'content-section-list-spacing',
            'content-group-list-spacing',
            'content-element-list-spacing',
        ]
    }
];

const ROUNDING_GROUPS = [
    {
        title: 'Base',
        prefix: '--rounding',
        tokens: [
            '0-5x', '1x', '1-5x', '2x', '2-5x', '3x', '3-5x', '4x', '4-5x', '5x', '6x',
            '8x', '10x', '12x', '14x', '16x', '20x', '24x', 'pill'
        ]
    },
    {
        title: 'Buttons',
        prefix: '--',
        tokens: ['button-rounding-strong', 'button-rounding-weak']
    },
    {
        title: 'Cells',
        prefix: '--',
        tokens: ['cell-rounding-strong', 'cell-rounding-weak']
    },
    {
        title: 'Chips',
        prefix: '--',
        tokens: ['chip-rounding-strong', 'chip-rounding-weak']
    },
    {
        title: 'Checkbox',
        prefix: '--',
        tokens: ['checkbox-rounding']
    },
    {
        title: 'Cards',
        prefix: '--',
        tokens: ['card-rounding']
    },
    {
        title: 'Forms',
        prefix: '--',
        tokens: ['form-rounding', 'form-rounding-weak']
    },
    {
        title: 'Popups',
        prefix: '--',
        tokens: ['popup-rounding-strong', 'popup-rounding-weak']
    },
    {
        title: 'Slider',
        prefix: '--',
        tokens: ['slider-rounding']
    },
    {
        title: 'Tags',
        prefix: '--',
        tokens: ['tag-rounding-strong', 'tag-rounding', 'tag-rounding-weak']
    }
];

const SHADOWS = [
    { label: 'Raised', id: 'Raised' },
    { label: 'Card', id: 'Card' },
    { label: 'Popout', id: 'Popout' },
    { label: 'Popup-Inverse', id: 'Popup-Inverse' },
    { label: 'Floating', id: 'Floating' },
    { label: 'Brand', id: 'Brand' },
    { label: 'Drawer-Right', id: 'Drawer-Right' },
    { label: 'Drawer-Left', id: 'Drawer-Left' },
    { label: 'Hovered', id: 'Hovered' },
    { label: 'Pressed', id: 'Pressed' },
    { label: 'Sticky-Left', id: 'Sticky-Left' },
    { label: 'Sticky-Top', id: 'Sticky-Top' },
];

const TYPOGRAPHY_SIZES = [
    { label: '7XL', meta: '60 / 66', id: '7xl' },
    { label: '6XL', meta: '48 / 54', id: '6xl' },
    { label: '5XL', meta: '42 / 48', id: '5xl' },
    { label: '4XL', meta: '36 / 40', id: '4xl' },
    { label: '3XL', meta: '30 / 36', id: '3xl' },
    { label: '2XL', meta: '24 / 30', id: '2xl' },
    { label: 'XL', meta: '20 / 26', id: 'xl' },
    { label: 'L', meta: '18 / 22', id: 'l' },
    { label: 'M', meta: '16 / 20', id: 'm' },
    { label: 'S', meta: '14 / 18', id: 's' },
    { label: 'XS', meta: '12 / 15', id: 'xs' },
    { label: 'XXS', meta: '10 / 13', id: 'xxs' },
];

export const StylesPreview: React.FC = () => {
    return (
        <div className="tab-panel is-active" id="styles-panel">
            {/* TYPOGRAPHY */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Typography</h1>
                <div className="preview-grid preview-grid--matrix typography-grid" style={{ '--label-w': '180px', '--cols': 3, '--col-w': 'minmax(0, 1fr)' } as React.CSSProperties}>
                    <div />
                    <div className="preview-grid__header ts-500-m">Regular</div>
                    <div className="preview-grid__header ts-500-m">Medium</div>
                    <div className="preview-grid__header ts-500-m">DemiBold</div>

                    {TYPOGRAPHY_SIZES.map(size => (
                        <React.Fragment key={size.id}>
                            <div className="typography-grid__size">
                                <div className="preview-grid__label ts-500-m">{size.label}</div>
                                <div className="type-info ts-400-xs">
                                    <p>{size.meta}</p>
                                </div>
                            </div>
                            {[400, 500, 600].map(weight => (
                                <div key={`${size.id}-${weight}`} className="typography-grid__sample">
                                    <p className={`typography-grid__sample-text ts-${weight}-${size.id}`}>
                                        Typography
                                    </p>
                                    <div className="type-info ts-400-xs">
                                        <p>ts-{weight}-{size.id}</p>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* COLORS */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Colors</h1>
                <div className="token-section-list">
                    {COLOR_GROUPS.map(group => (
                        <div key={group.title}>
                            <h2 className="ts-600-l token-section__title">
                                {group.title}
                            </h2>
                            <div className="token-section">
                                {(group.rows || [group.colors]).map((row, rowIndex) => (
                                    <div key={rowIndex} className="token-grid token-grid--regular">
                                        {row.map(color => (
                                            <div key={color} className="token-card">
                                                <div 
                                                    className="token-visual--color" 
                                                    style={{ 
                                                        background: `var(${group.prefix}-${color})`,
                                                        border: '1px solid var(--container-transparent-1)'
                                                    }} 
                                                />
                                                <div className="token-info">
                                                    <p className="type-info ts-400-xs">{group.prefix}-{color}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SPACING */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Spacing</h1>
                <div className="token-section-list">
                    {SPACING_GROUPS.map(group => (
                        <div key={group.title}>
                            <h2 className="ts-600-l token-section__title">
                                {group.title}
                            </h2>
                            <div className="token-section">
                                <div className="token-grid token-grid--compact">
                                    {group.tokens.map(token => {
                                        const variableName = group.prefix === '--spacing'
                                            ? `${group.prefix}-${token}`
                                            : `${group.prefix}${token}`;

                                        return (
                                            <div key={token} className="token-card">
                                                <div
                                                    className="token-visual--spacing"
                                                    style={{
                                                        width: `var(${variableName})`,
                                                        height: '24px',
                                                        background: 'var(--primitive-brand)',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <div className="token-info">
                                                    <p className="type-info ts-400-xs">{variableName}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ROUNDING */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Rounding</h1>
                <div className="token-section-list">
                    {ROUNDING_GROUPS.map(group => (
                        <div key={group.title}>
                            <h2 className="ts-600-l token-section__title">
                                {group.title}
                            </h2>
                            <div className="token-section">
                                <div className="token-grid token-grid--compact">
                                    {group.tokens.map(token => (
                                        (() => {
                                            const variableName = group.prefix === '--rounding'
                                                ? `${group.prefix}-${token}`
                                                : `${group.prefix}${token}`;

                                            return (
                                                <div key={token} className="token-card">
                                                    <div
                                                        className="token-visual--rounding"
                                                        style={{
                                                            borderRadius: `var(${variableName})`
                                                        }}
                                                    />
                                                    <div className="token-info">
                                                        <p className="type-info ts-400-xs">{variableName}</p>
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SHADOWS */}
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Shadows</h1>
                <div className="token-grid token-grid--regular">
                    {SHADOWS.map(shadow => (
                        <div key={shadow.id} className="token-card">
                            <div
                                className="token-visual--shadow"
                                style={{
                                    boxShadow: `var(--${shadow.id})`
                                }}
                            />
                            <div className="token-info">
                                <p className="type-info ts-400-xs">--{shadow.id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
