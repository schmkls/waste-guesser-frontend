import { useState } from "react";

const TagsInput = () => {

    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState(["hej", "hopp"]);

    return (
        <div>
            {
                tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedTags([...selectedTags, tag]);
                        }}
                    >
                        {tag}
                    </button>
                ))
            }
        </div>
    )

}

export default TagsInput;