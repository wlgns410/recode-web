// components/resume/EducationTab.tsx
import React from 'react';
import { Plus } from 'lucide-react';

interface Education {
  id: number;
  school: string;
  major: string;
  period: string;
  gpa: string;
}

interface EducationTabProps {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationTab = ({ education, setEducation }: EducationTabProps) => {
  const addEducation = () => {
    const newId = education.length > 0 ? Math.max(...education.map((e) => e.id)) + 1 : 1;
    setEducation([...education, { id: newId, school: '', major: '', period: '', gpa: '' }]);
  };

  const removeEducation = (id: number) => {
    if (education.length > 1) {
      const newEducation = education.filter((item) => item.id !== id);
      setEducation(newEducation);
    }
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    const newEducation = education.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setEducation(newEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">학력</h2>
        <div className="flex space-x-2">
          <button
            onClick={addEducation}
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
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">학력 정보 {index + 1}</h3>
              {education.length > 1 && (
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">학교명</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="학교명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">전공</label>
                <input
                  type="text"
                  value={edu.major}
                  onChange={(e) => updateEducation(edu.id, 'major', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="전공을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">재학기간</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="2020.03 - 2024.02"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">학점</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="3.8/4.5"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTab;
