import { Plus } from 'lucide-react';
import { type ProjectType } from './types/project.type';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { useGetProjects } from './graphql/queries/project.query.ts';
import { useCreateProject, useDeleteProject } from './graphql/mutations/project.mutation.ts';

// 나중을 위해 프로젝트는 경력에 엮여 사용할 수도 있게 해놓았지만 현재는 개인 프로젝트만 하도록.

// UI용 타입 따로 선언
export interface ProjectForm {
  id: string;
  name: string;
  description: string;
  period: string;
  techStack: string;
  type: ProjectType;
  responsibility: string;
}

const parsePeriod = (period: string): { startDate: Date; endDate: Date | null } => {
  const [start, end] = period.split('-').map((s) => s.trim());

  return {
    startDate: dayjs(start, 'YYYY.MM.dd').toDate(), // ✅ Date 객체
    endDate: end ? dayjs(end, 'YYYY.MM.dd').toDate() : null,
  };
};

interface ProjectsTabProps {
  projects: ProjectForm[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectForm[]>>;
}

const ProjectsTab = ({ projects, setProjects }: ProjectsTabProps) => {
  const addProject = () => {
    const newId = nanoid();
    setProjects([
      ...projects,
      {
        id: newId,
        name: '',
        description: '',
        period: '',
        techStack: '',
        type: 'PERSONAL', // 현재는 개인 프로젝트만 허용
        responsibility: '',
      },
    ]);
  };

  const updateProject = (id: string, field: string, value: string) => {
    const newProjects = projects.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setProjects(newProjects);
  };

  const { data, refetch } = useGetProjects();

  useEffect(() => {
    if (data?.getMyProjects) {
      setProjects(
        data.getMyProjects.map((pro) => ({
          id: pro.id,
          name: pro.name,
          description: pro.description,
          period: `${dayjs(pro.startDate).format('YYYY.MM')} - ${
            pro.endDate ? dayjs(pro.endDate).format('YYYY.MM') : ''
          }`,
          techStack: pro.techStack?.join(', ') ?? '',
          type: pro.type,
          responsibility: pro.responsibility ?? '',
        }))
      );
    }
  }, [data]);

  const [createProject] = useCreateProject();
  const [deleteProject] = useDeleteProject();

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject({
        variables: { id },
      });

      setProjects((prev) => prev.filter((pro) => pro.id !== id));
      alert('프로젝트가 삭제되었습니다.');
    } catch (err) {
      console.error('프로젝트 삭제 오류:', err);
      alert('프로젝트 삭제에 실패했습니다.');
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await refetch();

      // 이건 서버에 있는 자격증 목록
      const existingPros = data?.getMyProjects ?? [];

      for (const pro of existingPros) {
        await deleteProject({ variables: { id: pro.id } });
      }

      for (const p of projects) {
        if (!p.name || !p.description || !p.techStack) continue;

        const { startDate, endDate } = parsePeriod(p.period);

        await createProject({
          variables: {
            input: {
              name: p.name,
              description: p.description,
              techStack: p.techStack.split(',').map((s) => s.trim()),
              startDate,
              endDate,
              type: p.type,
              responsibility: p.responsibility,
            },
          },
        });
      }

      // // 💡 서버 저장 후 최신 데이터로 갱신을 강제
      const newData = await refetch();
      if (newData.data) {
        setProjects(
          newData.data.getMyProjects.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            period: `${dayjs(p.startDate).format('YYYY.MM')} - ${
              p.endDate ? dayjs(p.endDate).format('YYYY.MM') : ''
            }`,
            techStack: p.techStack?.join(', ') ?? '',
            type: p.type,
            responsibility: p.responsibility ?? '',
          }))
        );
      }

      alert('프로젝트가 저장되었습니다!');
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">프로젝트</h2>
        <div className="flex space-x-2">
          <button
            onClick={addProject}
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
        {projects.map((item, index) => (
          <div key={item.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">프로젝트 {index + 1}</h3>
              {projects.length > 1 && (
                <button
                  onClick={() => handleDeleteProject(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  삭제
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">프로젝트명</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateProject(item.id, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="프로젝트명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => updateProject(item.id, 'period', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="2020.03 - 2024.02"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  프로젝트 설명
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateProject(item.id, 'description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="프로젝트 설명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">사용 기술</label>
                <input
                  type="text"
                  value={item.techStack}
                  onChange={(e) => updateProject(item.id, 'techStack', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="사용한 기술을 입력하세요"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
