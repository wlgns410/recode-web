import './index.css';
import { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import ResumeInfoScreen from './components/ResumeInfoScreen';
import { type Records } from './types/record';

const ResumeLog = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [records, setRecords] = useState<Records>({});
  const [newRecord, setNewRecord] = useState('');

  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

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

  return (
    <div className="w-full overflow-x-hidden">
      {currentScreen === 'home' && (
        <HomeScreen
          isLoggedIn={isLoggedIn}
          newRecord={newRecord}
          setNewRecord={setNewRecord}
          addRecord={addRecord}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      {currentScreen === 'auth' && (
        <AuthScreen setIsLoggedIn={setIsLoggedIn} setCurrentScreen={setCurrentScreen} />
      )}
      {currentScreen === 'calendar' && (
        <CalendarScreen
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCurrentScreen={setCurrentScreen}
          records={records}
          formatDate={formatDate}
          hasRecordOnDate={hasRecordOnDate}
        />
      )}
      {currentScreen === 'resume-info' && <ResumeInfoScreen setCurrentScreen={setCurrentScreen} />}
    </div>
  );
};

export default ResumeLog;
