import { Plus } from 'lucide-react';
import { type Project } from '../../types/resume';

interface ProjectsTabProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectsTab = ({ projects, setProjects }: ProjectsTabProps) => {
  const addProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    setProjects([...projects, { id: newId, title: '', period: '', description: '', tech: '' }]);
  };

  const removeProject = (id: number) => {
    if (projects.length > 1) {
      const newProjects = projects.filter((item) => item.id !== id);
      setProjects(newProjects);
    }
  };

  const updateProject = (id: number, field: string, value: string) => {
    const newProjects = projects.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setProjects(newProjects);
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
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
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
                  onClick={() => removeProject(item.id)}
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
                  value={item.title}
                  onChange={(e) => updateProject(item.id, 'title', e.target.value)}
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
                  value={item.tech}
                  onChange={(e) => updateProject(item.id, 'tech', e.target.value)}
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
