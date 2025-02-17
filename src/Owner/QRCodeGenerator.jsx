import React, { useState } from "react";
import "../style/QRCodeGenerator.scss"; // Import SCSS file for styling

const QRCodeGenerator = () => {
    const [text, setText] = useState("");

    return (
        <div className="qr-generator">
            <h2>Generate Your QR Code</h2>
            <input 
                type="text" 
                placeholder="Enter text or URL" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
            />
            {text && (
                <img 
                    src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(text)}`} 
                    alt="Generated QR Code" 
                    className="qr-image"
                />
            )}
        </div>
    );
};

export default QRCodeGenerator;
