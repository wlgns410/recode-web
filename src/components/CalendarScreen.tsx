import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Record {
  id: number;
  text: string;
  date: Date;
}

interface Records {
  [key: string]: Record[];
}

interface CalendarScreenProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  setCurrentScreen: (screen: string) => void;
  records: Records;
  formatDate: (date: Date) => string;
  hasRecordOnDate: (date: Date) => boolean;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  setCurrentScreen,
  records,
  formatDate,
  hasRecordOnDate,
}) => {
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
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
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
                  className={`h-12 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white'
                      : hasRecord
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {hasRecord && !isSelected && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mt-1"></div>
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
                {records[formatDate(selectedDate)]?.map((record) => (
                  <div key={record.id} className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-gray-700">{record.text}</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-orange-500 hover:text-orange-600 text-sm">
                        수정
                      </button>
                    </div>
                  </div>
                )) ?? (
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
