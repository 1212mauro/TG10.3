import React, { useState } from "react";
import Komentar from "./Komentar";
import Glasanje from "./Glasanje";
import Modal from "./Modal";

const DiskusijaDetalji = ({ diskusija, komentari, glasanja, onClose, onAddComment, onAddQuestion, onVote }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  const handleSaveComment = () => {
    onAddComment(newComment);
    setNewComment("");
    setIsAddingComment(false);
  };

  const handleSaveQuestion = () => {
    onAddQuestion(newQuestion);
    setNewQuestion("");
    setIsAddingQuestion(false);
  };

  return (
    <Modal title={diskusija.naslov} onClose={onClose}>
      <p className="text-gray-700 mb-4">{diskusija.opis}</p>

      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Komentari</h3>
          {komentari.length > 0 ? (
            komentari.map((komentar) => <Komentar key={komentar.id} komentar={komentar} />)
          ) : (
            <p className="text-gray-500">Nema komentara</p>
          )}

          {isAddingComment ? (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Unesite svoj komentar"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                onClick={handleSaveComment}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Spremi komentar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingComment(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Dodaj komentar
            </button>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Glasanja</h3>
          {glasanja.length > 0 ? (
            glasanja.map((glasanje) => (
              <Glasanje key={glasanje.id} glasanje={glasanje} onVote={onVote} />
            ))
          ) : (
            <p className="text-gray-500">Nema glasanja</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DiskusijaDetalji;
