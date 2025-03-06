import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './BingoCard.css';

const generateBingoCard = () => {
  let numbers = Array.from({ length: 36 }, (_, i) => i + 1);
  numbers = numbers.sort(() => Math.random() - 0.5).slice(0, 36);
  return Array.from({ length: 6 }, (_, i) => numbers.slice(i * 6, (i + 1) * 6));
};

const BingoCard = () => {
  const [card, setCard] = useState(null);

  const generateCard = () => {
    setCard(generateBingoCard());
  };

  const printToPDF = () => {
    if (!card) return;
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    doc.setFontSize(22);
    doc.text('Bingobricka', 85, 20);

    const cellSize = 25;
    const startX = 50;
    const startY = 50;

    card.forEach((row, rowIndex) => {
      row.forEach((num, colIndex) => {
        doc.rect(
          startX + colIndex * cellSize,
          startY + rowIndex * cellSize,
          cellSize,
          cellSize
        );
        doc.text(
          num.toString(),
          startX + colIndex * cellSize + cellSize / 2 - 5,
          startY + rowIndex * cellSize + cellSize / 2 + 5
        );
      });
    });

    doc.save('bingobricka.pdf');
  };

  return (
    <div className='bingo-container'>
      <h1 className='bingo-title'>Bingobricka</h1>
      {card && (
        <div className='bingo-grid'>
          {card.flat().map((num, index) => (
            <div key={index} className='bingo-cell'>
              {num}
            </div>
          ))}
        </div>
      )}
      <button onClick={generateCard} className='bingo-button generate'>
        Generera bingobricka
      </button>
      {card && (
        <button onClick={printToPDF} className='bingo-button print'>
          Skriv ut som PDF
        </button>
      )}
    </div>
  );
};

export default BingoCard;
