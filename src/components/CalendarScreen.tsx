import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useGetDailyLogsByMonth } from '../hooks/graphql/dailyLog.query';
import { useUpdateDailyLog } from '../hooks/graphql/mutations/dailyLog.mutation';
import type { DailyLog } from '../types/dailyLog.type';
import { WorkArea, DailyTag, DailyTagLabels, WorkAreaLabels } from '../types/enums';
import dayjs from 'dayjs';

interface CalendarScreenProps {
  setCurrentScreen: (screen: string) => void;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ setCurrentScreen }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [editingLog, setEditingLog] = useState<DailyLog | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTag, setEditTag] = useState<DailyTag>(DailyTag.DEVELOPMENT);
  const [editArea, setEditArea] = useState<WorkArea>(WorkArea.FRONTEND);

  const { data, loading, error, refetch } = useGetDailyLogsByMonth(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );

  const [updateDailyLog] = useUpdateDailyLog();

  useEffect(() => {
    if (data?.getMyDailyLogsByMonth) {
      setDailyLogs(data.getMyDailyLogsByMonth);
    }
  }, [data]);

  const formatDate = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const hasRecordOnDate = (date: Date): boolean => {
    const dateStr = formatDate(date);
    return dailyLogs.some((log) => {
      const logDate = dayjs(log.createdAt).format('YYYY-MM-DD');
      return logDate === dateStr;
    });
  };

  const getLogsForDate = (date: Date): DailyLog[] => {
    const dateStr = formatDate(date);
    return dailyLogs.filter((log) => {
      const logDate = dayjs(log.createdAt).format('YYYY-MM-DD');
      return logDate === dateStr;
    });
  };

  const getDaysInMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
    setTimeout(() => refetch(), 100);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handleEdit = (log: DailyLog) => {
    setEditingLog(log);
    setEditContent(log.content);
    setEditTag(log.tag);
    setEditArea(log.area);
  };

  const handleSave = async () => {
    if (!editingLog || !editContent.trim()) return;

    try {
      const result = await updateDailyLog({
        variables: {
          input: {
            id: editingLog.id,
            content: editContent,
            tag: editTag,
            area: editArea,
          },
        },
      });

      if (result.data?.updateDailyLog) {
        // 수동으로 상태 업데이트
        setDailyLogs((prevLogs) =>
          prevLogs.map((log) =>
            log.id === editingLog.id ? { ...log, ...result.data!.updateDailyLog } : log
          )
        );

        setEditingLog(null);
        setEditContent('');
        alert('기록이 수정되었습니다!');
      }
    } catch (err) {
      console.error('수정 실패:', err);
      alert('수정에 실패했습니다.');
    }
  };

  // 3. useEffect로 월 변경 감지하여 refetch
  useEffect(() => {
    refetch();
  }, [currentDate.getMonth(), currentDate.getFullYear(), refetch]);

  const handleCancel = () => {
    setEditingLog(null);
    setEditContent('');
  };

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
            기록 달력
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* 달력 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-orange-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-orange-500" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </h2>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-orange-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-orange-500" />
            </button>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 gap-2 mb-8">
            {days.map((day, index) => {
              if (!day) return <div key={index} className="h-12"></div>;

              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const hasRecord = hasRecordOnDate(date);
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentDate.getMonth();

              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  className={`relative h-12 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white'
                      : hasRecord
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {hasRecord && !isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">&#10003;</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 선택된 날짜의 기록 */}
          {selectedDate && (
            <div className="border-t pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
                {selectedDate.getDate()}일 기록
              </h3>
              <div className="space-y-4">
                {getLogsForDate(selectedDate).length > 0 ? (
                  getLogsForDate(selectedDate).map((log) => (
                    <div key={log.id} className="bg-orange-50 p-4 rounded-lg">
                      {editingLog?.id === log.id ? (
                        // 편집 모드
                        <div className="space-y-4">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                            rows={3}
                            placeholder="기록 내용을 입력하세요"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                태그
                              </label>
                              <select
                                value={editTag}
                                onChange={(e) => setEditTag(e.target.value as DailyTag)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                              >
                                {Object.entries(DailyTagLabels).map(([key, label]) => (
                                  <option key={key} value={key}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                작업 영역
                              </label>
                              <select
                                value={editArea}
                                onChange={(e) => setEditArea(e.target.value as WorkArea)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                              >
                                {Object.entries(WorkAreaLabels).map(([key, label]) => (
                                  <option key={key} value={key}>
                                    {label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              저장
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        // 읽기 모드
                        <>
                          <p className="text-gray-700">{log.content}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex space-x-2">
                              <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded">
                                {log.area}
                              </span>
                              <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded">
                                {log.tag}
                              </span>
                            </div>
                            <button
                              className="text-orange-500 hover:text-orange-600 text-sm"
                              onClick={() => handleEdit(log)}
                            >
                              수정
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">이 날짜에는 기록이 없습니다.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalendarScreen;
