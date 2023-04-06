import TagSelect from './tagSelect/TagSelect';


const TagsInput = (props) => {

    return (
        <div>
            <h3>Beskriv produkten med några ord</h3>
            <input
                type="text"
                onChange={(e) => {
                    props.onTags(e.target.value.split(" "));
                }}
            />
            <TagSelect onSelect={(tag) => props.onSingleTag(tag)}/>

        </div>
    )
}

export default TagsInput;