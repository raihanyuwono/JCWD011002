import { Editable, EditableInput, EditablePreview, Input } from "@chakra-ui/react";

function EditableCustom({data}) {
  return <Editable defaultValue="Nah">
    <EditablePreview />
    <Input as={EditableInput} />
  </Editable>
}

export default EditableCustom;