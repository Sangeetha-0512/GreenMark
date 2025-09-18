import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Registration() {
  const [formData, setFormData] = useState({
    species: "",
    store: "",
    image: null,
  });
  const [submittedData, setSubmittedData] = useState(null);
  const qrRef = useRef();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique QR ID
    const uniqueId = "QR-" + Date.now();

    // Create full data object for QR
    const data = {
      species: formData.species,
      store: formData.store,
      imageName: formData.image ? formData.image.name : "",
      qrId: uniqueId,
    };

    setSubmittedData(data);

    // Save details in console (simulate database save)
    console.log("✅ Registered Sapling:", data);
  };

  // Print QR code only
  const handlePrint = () => {
    const qrCanvas = qrRef.current.querySelector("canvas");
      if (!qrCanvas) {
    alert("QR Code not ready yet!");
    return;
  }
    const dataUrl = qrCanvas.toDataURL("image/png");

     const printWindow = window.open("", "", "width=600,height=600");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body { text-align: center; font-family: Arial, sans-serif; margin-top: 50px; }
          img { max-width: 250px; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <h2>GreenMark Sapling QR</h2>
        <img src="${dataUrl}" alt="QR Code" />
      
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};


  if (submittedData) {
    return (
      <div className="container text-center mt-5">
        <div className="card shadow-lg p-4">
          <h1 className="mb-3">Your Sapling is Registered 🌱</h1>
          {/* <p className="fw-bold">QR Code ID: {submittedData.qrId}</p> */}
          <div ref={qrRef} className="d-flex justify-content-center">
            <QRCodeCanvas
              value={JSON.stringify(submittedData)}
              size={200}
              includeMargin={true}
            />
          </div>

          {/* ✅ Print Button */}
          <button onClick={handlePrint} className="btn btn-primary mt-3">
            Print QR Code
          </button>

          
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">GreenMark Registration 🌿</h2>
        <form onSubmit={handleSubmit}>
          {/* Species */}
          <div className="mb-3">
           {/* Species Name Dropdown */}
<label className="form-label">Species Name</label>
<select
  name="species"
  value={formData.species}
  onChange={handleChange}
  required
  className="form-select"
>
  <option value="">-- Select Species --</option>
  <option value="Neem">Neem</option>
  <option value="Mango">Mango</option>
  <option value="Tulsi">Tulsi</option>
  <option value="Banyan">Banyan</option>
  <option value="Peepal">Peepal</option>
</select>

{/* Store Name Dropdown */}
<label className="form-label mt-3">Store Name</label>
<select
  name="store"
  value={formData.store}
  onChange={handleChange}
  required
  className="form-select"
>
  <option value="">-- Select Store --</option>
  <option value="GreenMark Nursery">GreenMark Nursery</option>
  <option value="Nature’s Hub">Nature’s Hub</option>
  <option value="EcoGarden">EcoGarden</option>
  <option value="City Plant Store">City Plant Store</option>
</select>

          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Upload Sapling Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100">
            Register Sapling
          </button>
        </form>
      </div>
    </div>
  );
}
