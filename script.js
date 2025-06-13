async function generateOfferLetter() {
      const name = document.getElementById('name').value.trim();
      if (!name) return alert("Please enter your name.");

      const existingPdfBytes = await fetch("letterhead.pdf").then(res => res.arrayBuffer());

      const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const { width, height } = firstPage.getSize();

      // Add the intern's name (customize x, y coordinates based on your letterhead design)
      firstPage.drawText(`Name: ${name}`, {
        x: 100,
        y: height - 180, // adjust this for your layout
        size: 14,
        color: PDFLib.rgb(0, 0, 0),
      });

      // Optional: Add date
      const today = new Date().toLocaleDateString();
      firstPage.drawText(`Date: ${today}`, {
        x: 100,
        y: height - 200, // adjust as needed
        size: 12,
        color: PDFLib.rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      // Download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Offer_Letter_${name.replace(/\s+/g, "_")}.pdf`;
      link.click();
    }