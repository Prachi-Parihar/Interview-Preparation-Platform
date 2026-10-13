import React from "react";
import { FiUploadCloud, FiFileText, FiX, FiCheckCircle } from "react-icons/fi";

function ResumeUpload({
  file,
  loading,
  error,
  success,
  inputRef,
  onFileChange,
  onUpload,
  onRemove,
}) {
  const handleDrop = (event) => {
    event.preventDefault();

    const selectedFile = event.dataTransfer.files?.[0];

    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
          <FiUploadCloud size={28} className="text-gray-800" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          Upload Your Resume
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Upload your resume to get an AI-powered analysis.
        </p>
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 px-5 py-10 text-center transition hover:border-gray-500 hover:bg-gray-50"
      >
        <FiUploadCloud
          size={32}
          className="mx-auto mb-3 text-gray-500"
        />

        <p className="font-medium text-gray-800">
          Drag and drop your resume here
        </p>

        <p className="mt-2 text-sm text-gray-500">
          or click to browse your files
        </p>

        <p className="mt-3 text-xs text-gray-400">
          PDF format only · Maximum size 20 MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0];

            if (selectedFile) {
              onFileChange(selectedFile);
            }
          }}
        />
      </div>

      {file && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-200 p-4">
          <FiFileText size={24} className="shrink-0 text-gray-700" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-800">
              {file.name}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={onRemove}
            disabled={loading}
            aria-label="Remove selected resume"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 disabled:opacity-50"
          >
            <FiX size={18} />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          <FiCheckCircle size={17} />
          {success}
        </p>
      )}

      <button
        type="button"
        onClick={onUpload}
        disabled={!file || loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <FiUploadCloud size={18} />
        {loading ? "Analyzing Resume..." : "Upload & Analyze"}
      </button>
    </div>
  );
}

export default ResumeUpload;
