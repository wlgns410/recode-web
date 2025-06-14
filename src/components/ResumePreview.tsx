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
} from 'lucide-react';

const CompanyJobInputForm = () => {
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
      name: '크리에이티브 스타일',
      description: '창의적이고 독특한 디자인',
      preview: '🎨',
    },
  ];

  // 샘플 이력서 데이터
  const sampleResumeData = {
    personalInfo: {
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      address: '서울시 강남구',
      birth: '1990.01.01',
    },
    summary: `${jobTitle} 포지션에 지원하는 ${companyName}에 적합한 전문가입니다. 다양한 프로젝트 경험을 바탕으로 창의적인 문제 해결 능력과 팀워크를 발휘할 수 있습니다.`,
    experience: [
      {
        company: '이전 회사',
        position: '선임 개발자',
        period: '2020.03 - 2024.02',
        description: [
          `${jobTitle} 관련 프로젝트 5건 이상 리드`,
          '팀 생산성 30% 향상에 기여',
          '신기술 도입으로 업무 효율성 개선',
        ],
      },
      {
        company: '스타트업',
        position: '주니어 개발자',
        period: '2018.03 - 2020.02',
        description: [
          '웹 애플리케이션 개발 및 유지보수',
          '고객 만족도 95% 이상 달성',
          '애자일 방법론을 활용한 프로젝트 관리',
        ],
      },
    ],
    education: [
      {
        school: '○○대학교',
        major: '컴퓨터공학과',
        period: '2014.03 - 2018.02',
        grade: '3.8/4.5',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', '팀워크', '문제해결', '의사소통'],
    projects: [
      {
        name: `${companyName} 스타일 프로젝트`,
        period: '2023.06 - 2023.12',
        description: `${jobTitle} 역할로 참여한 대규모 프로젝트로, 사용자 경험 개선에 중점을 둔 혁신적인 솔루션 개발`,
      },
    ],
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
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {sampleResumeData.personalInfo.name}
        </h1>
        <p className="text-xl text-blue-600 font-semibold mb-4">
          {jobTitle} • {companyName} 지원
        </p>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{sampleResumeData.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{sampleResumeData.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{sampleResumeData.personalInfo.address}</span>
          </div>
        </div>
      </div>

      {/* 요약 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          자기소개
        </h2>
        <p className="text-gray-700 leading-relaxed">{sampleResumeData.summary}</p>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          경력사항
        </h2>
        {sampleResumeData.experience.map((exp, index) => (
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
        ))}
      </div>

      {/* 학력 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          학력사항
        </h2>
        {sampleResumeData.education.map((edu, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-gray-800">{edu.school}</h3>
              <p className="text-gray-600">{edu.major}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">{edu.period}</p>
              <p className="text-blue-600 font-medium">학점: {edu.grade}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 기술 스택 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-l-4 border-blue-600 pl-3">
          보유 기술
        </h2>
        <div className="flex flex-wrap gap-2">
          {sampleResumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClassicResume = () => (
    <div className="bg-white p-8 max-w-4xl mx-auto font-serif">
      {/* 헤더 */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {sampleResumeData.personalInfo.name}
        </h1>
        <p className="text-lg text-gray-600 mb-2">{jobTitle}</p>
        <p className="text-sm text-gray-500">{companyName} 지원</p>
        <div className="mt-3 text-sm text-gray-600">
          {sampleResumeData.personalInfo.email} | {sampleResumeData.personalInfo.phone} |{' '}
          {sampleResumeData.personalInfo.address}
        </div>
      </div>

      {/* 요약 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Profile</h2>
        <hr className="border-gray-300 mb-3" />
        <p className="text-gray-700 leading-relaxed text-justify">{sampleResumeData.summary}</p>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">
          Experience
        </h2>
        <hr className="border-gray-300 mb-3" />
        {sampleResumeData.experience.map((exp, index) => (
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
        ))}
      </div>

      {/* 학력 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Education</h2>
        <hr className="border-gray-300 mb-3" />
        {sampleResumeData.education.map((edu, index) => (
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
        ))}
      </div>

      {/* 기술 */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase tracking-wider">Skills</h2>
        <hr className="border-gray-300 mb-3" />
        <p className="text-gray-700">{sampleResumeData.skills.join(' • ')}</p>
      </div>
    </div>
  );

  const renderCreativeResume = () => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl mb-6 transform -rotate-1">
        <div className="transform rotate-1">
          <h1 className="text-4xl font-bold mb-2">{sampleResumeData.personalInfo.name}</h1>
          <p className="text-xl mb-1">{jobTitle}</p>
          <p className="text-purple-200">{companyName}에서 함께 성장하고 싶습니다!</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span>📧 {sampleResumeData.personalInfo.email}</span>
            <span>📱 {sampleResumeData.personalInfo.phone}</span>
            <span>📍 {sampleResumeData.personalInfo.address}</span>
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
          <p className="text-gray-700 leading-relaxed">{sampleResumeData.summary}</p>
        </div>
      </div>

      {/* 경력 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Work Experience
        </h2>
        <div className="space-y-4">
          {sampleResumeData.experience.map((exp, index) => (
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
          ))}
        </div>
      </div>

      {/* 학력 & 기술 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-purple-700 mb-4">🎓 Education</h2>
          {sampleResumeData.education.map((edu, index) => (
            <div key={index} className="border-l-4 border-purple-300 pl-4">
              <h3 className="font-bold text-gray-800">{edu.school}</h3>
              <p className="text-gray-600">{edu.major}</p>
              <p className="text-sm text-purple-600">
                {edu.period} | {edu.grade}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-purple-700 mb-4">🚀 Skills</h2>
          <div className="flex flex-wrap gap-2">
            {sampleResumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
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
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
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
