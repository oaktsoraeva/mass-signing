import React, { useState } from 'react';
import { StylesPreview } from './preview/StylesPreview';
import { IconsPreview } from './preview/IconsPreview';
import { AtomsPreview } from './preview/AtomsPreview';
import { ComponentsPreview } from './preview/ComponentsPreview';
import { OverlaysPreview } from './preview/OverlaysPreview';
import { PromoPreview } from './preview/PromoPreview';
import './App.css';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'styles' | 'icons' | 'atoms' | 'components' | 'promo' | 'overlays'>('atoms');

    return (
        <main className="components-preview">
            <nav className="tab-nav">
                <button
                    className={`tab-btn ${activeTab === 'styles' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('styles')}
                >
                    Стили
                </button>
                <button
                    className={`tab-btn ${activeTab === 'icons' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('icons')}
                >
                    Иконки
                </button>
                <button
                    className={`tab-btn ${activeTab === 'atoms' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('atoms')}
                >
                    Атомы
                </button>
                <button
                    className={`tab-btn ${activeTab === 'components' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('components')}
                >
                    Компоненты
                </button>
                <button
                    className={`tab-btn ${activeTab === 'promo' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('promo')}
                >
                    Промо
                </button>
                <button
                    className={`tab-btn ${activeTab === 'overlays' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('overlays')}
                >
                    Оверлеи
                </button>
            </nav>

            {activeTab === 'styles' && <StylesPreview />}
            {activeTab === 'icons' && <IconsPreview />}
            {activeTab === 'atoms' && <AtomsPreview />}
            {activeTab === 'components' && <ComponentsPreview />}
            {activeTab === 'promo' && <PromoPreview />}
            {activeTab === 'overlays' && <OverlaysPreview />}
        </main>
    );
};

export default App;
