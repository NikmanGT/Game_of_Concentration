import axios from "axios";
import { useState, useEffect } from "react";

const TestFile = () => {
  const [data, setData] = useState([]);

  const addData = async () => {
    const result = await axios.post("http://localhost:8000/api/addingUser");
    setData(result.data);
  };
  const deleteData = async () => {
    const result = await axios.delete("http://localhost:8000/api/deletingUser");
    setData(result.data);
  };

  return (
    <div>
      <h1 className="text-center text-6xl">Test file</h1>
      <div className="text-center my-5 p-4">
        <button
          onClick={() => {
            addData();
          }}
          className="border-2  p-3 text-2xl cursor-pointer"
        >
          Add data
        </button>
        <button
          onClick={() => {
            deleteData();
          }}
          className="border-2  p-3 text-2xl cursor-pointer"
        >
          Delete data
        </button>
      </div>
      <ul>
        {
          (data.map = (Data) => {
            <li key={Data.id}>{Data.body}</li>;
          })
        }
      </ul>
    </div>
  );
};

export default TestFile;
