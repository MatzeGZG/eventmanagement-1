```typescript
import React, { useState } from 'react';
import { Download, Calendar, FileText } from 'lucide-react';
import { Event } from '../../../../types/event';
import { generateICS } from '../../utils/icsGenerator';
import { generateCSV } from '../../utils/csvGenerator';

interface CalendarExportProps {
  events: Event[];
}

export const CalendarExport: React.FC<CalendarExportProps> = ({ events }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format: 'ics' | 'csv') => {
    setExporting(true);
    try {
      const fileName = `calendar-export-${new Date().toISOString().split('T')[0]}`;
      
      if (format === 'ics') {
        const icsContent = await generateICS(events);
        downloadFile(`${fileName}.ics`, icsContent, 'text/calendar');
      } else {
        const csvContent = await generateCSV(events);
        downloadFile(`${fileName}.csv`, csvContent, 'text/csv');
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExporting(false);
    }
  };

  const downloadFile = (fileName: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => handleExport('ics')}
        disabled={exporting}
        className="w-full flex items-center justify-center px-4 py-2 bg-fjs-gold text-black rounded-lg hover:bg-fjs-light-gold transition-colors disabled:opacity-50"
      >
        <Calendar className="w-5 h-5 mr-2" />
        Export to Calendar (.ics)
      </button>

      <button
        onClick={() => handleExport('csv')}
        disabled={exporting}
        className="w-full flex items-center justify-center px-4 py-2 bg-fjs-charcoal text-fjs-gold rounded-lg hover:bg-black/20 transition-colors disabled:opacity-50"
      >
        <FileText className="w-5 h-5 mr-2" />
        Export to Spreadsheet (.csv)
      </button>
    </div>
  );
};
```