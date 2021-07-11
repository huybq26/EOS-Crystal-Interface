import * as XLSX from 'xlsx';

export function exportExcelFile(json) {
  let ws = XLSX.utils.json_to_sheet([json[0]]);
  for (let i = 1; i < Object.keys(json).length; i++) {
    XLSX.utils.sheet_add_json(ws, [json[i]], {
      origin: -1,
      skipHeader: true,
    });
  }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
  /* generate XLSX file and send to client */
  XLSX.writeFile(wb, 'data_excel.xlsx');
}
