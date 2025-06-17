import React from 'react';
import { Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useGetEducations } from './graphql/queries/education.query';
import { useCreateEducation, useDeleteEducation } from './graphql/mutations/education.mutation';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const parsePeriod = (period: string): { startDate: Date; endDate: Date | null } => {
  const [start, end] = period.split('-').map((s) => s.trim());

  return {
    startDate: dayjs(start, 'YYYY.MM').toDate(), // ✅ Date 객체
    endDate: end ? dayjs(end, 'YYYY.MM').toDate() : null,
  };
};

const isValidPeriod = (period: string) => /^\d{4}\.\d{2} - (\d{4}\.\d{2})?$/.test(period.trim());

const isValidGPA = (gpa: string) => /^\d+(\.\d+)?\/\d+(\.\d+)?$/.test(gpa.trim());

interface Education {
  id: string;
  school: string;
  major: string;
  period: string;
  gpa: string;
}

interface EducationTabProps {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationTab = ({ educations, setEducations }: EducationTabProps) => {
  const addEducation = () => {
    const newId = nanoid(); // string 형태의 고유 ID 생성
    setEducations([
      ...educations,
      { id: newId, school: '', major: '', period: '', gpa: '' }, // ✅ school 초기값 '' 지정
    ]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const newEducations = educations.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setEducations(newEducations);
  };

  const { data, refetch } = useGetEducations();

  useEffect(() => {
    if (data) {
      setEducations(
        data.getEducations.map((edu) => ({
          id: edu.id,
          school: edu.schoolName,
          major: edu.major,
          period: `${dayjs(edu.startDate).format('YYYY.MM')}-${
            edu.endDate ? dayjs(edu.endDate).format('YYYY.MM') : ''
          }`,
          gpa: edu.degree,
        }))
      );
    }
  }, [data]);

  const [createEducation] = useCreateEducation();
  const [deleteEducation] = useDeleteEducation();

  const handleDeleteEducation = async (id: string) => {
    try {
      await deleteEducation({
        variables: { id },
      });

      setEducations((prev) => prev.filter((edu) => edu.id !== id));
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
      const existingEdus = data?.getEducations ?? [];

      for (const edu of existingEdus) {
        await deleteEducation({ variables: { id: edu.id } });
      }

      for (const edu of educations) {
        if (!edu.school || !edu.major || !edu.period || !edu.gpa) continue;

        const { startDate, endDate } = parsePeriod(edu.period);

        // if (!isValidPeriod(edu.period)) {
        //   alert(`재학기간 "${edu.period}" 형식이 올바르지 않습니다. 예: 2020.03-2024.02`);
        //   return;
        // }

        if (!isValidGPA(edu.gpa)) {
          alert(`학점 "${edu.gpa}" 형식이 올바르지 않습니다. 예: 3.8/4.5`);
          return;
        }

        await createEducation({
          variables: {
            input: {
              schoolName: edu.school,
              major: edu.major,
              degree: edu.gpa,
              startDate,
              endDate,
            },
          },
        });
      }

      // // 💡 서버 저장 후 최신 데이터로 갱신을 강제
      const newData = await refetch();
      if (newData.data) {
        setEducations(
          newData.data.getEducations.map((edu) => ({
            id: edu.id,
            school: edu.schoolName, // ✅ schoolName → school
            major: edu.major,
            period: `${edu.startDate}-${edu.endDate ?? ''}`, // ✅ period 생성
            gpa: edu.degree, // ✅ degree → gpa로 임시 대응
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
        <h2 className="text-2xl font-bold text-gray-800">학력</h2>
        <div className="flex space-x-2">
          <button
            onClick={addEducation}
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
        {educations &&
          educations.map((item, index) => (
            <div key={item.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-700">학력 정보 {index + 1}</h3>
                {educations.length > 1 && (
                  <button
                    onClick={() => handleDeleteEducation(item.id)}
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
                    value={item.school}
                    onChange={(e) => updateEducation(item.id, 'school', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="학교명을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">전공</label>
                  <input
                    type="text"
                    value={item.major}
                    onChange={(e) => updateEducation(item.id, 'major', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="전공을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">재학기간</label>
                  <input
                    type="text"
                    value={item.period}
                    onChange={(e) => updateEducation(item.id, 'period', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="2020.03-2024.02"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">학점</label>
                  <input
                    type="text"
                    value={item.gpa}
                    onChange={(e) => updateEducation(item.id, 'gpa', e.target.value)}
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
