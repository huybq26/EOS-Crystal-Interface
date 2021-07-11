import * as XLSX from 'xlsx';

export function exportExcelFile(json) {
  // let traverses =
  for (let i = 0; i < Object.keys(json).length; i++) {
    delete json[i]['_id'];
    delete json[i]['traverses'];
  }
  console.log(json);
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

export function exportTraverse(json) {
  // let traverses =
  let traverses = [{}];
  for (let i = 0; i < Object.keys(json).length; i++) {
    delete json[i]['_id'];
    if (Object.keys(json[i]['traverses']).length > 0) {
      traverses.unshift(json[i]['traverses']);
    }
    // delete json[i]['_id'];
  }
  console.log(traverses);
  let newObj = Object.keys(traverses).reduce(function (s, a) {
    s[a] = traverses[a][Object.keys(traverses[a])];
    return s;
  }, {});
  //   let newObj2 = Object.keys(newObj).reduce(function (s, a) {
  //     s[a] = newObj[a][Object.keys(newObj[a])];
  //     return s;
  //   }, {});
  console.log(newObj[1]);
  let ws = XLSX.utils.json_to_sheet([newObj[0][0]]);
  let i = 0;
  while (i < Object.keys(newObj).length - 1) {
    // console.log(Object.keys(newObj[i]).length);
    // if (newObj[i] != undefined) {
    // console.log(Object.keys(newObj[0]).length * 10);
    for (let j = 0; j <= 10000; j = j + 10) {
      // depends on how we store the data. If the key is also the same as the spot location, it will be very complicated. A suggestion is to put the key as increasing natural numbers only.
      if (i == 0 && j == 0) {
        continue;
      }
      if (newObj[i][j]) {
        XLSX.utils.sheet_add_json(ws, [newObj[i][j]], {
          origin: -1,
          skipHeader: true,
        });
      }
    }
    i = i + 1;
  }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Document');
  /* generate XLSX file and send to client */
  XLSX.writeFile(wb, 'data_excel.xlsx');
}
