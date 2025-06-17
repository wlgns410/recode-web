import { useState, useEffect } from 'react';
import { User, FileText, ChevronLeft } from 'lucide-react';
import CompanyJobInputForm from './ResumePreview';
import PersonalInfoTab from '../components/resume/PersonalInfoTab';
import EducationTab from '../components/resume/EducationTab';
import CareerTab from '../components/resume/CareerTab';
import ProjectsTab, { type ProjectForm } from './resume/ProjectsTab';
import AwardsTab from './resume/AwardsTab';
import CertificationsTab from './resume/CertificationsTab.tsx';
import { useGetCertificates } from './resume/graphql/queries/certification.query';
import { useGetCareers } from './resume/graphql/queries/career.query.ts';
import { useGetEducations } from './resume/graphql/queries/education.query';
import { useGetUserProfile } from './resume/graphql/queries/profile.query';
import { useGetProjects } from './resume/graphql/queries/project.query.ts';

interface ResumeInfoScreenProps {
  setCurrentScreen: (screen: string) => void;
}

const ResumeInfoScreen = ({ setCurrentScreen }: ResumeInfoScreenProps) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

  // GraphQL 쿼리들
  const { data: profileData } = useGetUserProfile();
  const { data: educationsData } = useGetEducations();
  const { data: careersData } = useGetCareers();
  const { data: projectsData } = useGetProjects();
  const { data: certificationsData } = useGetCertificates('LICENSE');
  const { data: awardsData } = useGetCertificates('AWARD');

  // 개인정보 상태
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    blog: '',
  });

  // 학력 상태
  const [educations, setEducations] = useState([
    { id: '1', school: '', major: '', period: '', gpa: '' },
  ]);

  // 경력 상태
  const [careers, setCareers] = useState([
    { id: '1', companyName: '', position: '', industry: '', period: '', summary: '' },
  ]);

  // 프로젝트 상태
  const [projects, setProjects] = useState<ProjectForm[]>([
    {
      id: '1',
      name: '',
      description: '',
      period: '',
      techStack: '',
      type: 'PERSONAL',
      responsibility: '',
    },
  ]);

  // 수상 상태
  const [awards, setAwards] = useState([{ id: '1', title: '', date: '', organization: '' }]);

  // 자격증 상태
  const [certifications, setCertifications] = useState([
    { id: '1', title: '', date: '', organization: '' },
  ]);

  // 데이터 로드 시 상태 업데이트
  useEffect(() => {
    if (profileData?.getMyUserProfile) {
      const profile = profileData.getMyUserProfile;
      setPersonalInfo({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        blog: profile.blog || '',
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (educationsData?.getEducations) {
      const educationsList = educationsData.getEducations;
      if (educationsList && educationsList.length > 0) {
        setEducations(
          educationsList.map((edu: any) => ({
            id: edu.id || '',
            school: edu.school || '',
            major: edu.major || '',
            period: edu.period || '',
            gpa: edu.gpa || '',
          }))
        );
      }
    }
  }, [educationsData]);

  useEffect(() => {
    if (careersData?.getMyCareers) {
      const careersList = careersData.getMyCareers;
      if (careersList && careersList.length > 0) {
        setCareers(
          careersList.map((career: any) => ({
            id: career.id || '',
            companyName: career.companyName || '',
            position: career.position || '',
            industry: career.industry || '',
            period: career.period || '',
            summary: career.summary || '',
          }))
        );
      }
    }
  }, [careersData]);

  useEffect(() => {
    if (projectsData?.getMyProjects) {
      const projectsList = projectsData.getMyProjects;
      if (projectsList && projectsList.length > 0) {
        setProjects(
          projectsList.map((project: any) => ({
            id: project.id || '',
            name: project.name || '',
            description: project.description || '',
            period: project.period || '',
            techStack: project.techStack || '',
            type: project.type || 'PERSONAL',
            responsibility: project.responsibility || '',
          }))
        );
      }
    }
  }, [projectsData]);

  useEffect(() => {
    if (certificationsData?.getCertificates) {
      const certificationsList = certificationsData.getCertificates;
      if (certificationsList && certificationsList.length > 0) {
        setCertifications(
          certificationsList.map((cert: any) => ({
            id: cert.id || '',
            title: cert.name || '',
            date: cert.issuedDate || '',
            organization: cert.issuer || '',
          }))
        );
      }
    }
  }, [certificationsData]);

  useEffect(() => {
    if (awardsData?.getCertificates) {
      const awardsList = awardsData.getCertificates;
      if (awardsList && awardsList.length > 0) {
        setAwards(
          awardsList.map((award: any) => ({
            id: award.id || '',
            title: award.name || '',
            date: award.issuedDate || '',
            organization: award.issuer || '',
          }))
        );
      }
    }
  }, [awardsData]);

  const tabs = [
    { id: 'personal', label: '개인정보', icon: User },
    { id: 'education', label: '학력', icon: FileText },
    { id: 'career', label: '경력', icon: FileText },
    { id: 'projects', label: '프로젝트', icon: FileText },
    { id: 'awards', label: '수상', icon: FileText },
    { id: 'certifications', label: '자격증', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 overflow-x-hidden">
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>홈으로</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2">
            이력서 정보 관리
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              이력서 생성하기
            </button>
          </div>
        </div>
      </header>

      {showPreview ? (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">이력서 미리보기</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <CompanyJobInputForm
                personalInfo={personalInfo}
                educations={educations}
                careers={careers}
                projects={projects}
                awards={awards}
                certifications={certifications}
              />
            </div>
          </div>
        </div>
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <nav className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 flex-1 justify-center ${
                        isActive
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'personal' && (
                <PersonalInfoTab personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
              )}
              {activeTab === 'education' && (
                <EducationTab educations={educations} setEducations={setEducations} />
              )}
              {activeTab === 'career' && <CareerTab careers={careers} setCareers={setCareers} />}
              {activeTab === 'projects' && (
                <ProjectsTab projects={projects} setProjects={setProjects} />
              )}
              {activeTab === 'awards' && <AwardsTab awards={awards} setAwards={setAwards} />}
              {activeTab === 'certifications' && (
                <CertificationsTab
                  certifications={certifications}
                  setCertifications={setCertifications}
                />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ResumeInfoScreen;
