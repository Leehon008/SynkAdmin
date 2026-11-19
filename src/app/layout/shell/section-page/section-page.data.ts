import { DEMO_RESIDENTS, type Resident } from '../../../shared/data/demo-residents';
import { getDemoAdministrations, type MedicationAdministration } from '../../../shared/data/demo-medications';

export type SectionPageKey =
  | 'facility'
  | 'adminOps'
  | 'staffManagement'
  | 'roleManagement'
  | 'residents'
  | 'emar'
  | 'medPass'
  | 'medLog'
  | 'residentNotes'
  | 'residentTasks'
  | 'tasks'
  | 'formBuilder'
  | 'fax'
  | 'reports'
  | 'resources'
  | 'gettingStarted'
  | 'notFound';

export type RecordTone = 'success' | 'warning' | 'info' | 'neutral';

export interface PageMetric {
  label: string;
  value: string;
  note: string;
  icon: string;
}

export interface PageRecord {
  id: string;
  title: string;
  detail: string;
  meta: string;
  status: string;
  tone: RecordTone;
  icon: string;
  initials?: string;
  route?: string;
  done?: boolean;
  incompleteStatus?: string;
  incompleteTone?: RecordTone;
}

export interface OutlookItem {
  time: string;
  title: string;
  detail: string;
  tone: RecordTone;
}

export interface SectionPageContent {
  metrics: PageMetric[];
  listTitle: string;
  listDescription: string;
  searchPlaceholder: string;
  emptyMessage: string;
  records: PageRecord[];
  outlookTitle: string;
  outlookDescription: string;
  outlookItems: OutlookItem[];
  actionLabel?: string;
  actionRoute?: string;
}

const residentsPageRecords: PageRecord[] = DEMO_RESIDENTS.map((resident) => ({
  id: `resident-${resident.id}`,
  title: resident.name,
  detail: `${resident.room} · ${resident.status === 'Attention' ? 'Care team follow-up' : 'Care plan current'}`,
  meta: resident.status === 'Attention' ? 'Review care plan today' : 'Last check-in today',
  status: resident.status,
  tone: resident.status === 'Attention' ? 'warning' : 'success',
  icon: 'bi bi-person',
  initials: resident.initials,
  route: `/residents/${resident.id}/notes`,
}));

function getAdministrations(resident: Resident): MedicationAdministration[] {
  return getDemoAdministrations(resident.id);
}

function createAdministrationRecord(
  resident: Resident,
  administration: MedicationAdministration,
  mode: 'schedule' | 'pass' | 'log',
): PageRecord {
  const record: PageRecord = {
    id: `${mode}-${administration.id}`,
    title: `${administration.name} · ${administration.dose}`,
    detail: `${resident.name} · ${resident.room} · ${administration.route}`,
    meta: administration.schedule,
    status: administration.status,
    tone: administration.tone,
    icon: 'bi bi-capsule',
    route: `/emar/${resident.id}/med-pass`,
  };

  if (mode === 'pass') {
    record.done = administration.status === 'Recorded';
    record.incompleteStatus = administration.status === 'Recorded' ? 'Due' : administration.status;
    record.incompleteTone = administration.status === 'Recorded' ? 'warning' : administration.tone;
  }

  if (mode === 'log' && administration.recordedAt) {
    record.meta = `Today · ${administration.recordedAt} · ${administration.recordedBy}`;
    record.status = 'Administered';
    record.tone = 'success';
    delete record.route;
  }

  return record;
}

