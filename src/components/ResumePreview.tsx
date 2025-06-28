import { useState } from 'react';
import {
  Building2,
  Briefcase,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  User,
  Trophy,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { ProjectForm } from './resume/ProjectsTab';

interface ResumePreviewProps {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    blog: string;
  };
  educations: Array<{
    id: string;
    school: string;
    major: string;
    period: string;
    gpa: string;
  }>;
  careers: Array<{
    id: string;
    companyName: string;
    position: string;
    industry: string;
    period: string;
    summary: string;
  }>;
  projects: ProjectForm[];
  awards: Array<{
    id: string;
    title: string;
    date: string;
    organization: string;
  }>;
  certifications: Array<{
    id: string;
    title: string;
    date: string;
    organization: string;
  }>;
}

const CompanyJobInputForm = ({
  personalInfo,
  educations,
  careers,
  projects,
  awards,
  certifications,
}: ResumePreviewProps) => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [showStyles, setShowStyles] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const resumeStyles = [
    {
      id: 'modern',
      name: '모던 스타일',
      description: '깔끔하고 현대적인 디자인',
      preview: '📋',
    },
    {
      id: 'classic',
      name: '클래식 스타일',
      description: '전통적이고 안정적인 디자인',
      preview: '📄',
    },
    {
      id: 'creative',
      name: '창의적 스타일',
      description: '창의적이고 독특한 디자인',
      preview: '🎨',
    },
  ];

  // 실제 이력서 데이터 사용
  const resumeData = {
    personalInfo: {
      name: personalInfo.name || '홍길동',
      email: personalInfo.email || 'hong@example.com',
      phone: personalInfo.phone || '010-1234-5678',
      address: personalInfo.blog || '서울시 강남구',
      birth: '1990.01.01',
    },
    summary: `${jobTitle} 포지션에 지원하는 ${companyName}에 적합한 전문가입니다. 다양한 프로젝트 경험을 바탕으로 창의적인 문제 해결 능력과 팀워크를 발휘할 수 있습니다.`,
    experience: careers
      .filter((career) => career.companyName || career.position)
      .map((career) => ({
        company: career.companyName || '회사명 없음',
        position: career.position || '직책 없음',
        period: career.period || '',
        description: career.summary ? [career.summary] : ['주요 업무 수행'],
      })),
    education: educations
      .filter((edu) => edu.school || edu.major)
      .map((edu) => ({
        school: edu.school || '학교명 없음',
        major: edu.major || '전공 없음',
        period: edu.period || '',
        grade: edu.gpa || '',
      })),
    projects: projects
      .filter((project) => project.name && project.description)
      .map((project) => ({
        name: project.name,
        period: project.period,
        description: project.description,
      })),
    awards: awards
      .filter((award) => award.title)
      .map((award) => ({
        name: award.title,
        issuer: award.organization,
        date: award.date,
      })),
    certifications: certifications
      .filter((cert) => cert.title)
      .map((cert) => ({
        name: cert.title,
        issuer: cert.organization,
        date: cert.date,
      })),
  };

  const downloadPDF = async () => {
    const element = document.getElementById('resume-content');

    if (!element) {
      alert('이력서 내용을 찾을 수 없습니다.');
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 1, // 스케일을 1로 줄임
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const fileName = `${resumeData.personalInfo.name}_이력서.pdf`;

      pdf.save(fileName);
    } catch (error) {
      alert('PDF 생성 중 오류가 발생했습니다: ' + (error as Error).message);
    }
  };

  const handleNext = () => {
    if (companyName.trim() && jobTitle.trim()) {
      setShowStyles(true);
    }
  };

  const handleBack = () => {
    setShowStyles(false);
  };

  const renderModernResume = () => (
    <div id="resume-content" className="bg-white p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name}</h1>
        <p className="text-xl text-blue-600 font-semibold mb-4">{jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{resumeData.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{resumeData.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{resumeData.personalInfo.address}</span>
          </div>
        </div>
      </div>

      {/* 요약 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          자기소개
        </h2>
        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          경력사항
        </h2>
        {resumeData.experience.length > 0 ? (
          resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-500 text-sm">{exp.period}</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg text-gray-500">경력사항이 없습니다.</div>
        )}
      </div>

      {/* 학력 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          학력사항
        </h2>
        {resumeData.education.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                <p className="text-gray-600">{edu.major}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">{edu.period}</p>
                <p className="text-blue-600 font-medium">학점: {edu.grade}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 bg-gray-50 rounded-lg text-gray-500">학력사항이 없습니다.</div>
        )}
      </div>

      {/* 프로젝트 */}
      {resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
            프로젝트
          </h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                <span className="text-gray-500 text-sm">{project.period}</span>
              </div>
              <p className="text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 수상 */}
      {resumeData.awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
            수상
          </h2>
          {resumeData.awards.map((award, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{award.name}</h3>
                <p className="text-gray-600">{award.issuer}</p>
              </div>
              <span className="text-gray-500 text-sm">{award.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* 자격증 */}
      {resumeData.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
            자격증
          </h2>
          {resumeData.certifications.map((cert, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
              </div>
              <span className="text-gray-500 text-sm">{cert.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderClassicResume = () => (
    <div id="resume-content" className="bg-white p-8 max-w-4xl mx-auto font-serif">
      {/* 헤더 */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{resumeData.personalInfo.name}</h1>
        <p className="text-lg text-gray-600 mb-2">{jobTitle}</p>
        <div className="mt-3 text-sm text-gray-600">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} |{' '}
          {resumeData.personalInfo.address}
        </div>
      </div>

      {/* 요약 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Profile</h2>
        <hr className="border-gray-300 mb-3" />
        <p className="text-gray-700 leading-relaxed text-justify">{resumeData.summary}</p>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">
          Experience
        </h2>
        <hr className="border-gray-300 mb-3" />
        {resumeData.experience.length > 0 ? (
          resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-gray-500 text-sm italic">{exp.period}</span>
              </div>
              <p className="text-gray-600 font-medium mb-2">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-sm">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">경력사항이 없습니다.</div>
        )}
      </div>

      {/* 학력 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Education</h2>
        <hr className="border-gray-300 mb-3" />
        {resumeData.education.length > 0 ? (
          resumeData.education.map((edu, index) => (
            <div key={index} className="flex justify-between items-baseline">
              <div>
                <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                <p className="text-gray-600 text-sm">{edu.major}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm italic">{edu.period}</p>
                <p className="text-gray-600 text-sm">GPA: {edu.grade}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">학력사항이 없습니다.</div>
        )}
      </div>

      {/* 프로젝트 */}
      {resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">
            Projects
          </h2>
          <hr className="border-gray-300 mb-3" />
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                <span className="text-gray-500 text-sm italic">{project.period}</span>
              </div>
              <p className="text-gray-700 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 수상 */}
      {resumeData.awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Awards</h2>
          <hr className="border-gray-300 mb-3" />
          {resumeData.awards.map((award, index) => (
            <div key={index} className="flex justify-between items-baseline mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{award.name}</h3>
                <p className="text-gray-600 text-sm">{award.issuer}</p>
              </div>
              <span className="text-gray-500 text-sm italic">{award.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* 자격증 */}
      {resumeData.certifications.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">
            Certifications
          </h2>
          <hr className="border-gray-300 mb-3" />
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="flex justify-between items-baseline mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.issuer}</p>
              </div>
              <span className="text-gray-500 text-sm italic">{cert.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCreativeResume = () => (
    <div
      id="resume-content"
      className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 max-w-4xl mx-auto"
    >
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl mb-6 transform -rotate-1">
        <div className="transform rotate-1">
          <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
          <p className="text-xl mb-1">{jobTitle}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span>📧 {resumeData.personalInfo.email}</span>
            <span>📱 {resumeData.personalInfo.phone}</span>
            <span>📍 {resumeData.personalInfo.address}</span>
          </div>
        </div>
      </div>

      {/* 요약 */}
      <div className="mb-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
            <User className="w-6 h-6" />
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </div>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Work Experience
        </h2>
        <div className="space-y-4">
          {resumeData.experience.length > 0 ? (
            resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-purple-600 font-semibold">{exp.company}</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                    <span className="text-purple-700 text-sm font-medium">{exp.period}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-purple-500 mt-1">✨</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-lg text-gray-500 text-center">
              경력사항이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 학력 */}
      <div className="mt-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-purple-700 mb-4">🎓 Education</h2>
          {resumeData.education.length > 0 ? (
            resumeData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-purple-300 pl-4">
                <h3 className="font-bold text-gray-800">{edu.school}</h3>
                <p className="text-gray-600">{edu.major}</p>
                <p className="text-sm text-purple-600">
                  {edu.period} | {edu.grade}
                </p>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">학력사항이 없습니다.</div>
          )}
        </div>
      </div>

      {/* 프로젝트 */}
      {resumeData.projects.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{project.name}</h3>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                    <span className="text-purple-700 text-sm font-medium">{project.period}</span>
                  </div>
                </div>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 수상 */}
      {resumeData.awards.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Awards
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resumeData.awards.map((award, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-purple-300"
              >
                <h3 className="font-bold text-gray-800">{award.name}</h3>
                <p className="text-gray-600 text-sm">{award.issuer}</p>
                <p className="text-sm text-purple-600">{award.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 자격증 */}
      {resumeData.certifications.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <User className="w-6 h-6" />
            Certifications
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resumeData.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-purple-300"
              >
                <h3 className="font-bold text-gray-800">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.issuer}</p>
                <p className="text-sm text-purple-600">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderResume = () => {
    switch (selectedStyle) {
      case 'modern':
        return renderModernResume();
      case 'classic':
        return renderClassicResume();
      case 'creative':
        return renderCreativeResume();
      default:
        return renderModernResume();
    }
  };

  // 스타일 선택 화면
  if (showStyles && !selectedStyle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <button
              onClick={handleBack}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            >
              ← 뒤로 가기
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                이력서 스타일을 선택해주세요
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold text-blue-600">{companyName}</span>의{' '}
                <span className="font-semibold text-green-600">{jobTitle}</span> 포지션에 맞는
                스타일을 선택하세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {resumeStyles.map((style) => (
                <div
                  key={style.id}
                  className="group border-2 border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-b from-white to-gray-50"
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {style.preview}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{style.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 이력서 미리보기 화면
  if (selectedStyle) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <button
              onClick={() => setSelectedStyle(null)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors mr-4"
            >
              ← 다른 스타일 선택
            </button>
            <button
              // onClick={downloadPDF}
              onClick={() => {
                downloadPDF();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4 inline mr-2" />
              PDF 다운로드
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden">{renderResume()}</div>
        </div>
      </div>
    );
  }

  // 초기 입력 화면
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">맞춤형 이력서 생성기</h1>
            <p className="text-gray-600">
              지원하려는 회사와 직무를 입력하면 더 정확한 이력서를 만들어드려요
            </p>
          </div>

          <div className="space-y-6">
            {/* 회사명 입력 */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">회사명</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 삼성전자, 네이버, 카카오..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* 직무 입력 */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">직무/포지션</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="예: 프론트엔드 개발자, 마케팅 매니저..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-200 text-lg placeholder-gray-400"
                />
              </div>
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={handleNext}
              disabled={!companyName.trim() || !jobTitle.trim()}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                companyName.trim() && jobTitle.trim()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              스타일 선택하기
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* 추가 안내 */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-lg">💡</div>
              <div>
                <p className="text-blue-800 font-medium mb-1">더 정확한 이력서를 위한 팁</p>
                <p className="text-blue-700 text-sm">
                  구체적인 회사명과 직무를 입력할수록 해당 포지션에 최적화된 이력서를 생성할 수
                  있어요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobInputForm;
