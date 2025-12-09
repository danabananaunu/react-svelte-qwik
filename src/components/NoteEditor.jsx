import { useState, useEffect } from "react";

export default function NoteEditor({ initialNote, onSave, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || "");
      setContent(initialNote.content || "");
      setTagsInput(
        Array.isArray(initialNote.tags) ? initialNote.tags.join(", ") : ""
      );
    } else {
      setTitle("");
      setContent("");
      setTagsInput("");
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const noteData = {
      id: initialNote?.id,
      title: title.trim() || "Untitled",
      content: content.trim(),
      tags,
      createdAt: initialNote?.createdAt || new Date().toISOString(),
    };

    onSave(noteData);
    setTitle("");
    setContent("");
    setTagsInput("");
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  const isEditing = Boolean(initialNote);

  return (
    <div className="editor-card">
      <h2 className="section-title">
        {isEditing ? "Edit note" : "New note"}
      </h2>
      <form onSubmit={handleSubmit} className="editor-form">
        <label className="field">
          <span className="field-label">Title</span>
          <input
            type="text"
            className="field-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
          />
        </label>

        <label className="field">
          <span className="field-label">Content</span>
          <textarea
            className="field-textarea"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
          />
        </label>

        <label className="field">
          <span className="field-label">Tags (comma separated)</span>
          <input
            type="text"
            className="field-input"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. school, work, ideas"
          />
        </label>

        <div className="editor-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save changes" : "Add note"}
          </button>
        </div>
      </form>
    </div>
  );
}
