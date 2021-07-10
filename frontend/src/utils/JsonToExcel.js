import * as XLSX from 'xlsx';

export async function JsonToExcel(json) {
  //   console.log(json);
  let ws = await XLSX.utils.json_to_sheet(
    [json[0]]
    //         ,{
    //     header: [
    //       'crystal name',
    //       'type traverse',
    //       'axis',
    //       'orientation',
    //       'mineral',
    //       'volcano',
    //       'eruption',
    //       'reference',
    //       'spot location',
    //     ],
    //   }
  );
  for (let i = 1; i < Object.keys(json).length; i++) {
    XLSX.utils.sheet_add_json(ws, [json[i]], { origin: -1, skipHeader: true });
  }
  console.log(ws);
  return ws;
}
