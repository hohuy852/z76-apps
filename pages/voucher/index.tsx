import React, { useState, ChangeEvent, FormEvent } from 'react';
import baseUrl from '@/hostingConfig';

const UpdateExcelPage: React.FC = () => {
  const [taxFile, setTaxFile] = useState<File | null>(null);
  const [detailFile, setDetailFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTaxFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTaxFile(e.target.files[0]);
    }
  };

  const handleDetailFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDetailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setDownloadUrl(null);

    if (!taxFile || !detailFile) {
      setError('Vui lòng chọn đủ 2 file Excel!');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('taxFile', taxFile);
    formData.append('detailFile', detailFile);

    try {
      const response = await fetch(`${baseUrl}/ExcelData/update`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const blob = await response.blob();
      // Kiểm tra MIME type (nếu cần)
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi xử lý file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Cập nhật file Excel</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="taxFile">Bảng kê hoàn thuế:</label>
          <input
            type="file"
            id="taxFile"
            accept=".xlsx, .xls"
            onChange={handleTaxFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="detailFile">Bảng kê chi tiết hóa đơn:</label>
          <input
            type="file"
            id="detailFile"
            accept=".xlsx, .xls"
            onChange={handleDetailFileChange}
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Đang xử lý...' : 'Gửi và cập nhật'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {downloadUrl && (
        <div className="download">
          {/* Đổi tên file tải về có đuôi .zip */}
          <a href={downloadUrl} download="Updated_Tax_Reports.zip">
            Tải file kết quả về
          </a>
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 50px auto;
          padding: 40px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }
        input[type='file'] {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fff;
        }
        .submit-btn {
          background: #0070f3;
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .submit-btn:hover {
          background: #005bb5;
        }
        .error {
          color: #d8000c;
          background: #ffbaba;
          padding: 10px;
          border-radius: 4px;
          text-align: center;
          margin-top: 20px;
        }
        .download {
          margin-top: 30px;
          text-align: center;
        }
        .download a {
          font-size: 18px;
          color: #0070f3;
          text-decoration: none;
          font-weight: 600;
        }
        .download a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default UpdateExcelPage;
