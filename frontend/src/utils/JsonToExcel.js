import * as XLSX from 'xlsx';

export function exportExcelFile(json) {
  let traverses = [{}];
  for (let i = 0; i < Object.keys(json).length; i++) {
    delete json[i]['_id']; // delete id column

    if (Object.keys(json[i]['traverses']).length > 0) {
      traverses.push(json[i]['traverses']);
    }
    delete json[i]['traverses']; // delete traverse column after adding to the array above
  }

  let ws = XLSX.utils.json_to_sheet([json[0]]); // initialize worksheet with information of the first crystal

  console.log(traverses);
  let newObj = Object.keys(traverses).reduce(function (s, a) {
    s[a] = traverses[a][Object.keys(traverses[a])];
    return s;
  }, {}); // reduce function to simplify the data structure of traverses
  console.log(newObj[1]);
  console.log(newObj[1][1]);

  // Add information of the first object. Note that the newObj[0] is undefined, so start from newObj[1]
  XLSX.utils.sheet_add_json(ws, [newObj[1][0]], {
    origin: 'I1',
    skipHeader: false,
  }); // both row 1 and 2 are occupied by information and spot location 0.
  let location_index = 3; // start from row 3
  for (let j = 1; j <= 1000; j = j + 1) {
    // depends on how we store the data. If the key is also the same as the spot location, it will be very complicated. A suggestion is to put the key as increasing natural numbers only.
    let location = 'I' + location_index; // e.g.: I3
    if (newObj[1][j]) {
      XLSX.utils.sheet_add_json(ws, [newObj[1][j]], {
        origin: location,
        skipHeader: true,
      }); // add traverses information from spot location 10 till 10000 (if applicable)
      location_index += 1; // go down one line
    }
  }
  // location_index += 1;

  for (let i = 2; i < Object.keys(newObj).length; i++) {
    // add information of object 2,3,4,...
    XLSX.utils.sheet_add_json(ws, [json[i - 1]], {
      origin: 'A' + location_index,
      skipHeader: true,
    });

    XLSX.utils.sheet_add_json(ws, [newObj[i][0]], {
      origin: 'I' + location_index,
      skipHeader: true,
    });
    location_index += 1;
    for (let j = 1; j <= 1000; j = j + 1) {
      let location = 'I' + location_index;
      if (newObj[i][j]) {
        XLSX.utils.sheet_add_json(ws, [newObj[i][j]], {
          origin: location,
          skipHeader: true,
        });
        location_index += 1;
      }
    }
    location_index += 1;
  }

  // // console.log(ws);

  const wb = XLSX.utils.book_new(); // new workboox
  XLSX.utils.book_append_sheet(wb, ws, 'Document'); // append worksheet to workbook with name = Document
  XLSX.writeFile(wb, 'data_excel.xlsx'); // generate XLSX file and send to client
  // console.log(wb);
}
