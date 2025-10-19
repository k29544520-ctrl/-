
import React from 'react';

interface EarthIconProps {
  className?: string;
}

const HappyEarthIcon: React.FC<EarthIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3.33 4.5c1.83 0 3.42-1.17 4.06-2.83h-8.12c.64 1.66 2.23 2.83 4.06 2.83z" />
    </svg>
);

const SadEarthIcon: React.FC<EarthIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 10.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm7 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-3.66 6.31c-1.33.81-2.99.81-4.32 0-.21-.13-.28-.4-.15-.61.13-.21.4-.28.61-.15.93.57 2.13.57 3.06 0 .21-.13.48-.06.61.15.13.22.06.49-.15.61z" transform="rotate(180 12 12.5)" />
    </svg>
);


interface StatusDisplayProps {
  isHappy: boolean;
  onReset: () => void;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ isHappy, onReset }) => {
  const message = isHappy ? '지구가 행복해요!' : '지구가 아파요!';
  const subMessage = isHappy ? '골고루 먹는 당신, 정말 멋져요!' : '채소와 과일을 추가해주세요!';
  const colorClass = isHappy ? 'text-green-600' : 'text-red-500';
  const bgColorClass = isHappy ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300';
  const Icon = isHappy ? HappyEarthIcon : SadEarthIcon;

  return (
    <div className={`mt-6 w-full max-w-md p-4 border-2 rounded-lg flex flex-col items-center gap-4 transition-all duration-300 ${bgColorClass}`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-10 h-10 ${colorClass}`} />
        <div>
          <p className={`text-2xl font-bold ${colorClass}`}>{message}</p>
          <p className="text-gray-600">{subMessage}</p>
        </div>
      </div>
      <button 
        onClick={onReset}
        className="mt-2 px-6 py-2 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-colors"
      >
        다시 만들기
      </button>
    </div>
  );
};
