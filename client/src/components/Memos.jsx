import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const [details, setDetails] = useState(false);
  const { contract } = state;

  useEffect(() => {
    const memoMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    // only after contract instance is ready

    contract && memoMessage();
  }, [contract]);
  console.log(memos);

  useEffect(() => {
    console.log(memos);
  }, [memos]);

  return (
    <>
      <div
         className="fixedButton"
      >
        <button
          style={{
            display: "flex",
            // alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            border: "none",
            backgroundColor: "#e4bfbf",
          }}
          onClick={() =>setDetails(!details)}
        >
          Transcation Details <FaCaretDown />
        </button>
      </div>
      {details && <div className="tablePart">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>From</th>
            </tr>
          </thead>
          <tbody>
            {memos && memos?.map((memo, index) => (
              <tr key={index}>
                <td>{memo?.name}</td>
                <td>{memo?.message}</td>
                <td>
                  {new Date(Number(memo?.timestamp) * 1000).toLocaleString()}
                </td>
                <td>{memo?.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </>
  );
};

export default Memos;
