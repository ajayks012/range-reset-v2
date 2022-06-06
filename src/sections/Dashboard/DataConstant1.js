import { routes } from '../../util/Constants'
const {
  DEFAULT,
  DASHBOARD_PENDINGACTION,
  DASHBOARD_UNASSIGNWORKFLOW,
  DASHBOARD_INPROGRESSTASK,
  DASHBOARD_MYGROUPPENDINGTASKS,
  DASHBOARD_RANGE_PENDINGACTION,
  DASHBOARD_RANGE_MYGROUPPENDINGTASKS,
} = routes
export const userTaskDashboard = [
  {
    title: 'User Management',
    value: 'usermanagement',
    my: {
      pendingActions: 0,
      pendingActionURL: `${DEFAULT}${DASHBOARD_PENDINGACTION}`,
      inProgressTask: 0,
      inProgressTaskURL: `${DEFAULT}${DASHBOARD_INPROGRESSTASK}`,
    },
    myGroup: {
      pendingActions: 0,
      myGrouppendingActionURL: `${DEFAULT}${DASHBOARD_MYGROUPPENDINGTASKS}`,
      inProgressTask: 0,
      myGroupInprogressTaskURL: `${DEFAULT}${DASHBOARD_UNASSIGNWORKFLOW}`,
    },
  },
  {
    title: 'Range Change Management',
    value: 'rangechangemanagement',
    statuscomplete: 'Ontime Completion',
    statuscompleteval: '85%',
    my: {
      url: '#',
      taskDetails: [
        {
          missedOrOverdue: 2,
          //  [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          rejected: 3,
          // [
          //   3,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          //   {
          //     title: 'task 3',
          //   },
          // ],
          currentWeek: 2,
          //  [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          nextWeek: 3,
          // [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          weekTwoToFive: 4,
          //  [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          weekMoreThanFive: 5,
          // [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          total: 15,
          // [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
        },
      ],
    },
    myGroup: {
      url: '#',
      taskDetails: [
        {
          missedOrOverdue: 5,
          //  [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          rejected: 6,
          // [
          //   3,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          //   {
          //     title: 'task 3',
          //   },
          // ],
          currentWeek: 3,
          //  [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          nextWeek: 4,
          // [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          weekTwoToFive: 4,
          //  [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          weekMoreThanFive: 5,
          // [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
          total: 17,
          // [
          //   2,
          //   {
          //     title: 'task 1',
          //   },
          //   {
          //     title: 'task 2',
          //   },
          // ],
        },
      ],
    },
  },
  {
    title: 'Promotion & Funding',
    value: 'promotionandfunding',
    my: {
      pendingActions: 0,
      pendingActionURL: '#',
      inProgressTask: 0,
      inProgressTaskURL: '#',
    },
    myGroup: {
      pendingActions: 0,
      myGrouppendingActionURL: '#',
      inProgressTask: 0,
      myGroupInprogressTaskURL: '#',
    },
  },
  // {
  //   title: 'Retail Price Change',
  //   value: 'retailpricechange',
  //   my: {
  //     pendingActions: 0,
  //     pendingActionURL: '#',
  //     inProgressTask: 0,
  //     inProgressTaskURL: '#',
  //   },
  //   myGroup: {
  //     pendingActions: 0,
  //     myGrouppendingActionURL: '#',
  //     inProgressTask: 0,
  //     myGroupInprogressTaskURL: '#',
  //   },
  // },
  // {
  //   title: 'Suplier Portal',
  //   value: 'suplierportal',
  //   my: {
  //     pendingActions: 0,
  //     pendingActionURL: '#',
  //     inProgressTask: 0,
  //     inProgressTaskURL: '#',
  //   },
  //   myGroup: {
  //     pendingActions: 0,
  //     myGrouppendingActionURL: '#',
  //     inProgressTask: 0,
  //     myGroupInprogressTaskURL: '#',
  //   },
  // },
  {
    title: 'Product Portal',
    value: 'productportal',
    my: {
      pendingActions: 0,
      pendingActionURL: '#',
      inProgressTask: 0,
      inProgressTaskURL: '#',
    },
    myGroup: {
      pendingActions: 0,
      myGrouppendingActionURL: '#',
      inProgressTask: 0,
      myGroupInprogressTaskURL: '#',
    },
  },
]

