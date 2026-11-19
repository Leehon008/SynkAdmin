type MedicationTone = 'success' | 'warning' | 'info' | 'neutral';

export interface MedicationAdministration {
  id: string;
  name: string;
  dose: string;
  route: string;
  schedule: string;
  status: 'Due now' | 'Recorded' | 'Upcoming' | 'Scheduled';
  tone: MedicationTone;
  recordedAt?: string;
  recordedBy?: string;
}

const DEMO_ADMINISTRATIONS: Record<number, MedicationAdministration[]> = {
  1: [
    { id: 'mary-lisinopril', name: 'Lisinopril', dose: '10 mg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Due now', tone: 'warning' },
    { id: 'mary-calcium', name: 'Calcium', dose: '500 mg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Recorded', tone: 'success', recordedAt: '8:12 AM', recordedBy: 'Lewis Honye' },
  ],
  2: [
    { id: 'robert-metformin', name: 'Metformin', dose: '500 mg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Due now', tone: 'warning' },
    { id: 'robert-aspirin', name: 'Aspirin', dose: '81 mg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Recorded', tone: 'success', recordedAt: '8:08 AM', recordedBy: 'Lewis Honye' },
  ],
  3: [
    { id: 'patricia-vitamin-d', name: 'Vitamin D', dose: '1000 IU', route: 'Oral', schedule: 'Midday · 12:00 PM', status: 'Upcoming', tone: 'info' },
    { id: 'patricia-acetaminophen', name: 'Acetaminophen', dose: '325 mg', route: 'Oral', schedule: 'As needed', status: 'Recorded', tone: 'success', recordedAt: '9:32 AM', recordedBy: 'A. Rivera' },
  ],
  4: [
    { id: 'james-atorvastatin', name: 'Atorvastatin', dose: '20 mg', route: 'Oral', schedule: 'Evening · 8:00 PM', status: 'Scheduled', tone: 'neutral' },
    { id: 'james-melatonin', name: 'Melatonin', dose: '3 mg', route: 'Oral', schedule: 'Evening · 8:00 PM', status: 'Recorded', tone: 'success', recordedAt: '8:05 PM', recordedBy: 'J. Chen' },
  ],
  5: [
    { id: 'linda-amlodipine', name: 'Amlodipine', dose: '5 mg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Recorded', tone: 'success', recordedAt: '8:15 AM', recordedBy: 'Lewis Honye' },
    { id: 'linda-multivitamin', name: 'Multivitamin', dose: '1 tablet', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Recorded', tone: 'success', recordedAt: '8:17 AM', recordedBy: 'Lewis Honye' },
  ],
  6: [
    { id: 'sam-omeprazole', name: 'Omeprazole', dose: '20 mg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Recorded', tone: 'success', recordedAt: '8:22 AM', recordedBy: 'A. Rivera' },
    { id: 'sam-vitamin-b12', name: 'Vitamin B12', dose: '500 mcg', route: 'Oral', schedule: 'Morning · 8:00 AM', status: 'Recorded', tone: 'success', recordedAt: '8:24 AM', recordedBy: 'A. Rivera' },
  ],
};

export function getDemoAdministrations(residentId: number): MedicationAdministration[] {
  return DEMO_ADMINISTRATIONS[residentId] ?? [];
}
