const licenseKey = 'non-commercial-and-evaluation';

const mainConfig = {
  licenseKey,
  rowHeights: 30,
  stretchH: 'all',
  width: 'auto',
  height: 'auto',
};

const history = {
  defaultConfig: {
    ...mainConfig,
    readOnly: true,
    colHeaders: ['Employee Name', 'Employee Email', 'Check In', 'Check Out'],
    colWidths: [75, 125, 125, 75],
    wrapText: true,
    columns: [
      { data: 'EmployeeName' },
      { data: 'EmployeeNo' },
      { data: 'CheckIn' },
      { data: 'CheckOut' },
    ],
  },
};

export {
  history,
};
