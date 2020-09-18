import React from "react";
import { CovidInfo } from "../../utils/interfaces";
import "./Table.scss";

interface Props {
  countries: CovidInfo[];
}

const Table = (props: Props) => {
  return (
    <div className="table">
      <table>
        <tbody>
          {props?.countries.map(({ country, cases }, index: number) => (
            <tr key={index.toString()}>
              <td>{country}</td>
              <td>
                <strong>{cases}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
