
import React, { useState, useRef, useContext } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { UserContext } from "./Context/UserContext";

 function Register() {
  const { user, setUser } = useContext(UserContext); // ✅ Get logged-in user
  const [formData, setFormData] = useState({
    species: "",
    store: "",
    image: null,
  });
  const [submittedData, setSubmittedData] = useState(null);
  const qrRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first!");
      return;
    }

    const uniqueId = "QR-" + Date.now();

    const data = new FormData(); // ✅ Use FormData for image upload
    data.append("species", formData.species);
    data.append("store", formData.store);
    data.append("qrId", uniqueId);
    data.append("userEmail", user.email); // associate with logged-in user
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const token = localStorage.getItem("jwt-token");
      const res = await axios.post("http://localhost:3001/api/saplings", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Sapling saved:", res.data);

      // Update user in context with new sapling
      setUser((prev) => ({
        ...prev,
        saplings: [...(prev.saplings || []), res.data.sapling],
      }));

      setSubmittedData(res.data.sapling);
    } catch (err) {
      console.error("❌ Error saving sapling:", err.response?.data || err.message);
      alert("Could not save sapling. Please try again.");
    }
  };

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
          <p className="fw-bold">QR Code ID: {submittedData.qrId}</p>
          <div ref={qrRef} className="d-flex justify-content-center">
            <QRCodeCanvas value={JSON.stringify(submittedData)} size={200} includeMargin={true} />
          </div>
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
        <h2 className="text-center mb-4">Register Your Sapling 🌿</h2>
        <form onSubmit={handleSubmit}>
          {/* Species Dropdown */}
          <div className="mb-3">
            <label className="form-label">Species Name</label>
            <select name="species" value={formData.species} onChange={handleChange} required className="form-select">
              <option value="">-- Select Species --</option>
              <option value="Neem">Neem</option>
              <option value="Mango">Mango</option>
              <option value="Tulsi">Tulsi</option>
              <option value="Banyan">Banyan</option>
              <option value="Peepal">Peepal</option>
            </select>
          </div>

          {/* Store Dropdown */}
          <div className="mb-3">
            <label className="form-label">Store Name</label>
            <select name="store" value={formData.store} onChange={handleChange} required className="form-select">
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
            <input type="file" name="image" accept="image/*" onChange={handleChange} required className="form-control" />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register Sapling
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;