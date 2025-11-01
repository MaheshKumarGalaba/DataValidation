import React from "react";

const Report = ({ report }) => {
  const statusColor =
    report.status === "PASS"
      ? "text-green-700 bg-green-100"
      : "text-red-700 bg-red-100";

  return (
    <div className="mt-10 bg-gray-50 p-6 rounded-xl shadow-inner">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Validation Summary</h2>

      <div className="flex items-center gap-3 mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
          {report.status}
        </span>
        <span className="text-gray-700">
          {report.issuesFound} issue(s) found out of {report.totalRecords} records
        </span>
      </div>

      <h3 className="text-lg font-semibold mt-5 mb-2 text-gray-700">Log Details</h3>
      <ul className="list-disc pl-6 text-sm text-red-700 space-y-1">
        {report.logDetails.map((log, idx) => (
          <li key={idx}>{log}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-5 mb-2 text-gray-700">Cleaned Data </h3>
      <pre className="bg-white p-4 rounded-lg text-xs overflow-auto border border-gray-200">
        {JSON.stringify(report.cleanedData, null, 2)}
      </pre>
    </div>
  );
};

export default Report;
