import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import './App.css';

export default function App() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState('M'); // L, M, Q, H
  const svgWrapperRef = useRef(null);

  const canDownload = text.trim().length > 0;

  const svgToString = (svgNode) => {
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgNode);
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    }
    return source;
  };

  const handleDownloadSVG = () => {
    const svg = svgWrapperRef.current?.querySelector('svg');
    if (!svg) return;
    const source = svgToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.svg';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async () => {
    const svg = svgWrapperRef.current?.querySelector('svg');
    if (!svg) return;

    const source = svgToString(svg);
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext('2d');

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = 'qr-code.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="app">
      <h1>QR Code Generator</h1>

      <div className="controls">
        <label className="block">
          <span>Text or URL</span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text or paste a URL..."
          />
        </label>

        <div className="row">
          <label>
            <span>Size</span>
            <input
              type="range"
              min="128"
              max="512"
              step="8"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
          </label>
          <span className="size-label">{size}px</span>
        </div>

        <div className="row">
          <label>
            <span>Foreground</span>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
            />
          </label>

          <label>
            <span>Background</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>

          <label>
            <span>Error correction</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="L">L (Low)</option>
              <option value="M">M (Medium)</option>
              <option value="Q">Q (Quartile)</option>
              <option value="H">H (High)</option>
            </select>
          </label>
        </div>
      </div>

      <div className="preview">
        <div ref={svgWrapperRef} className="qr-wrapper" style={{ width: size, height: size }}>
          <QRCode
            value={text || ' '}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
          />
        </div>
      </div>

      <div className="actions">
        <button onClick={handleDownloadPNG} disabled={!canDownload}>Download PNG</button>
        <button onClick={handleDownloadSVG} disabled={!canDownload}>Download SVG</button>
      </div>
    </div>
  );
}