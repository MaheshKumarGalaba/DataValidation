import { useState } from "react";
import Report from "./Report";
import SampleDataTable from "./SampleDataDemo";

const ValidationScript = (props) => {
  const [report, setReport] = useState(null);
  const config = props.config
  const data = config.financialData

  const validateData = () => {
    const logs = [];
    let status = "PASS";

    const validatedData = JSON.parse(JSON.stringify(data));


    data.forEach((row, index) => {
      Object.entries(row).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          logs.push(`[MISSING DATA] ${key} missing in ${row.company}`);
        }
      });
    });

    const numericFields = ["revenue", "expenses", "profit", "assets", "liabilities"];
    data.forEach((row) => {
      numericFields.forEach((field) => {
        if (row[field] < 0) {
          logs.push(`[NEGATIVE VALUE] ${field} in ${row.company}`);
        }
      });
    });

    data.forEach((row) => {
      if (row.revenue != null && row.expenses != null && row.profit != null) {
        const expected = row.revenue - row.expenses;
        if (Math.abs(expected - row.profit) > 0.05 * Math.abs(expected)) {
          logs.push(`[LOGICAL ERROR] ${row.company} profit mismatch. Expected ${expected}, got ${row.profit}`);
        }
      }
    });

    data.forEach((row) => {
      if (row.assets != null && row.liabilities != null && row.assets < row.liabilities) {
        logs.push(`[BALANCE WARNING] ${row.company} liabilities > assets`);
      }
    });


    numericFields.forEach((field) => {
      const validValues = data.map((d) => d[field]).filter((v) => v != null && !isNaN(v));
      const median = validValues.sort((a, b) => a - b)[Math.floor(validValues.length / 2)];
      validatedData.forEach((d) => {
        if (d[field] == null) d[field] = median;
      });
    });

    if (logs.length > 0) status = "FAIL";

    setReport({
      status,
      totalRecords: data.length,
      issuesFound: logs.length,
      logDetails: logs,
      cleanedData: validatedData
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          ValuCompany Data Validation Engine
        </h1>

        <div className="border rounded-xl overflow-hidden shadow-sm">
          <SampleDataTable data={data} />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={validateData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition-transform hover:scale-105"
          >
            Run Validation
          </button>
        </div>

        {report && <Report report={report} />}
      </div>
    </div>
  );
};

export default ValidationScript;
