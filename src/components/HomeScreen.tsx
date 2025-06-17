import React from 'react';
import { Calendar, User, FileText, Plus, Download, LogIn, AlertTriangle } from 'lucide-react';
import { useCreateDailyLog } from '../hooks/graphql/mutations/dailyLog.mutation';
import { useGetCareers } from '../components/resume/graphql/queries/career.query';
import { useGetProjects } from '../components/resume/graphql/queries/project.query';
import { WorkArea, DailyTag, DailyTagLabels, WorkAreaLabels } from '../types/enums';
import { useState } from 'react';
import { useLogout } from '../auth/graphql/logout.mutation';
import { useWithdraw } from '../auth/graphql/withdraw.mutation';

interface HomeScreenProps {
  isLoggedIn: boolean;
  newRecord: string;
  setNewRecord: (text: string) => void;
  addRecord: () => void;
  setCurrentScreen: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  isLoggedIn,
  newRecord,
  setNewRecord,
  addRecord,
  setCurrentScreen,
}) => {
  const [selectedTag, setSelectedTag] = useState<DailyTag>(DailyTag.DEVELOPMENT);
  const [selectedArea, setSelectedArea] = useState<WorkArea>(WorkArea.FRONTEND);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedCareerId, setSelectedCareerId] = useState<string>('');
  const [useProject, setUseProject] = useState<boolean>(true); // true: projectId 사용, false: careerId 사용

  const [createDailyLog, { loading, error }] = useCreateDailyLog();
  const { data: projectsData, loading: projectsLoading, error: projectsError } = useGetProjects();
  const { data: careersData, loading: careersLoading, error: careersError } = useGetCareers();

  // 로그아웃과 회원탈퇴 뮤테이션
  const { logout, loading: logoutLoading } = useLogout();
  const { withdraw, loading: withdrawLoading } = useWithdraw();

  const handleCreateDailyLog = async () => {
    if (!newRecord.trim()) {
      alert('기록 내용을 입력해주세요.');
      return;
    }

    if (!selectedProjectId.trim() && !selectedCareerId.trim()) {
      alert('프로젝트 또는 경력을 선택해주세요.');
      return;
    }

    try {
      const input = {
        content: newRecord,
        tag: selectedTag,
        area: selectedArea,
        ...(useProject && selectedProjectId ? { projectId: selectedProjectId } : {}),
        ...(!useProject && selectedCareerId ? { careerId: selectedCareerId } : {}),
      };

      const result = await createDailyLog({
        variables: { input },
      });

      if (result.data?.createDailyLog?.id) {
        alert('기록이 성공적으로 저장되었습니다!');
        setNewRecord('');
        setSelectedProjectId('');
        setSelectedCareerId('');
      }
    } catch (err) {
      console.error('기록 저장 실패:', err);
      alert('기록 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      logout();
    }
  };

  const handleWithdraw = () => {
    if (window.confirm('정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      withdraw();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 overflow-x-hidden">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ResumeLog</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentScreen('calendar')}
              className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>기록 보기</span>
            </button>
            <button
              onClick={() => setCurrentScreen('resume-info')}
              className="flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>이력서 정보</span>
            </button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {logoutLoading ? '로그아웃 중...' : '로그아웃'}
                </button>
                {/* <button
                  onClick={handleWithdraw}
                  disabled={withdrawLoading}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                >
                  <AlertTriangle className="w-3 h-3" />
                  {withdrawLoading ? '처리중...' : '회원탈퇴'}
                </button> */}
              </div>
            ) : (
              <button
                onClick={() => setCurrentScreen('auth')}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>로그인</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            매일의 성장을 기록하고 <span className="text-orange-500">간편하게</span> 이력서를
            만들어보세요
          </h2>
        </div>

        {/* 중앙 컨텐츠 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
              <Plus className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">오늘의 기록</h3>

            <div className="space-y-4">
              {/* 기록 내용 */}
              <textarea
                value={newRecord}
                onChange={(e) => setNewRecord(e.target.value)}
                placeholder="오늘의 나는 무엇을 했나요? 프로젝트, 학습, 성과 등을 기록해보세요!"
                className="w-full p-4 border border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />

              {/* 태그 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value as DailyTag)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Object.entries(DailyTagLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 작업 영역 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">작업 영역</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value as WorkArea)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Object.entries(WorkAreaLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 프로젝트/경력 선택 */}
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={useProject}
                      onChange={() => {
                        setUseProject(true);
                        setSelectedCareerId('');
                      }}
                      className="mr-2 text-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">프로젝트</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!useProject}
                      onChange={() => {
                        setUseProject(false);
                        setSelectedProjectId('');
                      }}
                      className="mr-2 text-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">경력</span>
                  </label>
                </div>

                {useProject ? (
                  <div>
                    {projectsLoading ? (
                      <div className="p-3 text-center text-gray-500">
                        프로젝트 목록을 불러오는 중...
                      </div>
                    ) : projectsError ? (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        프로젝트 목록을 불러오는데 실패했습니다.
                      </div>
                    ) : (
                      <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">프로젝트를 선택하세요</option>
                        {projectsData?.getMyProjects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ) : (
                  <div>
                    {careersLoading ? (
                      <div className="p-3 text-center text-gray-500">
                        경력 목록을 불러오는 중...
                      </div>
                    ) : careersError ? (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        경력 목록을 불러오는데 실패했습니다.
                      </div>
                    ) : (
                      <select
                        value={selectedCareerId}
                        onChange={(e) => setSelectedCareerId(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">경력을 선택하세요</option>
                        {careersData?.getMyCareers.map((career) => (
                          <option key={career.id} value={career.id}>
                            {career.companyName}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>

              {/* 에러 메시지 */}
              {(error || projectsError || careersError) && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm">
                    오류가 발생했습니다:{' '}
                    {error?.message || projectsError?.message || careersError?.message}
                  </p>
                </div>
              )}

              {/* 기록하기 버튼 */}
              <button
                onClick={handleCreateDailyLog}
                disabled={loading}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '기록 중...' : '기록하기'}
              </button>
            </div>
          </div>
        </div>

        {/* 이력서 생성하기 버튼 */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentScreen('resume-info')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>이력서 다운로드</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
