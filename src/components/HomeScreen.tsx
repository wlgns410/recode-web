import React from 'react';
import { Calendar, User, FileText, Plus, Download, LogIn } from 'lucide-react';

interface HomeScreenProps {
  isLoggedIn: boolean;
  newRecord: string;
  setNewRecord: (text: string) => void;
  addRecord: () => void;
  setCurrentScreen: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  isLoggedIn,
  newRecord,
  setNewRecord,
  addRecord,
  setCurrentScreen,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 overflow-x-hidden">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ResumeLog</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentScreen('calendar')}
              className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>기록 보기</span>
            </button>
            <button
              onClick={() => setCurrentScreen('resume-info')}
              className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>이력서 정보</span>
            </button>
            {isLoggedIn ? (
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                로그아웃
              </button>
            ) : (
              <button
                onClick={() => setCurrentScreen('auth')}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>로그인</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            매일의 성장을 기록하고 <span className="text-orange-500">간편하게</span> 이력서를
            만들어보세요
          </h2>
        </div>

        {/* 중앙 컨텐츠 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
              <Plus className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">오늘의 기록</h3>
            <div className="space-y-4">
              <textarea
                value={newRecord}
                onChange={(e) => setNewRecord(e.target.value)}
                placeholder="오늘의 나는 무엇을 했나요? 프로젝트, 학습, 성과 등을 기록해보세요!"
                className="w-full p-4 border border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={addRecord}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
              >
                기록하기
              </button>
            </div>
          </div>
        </div>

        {/* 이력서 생성하기 버튼 */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentScreen('resume-info')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>이력서 다운로드</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
