import React from "react";
import { indianPlaceNumber } from "./helper";
import "./Table.css";

function TableData({ countries }) {
  let i = 0;
  return (
    <div className="table_list">
      <table className="table_data">
        {/* do descture in map */}
        <tr className="">
          <th>Country</th>
          <th>Cases</th>
        </tr>
        {countries.map(({ country, cases }) => (
          <tr key={i++}>
            <td>{country}</td>
            <td>{indianPlaceNumber(cases)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default TableData;
