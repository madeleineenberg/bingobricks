import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './BingoCard.css';

const generateBingoCard = (size) => {
  const totalNumbers = size * size;
  let numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);
  numbers = numbers.sort(() => Math.random() - 0.5).slice(0, totalNumbers);
  return Array.from({ length: size }, (_, i) => numbers.slice(i * size, (i + 1) * size));
};

const BingoCard = () => {
  const [cards, setCards] = useState([]);
  const [numCards, setNumCards] = useState(1);
  const [cardSize, setCardSize] = useState(6);

  const generateCards = () => {
    const newCards = Array.from({ length: numCards }, () => generateBingoCard(cardSize));
    setCards(newCards);
  };

  const printToPDF = () => {
    if (cards.length === 0) return;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    doc.setFontSize(22);

    cards.forEach((card, cardIndex) => {
      if (cardIndex > 0) doc.addPage();
      doc.text(`Bingobricka ${cardIndex + 1}`, 85, 20);

      const cellSize = 180 / cardSize; // Dynamically adjust cell size based on card size
      const startX = (210 - cellSize * cardSize) / 2; // Center the grid horizontally
      const startY = 40; // Start position from the top

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
    });

    doc.save('bingobrickor.pdf');
  };

  return (
    <div className='bingo-container'>
      <h1 className='bingo-title'>Bingobricka</h1>
      <div className='bingo-inputs'>
        <label className='bingo-label'>Antal brickor:</label>
        <input
          type='number'
          value={numCards}
          onChange={(e) => setNumCards(Number(e.target.value))}
          min='1'
          className='bingo-input'
        />
        <label className='bingo-label'>
          Storlek:
          <select
            value={cardSize}
            onChange={(e) => setCardSize(Number(e.target.value))}
            className='bingo-select'
          >
            <option value={6}>6x6</option>
            <option value={7}>7x7</option>
          </select>
        </label>
      </div>
      <button onClick={generateCards} className='bingo-button generate'>
        Generera bingobrickor
      </button>
      {cards.length > 0 && (
        <>
          <button onClick={printToPDF} className='bingo-button print'>
            Skriv ut som PDF
          </button>
          <div className='bingo-grid'>
            {cards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className='bingo-card'
                style={{ gridTemplateColumns: `repeat(${cardSize}, 1fr)` }}
              >
                {card.flat().map((num, index) => (
                  <div key={index} className='bingo-cell'>
                    {num}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BingoCard;
