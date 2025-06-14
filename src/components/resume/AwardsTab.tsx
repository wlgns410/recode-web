import { Plus } from 'lucide-react';
import { type Award } from '../../types/resume';

interface AwardsTabProps {
  awards: Award[];
  setAwards: React.Dispatch<React.SetStateAction<Award[]>>;
}

const AwardsTab = ({ awards, setAwards }: AwardsTabProps) => {
  const addAward = () => {
    const newId = awards.length > 0 ? Math.max(...awards.map((a) => a.id)) + 1 : 1;
    setAwards([...awards, { id: newId, title: '', date: '', organization: '' }]);
  };

  const removeAward = (id: number) => {
    if (awards.length > 1) {
      const newAwards = awards.filter((item) => item.id !== id);
      setAwards(newAwards);
    }
  };

  const updateAward = (id: number, field: string, value: string) => {
    const newAwards = awards.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setAwards(newAwards);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">수상</h2>
        <div className="flex space-x-2">
          <button
            onClick={addAward}
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
        {awards.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">수상 내역 {index + 1}</h3>
              {awards.length > 1 && (
                <button
                  onClick={() => removeAward(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">수상명</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateAward(item.id, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="수상명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">수상일</label>
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => updateAward(item.id, 'date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="2024.02.15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">주최기관</label>
                <input
                  type="text"
                  value={item.organization}
                  onChange={(e) => updateAward(item.id, 'organization', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="주최기관을 입력하세요"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsTab;
