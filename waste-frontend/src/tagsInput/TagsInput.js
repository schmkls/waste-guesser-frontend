import TagSelect from './tagSelect/TagSelect';


const TagsInput = (props) => {

    const handleSubmit = (string) => {
        let tag = string
        console.log('tag: ', tag);
        if (tag[0] != " " && tag.length > 0) {
            props.onSingleTag(tag);
        }
    }

    return (
        <div>
            <h3>Beskriv produkten med några ord</h3>
            <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit(e.target.value);
                        e.target.value = "";
                    }
                }}
                onChange={(e) => {
                    if (e.target.value.includes(" ")) {
                        handleSubmit(e.target.value);
                        e.target.value = "";
                    }
                }}
            />
            <TagSelect onSelect={(tag) => props.onSingleTag(tag)}/>

        </div>
    )
}

export default TagsInput;