import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FoodItem, FoodCategory } from '../types';

interface AiFeedbackProps {
  selectedFoods: {
    rice?: FoodItem;
    soup?: FoodItem;
    sides: FoodItem[];
  };
}

// Simple markdown to HTML renderer
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')       // Italic
        .replace(/\n/g, '<br />');                  // Newlines
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};


export const AiFeedback: React.FC<AiFeedbackProps> = ({ selectedFoods }) => {
    const [feedback, setFeedback] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const getFeedback = useCallback(async () => {
        const allFoods = [
            selectedFoods.rice,
            selectedFoods.soup,
            ...selectedFoods.sides
        ].filter((food): food is FoodItem => food !== undefined);

        if (allFoods.length === 0) {
            alert('먼저 식판에 음식을 담아주세요!');
            return;
        }

        setIsLoading(true);
        setError('');
        setFeedback('');

        try {
            if (!process.env.API_KEY) {
                throw new Error("API 키가 설정되지 않았습니다.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const foodNames = allFoods.map(f => f.name).join(', ');
            
            const hasVegetable = selectedFoods.sides.some(f => f.category === FoodCategory.VEGETABLE);
            const hasMeat = selectedFoods.sides.some(f => f.category === FoodCategory.MEAT);
            const hasFruit = selectedFoods.sides.some(f => f.category === FoodCategory.FRUIT);

            let prompt = '';
            if (hasVegetable && hasMeat && hasFruit) {
                 prompt = `당신은 초등학생을 위한 친절하고 상냥한 AI 영양사입니다. 다음은 학생이 선택한 식단입니다: [${foodNames}]. 이 식단은 채소, 고기, 과일을 모두 포함하고 있어 매우 균형 잡힌 훌륭한 식단입니다. 이 점을 강조하며 칭찬과 격려를 담아 쉽고 재미있게 한글로 3~4문장으로 평가해주세요.`;
            } else {
                const missingItems: string[] = [];
                if (!hasVegetable) missingItems.push('채소');
                if (!hasMeat) missingItems.push('고기');
                if (!hasFruit) missingItems.push('과일');

                const missingText = missingItems.join(', ');

                prompt = `당신은 초등학생을 위한 친절하고 상냥한 AI 영양사입니다. 다음은 학생이 선택한 식단입니다: [${foodNames}]. 이 식단에는 ${missingText} 반찬이 빠져있어 조금 아쉬워요. ${missingText}를 추가해서 더 건강하고 완벽한 식단을 만들어 보자고 부드럽게 격려하는 말투로 쉽고 재미있게 한글로 3~4문장으로 설명해주세요. 예를 들어, 채소는 우리 몸의 청소부, 고기는 힘을 솟게 하는 에너지원, 과일은 비타민 충전소라고 비유할 수 있어요.`;
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setFeedback(response.text);

        } catch (e: any) {
            console.error("AI Feedback error:", e);
            setError('AI 피드백을 받지 못했어요. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedFoods]);

    return (
        <div className="mt-6 w-full max-w-md p-4 bg-white border-2 border-dashed border-sky-300 rounded-lg flex flex-col items-center gap-4 transition-all duration-300">
            <h3 className="text-xl font-bold text-sky-700">AI 영양사 피드백</h3>
            <p className="text-gray-600 text-center text-sm">
                식판을 다 채웠나요? AI 영양사에게 건강한 식단인지 평가를 받아보세요!
            </p>
            <button
                onClick={getFeedback}
                disabled={isLoading}
                className="px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? '분석 중...' : '식단 평가받기'}
            </button>
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            {feedback && (
                <div className="mt-4 p-3 bg-sky-50 rounded-md border border-sky-200 text-left w-full">
                    <p className="text-gray-800 leading-relaxed">
                        <SimpleMarkdown text={feedback} />
                    </p>
                </div>
            )}
        </div>
    );
};