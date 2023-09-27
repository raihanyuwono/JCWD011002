import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../storage/SearchReducer";
import useDebounce from "../../helpers/useDebounce";

const container = {
  w: "40%",
};

const leftElementAttr = {
  children: <FiSearch />,
};

function Searchbar() {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");
  const dispatch = useDispatch();

  function onChange(event) {
    const { value } = event.target;
    setSearchParams(
      (prev) => {
        prev.set("q", value);
        return prev;
      },
      { replace: true }
    );
  }

  const inputAttr = {
    placeholder: "Search Product...",
    value: q,
    onChange,
  };

  useDebounce(() => {
    dispatch(searchProduct(q));
  }, [q]);

  return (
    <InputGroup {...container}>
      <InputLeftElement {...leftElementAttr} />
      <Input {...inputAttr} />
    </InputGroup>
  );
}

export default Searchbar;
