export const taskList = [
  {
    value: 'task1',
    label: 'Task 1',
    count: 1,
  },
  {
    value: 'task2',
    label: 'Task 2',
    count: 2,
  },
  {
    value: 'task3',
    label: 'Task 3',
    count: 3,
  },
  {
    value: 'task4',
    label: 'Task 4',
    count: 4,
  },
]

export const life = 10000

export const admins = ['ADMIN']

export let routes
routes = {
  DEFAULT: '/commercial-webapp',
  DASHBOARD: '/dashboard',
  DASHBOARD_PENDINGACTION: '/user/pendingactions',
  DASHBOARD_PENDINGACTIONS_UPDATE: '/user/pendingactionsupdate',
  DASHBOARD_UNASSIGNWORKFLOW: '/user/unassignworkflow',
  DASHBOARD_INPROGRESSTASK: '/user/inprogresstasks',
  DASHBOARD_MYGROUPPENDINGTASKS: '/user/mygrouppendingactions',
  DASHBOARD_RANGE_PENDINGACTION: '/event/pendingactions',
  DASHBOARD_RANGE_MYGROUPPENDINGTASKS: '/event/mygrouppendingactions',
  RANGEAMEND: '/rangeamend',
  PROMOFUNDNG: '/promofunding',
  RETAILPRICE: '/retailprice',
  SUPPLIERPORT: '/supplierport',
  PRODUCTPORT: '/productport',
  USERCONFIG: '/userconfig',
  USERCONFIG_USERCREATE: `/userconfig/usercreate`,
  USERCONFIG_USERMANAGE: `/userconfig/usermanage`,
  USERCONFIG_USERGROUP: `/userconfig/usergroup`,
  USERCONFIG_GROUPCREATE: `/userconfig/groupcreate`,
  USERCONFIG_GROUPUPDATE: `/userconfig/groupupdate`,
  USERCONFIG_USERUPDATE: `/userconfig/userupdate`,
  // EVENT_BULK_UPLOAD: '/rangeamend/eventupload',
  // EVENT_CREATE:'/rangeamend/createevent',
  // EVENT_MANAGE: '/rangeamend/eventmanage'
  RANGEAMEND_EVENTDASH: '/rangeamend/evntdashboard',
  RANGEAMEND_MANAGE: '/rangeamend/manageevent',
  RANGEAMEND_DELIST: '/rangeamend/delistltr',
  RANGEAMEND_CREATE: '/rangeamend/eventcreate',
  RANGEAMEND_MANAGE_TASK: '/rangeamend/manageeventtask',
}

export const extensions = [
  '.jpg',
  '.jpeg',
  '.jpe',
  '.jif',
  '.jfif',
  '.jfi',
  '.png',
  '.gif',
  '.webp',
  '.tiff',
  '.tif',
  '.psd',
  '.raw',
  '.arw',
  '.cr2',
  '.nrw',
  '.k25',
  '.bmp',
  '.dib',
  '.heif',
  '.heic',
  '.ind',
  '.indd',
  '.indt',
  '.jp2',
  '.j2k',
  '.jpf',
  '.jpx',
  '.jpm',
  '.mj2',
  '.svg',
  '.svgz',
  '.ai',
  '.eps',
  '.pdf',
  '.doc',
  '.docx',
  '.html',
  '.htm',
  '.odt',
  '.xls',
  '.xlsx',
  '.ods',
  '.ppt',
  '.pptx',
  '.txt',
  '.xls',
  '.xlsx',
  '.csv',
  '.xlsm',
]

export const bulkUploadFileType = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]
