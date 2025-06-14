import { useState } from 'react';
import { type Records } from '../types/record';
import { formatDate } from '../utils/date';

export const useResumeLog = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newRecord, setNewRecord] = useState('');
  const [records, setRecords] = useState<Records>({});

  // ✅ 이 함수들은 상태를 참조하므로 여기 안에 있어야 함
  const addRecord = () => {
    if (newRecord.trim()) {
      const today = formatDate(new Date());
      setRecords((prev) => ({
        ...prev,
        [today]: [...(prev[today] || []), { id: Date.now(), text: newRecord, date: new Date() }],
      }));
      setNewRecord('');
    }
  };

  const hasRecordOnDate = (date: Date): boolean => {
    const dateStr = formatDate(date);
    return records[dateStr] && records[dateStr].length > 0;
  };

  return {
    currentScreen,
    setCurrentScreen,
    isLoggedIn,
    setIsLoggedIn,
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    newRecord,
    setNewRecord,
    records,
    setRecords,
    formatDate, // ✅ 상태와 무관 → utils로 분리 가능
    addRecord, // ✅ 상태와 밀접 → 여기 정의 필요
    hasRecordOnDate, // ✅ 상태와 밀접 → 여기 정의 필요
  };
};