export const pendingStatusDetails = {
  //   userId: '40011368',
  //   status: [
  //     {
  //       details: 'myCompletedTasks',
  //       count: '0',
  //     },
  //   ],

  userId: '40114362',
  status: [
    {
      details: 'myCompletedTasks',
      count: '5',
      tasks: [
        {
          requestId: 'string',
          assignedToUserId: 'string',
          assignedToGroupId: 'string',
          assignedTimeStamp: 'string',
          taskId: 'string',
          businessKey: '01234',
          taskName: 'string',
          requestorFullName: 'string',
          requestorRole: 'string',
          comments: 'string',
          userFirstName: 'string',
          userMiddleName: 'string',
          userLastName: 'string',
          userEmployeeId: 'string',
          userEmailId: 'string',
        },
      ],
    },
    {
      details: 'myPendingTasks',
      count: '2',
      tasks: [
        {
          requestId: '28-1123-44747',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '202201281101978_40011361_hbtwUserManagementWorkflow',
          assignedToUserId: '2346',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01235',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
    {
      details: 'myRequestedTasks',
      count: '1',
      tasks: [
        {
          requestId: '202201211201201_40011361_hbtwUserManagementWorkflow',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
    {
      details: 'myGroupPendingTasks',
      count: '3',
      tasks: [
        {
          requestId: '202201150901913_40011361_hbtwUserManagementWorkflow',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '01235',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '202201150901131_40011361_hbtwUserManagementWorkflow',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
    {
      details: 'myGroupUnnassignedTasks',
      count: '2',
      tasks: [
        {
          requestId: '20220115090119_40011361_hbtwUserManagementWorkflow',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: '01234',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
        {
          requestId: '202201150401419_40011361_hbtwUserManagementWorkflow',
          assignedToUserId: '2345',
          assignedToGroupId: '1004',
          assignedTimeStamp: '2022-01-07',
          taskId: 'a49ec953-7212-11ec-bdf7-0a58a9feac0e',
          businessKey: '01234',
          taskName: 'pending',
          requestorFullName: 'Lobo',
          requestorRole: 'role 1',
          comments: 'reassign',
          userFirstName: 'Mark',
          userMiddleName: '',
          userLastName: 'mark',
          userEmployeeId: '3456',
          userEmailId: 'mark@morrisonsplc.co.uk',
        },
      ],
    },
  ],
}

export const viewLogTemp = [
  {
    requestId: '202201161301627_40011361_hbtwUserManagementWorkflow',
    timestamp: '2022-01-16 13:13:10',
    userId: '40011361',
    role: 'BUYER',
    actionTaken: 'VALIDATED',
    comments: 'VALIDATED',
    attachmentUrl: null,
    camundaRequestId:
      'validateUserRequest:0d1652e9-76ce-11ec-bdf7-0a58a9feac0e',
  },
  {
    requestId: '202201161301627_40011361_hbtwUserManagementWorkflow',
    timestamp: '2022-01-16 13:13:10',
    userId: '40011361',
    role: 'BUYER',
    actionTaken: 'VALIDATED',
    comments: 'VALIDATED',
    attachmentUrl: null,
    camundaRequestId:
      'implementAccessRequest:0d1baa2b-76ce-11ec-bdf7-0a58a9feac0e',
  },
  {
    requestId: '202201161301627_40011361_hbtwUserManagementWorkflow',
    timestamp: '2022-01-16 13:13:12',
    userId: '40011368',
    role: 'ADMIN',
    actionTaken: 'Approved',
    comments: 'twoattachmentshaha',
    attachmentUrl:
      'https://mdev.xxwmm.commercial.hbtw.oyewgmymzw.s3.eu-west-1.amazonaws.com/usermanagement/userattachments/40011361-20220116140935.pdf',
    camundaRequestId: '202201161301627_40011361_hbtwUserManagementWorkflow',
  },
  {
    requestId: '202201161301627_40011361_hbtwUserManagementWorkflow',
    timestamp: '2022-01-16 13:13:14',
    userId: '40011368',
    role: 'ADMIN',
    actionTaken: 'Approved',
    comments: 'twoattachmentshaha',
    attachmentUrl:
      'https://mdev.xxwmm.commercial.hbtw.oyewgmymzw.s3.eu-west-1.amazonaws.com/usermanagement/userattachments/40011361-20220116140935.pdf',
    camundaRequestId: '202201161301627_40011361_hbtwUserManagementWorkflow',
  },
]

export const pendingTaskDetails = {
  userId: '70004',
  status: [
    {
      details: 'myPendingTasks',
      count: '9',
      tasks: [
        {
          eventId: '299',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2022-06-13 00:00:00.00',
          taskName: 'CT6',
          taskId: 'e70bb6fe-d5ee-11ec-a112-0a5e6aef176f',
          status: 'Active',
          visibility: 'Enabled',
          taskDescription: 'De-list draft added by asst buyer',
          dueDate: '2021-11-29 00:00:00',
          notifyDate: '2021-11-22 00:00:00',
          slaDate: '2021-11-30 00:00:00',
          healthcheckDate: '2022-05-17 14:39:39',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '299',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2022-06-13 00:00:00.00',
          taskName: 'CT18',
          taskId: 'e7567b46-d5ee-11ec-a112-0a5e6aef176f',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Finalise Range - Delists & New',
          dueDate: '2022-01-24 00:00:00',
          notifyDate: '2022-01-17 00:00:00',
          slaDate: '2022-01-25 00:00:00',
          healthcheckDate: '2022-05-17 14:39:39',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '299',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2022-06-13 00:00:00.00',
          taskName: 'CT9',
          taskId: 'e76659f0-d5ee-11ec-a112-0a5e6aef176f',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Build of core planograms',
          dueDate: '2021-12-06 00:00:00',
          notifyDate: '2021-11-29 00:00:00',
          slaDate: '2021-12-07 00:00:00',
          healthcheckDate: '2022-05-17 14:39:39',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '354',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2023-06-13 00:00:00.00',
          taskName: 'CT6',
          taskId: 'b4049658-d78e-11ec-b555-023680fbbd3d',
          status: 'Active',
          visibility: 'Enabled',
          taskDescription: 'De-list draft added by asst buyer',
          dueDate: '2022-11-29 00:00:00',
          notifyDate: '2022-11-22 00:00:00',
          slaDate: '2022-11-30 00:00:00',
          healthcheckDate: '2022-05-19 16:16:04',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '354',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2023-06-13 00:00:00.00',
          taskName: 'CT18',
          taskId: 'b43d32f4-d78e-11ec-b555-023680fbbd3d',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Finalise Range - Delists & New',
          dueDate: '2023-01-24 00:00:00',
          notifyDate: '2023-01-17 00:00:00',
          slaDate: '2023-01-25 00:00:00',
          healthcheckDate: '2022-05-19 16:16:04',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '354',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2023-06-13 00:00:00.00',
          taskName: 'CT9',
          taskId: 'b451f28f-d78e-11ec-b555-023680fbbd3d',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Build of core planograms',
          dueDate: '2022-12-06 00:00:00',
          notifyDate: '2022-11-29 00:00:00',
          slaDate: '2022-12-07 00:00:00',
          healthcheckDate: '2022-05-19 16:16:04',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '2383',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2024-06-23 00:01:00.00',
          taskName: 'CT6',
          taskId: '05ccf348-d791-11ec-b555-023680fbbd3d',
          status: 'Active',
          visibility: 'Enabled',
          taskDescription: 'De-list draft added by asst buyer',
          dueDate: '2023-12-10 00:01:00',
          notifyDate: '2023-12-03 00:01:00',
          slaDate: '2023-12-11 00:01:00',
          healthcheckDate: '2022-05-19 16:32:40',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '2383',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2024-06-23 00:01:00.00',
          taskName: 'CT18',
          taskId: '05eb0204-d791-11ec-b555-023680fbbd3d',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Finalise Range - Delists & New',
          dueDate: '2024-02-04 00:01:00',
          notifyDate: '2024-01-28 00:01:00',
          slaDate: '2024-02-05 00:01:00',
          healthcheckDate: '2022-05-19 16:32:40',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '2383',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2024-06-23 00:01:00.00',
          taskName: 'CT9',
          taskId: '05f3dbbf-d791-11ec-b555-023680fbbd3d',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Build of core planograms',
          dueDate: '2023-12-17 00:01:00',
          notifyDate: '2023-12-10 00:01:00',
          slaDate: '2023-12-18 00:01:00',
          healthcheckDate: '2022-05-19 16:32:40',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
      ],
    },
    {
      details: 'myRequestedTasks',
      count: '0',
      tasks: [],
    },
    {
      details: 'mygrouppendingtasks',
      count: '2',
      tasks: [
        {
          eventId: '2383',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2024-06-23 00:01:00.00',
          taskName: 'CT9',
          taskId: '05f3dbbf-d791-11ec-b555-023680fbbd3d',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Build of core planograms',
          dueDate: '2023-12-17 00:01:00',
          notifyDate: '2023-12-10 00:01:00',
          slaDate: '2023-12-18 00:01:00',
          healthcheckDate: '2022-05-19 16:32:40',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
        {
          eventId: '2383',
          eventName: 'Frozen Fish_07Jun22',
          resetType: 'Range Reset',
          launchDate: '2024-06-23 00:01:00.00',
          taskName: 'CT9',
          taskId: '05f3dbbf-d791-11ec-b555-023680fbbd3d',
          status: 'Future',
          visibility: 'Enabled',
          taskDescription: 'Build of core planograms',
          dueDate: '2023-12-17 00:01:00',
          notifyDate: '2023-12-10 00:01:00',
          slaDate: '2023-12-18 00:01:00',
          healthcheckDate: '2022-05-19 16:32:40',
          assigneeEmailId: 'servicetest.frozen.buyingasst@morrisonsplc.co.uk',
          assigneeUserId: '70004',
          assigneeName: 'TestFrozen BuyingAssistant',
          assigneeRole: 'Buying Assistant',
        },
      ],
    },
    {
      details: 'myGroupUnnassignedTasks',
      count: '0',
      tasks: [],
    },
  ],
}

export const myFirstTableCols = [
  {
    header: 'Missed / OverDue',
    field: 'missedOrOverdue',
  },
  {
    header: 'Rejected for Rework',
    field: 'rejected',
  },
]

export const mySecondTableCols = [
  {
    header: 'Current Week',
    field: 'currentWeek',
    width: '70px',
  },
  {
    header: 'Next Week',
    field: 'nextWeek',
    width: '60px',
  },
  {
    header: 'Week 2 to Week 5',
    field: 'weekTwoToFive',
    width: '60px',
  },
  {
    header: '> Week 5',
    field: 'weekMoreThanFive',
    width: '60px',
  },
  {
    header: 'Total',
    field: 'total',
    width: '60px',
  },
]
