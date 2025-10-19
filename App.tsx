import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FoodCategory, FoodItem } from './types';
import { FoodSelectionPanel } from './components/FoodSelectionPanel';
import { MealTray } from './components/MealTray';
import { StatusDisplay } from './components/StatusDisplay';
import { AiFeedback } from './components/AiFeedback';
import { SOUND_EFFECTS } from './constants';

declare var QRCode: any;

interface SelectedFoods {
  rice?: FoodItem;
  soup?: FoodItem;
  sides: FoodItem[];
}

const playSound = (soundUrl: string) => {
    try {
        const audio = new Audio(soundUrl);
        audio.play().catch(error => console.error("Audio playback failed:", error));
    } catch (e) {
        console.error("Could not create audio object:", e);
    }
};

const App: React.FC = () => {
    const [selectedFoods, setSelectedFoods] = useState<SelectedFoods>({ sides: [] });
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        if (typeof QRCode !== 'undefined') {
            QRCode.toDataURL(window.location.href, { width: 200, margin: 1 })
                .then((url: string) => {
                    setQrCodeUrl(url);
                })
                .catch((err: any) => {
                    console.error("QR Code generation failed:", err);
                });
        }
    }, []);

    const handleSelectFood = useCallback((food: FoodItem) => {
        setSelectedFoods(prev => {
            switch (food.category) {
                case FoodCategory.RICE:
                    if (prev.rice?.id === food.id) {
                        playSound(SOUND_EFFECTS.DESELECT);
                        return { ...prev, rice: undefined };
                    }
                    playSound(SOUND_EFFECTS.SELECT);
                    return { ...prev, rice: food };
                case FoodCategory.SOUP:
                    if (prev.soup?.id === food.id) {
                        playSound(SOUND_EFFECTS.DESELECT);
                        return { ...prev, soup: undefined };
                    }
                    playSound(SOUND_EFFECTS.SELECT);
                    return { ...prev, soup: food };
                case FoodCategory.VEGETABLE:
                case FoodCategory.MEAT:
                case FoodCategory.FRUIT:
                    const isAlreadySelected = prev.sides.some(side => side.id === food.id);
                    if (isAlreadySelected) {
                        playSound(SOUND_EFFECTS.DESELECT);
                        return { ...prev, sides: prev.sides.filter(side => side.id !== food.id) };
                    } else if (prev.sides.length < 4) {
                        playSound(SOUND_EFFECTS.SELECT);
                        return { ...prev, sides: [...prev.sides, food] };
                    }
                    return prev;
                default:
                    return prev;
            }
        });
    }, []);

    const handleReset = useCallback(() => {
        setSelectedFoods({ sides: [] });
    }, []);

    const isEarthHappy = useMemo(() => {
        const hasVegetable = selectedFoods.sides.some(item => item.category === FoodCategory.VEGETABLE);
        const hasFruit = selectedFoods.sides.some(item => item.category === FoodCategory.FRUIT);
        return hasVegetable && hasFruit;
    }, [selectedFoods]);


    return (
        <div className="container mx-auto p-4 md:p-8 font-sans">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-700">지구를 위한 건강 식판 만들기</h1>
                <p className="text-lg text-gray-600 mt-2">채소와 과일을 골고루 담아 아픈 지구를 행복하게 만들어 주세요!</p>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
                <FoodSelectionPanel onSelectFood={handleSelectFood} />
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4 text-center">나의 식판</h2>
                    <MealTray selectedFoods={selectedFoods} />
                    <StatusDisplay isHappy={isEarthHappy} onReset={handleReset} />
                    <AiFeedback selectedFoods={selectedFoods} />
                </div>
            </main>

            <footer className="mt-12 py-8 border-t-2 border-gray-200">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">QR 코드로 친구와 함께하기</h2>
                    <p className="text-gray-600 mb-4 max-w-md">스마트폰 카메라로 아래 QR 코드를 스캔하면 친구도 함께 이 게임을 즐길 수 있어요.</p>
                    {qrCodeUrl ? (
                        <img src={qrCodeUrl} alt="App QR Code" className="border-4 border-white rounded-lg shadow-lg" />
                    ) : (
                        <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
                            <p className="text-gray-500">QR 코드 생성 중...</p>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default App;