export function createSectionPageContent(
  key: SectionPageKey,
  currentResident: Resident,
): SectionPageContent {
  const administrations = getAdministrations(currentResident);
  const recordedAdministrations = administrations.filter(({ recordedAt }) => recordedAt);
  const allAdministrations = DEMO_RESIDENTS.flatMap((resident) =>
    getAdministrations(resident).map((administration) =>
      createAdministrationRecord(resident, administration, 'schedule'),
    ),
  );
  const dueAdministrations = allAdministrations.filter((record) => record.status === 'Due now');

  switch (key) {
    case 'facility':
      return {
        metrics: [
          { label: 'Occupancy', value: '6 / 8', note: '2 rooms available', icon: 'bi bi-door-open' },
          { label: 'Team on shift', value: '4', note: '12 team members total', icon: 'bi bi-people' },
          { label: 'Next inspection', value: '13 days', note: 'Preparation on track', icon: 'bi bi-clipboard-check' },
        ],
        listTitle: 'Facility operations',
        listDescription: 'Key spaces, contacts, and upcoming requirements.',
        searchPlaceholder: 'Search facility operations',
        emptyMessage: 'No facility items match your search.',
        records: [
          { id: 'rooms', title: 'Resident rooms', detail: '6 occupied · 2 ready for move-in', meta: 'Capacity: 8 residents', status: '2 available', tone: 'success', icon: 'bi bi-door-open' },
          { id: 'team', title: 'Care team', detail: '12 active team members · 4 on shift', meta: 'Next handoff at 7:00 PM', status: 'Staffed', tone: 'info', icon: 'bi bi-people' },
          { id: 'license', title: 'License & compliance', detail: 'Annual facility review scheduled', meta: 'Documents last checked Nov 14', status: 'On track', tone: 'success', icon: 'bi bi-shield-check' },
          { id: 'emergency', title: 'Emergency readiness', detail: 'Next safety drill: December 2', meta: 'Fire and evacuation plan', status: 'Upcoming', tone: 'warning', icon: 'bi bi-exclamation-triangle' },
          { id: 'admin-ops', title: 'Admin operations', detail: 'Review staff files, compliance, and approvals', meta: '2 items need follow-up', status: 'Review', tone: 'warning', icon: 'bi bi-clipboard-data', route: '/admin-ops' },
        ],
        outlookTitle: 'Facility outlook',
        outlookDescription: 'Upcoming operations at a glance.',
        outlookItems: [
          { time: 'Today · 7:00 PM', title: 'Shift handoff', detail: '4 staff members on the evening team', tone: 'info' },
          { time: 'Dec 2 · 10:00 AM', title: 'Safety drill', detail: 'Review the evacuation checklist', tone: 'warning' },
          { time: 'Dec 1', title: 'Inspection prep', detail: 'Confirm required facility documents', tone: 'success' },
        ],
        actionLabel: 'View residents',
        actionRoute: '/residents',
      };
    case 'adminOps':
      return {
        metrics: [
          { label: 'Staff files current', value: '10 / 12', note: '2 credentials need renewal', icon: 'bi bi-person-vcard' },
          { label: 'Compliance reviews', value: '2', note: 'Due this month', icon: 'bi bi-shield-check' },
          { label: 'Pending approvals', value: '3', note: 'Invoices and requests', icon: 'bi bi-clipboard-check' },
        ],
        listTitle: 'Administrative operations',
        listDescription: 'Keep facility records, staff requirements, and approvals on track.',
        searchPlaceholder: 'Search admin operations',
        emptyMessage: 'No administrative items match your search.',
        records: [
          { id: 'staff-management', title: 'Staff Management', detail: 'Manage staff profiles, assignments, and credentials.', meta: '12 team members · 2 renewals due', status: 'Open directory', tone: 'info', icon: 'bi bi-people', route: '/admin-ops/staff' },
          { id: 'role-management', title: 'Role Management', detail: 'Review role assignments and facility access profiles.', meta: '5 roles · 12 assignments', status: 'Review access', tone: 'info', icon: 'bi bi-person-gear', route: '/admin-ops/roles' },
          { id: 'staff-files', title: 'Staff credential renewals', detail: 'Two staff certifications expire soon.', meta: 'Due Nov 25 · Staff operations', status: 'Needs review', tone: 'warning', icon: 'bi bi-person-vcard' },
          { id: 'license-review', title: 'Facility license review', detail: 'Prepare the annual licensing packet.', meta: 'Due Dec 1 · Compliance', status: 'In progress', tone: 'info', icon: 'bi bi-shield-check' },
          { id: 'invoice-approval', title: 'Vendor invoice approvals', detail: 'Three invoices are awaiting sign-off.', meta: 'Updated today · Finance', status: 'Pending', tone: 'warning', icon: 'bi bi-receipt' },
          { id: 'policy-review', title: 'Policy acknowledgement', detail: 'Confirm the latest staff handbook review.', meta: 'Due Dec 5 · Staff operations', status: 'On track', tone: 'success', icon: 'bi bi-file-earmark-check' },
        ],
        outlookTitle: 'Admin ops outlook',
        outlookDescription: 'Upcoming deadlines and decisions.',
        outlookItems: [
          { time: 'Today', title: 'Invoice approvals', detail: '3 vendor items await review', tone: 'warning' },
          { time: 'Nov 25', title: 'Credential renewals', detail: 'Follow up with 2 staff members', tone: 'warning' },
          { time: 'Dec 1', title: 'License packet', detail: 'Complete annual facility review', tone: 'info' },
        ],
        actionLabel: 'Facility profile',
        actionRoute: '/facility',
      };
    case 'staffManagement':
      return {
        metrics: [
          { label: 'Team members', value: '12', note: 'Active facility staff', icon: 'bi bi-people' },
          { label: 'On shift today', value: '4', note: 'Coverage confirmed', icon: 'bi bi-person-check' },
          { label: 'Credential renewals', value: '2', note: 'Follow up by Nov 25', icon: 'bi bi-patch-exclamation' },
        ],
        listTitle: 'Staff directory',
        listDescription: 'Sample staff profiles, assignments, and credential status.',
        searchPlaceholder: 'Search staff or role',
        emptyMessage: 'No staff records match your search.',
        records: [
          { id: 'staff-lewis', title: 'Lewis Honye', detail: 'Provider · Facility administrator', meta: 'On shift · Active profile', status: 'Active', tone: 'success', icon: 'bi bi-person-badge' },
          { id: 'staff-ana', title: 'Ana Rivera', detail: 'Care Lead · Resident services', meta: 'Credential renewal due Nov 25', status: 'Renewal due', tone: 'warning', icon: 'bi bi-person-badge' },
          { id: 'staff-jordan', title: 'Jordan Chen', detail: 'Caregiver · Evening team', meta: 'Next shift today · 3:00 PM', status: 'Active', tone: 'success', icon: 'bi bi-person-badge' },
          { id: 'staff-casey', title: 'Casey Wong', detail: 'Administrator · Facility operations', meta: 'Profile reviewed Nov 12', status: 'Active', tone: 'success', icon: 'bi bi-person-badge' },
          { id: 'staff-jamie', title: 'Jamie Patel', detail: 'Nurse · Resident services', meta: 'Credential renewal due Nov 25', status: 'Renewal due', tone: 'warning', icon: 'bi bi-person-badge' },
        ],
        outlookTitle: 'Staffing outlook',
        outlookDescription: 'Coverage and staff follow-ups.',
        outlookItems: [
          { time: 'Today · 3:00 PM', title: 'Evening team starts', detail: '4 staff members scheduled across the shift', tone: 'info' },
          { time: 'Nov 25', title: 'Credential renewals', detail: 'Follow up with 2 staff members', tone: 'warning' },
          { time: 'Weekly', title: 'Profile review', detail: 'Confirm contact details and role assignments', tone: 'success' },
        ],
        actionLabel: 'Review roles',
        actionRoute: '/admin-ops/roles',
      };
    case 'roleManagement':
      return {
        metrics: [
          { label: 'Facility roles', value: '5', note: 'Standard access profiles', icon: 'bi bi-person-gear' },
          { label: 'Assignments', value: '12', note: 'Across the staff team', icon: 'bi bi-people' },
          { label: 'Access reviews', value: '2', note: 'Due this month', icon: 'bi bi-shield-check' },
        ],
        listTitle: 'Roles & access profiles',
        listDescription: 'Sample responsibilities and assigned team members.',
        searchPlaceholder: 'Search roles or access',
        emptyMessage: 'No roles match your search.',
        records: [
          { id: 'role-admin', title: 'Administrator', detail: 'Facility configuration, staff access, and policy oversight.', meta: '1 assigned · Lewis Honye', status: 'Full access', tone: 'info', icon: 'bi bi-person-gear' },
          { id: 'role-manager', title: 'Facility Manager', detail: 'Rooms, operational settings, and administrative approvals.', meta: '2 assigned · Review quarterly', status: 'Review due', tone: 'warning', icon: 'bi bi-building-gear' },
          { id: 'role-provider', title: 'Provider', detail: 'Resident records and care coordination tools.', meta: '3 assigned · Active', status: 'Active', tone: 'success', icon: 'bi bi-person-heart' },
          { id: 'role-caregiver', title: 'Caregiver', detail: 'Assigned resident tasks, notes, and shift handoffs.', meta: '4 assigned · Active', status: 'Active', tone: 'success', icon: 'bi bi-person-hearts' },
          { id: 'role-support', title: 'Support Staff', detail: 'Facility tasks and team communication tools.', meta: '2 assigned · Review quarterly', status: 'Review due', tone: 'warning', icon: 'bi bi-person-lines-fill' },
        ],
        outlookTitle: 'Access review',
        outlookDescription: 'Keep access aligned with current responsibilities.',
        outlookItems: [
          { time: 'This month', title: '2 role reviews due', detail: 'Confirm facility manager and support staff access', tone: 'warning' },
          { time: 'Quarterly', title: 'Check role assignments', detail: 'Review changes when staff responsibilities shift', tone: 'info' },
        ],
        actionLabel: 'Staff directory',
        actionRoute: '/admin-ops/staff',
      };
    case 'residents':
      return {
        metrics: [
          { label: 'Active residents', value: '6', note: 'All current placements', icon: 'bi bi-people' },
          { label: 'Care plan reviews', value: '3', note: 'Due for team follow-up', icon: 'bi bi-journal-check' },
          { label: 'Appointments today', value: '1', note: 'Next visit at 2:30 PM', icon: 'bi bi-calendar2-check' },
        ],
        listTitle: 'Resident directory',
        listDescription: 'Resident status and the next care-team follow-up.',
        searchPlaceholder: 'Search residents or rooms',
        emptyMessage: 'No residents match your search.',
        records: residentsPageRecords,
        outlookTitle: 'Care outlook',
        outlookDescription: 'Priorities for the resident care team.',
        outlookItems: [
          { time: 'Today · 2:30 PM', title: 'Clinic appointment', detail: 'Patricia Brown · transport confirmed', tone: 'info' },
          { time: 'Today · 4:00 PM', title: 'Care-plan check-ins', detail: '3 resident reviews due this week', tone: 'warning' },
          { time: 'Tomorrow', title: 'Family update', detail: 'Mary Johnson · contact on file', tone: 'success' },
        ],
        actionLabel: 'Open care notes',
        actionRoute: `/residents/${DEMO_RESIDENTS[0].id}/notes`,
      };
    case 'emar':
      return {
        metrics: [
          { label: 'Individual orders', value: String(allAdministrations.length), note: 'Across 6 residents', icon: 'bi bi-capsule' },
          { label: 'Due now', value: String(dueAdministrations.length), note: 'Review the next pass', icon: 'bi bi-alarm' },
          { label: 'Missed doses', value: '0', note: 'No exceptions reported', icon: 'bi bi-check2-circle' },
        ],
        listTitle: 'Individual administrations',
        listDescription: 'Medication orders and administration status by resident.',
        searchPlaceholder: 'Search medication or resident',
        emptyMessage: 'No medication records match your search.',
        records: allAdministrations,
        outlookTitle: 'Next medication windows',
        outlookDescription: 'Sample schedule for planning only.',
        outlookItems: [
          { time: '8:00 AM', title: 'Morning pass', detail: '2 administrations need review', tone: 'warning' },
          { time: '12:00 PM', title: 'Midday pass', detail: '1 individual order scheduled', tone: 'info' },
          { time: '8:00 PM', title: 'Evening pass', detail: '2 individual orders scheduled', tone: 'neutral' },
        ],
        actionLabel: 'Start next pass',
        actionRoute: '/emar/1/med-pass',
      };
    case 'medPass':
      return {
        metrics: [
          { label: 'Resident', value: currentResident.name, note: currentResident.room, icon: 'bi bi-person' },
          { label: 'Pass window', value: administrations[0]?.schedule.split(' · ').at(-1) ?? 'Today', note: 'Scheduled administration', icon: 'bi bi-clock' },
          { label: 'Recorded', value: `${recordedAdministrations.length} of ${administrations.length}`, note: 'Demo progress for this session', icon: 'bi bi-check2-square' },
        ],
        listTitle: 'Medication pass',
        listDescription: `Individual administration orders for ${currentResident.name}.`,
        searchPlaceholder: 'Search medications',
        emptyMessage: 'No medications match your search.',
        records: administrations.map((administration) =>
          createAdministrationRecord(currentResident, administration, 'pass'),
        ),
        outlookTitle: 'Pass checklist',
        outlookDescription: 'Demo workflow — confirm all orders in the official record.',
        outlookItems: [
          { time: '1', title: 'Verify resident identity', detail: `${currentResident.name} · ${currentResident.room}`, tone: 'info' },
          { time: '2', title: 'Review active orders', detail: 'Check the medication label and schedule', tone: 'warning' },
          { time: '3', title: 'Record administration', detail: 'Update the official MAR after confirmation', tone: 'success' },
        ],
        actionLabel: 'View medication log',
        actionRoute: `/emar/${currentResident.id}/med-log`,
      };
    case 'medLog':
      return {
        metrics: [
          { label: 'Entries today', value: String(recordedAdministrations.length), note: currentResident.name, icon: 'bi bi-journal-medical' },
          { label: 'Documented', value: '100%', note: 'Sample day view', icon: 'bi bi-check2-circle' },
          { label: 'Last updated', value: recordedAdministrations[0]?.recordedAt ?? 'No entries', note: 'Latest sample entry', icon: 'bi bi-clock-history' },
        ],
        listTitle: 'Administration history',
        listDescription: `Recorded individual administrations for ${currentResident.name}.`,
        searchPlaceholder: 'Search medication history',
        emptyMessage: 'No medication entries match your search.',
        records: recordedAdministrations.map((administration) =>
          createAdministrationRecord(currentResident, administration, 'log'),
        ),
        outlookTitle: 'Documentation notes',
        outlookDescription: 'Sample audit context.',
        outlookItems: [
          { time: '8:12 AM', title: 'Last entry', detail: 'Recorded by Lewis Honye', tone: 'info' },
          { time: 'Today', title: 'No exceptions', detail: 'No missed or refused doses in this sample', tone: 'success' },
        ],
      };
    case 'residentNotes':
      return {
        metrics: [
          { label: 'Recent notes', value: '4', note: currentResident.name, icon: 'bi bi-journal-text' },
          { label: 'Follow-ups', value: '1', note: 'Needs care-team review', icon: 'bi bi-flag' },
          { label: 'Last updated', value: '10:30 AM', note: 'Today · shift note', icon: 'bi bi-clock-history' },
        ],
        listTitle: 'Recent care notes',
        listDescription: `Shift handoffs and follow-ups for ${currentResident.name}.`,
        searchPlaceholder: 'Search notes',
        emptyMessage: 'No notes match your search.',
        records: [
          { id: 'note-1', title: 'Morning wellbeing check', detail: 'Resident comfortable; breakfast completed.', meta: 'Today · 10:30 AM · Lewis Honye', status: 'Routine', tone: 'success', icon: 'bi bi-journal-text' },
          { id: 'note-2', title: 'Family call follow-up', detail: 'Family requested an update after the next appointment.', meta: 'Today · 9:15 AM · A. Rivera', status: 'Follow-up', tone: 'warning', icon: 'bi bi-telephone' },
          { id: 'note-3', title: 'Evening shift handoff', detail: 'No new concerns reported by the overnight team.', meta: 'Yesterday · 8:40 PM · J. Chen', status: 'Reviewed', tone: 'info', icon: 'bi bi-arrow-left-right' },
        ],
        outlookTitle: 'Care-team follow-up',
        outlookDescription: 'Keep handoffs clear and timely.',
        outlookItems: [
          { time: 'Today', title: 'Family update', detail: 'Confirm appointment outcome before calling', tone: 'warning' },
          { time: 'Next shift', title: 'Review handoff', detail: 'Check for new observations', tone: 'info' },
        ],
      };
    case 'residentTasks':
      return {
        metrics: [
          { label: 'Daily activities', value: '4', note: currentResident.name, icon: 'bi bi-list-check' },
          { label: 'Completed', value: '2 of 4', note: 'Demo checklist', icon: 'bi bi-check2-circle' },
          { label: 'Next check-in', value: '3:00 PM', note: currentResident.room, icon: 'bi bi-clock' },
        ],
        listTitle: 'Tasks & activities of daily living',
        listDescription: `Today’s care checklist for ${currentResident.name}.`,
        searchPlaceholder: 'Search activities',
        emptyMessage: 'No activities match your search.',
        records: [
          { id: 'adl-1', title: 'Morning dressing', detail: 'Offer preferred clothing choices', meta: 'Due 8:30 AM', status: 'Completed', tone: 'success', icon: 'bi bi-check2-circle', done: true, incompleteStatus: 'Due', incompleteTone: 'warning' },
          { id: 'adl-2', title: 'Breakfast support', detail: 'Meal setup and intake check', meta: 'Due 9:00 AM', status: 'Completed', tone: 'success', icon: 'bi bi-check2-circle', done: true, incompleteStatus: 'Due', incompleteTone: 'warning' },
          { id: 'adl-3', title: 'Afternoon hydration', detail: 'Offer water and record intake', meta: 'Due 3:00 PM', status: 'Due soon', tone: 'warning', icon: 'bi bi-cup-straw', done: false, incompleteStatus: 'Due soon', incompleteTone: 'warning' },
          { id: 'adl-4', title: 'Evening comfort check', detail: 'Ask about comfort and room setup', meta: 'Due 7:00 PM', status: 'Scheduled', tone: 'info', icon: 'bi bi-heart-pulse', done: false, incompleteStatus: 'Scheduled', incompleteTone: 'info' },
        ],
        outlookTitle: 'Today’s routine',
        outlookDescription: 'Sample plan; follow the current care plan.',
        outlookItems: [
          { time: '3:00 PM', title: 'Hydration check', detail: 'Offer preferred beverage', tone: 'warning' },
          { time: '7:00 PM', title: 'Comfort check', detail: 'Document any concerns for handoff', tone: 'info' },
        ],
      };
    case 'tasks':
      return {
        metrics: [
          { label: 'Open today', value: '18', note: 'Across all care teams', icon: 'bi bi-list-task' },
          { label: 'Due soon', value: '5', note: 'Next 2 hours', icon: 'bi bi-alarm' },
          { label: 'Completed', value: '13', note: 'Today so far', icon: 'bi bi-check2-circle' },
        ],
        listTitle: 'Today’s task board',
        listDescription: 'A shift-friendly view of care and facility work.',
        searchPlaceholder: 'Search tasks or residents',
        emptyMessage: 'No tasks match your search.',
        records: [
          { id: 'task-1', title: 'Document morning rounds', detail: 'Mary Johnson · Room 101', meta: 'Due 10:30 AM · Lewis Honye', status: 'Completed', tone: 'success', icon: 'bi bi-clipboard-check', done: true, incompleteStatus: 'Due', incompleteTone: 'warning' },
          { id: 'task-2', title: 'Confirm appointment transport', detail: 'Patricia Brown · Room 103', meta: 'Due 1:30 PM · A. Rivera', status: 'Due soon', tone: 'warning', icon: 'bi bi-car-front', done: false, incompleteStatus: 'Due soon', incompleteTone: 'warning' },
          { id: 'task-3', title: 'Restock first-aid supplies', detail: 'Facility · supply room', meta: 'Due 3:00 PM · J. Chen', status: 'Scheduled', tone: 'info', icon: 'bi bi-box-seam', done: false, incompleteStatus: 'Scheduled', incompleteTone: 'info' },
          { id: 'task-4', title: 'Review evening handoff', detail: 'Care team · shift transition', meta: 'Due 6:45 PM · Lewis Honye', status: 'Scheduled', tone: 'neutral', icon: 'bi bi-arrow-left-right', done: false, incompleteStatus: 'Scheduled', incompleteTone: 'neutral' },
        ],
        outlookTitle: 'Shift outlook',
        outlookDescription: 'Priorities for the rest of the day.',
        outlookItems: [
          { time: '1:30 PM', title: 'Appointment transport', detail: 'Confirm pickup before departure', tone: 'warning' },
          { time: '3:00 PM', title: 'Supply restock', detail: 'First-aid room inventory', tone: 'info' },
          { time: '6:45 PM', title: 'Evening handoff', detail: 'Share open tasks with next shift', tone: 'neutral' },
        ],
      };
    case 'formBuilder':
      return {
        metrics: [
          { label: 'Templates', value: '12', note: 'Available to the care team', icon: 'bi bi-ui-checks' },
          { label: 'Published', value: '4', note: 'Ready for facility use', icon: 'bi bi-check2-square' },
          { label: 'Drafts', value: '2', note: 'Need a final review', icon: 'bi bi-pencil-square' },
        ],
        listTitle: 'Form library',
        listDescription: 'Reusable documentation templates for the facility.',
        searchPlaceholder: 'Search forms',
        emptyMessage: 'No forms match your search.',
        records: [
          { id: 'form-1', title: 'Daily wellness check', detail: 'Resident care · 8 fields', meta: 'Updated Nov 12 · Used 38 times', status: 'Published', tone: 'success', icon: 'bi bi-clipboard2-heart' },
          { id: 'form-2', title: 'Incident report', detail: 'Safety · 14 fields', meta: 'Updated Nov 10 · Used 3 times', status: 'Published', tone: 'success', icon: 'bi bi-shield-exclamation' },
          { id: 'form-3', title: 'Family contact log', detail: 'Communication · 6 fields', meta: 'Updated Nov 8 · Used 12 times', status: 'Review', tone: 'warning', icon: 'bi bi-telephone' },
          { id: 'form-4', title: 'Room readiness checklist', detail: 'Facility · 9 fields', meta: 'Edited Nov 17 · Not yet published', status: 'Draft', tone: 'info', icon: 'bi bi-door-open' },
        ],
        outlookTitle: 'Form quality',
        outlookDescription: 'Keep records consistent and easy to complete.',
        outlookItems: [
          { time: '2 drafts', title: 'Ready for review', detail: 'Check required fields before publishing', tone: 'warning' },
          { time: 'Weekly', title: 'Template review', detail: 'Confirm forms reflect current procedures', tone: 'info' },
        ],
        actionLabel: 'Getting started guide',
        actionRoute: '/getting-started',
      };
    case 'fax':
      return {
        metrics: [
          { label: 'Received today', value: '8', note: 'Inbound documents', icon: 'bi bi-inbox' },
          { label: 'Needs review', value: '2', note: 'Unassigned or unread', icon: 'bi bi-eye' },
          { label: 'Sent today', value: '5', note: 'Delivery confirmed', icon: 'bi bi-send-check' },
        ],
        listTitle: 'Fax inbox',
        listDescription: 'Recent inbound and outbound facility documents.',
        searchPlaceholder: 'Search sender or subject',
        emptyMessage: 'No faxes match your search.',
        records: [
          { id: 'fax-1', title: 'Northwest Clinic', detail: 'Visit summary · Patricia Brown', meta: 'Received 10:42 AM · 3 pages', status: 'Needs review', tone: 'warning', icon: 'bi bi-file-earmark-medical' },
          { id: 'fax-2', title: 'Evergreen Pharmacy', detail: 'Medication clarification · Mary Johnson', meta: 'Received 9:18 AM · 1 page', status: 'New', tone: 'info', icon: 'bi bi-capsule' },
          { id: 'fax-3', title: 'Adult Facility AFH', detail: 'Care plan update · Robert Williams', meta: 'Sent 8:30 AM · Delivered', status: 'Sent', tone: 'success', icon: 'bi bi-send-check' },
          { id: 'fax-4', title: 'Cedar Home Health', detail: 'Referral paperwork · James Davis', meta: 'Received yesterday · 6 pages', status: 'Filed', tone: 'neutral', icon: 'bi bi-folder2-open' },
        ],
        outlookTitle: 'Inbox outlook',
        outlookDescription: 'Keep incoming documents moving to the right team.',
        outlookItems: [
          { time: '2 unread', title: 'Review and assign', detail: 'Clinic summary and pharmacy message', tone: 'warning' },
          { time: 'Today', title: 'Outbound delivery', detail: '5 transmissions confirmed', tone: 'success' },
        ],
        actionLabel: 'Review resident records',
        actionRoute: '/residents',
      };
    case 'reports':
      return {
        metrics: [
          { label: 'Active residents', value: '6', note: 'Current census', icon: 'bi bi-people' },
          { label: 'Reports ready', value: '3', note: 'Updated this week', icon: 'bi bi-file-earmark-bar-graph' },
          { label: 'Care-plan reviews', value: '3', note: 'Due this week', icon: 'bi bi-journal-check' },
        ],
        listTitle: 'Reports & insights',
        listDescription: 'Operational snapshots for planning and follow-up.',
        searchPlaceholder: 'Search reports',
        emptyMessage: 'No reports match your search.',
        records: [
          { id: 'report-1', title: 'Resident census', detail: 'Occupancy, room status, and placement overview', meta: 'Updated today · 6 residents', status: 'Ready', tone: 'success', icon: 'bi bi-people' },
          { id: 'report-2', title: 'Medication administration', detail: 'Scheduled, completed, and exception summary', meta: 'Updated today · 0 missed in sample', status: 'Ready', tone: 'success', icon: 'bi bi-capsule' },
          { id: 'report-3', title: 'Task completion', detail: 'Daily care and facility task status', meta: 'Updated 11:00 AM · 72% complete', status: 'Ready', tone: 'info', icon: 'bi bi-check2-square' },
          { id: 'report-4', title: 'Care-plan review dates', detail: 'Residents requiring a scheduled review', meta: 'Next review window · This week', status: 'Attention', tone: 'warning', icon: 'bi bi-calendar2-week' },
        ],
        outlookTitle: 'This week',
        outlookDescription: 'Signals for the next planning huddle.',
        outlookItems: [
          { time: '3 reviews', title: 'Care plans due', detail: 'Schedule time with the care team', tone: 'warning' },
          { time: '6 / 8 rooms', title: 'Occupancy', detail: 'Two rooms currently available', tone: 'info' },
          { time: '0 missed', title: 'Medication exceptions', detail: 'Based on this sample day', tone: 'success' },
        ],
        actionLabel: 'View task board',
        actionRoute: '/tasks',
      };
    case 'resources':
      return {
        metrics: [
          { label: 'Guides', value: '18', note: 'For everyday workflows', icon: 'bi bi-journals' },
          { label: 'Recently updated', value: '4', note: 'Reviewed this month', icon: 'bi bi-arrow-repeat' },
          { label: 'Saved for team', value: '3', note: 'Quick access resources', icon: 'bi bi-bookmark-star' },
        ],
        listTitle: 'Care team resource library',
        listDescription: 'Quick references and practical workflow guides.',
        searchPlaceholder: 'Search resources',
        emptyMessage: 'No resources match your search.',
        records: [
          { id: 'resource-1', title: 'Shift handoff guide', detail: 'A clear structure for sharing open work.', meta: 'Workflow guide · 5 min read', status: 'Popular', tone: 'info', icon: 'bi bi-arrow-left-right' },
          { id: 'resource-2', title: 'Resident welcome checklist', detail: 'Prepare a room and coordinate first-day tasks.', meta: 'Checklist · Updated Nov 12', status: 'Updated', tone: 'success', icon: 'bi bi-house-heart' },
          { id: 'resource-3', title: 'Medication documentation basics', detail: 'A reference for accurate recordkeeping.', meta: 'Quick reference · 7 min read', status: 'Reference', tone: 'neutral', icon: 'bi bi-capsule' },
          { id: 'resource-4', title: 'Emergency contacts & procedures', detail: 'Facility contacts and response steps.', meta: 'Facility guide · Updated Nov 4', status: 'Review', tone: 'warning', icon: 'bi bi-life-preserver' },
        ],
        outlookTitle: 'Suggested next',
        outlookDescription: 'Resources based on common team workflows.',
        outlookItems: [
          { time: 'New team members', title: 'Start with setup', detail: 'Review the getting-started checklist', tone: 'info' },
          { time: 'This week', title: 'Refresh emergency contacts', detail: 'Confirm numbers with the care team', tone: 'warning' },
        ],
        actionLabel: 'Open setup checklist',
        actionRoute: '/getting-started',
      };
    case 'gettingStarted':
      return {
        metrics: [
          { label: 'Setup complete', value: '4 / 7', note: 'Continue the checklist below', icon: 'bi bi-check2-circle' },
          { label: 'Team members', value: '12', note: '4 are on today’s shift', icon: 'bi bi-people' },
          { label: 'Next step', value: 'Care team', note: 'Invite and confirm access', icon: 'bi bi-arrow-right-circle' },
        ],
        listTitle: 'Facility setup checklist',
        listDescription: 'A practical path to get your workspace ready.',
        searchPlaceholder: 'Search setup steps',
        emptyMessage: 'No setup steps match your search.',
        records: [
          { id: 'setup-1', title: 'Add facility details', detail: 'Confirm address, contact details, and capacity.', meta: 'Facility profile', status: 'Complete', tone: 'success', icon: 'bi bi-building-check', done: true, incompleteStatus: 'Not started', incompleteTone: 'warning' },
          { id: 'setup-2', title: 'Review rooms and availability', detail: 'Verify room names and current occupancy.', meta: 'Facility profile', status: 'Complete', tone: 'success', icon: 'bi bi-door-open', done: true, incompleteStatus: 'Not started', incompleteTone: 'warning' },
          { id: 'setup-3', title: 'Invite care team members', detail: 'Add staff and confirm their roles.', meta: 'Team access', status: 'In progress', tone: 'warning', icon: 'bi bi-person-plus', done: false, incompleteStatus: 'In progress', incompleteTone: 'warning' },
          { id: 'setup-4', title: 'Add resident profiles', detail: 'Create a profile for each current resident.', meta: 'Resident care', status: 'Complete', tone: 'success', icon: 'bi bi-person-hearts', done: true, incompleteStatus: 'Not started', incompleteTone: 'warning' },
          { id: 'setup-5', title: 'Review medication workflows', detail: 'Confirm who records and reviews passes.', meta: 'Resident care', status: 'Complete', tone: 'success', icon: 'bi bi-capsule', done: true, incompleteStatus: 'Not started', incompleteTone: 'warning' },
          { id: 'setup-6', title: 'Choose facility forms', detail: 'Review the templates used by your team.', meta: 'Operations', status: 'Not started', tone: 'neutral', icon: 'bi bi-ui-checks', done: false, incompleteStatus: 'Not started', incompleteTone: 'neutral' },
          { id: 'setup-7', title: 'Review reports and resources', detail: 'Know where to find team guidance and insights.', meta: 'Operations', status: 'Not started', tone: 'neutral', icon: 'bi bi-journals', done: false, incompleteStatus: 'Not started', incompleteTone: 'neutral' },
        ],
        outlookTitle: 'Your next steps',
        outlookDescription: 'Complete setup at your facility’s pace.',
        outlookItems: [
          { time: 'Next', title: 'Invite your team', detail: 'Confirm staff roles before assigning work', tone: 'warning' },
          { time: 'Then', title: 'Review forms', detail: 'Choose the templates your team needs', tone: 'info' },
          { time: 'Anytime', title: 'Explore resources', detail: 'Share practical guides with staff', tone: 'success' },
        ],
      };
    case 'notFound':
      return {
        metrics: [],
        listTitle: 'Page not found',
        listDescription: 'The address may be incorrect or the page may have moved.',
        searchPlaceholder: 'Search workspace',
        emptyMessage: 'Use the sidebar to return to a workspace page.',
        records: [],
        outlookTitle: 'Continue in your workspace',
        outlookDescription: 'Choose a destination to keep going.',
        outlookItems: [
          { time: 'Care', title: 'Resident directory', detail: 'Review resident profiles and care notes', tone: 'info' },
          { time: 'Operations', title: 'Task manager', detail: 'See today’s scheduled work', tone: 'success' },
        ],
        actionLabel: 'Back to dashboard',
        actionRoute: '/dashboard',
      };
  }
}
