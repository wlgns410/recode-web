import { Plus } from 'lucide-react';
import dayjs from 'dayjs';
import { type Certification } from '../../types/resume';
import {
  useCreateCertificate,
  useDeleteCertificate,
} from './graphql/mutations/certification.mutation';
import { useGetCertificates } from './graphql/queries/certification.query';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { type CertificateType } from './constants/certificate.enum';

const currentTabType: CertificateType = 'AWARD';

interface AwardsTabProps {
  awards: Certification[];
  setAwards: React.Dispatch<React.SetStateAction<Certification[]>>;
}

const AwardsTab = ({ awards, setAwards }: AwardsTabProps) => {
  const addAward = () => {
    const newId = nanoid();
    setAwards([...awards, { id: newId, title: '', date: '', organization: '' }]);
  };

  const updateAward = (id: string, field: string, value: string) => {
    const newAwards = awards.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setAwards(newAwards);
  };

  const { data, refetch } = useGetCertificates(currentTabType);

  useEffect(() => {
    if (data) {
      setAwards(
        data.getCertificates.map((cert) => ({
          id: cert.id,
          title: cert.name,
          date: cert.issuedDate,
          organization: cert.issuer ?? '',
        }))
      );
    }
  }, [data, currentTabType]);

  const [createCertificate] = useCreateCertificate();
  const [deleteCertificate] = useDeleteCertificate();

  const handleDeleteCertificate = async (id: string) => {
    try {
      await deleteCertificate({
        variables: { id },
      });

      setAwards((prev) => prev.filter((cert) => cert.id !== id));
      alert('수상 내역이 삭제되었습니다.');
    } catch (err) {
      console.error('수상 내역 삭제 오류:', err);
      alert('수상 내역 삭제에 실패했습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await refetch();

      // 이건 서버에 있는 자격증 목록
      const existingCerts = data?.getCertificates ?? [];

      for (const cert of existingCerts) {
        await deleteCertificate({ variables: { id: cert.id } });
      }

      for (const cert of awards) {
        if (!cert.title || !cert.date) continue;

        await createCertificate({
          variables: {
            input: {
              name: cert.title,
              issuedDate: dayjs(cert.date).toISOString(),
              issuer: cert.organization,
              type: currentTabType,
            },
          },
        });
      }
      // 💡 서버 저장 후 최신 데이터로 갱신을 강제
      const newData = await refetch();
      if (newData.data) {
        setAwards(
          newData.data.getCertificates.map((cert) => ({
            id: cert.id,
            title: cert.name,
            date: cert.issuedDate,
            organization: cert.issuer ?? '',
          }))
        );
      }

      alert('자격증이 저장되었습니다!');
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다.');
    }
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
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
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
                  onClick={() => handleDeleteCertificate(item.id)}
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
