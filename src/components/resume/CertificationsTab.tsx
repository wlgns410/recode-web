import { Plus } from 'lucide-react';
import { type Certification } from '../../types/resume';

interface CertificationsTabProps {
  certifications: Certification[];
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
}

const CertificationsTab = ({ certifications, setCertifications }: CertificationsTabProps) => {
  const addCertification = () => {
    const newId = certifications.length > 0 ? Math.max(...certifications.map((c) => c.id)) + 1 : 1;
    setCertifications([...certifications, { id: newId, title: '', date: '', organization: '' }]);
  };

  const removeCertification = (id: number) => {
    if (certifications.length > 1) {
      const newCertifications = certifications.filter((item) => item.id !== id);
      setCertifications(newCertifications);
    }
  };

  const updateCertification = (id: number, field: string, value: string) => {
    const newCertifications = certifications.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setCertifications(newCertifications);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">자격증</h2>
        <div className="flex space-x-2">
          <button
            onClick={addCertification}
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
        {certifications.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">자격증 {index + 1}</h3>
              {certifications.length > 1 && (
                <button
                  onClick={() => removeCertification(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">자격증명</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateCertification(item.id, 'title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="자격증명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">취득일</label>
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => updateCertification(item.id, 'date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="2024.02.15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">발행기관</label>
                <input
                  type="text"
                  value={item.organization}
                  onChange={(e) => updateCertification(item.id, 'organization', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="발행기관을 입력하세요"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsTab;
