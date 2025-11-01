

const SampleDataTable = ({ data }) => {
  return (
    <div className="overflow-auto max-h-[60vh]">
      <table className="w-full border-collapse">
        <thead className="bg-blue-600 text-white text-sm sticky top-0">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="px-4 py-2 text-left capitalize border-b border-blue-400">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition-colors`}
            >
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-2 border-b border-gray-200 text-sm">
                  {val === null ? <span className="text-gray-400 italic">null</span> : val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SampleDataTable;
