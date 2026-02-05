import { useState } from "react";

const CreateProblem = ({ socket, roomId }) => {
  const initialOptions = [
    { id: 1, title: "" },
    { id: 2, title: "" },
    { id: 3, title: "" },
    { id: 4, title: "" },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState(null);
  const [options, setOptions] = useState(initialOptions);

  const handleSubmit = () => {
    if (!roomId || !title || !description || answer === null) {
      alert("Invalid props");
      return;
    }

    socket.emit("createProblem", {
      roomId,
      problem: {
        title,
        description,
        options,
        answer,
      },
    });

    // ✅ RESET ALL INPUTS
    setTitle("");
    setDescription("");
    setAnswer(null);
    setOptions(initialOptions);
  };

  return (
    <div className="flex items-center p-10 justify-center">
      <div className="border rounded-lg p-6 w-80 bg-white shadow-md">
        <h1 className="text-xl font-semibold text-center mb-4">
          Create Quiz
        </h1>

        <input
          placeholder="Enter title"
          className="w-full border rounded px-3 py-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Enter description"
          className="w-full border rounded px-3 py-2 mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {options.map((opt, index) => (
          <div key={opt.id} className="mb-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={answer === index}
                onChange={() => setAnswer(index)}
              />
              Option {index + 1}
            </label>

            <input
              type="text"
              placeholder="Enter option"
              className="w-full border rounded px-3 py-2 mt-1"
              value={opt.title}
              onChange={(e) =>
                setOptions((prev) =>
                  prev.map((o) =>
                    o.id === opt.id
                      ? { ...o, title: e.target.value }
                      : o
                  )
                )
              }
            />
          </div>
        ))}

        <button
          className="w-full bg-black text-white py-2 rounded mt-4"
          onClick={handleSubmit}
        >
          Add Problem
        </button>
      </div>
    </div>
  );
};

export default CreateProblem;
