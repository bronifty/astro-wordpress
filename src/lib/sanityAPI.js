let PROJECT_ID = "bpy0mxas";
let DATASET = "production";
let QUERY = encodeURIComponent('*[_type == "pet"]');
let PROJECT_URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
let resultExport = null;
(async () => {
  const { result } = await fetch(PROJECT_URL).then((res) => res.json());
  resultExport = result;
  console.log("result inside of IIFE: ", result);
})();

export { resultExport };
