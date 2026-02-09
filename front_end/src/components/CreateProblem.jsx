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

    // Reset all inputs
    setTitle("");
    setDescription("");
    setAnswer(null);
    setOptions(initialOptions);
  };

  return (
    <div className="problem-container">
      <div className="problem-card">
        <div className="card-header">
          <h2 className="card-title">Create Question</h2>
          <p className="card-subtitle">Add a new question to your quiz</p>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="question-title" className="form-label">Question Title</label>
            <input
              id="question-title"
              type="text"
              placeholder="Enter question title"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="question-desc" className="form-label">Description</label>
            <textarea
              id="question-desc"
              placeholder="Provide additional context or details"
              className="textarea-field"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Answer Options</label>
            <div className="options-list">
              {options.map((opt, index) => (
                <div key={opt.id} className="option-item">
                  <label className="option-header">
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={answer === index}
                      onChange={() => setAnswer(index)}
                      className="radio-input"
                    />
                    <span className="option-label">
                      Option {index + 1}
                      {answer === index && <span className="correct-badge">Correct</span>}
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder={`Enter option ${index + 1}`}
                    className="option-input"
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
            </div>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Add Question
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap');

        .problem-container {
          width: 100%;
        }

        .problem-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e8e8e8;
          max-width: 700px;
          margin: 0 auto;
        }

        .card-header {
          margin-bottom: 1.25rem;
        }

        .card-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 0.25rem;
        }

        .card-subtitle {
          font-size: 0.875rem;
          color: #666666;
          line-height: 1.4;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .form-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #1a1a1a;
        }

        .input-field,
        .textarea-field {
          width: 100%;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          transition: all 0.2s ease;
          background: #ffffff;
          color: #1a1a1a;
        }

        .textarea-field {
          resize: vertical;
          min-height: 60px;
          line-height: 1.4;
        }

        .input-field::placeholder,
        .textarea-field::placeholder {
          color: #999999;
        }

        .input-field:focus,
        .textarea-field:focus {
          outline: none;
          border-color: #1a1a1a;
          box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.05);
        }

        .options-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .option-item {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .option-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          user-select: none;
        }

        .radio-input {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: #1a1a1a;
        }

        .option-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .correct-badge {
          font-size: 0.6875rem;
          font-weight: 500;
          color: #1a1a1a;
          background: #f0f0f0;
          padding: 0.125rem 0.375rem;
          border-radius: 3px;
        }

        .option-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          font-family: 'Inter', sans-serif;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          transition: all 0.2s ease;
          background: #ffffff;
          color: #1a1a1a;
        }

        .option-input::placeholder {
          color: #999999;
        }

        .option-input:focus {
          outline: none;
          border-color: #1a1a1a;
          box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.05);
        }

        .submit-btn {
          width: 100%;
          padding: 0.75rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          background: #1a1a1a;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.25rem;
        }

        .submit-btn:hover {
          background: #000000;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .problem-card {
            padding: 1.25rem;
          }

          .options-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateProblem;