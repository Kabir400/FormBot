import React, { useState, useEffect } from "react";
import { responseData } from "../utils/sidebarData";
import { formatDateTime, camelCase } from "../utils/format.js";
import style from "../css/response.module.css";

function Table({ responseData = [] }) {
  const [filteredData, setFilteredData] = useState([]);
  const headers = ["", "Submitted at", "Email", "Name"];

  useEffect(() => {
    let maxLength = 0;
    responseData.forEach((item) => {
      if (item.content.length > maxLength) {
        maxLength = item.content.length;
        setFilteredData(item.content);
      }
    });
  }, []);

  // Compute counters only once
  const computeHeaderCounters = () => {
    const counterMap = new Map();
    return filteredData.map((item) => {
      const field = item.field;
      if (!counterMap.has(field)) {
        counterMap.set(field, 1); // Initialize counter for this field
      } else {
        counterMap.set(field, counterMap.get(field) + 1); // Increment counter
      }
      return `${camelCase(field)} ${counterMap.get(field)}`;
    });
  };

  const uniqueHeaders = computeHeaderCounters();

  return (
    <div className={style.tableBox}>
      <table className={style.table}>
        <thead>
          <tr className={style.tableRow}>
            {headers.map((item, index) => (
              <th
                key={`header-${index}`}
                className={style.tableHeading}
                style={{ minWidth: index != 0 && "180px" }}
              >
                {item}
              </th>
            ))}
            {uniqueHeaders.map((header, index) => (
              <th
                key={`filtered-header-${index}`}
                className={style.tableHeading}
                style={{ minWidth: "180px" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responseData.map((data, parentIndex) => (
            <tr key={`row-${parentIndex}`} className={style.tableRow}>
              {headers.map((item, index) => {
                const litem = item.toLowerCase();
                return (
                  <td
                    key={`cell-${parentIndex}-${index}`}
                    className={style.tableCell}
                  >
                    {index === 0
                      ? parentIndex + 1
                      : index === 1
                      ? formatDateTime(data["submited"])
                      : data[litem]
                      ? data[litem]
                      : ""}
                  </td>
                );
              })}
              {data.content.map((item, index) => (
                <td
                  key={`content-cell-${parentIndex}-${index}`}
                  className={style.tableCell}
                >
                  {item.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
