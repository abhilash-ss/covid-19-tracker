import React from "react";
import { CovidInfo } from "../../utils/interfaces";
import "./Table.scss";

interface Props {
  countries: CovidInfo[];
}

const Table = (props: Props) => {
  return (
    <div className="table">
      {props?.countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
