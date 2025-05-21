import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { get } from "react-hook-form";

const CvCard = forwardRef((props, ref) => {
  const { onAddToCategory, imageUrl: initialImageUrl, data } = props;
  const [imageUrl, setImageUrl] = useState(initialImageUrl || data?.displayUrl || null);
  const [imageFile, setImageFile] = useState(data?.displayUrl || null);
  const [imageChange, setImageChange] = useState(false);
  const [name, setName] = useState(data?.name ||"Tên mẫu CV");
  const nameChange = useRef(false);
  const [tags, setTags] = useState(
    typeof data?.propoties === "string" ? data.propoties.split(",") : []
  );
  const tagChange = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editingTagIndex, setEditingTagIndex] = useState(null);
  const [editingTagValue, setEditingTagValue] = useState("");

  const fileInputRef = useRef();
  const inputRef = useRef();
  const tagInputRef = useRef();
  console.log(">>>>>>>>", data);
  console.log(typeof data.propoties, data.propoties);

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  useImperativeHandle(ref, () => ({
    getName: () => name,
    getTags: () => tags,
    getImageUrl: () => imageUrl, // Return the URL string
    getImageFile: () => imageFile, // Return the File object itself
    getImageChange: () => imageChange, // Return the image change reference
    getNameChange: () => nameChange.current, // Return the name change reference
    getTagChange: () => tagChange.current, // Return the tag change reference
  }));

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload a valid image file.");
        setImageUrl(null);
        setImageFile(null);
      } else {
        setErrorMessage(null);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setImageFile(file); // Store the actual file object
        setImageChange(true); // Set the image change reference
      }
    }
  };

  const handleNameClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    nameChange.current = true;
  };

  const handleNameBlur = () => {
    if (!name.trim()) {
      setName("Tên mẫu CV");
    }
    setIsEditing(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!name.trim()) {
        setName("Tên mẫu CV");
      }
      setIsEditing(false);
      e.target.blur();
    }
  };

  const handleAddTag = () => {
    const newTag = "Danh mục mới";
    setTags([...tags, newTag]);
    setEditingTagIndex(tags.length);
    setEditingTagValue(newTag);
    
    setTimeout(() => {
      if (tagInputRef.current) {
        tagInputRef.current.focus();
        tagInputRef.current.select(); // Select the text for easy editing
      }
    }, 10);
  };

  const handleEditTag = (index) => {
    setEditingTagIndex(index);
    setEditingTagValue(tags[index]);

    setTimeout(() => {
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }, 10);
  };

  const handleTagChange = (e) => {
    setEditingTagValue(e.target.value);
    tagChange.current = true;
  };

  const handleTagBlur = () => {
    if (editingTagIndex !== null) {
      // Update the tag if not empty, otherwise remove it
      if (editingTagValue.trim()) {
        const newTags = [...tags];
        newTags[editingTagIndex] = editingTagValue.trim();
        setTags(newTags);
      } else {
        handleRemoveTag(editingTagIndex);
      }
      setEditingTagIndex(null);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTagBlur();
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);

    if (editingTagIndex === index) {
      setEditingTagIndex(null);
    }
  };

  const handleAddToCategory = () => {
    // If the callback exists, add the tags and current info to category
    if (onAddToCategory) {
      tags.forEach((tag) => {
        onAddToCategory(tag, { name, imageUrl });
      });
    }
  };

  // Call handleAddToCategory every time tags change
  useEffect(() => {
    handleAddToCategory();
  }, [tags]); // Call whenever tags are updated

  return (
    <div className="w-[200px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image */}
      <div
        className="bg-[#777785] h-[220px] flex items-center justify-center cursor-pointer relative"
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <FontAwesomeIcon icon={faImage} className="text-black text-[80px]" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 text-xs px-3">{errorMessage}</div>
      )}

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 bg-white">
        {/* Tags area */}
        <div className="flex flex-wrap gap-1 min-h-8">
          {tags.map((tag, index) =>
            editingTagIndex === index ? (
              <div
                key={index}
                className="h-6 border border-blue-400 rounded px-1 flex items-center bg-blue-50"
              >
                <input
                  ref={tagInputRef}
                  type="text"
                  value={editingTagValue}
                  onChange={handleTagChange}
                  onBlur={handleTagBlur}
                  onKeyDown={handleTagKeyDown}
                  className="outline-none bg-transparent text-xs w-16"
                />
              </div>
            ) : (
              <div
                key={index}
                className="h-6 border border-gray-300 rounded px-1 flex items-center gap-1 bg-gray-50 cursor-pointer"
                onClick={() => handleEditTag(index)}
              >
                <span className="text-xs">{tag}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(index);
                  }}
                  className="text-gray-500 hover:text-red-500 text-xs"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )
          )}
          <button
            className="h-6 w-6 rounded-full bg-black text-white text-xs flex items-center justify-center hover:bg-gray-800 transition-colors"
            onClick={handleAddTag}
            title="Thêm danh mục"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Tên CV */}
        {isEditing ? (
          <input
            ref={inputRef}
            className="text-base font-semibold border border-gray-300 rounded px-1 py-0.5"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
          />
        ) : (
          <div
            className="text-base font-semibold text-gray-900 cursor-pointer"
            onClick={handleNameClick}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  );
});

export default CvCard;
