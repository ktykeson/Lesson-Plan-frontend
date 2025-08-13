import React, { useState } from "react";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";

const ClassChart2 = ({ data }) => {
  const { averageGrade, studentsGrades } = data;
  const [showAll, setShowAll] = useState(false);

  const withDifference = studentsGrades.map((student) => ({
    ...student,
    diff: Math.abs(student.grade - averageGrade),
  }));

  const hoger = withDifference
    .filter((s) => s.grade > averageGrade)
    .sort((a, b) => b.diff - a.diff);

  const lager = withDifference
    .filter((s) => s.grade < averageGrade)
    .sort((a, b) => b.diff - a.diff);

  const maxItems = showAll ? Math.max(hoger.length, lager.length) : 4;

  const formatDifference = (studentGrade) =>
    Math.abs(studentGrade - averageGrade).toFixed(2)/10;

  return (
    <>
      <div className="chart-container">
        <table className="grade-table">
          <thead>
            <tr>
              <th>Hoger dan het gemiddelde cijfer</th>
              <th>Lager dan het gemiddelde cijfer</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxItems }).map((_, index) => (
              <tr key={index}>
                <td>
                  {hoger[index] && (
                    <div className="row-content">
                      <span className="student-name">{hoger[index].name}</span>
                      <span className="score-up">
                        +{formatDifference(hoger[index].grade)} <FaArrowUpLong />
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  {lager[index] && (
                    <div className="row-content">
                      <span className="student-name">{lager[index].name}</span>
                      <span className="score-down">
                        -{formatDifference(lager[index].grade)} <FaArrowDownLong />
                      </span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!showAll && (
          <div className="button-wrapper">
            <button className="plus-button" onClick={() => setShowAll(true)}>
              <BsPlusCircle size={20} className="icon" />
              <span className="button-label">Toon alles</span>
            </button>
          </div>
        )}

      </div>

      <style>
        {`
          .chart-container {
            padding: 10px;
          }

          .grade-table {
            width: 90%;
            margin: 0 auto; 
            border-collapse: separate;
            border-spacing: 0;
            border: 1px solid #b3d4fc;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .grade-table th {
            background-color: #e6f0fb;
            color: black;
            padding: 12px;
            text-align: left;
            font-weight: bold;
            border-bottom: 1px solid #b3d4fc;
          }

          .grade-table td {
            padding: 12px;
            background-color: #f7fbff;
            vertical-align: middle;
            border-bottom: none;
          }

          .grade-table tr:nth-child(even) td {
            background-color: #eaf4fd;
          }

          .row-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .student-name {
            float: left;
          }

          .score-up {
            color: green;
            display: flex;
            align-items: center;
            float: right;
          }

          .score-down {
            color: red;
            display: flex;
            align-items: center;
            float: right;
          }

          .button-wrapper {
            margin-top: 20px;
            text-align: center;
          }

          .plus-button {
            background-color: #d0e7ff;
            color: #0b3d91;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .plus-button:hover {
            background-color: #a8cefa;
          }

          .plus-button .icon {
            margin-bottom: -1px;
          }

          .separator {
            margin-top: 24px;
            border: none;
            border-top: 1px solid #ccc;
          }
        `}
      </style>
    </>
  );
};

export default ClassChart2;
