import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useGetCareers } from './graphql/queries/career.query.ts';
import { useCreateCareer, useDeleteCareer } from './graphql/mutations/career.mutation.ts';
import {
  INDUSTRY_TYPES,
  INDUSTRY_LABELS,
  WORK_AREAS,
  WORK_AREA_LABELS,
} from './constants/career.enum.ts';

// Client - 추후 DB 형식으로 변경, 달력 추가
interface Career {
  id: string;
  companyName: string;
  position: string; // WorkArea
  industry: string; // IndustryType
  period: string;
  summary: string;
}

const parsePeriod = (period: string): { startDate: Date; endDate: Date | null } => {
  const [start, end] = period.split('-').map((s) => s.trim());

  return {
    startDate: dayjs(start, 'YYYY.MM.dd').toDate(), // ✅ Date 객체
    endDate: end ? dayjs(end, 'YYYY.MM.dd').toDate() : null,
  };
};

interface CareerTabProps {
  careers: Career[];
  setCareers: React.Dispatch<React.SetStateAction<Career[]>>;
}

const CareerTab = ({ careers, setCareers }: CareerTabProps) => {
  const addCareer = () => {
    const newId = nanoid();
    setCareers([
      ...careers,
      {
        id: newId,
        companyName: '',
        position: '',
        industry: '',
        period: '',
        summary: '',
      },
    ]);
  };

  const updateCareer = (id: string, field: keyof Career, value: string) => {
    const newCareer = careers.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setCareers(newCareer);
  };

  const { data, refetch } = useGetCareers();

  useEffect(() => {
    if (data?.getMyCareers) {
      setCareers(
        data.getMyCareers.map((car) => ({
          id: car.id,
          companyName: car.companyName,
          position: car.position,
          industry: car.industry,
          period: `${dayjs(car.startDate).format('YYYY.MM')} - ${
            car.endDate ? dayjs(car.endDate).format('YYYY.MM') : ''
          }`,
          summary: car.summary ?? '',
        }))
      );
    }
  }, [data]);

  const [createCareer] = useCreateCareer();
  const [deleteCareer] = useDeleteCareer();

  const handleDeleteCareer = async (id: string) => {
    try {
      await deleteCareer({
        variables: { id },
      });

      setCareers((prev) => prev.filter((car) => car.id !== id));
      alert('학력이 삭제되었습니다.');
    } catch (err) {
      console.error('학력 삭제 오류:', err);
      alert('학력 삭제에 실패했습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await refetch();

      // 이건 서버에 있는 자격증 목록
      const existingCars = data?.getMyCareers ?? [];

      for (const car of existingCars) {
        await deleteCareer({ variables: { id: car.id } });
      }

      for (const c of careers) {
        if (!c.companyName || !c.position || !c.industry || !c.period) continue;

        const { startDate, endDate } = parsePeriod(c.period);

        await createCareer({
          variables: {
            input: {
              companyName: c.companyName,
              position: c.position,
              industry: c.industry,
              summary: c.summary,
              startDate,
              endDate,
            },
          },
        });
      }

      // // 💡 서버 저장 후 최신 데이터로 갱신을 강제
      const newData = await refetch();
      if (newData.data) {
        setCareers(
          newData.data.getMyCareers.map((c) => ({
            id: c.id,
            companyName: c.companyName,
            position: c.position,
            industry: c.industry,
            summary: c.summary ?? '',
            period: `${dayjs(c.startDate).format('YYYY.MM')} - ${
              c.endDate ? dayjs(c.endDate).format('YYYY.MM') : ''
            }`,
          }))
        );
      }

      alert('학력이 저장되었습니다!');
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다.');
    }
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
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            저장
          </button>
        </div>
      </div>
      <div className="space-y-6">
        {careers.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">경력 정보 {index + 1}</h3>
              {careers.length > 1 && (
                <button
                  onClick={() => handleDeleteCareer(item.id)}
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
                  value={item.companyName}
                  onChange={(e) => updateCareer(item.id, 'companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직무</label>
                <select
                  value={item.position}
                  onChange={(e) => updateCareer(item.id, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">직무 선택</option>
                  {WORK_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {WORK_AREA_LABELS[area]}
                    </option>
                  ))}
                </select>
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
                <select
                  value={item.industry}
                  onChange={(e) => updateCareer(item.id, 'industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">산업 분야 선택</option>
                  {INDUSTRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {INDUSTRY_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerTab;
