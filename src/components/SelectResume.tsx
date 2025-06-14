import React, { useState } from 'react';
import { Building2, Briefcase, ArrowRight } from 'lucide-react';

const CompanyJobInputForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [showStyles, setShowStyles] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const resumeStyles = [
    {
      id: 'modern',
      name: '모던 스타일',
      description: '깔끔하고 현대적인 디자인',
      preview: '📋',
    },
    {
      id: 'classic',
      name: '클래식 스타일',
      description: '전통적이고 안정적인 디자인',
      preview: '📄',
    },
    {
      id: 'creative',
      name: '크리에이티브 스타일',
      description: '창의적이고 독특한 디자인',
      preview: '🎨',
    },
  ];

  const handleNext = () => {
    if (companyName.trim() && jobTitle.trim()) {
      setShowStyles(true);
    }
  };

  const handleBack = () => {
    setShowStyles(false);
  };

  if (showStyles && !selectedStyle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <button
              onClick={handleBack}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            >
              ← 뒤로 가기
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                이력서 스타일을 선택해주세요
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold text-blue-600">{companyName}</span>의{' '}
                <span className="font-semibold text-green-600">{jobTitle}</span> 포지션에 맞는
                스타일을 선택하세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {resumeStyles.map((style) => (
                <div
                  key={style.id}
                  className="group border-2 border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-b from-white to-gray-50"
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {style.preview}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{style.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">맞춤형 이력서 생성기</h1>
            <p className="text-gray-600">
              지원하려는 회사와 직무를 입력하면 더 정확한 이력서를 만들어드려요
            </p>
          </div>

          <div className="space-y-6">
            {/* 회사명 입력 */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">회사명</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 삼성전자, 네이버, 카카오..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* 직무 입력 */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">직무/포지션</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="예: 프론트엔드 개발자, 마케팅 매니저..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-200 text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={handleNext}
              disabled={!companyName.trim() || !jobTitle.trim()}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                companyName.trim() && jobTitle.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              스타일 선택하기
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* 추가 안내 */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-lg">💡</div>
              <div>
                <p className="text-blue-800 font-medium mb-1">더 정확한 이력서를 위한 팁</p>
                <p className="text-blue-700 text-sm">
                  구체적인 회사명과 직무를 입력할수록 해당 포지션에 최적화된 이력서를 생성할 수
                  있어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobInputForm;
