// components/resume/CareerTab.tsx
import React from 'react';
import { Plus } from 'lucide-react';
import { type Career } from '../../types/resume';

interface CareerTabProps {
  career: Career[];
  setCareer: React.Dispatch<React.SetStateAction<Career[]>>;
}

const CareerTab = ({ career, setCareer }: CareerTabProps) => {
  const addCareer = () => {
    const newId = career.length > 0 ? Math.max(...career.map((c) => c.id)) + 1 : 1;
    setCareer([...career, { id: newId, company: '', position: '', period: '', description: '' }]);
  };

  const removeCareer = (id: number) => {
    if (career.length > 1) {
      const newCareer = career.filter((item) => item.id !== id);
      setCareer(newCareer);
    }
  };

  const updateCareer = (id: number, field: keyof Career, value: string) => {
    const newCareer = career.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setCareer(newCareer);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">경력</h2>
        <div className="flex space-x-2">
          <button
            onClick={addCareer}
            className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-700"
          >
            <Plus className="w-5 h-5" />
            <span>추가</span>
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            저장
          </button>
        </div>
      </div>
      <div className="space-y-6">
        {career.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">경력 정보 {index + 1}</h3>
              {career.length > 1 && (
                <button
                  onClick={() => removeCareer(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">회사명</label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateCareer(item.id, 'company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직무</label>
                <input
                  type="text"
                  value={item.position}
                  onChange={(e) => updateCareer(item.id, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="직무를 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">재직기간</label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => updateCareer(item.id, 'period', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="2020.03 - 2024.02"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">주요업무</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateCareer(item.id, 'description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="주요업무를 입력하세요"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTab;
