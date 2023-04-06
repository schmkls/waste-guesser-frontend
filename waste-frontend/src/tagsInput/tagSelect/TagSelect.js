import { useState } from "react";

const TagsInput = ({onSelect}) => {

    let tags = ["hej", "hopp"]
    return (
        <div>
            {
                tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            onSelect(tag);
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