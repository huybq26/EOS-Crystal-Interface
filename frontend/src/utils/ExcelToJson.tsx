import * as XLSX from 'xlsx';

export async function excelToJson(excelFile: File) {
  const csv = await getCSVfromFile(excelFile);
  const data = convertCSVtoJson(csv);

  return data[0];
}

async function getCSVfromFile(excelFile: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(excelFile);

    reader.onload = (event) => {
      const bstr = event.target?.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: '~' });
      resolve(csv);
    };

    reader.onerror = (err) => {
      reject(err);
    };
  });
}

function convertCSVtoJson(csv: String) {
  let lines = csv.split('\n');
  let json = [];
  let headers = lines[0].split('~');
  let case_number = 1;
  for (let i = 0; i < headers.length; i++) {
    if (
      headers[i].toString().trim() == 'a //(100)' ||
      headers[i].toString().trim() == 'b //(010)' ||
      headers[i].toString().trim() == 'c //(001)'
    ) {
      case_number = 2; // when orientation exist
    }
  }
  if (case_number == 1) {
    let common: { [key: string]: any } = {};
    let firstLine = lines[1].split('~');
    for (let i = 0; i < 7; i++) {
      if (i == 3) {
        common['a //(100)'] = 'none';
        common['b //(010)'] = 'none';
        common['c //(001)'] = 'none';
      }
      common[headers[i]] = firstLine[i];
    }
    if (common['crystal name']?.toString().trim() == '') {
      common['crystal name'] = 'none';
    }
    if (common['mineral']?.toString().trim() == '') {
      common['mineral'] = 'none';
    }
    if (common['volcano']?.toString().trim() == '') {
      common['volcano'] = 'none';
    }
    if (common['eruption']?.toString().trim() == '') {
      common['eruption'] = 'none';
    }
    if (common['axis']?.toString().trim() == '') {
      common['axis'] = 'none';
    }
    if (common['reference']?.toString().trim() == '') {
      common['reference'] = 'none';
    }
    json.push(common);
    // console.log(common);
    // json.push({
    //   'a //(100)': 'none',
    //   'b //(010)': 'none',
    //   'c //(001)': 'none',
    // });

    json[0]['traverse'] = [];

    for (let i = 1; i < lines.length; i++) {
      let obj: { [key: string]: any } = {};
      let currentline = lines[i].split('~');

      for (let j = 7; j < headers.length; j++) {
        // obj[headers[j]] = currentline[j];
        if (headers[j] == 'spot location  (um)') {
          headers[j] = 'spot location(um)';
        }
        if (headers[j] == 'Fo (mol %)') {
          headers[j] = 'Fo(mol%)';
        }
        //console.log("Hello I'm processing here!");

        headers[j] = headers[j].trim();
        //console.log('Header is: ' + headers[j]);
        obj[headers[j]] = parseFloat(currentline[j]);
      }

      json[0]['traverse'].push(obj);
    }

    console.log(json);
    // return json;
  } else if (case_number == 2) {
    let common: { [key: string]: any } = {};
    let firstLine = lines[1].split('~');
    for (let i = 0; i < 10; i++) {
      common[headers[i]] = firstLine[i];
    }
    if (common['a //(100)'].toString().trim() == '') {
      common['a //(100)'] = 'none';
    }
    if (common['b //(010)'].toString().trim() == '') {
      common['b //(010)'] = 'none';
    }
    if (common['c //(001)'].toString().trim() == '') {
      common['c //(001)'] = 'none';
    }
    if (common['crystal name'].toString().trim() == '') {
      common['crystal name'] = 'none';
    }
    if (common['mineral'].toString().trim() == '') {
      common['mineral'] = 'none';
    }
    if (common['volcano'].toString().trim() == '') {
      common['volcano'] = 'none';
    }
    if (common['eruption'].toString().trim() == '') {
      common['eruption'] = 'none';
    }
    if (common['axis'].toString().trim() == '') {
      common['axis'] = 'none';
    }
    if (common['reference'].toString().trim() == '') {
      common['reference'] = 'none';
    }
    json.push(common);

    json[0]['traverse'] = [];

    for (let i = 1; i < lines.length; i++) {
      let obj: { [key: string]: any } = {};
      let currentline = lines[i].split('~');

      for (let j = 10; j < headers.length; j++) {
        if (headers[j] == 'spot location  (um)') {
          headers[j] = 'spot location (um)';
        }
        if (headers[j] == 'Fo (mol %)') {
          headers[j] = 'Fo(mol%)';
        }

        headers[j] = headers[j].trim();
        console.log('Header is: ' + headers[j]);
        obj[headers[j]] = parseFloat(currentline[j].trim());
      }

      json[0]['traverse'].push(obj);
    }

    console.log(json);
  }
  return json;
}
