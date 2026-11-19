export interface Resident {
  id: number;
  name: string;
  initials: string;
  room: string;
  status: 'Stable' | 'Attention';
}

export const DEMO_RESIDENTS: Resident[] = [
  { id: 1, name: 'Mary Johnson', initials: 'MJ', room: 'Room 101', status: 'Stable' },
  { id: 2, name: 'Robert Williams', initials: 'RW', room: 'Room 102', status: 'Stable' },
  { id: 3, name: 'Patricia Brown', initials: 'PB', room: 'Room 103', status: 'Attention' },
  { id: 4, name: 'James Davis', initials: 'JD', room: 'Room 104', status: 'Stable' },
  { id: 5, name: 'Linda Martinez', initials: 'LM', room: 'Room 105', status: 'Attention' },
  { id: 6, name: 'Sam Devonshire', initials: 'SD', room: 'Room 106', status: 'Attention' },
];
