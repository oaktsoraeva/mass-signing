import React, { useState } from 'react';
import {
    PromoPageBanner,
    PromoPageCard,
    PromoPageHorizontalCard,
    Switch,
} from '../../src';

export const PromoPreview: React.FC = () => {
    const [isPromoAvatarVisible, setIsPromoAvatarVisible] = useState(true);
    const [isPromoImageVisible, setIsPromoImageVisible] = useState(true);
    const [isPromoDescriptionVisible, setIsPromoDescriptionVisible] = useState(true);
    const [isPromoHorizontal, setIsPromoHorizontal] = useState(false);
    const [isPromoBannerImageVisible, setIsPromoBannerImageVisible] = useState(true);
    const [isPromoBannerDescriptionVisible, setIsPromoBannerDescriptionVisible] = useState(true);
    const [isPromoBannerButtonVisible, setIsPromoBannerButtonVisible] = useState(true);
    const [isPromoHorizontalCardAccent, setIsPromoHorizontalCardAccent] = useState(false);
    const [isPromoHorizontalCardDescriptionVisible, setIsPromoHorizontalCardDescriptionVisible] = useState(true);
    const [isPromoHorizontalCardButtonVisible, setIsPromoHorizontalCardButtonVisible] = useState(true);

    return (
        <div className="tab-panel is-active">
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Promo Page Banner</h1>
                <div className="preview-grid preview-grid--inspector" style={{ overflowX: 'auto' }}>
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Image</span>
                                <Switch
                                    label="Banner image"
                                    isSelected={isPromoBannerImageVisible}
                                    onChange={setIsPromoBannerImageVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    label="Banner description"
                                    isSelected={isPromoBannerDescriptionVisible}
                                    onChange={setIsPromoBannerDescriptionVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Button</span>
                                <Switch
                                    label="Banner button"
                                    isSelected={isPromoBannerButtonVisible}
                                    onChange={setIsPromoBannerButtonVisible}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="preview-stage">
                        <PromoPageBanner
                            title="Text 5XL"
                            adaptiveTitle="Text 3XL"
                            description="Text XL"
                            adaptiveDescription="Text M"
                            buttonLabel="Text L"
                            hasImage={isPromoBannerImageVisible}
                            hasDescription={isPromoBannerDescriptionVisible}
                            hasButton={isPromoBannerButtonVisible}
                        />
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Promo Page Horizontal Card</h1>
                <div className="preview-grid preview-grid--inspector" style={{ overflowX: 'auto' }}>
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Accent</span>
                                <Switch
                                    label="Horizontal card accent state"
                                    isSelected={isPromoHorizontalCardAccent}
                                    onChange={setIsPromoHorizontalCardAccent}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    label="Horizontal card description"
                                    isSelected={isPromoHorizontalCardDescriptionVisible}
                                    onChange={setIsPromoHorizontalCardDescriptionVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Button</span>
                                <Switch
                                    label="Horizontal card button"
                                    isSelected={isPromoHorizontalCardButtonVisible}
                                    onChange={setIsPromoHorizontalCardButtonVisible}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="preview-stage">
                        <PromoPageHorizontalCard
                            title="Text 2XL"
                            description="Text L"
                            buttonLabel="Text L"
                            variant={isPromoHorizontalCardAccent ? 'accent' : 'default'}
                            hasDescription={isPromoHorizontalCardDescriptionVisible}
                            hasButton={isPromoHorizontalCardButtonVisible}
                        />
                    </div>
                </div>
            </section>
            <section className="component-screen">
                <h1 className="component-screen__title ts-600-2xl">Promo Page Card</h1>
                <div className="preview-grid preview-grid--inspector">
                    <div className="preview-controls">
                        <div className="preview-cell-switches">
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Avatar</span>
                                <Switch
                                    label="Avatar"
                                    isSelected={isPromoAvatarVisible}
                                    onChange={setIsPromoAvatarVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Image</span>
                                <Switch
                                    label="Image"
                                    isSelected={isPromoImageVisible}
                                    onChange={setIsPromoImageVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Description</span>
                                <Switch
                                    label="Description"
                                    isSelected={isPromoDescriptionVisible}
                                    onChange={setIsPromoDescriptionVisible}
                                />
                            </div>
                            <div className="preview-cell-switches__item">
                                <span className="ts-500-m">Horizontal</span>
                                <Switch
                                    label="Horizontal"
                                    isSelected={isPromoHorizontal}
                                    onChange={setIsPromoHorizontal}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="preview-stage">
                        <PromoPageCard
                            title="Text XL"
                            description="Text M"
                            hasAvatar={isPromoAvatarVisible}
                            hasImage={isPromoImageVisible}
                            hasDescription={isPromoDescriptionVisible}
                            isHorizontal={isPromoHorizontal}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
