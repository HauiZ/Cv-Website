import { useState } from 'react';
import Overview from './Overview';
import CVGuide from './CVGuide';
import Interview from './Interview';
import Tips from './Tips';

export default function ToolFormat() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-green-600 to-green-500 shadow-lg">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-white text-center mb-2 animate-pulse">
                        Cẩm Nang Xin Việc & Viết CV Chuyên Nghiệp
                    </h1>
                    <p className="text-green-100 text-center text-lg">
                        Bí quyết để chinh phục nhà tuyển dụng và khởi đầu sự nghiệp mơ ước
                    </p>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto flex overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-6 font-medium text-sm transition-colors duration-300 border-b-2 hover:text-green-600 
              ${activeTab === 'overview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'}`}
                    >
                        Tổng Quan
                    </button>
                    <button
                        onClick={() => setActiveTab('cv')}
                        className={`py-4 px-6 font-medium text-sm transition-colors duration-300 border-b-2 hover:text-green-600 
              ${activeTab === 'cv' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'}`}
                    >
                        Viết CV
                    </button>
                    <button
                        onClick={() => setActiveTab('interview')}
                        className={`py-4 px-6 font-medium text-sm transition-colors duration-300 border-b-2 hover:text-green-600 
              ${activeTab === 'interview' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'}`}
                    >
                        Phỏng Vấn
                    </button>
                    <button
                        onClick={() => setActiveTab('tips')}
                        className={`py-4 px-6 font-medium text-sm transition-colors duration-300 border-b-2 hover:text-green-600 
              ${activeTab === 'tips' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-600'}`}
                    >
                        Mẹo Hữu Ích
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {activeTab === 'overview' && <Overview />}

                {activeTab === 'cv' && <CVGuide />}

                {activeTab === 'interview' && <Interview />}

                {activeTab === 'tips' && <Tips />}
            </main>
        </div>
    );
}
